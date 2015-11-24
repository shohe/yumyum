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

// call-load
$(function() {
    var callLoad = $("#call-load");
    var preloader = $("#preloader");

    var init = function() {
        callLoad.css({left:SCREEN_W/2 - callLoad.width()/2, top:SCREEN_H/2 - callLoad.height()/2});
        preloader.css({left:SCREEN_W/2 - preloader.width()/2, top:SCREEN_H/2 - preloader.height()/2 + 80});
        callLoad.animate({opacity:1}, 1000);
        preloader.animate({opacity:1}, 1000);
    }

    callLoad.on("connect", function() {
        callLoad.animate({top:-SCREEN_H/2,opacity:0}, 1000);
        preloader.animate({top:-SCREEN_H/2,opacity:0}, 1300);
    });

    callLoad.on("back", function() {
        callLoad.animate({left:SCREEN_W ,opacity:0}, 1000);
        preloader.animate({left:SCREEN_W ,opacity:0}, 1000);
    });

    init();
});

// つながった程で
$(function() {

    var init = function() {
        window.setTimeout(function() {
            $("#call-load").trigger("connect");
        }, 3000 );
    }

    init();
});
