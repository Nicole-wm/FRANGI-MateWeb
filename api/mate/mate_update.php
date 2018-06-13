<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$id=$_GET['id'];
		$type=$_GET['type'];

		if($type == "true"){
			$exec="update mate_list set likecount=likecount+1 where id='$id'";
		}else{
			$exec="update mate_list set likecount=likecount-1 where id='$id'";
		}
		$result=mysql_query($exec);
		if($result){
			Response::json(1,'修改成功！','');
		}else{
			Response::json(0,'修改失败，重新添加！','');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

