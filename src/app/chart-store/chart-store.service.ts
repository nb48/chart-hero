import { Injectable } from '@angular/core';

export interface Chart {
  notes: Map<number, ChartNote>;
}

export enum NoteColor {
  Green,
  Red,
  Yellow,
  Blue,
  Orange
}

export interface ChartNote {
  id: number;
  time: number;
  color: NoteColor[];
}

const NEW_NOTES_PER_BEAT = 4;

@Injectable()
export class ChartStoreService {

  private _chart: Chart;
  private _bpm: number;
  private _offset: number;
  private _nextId: number;

  constructor() {
    this._chart = {
      notes: new Map<number, ChartNote>()
    }
    this._chart.notes.set(0, {
      id: 0,
      time: 0,
      color: [NoteColor.Green]
    });
    this._bpm = 60;
    this._offset = 0;
    this._nextId = 1;
  }

  get chart(): Chart {
    return this._chart;
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

  newChart(times: number[]) {
    this._chart = {
      notes: new Map<number, ChartNote>()
    }
    times.forEach((time, index) => {
      this._chart.notes.set(index, {
        id: index,
        time: time,
        color: [NoteColor.Green]
      });
      this._nextId = index
    });
    this._nextId += 1;
  }

  addNote(currentNote: ChartNote): ChartNote {
    let newId = this._nextId;
    this._nextId += 1;
    this.chart.notes.set(newId, {
      id: newId,
      time: this.lastNote().time + (60 / (this._bpm * NEW_NOTES_PER_BEAT)),
      color: [NoteColor.Green]
    });
    return this._chart.notes.get(newId);
  }

  lastNote(): ChartNote {
    const sortedNotes = this.sortedNotes();
    return sortedNotes[sortedNotes.length - 1];
  }

  previousNote(id: number): ChartNote {
    const sortedNotes = this.sortedNotes();
    const currentNoteIndex = sortedNotes.findIndex((note) => note.id === id);
    if (currentNoteIndex === 0) {
      return sortedNotes[currentNoteIndex];
    }
    return sortedNotes[currentNoteIndex - 1];
  }

  nextNote(id: number): ChartNote {
    const sortedNotes = this.sortedNotes();
    const currentNoteIndex = sortedNotes.findIndex((note) => note.id === id);
    if (currentNoteIndex === sortedNotes.length - 1) {
      return sortedNotes[currentNoteIndex];
    }
    return sortedNotes[currentNoteIndex + 1];
  }

  flipColor(id: number, color: NoteColor): void {
    const note = this._chart.notes.get(id);
    const colorIndex = note.color.indexOf(color);
    if (colorIndex !== -1) {
      note.color.splice(colorIndex, 1);
    } else {
      note.color.push(color);
    }
  }

  rotateLeft(id: number): void {
    const note = this._chart.notes.get(id);
    note.color = note.color.map((color) => {
      switch (color) {
        case NoteColor.Green:
          return NoteColor.Orange;
        case NoteColor.Red:
          return NoteColor.Green;
        case NoteColor.Yellow:
          return NoteColor.Red;
        case NoteColor.Blue:
          return NoteColor.Yellow;
        case NoteColor.Orange:
          return NoteColor.Blue;
      }
    });
  }

  rotateRight(id: number): void {
    const note = this._chart.notes.get(id);
    note.color = note.color.map((color) => {
      switch (color) {
        case NoteColor.Green:
          return NoteColor.Red;
        case NoteColor.Red:
          return NoteColor.Yellow;
        case NoteColor.Yellow:
          return NoteColor.Blue;
        case NoteColor.Blue:
          return NoteColor.Orange;
        case NoteColor.Orange:
          return NoteColor.Green;
      }
    });
  }

  deleteNote(id: number): void {
    if (this._chart.notes.size === 1) {
      return;
    }
    this._chart.notes.delete(id);
  }

  private sortedNotes(): ChartNote[] {
    return Array.from(this._chart.notes.values())
      .sort((a, b) => a.time - b.time);
  }
}
