import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import {
    Note,
    NoteGuitar,
    NoteGuitarColor,
    NoteGHL,
    NoteGHLColor,
    NoteOpen,
    NoteType,
} from './note';
import { SelectedNoteService } from '../../note/selected/selected.service';
import { TimeService } from '../../time/time.service';
import {
    Prepared,
    PreparedNote,
    PreparedNoteGuitarColor,
    PreparedNoteGHLColor,
} from '../preparer/prepared';
import { PreparerService } from '../preparer/preparer.service';
import { RendererService } from '../renderer/renderer.service';
import { SpeedService } from '../speed/speed.service';

@Injectable()
export class NoteService {

    private notesSubject: ReplaySubject<Note[]>;
    private prepared: Prepared;
    private time: number;
    private playing: boolean;
    private selectedId: number;

    constructor(
        private selectedNoteService: SelectedNoteService,
        private timeService: TimeService,
        private preparerService: PreparerService,
        private rendererService: RendererService,
        private speedService: SpeedService,
    ) {
        this.notesSubject = new ReplaySubject<Note[]>();
        Observable.combineLatest(
            this.preparerService.prepareds,
            this.rendererService.renders,
            this.selectedNoteService.selectedNotes,
            (prepared, time, selectedNote) => {
                this.prepared = prepared;
                this.time = time;
                this.playing = this.timeService.playing;
                this.selectedId = selectedNote ? selectedNote.id : null;
            },
        ).subscribe(() => {
            this.notesSubject.next(this.buildNotes());
        });
    }

    get notes(): Observable<Note[]> {
        return this.notesSubject.asObservable();
    }

    private buildNotes(): Note[] {
        return [].concat.apply([], this.prepared.notes
            .filter(n => this.speedService.timeInView(n.time, this.time))
            .filter(n => this.playing ? n.time >= this.time : true)
            .map((note): Note[] => {
                const y = this.speedService.calculateYPos(note.time, this.time);
                const selected = note.id === this.selectedId;
                if (note.open) {
                    const type = NoteType.Open;
                    return [{
                        type,
                        y,
                        selected,
                        id: note.id + 1,
                        time: note.time,
                    }] as NoteOpen[];
                } else {
                    return this.splitNote(note, y, selected);
                }
            }))
            .sort((a: Note, b: Note) => a.y - b.y);
    }

    private splitNote(note: PreparedNote, y: number, selected: boolean): Note[] {
        const notes: (NoteGuitar | NoteGHL)[] = [];
        const time = note.time;
        let type = NoteType.Guitar;
        if (note.guitarLane1 !== PreparedNoteGuitarColor.None) {
            const x = 13;
            const color = this.buildGuitarNoteColor(note.guitarLane1);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.guitarLane2 !== PreparedNoteGuitarColor.None) {
            const x = 31.5;
            const color = this.buildGuitarNoteColor(note.guitarLane2);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.guitarLane3 !== PreparedNoteGuitarColor.None) {
            const x = 50;
            const color = this.buildGuitarNoteColor(note.guitarLane3);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.guitarLane4 !== PreparedNoteGuitarColor.None) {
            const x = 68.5;
            const color = this.buildGuitarNoteColor(note.guitarLane4);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.guitarLane5 !== PreparedNoteGuitarColor.None) {
            const x = 87;
            const color = this.buildGuitarNoteColor(note.guitarLane5);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        type = NoteType.GHL;
        if (note.ghlLane1 !== PreparedNoteGHLColor.None) {
            const x = 25;
            const color = this.buildGHLNoteColor(note.ghlLane1);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.ghlLane2 !== PreparedNoteGHLColor.None) {
            const x = 50;
            const color = this.buildGHLNoteColor(note.ghlLane2);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        if (note.ghlLane3 !== PreparedNoteGHLColor.None) {
            const x = 75;
            const color = this.buildGHLNoteColor(note.ghlLane3);
            notes.push({ time, type, x, y, color, selected, id: note.id + notes.length + 1 });
        }
        return notes;
    }

    private buildGuitarNoteColor(color: PreparedNoteGuitarColor)
        : NoteGuitarColor {
        switch (color) {
        case PreparedNoteGuitarColor.Green:
            return NoteGuitarColor.Green;
        case PreparedNoteGuitarColor.Red:
            return NoteGuitarColor.Red;
        case PreparedNoteGuitarColor.Yellow:
            return NoteGuitarColor.Yellow;
        case PreparedNoteGuitarColor.Blue:
            return NoteGuitarColor.Blue;
        case PreparedNoteGuitarColor.Orange:
            return NoteGuitarColor.Orange;
        }
    }

    private buildGHLNoteColor(color: PreparedNoteGHLColor): NoteGHLColor {
        switch (color) {
        case PreparedNoteGHLColor.Black:
            return NoteGHLColor.Black;
        case PreparedNoteGHLColor.White:
            return NoteGHLColor.White;
        case PreparedNoteGHLColor.Chord:
            return NoteGHLColor.Chord;
        }
    }
}
