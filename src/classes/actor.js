import { Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.getBody().setCollideWorldBounds(true);
    }

    checkFlip() {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }

    getBody() {
        return this.body;
    }
}