<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		class cate {
			public $id = "";
			public $cname  = "";
		}
		$array=[];
		$query = mysql_query("select * from cate_list where deleted='0'"); 
		while($rows = mysql_fetch_array($query)){
			$newItemCate=new cate();
			$newItemCate->id=$rows['id'];
			$newItemCate->cname=$rows['cname'];
			$array[] = $newItemCate;
		}
			Response::json(1,'获取素材类别列表成功！',$array);
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

