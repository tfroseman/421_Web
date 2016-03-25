// Setup vars to be used
var usa_img;
var brit_img;

var img_height = 300;
var img_width = 150;

var canvases;
var canvases_offset;

// Init vars to be loaded on demand
function init() {
    usa_img = document.getElementById('usa');
    brit_img = document.getElementById('brit');
    console.log("INIT");
    canvases = document.getElementsByClassName("rotate");
    canvases_offset = document.getElementsByClassName("rotate_offset");
    draw();
}


function draw() {
    console.log("DRAW");
    for (var i = 0; i < canvases.length; i++) {
        var ctx = canvases[i].getContext("2d");
        console.log(ctx);
        console.log(brit_img);
        ctx.drawImage(usa_img, 0, 0, img_height, img_width);
    }
    for (var i = 0; i < canvases_offset.length; i++) {
        var ctx = canvases_offset[i].getContext("2d");
        console.log(ctx);
        console.log(brit_img);
        ctx.drawImage(brit_img, 0, 0, img_height, img_width);
    }
}

var theta = 0;
var omega = 2 * Math.PI / 4 / 1000;

var lastTime = null;
var time_movement = 0;
//animate
window.setInterval(function () {
    time_movement += Math.PI;
    var when = Date.now();
    if (lastTime == null) {
        lastTime = when;
        return;
    }
    var delta = when - lastTime;
    theta += omega * delta;
    while (theta >= 2 * Math.PI)
        theta -= 2 * Math.PI;

    document.getElementById('carousel').style.transform = "rotateY("+theta*10+"deg)";
    document.getElementById('carousel2').style.transform = "rotateY("+theta*10+"deg)";

    for (var i = 0; i < canvases.length; i++) {
        drawShear(canvases[i].getContext("2d"), Math.cos(theta), Math.sin(theta) / 9);

        //var canvas = canvases[i];
        //canvas.style.transform = " translateZ( 0px )";
        //canvas.style.transform = "rotateY("+theta*10+"deg)";
        //canvas.style.transform =  canvas.style.transform + " translateZ( 288px )";

    }

    for (var i = 0; i < canvases_offset.length; i++) {
        //var canvas_offset = canvases_offset[i];
        //canvas_offset.style.transform = "rotateY("+theta*10+"deg), translateZ( 288px )";

    }
    //drawShear(1, Math.cos(theta), Math.sin(theta) / 9);
    lastTime = when;
}, 15);

var drawShear = function (ctx, b, c) {
    //ctx.clearRect(0, 0, 210, 140);
    //ctx.save();
    console.log("Shear");
    ctx.setTransform(b, c, 0, 1, 0, 0);
    //ctx.restore();
};
