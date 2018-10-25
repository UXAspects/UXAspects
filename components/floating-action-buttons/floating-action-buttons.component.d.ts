import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonDirection, FloatingActionButtonsService } from './floating-action-buttons.service';
export declare class FloatingActionButtonsComponent implements AfterViewInit, OnDestroy {
    fab: FloatingActionButtonsService;
    private _elementRef;
    /** Specify the direction that the FAB should display */
    direction: FloatingActionButtonDirection;
    /** Emit whenever the open state changes */
    openChange: EventEmitter<boolean>;
    /** Get all child FAB buttons */
    buttons: QueryList<FloatingActionButtonComponent>;
    private _subscription;
    constructor(fab: FloatingActionButtonsService, _elementRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    close(target: HTMLElement): void;
}
