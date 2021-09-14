var yVelocity = 0;
var groundLevel = 400; // point at which the character will stop (1/5 from botton of screen)
var gravityForce = 1; // multiplyer of gravity

var character = new gamelySprite({
    "x": 90,
    "y": 0,
    "fileLocation": "examples/images/smiley.png",
    "visible": true,
});

function main() {
    if (firstFrame == true) {
        // nothing to do here
    }
    
    if (character.y < groundLevel) {
        yVelocity += gravityForce; // increase speed at which you fall at
    }
    if (character.y >= groundLevel) {
        yVelocity = 0; // stop falling
        character.y = groundLevel; // in case character goes below ground level
        if (isKeyDown("w")) {
            yVelocity = -15; // jumps
        }
    }
    character.y += yVelocity; // moves player
}

function setup() {
    return {
        "fps": 60,
        "size": [200, 500],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);