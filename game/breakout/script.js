var config = {
    width: 480,
    height: 320,
    type: Phaser.AUTO,
    backgroundColor: '#eeb',
    scene: Scene1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scale: {
        // mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
};

var gameSettings = {
    ballSpeed: 150,

    paddleWidth: 50,
    paddleHeight: 5,
    paddleSpeed: 350,

    brickWidth: 50,
    brickHeight: 20,
    brickRow: 1,
    brickCol: 7,
    brickOffsetTop: 30,
    brickOffsetLeft: 55,
    brickPadding: 10
}
var game = new Phaser.Game(config);

