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

    $user_id = $data['user_id'] ?? null;
    $category = $data['category'] ?? null;
    $description = $data['description'] ?? null;
    $requested_date = date('Y-m-d H:i:s');
    $status = 'Pending';

    if ($user_id && $category && $description) {
        $stmt = $conn->prepare("SELECT category_id FROM tbl_service_category WHERE CategoryName = ?");
        $stmt->execute([$category]);
        $category_id = $stmt->fetchColumn();

        if ($category_id) {
            $stmt = $conn->prepare("INSERT INTO tbl_service_request (user_id, category_id, Description, Requesteddate, Status) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$user_id, $category_id, $description, $requested_date, $status]);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['status' => 200, 'message' => 'Request submitted successfully']);
            } else {
                echo json_encode(['status' => 500, 'message' => 'Failed to submit request']);
            }
        } else {
            echo json_encode(['status' => 404, 'message' => 'Category not found']);
        }
    } else {
        echo json_encode(['status' => 400, 'message' => 'Missing required fields']);
    }
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    echo json_encode(['status' => 405, 'message' => 'Invalid Request Method']);
    exit();
}
?>