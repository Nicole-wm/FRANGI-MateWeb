<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	class mate {
		public $id = "";
		public $content  = "";
		public $posters  = "";
	}
	$array=[];
	if(isset($_GET['typeID'])){
		$typeID = $_GET['typeID'];
	}else{
		$typeID = "";
	}
	if(isset($_GET['mateID'])){
		$mateID = $_GET['mateID'];
	}else{
		$mateID = "";
	}
	if(isset($_GET['page'])){
		$page = intval($_GET['page']);
	}else{
		$page = 1;
	}
	if(isset($_GET['limit'])){
		$limit = intval( $_GET['limit'] );
	}else{
		$limit = 10;
	}

	// 获取总数据量
	if($mateID){
		$query = "select count(*) as amount from mate_list where deleted='0' and id=".$mateID; 
		$sql = "select * from mate_list where deleted='0' and id=".$mateID." order by id desc limit ". ($page-1)*$limit .", $limit";
	}else{
		if($typeID){
			$query = "select count(*) as amount from mate_list where deleted='0' and typeid=".$typeID; 
			$sql = "select * from mate_list where deleted='0' and typeid=".$typeID." order by id desc limit ". ($page-1)*$limit .", $limit";
		}else{
			$query = "select count(*) as amount from mate_list where deleted='0'"; 
			$sql = "select * from mate_list where deleted='0' order by id desc limit ". ($page-1)*$limit .", $limit";
		}
	}
	
	$result = mysql_query($query);
	/*$row = mysql_fetch_row($result);
	$amount = $row['amount'];*/
	list($count) = mysql_fetch_row($result);

	// 获取数据，以二维数组格式返回结果
	if($count){
		$result = mysql_query($sql);
		while ($row = mysql_fetch_array($result)){
			$newItemMate=new mate();
			$newItemMate->id=$row['id'];
			$newItemMate->content=$row['content'];
			$newArr=[];
			$curposter=json_decode($row['posters']);
			$num = count($curposter); 
			for($i=0;$i<$num;++$i){ 
				$newArr[]="http://cms.frangi.cn".$curposter[$i]; 
			}
			$newItemMate->posters=$newArr;
			$results[] = $newItemMate;
		}
	}else{
		$results = array();
	}

	class matelist {
		var $count;
		var $results;
	}

	$curlist=new matelist();
	$curlist->count = intval($count);
	$curlist->results = $results;

	Response::json(1,'获取素材列表成功！',$curlist);
}else{
	Response::json(0,'Server Error！');   
}
mysql_close($conn);
?>
