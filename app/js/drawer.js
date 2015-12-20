//[ '#E3EB64', '#A7EBCA', '#ec6b6b', '#D8EBA7', '#868E80' ];
var RADIUS = 0;
var CLIENT = null, SCREEN_W = null, SCREEN_H = null;
var COLOURS = [ ], COLOURS_P = [ ], POINTS = [ ];
var COLOUR;
var LEFT_MARGIN = 30;
var IS_CHANGE_WIDTH = false;
var PEN_WIDTH = MIN_WIDTH = SAVE_WIDTH = 4.0;
var SAVE_POINT_FOR_PEN = null;
var DIST = 0.0;

var drawerSketch = Sketch.create({

    container: document.getElementById( 'container' ),
    autoclear: false,

    setup: function() {
        SCREEN_W = $(window).innerWidth();
        SCREEN_H = $(window).innerHeight();
        this.initColor();
        CLIENT = new Tuio.Client({
            host: "http://localhost:5000"
            //host: "http://192.168.193.49:5000"
        });

        $("#eraser").on('tapUp', function() {
            clearAll();
        })

        $("#penWidth").css({
            left: SCREEN_W/2 - $("#penWidth").width()/2,
            top: SCREEN_H/2 - $("#penWidth").height()/2
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
function changingPenWidth() {
    //var i = parseFloat(PEN_WIDTH)-parseFloat(DIST);
    //console.log(DIST);
    var i = SAVE_WIDTH-DIST;
    if (!isNaN(i)) PEN_WIDTH = Math.max(1.0, i);
}
function drawArc(ctx, dist, angle, p, uc) {
    DIST = uc.motionSpeed*0.9;
    changingPenWidth();

    for ( var i = 0; i < dist; i++ ) {
        x = p.x + (Math.sin(angle) * i) - 25;
        y = p.y + (Math.cos(angle) * i) - 25;
        ctx.fillStyle = ctx.strokeStyle = COLOUR;
        ctx.beginPath();
        /// ※ もしペン先の位置調整する時はここを修正してください。
        ctx.arc(x+25, y+25, PEN_WIDTH, false, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
function updatePenWidth(point) {
    SAVE_POINT_FOR_PEN = (SAVE_POINT_FOR_PEN == null) ? point : SAVE_POINT_FOR_PEN;
    var dis = calcDistance(SAVE_POINT_FOR_PEN.x, SAVE_POINT_FOR_PEN.y, point.x, point.y);
    PEN_WIDTH = (dis >= MIN_WIDTH) ? dis : MIN_WIDTH;
    SAVE_WIDTH = (dis >= MIN_WIDTH) ? dis : MIN_WIDTH;
    $("#penWidth").css({
        width: PEN_WIDTH*2,
        height: PEN_WIDTH*2,
        left: SCREEN_W/2 - PEN_WIDTH,
        top: SCREEN_H/2 - PEN_WIDTH
    });
}

onAddTuioCursor = function(addCursor) {
    var point = [ ];
    point.push({ x: addCursor.getScreenX(SCREEN_W), y: addCursor.getScreenY(SCREEN_H) });
    POINTS[addCursor.sessionId] = point;
    chkColor( point );
    if (IS_CHANGE_WIDTH) {
        var p = point[0];
        updatePenWidth(p);
        $("#penWidth").css({opacity:1});
    }
},

onUpdateTuioCursor = function(updateCursor) {
    var uc = updateCursor;
    var currentPoints = { x: uc.getScreenX(SCREEN_W), y: uc.getScreenY(SCREEN_H) };

    var dist = distanceBetween( POINTS[uc.sessionId], currentPoints );
    var angle = angleBetween( POINTS[uc.sessionId], currentPoints );
    if (!IS_CHANGE_WIDTH) {
        drawArc( drawerSketch, dist, angle, POINTS[uc.sessionId], uc );
    }
    POINTS[uc.sessionId] = currentPoints;

    var point = { x: updateCursor.getScreenX(SCREEN_W), y: updateCursor.getScreenY(SCREEN_H) };
    if (IS_CHANGE_WIDTH) {
        updatePenWidth(point);
    }
},

onRemoveTuioCursor = function(removeCursor) {
    POINTS[removeCursor.sessionId] = 0;
    var point = [ ];
    point.push({ x: removeCursor.getScreenX(SCREEN_W), y: removeCursor.getScreenY(SCREEN_H) });
    chkColor( point );

    if (IS_CHANGE_WIDTH) {
        IS_CHANGE_WIDTH = false;
        SAVE_POINT_FOR_PEN = null;
        $("#penWidth").css({opacity:0});
    }

    PEN_WIDTH = SAVE_WIDTH;
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
                IS_CHANGE_WIDTH = true;
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

clearAll = function() {
    drawerSketch.clear();
}


//
// var stage;
// var container;
// var children = [];
// var lastMidPoint = new createjs.Point();
// var currentPoint = new createjs.Point();
// var lastPoint = new createjs.Point();
// var velocityX = 0;
// var velocityY = 0;
// var ease = 0.25;
// var maxLines = 50;
// var currentLineThickness = 1;
// function initialize() {
// 	var canvasElement = document.getElementById("test_canvas");
//     $('#test_canvas').attr('width', SCREEN_W);
//     $('#test_canvas').attr('height', SCREEN_H);
//
// 	stage = new createjs.Stage(canvasElement);
// 	container = new createjs.Container();
// 	stage.addChild(container);
// 	lastPoint.x = lastMidPoint.x = canvasElement.width / 2;
// 	lastPoint.y = lastMidPoint.y = canvasElement.height / 2;
// 	createjs.Ticker.addEventListener("tick", draw);
// }
// function draw() {
// 	var moveX = (stage.mouseX - currentPoint.x);
// 	var moveY = (stage.mouseY - currentPoint.y);
// 	var numChildren = container.getNumChildren();
// 	if (moveX * moveX + moveY * moveY > 0.1) {
// 		velocityX = moveX * ease;
// 		velocityY = moveY * ease;
// 		currentPoint.x += velocityX;
// 		currentPoint.y += velocityY;
// 		var midPoint = new createjs.Point((lastPoint.x + currentPoint.x) / 2, (lastPoint.y + currentPoint.y) / 2);
// 		var myShape = getNewChild();
// 		container.addChild(myShape);
// 		drawCurve(myShape.graphics, lastMidPoint, midPoint, lastPoint);
// 		lastPoint.initialize(currentPoint.x, currentPoint.y);
// 		lastMidPoint.initialize(midPoint.x, midPoint.y);
// 	}
// 	stage.update();
// }
// function getNewChild() {
// 	var child;
// 	if (children.length) {
// 		child = children.pop();
// 		child.graphics.clear();
// 	} else {
// 		child = new createjs.Shape();
// 	}
// 	return child;
// }
// function removeOldChild() {
// 	var child = container.getChildAt(0);
// 	container.removeChildAt(0);
// 	children.push(child);
// }
// function drawCurve(myGraphics, oldPoint, newPoint, controlPoint) {
// 	setLineThickness(oldPoint, newPoint);
// 	myGraphics.beginStroke("black")
// 	.setStrokeStyle(currentLineThickness, "round", "round")
// 	.moveTo(oldPoint.x, oldPoint.y)
// 	.quadraticCurveTo(controlPoint.x, controlPoint.y, newPoint.x, newPoint.y);
// }
// function setLineThickness(oldPoint, newPoint) {
// 	var distanceX = newPoint.x - oldPoint.x;
// 	var distanceY = newPoint.y - oldPoint.y;
// 	var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
// 	var lineThickness = distance * 0.2;
// 	currentLineThickness += (lineThickness - currentLineThickness) * 0.25;
// }
// initialize();
