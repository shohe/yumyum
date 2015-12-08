<!doctype html>
<html lang="en">
<?php
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
    //$user = $yumDB->selectUser($_GET['id']);
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>yum yum</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../lib/font-awesome/css/font-awesome.min.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div id="time-num-group"></div>

    <div id="penWidth"></div>

    <canvas id="test_canvas"></canvas>

    <div id="container">
        <img id="eraser" class="tuio-tapEvent" src="./images/eraser.png" alt="" />
        <a class="pallet" style="background: #4d4d4d;"></a>
        <a class="pallet" style="background: #fff;"></a>
        <a class="pallet" style="background: #187e9e;"></a>
        <a class="pallet" style="background: #b82323;"></a>
        <a class="pallet" style="background: #1f9e18;"></a>
        <a class="pallet" style="background: #bdb61a;"></a>
        <a class="pallet" style="background: rgba(255, 255, 255, 0);"></a>
    </div>

    <div id="menus">
        <i id="menu-controller" class="fa fa-plus-circle tuio-tapEvent"></i>
        <div id="menu-phone" class="menu-wrap tuio-tapEvent"><i class="fa fa-phone"></i></div>
        <div id="menu-paint" class="menu-wrap tuio-tapEvent" style="background:rgba(255,255,255,0.4);"><i class="fa fa-paint-brush"></i></div>
        <div id="menu-picture" class="menu-wrap tuio-tapEvent"><i class="fa fa-picture-o"></i></div>
        <div id="menu-back" class="menu-wrap tuio-tapEvent"><i class="fa fa-arrow-left"></i></div>
    </div>

    <!-- load scripts -->
    <script src="../lib/tuio/jquery-1.7.2.js"></script>
    <script src="../lib/tuio/jquery.easing.1.3.js"></script>
    <script src="../lib/tuio/lodash.js"></script>
    <script src="../lib/tuio/socket.io.js"></script>
    <script src="../lib/tuio/Tuio.min.js"></script>
    <script src="../lib/slider/jquery.bxslider.js"></script>
    <script src="../lib/sketch/easeljs.min.js"></script>
    <script src="../lib/sketch/sketch.min.js"></script>
    <script src="../lib/jquery-transform/jquery-css-transform.js"></script>
    <script src="../lib/jquery-transform/jquery-animate-css-rotate-scale.js"></script>
    <script src="./js/init.js"></script>
    <script src="./js/menu.js"></script>
    <script src="./js/time.js"></script>
    <script src="./js/drow.js"></script>
    <script src="./js/drawer.js"></script>
</body>
</html>
