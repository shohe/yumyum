SCREEN_W = $(document).width();
SCREEN_H = $(document).height();

// #title-yumyum
$(function() {
    var titleYumyum = $("#title-yumyum");
    var subtitle = $("#subtitle-yumyum");

    var init = function() {
        titleYumyum.css("left", 35);
        subtitle.css("left", 35);
        titleYumyum.css("opacity", 1);
        subtitle.css("opacity", 1);
    }

    var reset = function() {
        $("body").animate({"opacity": 0}, {complete: function() {
            window.location.href = 'index.php';
        }});
    }

    titleYumyum.on('logo-left-anim', function() {
        titleYumyum.animate({"left": 35}, "slow");
        subtitle.animate({"left": 35}, "slow");
    });

    titleYumyum.on('tapUp', function(e, x, y) {
        reset();
    });

    init();

    $('#time-num-group').trigger('init');
});

// #menu-controller
$(function() {
    var menuController = $('#menu-controller');
    menuController.css("top", 100);

    var init = function() {
        $('#menu-controller li').css({left : '0', opacity: 1});
    }

    menuController.on('hidden-menu-controller', function() {
        $('#menu-controller li')
            .each(function(i){$(this).delay(80 * i).animate({left : '40px',opacity: 0}, 500);
        });
    });

    init();
});

// #user-info
$(function() {
    var userInfo = $('#user-info');
    var timeInfo = $('#time-info');

    var init = function() {
        userInfo.css("left", SCREEN_W / 2 - userInfo.width() / 2);
        userInfo.animate({top : SCREEN_H / 2 - userInfo.height() / 2 + 55}, 500);

        timeInfo.css("left", SCREEN_W / 2 - timeInfo.width() / 2);
        timeInfo.css("top", SCREEN_H / 2 - timeInfo.height() / 2);
        timeInfo.fadeIn("slow");
    }

    init();
});
