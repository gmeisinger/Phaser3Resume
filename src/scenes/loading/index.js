import Phaser, { GameObjects } from "phaser";

export class LoadingScene extends Phaser.Scene {
	constructor() {
		super("loading-scene");
	}

	preload() {
		this.load.baseURL = "src/assets/";

		this.load.spritesheet("player", "sprites/player.png", {
			frameWidth: 32,
			frameHeight: 35
		});

		//tilemap
		this.load.image({
			key: 'tiles',
			url: 'tilemaps/tiles/simple_town.png',
		});
		this.load.tilemapTiledJSON('house', 'tilemaps/json/house.json');

		//9 slice images
		this.load.image({
			key: 'mac9slice',
			url: 'sprites/mac9slice.png',
		});

		// sprites
		this.load.image({
			key: 'computer',
			url: 'sprites/computer.png',
		});
		this.load.image({
			key: 'diploma',
			url: 'sprites/diploma.png',
		});
		this.load.image({
			key: 'instruments',
			url: 'sprites/instruments.png',
		});
		this.load.image({
			key: 'tv',
			url: 'sprites/tv.png',
		});
		this.load.image({
			key: 'arrow',
			url: 'sprites/arrow.png',
		});


		// fonts
		this.load.bitmapFont('dogica', 'fonts/dogica.png', 'fonts/dogica.xml');
	}

	create() {
		console.log("Loading scene was created");

		this.scene.start("main-scene");
	}
}
