<?
/********************************
 * This is the login file       *
 ********************************/
include("./config.php");
session_start();
header('Content-type: text/json');


////Check if username is legal////
function checkusernamelegal($string){
	return preg_match ("^([a-zA-Z])([a-zA-Z0-9_]){2,9}$",$string);
}

////Login Function////
function checkpasswd($link,$username,$passwd){
	$row=mysqli_fetch_row(mysqli_query($link,"select * from user where name='$username';"));
	if($row==false)return 201;//No User found
	if($passwd!==$row['passwd'])return 202;//Password Error
	if($row['level']===99)return 203;//User was banned
	$cookie=substr(MD5($username.$GLOBALS['safecode'].microtime()),16);//generate cookie;
	$expiretime=time()+3600;
	if($post['ltl']==true)$expiretime=time()+3600*24*7;
	setcookie('cookie',$cookie,$expiretime,"/");
	$_SESSION[$cookie]=[$id,$username,$row['level']];
	return $row;
}
function login($link,$post){
	$username=$post['username'];
	$passwd=$post['passwd'];//need MD5 secure at client. Only need top 16 characters.
	$row=checkpasswd($link,$username,$passwd);
	if(is_array($row)){
		$arr = array('code'=>101,'id'=>$row['id'],'level'=>$row['level']);
		$log=$username."	login at	"$HTTP_SERVER_VARS['HTTP_X_FORWARDED_FOR'];
		mysqli_query($link,"insert into 'log'('time','function','action')values(current_timestamp,'login','$log');";//log 
		echo json_encode($arr);
		exit(1);
	}
	echo json_encode(array('code'=>$row));
	exit($row);
}


if($_GET['function']==="login"){
	login($link,$_POST);
	exit();
}











?>

