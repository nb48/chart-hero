import { Component, Input } from '@angular/core';

import { NoteColor } from '../../chart-store/chart-store.service';

export interface ViewNote {
  id: number;
  x: number;
  y: number;
  fill: string;
  open: boolean;
}

interface NonOpenNote {
  x: number;
  fill: string;
}

const singleNote = (id: number, y: number, color: NoteColor): NonOpenNote => {
  let x = undefined;
  let fill = undefined;
  switch (color) {
    case NoteColor.Green:
      x = 10;
      fill = 'green';
      break;
    case NoteColor.Red:
      x = 30;
      fill = 'red';
      break;
    case NoteColor.Yellow:
      x = 50;
      fill = 'yellow';
      break;
    case NoteColor.Blue:
      x = 70;
      fill = 'blue';
      break;
    case NoteColor.Orange:
      x = 90;
      fill = 'orange';
      break;
  }
  return {
    x: x,
    fill: fill
  }
}

export const buildNote = (id: number, y: number, colors: NoteColor[]): ViewNote[] => {
  if (colors.length === 0) {
    return [{
      id: id,
      x: undefined,
      y: y,
      fill: undefined,
      open: true
    }]
  }
  return colors
    .map((color) => singleNote(id, y, color))
    .map((note) => ({
      id: id,
      x: note.x,
      y: y,
      fill: note.fill,
      open: false
    }));
}

@Component({
  selector: '[app-view-note]',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent {
  @Input() note: ViewNote;
  @Input() selected: boolean = false;

  constructor() {
  }
}
