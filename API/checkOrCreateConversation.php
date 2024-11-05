<?php
include './Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $input = json_decode(file_get_contents('php://input'), true);
    $user1_id = $input['user1_id'];
    $user2_id = $input['user2_id'];

    $stmt = $conn->prepare("SELECT conversation_id FROM tbl_conversations WHERE (user1_id = :user1_id AND user2_id = :user2_id) OR (user1_id = :user2_id AND user2_id = :user1_id)");
    $stmt->execute(['user1_id' => $user1_id, 'user2_id' => $user2_id]);
    $conversation_id = $stmt->fetchColumn();

    if (!$conversation_id) {
      
        $stmt = $conn->prepare("INSERT INTO tbl_conversations (user1_id, user2_id) VALUES (:user1_id, :user2_id)");
        $stmt->execute(['user1_id' => $user1_id, 'user2_id' => $user2_id]);
        $conversation_id = $conn->lastInsertId();
    }

    $data = [
        'conversation_id' => $conversation_id
    ];
    echo json_encode($data);
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    $data = [
        'status' => 405,
        'message' => 'Invalid Request Method',
    ];
    echo json_encode($data);
    exit();
}