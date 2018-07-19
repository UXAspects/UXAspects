import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class FloatingActionButtonNg1Component extends UpgradeComponent {
    items: FloatingActionButtonItem[];
    primary: string;
    direction: 'top' | 'right' | 'bottom' | 'left';
    fabTooltip: string;
    fabTooltipPlacement: 'top' | 'right' | 'bottom' | 'left';
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface FloatingActionButtonItem {
    icon: string;
    event: Function;
    tooltip?: string;
    tooltipPlacement?: string;
}
