<?php
	require_once 'db.class.php';
	$dbClass = new dbClass();
	$dbClass->selectUserByPhone($_GET["from"]);
	$callFrom = $dbClass->returnUserInfo();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>電話が来ました</title>
	<script type="text/javascript" src="./multiTalk.js" charset="UTF-8"></script>
</head>
<body>
	<p><?php echo $callFrom["name"] ?>さんから電話が来ました。</p>
	<input type="submit" onclick="callPermit();" value="出る" id="trueButton" class="permitButton">
	<input type="submit" onclick="callCancel();" value="出ない" id="cancelButton" class="permitButton">
<script type="text/javascript">
	function callPermit() {
		opener.callPermit = true;
		opener.callPermitCheck();
		window.close();
	}
	function callCancel() {
		opener.callPermit = false;
		opener.callPermitCheck();
		window.close();
	}
</script>
<?php $dbClass->dbClose() ?>
</body>
</html>
