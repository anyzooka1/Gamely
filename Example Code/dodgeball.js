var character = new sprite({
    "x": 90,
    "y": 0,
    "fileLocation": "images/smiley.png",
    "visible": true,
});

var ball = new sprite({
    "x": 400,
    "y": Math.random() * 400,
    "fileLocation": "images/ball.png",
    "visible": true,
});

var ballSpeed = 1;
var playerSpeed = 2;
var score = 0;

function main() {
    if (firstFrame == true) {
        // nothing to do here
    }
    
    // moves player
    if (isKeyDown("w")) {
        character.y -= playerSpeed;
    }
    if (isKeyDown("a")) {
        character.x -= playerSpeed;
    }
    if (isKeyDown("s")) {
        character.y += playerSpeed;
    }
    if (isKeyDown("d")) {
        character.x += playerSpeed;
    }

    if (character.isColliding(ball)) {
        // ends game if colliding
        playAudio("audio/death.mp3");
        character.visible = false;
        ball.visible = false;
        alert(`Score: ${score}!`);
    }

    // move ball constantly
    ball.x -= ballSpeed;

    if (ball.x + ball.w < 0) {
        // ball is on the left hand side of game
        ball.x = 400;
        ball.y = Math.random() * 400;
        ballSpeed++;
        score++;
    }
}

function setup() {
    return {
        "fps": 144,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);