// stores as globals
var firstFrame = true;
var toDraw = [];
var ctx = null;

// checks which keys are down
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

// draws what is in 'buffer'
function render() {
    for (let i = 0; i < toDraw.length; i++) {
        var curToDraw = toDraw[i];

        // draws image
        var imageToDraw = new Image();
        imageToDraw.src = curToDraw[0];
        ctx.drawImage(imageToDraw, curToDraw[1], curToDraw[2]);
    }
}

// called by user
function addImage(location, x, y) {
    toDraw.push([location, x, y]);
}

// returns true or false depending on whether the specified key is pressed
function keyDown(sKey) {
    var sKeyCode = sKey.toUpperCase().charCodeAt();
    if (pressedKeys[sKeyCode]) { return true; }
    return false;
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
            ctx.fillRect(curToDraw[1], curToDraw[2], imageBeingRead.width, imageBeingRead.height);
        }

        toDraw = [];
        main(); // executes user's code
        render();
        firstFrame = false;

    }, deltaTime);
}