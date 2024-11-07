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
    $provider_id = $data['provider_id'] ?? null;
    $booking_date = $data['booking_date'] ?? null;
    $service_date = $data['service_date'] ?? null;
    $status = $data['status'] ?? 'Scheduled';
    $status_date = $data['status_date'] ?? null;

    if (!$request_id || !$provider_id) {
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(['status' => 400, 'message' => 'Missing required fields']);
        exit();
    }

    $stmt = $conn->prepare("
        INSERT INTO tbl_booking (request_id, provider_id, BookingDate, ServiceDate, Status, StatusDate)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$request_id, $provider_id, $booking_date, $service_date, $status, $status_date]);

    if ($stmt->rowCount() > 0) {
        $updateStmt = $conn->prepare("
            UPDATE tbl_service_request
            SET Status = 'In-Progress'
            WHERE request_id = ?
        ");
        $updateStmt->execute([$request_id]);

        if ($updateStmt->rowCount() > 0) {
            header("HTTP/1.0 200 OK");
            echo json_encode(['status' => 200, 'message' => 'Service booked and status updated successfully']);
        } else {
            header("HTTP/1.0 500 Internal Server Error");
            echo json_encode(['status' => 500, 'message' => 'Failed to update service request status']);
        }
    } else {
        header("HTTP/1.0 500 Internal Server Error");
        echo json_encode(['status' => 500, 'message' => 'Failed to book service']);
    }
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode(['status' => 405, 'message' => 'Invalid Request Method']);
    exit();
}
?>