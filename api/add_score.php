<?php

    require_once 'functions.php';
    require_once 'db_connection.php';
    set_exception_handler('error_handler');
    startup();
    $method = $_SERVER['REQUEST_METHOD'];
    $item = file_get_contents('php://input');
    if (!$conn) {
        throw new Exception(mysqli_connect_error($conn));
        exit();
    }
    if ($method == 'POST'){
        $score = json_decode($item, true);
        $initials = json_encode($score['initials']);
        $high_score = json_encode($score['high_score']);
        $query = "INSERT INTO `high_scores`(`initials`, `guesses`)
                VALUES ({$initials}, \"{$high_score}\")";
        $result = mysqli_query($conn, $query);
        print_r($result);
    }
    elseif ($method == 'GET'){
        $query = 'SELECT * FROM `high_scores`';
        $result = mysqli_query($conn, $query);
        $output = [];
        while ($row = mysqli_fetch_assoc($result)){
            $output[] = $row;
        }
        $json_output = json_encode($output);
        print_r($json_output);
    }

?>