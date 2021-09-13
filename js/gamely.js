// stores as globals
var firstFrame = true;
var sprites = [];
var texts = [];
var ctx = null;

// checks which keys are down
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

// keeps mouse state in memory
var mouseDown = false;
document.body.onmousedown = function() { 
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

// draws what is in 'buffer'
function render() {
    for (let i = 0; i < sprites.length; i++) {
        var curToDraw = sprites[i].renderImage();

        // draws image
        var imageToDraw = new Image();
        imageToDraw.src = curToDraw[0];

        if (curToDraw.length == 5) {
            ctx.drawImage(imageToDraw, curToDraw[1], curToDraw[2], curToDraw[3], curToDraw[4]);
        } else {
            ctx.drawImage(imageToDraw, curToDraw[1], curToDraw[2]);
        }
    }

    for (let i = 0; i < texts.length; i++) {
        var curText = texts[i];
        ctx.font = curText[0];
        ctx.fillStyle = `rgb(${curText[1][3]})`;
        var text = ctx.measureText(curText[1][0]);
        ctx.fillText(curText[1][0], curText[1][1], curText[1][2]);
    }
}

// returns true or false depending on whether the specified key is pressed
function isKeyDown(sKey) {
    var sKeyCode = sKey.toUpperCase().charCodeAt();
    if (pressedKeys[sKeyCode]) { return true; }
    return false;
}

// returns true or false depending on whether the specified key is pressed
function isMouseDown() {
    return mouseDown;
}

function playAudio(fileLoc) {
    var audio = new Audio(fileLoc);
    audio.play();
}

function run(setup, main) {
    var canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext('2d');

    var options = setup();
    var deltaTime = 1000 / options["fps"]; // time between frames

    ctx.canvas.width  = options["size"][0];
    ctx.canvas.height = options["size"][1];
    ctx.fillStyle = `rgb(${options["back-colour"]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var toFillAround = 5;

    const interval = setInterval(function() {
        // this overwrites anything that had been drawn before, to not have to completely
        // have to redraw the entire screen, but only those areas that have changed
        //
        ctx.fillStyle = `rgb(${options["back-colour"]})`;

        for (let i = 0; i < sprites.length; i++) {
            var curToDraw = sprites[i].renderImage();

            // gets image
            var imageBeingRead = new Image();
            imageBeingRead.src = curToDraw[0];
            
            if (curToDraw.length == 5) {
                ctx.fillRect(curToDraw[1] - toFillAround, curToDraw[2] - toFillAround, curToDraw[3] + toFillAround, curToDraw[4] + toFillAround);
            } else {
                ctx.fillRect(curToDraw[1] - toFillAround, curToDraw[2] - toFillAround, imageBeingRead.width + toFillAround, imageBeingRead.height + toFillAround);
            }
        }

        for (let i = 0; i < texts.length; i++) {
            var curText = texts[i];
            ctx.font = curText[0];
            var text = ctx.measureText(curText[1][0]);
            var textHeight = parseInt(ctx.font.match(/\d+/), 10);
            var textPadding = 20;

            ctx.fillRect(curText[1][1] - textPadding, curText[1][2] - textHeight, text.width + textPadding, textHeight + textPadding);
        }

        // sprites = [];

        texts = [];
        main(); // executes user's code
        render();
        firstFrame = false;

    }, deltaTime);
}

function drawText(textContent, font, size, x, y, colour) {
    texts.push([`${size}px ${font}`, [textContent, x, y, colour, size]]);
}

function post(yourUrl, sContent, sContentType) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', sContentType);
    xhr.send(sContent);
}

function get(yourUrl) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = JSON.parse(this.responseText);

            // we get the returned data
        }

        // end of state change: it can be after some time (async)
    };

    xhr.open('GET', yourUrl, true);
    xhr.send();
}

