import { GameObjects } from 'phaser';
import { Actor } from './actor.js';

export class Player extends Actor {

    keyW;
    keyA;
    keyS;
    keyD;

    up;
    moving;

    speed = 128;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');
        this.pointer = this.scene.input.activePointer;

        // PHYSICS
        this.getBody().setSize(1, 10);
        this.getBody().setOffset(24, 24);

        // DIRECTIONAL INFO
        this.up = false;
        this.moving = false;


        // ANIMATIONS
        this.initAnimations();
    }

    

    initAnimations() {
        this.scene.anims.create({
            key: 'idle_down',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle_up',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_down',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_up',
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            repeat: -1
        });
    }

    update() {
        this.getBody().setVelocity(0);
        this.moving = false;

        //touch/mouse controls
        if (this.scene.input.activePointer.isDown) {
            const directionX = this.scene.input.activePointer.x - this.scene.game.scale.width / 2;
            const directionY = this.scene.input.activePointer.y - this.scene.game.scale.height / 2;
            this.body.velocity.x = directionX;
            this.body.velocity.y = directionY;
            this.moving = true;
        } else {
            if (this.keyW?.isDown) {
                this.body.velocity.y = -this.speed;
                this.moving = true;
            }

            if (this.keyA?.isDown) {
                this.body.velocity.x = -this.speed;
                this.moving = true;
            }

            if (this.keyS?.isDown) {
                this.body.velocity.y = this.speed;
                this.moving = true;
            }

            if (this.keyD?.isDown) {
                this.body.velocity.x = this.speed;
                this.moving = true;
            }
        }

        if (this.body.velocity.y < 0) {
            this.up = true;
        } else if (this.moving) {
            this.up = false;
        }

        if (this.moving) {
            this.checkFlip();
            this.body.velocity.limit(this.speed);
        }

        //if (this.keyW?.isDown) {
        //    this.body.velocity.y = -this.speed;
        //    this.moving = true;
        //    this.up = true;
        //}

        //if (this.keyA?.isDown) {
        //    this.body.velocity.x = -this.speed;
        //    this.checkFlip();
        //    //this.getBody().setOffset(48, 15);
        //    this.moving = true;
        //    if (!this.keyW?.isDown) {
        //        this.up = false;
        //    }
        //}

        //if (this.keyS?.isDown) {
        //    this.body.velocity.y = this.speed;
        //    this.moving = true;
        //    this.up = false;
        //}

        //if (this.keyD?.isDown) {
        //    this.body.velocity.x = this.speed;
        //    this.checkFlip();
        //    //this.getBody().setOffset(15, 15);
        //    this.moving = true;
        //    if (!this.keyW?.isDown) {
        //        this.up = false;
        //    }
        //}

        //this.body.velocity.limit(this.speed);

        // Animation
        if (this.moving === true) {
            if (this.up === true) {
                this.anims.play('walk_up', true);
            } else {
                this.anims.play('walk_down', true);
            }
        } else {
            if (this.up === true) {
                this.anims.play('idle_up', true);
            } else {
                this.anims.play('idle_down', true);
            }
        }

    }
}