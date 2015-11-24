
// #title-yumyum
$(function() {
    var titleYumyum = $("#title-yumyum");
    var subtitle = $("#subtitle-yumyum");

    var init = function() {
        titleYumyum.css("left", 35);
        subtitle.css("left", 35);
        titleYumyum.css("opacity", 0);
        subtitle.css("opacity", 0);
        window.setTimeout(function() {
            titleYumyum.animate({"left": SCREEN_W / 2 - titleYumyum.width() / 2 - 20, "opacity": 1}, "slow");
            subtitle.animate({"left": SCREEN_W / 2 - subtitle.width() / 2 - 14, "opacity": 1}, "slow");
        }, 800 );
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
        titleYumyum.animate({"left": SCREEN_W / 2 - titleYumyum.width() / 2 - 20}, "slow");
        subtitle.animate({"left": SCREEN_W / 2 - subtitle.width() / 2 - 14}, "slow");
        $("#get-stated-button").trigger('display-started-button');
        $('#menu-controller').trigger('hidden-menu-controller');
        $('#user-wrap').trigger('hidden-users');

        reset();
    });

    init();
});


// #get-stated-button
$(function() {
    var getStatedButton = $("#get-stated-button");
    var userChoose = $("#user-choose");

    var init = function() {
        getStatedButton.css("left", SCREEN_W / 2 - getStatedButton.width() / 2 - 20);
        getStatedButton.css("bottom", -100);
        userChoose.css("left", SCREEN_W / 2 - userChoose.width() / 2 - 22);
        userChoose.css("bottom", getStatedButton.offset().top - 50);
        window.setTimeout(function() {
            getStatedButton.animate({"bottom": getStatedButton.height() * 2, "opacity": 1}, "slow");
        }, 800 );
    }

    var tapHello = function() {
        getStatedButton.animate({"opacity": 0}, {complete: function() {
            $(this).removeClass("get-stated-animation");
            $('#user-wrap').trigger('display-users');
            $(this).text("いただきます");
            $(this).animate({"opacity": 1});
            userChoose.fadeIn("slow");
        }});
    }

    var tapBegin = function() {
        getStatedButton.animate({"opacity": 0}, {complete: function() {
            $(this).removeClass("get-stated-animation");
            $(this).css("bottom", -100);
            $(this).text("はじめる");
            $("#title-yumyum").trigger('logo-left-anim');
            $('#user-wrap').trigger('decide-users');
            userChoose.fadeOut("slow");

            window.setTimeout(function() {
                window.location.href = 'home.php?id=' + USER_ID;
            }, 1000 );
        }});
    }

    getStatedButton.on('tapUp', function(e, x, y) {
        $(this).addClass("get-stated-animation");
        ($(this).text() == "はじめる") ? tapHello() : tapBegin();
        $("#gohan-set").trigger('start-eating');
    });

    getStatedButton.on('display-started-button', function() {
        if ($(this).text() == "はじめる") {
            $(this).animate({"opacity": 1,"bottom": $(this).height() * 2}, "slow");
        } else {
            userChoose.fadeOut("slow");
            getStatedButton.animate({"opacity": 0}, {complete: function() {
                $(this).text("はじめる");
                $(this).animate({"opacity": 1});
            }});
        }
    });

    init();
});


// #users
$(function() {
    var usersSlider = $('#users-slider');
    var userWrap = $('#user-wrap');
    var dottedLine = $('#dotted-line');
    var usersID = [];

    usersSlider.on('tapDown', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousedown", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousedown",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchStart", e);
    });

    usersSlider.on('tapMove', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousemove", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousemove",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchMove", e);
    });

    usersSlider.on('tapUp', function(e, x, y) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mouseup", true, true, window, 0, x, y, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mouseup",{ originalEvent:mouseEvent });
        $(this).trigger("onTouchEnd", e);
    });

    var init = function() {
        dottedLine.css({left: SCREEN_W/2 - dottedLine.width()/2-28, top: SCREEN_H/2 - dottedLine.height()/2-38});
        dottedLine.addClass("cercle-anim");
        userWrap.css("bottom", -SCREEN_H / 2);
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var e = jQuery.Event("mousedown",{ originalEvent:mouseEvent });
        usersSlider.trigger("onTouchStart", e);

        $(".user-IDs").each( function() {
            usersID.push($(this).val()) ;
        });

        usersSlider.bxSlider({
            pager: false,
            touchEnabled: true,
            onSliderLoad:function(currentIndex){
                USER_ID = usersID[currentIndex];
            },
            onSlideAfter:function($slideElement, oldIndex, newIndex){
                USER_ID = usersID[newIndex];
            }
        });
    }

    userWrap.on('display-users', function() {
        $(this).stop().animate({opacity: "1.0", bottom: SCREEN_H / 2 - $(this).height()/2}, 700);
        dottedLine.stop().animate({opacity: "1.0"}, 700);
    });

    userWrap.on('decide-users', function() {
        $(this).stop().animate({bottom: SCREEN_H},{'duration': 500,'easing': 'easeInBack'});
        dottedLine.removeClass("cercle-anim");
        dottedLine.addClass("hide-cercle");
        dottedLine.fadeOut(1200);
    });

    userWrap.on('hidden-users', function() {
        if ($("#get-stated-button").text() == "いただきます") {
            $(this).stop().animate({opacity: "0.0", bottom: -SCREEN_H / 2}, 700);
        } else {
            $(this).css('bottom', -SCREEN_H / 2);
        }
    });

    init();
});


$(function() {
    var gohanSet = $("#gohan-set");
    var hashi = $("#hashi");

    var init = function() {
        gohanSet.css({left: SCREEN_W/2 - gohanSet.width()/2-15, top: SCREEN_H/2 - gohanSet.height()/2-30});
        gohanSet.stop().animate({opacity: "1.0"}, 700);
        hashi.css({left: SCREEN_W/2 - hashi.width()/2-20, top: SCREEN_H/2 - hashi.height()-10});
        hashi.stop().animate({opacity: "1.0"}, 700);
    }

    gohanSet.on('start-eating', function() {
        gohanSet.removeClass('set-rotate');
        gohanSet.addClass('start-eating');
        hashi.addClass('start-eating');
        gohanSet.fadeOut(1000);
        hashi.fadeOut(1000);
    });

    init();
});
