<!doctype html>
<html lang="en">
<?php
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
    $friends = null;
    $user = null;
    $isMulti = ($_GET['multi'] == 'true') ? true : false;
    $user = $yumDB->selectUser($_GET['id']);
    if ($isMulti) {
        $friends = $yumDB->selectUsers($_GET['callId']);
    } else {
        $friends = $yumDB->selectUser($_GET['callId']);
    }
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>yum yum</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <script type="text/javascript" src="./js/peer.js"></script>
    <link rel="stylesheet" href="../lib/slider/jquery.bxslider.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="../lib/font-awesome/css/font-awesome.min.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div id="time-num-group"></div>

    <div id="call-load">
        <div class="img-wrap tuio-tapEvent"><?php echo "<img src='".$friends->getIcon()."' alt='".$friends->getID()."' />"; ?></div>
        <div class="user-name"><?php echo $friends->getName(); ?></div>
        <div class="user-comment"><?php echo $friends->getComment(); ?></div>
    </div>

    <div id="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <input type="hidden" id="peerID" value="<?php echo $friends->getPhoneNumber(); ?>">
    <input type="hidden" id="myID" value="<?php echo $user->getPhoneNumber(); ?>">
    <video id="my-video" autoplay="autoplay"></video>
    <div id="streams"></div>

    <div id="menus">
        <i id="menu-controller" class="fa fa-plus-circle tuio-tapEvent"></i>
        <div id="menu-phone" class="menu-wrap tuio-tapEvent" style="background:rgba(255,255,255,0.4);"><i class="fa fa-phone"></i></div>
        <div id="menu-paint" class="menu-wrap tuio-tapEvent"><i class="fa fa-paint-brush"></i></div>
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
    <script src="../lib/jquery-transform/jquery-css-transform.js"></script>
    <script src="../lib/jquery-transform/jquery-animate-css-rotate-scale.js"></script>
    <script src="../lib/peer/peer.js"></script>
    <script src="../lib/peer/multiparty.js"></script>
    <script src="../lib/peer/multiTalk.js"></script>
    <script src="./js/init.js"></script>
    <script src="./js/menu.js"></script>
    <script src="./js/time.js"></script>
    <script src="./js/calling.js"></script>

    <script type="text/javascript">setUpPeer()</script>
    <script type="text/javascript">//makeCall("<?php echo $friends->getPhoneNumber(); ?>")</script>
</body>
</html>
