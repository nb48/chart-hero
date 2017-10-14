
export interface ChartView {
    zeroPosition: number;
    beats: ChartViewBeat[];
    notes: ChartViewNote[];
}

export interface ChartViewBeat {
    position: number;
}

export interface ChartViewNote {
    position: number;
    open: boolean;
    lane?: number;
    color?: ChartViewNoteColor;
}

export enum ChartViewNoteColor {
    Black,
    White,
    BlackWhite,
}

export const defaultChartView = (): ChartView => {
    return {
        zeroPosition: 87.5,
        beats: [{
            position: 67.5,
        }, {
            position: 47.5,
        }, {
            position: 27.5,
        }, {
            position: 7.5,
        }],
        notes: [{
            position: 67.5,
            open: false,
            lane: 1,
            color: ChartViewNoteColor.Black,
        }, {
            position: 47.5,
            open: false,
            lane: 2,
            color: ChartViewNoteColor.White,
        }, {
            position: 27.5,
            open: false,
            lane: 3,
            color: ChartViewNoteColor.BlackWhite,
        }],
    };
};
