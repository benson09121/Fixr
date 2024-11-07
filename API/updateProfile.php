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
    $fname = $data['f_name'] ?? null;
    $lname = $data['l_name'] ?? null;
    $email = $data['email'] ?? null;
    $phone = $data['phone'] ?? null;
    $user_id = $data['user_id'] ?? null;
    $current_password = $data['current_password'] ?? null;
    $new_password = $data['new_password'] ?? null;
    $add_query = "";
    if($current_password && $new_password){
        $query = "SELECT * FROM tbl_accounts WHERE user_id = $user_id";
        $result = $conn->query($query);
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if(password_verify($current_password, $row['password'])){
            $new_password = password_hash($new_password, PASSWORD_DEFAULT);
            $add_query = "password = :password";
        }else{
            header("HTTP/1.0 400 Bad Request");
            $data = [
                'status' => 400,
                'message' => 'Current Password is incorrect',
            ];
            echo json_encode($data);
            exit();
        }
    }

    $query = "UPDATE tbl_accounts SET f_name = :f_name, l_name = :l_name, email = :email, phone = :phone $add_query WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':f_name', $fname);
    $stmt->bindParam(':l_name', $lname);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':user_id', $user_id);
    if($current_password && $new_password){
        $stmt->bindParam(':password', $new_password);
    }
    $stmt->execute();
    if($stmt->rowCount() > 0){
        header("HTTP/1.0 200 OK");
        $data = [
            'status' => 200,
            'message' => 'Profile Updated Successfully',
        ];
        echo json_encode($data);
        exit();
    }else {
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