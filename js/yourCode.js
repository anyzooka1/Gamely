var x = 0;
var y = 0;

var a = new sprite({
    "x": 1,
    "y": 1,
    "fileLocation": "images/smiley.png",
    "visible": true,
});

/* A SIMPLE PROGRAM THAT LETS YOU MOVE A SMILEY UP BY PRESSING THE MOUSE BUTTON, AND DOWN BY PRESSING 'S' */

function main() {
    if (firstFrame == true) {
        // alert("Only completed on the first frame");
    }
    // alert("Completed every frame");
    if (isMouseDown()) {
        a.y -= 2;
    }
    if (isKeyDown("s")) {
        a.y += 2;
    }
}

function setup() {
    return {
        "fps": 60,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);