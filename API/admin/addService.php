<?php

include '../Database/database_conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    if (isset($_FILES['image']) && isset($_POST['name']) && isset($_POST['description'])) {
        $image = $_FILES['image'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $targetDir = "../Images/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true); // Create the directory if it doesn't exist
        }
        $FileName = basename($image["name"]);
        $targetFile = $targetDir . basename($image["name"]);

        if (move_uploaded_file($image["tmp_name"], $targetFile)) {
            $sql = "INSERT INTO tbl_service_category (categoryName, Description, image) VALUES (:category, :description, :image)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':category', $name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':image', $FileName);

            if ($stmt->execute()) {
                header("HTTP/1.0 200 OK");
                $data = [
                    'status' => 200,
                    'message' => 'Service added successfully',
                ];
                echo json_encode($data);
                exit();
            } else {
                $data = [
                    'status' => 500,
                    'message' => 'Failed to add service'
                ];
                echo json_encode($data);
            }
        } else {
            $data = [
                'status' => 500,
                'message' => 'Failed to upload image'
            ];
            echo json_encode($data);
        }
    } else {
        $data = [
            'status' => 400,
            'message' => 'Invalid input'
        ];
        echo json_encode($data);
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