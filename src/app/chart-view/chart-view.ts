
export interface ChartView {
    zeroPosition: number;
    duration: number;
    currentTime: number;
    currentIncrement: number;
    beats: ChartViewBeat[];
    notes: ChartViewNote[];
}

export interface ChartViewBeat {
    id: number;
    y: number;
}

export type ChartViewNote =
    ChartViewNoteOpen | ChartViewNoteGHL;

export enum ChartViewNoteType {
    Open,
    GHL,
}

export interface ChartViewNoteOpen {
    id: number;
    type: ChartViewNoteType.Open;
    y: number;
}

export interface ChartViewNoteGHL {
    id: number;
    type: ChartViewNoteType.GHL;
    x: number;
    y: number;
    color: ChartViewNoteGHLColor;
}

export enum ChartViewNoteGHLColor {
    Black,
    White,
    Chord,
}
