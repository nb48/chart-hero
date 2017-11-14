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
import { SelectorService } from '../../controller/selector/selector.service';
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
        private selectorService: SelectorService,
        private timeService: TimeService,
        private preparerService: PreparerService,
        private rendererService: RendererService,
        private speedService: SpeedService,
    ) {
        this.notesSubject = new ReplaySubject<Note[]>();
        Observable.combineLatest(
            this.preparerService.prepareds,
            this.rendererService.renders,
            this.selectorService.selectedNotes,
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
            .filter(n => this.speedService.timeInView(n.time, this.time) ||
                this.speedService.timeInView(n.time + n.length, this.time))
            .filter(n => this.playing ? n.time >= this.time : true)
            .map((note): Note[] => {
                const y = this.speedService.calculateYPos(note.time, this.time);
                const selected = note.id === this.selectedId;
                const sustain = note.length > 0;
                const endY = this.speedService.calculateYPos(note.time + note.length, this.time);
                if (note.open) {
                    const type = NoteType.Open;
                    return [{
                        type,
                        y,
                        selected,
                        sustain,
                        endY,
                        id: note.id + 1,
                        time: note.time,
                    }] as NoteOpen[];
                } else {
                    return this.splitNote(note, y, selected, sustain, endY);
                }
            }))
            .sort((a: Note, b: Note) => a.y - b.y);
    }
    
    private splitNote(
        note: PreparedNote,
        y: number,
        selected: boolean,
        sustain: boolean,
        endY: number,
    ): Note[] {
        const notes: (NoteGuitar | NoteGHL)[] = [];
        const time = note.time;
        const pushGuitar = (x: number, color: NoteGuitarColor) => {
            const type = NoteType.Guitar;
            const id = note.id + notes.length + 1;
            notes.push({ id, time, type, selected, x, y, color, sustain, endY });
        };
        if (note.guitarLane1 !== PreparedNoteGuitarColor.None) {
            pushGuitar(30.4, this.buildGuitarNoteColor(note.guitarLane1));
        }
        if (note.guitarLane2 !== PreparedNoteGuitarColor.None) {
            pushGuitar(45.2, this.buildGuitarNoteColor(note.guitarLane2));
        }
        if (note.guitarLane3 !== PreparedNoteGuitarColor.None) {
            pushGuitar(60, this.buildGuitarNoteColor(note.guitarLane3));
        }
        if (note.guitarLane4 !== PreparedNoteGuitarColor.None) {
            pushGuitar(74.8, this.buildGuitarNoteColor(note.guitarLane4));
        }
        if (note.guitarLane5 !== PreparedNoteGuitarColor.None) {
            pushGuitar(89.6, this.buildGuitarNoteColor(note.guitarLane5));
        }
        const pushGHL = (x: number, color: NoteGHLColor) => {
            const type = NoteType.GHL;
            const id = note.id + notes.length + 1;
            notes.push({ id, time, type, selected, x, y, color, sustain, endY });
        };
        if (note.ghlLane1 !== PreparedNoteGHLColor.None) {
            pushGHL(40, this.buildGHLNoteColor(note.ghlLane1));
        }
        if (note.ghlLane2 !== PreparedNoteGHLColor.None) {
            pushGHL(60, this.buildGHLNoteColor(note.ghlLane2));
        }
        if (note.ghlLane3 !== PreparedNoteGHLColor.None) {
            pushGHL(80, this.buildGHLNoteColor(note.ghlLane3));
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
