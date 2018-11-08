import { ElementRef, OnDestroy } from '@angular/core';
import { SelectionService } from '../../../directives/selection/selection.service';
export declare class SelectListItemComponent<T> implements OnDestroy {
    private _selection;
    data: T;
    tabindex: number;
    selected: boolean;
    private _onDestroy;
    constructor(_selection: SelectionService<T>, elementRef: ElementRef);
    ngOnDestroy(): void;
    onMouseDown(event: MouseEvent): void;
    onClick(event: MouseEvent): void;
    onKeydown(event: KeyboardEvent): void;
}
