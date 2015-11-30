<?php
	require_once 'db.class.php';
	$dbClass = new dbClass();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>複数人通話</title>
	<script type="text/javascript" src="./jquery-2.0.3.min.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./peer.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./eventemitter2.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./md5.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./multiparty.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./multiTalk.js" charset="UTF-8"></script>
	<style>video {width: 200px;}</style>
	<style>#idEmpty {display: none;}</style>
</head>
<body>
<div id="user">
	<?php $dbClass->selectUser($_GET["id"])?>
	<script type="text/javascript">setUpPeer('<?php echo $dbClass->selectUserPhoneNumber($_GET["id"])?>')</script>
	<video id="my-video" autoplay="autoplay"></video>
</div>
<div id="friendsList">
	<p>誰にかけますの？</p>
<?php
	$dbClass->selectFriends($_GET["id"]);
?>
</div>
<hr>
<div id="endDiv">
	<form id="talkClose">
		<input type="button" id="endButton" value="通話終了">
	</form>
</div>
<div id="streams"></div>
</body>
</html>