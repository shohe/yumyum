IS_OPEN = false;

// #menu
$(function() {
    USER_ID = GetQueryString()["id"];
    var controller = $("#menu-controller");
    var menuPaint = $("#menu-paint");
    var menuPhone = $("#menu-phone");
    var menuPicture = $("#menu-picture");
    var back = $("#menu-back");

    var transition = function(screenName) {
        window.location.href = screenName;
    }

    var initWithAnim = function() {
        $("#menus").css({bottom:"-200px"});
        $("#menus").animate({rotate: "360deg", opacity:0.7, bottom:0}, 800);
    }

    var init = function() {
        $("#menus").css({opacity:0.7, bottom:0});
    }

    // back する時によばれます。
    var transitionScreen = function() {
        controller.trigger('tapUp', [x, y]);
        $("#friends-wrap").trigger("back");
        $("#call-load").trigger("back");
        $('#container').trigger("back");
        $("#menus").animate({rotate: "360deg", opacity:0, bottom:"-200px"}, 1000);
    }

    controller.on('tapUp', function(e, x, y) {
        if (!IS_OPEN) {
            $('#menu-phone').animate({top: "-=90px", left: "-=10px", opacity:1});
            $('#menu-paint').animate({top: "-=78px", left: "+=42px", opacity:1});
            $('#menu-picture').animate({top: "-=35px", left: "+=75px", opacity:1});
            back.animate({top: "+=15px", left: "+=90px", opacity:1});
            $(this).animate({rotate: "+=135deg"},{duration: 200 ,complete: function() {
                IS_OPEN = true;
            }});
        } else {
            $('#menu-phone').animate({top: "+=90px", left: "+=10px", opacity:0});
            $('#menu-paint').animate({top: "+=78px", left: "-=42px", opacity:0});
            $('#menu-picture').animate({top: "+=35px", left: "-=75px", opacity:0});
            back.animate({top: "-=15px", left: "-=90px", opacity:0});
            $(this).animate({rotate: "-=135deg"},{duration: 200 ,complete: function() {
                IS_OPEN = false;
            }});
        }
    });

    back.on('tapUp', function(e, x, y) {
        if (IS_OPEN) {
            transitionScreen();
            window.setTimeout(function() {
                transition("home.php?id="+USER_ID+"&isBack=true&menuAnim=true");
            }, 1000 );
        }
    });

    menuPaint.on('tapUp', function(e, x, y) {
        if (IS_OPEN) {
            transitionScreen();
            window.setTimeout(function() {
                transition("drow.php?id="+USER_ID+"&menuAnim=true");
            }, 1000 );
        }
    });
    menuPhone.on('tapUp', function(e, x, y) {
        if (IS_OPEN) {
            transitionScreen();
            window.setTimeout(function() {
                transition("call.php?id="+USER_ID+"&menuAnim=true");
            }, 1000 );
        }
    });
    menuPicture.on('tapUp', function(e, x, y) {
        if (IS_OPEN) {
            transitionScreen();
            window.setTimeout(function() {
                transition("picture.php?id="+USER_ID+"&menuAnim=true");
            }, 1000 );
        }
    });

    if (GetQueryString()["menuAnim"] == "true") {
        initWithAnim();
    } else {
        init();
    }

});
