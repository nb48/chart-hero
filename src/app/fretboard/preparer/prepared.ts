import { ModelTrackEventType } from '../../model/model';

export interface Prepared {
    beats: PreparedBeat[];
    notes: PreparedNote[];
    events: PreparedEvent[];
    eventLinks: PreparedEventLink[];
}

export interface PreparedBeat {
    id: number;
    time: number;
}

export interface PreparedNote {
    id: number;
    time: number;
    length: number;
    hopo: boolean;
    tap: boolean;
    open: boolean;
    guitarLane1: PreparedNoteGuitarColor;
    guitarLane2: PreparedNoteGuitarColor;
    guitarLane3: PreparedNoteGuitarColor;
    guitarLane4: PreparedNoteGuitarColor;
    guitarLane5: PreparedNoteGuitarColor;
    ghlLane1: PreparedNoteGHLColor;
    ghlLane2: PreparedNoteGHLColor;
    ghlLane3: PreparedNoteGHLColor;
}

export enum PreparedNoteGuitarColor {
   None,
   Green,
   Red,
   Yellow,
   Blue,
   Orange,
}

export enum PreparedNoteGHLColor {
    None,
    Black,
    White,
    Chord,
}

export interface PreparedEvent {
    id: number;
    time: number;
    type: ModelTrackEventType;
    word?: string;
}

export interface PreparedEventLink {
    id: number;
    startTime: number;
    endTime: number;
    type: ModelTrackEventType;
}
