// #time-num-group
$(function() {
    var timeNumGroup = $('#time-num-group');

    var init = function() {
        var nowTime = new Date();
        var nowHour = (nowTime.getHours() < 10) ? "0" + nowTime.getHours() : "" + nowTime.getHours();
        var nowMin = (nowTime.getMinutes() < 10) ? "0" + nowTime.getMinutes() : "" + nowTime.getMinutes();
        var nowSec = (nowTime.getSeconds() < 10) ? "0" + nowTime.getSeconds() : "" + nowTime.getSeconds();

        var h = [nowHour.substring(0,1),nowHour.substring(1,2)];
        var m = [nowMin.substring(0,1),nowMin.substring(1,2)];
        var s = [nowSec.substring(0,1),nowSec.substring(1,2)];

        var C = "<img class='time-colon' src='./images/time/time-colon.png' alt='colon' />";
        var H = (h[0] < 1) ? "<img class='time-num' src='./images/time/time-"+h[0]+"0.png' alt='' />" : "<img class='time-num' src='./images/time/time-"+h[0]+".png' alt='' />";
        var M = (m[0] < 1) ? "<img class='time-num' src='./images/time/time-"+m[0]+"0.png' alt='' />" : "<img class='time-num' src='./images/time/time-"+m[0]+".png' alt='' />";
        var S = (s[0] < 1) ? "<img class='time-num' src='./images/time/time-"+s[0]+"0.png' alt='' />" : "<img class='time-num' src='./images/time/time-"+s[0]+".png' alt='' />";
        H += "<img class='time-num' src='./images/time/time-"+h[1]+".png' alt='' />";
        M += "<img class='time-num' src='./images/time/time-"+m[1]+".png' alt='' />";
        S += "<img class='time-num' src='./images/time/time-"+s[1]+".png' alt='' />";

        timeNumGroup.html(H + C + M + C + S);
    }
    setInterval(init, 1000);
    init();

    timeNumGroup.on('initWithAnim', function() {
        $(this).animate({top : 115}, 500);
        $(this).fadeIn();
    });

    timeNumGroup.on('init', function() {
        timeNumGroup.css({"top": "115px"},{"display": "block"});
    });
});
