<?php

$query = $_POST['query'];
$page = $_POST['page'];

$curl = curl_init();
curl_setopt ($curl, CURLOPT_URL, 
						 "http://search.twitter.com/search.json?q=" . urlencode($query) . 
						 "&amp;rpp=100&amp;page=" . urlencode($page));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec ($curl);
curl_close ($curl);

header('Content-Type: application/xml; charset=ISO-8859-1');
print $result;

?>