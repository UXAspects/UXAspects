import { EventEmitter } from '@angular/core';
export declare class ItemDisplayPanelContentDirective {
}
export declare class ItemDisplayPanelFooterDirective {
}
export declare class ItemDisplayPanelComponent {
    header: string;
    top: number;
    boxShadow: boolean;
    closeVisible: boolean;
    preventClose: boolean;
    inline: boolean;
    animate: boolean;
    shadow: boolean;
    width: number;
    footer: ItemDisplayPanelFooterDirective;
    visibleChange: EventEmitter<boolean>;
    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     */
    title: string;
    visible: boolean;
    private _visible;
    clickOff(event: MouseEvent): void;
}
