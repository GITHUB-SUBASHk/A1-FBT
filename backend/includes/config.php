<?php
$pdo = new PDO("sqlite:../db/database.sqlite");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Init DB if not exists
$pdo->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT, last_name TEXT, username TEXT, email TEXT,
    dob TEXT, languages TEXT, country TEXT, state TEXT, city TEXT,
    password TEXT, email_token TEXT
)");
?>
