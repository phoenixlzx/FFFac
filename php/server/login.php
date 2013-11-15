<?
/********************************
 * This is the login file       *
 ********************************/
include("./config.php");
session_start();
header('Content-type: text/json');
////Check if username is legal////
function checkusernamelegal($string){
	return preg_match ("^([a-zA-Z])([a-zA-Z0-9_]){2,20}$",$string);
}

////Login Function////
function checkpasswd($link,$username,$passwd){
	$row=mysqli_fetch_row(mysqli_query($link,"select * from user where username='$username';"));
	if($row==false)return 201;//No User found
	if($passwd!==$row[2])return 202;//Password Error
	if($row[4]==99)return 203;//User was banned
	$cookie=substr(MD5($username.$GLOBALS['safecode'].microtime()),16);//generate cookie;
	$expiretime=time()+3600;
	if($_POST['ltl']==true){
		$expiretime=time()+3600*24*7;
		$date=date("Y-m-d",$expiretime);
		mysqli_query($link,"insert into cookie values('$cookie','$date','$row[1]');");
	}
	setcookie('cookie',$cookie,$expiretime,"/");
	$_SESSION[$cookie]=[$row[1],$username,$row[4]];
	return $row;
}
function login($link,$post){
	$username=$post['username'];
	$passwd=$post['passwd'];//need MD5 secure at client. Only need top 16 characters.
	$row=checkpasswd($link,$username,$passwd);
	if(is_array($row)){
		$arr = array('code'=>101,'id'=>$row[1],'level'=>$row[4]);
		$log= $username." login at[".$_SERVER['REMOTE_ADDR']."]use ".$_SERVER['HTTP_USER_AGENT'];
		mysqli_query($link,"insert into log values(current_timestamp,'$row[1]','login','$log');");//log 
		
		echo json_encode($arr);
		exit(1);
	}
	echo json_encode(array('code'=>$row));
	exit($row);
}

function logout($link){
	$user=checklogin($link);
	if($user==0){
		echo json_encode(array("code"=>204));
		exit(204);
	}
	else{
		if($cookie=$_COOKIE['cookie']){
			mysqli_query($link,"delete * from cookie where cookie='$cookie';");
			setcookie('cookie',"123",$time()-3600*24*365,"/");
			session_unset();
			session_destroy();
			echo json_encode(array("code"=>101);
			exit(1);
		}
		echo json_encode(array("code"=>204));
		exit(204);
	}
}


if($_GET['function']==="login"){
	login($link,$_POST);
	exit(1);
}
if($_GET['function']==="checklogin"){
	$user=checklogin($link);
	if($user==0){
		echo json_encode(array("code"=>204));
		exit(204);
	}
	else {
		echo json_encode(array("code"=>101,"username"=>$user[1],"id"=>$user[0],"level"=>$user[2]));
		exit(1);
	}
}
if($_GET['function']==="logout"){
	logout($link);
	exit(1);
}









?>

