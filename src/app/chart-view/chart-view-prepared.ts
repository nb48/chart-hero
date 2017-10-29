
export interface ChartViewPrepared {
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
    guitarLane1: ChartViewPreparedNoteGuitarColor;
    guitarLane2: ChartViewPreparedNoteGuitarColor;
    guitarLane3: ChartViewPreparedNoteGuitarColor;
    guitarLane4: ChartViewPreparedNoteGuitarColor;
    guitarLane5: ChartViewPreparedNoteGuitarColor;
    ghlLane1: ChartViewPreparedNoteGHLColor;
    ghlLane2: ChartViewPreparedNoteGHLColor;
    ghlLane3: ChartViewPreparedNoteGHLColor;
}

export enum ChartViewPreparedNoteGuitarColor {
   None,
   Green,
   Red,
   Yellow,
   Blue,
   Orange, 
}

export enum ChartViewPreparedNoteGHLColor {
    None,
    Black,
    White,
    Chord,
}
