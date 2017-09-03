import { Injectable } from '@angular/core';

@Injectable()
export class ConfigStoreService {

  constructor() {
  }

  get bpm(): number {
    return 150;
  }

  get offset(): number {
    return 0.247;
  }
}
