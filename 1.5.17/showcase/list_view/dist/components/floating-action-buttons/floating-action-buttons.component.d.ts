import { AfterViewInit, ElementRef, OnDestroy, QueryList, EventEmitter } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export declare class FloatingActionButtonsComponent implements AfterViewInit, OnDestroy {
    fab: FloatingActionButtonsService;
    private _elementRef;
    direction: FloatingActionButtonDirection;
    tooltips: QueryList<TooltipDirective>;
    openChange: EventEmitter<boolean>;
    private _subscription;
    constructor(fab: FloatingActionButtonsService, _elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    close(target: HTMLElement): void;
}
export declare type FloatingActionButtonDirection = 'top' | 'right' | 'bottom' | 'left';
