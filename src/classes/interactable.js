import { Physics } from 'phaser';

export class Interactable extends Physics.Arcade.Sprite {

    outlineZone;
    touching = false;

    title;
    text;
    nineSlice;

    constructor(
        scene,
        x,
        y,
        texture,
        zoneOffsetX,
        zoneOffsetY,
        zoneSize,
        nineSlice,
        title,
        text,
        frame
    ) {
        super(scene, x, y, 'arrow', frame);

        this.title = title;
        this.text = text;
        this.nineSlice = nineSlice;

        this.outlineZone = this.scene.add.zone(
            this.x - zoneOffsetX,
            this.y - zoneOffsetY,
            zoneSize,
            zoneSize
        );

        this.scene.tweens.add({
            targets: this,
            y: this.y-5,
            duration: 300,
            ease: 'Cubic',
            repeat: -1,
            yoyo: true
        });

        scene.add.existing(this);
    }

    getRect() {
        return this.outlineZone.getBounds();
    }

    renderDebug() {
        const zoneGraphics = this.scene.add.graphics().setAlpha(.7);
        zoneGraphics.lineStyle(5, 0xFF00FF, 1.0);
        zoneGraphics.fillStyle(0xFFFFFF, 1.0);
        zoneGraphics.fillRect(this.getRect().x, this.getRect().y, this.getRect().width, this.getRect().height);
        zoneGraphics.strokeRect(this.getRect().x, this.getRect().y, this.getRect().width, this.getRect().height);
    }

    isColliding(playerRect) {
        this.touching = Phaser.Geom.Rectangle.Overlaps(playerRect, this.getRect());
        return this.touching;
    }
}