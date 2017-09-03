import { Injectable } from '@angular/core';

@Injectable()
export class ConfigStoreService {

  _bpm: number;
  _offset: number;

  constructor() {
    this._bpm = 150;
    this._offset = 0.247;
  }

  get bpm(): number {
    return this._bpm;
  }

  set bpm(bpm: number) {
    this._bpm = bpm;
  }

  get offset(): number {
    return this._offset;
  }

  set offset(offset: number) {
    this._offset = offset;
  }
}
