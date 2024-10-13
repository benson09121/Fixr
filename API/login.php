<?php

include 'database_conn.php';

include '../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

$env = parse_ini_file('../.env');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {

    $json = file_get_contents('php://input');

    $data = json_decode($json, true);


    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    $query = "SELECT * FROM tbl_users";
    $result = PDO::query($query);

    if ($result->rowCount() > 0) {
        while ($row = $result->fetch()) {
            if ($row['email'] == $email && password_verify($password, $row['password'])) {


                $jwt = JWT::encode($user_data, $env['VITE_REACT_JWT_SECRET'], 'HS256');

                header("HTTP/1.0 200 OK");
                $data = [
                    'status' => 200,
                    'message' => 'User Logged In Successfully',
                    'data' => $jwt,
                ];
                echo json_encode($data);
            } else {
                echo "Failed";
            }
        }
    } else {
        echo "No user found";
    }


    $user_data = [
        'user_id' => $row['user_id'],
        'account_type' => $row['account_type'], 
    ];

    $jwt = JWT::encode($user_data, $env['VITE_REACT_JWT_SECRET'], 'HS256');

    header("HTTP/1.0 200 OK");
    $data = [
        'status' => 200,
        'message' => 'User Logged In Successfully',
        'data' => $jwt,
    ];
    echo json_encode($data);

} else {
    echo "Failed";
}
?>