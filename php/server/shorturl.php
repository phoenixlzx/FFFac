<?
/********************************
 * This file to short url       *
 * ******************************/
include("./config.php");
session_start();
header('Content-type: text/json');

////Check If Login////
function checklogin($cookie){
	if(isset($_SESSION[$cookie]))
		return $_SESSION[$cookie];//login
	return 0;//no login
}

////add url to databoase
function addurl($link,$url,$id,$type=1,$text="",$userid=1;){
	if(mysqli_query($link,"insert into 'url' ('id','url','type`, `text`, `userid`) values ( '$id','$url','$type','$text','$userid');"){
		$log=$userid." setup a short url ".$id;
		mysqli_query($link,"insert into 'log'('time','function','action')val    ues(current_timestamp,'addurl','$log');");
		$arr=array('code'=>101,'id'=>$id,'url'=>$url);
		echo json_encode($arr);
		exit(1);
	}
	echo json_encode(array('code'=>301));
	exit(301);
}


