import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class ExpandInputComponent extends UpgradeComponent {
    elname: string;
    placeHolder: string;
    className: string;
    clearTextIcon: string;
    closeSearch: string;
    expandAlways: boolean;
    onEnter: Function;
    focus: EventEmitter<string>;
    constructor(elementRef: ElementRef, injector: Injector);
}
