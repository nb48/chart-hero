import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AudioStoreService {

  private _audioUploaded: boolean;
  private _file: File;
  private _audio: HTMLAudioElement;
  private _frameEvent: BehaviorSubject<number>;
  private _currentTime: number;
  private _frame: number;

  constructor() {
    this._audioUploaded = false;
    this._frameEvent = new BehaviorSubject<number>(0);
    this._currentTime = 0;
  }

  get audioUploaded(): boolean {
    return this._audioUploaded;
  }

  get name(): string {
    return this._file ? this._file.name : undefined;
  }

  set file(file: File) {
    this._file = file;
    this._audio = new Audio();
    this._audio.src = URL.createObjectURL(this._file);
    this._audio.load();
    this._audioUploaded = true;
  }

  get frameEvent(): Observable<number> {
    return this._frameEvent.asObservable();
  }

  get currentTime(): number {
    return this._audio.currentTime;
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
    this._frameEvent.next(0);
  }

  private frame(): void {
    if (this._audio.currentTime) {
      this._frameEvent.next(this._audio.currentTime);
    }
    if (this._audio.ended) {
      this.stop(0);
    }
  }
}
