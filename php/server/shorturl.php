<?
/********************************
 * This file to short url       *
 * ******************************/
include("./config.php");
session_start();
header('Content-type: text/json');

////add url to database////
function addurl($link,$url,$id,$userid=1,$type=1,$text=""){
	if($stmt=mysqli_prepare($link,"insert into url values (?,?,?,?,?)")){
		mysqli_stmt_bind_param($stmt,"ssisi",$id,$url,$type,$text,$userid);
		mysqli_stmt_execute($stmt);
	//if(mysqli_query($link,"insert into url values ( '$id','$url','$type','$text','$userid');")){
		$log="setup a short url ".$id;
		mysqli_query($link,"insert into log values(current_timestamp,'$userid','addurl','$log');");
		$arr=array('code'=>101,'id'=>$id,'url'=>$url);
		echo json_encode($arr);
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(1);
	}
	echo json_encode(array('code'=>301));
	if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
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
	if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
	exit(402);
}



