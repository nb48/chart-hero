import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  audioFile: any;

  constructor() { }

  ngOnInit() {
  }

  newAudioFile(file: any) {
    this.audioFile = file.target.files[0];
  }
}
