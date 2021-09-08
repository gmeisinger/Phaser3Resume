import Phaser from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

export default {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#33A5E7',
    scale: {
        width: 1280,
        height: 720,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        roundPixels: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 120,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true
    },
    //audio: {
    //    disableWebAudio: true
    //},
    plugins: {
        global: [ NineSlicePlugin.DefaultCfg ],
    },
};
