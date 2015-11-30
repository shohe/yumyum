<!doctype html>
<html lang="en">
<?php
    require_once("./modules/YumDB.class.php");
    $yumDB = new YumDB();
?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>yum yum</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../lib/slider/jquery.bxslider.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div href="#" id="get-stated-button" class="tuio-tapEvent">はじめる</div>

    <img id="hashi" src="./images/hashi.png" style="width:auto; height:25px; position:absolute;" alt="" />
    <div id="gohan-set" class="set-rotate">
        <img id="gohan" class="gohan-rotate" src="./images/meshi.png" style="width:70px; height:auto; top:95px; left:-125px;" alt="" />
        <img id="osuimono" class="gohan-rotate" src="./images/shiru.png" style="width:80px; height:auto; top:100px; left:45px;" alt="" />
        <div class="img-wrap gohan-rotate" style="top:-50px; left:85px; width:65px; height:65px;"><img src='./images/user/1.png' alt='' /></div>
        <div class="img-wrap gohan-rotate" style="top:-90px; left:-105px; width:65px; height:65px;"><img src='./images/user/2.png' alt='' /></div>
        <div class="img-wrap gohan-rotate" style="top:-185px; left:180px; width:65px; height:65px;"><img src='./images/user/3.png' alt='' /></div>
        <div class="img-wrap gohan-rotate" style="top:30px; left:-12px; width:65px; height:65px;"><img src='./images/user/4.png' alt='' /></div>
        <div class="img-wrap gohan-rotate" style="top:-105px; left:-5px; width:65px; height:65px;"><img src='./images/user/5.png' alt='' /></div>
        <div class="img-wrap gohan-rotate" style="top:-105px; left:85px; width:65px; height:65px;"><img src='./images/user/6.png' alt='' /></div>
    </div>

    <div id="dotted-line"></div>

    <?php foreach ($yumDB->selectUserWithTableID(0) as $user) {echo "<input type='hidden' class='user-IDs' value='".$user->getID()."'>";}?>
    <div id="user-wrap">
        <ul id="users-slider" class="tuio-tapEvent">
        <?php
            foreach ($yumDB->selectUserWithTableID(0) as $user) {
                echo "<li class='slide'><div class='user-image-wrap'><img src='".$user->getIcon()."' alt=''/></div><h5>".$user->getName()."</h5></li>";
            }
            $yumDB->close();
        ?>
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
    <script src="./js/index.js"></script>
</body>
</html>
