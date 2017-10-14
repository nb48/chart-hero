
export interface ChartView {
    zeroPosition: number;
}

export const defaultChartView = (): ChartView => {
    return {
        zeroPosition: 87.5,
    };
};
