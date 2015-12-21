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
	<link rel="stylesheet" href="./css/style.css">
	<script src="../lib/tuio/jquery-1.7.2.js"></script>
    <script src="../lib/tuio/jquery.easing.1.3.js"></script>
    <script src="../lib/tuio/lodash.js"></script>
    <script src="../lib/tuio/socket.io.js"></script>
    <script src="../lib/tuio/Tuio.min.js"></script>
    <script src="./js/init.js"></script>
    <script type="text/javascript" src="../lib/peer/multiTalk.js" charset="UTF-8"></script>
</head>
<body>
	<canvas id="canvas"></canvas>
	<p id="callFromTitle"><?php echo $callFrom->getName() ?>さんから電話が来ました。</p>
	<div id="permitButtonDiv">
		<input type="button" value="出る" id="trueButton">
		<input type="button" value="出ない" id="cancelButton">
	</div>
<script type="text/javascript">
// SCREEN_W = $(document).width();
// SCREEN_H = $(document).height();

// $(function() {
// 	var trueButton = $('#trueButton');
//     var cancelButton = $('#cancelButton');

// 	trueButton.on('tapDown', function(e, x, y) {
//		opener.callPermitCheck('<?php //echo $callFromId ?>');
// 		window.close();
//     });

//     cancelButton.on('tapDown', function(e, x, y) {
//     	opener.callPermitCheck(null);
//     	window.close();
//     });
// });

	function callPermit() {
		//opener.callPermit = true;
		opener.callPermitCheck('<?php echo $callFromId ?>');
		window.close();
	}
	function callCancel() {
		//opener.callPermit = false;
		opener.callPermitCheck(null);
		window.close();
	}
</script>
<?php $yumDB->close() ?>
</body>
</html>
