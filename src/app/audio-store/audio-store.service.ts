import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class AudioStoreService {

  private _file: File;
  private _audio: HTMLAudioElement;
  private _currentTime: ReplaySubject<number>;
  private _frame: number;

  constructor() {
    this._currentTime = new ReplaySubject<number>();
  }

  get name(): string {
    return this._file ? this._file.name : undefined;
  }

  set file(file: File) {
    this._file = file;
    this._audio = new Audio();
    this._audio.src = URL.createObjectURL(this._file);
    this._audio.load();
  }

  get currentTime(): Observable<number> {
    return this._currentTime.asObservable();
  }

  get duration(): number {
    return this._audio.duration;
  }

  start(): void {
    this._audio.play();
    this._frame = window.setInterval(() => this.frame(), 10);
  }

  stop(): void {
    this._audio.pause();
    window.clearInterval(this._frame);
    this._frame = undefined;
  }

  private frame(): void {
    if (this._audio.currentTime) {
      this._currentTime.next(this._audio.currentTime);
    }
    if (this._audio.ended) {
      this.stop();
    }
  }
}
