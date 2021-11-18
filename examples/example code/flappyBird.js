var bird = new gamelySprite({
    "x": 20,
    "y": 0,
    "fileLocation": "images/bird.png",
    "visible": true,
    "rotate" : 0,
});

var background = new gamelySprite({
    "x": 0,
    "y": 0,
    "fileLocation": "images/flappyBackground.png",
    "visible": true,
    "rotate" : 0,
    "z-index": -10,
});

var y = 0;
var yVel = 0;
var recVel = 0;
var gravity = 0.1;
var jumpForce = 2;
var pipes = [];
var pipeSpeed = 1; 
var score = 0;
var targetRotation = 0;
var highscore = -1;

var button = new gamelyButton( {
    "x": 10,
    "y": 10,
    "content": "Restart",
    "visible": true,
    "onClickFunc": restart,
} );

function restart() {
    button.visible = false;
    for (let i = 0; i < pipes.length; i++) {
        pipes[i][0].visible = false;
        pipes[i][1].visible = false;
    }

    score = 0;
    y = 0;
    yVel = 0;
    bird.visible = true;
}

function main() {
    if (firstFrame == true) {
        keepSpawningPipes();
        button.visible = false;

        if (!fileExists("flappyBirdScore")) {
            writeFile("flappyBirdScore", "0");
        }

        highscore = parseInt(readFile("flappyBirdScore"));
    }

    if (bird.visible) {
        drawText(`Score: ${score}/${highscore}`, "serif", "48", 10, 0, [255,255,255]);
    } else {
        drawText(`Final Score: ${score}`, "serif", "60", 20, 150, [255,255,255]);
        return;
    }

    if (isKeyDown(" ") || isMouseDown()) {
        yVel = -jumpForce;
    }
    
    targetRotation = (yVel / 10) * 90;

    bird.rotation += (targetRotation - bird.rotation) / 10

    yVel += gravity;
    y += yVel;
    bird.y = y;

    for (let i = 0; i < pipes.length; i++) {
        pipes[i][0].x -= pipeSpeed;
        pipes[i][1].x -= pipeSpeed;

        if (bird.isColliding(pipes[i][0]) || bird.isColliding(pipes[i][1]) || y > 400) {
            bird.visible = false;
            button.visible = true;

            if (score > highscore) {
                highscore = score;
                writeFile("flappyBirdScore", score);
            }
        }

        if (pipes[i][0].x < 20 && !pipes[i][0].passed) {
            score++;
            pipes[i][0].passed = true;
        }
    }
}

function keepSpawningPipes() {
    var pipeHeight = 380;
    var distBetweenPipes = 150;

    setInterval(function() {
        if (!button.visible) {
            var y = Math.random() * 700 - 200; // -200 - 500

            pipes.push([new gamelySprite( {
                "x": 400,
                "y": y / 3 - pipeHeight / 2 - distBetweenPipes,
                "fileLocation": "images/downPipe.png",
                "visible": true,
                "rotate" : 0,
            } ),
            new gamelySprite( {
                "x": 400,
                "y": y / 3 + pipeHeight / 2,
                "fileLocation": "images/upPipe.png",
                "visible": true,
                "rotate" : 0,
            } ), ]);
        }
    }, 2000);
}

function setup() {
    return {
        "fps": 120,
        "size": [400, 400],
        "back-colour": [255, 177, 35],
    };
}

run(setup, main);