
export interface ChartStoreView {
    beats: ChartStoreViewBeat[];
    notes: ChartStoreViewNote[];
}

export interface ChartStoreViewBeat {
    id: number;
    time: number;
}

export interface ChartStoreViewNote {
    id: number;
    time: number;
    open: boolean;
    ghlLane1: ChartStoreViewNoteGHLColor;
    ghlLane2: ChartStoreViewNoteGHLColor;
    ghlLane3: ChartStoreViewNoteGHLColor;
}

export enum ChartStoreViewNoteGHLColor {
    None,
    Black,
    White,
    Chord,
}
