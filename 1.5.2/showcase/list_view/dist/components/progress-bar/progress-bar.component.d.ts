import { OnChanges, SimpleChanges } from '@angular/core';
import { ColorService } from '../../services/color/index';
export declare class ProgressBarComponent implements OnChanges {
    private colorService;
    value: number;
    max: number;
    trackColor: string;
    barColor: string;
    percentage: number;
    constructor(colorService: ColorService);
    ngOnChanges(changes: SimpleChanges): void;
}
