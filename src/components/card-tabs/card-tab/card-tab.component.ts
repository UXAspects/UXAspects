import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CardTabsService } from '../card-tabs.service';
import { CardTabContentDirective } from './card-tab-content.directive';

@Component({
  selector: 'ux-card-tab',
  templateUrl: './card-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabindex: '0'
  }
})
export class CardTabComponent implements OnInit, OnDestroy {

  @HostBinding('class') position: string = 'top';
  @HostBinding('class.active') active: boolean = false;

  @ContentChild(CardTabContentDirective, { read: TemplateRef }) content: TemplateRef<any>;

  private _subscription = new Subscription();

  constructor(private _tabService: CardTabsService, public elementRef: ElementRef) {

    // subscribe to the various values
    const active$ = _tabService.tab$.subscribe(tab => this.active = tab === this);
    const direction$ = _tabService.position.subscribe(position => this.position = position);

    // keep a collection of all subscriptions
    this._subscription.add(active$);
    this._subscription.add(direction$);
  }

  ngOnInit(): void {
    this._tabService.initialise(this);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  select(): void {
    this._tabService.select(this);
  }

}
