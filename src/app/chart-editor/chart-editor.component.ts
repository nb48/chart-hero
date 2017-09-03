import { Component, ElementRef, ViewChild } from '@angular/core';

import { ChartStoreService, Chart, ChartNote, NoteColor } from '../chart-store/chart-store.service';
import { ConfigStoreService } from '../config-store/config-store.service';
import { ViewBeat } from '../view-chart/view-beat/view-beat.component';
import { ViewNote, buildNote } from '../view-chart/view-note/view-note.component';
import { beatTimeGenerator } from '../util/util';

@Component({
  selector: 'app-chart-editor',
  templateUrl: './chart-editor.component.html',
  styleUrls: ['./chart-editor.component.css']
})
export class ChartEditorComponent {
  @ViewChild('timeInput') timeInput: ElementRef;

  beats: ViewBeat[];
  notes: ViewNote[];
  totalHeight: number;
  currentNote: ChartNote;

  constructor(private chartStore: ChartStoreService, private configStore: ConfigStoreService) {
    this.selectNote(this.chartStore.lastNote().id);
  }

  keyEvent(key: KeyboardEvent) {
    if (key.target === this.timeInput.nativeElement) {
      return;
    }
    switch (key.key) {
      case 'ArrowUp':
        this.selectNote(this.chartStore.nextNote(this.currentNote.id).id);
        break;
      case 'ArrowDown':
        this.selectNote(this.chartStore.previousNote(this.currentNote.id).id);
        break;
      case 'ArrowLeft':
        this.rotateLeft();
        break;
      case 'ArrowRight':
        this.rotateRight();
        break;
      case '1':
        this.flipColor(NoteColor.Green);
        break;
      case '2':
        this.flipColor(NoteColor.Red);
        break;
      case '3':
        this.flipColor(NoteColor.Yellow);
        break;
      case '4':
        this.flipColor(NoteColor.Blue);
        break;
      case '5':
        this.flipColor(NoteColor.Orange);
        break;
    }
  }

  selectNote(id: number) {
    this.currentNote = this.chartStore.chart.notes.get(id);
    this.buildView();
  }

  flipColor(color: NoteColor) {
    this.chartStore.flipColor(this.currentNote.id, color);
    this.buildView();
  }

  rotateLeft() {
    this.chartStore.rotateLeft(this.currentNote.id);
    this.buildView();
  }

  rotateRight() {
    this.chartStore.rotateRight(this.currentNote.id);
    this.buildView();
  }

  deleteNote() {
    const noteIdToDelete = this.currentNote.id;
    this.selectNote(this.chartStore.previousNote(this.currentNote.id).id);
    if (this.currentNote.id === noteIdToDelete) {
      this.selectNote(this.chartStore.nextNote(this.currentNote.id).id);
    }
    this.chartStore.deleteNote(noteIdToDelete);
    this.buildView();
  }

  buildView(): void {
    let latest = this.chartStore.lastNote().time;
    let increment = 60 / this.configStore.bpm;

    const beatTimes = Array.from(beatTimeGenerator(this.configStore.offset, 0, latest + increment, increment));
    this.beats = beatTimes.map((time, index) => ({
      position: 100 / (beatTimes.length + 1) * (index + 1)
    }))
    this.totalHeight = this.beats.length * 20;

    this.notes = [].concat(...Array.from(this.chartStore.chart.notes.values())
      .map((note) => buildNote(note.id, (note.time + increment) / (beatTimes[beatTimes.length - 1] + increment) * 100, note.color)));
    this.notes.push(...buildNote(this.currentNote.id, (this.currentNote.time + increment) / (beatTimes[beatTimes.length - 1] + increment) * 100, this.currentNote.color));
  }
}
