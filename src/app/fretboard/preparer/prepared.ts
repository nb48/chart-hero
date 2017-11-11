
export interface Prepared {
    beats: PreparedBeat[];
    notes: PreparedNote[];
}

export interface PreparedBeat {
    id: number;
    time: number;
}

export interface PreparedNote {
    id: number;
    time: number;
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