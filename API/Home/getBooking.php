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
    SELECT
	tbl_service_category.CategoryName,
    tbl_booking.BookingDate,
    tbl_booking.Status
    FROM tbl_booking
    INNER JOIN
    tbl_service_request 
    ON
    tbl_booking.request_id = tbl_service_request.request_id
    INNER JOIN
    tbl_service_category 
    ON
    tbl_service_request.category_id = tbl_service_category.category_id;
    ");
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
            'CategoryName' => $worker['CategoryName'],
            'BookingDate' => $worker['BookingDate'],
            'Status' => $worker['Status'],
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
