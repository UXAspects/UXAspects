import { SimpleChange, EventEmitter } from '@angular/core';
export declare class ItemDisplayPanelComponent {
    top: number;
    shadow: boolean;
    title: string;
    animate: boolean;
    visibleChange: EventEmitter<boolean>;
    visible: boolean;
    private _visible;
    private onChangeCallback;
    height: string;
    ngOnChanges(changes: {
        [top: number]: SimpleChange;
    }): void;
    clickOff(event: any): void;
}
export declare class ItemDisplayPanelContentDirective {
}
export declare class ItemDisplayPanelFooterDirective {
}
