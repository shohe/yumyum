//[ '#E3EB64', '#A7EBCA', '#ec6b6b', '#D8EBA7', '#868E80' ];
var RADIUS = 0;
var CLIENT = null, SCREEN_W = null, SCREEN_H = null;
var COLOURS = [ ], COLOURS_P = [ ], POINTS = [ ];
var COLOUR;
var LEFT_MARGIN = 30;

var drawerSketch = Sketch.create({

    container: document.getElementById( 'container' ),
    autoclear: false,

    setup: function() {
        SCREEN_W = $(window).innerWidth();
        SCREEN_H = $(window).innerHeight();
        this.initColor();
        CLIENT = new Tuio.Client({
            host: "http://localhost:5000"
        });
    },

    update: function() {
        RADIUS = 2 + abs( sin( this.millis * 0.005 ) * 10 );
    },

    keydown: function() {
        if ( this.keys.C ) this.clear();
    },

    initColor: function() {
        var pallets = document.getElementsByClassName( 'pallet' ) ;
        var margin = 20;
        var size = (SCREEN_H - (pallets.length + 5) * margin) / pallets.length - 10;
        for (var i = 0; i < pallets.length; i++) {
            pallets[i].style.width = pallets[i].style.height = size + 'px';
            pallets[i].style.top = (i * size) + ((i + 3) * margin) + 80 +'px';
            pallets[i].style.right = LEFT_MARGIN + 'px';
            COLOURS.push( pallets[i].style.backgroundColor );

            var x = $( pallets[i] ).offset().left ;
            var y = $( pallets[i] ).offset().top ;
            COLOURS_P.push( { x:x, y:y, w:size, h:size } );
        }
        $(pallets[0]).animate({'right': LEFT_MARGIN*2}, 500);
        COLOUR = COLOURS[0];
    }
});

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}
function drawArc(ctx, dist, angle, p, uc) {
    for ( var i = 0; i < dist; i+=5 ) {
        x = p.x + (Math.sin(angle) * i) - 25;
        y = p.y + (Math.cos(angle) * i) - 25;
        ctx.fillStyle = ctx.strokeStyle = COLOUR;
        ctx.beginPath();
        ctx.arc(x+10, y+10, 6, false, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

onAddTuioCursor = function(addCursor) {
    var point = [ ];
    point.push({ x: addCursor.getScreenX(SCREEN_W), y: addCursor.getScreenY(SCREEN_H) });
    POINTS[addCursor.sessionId] = point;
},

onUpdateTuioCursor = function(updateCursor) {
    var uc = updateCursor;
    var currentPoints = { x: uc.getScreenX(SCREEN_W), y: uc.getScreenY(SCREEN_H) };

    var dist = distanceBetween( POINTS[uc.sessionId], currentPoints );
    var angle = angleBetween( POINTS[uc.sessionId], currentPoints );
    drawArc( drawerSketch, dist, angle, POINTS[uc.sessionId], uc );
    POINTS[uc.sessionId] = currentPoints;
},

onRemoveTuioCursor = function(removeCursor) {
    POINTS[removeCursor.sessionId] = 0;
    var point = [ ];
    point.push({ x: removeCursor.getScreenX(SCREEN_W), y: removeCursor.getScreenY(SCREEN_H) });
    chkColor( point );
};

CLIENT.on("addTuioCursor", onAddTuioCursor);
CLIENT.on("updateTuioCursor", onUpdateTuioCursor);
CLIENT.on("removeTuioCursor", onRemoveTuioCursor);
CLIENT.connect();


/// pallet event
chkColor = function(point) {
    for ( var i = 0; i < COLOURS_P.length; i++ ) {
        if (COLOURS_P[i].x <= point[0].x && COLOURS_P[i].x + COLOURS_P[i].w >= point[0].x &&
            COLOURS_P[i].y <= point[0].y && COLOURS_P[i].y + COLOURS_P[i].h >= point[0].y) {
                 if (i == COLOURS_P.length - 1) {
                    drawerSketch.clear();
                    return;
                 }

                 COLOUR = COLOURS[i];
                 changeColor( i );
        }
    }
};

changeColor = function(position) {
    var pallets = document.getElementsByClassName( 'pallet' );
    for (var i = 0; i < pallets.length; i++) {
        if ( i == position ) {
            $(pallets[i]).animate({'right': LEFT_MARGIN*2}, 500);
        } else {
            $(pallets[i]).animate({'right': LEFT_MARGIN}, 500);
        }
    }
};
