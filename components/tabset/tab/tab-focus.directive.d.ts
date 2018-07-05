import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { TabsetService } from '../tabset.service';
import { TabComponent } from './tab.component';
export declare class TabFocusDirective implements OnInit, OnDestroy {
    private _tabset;
    private _elementRef;
    uxTabFocus: TabComponent;
    private _subscription;
    constructor(_tabset: TabsetService, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
