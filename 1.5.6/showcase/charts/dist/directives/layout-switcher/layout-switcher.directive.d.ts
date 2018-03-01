import { ElementRef, AfterContentInit, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { ResizeService } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';
export declare class LayoutSwitcherDirective implements AfterContentInit, OnChanges {
    private _elementRef;
    private _viewContainerRef;
    group: string;
    private _layouts;
    private _width;
    private _activeLayout;
    constructor(_elementRef: ElementRef, resizeService: ResizeService, _viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    getActiveLayout(): LayoutSwitcherItemDirective | null;
    updateActiveLayout(): void;
    ngAfterContentInit(): void;
}
