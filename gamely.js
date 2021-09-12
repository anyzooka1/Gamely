// stores as globals
var firstFrame = true;
var toDraw = [];
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
    for (let i = 0; i < toDraw.length; i++) {
        var curToDraw = toDraw[i];

        // draws image
        var imageToDraw = new Image();
        imageToDraw.src = curToDraw[0];

        if (curToDraw.length == 5) {
            ctx.drawImage(imageToDraw, curToDraw[1], curToDraw[2], curToDraw[3], curToDraw[4]);
        } else {
            ctx.drawImage(imageToDraw, curToDraw[1], curToDraw[2]);
        }


    }
}

// called by user
// width and height are optional. If not set, will use defult size of image loaded, otherwise will stretch
function addImage(location, x, y, width = -1, height = -1) {
    if (width == -1 && height == -1) {
        toDraw.push([location, x, y]);
    } else {
        toDraw.push([location, x, y, width, height]);
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

function run(setup, main) {
    var canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext('2d');

    var options = setup();
    var deltaTime = 1000 / options["fps"]; // time between frames

    ctx.canvas.width  = options["size"][0];
    ctx.canvas.height = options["size"][1];
    ctx.fillStyle = `rgb(${options["back-colour"]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const interval = setInterval(function() {
        // this overwrites anything that had been drawn before, to not have to completely
        // have to redraw the entire screen, but only those areas that have changed
        for (let i = 0; i < toDraw.length; i++) {
            var curToDraw = toDraw[i];
            var imageBeingRead = new Image();
            imageBeingRead.src = curToDraw[0];

            ctx.fillStyle = `rgb(${options["back-colour"]})`;

            if (curToDraw.length == 5) {
                ctx.fillRect(curToDraw[1], curToDraw[2], curToDraw[3], curToDraw[4]);
            } else {
                ctx.fillRect(curToDraw[1], curToDraw[2], imageBeingRead.width, imageBeingRead.height);
            }

            
        }

        toDraw = [];
        main(); // executes user's code
        render();
        firstFrame = false;

    }, deltaTime);
}