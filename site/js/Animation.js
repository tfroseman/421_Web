/**
 * Created by Andy on 3/17/2016.


--Start of Lab--------
var us_flag = new Image();
var brit_flag = new Image();

function init() {

    us_flag.src = 'USA.png';
    brit_flag.src = 'Brit.png';
    window.requestAnimationFrame(draw);

}

function draw() {

    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRext(0,0,300,300);

}
 */
var img = new Image();
//var canvas = document.getElementById("flagAnimation");
// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = '/Brit.png';
var CanvasXSize = 800;
var CanvasYSize = 200;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;
/*
img.onload = function() {
    imgW = img.width*scale;
    imgH = img.height*scale;
    if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
    if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
    else { clearY = CanvasYSize; }
    //Get Canvas Element
    ctx = canvas.getContext('2d');
    //Set Refresh Rate
    return setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
}
*/


// Setup vars to be used
var usa_img;
var brit_img;
console.log(usa_img);

var img_height = 300;
var img_width = 150;

var canvases;
var canvases_offset;

// Init vars to be loaded on demand
function init(){
    usa_img = document.getElementById('usa');
    brit_img = document.getElementById('brit');
    console.log("INIT");
    //usa_img.src = '/USA.png';
    //brit_img.src = '/Brit.png';
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
        ctx.drawImage(usa_img, 0,0,img_height, img_width);
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
window.setInterval(function() {
    time_movement+=Math.PI;
    var when = Date.now();
    if(lastTime == null) {
        lastTime = when;
        return;
    }
    var delta = when - lastTime;
    theta += omega * delta;
    while(theta >= 2 * Math.PI)
        theta -= 2 * Math.PI;

    for (var i = 0; i < canvases.length; i++) {
        var canvas = canvases[i];
        canvas.style.transform = "rotateY("+theta*10+"deg)";
    }
    //drawShear(1, Math.cos(theta), Math.sin(theta) / 9);
    lastTime = when;
}, 15);

//var ctx = canvas.getContext("2d");
//ctx.canvas.width= 1000;
//ctx.canvas.height= 600;
//var width = canvas.width;
//var height = canvas.height;

//the same code does all the drawing; the transformation matrix creates the apparent motion.
/*
var draw = function() {
    ctx.save();
    ctx.drawImage(img,0,0,50,26);
    ctx.drawImage(img,0,52,50,26);
    ctx.drawImage(img,0,104,50,26);

    ctx.drawImage(img,100,0,50,26);
    ctx.drawImage(img,100,52,50,26);
    ctx.drawImage(img,100,104,50,26);

    ctx.drawImage(img,200,0,50,26);
    ctx.drawImage(img,200,52,50,26);
    ctx.drawImage(img,200,104,50,26);

    ctx.drawImage(img,300,0,50,26);
    ctx.drawImage(img,300,52,50,26);
    ctx.drawImage(img,300,104,50,26);

    ctx.beginPath();
    ctx.restore();
}
*/

var drawShear = function(pos_x, b, c) {
    //ctx.clearRect(0, 0, width, height);
    //ctx.save();

    //ctx.setTransform(b, c, 0, 1,pos_x, 0);

    //draw();
    //ctx.restore();
}


var theta = 0;
var omega = 2 * Math.PI / 4 / 1000;

var lastTime = null;
var time_movement = 0;
//animate
window.setInterval(function() {
    time_movement+=Math.PI;
    var when = Date.now();
    if(lastTime == null) {
        lastTime = when;
        return;
    }
    var delta = when - lastTime;
    theta += omega * delta;
    while(theta >= 2 * Math.PI)
        theta -= 2 * Math.PI;
    drawShear(1, Math.cos(theta), Math.sin(theta) / 9);
    lastTime = when;
}, 15);