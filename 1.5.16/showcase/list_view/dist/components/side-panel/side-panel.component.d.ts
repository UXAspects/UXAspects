import { OnInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
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
    openChange: EventEmitter<boolean>;
    readonly position: string;
    readonly cssWidth: string;
    readonly cssTop: string;
    readonly componentWidth: string;
    readonly hostWidth: string;
    private _subscription;
    constructor(service: SidePanelService, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    openPanel(): void;
    closePanel(): void;
    clickHandler(event: MouseEvent): void;
}
