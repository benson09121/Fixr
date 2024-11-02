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
            tbl_accounts.f_name, 
            tbl_accounts.l_name,
            tbl_address_municipality.name AS municipality_name, 
            tbl_address_barangay.name AS barangay_name,
            tbl_address.street_address,
            tbl_service_category.CategoryName,
            tbl_service_request.Description
        FROM tbl_service_request
        INNER JOIN tbl_accounts
            ON tbl_service_request.user_id = tbl_accounts.user_id
        INNER JOIN tbl_address
            ON tbl_accounts.user_id = tbl_address.user_id
        INNER JOIN tbl_address_municipality
            ON tbl_address.municipality_id = tbl_address_municipality.municipality_id
        INNER JOIN tbl_address_barangay
            ON tbl_address.barangay_id = tbl_address_barangay.barangay_id
        INNER JOIN tbl_service_category
            ON tbl_service_request.category_id = tbl_service_category.category_id;
    ");
    
    $stmt->execute();
    $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$appointments) {
        header("HTTP/1.0 404 Not Found");
        echo json_encode([
            'status' => 404,
            'message' => 'No Available Appointments Found',
            'debug' => $stmt->errorInfo() 
        ]);
        exit();
    }

    $appointmentInfo = array_map(function ($appointment) {
        return [
            'name' => $appointment['f_name'] . ' ' . $appointment['l_name'],
            'CategoryName' => $appointment['CategoryName'],
            'Description' => $appointment['Description'],
            'Address' => [
                'Municipality' => $appointment['municipality_name'],
                'Barangay' => $appointment['barangay_name'],
                'Street' => $appointment['street_address'],
            ],
        ];
    }, $appointments);

    header("HTTP/1.0 200 OK");
    echo json_encode([
        'status' => 200,
        'data' => $appointmentInfo
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