<?php

include '../Database/database_conn.php';

include '../../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$env = parse_ini_file('../../.env');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {

    $data = json_decode(file_get_contents('php://input'), true);

    $data['Status'] = $data['Status'] == 'True' ? 1 : 0;

   $stmt = $conn->prepare("UPDATE tbl_accounts SET f_name = :f_name, l_name = :l_name, email = :email, account_type = :account_type, status = :status WHERE user_id = :user_id");
    $stmt->bindParam(':f_name', $data['firstName']);
    $stmt->bindParam(':l_name', $data['lastName']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':account_type', $data['Role']);
    $stmt->bindParam(':status', $data['Status']);
    $stmt->bindParam(':user_id', $data['id']);
    if($stmt->execute()){

        header("HTTP/1.0 200 OK");
        $data = [
            'status' => 200,
            'message' => 'Data Changed',
        ];
        echo json_encode($data);
        exit();
    } else{
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