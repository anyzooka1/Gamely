var bird = new gamelySprite({
    "x": 90,
    "y": 0,
    "fileLocation": "images/bird.png",
    "visible": true,
});

function main() {
    if (firstFrame == true) {
        // Ran only on the first frame
    }
    // Ran every frame
}

function setup() {
    return {
        "fps": 60,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);