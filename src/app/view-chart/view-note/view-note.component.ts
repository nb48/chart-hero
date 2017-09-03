import { Component, Input } from '@angular/core';

export interface ViewNote {
  x: number;
  y: number;
  color: string;
}

export const buildNote = (color: string, y: number): ViewNote => {
  let x = undefined;
  switch (color) {
    case 'green':
      x = 10;
      break;
    case 'red':
      x = 30;
      break;
    case 'yellow':
      x = 50;
      break;
    case 'blue':
      x = 70;
      break;
    case 'orange':
      x = 90;
      break;
  }
  return {
    x: x,
    y: y,
    color: color
  }
};

@Component({
  selector: '[app-view-note]',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent {
  @Input() note: ViewNote;

  constructor() {
  }
}
