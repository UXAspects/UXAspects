export enum TimelineHandle {
    Lower = 'lower',
    Upper = 'upper',
    Range = 'range'
}

export interface TimelineChartOptions {
    timeline?: {
        backgroundColor?: Chart.ChartColor;
        selectionColor?: Chart.ChartColor;
        onChange?: (lower: Date, upper: Date) => void;
        keyboard?: {
            step?: number;
        },
        handles?: {
            backgroundColor?: Chart.ChartColor;
            foregroundColor?: Chart.ChartColor;
            focusIndicatorColor?: Chart.ChartColor;
        }
        range: {
            lower: Date,
            upper: Date,
            minimum?: number,
            maximum?: number
        }
    };
}

/**
 * Store internal state of the chart but don't expose it
 * in the public options interface
 */
export interface TimelineChartStateOptions {
    timeline?: {
        state: TimelineChartState
    };
}

export interface TimelineChartState {
    handle?: TimelineHandle | null;
    mouseX?: number;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
    lowerHandleFocus?: boolean;
    upperHandleFocus?: boolean;
    lowerHandleElement?: HTMLDivElement;
    upperHandleElement?: HTMLDivElement;
}

export interface TimelineChartConfig {
    config: {
        options: TimelineChartOptions & TimelineChartStateOptions;
    };
    chart: Chart;
}

export type TimelineChart = Chart & TimelineChartConfig;