<?php
include '../Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $request_id = $data['request_id'];
    $provider_id = $data['provider_id'];
    $application_date = date('Y-m-d');
    $status = 'Pending';

    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM tbl_service_provider WHERE provider_id = :provider_id");
    $checkStmt->bindParam(':provider_id', $provider_id, PDO::PARAM_INT);
    $checkStmt->execute();
    $exists = $checkStmt->fetchColumn();

    if (!$exists) {
        echo json_encode([
            'status' => 400,
            'message' => 'Invalid provider_id'
        ]);
        exit();
    }

    $stmt = $conn->prepare("
        INSERT INTO tbl_compliance (request_id, provider_id, application_date, status) 
        VALUES (:request_id, :provider_id, :application_date, :status)
    ");
    
    $stmt->bindParam(':request_id', $request_id, PDO::PARAM_INT);
    $stmt->bindParam(':provider_id', $provider_id, PDO::PARAM_INT);
    $stmt->bindParam(':application_date', $application_date, PDO::PARAM_STR);
    $stmt->bindParam(':status', $status, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 200,
            'message' => 'Appointment accepted successfully'
        ]);
    } else {
        echo json_encode([
            'status' => 500,
            'message' => 'Failed to accept appointment',
            'debug' => $stmt->errorInfo()
        ]);
    }
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode([
        'status' => 405,
        'message' => 'Invalid Request Method'
    ]);
    exit();
}
?>
