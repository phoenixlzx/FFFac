<?
/********************************
 * This is Config and Mysql File*
 *******************************/

//Global params
$safecode		="ncapoewijnrf;kcamkso;fn2p3rupwjdco;iasdhfopiasdjf";//encryption cookies
$mysql_host		="127.0.0.1";
$mysql_username	="short";
$mysql_passwd	="PFuh4Er98PtXH3sp";
$mysql_datebase	="short";
$debugmode		=true;

//Mysql
$link= mysqli_connect(
	$mysql_host,
	$mysql_username,
	$mysql_passwd, 
	$mysql_datebase)
	or die("Error " . mysqli_error($link));
if(mysqli_connect_errno()){
	if($debugmode) echo "Can't connect to MySQL Server Error code:".mysqli_connect_error();
	die("MySQL Error");
}
if(!mysqli_set_charset($link,"utf8")){
	if($debugmode) echo "Can't Set MySQL UTF8.".mysqli_error($link);
	die("MySQL Charset Error");
}
?>



