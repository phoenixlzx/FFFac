<?
/********************************
 * This file to short url       *
 * ******************************/
include("./config.php");
session_start();
header('Content-type: text/json');

////Check If Login////
/*
function checklogin($link){
	if(isset($_SESSION[$_COOKIE['cookie']]))
		return $_SESSION[$_COOKIE['cookie']];//login
	$cookie=$_COOKIE['cookie'];
	if($row=mysqli_fetch_row(mysqli_query($link,"select * from cookie where cookie='$cookie';")))
		if(time()<strtotime($row[1])){
			$id=$row[2];
			if(!$user=mysqli_fetch_row(mysqli_query($link,"select * from user where id='$id';")))return 0;
			$_SESSION[$cookie]=[$row[2],$user[0],$user[4]];
			return $_SESSION[$_COOKIE['cookie']];
		}
	return 0;//no login
}
 */

////add url to database////
function addurl($link,$url,$id,$userid=1,$type=1,$text=""){
	if(mysqli_query($link,"insert into url values ( '$id','$url','$type','$text','$userid');")){
		$log="setup a short url ".$id;
		mysqli_query($link,"insert into log values(current_timestamp,'$userid','addurl','$log');");
		$arr=array('code'=>101,'id'=>$id,'url'=>$url);
		echo json_encode($arr);
		exit(1);
	}
	echo json_encode(array('code'=>301));
	exit(301);
}
////generate the id////
function generateid($link,$long){
	$chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	$id = '';
	for($i=0;$i<$long;$i++)$id .= $chars[mt_rand(0,35)];
	$row=mysqli_fetch_row(mysqli_query($link,"select * from url where id='$id';"));
	if($row==false)return $id;
	else return generateid($link,$long);
}
////check if url legal////
function checkurl($string){
	return filter_var($string, FILTER_VALIDATE_URL);
}	

if($_GET['function']==="addurl"){
	$userid=is_array(checklogin($link))?checklogin($link)[0]:1;
	$id=generateid($link,8);
	if(checkurl($_POST['url'])==true)addurl($link,$_POST['url'],$id,$userid);
	else echo json_encode(array('code'=>402));
	exit(402);
}



