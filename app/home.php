<!doctype html>
<html lang="en">
<?php
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
    $user = $yumDB->selectUser($_GET['id']);
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>yum yum</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../lib/slider/jquery.bxslider.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="../lib/font-awesome/css/font-awesome.min.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div id="time-num-group"></div>

    <div id="content" style="position:absolute; width:100%; height:100%;">
        <p id="discription">こんにちは。<?php echo $user->getName(); ?>さん。<br/>楽しい食事とコミュニケーションをサポートいたします。<br/>下のボタンから利用するアプリケーションを選んでください。</p>
        <div id="mark-cursor"><img src="./images/mark-circle.png" alt="" /></div>
        <ul id="button-set">
            <li><div id="phone" class="mark-wrap tuio-tapEvent"><i class="fa fa-phone"></i></div></li>
            <li><div id="paint" class="mark-wrap tuio-tapEvent"><i class="fa fa-paint-brush"></i></div></li>
            <li><div id="picture" class="mark-wrap tuio-tapEvent"><i class="fa fa-picture-o"></i></div></li>
        </ul>
    </div>

    <!-- load scripts -->
    <script src="../lib/tuio/jquery-1.7.2.js"></script>
    <script src="../lib/tuio/jquery.easing.1.3.js"></script>
    <script src="../lib/tuio/lodash.js"></script>
    <script src="../lib/tuio/socket.io.js"></script>
    <script src="../lib/tuio/Tuio.min.js"></script>
    <script src="../lib/slider/jquery.bxslider.js"></script>
    <script src="./js/init.js"></script>
    <script src="./js/time.js"></script>
    <script src="./js/home.js"></script>
</body>
</html>
