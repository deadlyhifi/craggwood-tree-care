<?php
require '../../vendor/autoload.php';

if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
    $name = stripslashes(strip_tags($_POST['name']));
} else {
    $name = 'No name entered';
}
if ((isset($_POST['contact'])) && (strlen(trim($_POST['contact'])) > 0)) {
    $contact = stripslashes(strip_tags($_POST['contact']));
    $from = (strpos($contact, '@') ?
        $name . '<' . $contact . '>' :
        'Website Contact Form <no-reply@craggwoodtreecare.co.uk>'
    );
} else {
    $contact = 'No contact entered';
}

if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
    $message = stripslashes(strip_tags($_POST['message']));
} else {
    $message = 'No message entered';
}

# Mailgun
use Mailgun\Mailgun;

$mg = new Mailgun("key-f928329b1f49e091b8b174725cd8b86f");
$domain = "mg.craggwoodtreecare.co.uk";

$message = '<p>Name: ' . $name . '</p>'
        .'<p>Contact: ' . $contact . '</p>'
        .'<p>Message: </p><p>' . $message . '</p>';

$mg->sendMessage(
    $domain,
    array(
        'from'    => $from,
        'to'      => 'James Shilton <james@craggwoodtreecare.co.uk>',
        'bcc'     => 'Tom de Bruin <tom@deadlyhifi.com>',
        'subject' => 'Website Contact Form',
        'html'    => $message
    )
);

// Old school
// $headers  = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// $headers .= 'To: James Shilton <james@craggwoodtreecare.co.uk>' . "\r\n";
// $headers .= "From: Website Contact Form <no-reply@craggwoodtreecare.co.uk>" . "\r\n";
// $headers .= 'Bcc: tom@deadlyhifi.com' . "\r\n";
// $headers .= (strpos($contact, '@') ? 'Reply-To: ' . $contact . "\r\n" : null);
//
// $subject = 'Website Contact Form';
//
// $message = 'Name: ' . $name . '<br />'
//                     .'Contact: ' . $contact . '<br />'
//                     .'Message: <br /><br />' . $message;
//
// mail($to, $subject, $message, $headers);
