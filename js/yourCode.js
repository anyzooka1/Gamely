/* A SIMPLE PROGRAM THAT LETS YOU MOVE A SMILEY UP BY PRESSING THE MOUSE BUTTON, AND DOWN BY PRESSING 'S' */

function main() {
    if (firstFrame == true) {
        // alert("Only completed on the first frame");
    }
    // alert("Completed every frame");
}

function setup() {
    return {
        "fps": 60,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);