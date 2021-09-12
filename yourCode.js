var x = 0;
var y = 0;

function main() {
    if (firstFrame == true) {
        // alert("Only completed on the first frame");
    }
    // alert("Completed every frame");
    if (keyDown("w")) {
        y -= 1;
    }
    if (keyDown("a")) {
        x -= 1;
    }
    if (keyDown("s")) {
        y += 1;
    }
    if (keyDown("d")) {
        x += 1;
    }

    addImage("smiley.png", x, y);
}

function setup() {
    return {
        "fps": 60,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);