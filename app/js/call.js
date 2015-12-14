SCREEN_W = $(document).width();
SCREEN_H = $(document).height();
CALL_ID = 0;
BEFORE_TOUCH_USER = [];
// もしマルチ通話可能なら true にしてください。
IS_MULTI = false;

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

// #friends
$(function() {
    var friendsSlider = $('#friends-slider');
    var friendsWrap = $('#friends-wrap');

    friendsSlider.on('tapDown', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousedown", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousedown",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchStart", e);
    });

    friendsSlider.on('tapMove', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousemove", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousemove",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchMove", e);
    });

    friendsSlider.on('tapUp', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mouseup", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mouseup",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchEnd", e);
    });

    friendsWrap.on('back', function() {
        friendsWrap.animate({'top':SCREEN_H/2 - friendsWrap.height()/2.5 + 'px', right: -SCREEN_W, opacity:0}, 1000);
        $('#phone-mark').trigger("hidden");
    });

    var init = function() {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousedown",{ originalEvent:mouseEvent });
        friendsSlider.trigger("onTouchStart", e);

        friendsWrap.css({'top':SCREEN_H/2 - friendsWrap.height()/2.5 + 'px', right: -SCREEN_W*1.5, opacity:0});
        friendsWrap.animate({right: -5, opacity:1}, 1000);

        friendsSlider.bxSlider({
            pager: true,
            touchEnabled: true,
        });
    }

    init();
});

// list
$(function() {
    var imgWrap = $('.img-wrap');
    var phone = $('#phone-mark');
    var back = $('#backToCall');
    var endCallButton = $('#endCallButton');

    if (!IS_MULTI) BEFORE_TOUCH_USER = null;
    phone.css({bottom:-200, right:-20});

    var remove = function(obj, className, dir) {
        window.setTimeout(function() {
            obj.removeClass(className);
        }, dir );
    }

    imgWrap.on('tapDown', function(e, x, y) {
        var index = $(this).find('img').attr('alt');
        phone.animate({opacity:0.7, bottom:-30}, { duration: 800, easing: 'easeOutElastic' });

        if (IS_MULTI) {
            if (BEFORE_TOUCH_USER.indexOf(index) >= 0) {
                $(this).addClass("list-img-animation");
                $(this).css({'border-color': 'rgba(255, 255, 255, 0.8)'});
                remove($(this),"list-img-animation",500);
                BEFORE_TOUCH_USER.splice(BEFORE_TOUCH_USER.indexOf(index), 1);
            } else {
                $(this).addClass("list-img-animation");
                $(this).css({'border-color': 'rgba(232, 42, 76, 0.8)'});
                remove($(this),"list-img-animation",500);
                BEFORE_TOUCH_USER.push($(this).find('img').attr('alt'));
            }
        } else {
            if (BEFORE_TOUCH_USER == null) {
                $(this).addClass("list-img-animation");
                $(this).css({'border-color': 'rgba(232, 42, 76, 0.8)'});
                remove($(this),"list-img-animation",500);
                BEFORE_TOUCH_USER = $(this);
                return;
            }

            if (BEFORE_TOUCH_USER.find('img').attr('alt') != index) {
                BEFORE_TOUCH_USER.css({"border-color":'rgba(255, 255, 255, 0.8)'});
                $(this).addClass("list-img-animation");
                $(this).css({'border-color': 'rgba(232, 42, 76, 0.8)'});
                remove($(this),"list-img-animation",500);
                BEFORE_TOUCH_USER = $(this);
            }
        }

    });

    phone.on('tapDown', function(e, x, y) {
        $('#friends-wrap').animate({right: SCREEN_W, opacity:0}, { duration: 2300, easing: 'easeOutExpo' });
        $(this).animate({right: SCREEN_W, opacity:0}, { duration: 2300, easing: 'easeOutExpo' });
        $("#call-load").trigger("display");
        makeCall(BEFORE_TOUCH_USER.find('input').attr('value'));
        callLoad();
    });

    phone.on('hidden', function() {
        $(this).animate({bottom:-200, right:-20}, { duration: 2300, easing: 'easeOutExpo' });
    });

    back.on('tapDown', function(e, x, y) {
    	backToCall();
    });

    endCallButton.on('tapDown', function(e, x, y) {
    	endCall();
    });
});

$(function() {
    var callLoad = $("#call-load");
    var preloader = $("#preloader");

    var init = function() {
        preloader.css({top:SCREEN_H/2+75, left:SCREEN_W/2-preloader.width()/2-15,opacity:0});
    }

    /*
    callLoad.on("display", function() {
        if (IS_MULTI) {
            CALL_ID = BEFORE_TOUCH_USER
            //console.log();
        } else {
            CALL_ID = BEFORE_TOUCH_USER.find('img').attr('alt');
        }

        window.setTimeout(function() {
            USER_ID = GetQueryString()["id"];
            window.location.href = "calling.php?id="+USER_ID+"&multi="+IS_MULTI+"&callId="+CALL_ID+"&menuAnim=false";
        }, 1000 );
    });
    */

    init();

});

function callLoad () {
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
}
