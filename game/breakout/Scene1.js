class Scene1 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }


    preload() {
        this.load.image("ball", 'img/ball.png');
        this.load.image("paddle", 'img/paddle.png')
        this.load.image("brick", 'img/brick.png')
    }

    create() {
        this.score = 0;
        this.gameStarted = false;
        // bouncing world boundary except bottom
        this.physics.world.checkCollision.down = false;
        // add ball
        this.ball = this.physics.add.sprite(config.width / 2, config.height / 2, "ball");
        // this.ball.body.setVelocity(gameSettings.ballSpeed, gameSettings.ballSpeed);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true);

        // add bricks as group
        this.initBricks()

        // add paddle
        this.paddle = this.physics.add.sprite(config.width / 2, config.height - gameSettings.paddleHeight, "paddle");
        this.paddle.body.setCollideWorldBounds(true);
        this.paddle.setImmovable(true);
        this.physics.add.collider(this.ball, this.paddle, hitPaddle, null);


        // how to control paddle
        this.cursorsKeys = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;
        this.gameText = this.add.text(40, config.height/2, '', {
            fontSize: '38px',
            fill: '#fff',
            fontFamily: 'Monaco, Courier, monospace',
            scale: {
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        });
    }


    update() {
        this.movePaddle();
        if (this.loseGame()) {
            this.gameText.setText('Game Over!');
            this.ball.disableBody(true)
        } else if (this.winGame()) {
            this.gameText.setText('You did it!');
            this.ball.disableBody(true)
        }

        // check game started or not
        if (!this.gameStarted) {
            this.gameText.setText('Hit Space to Start!')
            this.ball.setX(this.paddle.x)
        }
        if (this.cursorsKeys.space.isDown) {
            this.gameStarted = true;
            this.gameText.setText('');
            this.ball.body.setVelocity(Phaser.Math.Between(-gameSettings.ballSpeed, gameSettings.ballSpeed), Phaser.Math.Between(gameSettings.ballSpeed / 2, gameSettings.ballSpeed));
        }
    }

    initBricks() {
        for (var row = 0; row < gameSettings.brickRow; row ++) {
            var bricks = this.physics.add.group({
                key: 'brick',
                repeat: gameSettings.brickCol,
                immovable: true,
                setXY: {
                    x: gameSettings.brickOffsetLeft - gameSettings.brickWidth/2,
                    y: gameSettings.brickOffsetTop + row * (gameSettings.brickHeight + gameSettings.brickPadding),
                    stepX: gameSettings.brickWidth + gameSettings.brickPadding
                }
            });
            this.physics.add.collider(this.ball, bricks, hitBrick, null, this);
        }
    }

    movePaddle() {
        if (this.cursorsKeys.left.isDown) {
            this.paddle.body.setVelocityX(-gameSettings.paddleSpeed)
        } else if (this.cursorsKeys.right.isDown) {
            this.paddle.body.setVelocityX(gameSettings.paddleSpeed)
        } else {
            this.paddle.body.setVelocityX(0);
        }
    }

    loseGame() {
        return this.ball.body.y > this.paddle.y + gameSettings.paddleHeight / 2
    }

    winGame() {
        return this.score == gameSettings.brickRow * (gameSettings.brickCol + 1)
    }
}

function hitBrick(ball, brick) {
    brick.disableBody(true, true);
    this.score += 1;
}

function hitPaddle(ball, paddle) {
    ball.setVelocityY(-Math.abs(ball.body.velocity.y) - 5);
    var velocityX = (ball.x - paddle.x) * 2 + ball.body.velocity.x
    ball.setVelocityX(velocityX)
}