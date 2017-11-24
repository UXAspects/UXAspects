import { ColorService } from '../../services/color/index';
import { ColorIdentifier } from '../../index';
export declare class SparkComponent {
    private _colorService;
    values: number[];
    trackColor: string;
    barColor: string | string[];
    barHeight: number;
    inlineLabel: string;
    topLeftLabel: string;
    topRightLabel: string;
    bottomLeftLabel: string;
    bottomRightLabel: string;
    tooltip: string;
    theme: ColorIdentifier;
    value: number | number[];
    constructor(_colorService: ColorService);
}
