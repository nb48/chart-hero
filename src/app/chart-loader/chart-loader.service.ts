import { Injectable } from '@angular/core';

import { ChartStoreService } from '../chart-store/chart-store.service';

@Injectable()
export class ChartLoaderService {

  private _fileName: string;
  private _result: string;

  constructor(private chartStore: ChartStoreService) {
    this._fileName = '';
    this._result = '';
  }

  get fileName(): string {
    return this._fileName;
  }

  get result(): string {
    return this._result;
  }

  loadChart(file: File) {
    this._fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      this._result = 'Success!';
    }
    reader.readAsText(file);
  }
}
