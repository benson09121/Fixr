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
    $stmt = $conn->prepare("SELECT CategoryName FROM tbl_service_category");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    if (!$categories) {
        header("HTTP/1.0 404 Not Found");
        echo json_encode([
            'status' => 404,
            'message' => 'No Categories Found'
        ]);
        exit();
    }

    header("HTTP/1.0 200 OK");
    echo json_encode([
        'status' => 200,
        'data' => $categories
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
