import Phaser from 'phaser';
import * as Tone from "tone";

// Plays the FF crystal theme
export class MusicPlayer extends Phaser.Scene {
    // scales to play with
    cMaj4 = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    cMaj5 = ["C5", "D5", "E5", "F5", "G5", "A5", "B5"];

    // crystal theme arpeggios
    bFlat = ["Bb2", "C3", "D3", "F3", "Bb3", "C4", "D4", "F4", "Bb4", "C5", "D5", "F5", "Bb5", "C6", "D6", "F6", "Bb6"];
    gMin = ["G2", "A2", "Bb2", "D3", "G3", "A3", "Bb3", "D4", "G4", "A4", "Bb4", "D5", "G5", "A5", "Bb5", "D6", "G6"];
    eFlat = ["G2", "Bb2", "Eb3", "F3", "G3", "Bb3", "Eb4", "F4", "G4", "Bb4", "Eb5", "F5", "G5", "Bb5", "Eb6", "F6", "G6"];
    fMaj = ["A2", "C3", "F3", "G3", "A3", "C4", "F4", "G4", "A4", "C5", "F5", "G5", "A5", "C6", "F6", "G6", "A6"];
    gFlat = ["Gb2", "Bb2", "Db3", "F3", "Gb3", "Bb3", "Db4", "F4", "Gb4", "Bb4", "Db5", "F5", "Gb5", "Bb5", "Db6", "F6", "Gb6"];
    aFlat = ["Ab2", "C3", "Eb3", "G3", "Ab3", "C4", "Eb4", "G4", "Ab4", "C5", "Eb5", "G5", "Ab5", "C6", "Eb6", "G6", "Ab6"];
    // crystal theme logic
    crystalIndex = 0;
    crystalChords = [this.bFlat, this.gMin, this.bFlat, this.gMin, this.eFlat, this.fMaj, this.gFlat, this.aFlat];
    crystalChordIndex = 0;
    crystalAscending = true;    

    crystalLoop;

    constructor() {
        super('music-player');
    }


    getRandomNote(scale) {
        return scale[Math.floor(Math.random() * scale.length)];
    }

    // Arpeggiates a given note sequence of length n by playing
    // the first n-1 notes then descending through the last n-1 notes
    getCrystalNote() {
        // moving to next chord
        if (this.crystalIndex === 1 && !this.crystalAscending) {
            this.crystalChordIndex = (this.crystalChordIndex + 1) % this.crystalChords.length;
            this.crystalAscending = true;
            this.crystalIndex = -1;
        }
        // check for descending
        if (this.crystalIndex === this.crystalChords[this.crystalChordIndex].length-1) {
            this.crystalAscending = false;
        }
        // move to next pitch
        if (this.crystalAscending) {
            this.crystalIndex++;
        } else {
            this.crystalIndex--;
        }
        // return the note
        //console.log(this.crystalChords[this.crystalChordIndex][this.crystalIndex]);
        return this.crystalChords[this.crystalChordIndex][this.crystalIndex];
    }

    create() {
        console.log('music player scene was created');

        // final fantasy loop
        const crystalSynth = new Tone.AMSynth().toDestination();
        crystalSynth.volume.value = -10;

        //play the FF crystal theme
        this.crystalLoop = new Tone.Loop((time) => {
            crystalSynth.triggerAttackRelease(this.getCrystalNote(), "16n", time);
        }, "8n");

        Tone.Transport.bpm.value = 176;
        Tone.Transport.start();
        this.crystalLoop.start(0);
        

        // add event listeners here
    }

    update() {
        //this.synthLoop1.start(0);
        //this.synthLoop2.start("8n");
    }
}