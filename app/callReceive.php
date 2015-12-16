<?php
	require_once './modules/YumDB.class.php';
	$yumDB = new YumDB();
	$callFromId = $_GET["from"];
	$callFrom = $yumDB->selectUserByPhone($callFromId);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>電話が来ました</title>
	<script type="text/javascript" src="../lib/peer/multiTalk.js" charset="UTF-8"></script>
</head>
<body>
	<p><?php echo $callFrom->getName() ?>さんから電話が来ました。</p>
	<input type="button" onclick="callPermit();" value="出る" id="trueButton">
	<input type="button" onclick="callCancel();" value="出ない" id="cancelButton">
<script type="text/javascript">
	function callPermit() {
		opener.callPermit = true;
		opener.callPermitCheck('<?php echo $callFromId ?>');
		window.close();
	}
	function callCancel() {
		opener.callPermit = false;
		opener.callPermitCheck(null);
		window.close();
	}
</script>
<?php $yumDB->close() ?>
</body>
</html>
