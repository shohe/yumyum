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

// #colors
$(function() {
    var Container = $('#container');
    Container.css({"left": SCREEN_W, opacity: 1});

    var init = function() {
        Container.animate({left : '0', opacity: 1}, 1000);
    }

    Container.on('back', function() {
        Container.animate({left : SCREEN_W, opacity: 0}, 1000);
    });

    init();
});
