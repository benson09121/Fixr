<?php
include '../Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $stmt = $conn->prepare("
    SELECT tbl_accounts.user_id, tbl_accounts.f_name, tbl_accounts.l_name, tbl_accounts.phone FROM tbl_accounts 
    LEFT JOIN tbl_service_provider ON tbl_accounts.user_id = tbl_service_provider.user_id  
    LEFT JOIN tbl_services ON tbl_service_provider.provider_id = tbl_services.provider_id 
    WHERE tbl_accounts.account_type ='worker'");
    $stmt->execute();
    $workers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$workers) {
        header("HTTP/1.0 404 Not Found");
        echo json_encode([
            'status' => 404,
            'message' => 'No Available Workers Found',
            'debug' => $stmt->errorInfo() 
        ]);
        exit();
    }
    $workerInfo = array_map(function ($worker) {
        return [
            'user_id' => $worker['user_id'],
            'name' => $worker['f_name'] . ' ' . $worker['l_name'],
            'phone' => $worker['phone'],
        ];
    }, $workers);

    header("HTTP/1.0 200 OK");
    echo json_encode([
        'status' => 200,
        'data' => $workerInfo
    ]);
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode([
        'status' => 405,
        'message' => 'Invalid Request Method'
    ]);
    exit();
}
?>
