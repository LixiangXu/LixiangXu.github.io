class Scene1 extends Phaser.Scene {
    constructor() {
      super("startGame");
    }

    preload(){
      this.load.image('welcome', 'assets/images/message-initial.png');
      this.load.image('background-day', 'assets/images/background-day.png');
      this.load.spritesheet('grass-ground', 'assets/images/ground-sprite.png', {
        frameWidth: 336,
        frameHeight: 112,
      });
      this.load.image('pipe-green-bottom', 'assets/images/pipe-green-bottom.png');
      this.load.image('pipe-green-top', 'assets/images/pipe-green-top.png');
      this.load.spritesheet('blue-bird', 'assets/images/bird-blue-sprite.png', {
        frameWidth: 34,
        frameHeight: 24,
      })
    }

    create() {
      this.gameStarted = false;
      // this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
      if (!this.gameStarted) {
        this.startScene = this.add.image(config.width/2, config.height/2, 'welcome');
      }
      this.input.keyboard.on('keydown', () => {
        this.scene.start('playGame')
      })
    }
}