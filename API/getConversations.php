<?php
include './Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "GET") {
    $user_id = $_GET['user_id'];

    $sql = "
        SELECT 
            c.conversation_id,
            c.user1_id,
            u1.f_name AS user1_first_name,
            u1.l_name AS user1_last_name,
            u1.account_type AS user1_role,
            c.user2_id,
            u2.f_name AS user2_first_name,
            u2.l_name AS user2_last_name,
            u2.account_type AS user2_role,
            c.updated_at
        FROM 
            tbl_conversations c
        JOIN 
            tbl_accounts u1 ON c.user1_id = u1.user_id
        JOIN 
            tbl_accounts u2 ON c.user2_id = u2.user_id
        WHERE 
            c.user1_id = :user_id OR c.user2_id = :user_id
        ORDER BY 
            c.updated_at DESC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $conversations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['conversations' => $conversations]);
} else {
    header('HTTP/1.0 405 Method Not Allowed');
    $data = [
        'status' => 405,
        'message' => 'Invalid Request Method',
    ];
    echo json_encode($data);
    exit();
}
