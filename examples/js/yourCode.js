function main() {
    if (firstFrame == true) {
        // Ran only on the first frame
    }
    // Ran every frame
}

function setup() {
    return {
        "fps": 2,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);