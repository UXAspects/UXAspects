import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TooltipDirective } from '../tooltip/index';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export declare class FloatingActionButtonComponent implements AfterViewInit, OnDestroy {
    fab: FloatingActionButtonsService;
    private _tooltip;
    icon: string;
    ariaLabel: string;
    button: ElementRef;
    primary: boolean;
    tabindex$: BehaviorSubject<number>;
    private _onDestroy;
    constructor(primary: string, fab: FloatingActionButtonsService, _tooltip: TooltipDirective);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    onFocus(): void;
    onBlur(): void;
    close(): void;
    onKeydown(event: KeyboardEvent): void;
}
