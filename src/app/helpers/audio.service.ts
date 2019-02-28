import { Injectable } from '@angular/core';
import { SoundType } from '../types/sound.type';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  sound: HTMLAudioElement;

  play(title: SoundType){
    this.sound.src = `/assets/sounds/${title}.mp3`;
    this.sound.load();
    this.sound.play();
  }

  constructor() {
    this.sound = new Audio();
  }
}
