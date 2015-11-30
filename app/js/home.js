SCREEN_W = $(document).width();
SCREEN_H = $(document).height();
APPLICATION_TYPE = null;

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

    if (GetQueryString()["isBack"]) {
        $('#time-num-group').trigger("init");
    } else {
        $('#time-num-group').trigger("initWithAnim");
    }
});


// #menu-controller
$(function() {
    var buttonSet = $('#button-set');
    var circle = $('#mark-cursor img');
    var discription = $('#discription');

    buttonSet.css({top:SCREEN_H/2 - buttonSet.height()/2-30, left:SCREEN_W/2 - buttonSet.width()/2-30});
    var _left = buttonSet.offset().left + 70;
    var _middle = buttonSet.offset().left*2 + 8;
    var _right = buttonSet.offset().left*3 - 55;
    circle.css({top:buttonSet.offset().top - 20, left:_left});
    discription.fadeIn(1000);

    var init = function() {
        $('#button-set li')
            .css({left : '500px', opacity: 0})
            .each(function(i){$(this).delay(100 * i).animate({left : '0',opacity: 1}, 1000);
        });
    }

    var backInit = function() {
        $('#button-set li')
            .css({left : '-500px', opacity: 0})
            .each(function(i){$(this).delay(100 * i).animate({left : '0',opacity: 1}, 1000);
        });
    }

    var decided = function() {
        $("#content").animate({left : '-='+SCREEN_W/1.5+'px',opacity: 0}, 1000);
    }

    $("#phone").on("tapDown", function() {
        circle.animate({"left": _left, "opacity":0.9}, "slow");

        if ( APPLICATION_TYPE != 0 ) {
            discription.fadeOut();
            setTimeout(function(){
                discription.html("コミュニケーションで最も重要な会話。<br/>会話を楽しんで知識を社会に還元しましょう。<br/>遠くに住む家族や親戚、友人や同僚と一緒に食事を楽しむ事ができます。");
                discription.fadeIn();
            },500);
            APPLICATION_TYPE = 0;
        } else {
            decided();
            window.setTimeout(function() {
                USER_ID = GetQueryString()["id"];
                window.location.href = 'call.php?id='+USER_ID+"&menuAnim=true";
            }, 1000 );
        }
    });

    $("#paint").on("tapDown", function() {
        circle.animate({"left": _middle, "opacity":0.9}, "slow");

        if ( APPLICATION_TYPE != 1 ) {
            discription.fadeOut();
            setTimeout(function(){
                discription.html("お絵かきを楽しむ事ができます。<br/>言葉では表現しきれない時などには絵が最適です。<br/>子供達が集まった時には一緒にお絵かきで楽しむ事ができます。");
                discription.fadeIn();
            },500);
            APPLICATION_TYPE = 1;
        } else {
            decided();
            window.setTimeout(function() {
                USER_ID = GetQueryString()["id"];
                window.location.href = 'drow.php?id='+USER_ID+"&menuAnim=true";
            }, 1000 );
        }
    });

    $("#picture").on("tapDown", function() {
        circle.animate({"left": _right, "opacity":0.9}, "slow");

        if ( APPLICATION_TYPE != 2 ) {
            discription.fadeOut();
            setTimeout(function(){
                discription.html("アルバムを閲覧する事ができます。<br/>自分の経験談をする時には写真があると良いですね。<br/>家族や友人との思い出をみんなで共有しましょう。");
                discription.fadeIn();
            },500);
            APPLICATION_TYPE = 2;
        } else {
            decided();
            window.setTimeout(function() {
                USER_ID = GetQueryString()["id"];
                window.location.href = 'picture.php?id='+USER_ID+"&menuAnim=true";
            }, 1000 );
        }
    });

    if (GetQueryString()["isBack"]) {
        backInit();
    } else {
        init();
    }
});
