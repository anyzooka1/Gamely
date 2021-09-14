// stores as globals
var firstFrame = true;
var sprites = [];
var texts = [];
var ctx = null;
var buttons = [];

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

window.addEventListener('touchstart', function() {
    mouseDown = true;
});
window.addEventListener('touchend', function() {
    mouseDown = false;
});

// draws what is in 'buffer'
function render() {
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].visible == false) {
            continue;
        }

        var curToDraw = sprites.sort(compareByZindex)[i].renderImage();


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
        var textHeight = parseInt(ctx.font.match(/\d+/), 10);
        ctx.fillText(curText[1][0], curText[1][1], curText[1][2] + textHeight);
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
    var toFillAround = 10;

    main(); // executes user's code
    render();
    firstFrame = false;

    const interval = setInterval(function() {
        ctx.fillStyle = `rgb(${options["back-colour"]})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // this overwrites anything that had been drawn before, to not have to completely
        // have to redraw the entire screen, but only those areas that have changed
        //

        // for (let i = 0; i < sprites.length; i++) {
        //     var curToDraw = sprites[i].renderImage();

        //     // gets image
        //     var imageBeingRead = new Image();
        //     imageBeingRead.src = curToDraw[0];
            
        //     if (curToDraw.length == 5) {
        //         ctx.fillRect(curToDraw[1] - toFillAround, curToDraw[2] - toFillAround, curToDraw[3] + toFillAround, curToDraw[4] + toFillAround);
        //     } else {
        //         ctx.fillRect(curToDraw[1] - toFillAround, curToDraw[2] - toFillAround, imageBeingRead.width + toFillAround, imageBeingRead.height + toFillAround);
        //     }
        // }

        // for (let i = 0; i < texts.length; i++) {
        //     var curText = texts[i];
        //     ctx.font = curText[0];
        //     var text = ctx.measureText(curText[1][0]);
        //     var textHeight = parseInt(ctx.font.match(/\d+/), 10);
        //     var textPadding = 20;

        //     ctx.fillRect(curText[1][1] - textPadding, curText[1][2] - textHeight, text.width + textPadding, textHeight + textPadding);
        // }


        for (let i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            if (button.id != "mainCanvas") {
                if (button.wasVisible != button.visible) {
                    button.wasVisible = button.visible;
                    if (button.visible) {
                        button.button.style.display = "block";
                    } else {
                        button.button.style.display = "none";
                    }
                }
            }
        }

        texts = [];
        main(); // executes user's code
        render();
        firstFrame = false;

    }, deltaTime);
}

function drawText(textContent, font, size, x, y, colour) {
    texts.push([`${size}px ${font}`, [textContent, x, y, colour, size]]);
}

function compareByZindex(a, b) {
    if (a.zIndex < b.zIndex) {
        return -1;
    }
    if (a.zIndex > b.zIndex) {
        return 1;
    }
    // a must be equal to b
    return 0;
}