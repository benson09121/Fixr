<?php

include '../Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {

    $sql = "SELECT * FROM tbl_service_category";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($stmt->rowCount() > 0) {
            header("HTTP/1.0 200 OK");
            $data = [
                'status' => 200,
                'message' => 'Service added successfully',
                'data' => $result
            ];
            echo json_encode($data);
            exit();
        } else {
            $data = [
                'status' => 404,
                'message' => 'No service found'
            ];
            echo json_encode($data);
        }

    } else {
        $data = [
            'status' => 500,
            'message' => 'Failed to add service'
        ];
        echo json_encode($data);
    }
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    $data = [
        'status' => 405,
        'message' => 'Invalid Request Method',
    ];
    echo json_encode($data);
    exit();
}
?>