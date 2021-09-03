import Phaser, { Loader } from "phaser";
import config from "./config.js";
import { LoadingScene, MainScene, MusicPlayer, UI } from "./scenes";

new Phaser.Game(
	Object.assign(config, {
		scene: [LoadingScene, MainScene, MusicPlayer, UI]
	})
);
