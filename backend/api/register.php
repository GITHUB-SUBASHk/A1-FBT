<?php
require_once '../includes/config.php';

$data = json_decode(file_get_contents("php://input"), true);

$required = ['firstName', 'lastName', 'username', 'email', 'dob', 'languages', 'country', 'state', 'city'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "$field is required."]);
        exit;
    }
}

$stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, username, email, dob, languages, country, state, city, email_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$token = bin2hex(random_bytes(16));
$languages = implode(",", $data['languages']);

$stmt->execute([
    $data['firstName'], $data['lastName'], $data['username'], $data['email'], $data['dob'], $languages,
    $data['country'], $data['state'], $data['city'], $token
]);

// Simulated email sending
$link = "http://localhost:3000/set-password?token=$token";
file_put_contents("../email_log.txt", "Email to {$data['email']} with link: $link\n", FILE_APPEND);

echo json_encode(["message" => "Registered successfully. Check email to set password."]);
?>
