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

    $request_id = $data['request_id'] ?? null;

    if (!$request_id) {
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(['status' => 400, 'message' => 'Missing request_id']);
        exit();
    }

    $stmt = $conn->prepare("
        SELECT
            tbl_service_category.CategoryName,
            tbl_service_request.Description
        FROM tbl_service_request 
        INNER JOIN
            tbl_service_category 
        ON
            tbl_service_request.category_id = tbl_service_category.category_id
        WHERE tbl_service_request.request_id = ?
    ");
    
    $stmt->execute([$request_id]);
    $requestDetails = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$requestDetails) {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['status' => 404, 'message' => 'Request Not Found']);
        exit();
    }
    
    $providerStmt = $conn->prepare("
        SELECT
            tbl_accounts.f_name,
            tbl_accounts.l_name,
            tbl_service_provider.provider_id  
        FROM tbl_compliance
        INNER JOIN tbl_service_provider ON tbl_compliance.provider_id = tbl_service_provider.provider_id
        INNER JOIN tbl_accounts ON tbl_service_provider.user_id = tbl_accounts.user_id
        WHERE tbl_compliance.request_id = ?
    ");
    
    $providerStmt->execute([$request_id]);
    $providers = $providerStmt->fetchAll(PDO::FETCH_ASSOC);
    
    $Countstmt = $conn->prepare("
        SELECT COUNT(*) as count FROM tbl_compliance WHERE request_id = ?
    ");
    
    $Countstmt->execute([$request_id]);
    $providerCount = $Countstmt->fetchColumn(); 

    header("HTTP/1.0 200 OK");
    echo json_encode([
        'status' => 200,
        'data' => [
            'requestDetails' => $requestDetails,
            'providers' => $providers,
            'providerCount' => (int)$providerCount 
        ]
    ]);

} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode(['status' => 405, 'message' => 'Invalid Request Method']);
    exit();
}
?>
