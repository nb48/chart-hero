
export interface ChartView {
    zeroPosition: number;
    beats: ChartViewBeat[];
    notes: ChartViewNote[];
}

export interface ChartViewBeat {
    y: number;
}

export type ChartViewNote =
    ChartViewNoteOpen | ChartViewNoteGHL;

export enum ChartViewNoteType {
    Open,
    GHL,
}

export interface ChartViewNoteOpen {
    type: ChartViewNoteType.Open;
    y: number;
}

export interface ChartViewNoteGHL {
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

export const defaultChartView = (): ChartView => {
    return {
        zeroPosition: 87.5,
        beats: [{
            y: 67.5,
        }, {
            y: 47.5,
        }, {
            y: 27.5,
        }, {
            y: 7.5,
        }],
        notes: [{
            type: ChartViewNoteType.GHL,
            x: 25,
            y: 67.5,
            color: ChartViewNoteGHLColor.Black,
        }, {
            type: ChartViewNoteType.GHL,
            x: 50,
            y: 47.5,
            color: ChartViewNoteGHLColor.White,
        }, {
            type: ChartViewNoteType.GHL,
            x: 75,
            y: 27.5,
            color: ChartViewNoteGHLColor.Chord,
        }],
    };
};
