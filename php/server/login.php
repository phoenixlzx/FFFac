<?
/********************************
 * This is the login file       *
 ********************************/

include("./config.php");
session_start();
header('Content-type: text/json');
////Check if username is legal////
function checkusernamelegal($string){
	return preg_match ("/^([a-zA-Z])([a-zA-Z0-9_]){2,20}$/",$string);
}

////Login Function////
function checkpasswd($link,$username,$passwd){
	if($stmt=mysqli_prepare($link,"select * from user where username=?")){
		mysqli_stmt_bind_param($stmt,"s",$username);
		mysqli_stmt_execute($stmt);
		$row=mysqli_fetch_row(mysqli_stmt_get_result($stmt));
	//$row=mysqli_fetch_row(mysqli_query($link,"select * from user where username='$username';"));
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
	return 301;
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
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(1);
	}
	echo json_encode(array('code'=>$row));
	if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
	exit($row);
}
////Log Out Function
function logout($link){
	$user=checklogin($link);
	if($user==0){
		echo json_encode(array("code"=>204));
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(204);
	}
	else{
		if($cookie=$_COOKIE['cookie']){
			echo $cookie;
			mysqli_query($link,"delete from cookie where cookie='$cookie';");
			$log= $user[1]." logout with cookie ".$cookie;
			mysqli_query($link,"insert into log values(current_timestamp,'$user[0]','logout','$log');");//log 
			setcookie('cookie',"123",time()-3600*24*365,"/");
			session_unset();
			session_destroy();
			echo json_encode(array("code"=>101));
			if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
			exit(1);
		}
		echo json_encode(array("code"=>204));
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(204);
	}
}
////Signup Function////
function checkusernameinuse($link,$name){
	if(mysqli_fetch_row(mysqli_query($link,"select * from user where username='$name';"))==false)return false;
	return true;
}

function checkusername($link,$name){
	if(checkusernamelegal($_POST['username'])==false){
		echo json_encode(array("code"=>401));
		exit(401);
	}
	if(checkusernameinuse($link,$name)==true){
		echo json_encode(array("code"=>206));
		exit(206);
	}
   return true;	
}

function checkemail($link,$email){
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
		echo json_encode(array("code"=>403));
		exit(403);
	}
	if(mysqli_fetch_row(mysqli_query($link,"select * from user where email='$email';"))==false) return true;
	echo json_encode(array("code"=>207));
	exit(207);
}


function signup($link){
	if($GLOBALS['allowsignup']===false){
		echo json_encode(array("code"=>205));
		exit(205);
	}
	checkusername($link,$_POST['username']);
	checkemail($link,$_POST['email']);
	$username=$_POST['username'];
	$passwd=$_POST['passwd'];
	$email=$_POST['email'];
	if($stmt=mysqli_prepare($link,"insert into user values (?,'',?,?,1,0)")){
		mysqli_stmt_bind_param($stmt,"sss",$username,$passwd,$email);
		mysqli_stmt_execute($stmt);
	//if(mysqli_query($link,"insert into user values ('$username','','$passwd','$email',1,0);")){
		$log="user signup ".$username."at[".$_SERVER['REMOTE_ADDR']."]use ".$_SERVER['HTTP_USER_AGENT'];
		mysqli_query($link,"insert into log values(current_timestamp,'0','adduser','$log');");
		if($row=mysqli_fetch_row(mysqli_query($link,"select * from user where username='$username';"))){
			$arr=array('code'=>101,'userid'=>$row[1],'username'=>$row[0],'email'=>$row[3]);
			echo json_encode($arr);
			sendvalidemail($link,$row[1],$email);
			if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
			exit(1);
		}
	}   
	echo json_encode(array('code'=>301));
	if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
	exit(301);
}
////valid email////
function sendvalidemail($link,$userid,$email){
	$expiretime=time()+3600*24;
	$date=date("Y-m-d",$expiretime);
	$code=substr(MD5($userid.$GLOBALS['safecode'].$email.microtime()),16);
	if(mysqli_query($link,"insert into code values ('$code',1,'$date','$userid');")){
		$to=$email;
		$subject="FFFAC 的验证邮件";
		$message="您好：\n 您收到这封邮件的原因是因为你注册成为了FFF.ac成员。请点击以下连接以验证邮箱：\n http://fff.ac/login.php?function=checkmailcode&code=".$code."\n 感谢您的注册，如果这不是本人操作的，请忽略这封邮件。";
		$headers="From: welcome@fff.ac";
		if(mail($to,$subject,$message,$headers)){
			return true;
		}
	}
	return false;
}

function checkmailcode($link){
	$code=$_GET['code'];
	if($stmt=mysqli_prepare($link,"select * from code where code =?")){
		mysqli_stmt_bind_param($stmt,'s',$code);
		mysqli_stmt_execute($stmt);
		if($row=mysqli_fetch_row(mysqli_stmt_get_result($stmt))){
	//if($row=mysqli_fetch_row(mysqli_query($link,"select * from code where code='$code';"))){
			if(time()<strtotime($row[2])){
				if($row[1]==1){
					$id=$row[3];
					if($mysqli_query($link,"update user set emailvalid='1' where id='$id';"))return true;
				}
			}	
		}
	}
	return false
}

function requirvalidemail($link){
	$user=checklogin($link);
	if(is_array($user)){
		$row=0;
	}
}



////main function
if($_GET['function']==="login"){
	login($link,$_POST);
	exit(1);
}
if($_GET['function']==="checklogin"){
	$user=checklogin($link);
	if($user==0){
		echo json_encode(array("code"=>204));
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(204);
	}
	else {
		echo json_encode(array("code"=>101,"username"=>$user[1],"id"=>$user[0],"level"=>$user[2]));
		if($GLOBALS['debugmode'])echo microtime()-$GLOBALS['time'];
		exit(1);
	}
}
if($_GET['function']==="logout"){
	logout($link);
	exit(1);
}
if($_GET['function']==="checkusername"){
	if(checkusername($link,$_POST['username'])===true)echo json_encode(array("code"=>101));
	exit(1);
}
if($_GET['function']==="signup"){
	signup($link);
	exit(1);
}
if($_GET['function']==="checkmailcode"){
	if(checkmailcode($link)===true){
		echo "valid OK";
		exit(1);
	}
	echo "code error";
		exit(2);
}







?>

