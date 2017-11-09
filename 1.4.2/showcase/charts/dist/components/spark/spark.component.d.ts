import { ColorService } from '../../services/color/index';
import { ColorIdentifier } from '../../index';
export declare class SparkComponent {
    private colorService;
    trackColor: string;
    barColor: string;
    value: number;
    barHeight: number;
    inlineLabel: string;
    topLeftLabel: string;
    topRightLabel: string;
    bottomLeftLabel: string;
    bottomRightLabel: string;
    tooltip: string;
    theme: ColorIdentifier;
    constructor(colorService: ColorService);
}
