<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
	    $obj=json_decode($content);
		$id = $obj->{'id'};
		$cateid = $obj->{'cateid'};
		$typeid = $obj->{'typeid'};
		$content = html_entity_decode($obj->{'content'});
		$posters = json_encode($obj->{'posters'});

		$exec="update mate_list set cateid='$cateid',typeid='$typeid',content='$content',posters='$posters' where id='$id'";
		$result=mysql_query($exec);
		if($result){
			Response::json(1,'添加成功！','');
		}else{
			Response::json(0,'添加失败，重新添加！','');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

