<?php
//	Diego Ramos Ruggeri
//	2010-10-27
//	diego[at]quenerd[dot]com[dot]br
//	Square fixed-size thumbnail generator

// File and new size

$filename = $_GET['img'];
$percent = 0.5;

// Get new sizes
list($width, $height) = getimagesize($filename);
$max_dim = max($width, $height);

//the maximal centered square that can fit the image
if($max_dim == $height){
	$x = 0;
	$y = ($height - $width)/2;
	$side = $width;
} else {
	$y = 0;
	$x = ($width-$height)/2;
	$side = $height;
}


// Content type
header('Content-type: image/jpeg');

// Load
$thumb = imagecreatetruecolor(100, 100);
$source = imagecreatefromgif($filename);

// Resize
imagecopyresampled($thumb, $source, 0, 0, $x, $y, 100, 100, $side, $side);

// Output
imagejpeg($thumb);

?>