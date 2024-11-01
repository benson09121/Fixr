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

    $user_id = $data['user_id'] ?? null;

    $stmt = $conn->prepare("SELECT * FROM tbl_accounts WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();

    if (!$user) {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['status' => 404, 'message' => 'User Not Found']);
        exit();
    }

    $userInfo = [
        'user_id' => $user['user_id'],
        'name' => $user['f_name'] . ' ' . $user['l_name'],
        'email' => $user['email'],
        'phone' => $user['phone'],
        'account_type' => $user['account_type'],
        'created_at' => $user['created_at'],
    ];

    $categorystmt = $conn->prepare("SELECT CategoryName FROM tbl_service_category");
    $categorystmt->execute();
    $categories = $categorystmt->fetchAll(PDO::FETCH_COLUMN, 0); 

    header("HTTP/1.0 200 OK");
    echo json_encode([
        'status' => 200,
        'message' => 'User Logged In Successfully',
        'data' => [
            'userInfo' => $userInfo,
            'categories' => $categories, 
        ]
    ]);
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode(['status' => 405, 'message' => 'Invalid Request Method']);
    exit();
}
?>
