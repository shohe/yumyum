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
function addPicture(image) {
    image.css({left:SCREEN_W/2-image.width()/2-120, top:SCREEN_H, opacity:0});
    image.animate({top:SCREEN_H/2-image.height()/2-100, opacity:1}, 1000);
    $("#upload-picture").append(image);

    $('#upload-picture img').on('tapMove', function(e, x, y) {
        $(this).css({top: y-$(this).height()/2+'px', left: x-$(this).width()/2+'px'});
    });

    $('#upload-picture img').on('pichAction', function(e, dis) {
        $(this).css({width: '+='+dis%10+'px'});
    });
};


// twitter
$(function() {
    var socket = io.connect('http://localhost:3000');

    var imgget = function(url) {
        $.ajax({ dataType: "html", url: url })
        .done(function(data) {
            $(data).find('div').each(function(){
                if ($(this).is('.OldMedia-photoContainer')) {
                    addPicture($(this).find('img').removeAttr('style').addClass('tuio-tapEvent'));
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

    socket.on('msg', function(data) {
        index = data.indexOf('https://t.co/');
        if ( index != -1) {
            media_url = data.substr( index, 23 );
            httpget(media_url);
        }
    });
});
