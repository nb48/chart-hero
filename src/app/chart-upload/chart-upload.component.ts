import { Component, OnInit } from '@angular/core';

import { ChartLoaderService } from './../chart-loader/chart-loader.service';

@Component({
  selector: 'app-chart-upload',
  templateUrl: './chart-upload.component.html',
  styleUrls: ['./chart-upload.component.css']
})
export class ChartUploadComponent {

  constructor(public chartLoader: ChartLoaderService) {
  }
}
