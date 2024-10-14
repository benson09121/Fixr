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

if($method == "POST"){

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$f_name = $data['f_name'] ?? null;
$l_name = $data['l_name'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$phone = $data['phone'] ?? null;
$account_type = "user";

$sql = "SELECT * FROM tbl_accounts WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();
if($user){
    header("HTTP/1.0 400 Bad Request");
    $data = [
        'status' => 400,
        'message' => 'User Already Exists',
    ];
    echo json_encode($data);
    exit();
}

$hashed_pass = password_hash($password, PASSWORD_BCRYPT);
$sql = "INSERT INTO tbl_accounts (account_type, f_name, l_name, email, password, phone) VALUES (?,?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$account_type, $f_name, $l_name, $email, $hashed_pass, $phone]);
$user_id = $conn->lastInsertId();

$user_data = [
    'user_id' => $user_id,
    'account_type' => $account_type,
];

$jwt = JWT::encode($user_data, $env['VITE_REACT_JWT_SECRET'], 'HS256');

header("HTTP/1.0 200 OK");
$data = [
    'status' => 200,
    'message' => 'User Logged In Successfully',
    'data' => $jwt,
];
echo json_encode($data);

}
else{
    $data = [
        'status' => 400,
        'message' => 'Invalid Request Method',
    ];
    echo json_encode($data);
    exit();
}
?>