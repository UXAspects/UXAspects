import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class FloatingActionButtonComponent extends UpgradeComponent {
    items: FloatingActionButtonItem[];
    primary: string;
    direction: 'top' | 'right' | 'bottom' | 'left';
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface FloatingActionButtonItem {
    icon: string;
    event: Function;
}
