import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class AudioStoreService {

  private _file: File;
  private _audio: HTMLAudioElement;
  private _currentTimeSubject: ReplaySubject<number>;
  private _currentTime: number;
  private _frame: number;

  constructor() {
    this._currentTimeSubject = new ReplaySubject<number>();
    this._currentTime = 0;
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
    return this._currentTimeSubject.asObservable();
  }

  get duration(): number {
    return this._audio.duration;
  }

  play(): void {
    if (this._audio.paused) {
      this._audio.play();
      (this._audio as any).fastSeek(this._currentTime);
      this._frame = window.setInterval(() => this.frame(), 16);
    } else {
      this.stop(this._audio.currentTime);
    }
  }

  stop(currentTime: number): void {
    this._audio.pause();
    this._currentTime = currentTime;
    window.clearInterval(this._frame);
    this._frame = undefined;
  }

  private frame(): void {
    if (this._audio.currentTime) {
      this._currentTimeSubject.next(this._audio.currentTime);
    }
    if (this._audio.ended) {
      this.stop(0);
    }
  }
}
