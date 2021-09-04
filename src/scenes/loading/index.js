import Phaser, { GameObjects } from "phaser";
import playerSprites from '../../assets/sprites/player.png';
import macNineSlice from '../../assets/sprites/mac9slice.png';
import tvNineSlice from '../../assets/sprites/tv9slice.png';
import paperNineSlice from '../../assets/sprites/paper9slice.png';
import diplomaNineSlice from '../../assets/sprites/diploma9slice.png';
import musicNineSlice from '../../assets/sprites/music9slice.png';
import computerSprite from '../../assets/sprites/computer.png';
import diplomaSprite from '../../assets/sprites/diploma.png';
import instrumentsSprite from '../../assets/sprites/instruments.png';
import tvSprite from '../../assets/sprites/tv.png';
import arrowSprite from '../../assets/sprites/arrow.png';
import tiles from '../../assets/tilemaps/tiles/simple_town.png';
import tilemap from '../../assets/tilemaps/json/house.json';
import fontPNG from '../../assets/fonts/dogica_white.png';
import fontXML from '../../assets/fonts/dogica_white.xml';

export class LoadingScene extends Phaser.Scene {
	constructor() {
		super("loading-scene");
	}

	preload() {
		//this.load.baseURL = "assets/";

		this.load.spritesheet("player", playerSprites, {
			frameWidth: 32,
			frameHeight: 35
		});

		//tilemap
		this.load.image({
			key: 'tiles',
			url: tiles,
		});
		this.load.tilemapTiledJSON('house', tilemap);

		//9 slice images
		this.load.image({
			key: 'mac9slice',
			url: macNineSlice,
		});
		this.load.image({
			key: 'tv9slice',
			url: tvNineSlice,
		});
		this.load.image({
			key: 'paper9slice',
			url: paperNineSlice,
		});
		this.load.image({
			key: 'diploma9slice',
			url: diplomaNineSlice,
		});
		this.load.image({
			key: 'music9slice',
			url: musicNineSlice,
		});

		// sprites
		this.load.image({
			key: 'computer',
			url: computerSprite,
		});
		this.load.image({
			key: 'diploma',
			url: diplomaSprite,
		});
		this.load.image({
			key: 'instruments',
			url: instrumentsSprite,
		});
		this.load.image({
			key: 'tv',
			url: tvSprite,
		});
		this.load.image({
			key: 'arrow',
			url: arrowSprite,
		});


		//fonts
		this.load.bitmapFont('dogica', fontPNG, fontXML);
	}

	create() {
		console.log("Loading scene was created");

		this.scene.start("main-scene");
	}
}
