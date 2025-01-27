<?php
$from = "From: Avto";
    $mess .= "Tel: - ".$_POST["phone"]."\n";
    $mess .= "Email - ".$_POST["email"]."\n";
    $mess .= "Question - ".$_POST["question"]."\n";
    $mess .= "Date - ".$_POST["year"]."\n";
    $mess .= "Model Car - ".$_POST["markcar"]."\n";
    $mess .= "Model Car - ".$_POST["modcar"]."\n";
    $mess .= "Name Form - ".$_POST["modal"]."\n";
    $mess .= "Code - ".$_POST["code"]."\n";
    $mess .= "Name - ".$_POST["username"]."\n";
    $zag = 'Zakaz from Avto Site';
    $zag2 =iconv("UTF-8", "windows-1251", $zag); 
    $to = "kapellaplus@mail.ru";
    $end = iconv("UTF-8", "windows-1251", $mess);
    mail($to, $zag, $mess, $from);

header('Location: ajax.html');
?>