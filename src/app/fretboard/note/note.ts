
export type Note =
    NoteOpen |
    NoteGuitar |
    NoteGHL;

export enum NoteType {
    Open,
    Guitar,
    GHL,
}

export interface NoteOpen {
    id: number;
    time: number;
    type: NoteType.Open;
    selected: boolean;
    y: number;
}

export interface NoteGuitar {
    id: number;
    time: number;
    type: NoteType.Guitar;
    selected: boolean;
    x: number;
    y: number;
    color: NoteGuitarColor;
}

export enum NoteGuitarColor {
    Green,
    Red,
    Yellow,
    Blue,
    Orange,
}

export interface NoteGHL {
    id: number;
    time: number;
    type: NoteType.GHL;
    selected: boolean;
    x: number;
    y: number;
    color: NoteGHLColor;
}

export enum NoteGHLColor {
    Black,
    White,
    Chord,
}
