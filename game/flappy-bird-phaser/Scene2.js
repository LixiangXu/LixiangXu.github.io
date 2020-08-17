class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
    }

    create() {
        this.score = 0
        
        // moving sky background
        this.physics.world.setBoundsCollision(true, true, false, true)
        this.backgroundDay = this.add.tileSprite(0, 0, config.width, config.height, "background-day");
        this.backgroundDay.setOrigin(0, 0);
        // moving grass background
        this.grassGround = this.physics.add.sprite(config.width/2, config.height - 32, "grass-ground");
        this.grassGround.setImmovable(true); 

        this.anims.create({
            key: 'grass-ground-anim',
            frames: this.anims.generateFrameNumbers('grass-ground', {
                start: 0,
                end: 2,
            }),
            frameRate: 15,
            repeat: -1,
        })
        this.grassGround.play('grass-ground-anim', true);

        // moving pipe
        this.pipesGroup = this.physics.add.group();
        var pipeTop = this.pipesGroup.create(config.width - 50, 10, 'pipe-green-top');
        var pipeBottom = this.pipesGroup.create(config.width - 50, config.height - 10, 'pipe-green-bottom');
        pipeTop.body.allowGravity = false;
        pipeBottom.body.allowGravity = false;
        pipeTop.body.velocity.x = -200
        pipeBottom.body.velocity.x = -200
        pipeTop.setImmovable(true)
        pipeBottom.setImmovable(true)
        

        //add sprite bird with anims
        this.blueBird = this.physics.add.sprite(40, config.height / 2, 'blue-bird');
        this.blueBird.body.setGravityY(500)
        this.anims.create({
            key: 'blue-bird-anim',
            frames: this.anims.generateFrameNumbers("blue-bird", {
                start: 0,
                end: 2,
            }),
            frameRate: 10,
            repeat: -1,
        })
        this.blueBird.play('blue-bird-anim', true);

        this.cursorsKeys = this.input.keyboard.createCursorKeys();
        this.gameText = this.add.text(40, config.height/2, '', {
            fontSize: '38px',
            fill: '#fff',
            fontFamily: 'Monaco, Courier, monospace',
        })
        
        // collide condition
        this.blueBird.setCollideWorldBounds(true)
        this.blueBird.setBounce(0)
        this.physics.add.collider(this.blueBird, this.grassGround, loseGame, null, this);
        this.physics.add.collider(this.blueBird, this.pipesGroup, loseGame, null, this)
    }

    update() {
        this.backgroundDay.tilePositionX += gameSettings.movingSpeed;
        // movePipes()
        this.pipesGroup.children.iterate((pipe) => {
            if (pipe == undefined){
                return
            }
            if (pipe.x < -50) {
                this.score += 1
                reInitPipes(this.pipesGroup)
                return
            }
        })
        // bird rotation
        if (this.cursorsKeys.space.isDown) {
            this.blueBird.setVelocityY(-200)
        }
        this.blueBird.body.rotation = Math.atan(this.blueBird.body.velocity.y / 200) * 180 / Math.PI
    }
}

function reInitPipes(pipes) {
    gap = Phaser.Math.Between(100 , 200)
    center = Phaser.Math.Between(gap + 50, config.height - gap - 50)

    topY = center - gap / 2 - 160 ;
    bottomY = center + gap / 2  + 160;
    pipes.children.iterate((pipe) => {
        pipe.x = config.width;
        if (pipe.texture.key == 'pipe-green-top') {
            pipe.y = topY
        } else if (pipe.texture.key == 'pipe-green-bottom') {
            pipe.y = bottomY
        }
    })
}

function loseGame(bird, pipe) {
    this.gameText.setText('You got: ' + this.score)
    this.scene.pause()
}