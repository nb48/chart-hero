import { Component, OnInit } from '@angular/core';

import { ChartLoaderService } from './../chart-loader/chart-loader.service';

@Component({
  selector: 'app-chart-upload',
  templateUrl: './chart-upload.component.html',
  styleUrls: ['./chart-upload.component.css']
})
export class ChartUploadComponent {

  result: string = '';
  fileName: string;

  constructor(private chartLoader: ChartLoaderService) {
  }

  upload(file: File) {
    this.fileName = file.name;
    this.result = 'Success!';
  }

}
