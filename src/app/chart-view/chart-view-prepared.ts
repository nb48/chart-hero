
export interface ChartViewPrepared {
    duration: number;
    beats: ChartViewPreparedBeat[];
    notes: ChartViewPreparedNote[];
}

export interface ChartViewPreparedBeat {
    id: number;
    time: number;
}

export interface ChartViewPreparedNote {
    id: number;
    time: number;
    open: boolean;
    ghlLane1: ChartViewPreparedNoteGHLColor;
    ghlLane2: ChartViewPreparedNoteGHLColor;
    ghlLane3: ChartViewPreparedNoteGHLColor;
}

export enum ChartViewPreparedNoteGHLColor {
    None,
    Black,
    White,
    Chord,
}
