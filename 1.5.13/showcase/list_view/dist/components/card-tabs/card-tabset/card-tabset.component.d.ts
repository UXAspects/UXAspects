import { ElementRef } from '@angular/core';
import { ResizeDimensions } from '../../../directives/resize';
import { CardTabComponent } from '../card-tab/card-tab.component';
import { CardTabsService } from '../card-tabs.service';
export declare class CardTabsetComponent {
    tabService: CardTabsService;
    position: string;
    tablist: ElementRef;
    offset: number;
    bounds: CardTabsBounds;
    private _width;
    private _innerWidth;
    constructor(tabService: CardTabsService);
    select(tab: CardTabComponent, element: HTMLElement): void;
    resize(dimensions: ResizeDimensions): void;
    previous(): void;
    next(): void;
    private moveIntoView(element);
}
export interface CardTabsBounds {
    lower: number;
    upper: number;
}
