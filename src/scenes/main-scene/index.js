import Phaser, { GameObjects, Tilemaps } from 'phaser';
import { Player } from '../../classes/player.js';
import { Interactable } from '../../classes/interactable.js';
import eventsCenter from '../../classes/EventsCenter.js';

export class MainScene extends Phaser.Scene {

    player;
    map;
    tileset;
    wallLayer;
    decoLayer;
    groundLayer;

    zones;
    uiShowing;

    constructor() {
        super('main-scene');

        this.zones = [];
        this.uiShowing = false;
    }

    initMap() {
        this.map = this.make.tilemap({ key: 'house', tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage('SimpleTown', 'tiles');
        this.groundLayer = this.map.createLayer('ground', this.tileset, 0, 0);
        this.wallLayer = this.map.createLayer('walls', this.tileset, 0, 0);
        this.decoLayer = this.map.createLayer('deco', this.tileset, 0, 0);

        this.wallLayer.setCollisionByProperty({ collides: true });
        this.decoLayer.setCollisionByProperty({ collides: true });

        this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);

        //this.showDebugWalls();
    }

    showDebugWalls() {
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.wallLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        });
    }

     initCamera() {
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.setZoom(4);

        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);        
    }

    create() {
        console.log('main scene was created');

        // to run the music
        this.scene.run('music-player');

        this.scene.run('ui');

        this.initMap();
        
        
        const devZone = new Interactable(this, 176, 128, 'computer', -16, -32, 32, 'mac', 'Software Development', [".NET - 3 years\n", "Python - 5 years\n", "    - Back-end web development", "      with Flask\n", "    - Web scraping\n", "    - Machine learning, chatbot", "      built with RASA\n", "HTML/Javascript/CSS - 5 years\n", "     - Node.js, React, Bootstrap\n", "Proficient in C, C++ anda Java"]);
        const musicZone = new Interactable(this, 320, 144, 'instruments', 0, -16, 48, 'music', '\nHobbies', ["\nMusic\n", "    - Blues\n", "    - Rock\n", "    - EDM\n", "Playing and making video games\n", "    - Retro/Arcade\n", "    - RPGs\n", "Playing guitar and ukulele\n", "Board games\n", "Anime and manga\n", "Hanging out with friends!"]);
        const educationZone = new Interactable(this, 240, 308, 'diploma', 8, -24, 48, 'diploma', 'Education And Work Experience', ["Graduated from University of Pittsburgh\n", "    - December 2020\n", "    - BS in Computer Science\n", "Software Development Intern at Plazsoft\n", "    - .NET desktop and web development\n", "    - 2020 - 2021\n", "i3 Corps\n", "    - Unity Developer\n", "    - 2021 to present"]);
        const gameZone = new Interactable(this, 448, 224, 'tv', 0, -32, 64, 'tv', 'Game Development', ["Several games completed in Unity and ", "Godot\n", "    - Game Jams\n", "    - Personal projects\n", "2d game engine written in C++ using ", "SDL2 library\n", "This resume was created using the ", "Phaser 3 Javascript framework\n", "Experience created pixel-art assets", "and sound effects"]);
        const aboutZone = new Interactable(this, 640, 224, 'arrow', 0, -32, 48, 'paper', 'About This Project', ["Created by George Meisinger", "", "Made with Phaser 3", "", "The Final Fantasy Prelude theme was", "programmed using Tone.js\n", "    - Written by Nobuo Uematsu"]);

        //devZone.renderDebug();
        //musicZone.renderDebug();
        //educationZone.renderDebug();
        //gameZone.renderDebug();
        //aboutZone.renderDebug();

        this.zones = [devZone, musicZone, educationZone, gameZone, aboutZone];

        this.player = new Player(this, 600, 300);

        this.physics.add.collider(this.player, this.wallLayer);
        this.physics.add.collider(this.player, this.decoLayer);

        this.initCamera();
    }

    update() {
        this.player.update();
        let overlap = false;
        this.zones.forEach(zone => {
            if (zone.isColliding(this.player.getBounds())) {
                overlap = true;
                eventsCenter.emit('set-text', zone.nineSlice, zone.title, zone.text);
            }
        });
        if (overlap && !this.uiShowing) {
            eventsCenter.emit('toggle-ui', true);
            this.uiShowing = true;
        } else if(!overlap && this.uiShowing) {
            eventsCenter.emit('toggle-ui', false);
            this.uiShowing = false;
        }
    }
}