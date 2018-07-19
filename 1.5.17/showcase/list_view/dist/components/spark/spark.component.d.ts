import { ColorService } from '../../services/color/index';
export declare class SparkComponent {
    private _colorService;
    values: number[];
    barHeight: number;
    inlineLabel: string;
    topLeftLabel: string;
    topRightLabel: string;
    bottomLeftLabel: string;
    bottomRightLabel: string;
    tooltip: string;
    private _trackColor;
    private _theme;
    private _barColor;
    theme: string;
    trackColor: string;
    barColor: string | string[];
    value: number | number[];
    constructor(_colorService: ColorService);
}
