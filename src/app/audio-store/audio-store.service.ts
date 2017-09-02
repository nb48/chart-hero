import { Injectable } from '@angular/core';

@Injectable()
export class AudioStoreService {

  private _file: File;
  private _audio: HTMLAudioElement;

  constructor() {
  }

  get name(): string {
    return this._file ? this._file.name : undefined;
  }

  set file(file: File) {
    this._file = file;
  }

  play() {
    this._audio = new Audio();
    this._audio.src = URL.createObjectURL(this._file);
    this._audio.play();
  }

  stop() {
    this._audio.pause();
  }
}
