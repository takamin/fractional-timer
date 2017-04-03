var ft = null;
(function(g) {
    if("FractionalTimer" in g) {
        ft = g["FractionalTimer"];
    }
}(Function("return this;")()));
var target_time_sec = 10;
var delayMilli = 0.001;

var txtStatus;
var btnStart;
var btnStatus;
var t0 = null;
var t1 = null;
var ftid = null;
var counter = 0;
var maxCounter = target_time_sec * 1000 / delayMilli;

function webTest_onload() {
    "use strict";
    txtStatus = document.getElementById("txtStatus");
    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", btnStart_click);
    btnStatus = document.getElementById("btnStatus");
    btnStatus.addEventListener("click", btnStatus_click);
}
function tick() {
    return (new Date()).getTime();
}
function btnStart_click() {
    "use strict";
    stop();
    t0 = t1 = tick();
    txtStatus.innerHTML = "Count " + target_time_sec + " [s]...";
    ftid = ft.setInterval(function() {
        counter++;
        if(counter >= maxCounter) {
            showStatus();
            stop();
        }
    }, delayMilli);
}
function btnStatus_click() {
    showStatus();
}
function stop() {
    if(ftid != null) {
        ft.clearInterval(ftid);
        ftid = null;
        counter = 0;
    }
}
function showStatus() {
    if(ftid != null) {
        t1 = tick();
        var actual_time_sec = (t1 - t0)/1000;
        var current_target_sec = target_time_sec * counter / maxCounter;
        var error = Math.round(100000 * current_target_sec / actual_time_sec) / 1000;
        txtStatus.innerHTML =
            "Counter " + counter + "/" + maxCounter + " " +
            "Elapse " + actual_time_sec + "[s], error = " + error + "%";
    }
}
