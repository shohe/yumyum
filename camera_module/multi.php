<?php
	require_once 'db.class.php';
	$dbClass = new dbClass();
	$dbClass->selectUserById($_GET["id"]);
	$user = $dbClass->returnUserInfo();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>複数人通話</title>
	<script type="text/javascript" src="./jquery-2.0.3.min.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./peer.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./multiparty.js" charset="UTF-8"></script>
	<script type="text/javascript" src="./multiTalk.js" charset="UTF-8"></script>
	<style>video {width: 200px;}</style>
	<style>#idEmpty {display: none;}</style>
</head>
<body>
<div id="user">
	<p><?php echo $user["name"]?>さん</p>
	<input type="hidden" id="peerId" value="<?php echo $user["peerId"] ?>">
	<p>（Peer接続ID:<?php echo $user["peerId"] ?>）</p>
	<script type="text/javascript">setUpPeer()</script>
	<video id="my-video" autoplay="autoplay"></video>
</div>
<div id="friendsList">
	<p>誰にかけますの？</p>
<?php
	$dbClass->selectFriendsForButton($_GET["id"]);
?>
</div>
<hr>
<div id="endDiv">
	<input type="button" id="endButton" value="通話終了" onclick="endCall()">
</div>
<div id="streams"></div>
</body>
<?php $dbClass->dbClose() ?>
</html>