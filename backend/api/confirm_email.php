<?php
require_once '../includes/config.php';

$token = $_GET['token'] ?? '';

if (empty($token)) {
    http_response_code(400);
    echo json_encode(["error" => "Token missing"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email_token = ?");
$stmt->execute([$token]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404);
    echo json_encode(["error" => "Invalid token"]);
    exit;
}

echo json_encode([
    "message" => "Token valid",
    "user" => [
        "email" => $user["email"],
        "username" => $user["username"]
    ]
]);
?>
