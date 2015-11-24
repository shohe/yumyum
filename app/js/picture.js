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


// #picture
var tapX = 0;
var tapY = 0;
$(function() {
    $('#test-picture').on('tapMove', function(e, x, y) {
        $(this).css({top: y-$(this).height()/2+'px', left: x-$(this).width()/2+'px'});
    });

    $('#test-picture').on('pichAction', function(e, dis) {
        $(this).css({width: '+='+dis%10+'px'});
    });
});
