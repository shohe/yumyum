<?php
header_remove('Access-Control-Allow-Origin');
header('Access-Control-Allow-Origin: *');
?>
<!doctype html>
<html lang="en">
<?php
    //private
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
    //$user = $yumDB->selectUser($_GET['id']);
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <title>yum yum</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../lib/font-awesome/css/font-awesome.min.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <!-- <p style="font-size:0.4em;"><?php //var_dump($home); ?></p> -->
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div id="time-num-group"></div>

    <!-- <div><img id="test-picture" class="tuio-tapEvent" src="./images/user/user_test.jpg" alt="" /></div> -->

    <div id="menus">
        <i id="menu-controller" class="fa fa-plus-circle tuio-tapEvent"></i>
        <div id="menu-phone" class="menu-wrap tuio-tapEvent"><i class="fa fa-phone"></i></div>
        <div id="menu-paint" class="menu-wrap tuio-tapEvent"><i class="fa fa-paint-brush"></i></div>
        <div id="menu-picture" class="menu-wrap tuio-tapEvent" style="background:rgba(255,255,255,0.4);"><i class="fa fa-picture-o"></i></div>
        <div id="menu-back" class="menu-wrap tuio-tapEvent"><i class="fa fa-arrow-left"></i></div>
    </div>

    <div id="upload-picture">
        <img id="test-picture" class="tuio-tapEvent" src="./images/user/user_test.jpg" alt="" style="top:200px;left:200px;opacity:1;"/>
        <img id="test-picture" class="tuio-tapEvent" src="./images/user/user_test.jpg" alt="" style="top:200px;left:900px;opacity:1;"/>
    </div>

    <!-- load scripts -->
    <script src="../lib/tuio/jquery-1.7.2.js"></script>
    <script src="../lib/tuio/jquery.easing.1.3.js"></script>
    <script src="../lib/tuio/lodash.js"></script>
    <script src="../lib/tuio/socket.io.js"></script>
    <script src="../lib/tuio/Tuio.min.js"></script>
    <script src="../lib/slider/jquery.bxslider.js"></script>
    <script src="../lib/jquery-transform/jquery-css-transform.js"></script>
    <script src="../lib/jquery-transform/jquery-animate-css-rotate-scale.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="./js/init.js"></script>
    <script src="./js/menu.js"></script>
    <script src="./js/time.js"></script>
    <script src="../lib/hammer/hammer.min.js" charset="utf-8"></script>
    <script src="../lib/jquery.hammer/jquery.hammer.js" charset="utf-8"></script>
    <script src="./js/picture.js"></script>
</body>
</html>
