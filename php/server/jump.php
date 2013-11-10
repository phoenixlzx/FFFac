<?
/****************************************
 * This is the Jumpto Page and function *
 ****************************************/

include("./config.php");

if($debugmode)$timestart=microtime();

$ErrorPage="./404.html";

////Get Result From SQL////
function select(){
	$query="select * from url where id=".$_GET['id'];
	if($result=mysqli_query($link,$query))
		if($row = mysqli_fetch_row($result)){
			if($debugmode) echo "Select Find";
			mysqli_free_result($result);
			return $result;
		}
	mysqli_free_result($result);
	return false;
}

////Check if id legal////
function checkid($id){
	if(strlen($id)>12)//检查字符串长度
		return false;
}

?>



