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
var offsetDiff = {"p": 0, "q": 0};
var select = null;
var isSelect = false;
function addPicture(image) {
    image.css({left:SCREEN_W/2-image.width()/2-120, top:SCREEN_H, opacity:0});
    image.animate({top:SCREEN_H/2-image.height()/2-100, opacity:1}, 1000);
    $("#upload-picture").append(image);

    $('#upload-picture img').on('tapDown', function(e, x, y) {
        $("#upload-picture .tuio-tapEvent").each( function() {
            $(this).removeClass('activeFingerAction');
        });
        select = $(this);
        select.addClass('activeFingerAction');
        isSelect = true;

        offsetDiff.p = x - $(this).offset().left;
        offsetDiff.q = y - $(this).offset().top;
    });

    $('#upload-picture img').on('tapUp', function(e, x, y) {
        isSelect = false;
        offsetDiff = {"p": 0, "q": 0};
    });

    $('#upload-picture img').on('tapMove', function(e, x, y) {
        var top = y - offsetDiff.q;
        var left = x - offsetDiff.p;
        if (isSelect) select.css({top: top, left: left});
    });

    $('#upload-picture img').on('pichAction', function(e, dis) {
        isSelect = false;
        $(this).css({width:'+='+dis*1.5, top:'-='+dis*1.5/2, left:'-='+dis*1.5/2});
    });

    $('#upload-picture img').on('rotateAction', function(e, radian) {
        isSelect = false;
        $(this).css({transform: 'rotate(' + (radian * Math.PI * -10) + 'deg)'});
    });
};


function init_addPicture(image) {
    setTimeout(function() {
        image.css({
            left:SCREEN_W/2-image.width()/2,
            top:SCREEN_H/2-image.height()/2-100,
            opacity:0,
            transform: 'rotate(' + (( ( Math.random() * -15 ) + 15 ) * Math.PI) + 'deg)'
        });
        image.animate({opacity:1}, 500);
    }, 1000);

    $("#upload-picture").append(image);

    $('#upload-picture img').on('tapDown', function(e, x, y) {
        $("#upload-picture .tuio-tapEvent").each( function() {
            $(this).removeClass('activeFingerAction').addClass('pictures');
        });
        select = $(this);
        select.addClass('activeFingerAction').removeClass('pictures');
        isSelect = true;

        offsetDiff.p = x - $(this).offset().left;
        offsetDiff.q = y - $(this).offset().top;
    });

    $('#upload-picture img').on('tapUp', function(e, x, y) {
        isSelect = false;
        offsetDiff = {"p": 0, "q": 0};
    });

    $('#upload-picture img').on('tapMove', function(e, x, y) {
        var top = y - offsetDiff.q;
        var left = x - offsetDiff.p;
        if (isSelect) select.css({top: top, left: left});
    });

    $('#upload-picture img').on('pichAction', function(e, dis) {
        isSelect = false;
        $(this).css({width:'+='+dis*1.5, top:'-='+dis*1.5/2, left:'-='+dis*1.5/2});
    });

    $('#upload-picture img').on('rotateAction', function(e, radian) {
        isSelect = false;
        $(this).css({transform: 'rotate(' + (radian * Math.PI * -10) + 'deg)'});
    });
};

// init
$(function() {
    var uploadPicture = $("#upload-picture");

    var init = function() {
        uploadPicture.css({left : SCREEN_W, opacity: 0}, 1000);
        uploadPicture.animate({left : 0, opacity: 1}, 1000);
    }
    uploadPicture.on('back', function() {
        uploadPicture.animate({left : SCREEN_W, opacity: 0}, 1000);
    });

    init();
})


// twitter
$(function() {
    var socket = io.connect('http://localhost:3000');

    var imgget = function(url) {
        $.ajax({ dataType: "html", url: url })
        .done(function(data) {
            $(data).find('div').each(function(){
                //if ($(this).is('.OldMedia-photoContainer')) {
                if ($(this).is('.AdaptiveMedia-photoContainer')) {
                    addPicture($(this).find('img').removeAttr('style').addClass('tuio-tapEvent').addClass('pictures'));
                    return false;
                }
            });
        })
    }

    var httpget = function(url) {
        $.ajax({ dataType: "html", url: url })
        .done(function(data) {
            start = data.indexOf('<title>') + 7;
            end = data.indexOf('</title>');
            tw_url = data.substr( start, end - start );
            imgget(tw_url);
        })
    }

    var init_imgget = function(url) {
        $.ajax({ dataType: "html", url: url })
        .done(function(data) {
            console.log(data);
            $(data).find('div').each(function(){
                //if ($(this).is('.OldMedia-photoContainer')) {
                if ($(this).is('.AdaptiveMedia-photoContainer')) {
                    init_addPicture($(this).find('img').removeAttr('style').addClass('tuio-tapEvent').addClass('pictures'));
                    return false;
                }
            });
        })
    }

    var init_httpget = function(url) {
        $.ajax({ dataType: "html", url: url })
        .done(function(data) {
            start = data.indexOf('<title>') + 7;
            end = data.indexOf('</title>');
            tw_url = data.substr( start, end - start );
            init_imgget(tw_url);
        })
    }

    var init = function() {
        for (var i = 0; i < json_url.length; i++) {
            init_httpget(json_url[i]);
        }
    }

    socket.on('msg', function(data) {
        index = data.indexOf('https://t.co/');
        if ( index != -1) {
            media_url = data.substr( index, 23 );
            httpget(media_url);
        }
    });

    init();
});
