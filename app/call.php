<!doctype html>
<html lang="en">
<?php
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
    $user = $yumDB->selectUser($_GET['id']);
    $friends = array_chunk($yumDB->selectFriends($_GET['id']),10);
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

    <div id="friends-wrap">
        <ul id="friends-slider" class="tuio-tapEvent">
            <?php for ($i = 0; $i < count($friends); $i++) { ?>
            <li>
                <div class="friends-list-wrap">
                    <?php for ($t = 0; $t < count($friends[$i]); $t++) { ?>
                    <div class="friends-list">
                        <div class="img-wrap tuio-tapEvent">
                        	<?php echo "<img src='".$friends[$i][$t]->getIcon()."' alt='".$friends[$i][$t]->getID()."' />"; ?>
                        	<input type="hidden" class="callTo" value="<?php echo $friends[$i][$t]->getPhoneNumber(); ?>">
                        </div>
                        <div class="user-name"><?php echo $friends[$i][$t]->getName(); ?></div>

                    </div>
                    <?php } ?>
                </div>
            </li>
            <?php } ?>
        </ul>
    </div>

    <div id="phone-mark" class="tuio-tapEvent"><img class="phone-mark-anim" src="./images/phone.png" alt="" /></div>

    <div id="could-not-call">つながりませんでした。</div>
    <div id="call-load">
    	<div class="img-wrap tuio-tapEvent"><?php //echo "<img src='".$friends->getIcon()."' alt='".$friends->getID()."' />"; ?></div>
        <div class="user-name"><?php //echo $friends->getName(); ?></div>
        <div class="user-comment"><?php //echo $friends->getComment(); ?></div>
    </div>
    <?php $yumDB->close(); ?>
    <div id="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

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
    <script src="./js/call.js"></script>

    <input type="hidden" id="myID" value="<?php echo $user->getPhoneNumber() ?>">
    <script type="text/javascript">setUpPeer();</script>
    <div id="streams"></div>
</body>
</html>
