import { ElementRef, OnDestroy } from '@angular/core';
import { SelectionService } from '../../../directives/selection/selection.service';
export declare class SelectListItemComponent implements OnDestroy {
    private _selection;
    data: any;
    tabindex: number;
    selected: boolean;
    private _onDestroy;
    constructor(_selection: SelectionService, elementRef: ElementRef);
    ngOnDestroy(): void;
    onMouseDown(event: MouseEvent): void;
    onClick(event: MouseEvent): void;
    onKeydown(event: KeyboardEvent): void;
}
