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
    <link rel="stylesheet" href="./css/style.css" media="screen" title="no title" charset="utf-8">
</head>
<body>
    <canvas id="canvas"></canvas>

    <h2 id="title-yumyum" class="tuio-tapEvent">yum yum</h2>
    <h4 id="subtitle-yumyum" class="small-text-white">知識を美味しくいただきます。</h4>
    <div id="menu-controller">
        <ul>
            <li>MENU</li>
            <li id="menu-call" class="tuio-tapEvent">+ call</li>
            <li id="menu-profile" class="tuio-tapEvent">+ profile</li>
            <li id="menu-drow" class="tuio-tapEvent">+ draw</li>
            <li id="menu-picture" class="tuio-tapEvent">+ picture</li>
        </ul>
    </div>
    <div id="time-num-group"></div>

    <div id="user-info">
        <?php
            echo "<div class='user-info-image-wrap'><img src='".$user->getIcon()."' alt='user-img' /></div>";
            echo "<h3>".$user->getName()."（".$user->getAge()."）</h3>";
        ?>
    </div>

    <div id="time-info">
        <img id="time-h-img" class="time-cercle" src="./images/time/time-h.png" alt="h" />
        <img id="time-m-img" class="time-cercle" src="./images/time/time-m.png" alt="m" />
        <img id="time-s-img" class="time-cercle" src="./images/time/time-s.png" alt="s" />
    </div>

    <!-- load scripts -->
    <script src="../lib/tuio/jquery-1.7.2.js"></script>
    <script src="../lib/tuio/jquery.easing.1.3.js"></script>
    <script src="../lib/tuio/lodash.js"></script>
    <script src="../lib/tuio/socket.io.js"></script>
    <script src="../lib/tuio/Tuio.min.js"></script>
    <script src="../lib/slider/jquery.bxslider.js"></script>
    <script src="./js/init.js"></script>
    <script src="./js/menu.js"></script>
    <script src="./js/time.js"></script>
    <script src="./js/profile.js"></script>
</body>
</html>
