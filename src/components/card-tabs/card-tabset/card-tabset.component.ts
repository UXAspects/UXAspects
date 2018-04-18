import { Component, ElementRef, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { ResizeDimensions } from '../../../directives/resize';
import { CardTabComponent } from '../card-tab/card-tab.component';
import { CardTabsService } from '../card-tabs.service';

@Component({
  selector: 'ux-card-tabset',
  templateUrl: './card-tabset.component.html',
  providers: [CardTabsService]
})
export class CardTabsetComponent implements OnDestroy {

  @HostBinding('class')
  @Input() set position(direction: string) {
    this._tabService.setPosition(direction);
  }

  get position(): string {
    return this._tabService.position.getValue();
  }

  @ViewChild('list') list: ElementRef;

  offset: number = 0;
  tab$: Observable<CardTabComponent> = this._tabService.tab$;

  width: number;
  innerWidth: number;
  bounds: CardTabsBounds = { lower: 0, upper: 0 };

  private _subscription: Subscription;

  constructor(private _tabService: CardTabsService) {
    this._subscription = _tabService.tab$.pipe(filter(tab => tab !== null), distinctUntilChanged())
      .subscribe(this.moveIntoView.bind(this));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  resize(dimensions: ResizeDimensions): void {
    this.width = dimensions.width;
    this.innerWidth = this.list.nativeElement.scrollWidth;

    this.bounds.lower = 0;
    this.bounds.upper = -(this.innerWidth - this.width);
  }

  previous(): void {
    this.offset += this.width;

    // ensure it remains within the allowed bounds
    this.offset = Math.min(this.offset, this.bounds.lower);
  }

  next(): void {
    this.offset -= this.width;

    // ensure it remains within the allowed bounds
    this.offset = Math.max(this.offset, this.bounds.upper);
  }

  private moveIntoView(tab: CardTabComponent): void {

    // if we dont have the dimensions we cant check
    if (!this.width || !this.innerWidth) {
      return;
    }

    // get the element from the component
    const element = tab.elementRef.nativeElement as HTMLElement;

    // get the current element bounds
    const { offsetLeft, offsetWidth } = element;
    const { marginLeft, marginRight } = getComputedStyle(element);

    // calculate the visible area
    const viewportStart = Math.abs(this.offset);
    const viewportEnd = viewportStart + this.width;
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
