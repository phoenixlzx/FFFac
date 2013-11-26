<?
/******************************* *
 * This is Config and Mysql File *
 * Also include log function     *
 ********************************/

//Global params
$GLOBALS['safecode']="ncapoewijnrf;kcamkso;fn2p3rupwjdco;iasdhfopiasdjf";//encryption cookies
$mysql_host		="127.0.0.1";
$mysql_username	="short";
$mysql_passwd	="PFuh4Er98PtXH3sp";
$mysql_datebase	="short";
$GLOBALS['debugmode']=true;
$GLOBALS['time']=microtime();
$GLOBALS['allowsignup']=true;


//Mysql
$link= mysqli_connect(
	$mysql_host,
	$mysql_username,
	$mysql_passwd, 
	$mysql_datebase)
	or die("Error " . mysqli_error($link));
if(mysqli_connect_errno()){
	if($GLOBALS['debugmode']) echo "Can't connect to MySQL Server Error code:".mysqli_connect_error();
	die("MySQL Error");
}
if(!mysqli_set_charset($link,"utf8")){
	if($GLOBALS['debugmode']) echo "Can't Set MySQL UTF8.".mysqli_error($link);
	die("MySQL Charset Error");
}

////Check If Login////
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


?>




