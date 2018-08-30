import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SidePanelService } from './side-panel.service';
export declare class SidePanelComponent implements OnInit, OnDestroy {
    protected service: SidePanelService;
    private _elementRef;
    open: boolean;
    inline: boolean;
    attachTo: 'window' | 'container';
    width: string | number;
    top: string | number;
    modal: boolean;
    animate: boolean;
    closeOnExternalClick: boolean;
    focusOnShow: boolean;
    openChange: EventEmitter<boolean>;
    readonly position: string;
    readonly cssWidth: string;
    readonly cssTop: string;
    readonly componentWidth: string;
    readonly hostWidth: string;
    protected _onDestroy: Subject<void>;
    constructor(service: SidePanelService, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    openPanel(): void;
    closePanel(): void;
    clickHandler(event: MouseEvent): void;
}
