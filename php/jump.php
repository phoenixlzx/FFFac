<?
/****************************************
 * This is the Jumpto Page and function *
 ****************************************/

include("./server/config.php");

if($GLOBALS['debugmode'])$timestart=microtime();

$ErrorPage="./404";

////Get Result From SQL////
function select($link,$id){
	if($stmt=mysqli_prepare($link,"SELECT * from url where id=?")){
		mysqli_stmt_bind_param($stmt,"s",$id);
		mysqli_stmt_execute($stmt);
		if($row=mysqli_fetch_row(mysqli_stmt_get_result($stmt))){
			return $row;
		}
	}
	//$query="select * from url where id='$id'";
	//if($result=mysqli_query($link,$query))
	//	if($row = mysqli_fetch_row($result))return $row;
	return false;
}

////Check if id legal////
function checkid($id){
	if(strlen($id)>12)//检查字符串长度
		return false;
	return true;
}

////Show Not Found Page////
function error404()
{
	global $ErrorPage;
	$page=fopen($ErrorPage,'r');
	echo fread($page,100000);
	fclose($page);
	exit('404');
}

////Show addition Text below////
function showquote($link,$result)
{
	if($result[2]==2)return $result[3];
	if($result[2]==1){
		$offset_result = mysqli_query($link,"SELECT FLOOR(RAND() * COUNT(*)) AS offset FROM quote ");  
		$offset_row = mysqli_fetch_row($offset_result);  
		$offset = $offset_row['0'];  
		return mysqli_fetch_row(mysqli_query($link,"SELECT * FROM quote LIMIT $offset,1"))['1'];
	}
}

////Call the function////
if(checkid($_GET['id'])){
	$result=select($link,$_GET['id']);
}else error404();
if($result==false)error404();

////if jump type = 0 use header jump immediately////
if($result[2]==0){
	header("Location: ".$result[1]);
	exit("Exit");
}
////else use meta jump with a page show////

?>

<!DOCTYPE html>
<head>
	<title>FFF传送中↑↗→↘↓↙←↖</title>
	<meta name="keywords" content="FFF传送" />
	<meta charset="utf-8" />
	<meta http-equiv="refresh" content="3;url=<?echo $result[1];?>">
	<link rel="icon"       href="image/fff-icon-001.png" />
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div class="container" id='wrap'>
		<div class="starter-template">
			<h3>你要前往的是:</h3><br>
			<a href="<?echo $result[1];?>"><B><?echo $result[1];?></B></a><br>
			<br>
			<br>
			<br>
			<h4><B><? echo showquote($link,$result);?></B></h4>
		</div>
	</div>
</body>




