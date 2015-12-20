SCREEN_W = $(document).width();
SCREEN_H = $(document).height();
USER_ID = 0;
FINGER = [];
SAVE_DIS = 0;

CANVAS = CONTEXT = null;
IS_DEBUG = false;
if($("#canvas").get(0)) {
    IS_DEBUG = true;
    CANVAS = $("#canvas").get(0);
    CANVAS.width = SCREEN_W;
    CANVAS.height = SCREEN_H;
    CONTEXT = CANVAS.getContext("2d");
}

$(function() {
    var client = new Tuio.Client({
        host: "http://localhost:5000"
        //host: "http://192.168.193.49:5000"
    }),

    onConnect = function() {
        console.log("onConnect");
        onTracker();
    },
    onAddTuioCursor = function(addCursor) {
        x = addCursor.getScreenX(SCREEN_W);
        y = addCursor.getScreenY(SCREEN_H);
        $(".tuio-tapEvent").each( function() {
            offset = $(this).offset();
            isRangeX = ( offset.left <= x && (offset.left + $(this).width()) >= x ) ? true : false;
            isRangeY = ( offset.top <= y && (offset.top + $(this).height()) >= y ) ? true : false;
            if ( isRangeX && isRangeY ) {$(this).trigger('tapDown', [x,y]);}
        });
        FINGER[addCursor.cursorId] = addCursor;
    },
    onUpdateTuioCursor = function(updateCursor) {
        x = updateCursor.getScreenX(SCREEN_W);
        y = updateCursor.getScreenY(SCREEN_H);
        $(".tuio-tapEvent").each( function() {
            offset = $(this).offset();
            isRangeX = ( offset.left <= x && (offset.left + $(this).width()) >= x ) ? true : false;
            isRangeY = ( offset.top <= y && (offset.top + $(this).height()) >= y ) ? true : false;
            if ( isRangeX && isRangeY ) {$(this).trigger('tapMove', [x,y]);}
        });
    },
    onRemoveTuioCursor = function(removeCursor) {
        x = removeCursor.getScreenX(SCREEN_W);
        y = removeCursor.getScreenY(SCREEN_H);
        $(".tuio-tapEvent").each( function() {
            offset = $(this).offset();
            isRangeX = ( offset.left <= x && (offset.left + $(this).width()) >= x ) ? true : false;
            isRangeY = ( offset.top <= y && (offset.top + $(this).height()) >= y ) ? true : false;
            if ( isRangeX && isRangeY ) {$(this).trigger('tapUp', [x,y]);}
        });
        FINGER.splice( removeCursor.cursorId, 1 );
        if (FINGER.length < 2) SAVE_DIS = 0;
    },
    onTracker = function() {
        requestAnimationFrame(onTracker);
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        var cursors = client.getTuioCursors();
        for (var i in cursors) {
            if (IS_DEBUG) drawDebugger(cursors[i]);
            if (FINGER.length > 1) {
                if (SAVE_DIS == 0) SAVE_DIS = calcDistance(FINGER[0].getScreenX(SCREEN_W), FINGER[0].getScreenY(SCREEN_H), FINGER[1].getScreenX(SCREEN_W), FINGER[1].getScreenY(SCREEN_H));
                fingerAction(FINGER);
            }
        }
    }
    onAddTuioObject = function(addObject) {},
    onUpdateTuioObject = function(updateObject) {},
    onRemoveTuioObject = function(removeObject) {},
    onRefresh = function(time) {};

    client.on("connect", onConnect);
    client.on("addTuioCursor", onAddTuioCursor);
    client.on("updateTuioCursor", onUpdateTuioCursor);
    client.on("removeTuioCursor", onRemoveTuioCursor);
    client.on("addTuioObject", onAddTuioObject);
    client.on("updateTuioObject", onUpdateTuioObject);
    client.on("removeTuioObject", onRemoveTuioObject);
    client.on("refresh", onRefresh);
    client.connect();
});
var SAVE = 0;
var _SAVE = 0;
function fingerAction(cursor) {
    var currentDis = calcDistance(FINGER[0].getScreenX(SCREEN_W), FINGER[0].getScreenY(SCREEN_H), FINGER[1].getScreenX(SCREEN_W), FINGER[1].getScreenY(SCREEN_H));
    var d = Math.round(currentDis - SAVE_DIS);
    var r = calcRadidan(FINGER[0].getScreenX(SCREEN_W), FINGER[0].getScreenY(SCREEN_H), FINGER[1].getScreenX(SCREEN_W), FINGER[1].getScreenY(SCREEN_H));
    $(".tuio-tapEvent").each( function() {
        if ( $(this).hasClass("activeFingerAction") ) {
            if (SAVE != d) {
                $(this).trigger('pichAction', d);
                SAVE = d;
                SAVE_DIS = 0;
            }
            if (_SAVE != r) {
                $(this).trigger('rotateAction', r);
                _SAVE = r;
            }
        }
    });
}

// calc distance
function calcDistance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );
}

// calc radian
function calcRadidan(x1, y1, x2, y2) {
    var radian = Math.atan2(x2 - x1, y2 - y1);
    return radian;
}

// - debuger
function drawDebugger(cursor) {
    CONTEXT.beginPath();
    CONTEXT.strokeStyle = "rgba(255,255,255,0.8)";
    CONTEXT.lineWidth = 3;
    CONTEXT.arc(
        cursor.getScreenX(SCREEN_W),
        cursor.getScreenY(SCREEN_H),
        30,
        0,
        Math.PI * 2
    );
    CONTEXT.closePath();
    CONTEXT.stroke();

    var thumb = {x:cursor.getScreenX(SCREEN_W),y:cursor.getScreenY(SCREEN_H)};
}

// get
function GetQueryString() {
    var result = {};
    if( 1 < window.location.search.length ) {
        var query = window.location.search.substring( 1 );
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ ) {
            var element = parameters[ i ].split( '=' );
            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );
            result[ paramName ] = paramValue;
        }
    }
    return result;
}
