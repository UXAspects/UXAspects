import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class ThumbnailComponent extends UpgradeComponent {
    url: string;
    show: boolean;
    width: string;
    height: string;
    constructor(elementRef: ElementRef, injector: Injector);
}
