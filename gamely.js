var firstFrame = true;
var toDraw = [];
// checks which keys are down
var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
// window.onkeypress = function(e) { pressedKeys[e.keyCode] = true; }

var ctx = null;

function render() {
    for (let i = 0; i < toDraw.length; i++) {
        var curToDraw = toDraw[i];

        // draws image
        var base_image = new Image();
        base_image.src = curToDraw[0];
        ctx.drawImage(base_image, curToDraw[1], curToDraw[2]);
    }
}

function addImage(location, x, y) {
    toDraw.push([location, x, y]);
}

function keyDown(sKey) {
    var sKeyCode = sKey.toUpperCase().charCodeAt();
    if (pressedKeys[sKeyCode]) { return true; }
    return false;
}

function run(setup, main) {
    var canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext('2d');

    var options = setup();
    var deltaTime = 1000 / options["fps"];

    ctx.canvas.width  = options["size"][0];
    ctx.canvas.height = options["size"][1];
    ctx.fillStyle = `rgb(${options["back-colour"]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);




    const interval = setInterval(function() {
        for (let i = 0; i < toDraw.length; i++) {
            var size = [];

            var curToDraw = toDraw[i];
            var base_image = new Image();
            base_image.src = curToDraw[0];

            ctx.fillStyle = `rgb(${options["back-colour"]})`;
            console.log([curToDraw[1], curToDraw[2], base_image.width, base_image.height]);
            ctx.fillRect(curToDraw[1], curToDraw[2], base_image.width, base_image.height);
        }
        toDraw = [];
        main();
        render();
        firstFrame = false;

    }, deltaTime);
     
}