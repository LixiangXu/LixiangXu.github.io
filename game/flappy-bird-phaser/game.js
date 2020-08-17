var config = {
    width: 288,
    height: 512,
    type: Phaser.AUTO,
    backgroundColor: '#eee',
    scene: [Scene1, Scene2, Scene3],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: 300,
        }
    },
    scale: {
        // mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
};

var gameSettings = {
    movingSpeed: 5,
}

var game = new Phaser.Game(config);