import { ColorService } from '../../services/color/index';
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
    constructor(colorService: ColorService);
}
