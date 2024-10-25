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

if($method == "POST"){

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$account_type = $data['account_type'] ?? null;
$user_id = $data['user_id'] ?? null;

$stmt = $conn->prepare("SELECT * FROM tbl_accounts WHERE user_id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();
if(!$user){
    header("HTTP/1.0 404 Not Found");
    $data = [
        'status' => 404,
        'message' => 'User Not Found',
    ];
    echo json_encode($data);
    exit();
}

 $userInfo =[
    'user_id' => $user['user_id'],
    'name' => $user['f_name'] . ' ' . $user['l_name'],
    'email' => $user['email'],
    'phone' => $user['phone'],
    'account_type' => $user['account_type'],
    'created_at' => $user['created_at'],
 ];

header("HTTP/1.0 200 OK");
$data = [
    'status' => 200,
    'message' => 'User Logged In Successfully',
    'data' => $userInfo,
];
echo json_encode($data);

}
else{
    header('HTTP/1.0 405 Method Not Allowed');
    $data = [
        'status' => 405,
        'message' => 'Invalid Request Method',
    ];
    echo json_encode($data);
    exit();
}
?>