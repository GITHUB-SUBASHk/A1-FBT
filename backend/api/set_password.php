<?php
require_once '../includes/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['token']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing token or password."]);
    exit;
}

$hash = password_hash($data['password'], PASSWORD_BCRYPT);
$stmt = $pdo->prepare("UPDATE users SET password=? WHERE email_token=?");

$stmt->execute([$hash, $data['token']]);
echo json_encode(["message" => "Password set successfully."]);
?>
