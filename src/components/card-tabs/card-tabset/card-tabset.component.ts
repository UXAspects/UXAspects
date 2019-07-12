import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { ResizeDimensions } from '../../../directives/resize';
import { CardTabComponent } from '../card-tab/card-tab.component';
import { CardTabsService } from '../card-tabs.service';

@Component({
    selector: 'ux-card-tabset',
    templateUrl: './card-tabset.component.html',
    providers: [CardTabsService]
})
export class CardTabsetComponent {

    @HostBinding('class')
    @Input() set position(direction: string) {
        this.tabService.setPosition(direction);
    }

    get position(): string {
        return this.tabService.position$.getValue();
    }

    @ViewChild('tablist') tablist: ElementRef;

    offset: number = 0;
    bounds: CardTabsBounds = { lower: 0, upper: 0 };

    private _width: number;
    private _innerWidth: number;

    constructor(public tabService: CardTabsService) { }

    select(tab: CardTabComponent, element: HTMLElement): void {
        // select the tab
        this.tabService.select(tab);

        // ensure the tab is moved into view if required
        this.moveIntoView(element);
    }

    resize(dimensions: ResizeDimensions): void {
        this._width = dimensions.width;
        this._innerWidth = this.tablist.nativeElement.scrollWidth;

        this.bounds.lower = 0;
        this.bounds.upper = -(this._innerWidth - this._width);
    }

    previous(): void {
        this.offset += this._width;

        // ensure it remains within the allowed bounds
        this.offset = Math.min(this.offset, this.bounds.lower);
    }

    next(): void {
        this.offset -= this._width;

        // ensure it remains within the allowed bounds
        this.offset = Math.max(this.offset, this.bounds.upper);
    }

    private moveIntoView(element: HTMLElement): void {

        // if we dont have the dimensions we cant check
        if (!this._width || !this._innerWidth) {
            return;
        }

        // get the current element bounds
        const { offsetLeft, offsetWidth } = element;
        const { marginLeft, marginRight } = getComputedStyle(element);

        // calculate the visible area
        const viewportStart = Math.abs(this.offset);
        const viewportEnd = viewportStart + this._width;
        const cardWidth = parseFloat(marginLeft) + offsetWidth + parseFloat(marginRight);

        // if we need to move to the left - figure out how much
        if (offsetLeft < viewportStart) {
            this.offset -= (offsetLeft - parseFloat(marginLeft)) - viewportStart;
        }

        // if we need to move to the right - figure out how much
        if ((offsetLeft + cardWidth) > viewportEnd) {
            this.offset -= (offsetLeft + cardWidth) - viewportEnd;
        }
    }
}

export interface CardTabsBounds {
    lower: number;
    upper: number;
}
