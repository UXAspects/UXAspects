import { EventEmitter } from '@angular/core';
export declare class ItemDisplayPanelContentDirective {
}
export declare class ItemDisplayPanelFooterDirective {
}
export declare class ItemDisplayPanelComponent {
    title: string;
    footer: ItemDisplayPanelFooterDirective;
    visibleChange: EventEmitter<boolean>;
    top: number;
    visible: boolean;
    boxShadow: boolean;
    closeVisible: boolean;
    preventClose: boolean;
    inline: boolean;
    animate: boolean;
    shadow: boolean;
    private _top;
    private _visible;
    private _boxShadow;
    private _closeVisible;
    private _preventClose;
    private _inline;
    private _animate;
    private _shadow;
    clickOff(event: any): void;
}
