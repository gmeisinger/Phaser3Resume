import Phaser, { GameObjects, Tweens } from "phaser";
import eventsCenter from "../../classes/EventsCenter.js";

export class UI extends Phaser.Scene {
    container;
    macNineSlice;
    tvNineSlice;
    diplomaNineSlice;
    musicNineSlice;
    paperNineSlice;
    title;
    text;
    rects;

    nineSlices;
    currentNineSlice;

    constructor() {
        super("ui");
        this.rects = [];
    }

    create() {
        console.log("ui scene was created");

        const width = this.game.scale.width;
        const height = this.game.scale.height;

        const buffer = 16;

        this.container = this.add.container((8.5 * width) / 16, height / 6);
        this.container.setScale(2);

        // add the 9 slices
        this.macNineSlice = this.add.nineslice(
            0,
            0,
            width / 4.5,
            height / 3,
            "mac9slice",
            16,
            24
        );
        this.tvNineSlice = this.add.nineslice(
            0,
            0,
            width / 4.5,
            height / 3,
            "tv9slice",
            28,
            24
        );
        this.diplomaNineSlice = this.add.nineslice(
            0,
            0,
            width / 4.5,
            height / 3,
            "diploma9slice",
            28,
            24
        );
        this.musicNineSlice = this.add.nineslice(
            0,
            0,
            width / 4.5,
            height / 3,
            "music9slice",
            20,
            24
        );
        this.paperNineSlice = this.add.nineslice(
            0,
            0,
            width / 4.5,
            height / 3,
            "paper9slice",
            16,
            24
        );

        this.nineSlices = {
            'mac': this.macNineSlice,
            'tv': this.tvNineSlice,
            'diploma': this.diplomaNineSlice,
            'music': this.musicNineSlice,
            'paper': this.paperNineSlice,
        }

        //this.nineSlices = new Map([
        //    ['mac', this.macNineSlice],
        //    ['tv', this.tvNineSlice],
        //    ['diploma', this.diplomaNineSlice],
        //    ['music', this.musicNineSlice],
        //    ['paper', this.paperNineSlice],
        //]);
        
        Object.keys(this.nineSlices).map((key) => {
            this.container.add(this.nineSlices[key]);
            this.nineSlices[key].setVisible(false);
        });
        

        //this.nineSlices.forEach((panel) => {
        //    panel.setVisible(false);
        //});

        this.currentNineSlice = this.nineSlices.diploma;
        this.currentNineSlice.setVisible(true);

        // create the rectangles used for animation
        for (let i = 0; i < 4; i++) {
            this.rects.push(
                new GameObjects.Rectangle(
                    this,
                    this.container.x - width / 2,
                    this.container.y,
                    0,
                    0
                )
            );
        }

        // add the text
        this.title = this.add
            .bitmapText(
                this.currentNineSlice.getCenter().x - buffer / 4,
                buffer / 2 + 4,
                "dogica",
                "Interactive Resume",
                10
            )
            .setCenterAlign()
            .setOrigin(0.5, 0);
        this.text = this.add.bitmapText(
            buffer / 2,
            buffer + 12,
            "dogica",
            "Stuff about me!",
            8
        );
        //this.setText("Phaser Resume", ["Created by George Meisinger", "", "Made with Phaser 3", "", "The Final Fantasy Prelude theme was", "programmed in Tone.js"]);
        this.container.add([this.title, this.text]);

        this.container.setVisible(false);
        // listeners
        eventsCenter.on("toggle-ui", this.toggleUI, this);
        eventsCenter.on("set-text", this.setText, this);
        //eventsCenter.on("show-ui", this.display, this);
        //eventsCenter.on("hide-ui", this.hide, this);
    }

    setTitle(text) {
        this.title.setText(text);
    }

    setText(nineSlice, title, text) {
        this.currentNineSlice.setVisible(false);
        this.currentNineSlice = this.nineSlices[nineSlice];

        if (nineSlice === 'tv') {
            this.text.tint = 0x33984b;
            this.title.tint = 0x33984b;
        } else {
            this.text.tint = 0x000000;
            this.title.tint = 0x000000;
        }

        this.currentNineSlice.setVisible(true);

        this.title.setText(title);
        this.text.setText(text);
    }

    showUI(visible) {
        this.container.setVisible(visible);
    }

    //display(): void {
    //    let newTween: Tweens.Tween;
    //    for (let i = 1; i <= this.rects.length; i++) {
    //        newTween = this.tweens.add({
    //            targets: this.rects[i],
    //            x: this.container.x / i,
    //            width: this.nineSlice.width / i,
    //            height: this.nineSlice.height / i,
    //            duration: 300,
    //            ease: "linear",
    //            repeat: 0,
    //            yoyo: false
    //        });
    //    }
    //    newTween.setCallback("onComplete", this.showUI, [true]);
    //}

    //hide(): void {
    //    let newTween: Tweens.Tween;
    //    for (let i = 1; i <= this.rects.length; i++) {
    //        newTween = this.tweens.add({
    //            targets: this.rects[i],
    //            x: this.container.x - this.game.scale.width / 2,
    //            width: 0,
    //            height: 0,
    //            duration: 300,
    //            ease: "linear",
    //            repeat: 0,
    //            yoyo: false
    //        });
    //    }
    //    newTween.setCallback("onComplete", this.showUI, [true]);
    //}

    toggleUI() {
        this.container.setVisible(!this.container.visible);
    }
}
