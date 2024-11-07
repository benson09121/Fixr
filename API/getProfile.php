<?php

include './Database/database_conn.php';

include '../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $data['user_id'];
    $user_id = $data['user_id'];
    $query = "SELECT * FROM tbl_accounts WHERE user_id = $user_id";
    $result = $conn->query($query);

    if ($result->rowCount() > 0) {

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $allUsers[
                ] = [
                'id' => $row['user_id'],
                'firstName' => $row['f_name'],
                'lastName' => $row['l_name'],
                'email' => $row['email'],
                'Role' => $row['account_type'],
                'Status' => $row['status'],
                'createdAt' => $row['created_at'],
                'phone' => $row['phone'],
            ];
        }

        header("HTTP/1.0 200 OK");
        $data = [
            'status' => 200,
            'message' => 'Users Found',
            'data' => $allUsers,
        ];
        echo json_encode($data);
        exit();
    } else {
        header("HTTP/1.0 404 Not Found");
        $data = [
            'status' => 404,
            'message' => 'Users Not Found',
        ];
        echo json_encode($data);
        exit();
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