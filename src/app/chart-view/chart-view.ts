
export interface ChartView {
    zeroPosition: number;
    beats: ChartViewBeat[];
    notes: ChartViewNote[];
}

export interface ChartViewBeat {
    id: number;
    time: number;
    y: number;
}

export type ChartViewNote =
    ChartViewNoteOpen |
    ChartViewNoteGuitar |
    ChartViewNoteGHL;

export enum ChartViewNoteType {
    Open,
    Guitar,
    GHL,
}

export interface ChartViewNoteOpen {
    id: number;
    time: number;
    type: ChartViewNoteType.Open;
    selected: boolean;
    y: number;
}

export interface ChartViewNoteGuitar {
    id: number;
    time: number;
    type: ChartViewNoteType.Guitar;
    selected: boolean;
    x: number;
    y: number;
    color: ChartViewNoteGuitarColor;    
}

export enum ChartViewNoteGuitarColor {
    Green,
    Red,
    Yellow,
    Blue,
    Orange,
}

export interface ChartViewNoteGHL {
    id: number;
    time: number;
    type: ChartViewNoteType.GHL;
    selected: boolean;
    x: number;
    y: number;
    color: ChartViewNoteGHLColor;
}

export enum ChartViewNoteGHLColor {
    Black,
    White,
    Chord,
}
