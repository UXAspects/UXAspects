import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';
export declare class ItemDisplayPanelContentDirective {
}
export declare class ItemDisplayPanelFooterDirective {
}
export declare class ItemDisplayPanelComponent extends SidePanelComponent implements OnInit {
    header: string;
    boxShadow: boolean;
    closeVisible: boolean;
    preventClose: boolean;
    shadow: boolean;
    visibleChange: EventEmitter<boolean>;
    footer: ItemDisplayPanelFooterDirective;
    panel: ElementRef;
    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     */
    title: string;
    visible: boolean;
    constructor(service: SidePanelService, elementRef: ElementRef);
    ngOnInit(): void;
    focus(): void;
}
