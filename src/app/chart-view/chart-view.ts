
export interface ChartView {
    zeroPosition: number;
    beats: ChartViewBeat[];
    notes: ChartViewNote[];
}

export interface ChartViewBeat {
    position: number;
}

export interface ChartViewNote {
    x?: number;
    y: number;
    open: boolean;
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
            x: 25,
            y: 67.5,
            open: false,
            color: ChartViewNoteColor.Black,
        }, {
            x: 50,
            y: 47.5,
            open: false,
            color: ChartViewNoteColor.White,
        }, {
            x: 75,
            y: 27.5,
            open: false,
            color: ChartViewNoteColor.BlackWhite,
        }],
    };
};
