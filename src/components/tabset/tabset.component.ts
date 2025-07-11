import { SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabComponent } from './tab/tab.component';
import { TabsetService } from './tabset.service';
import { TabsetToken } from './tabset.token';

@Component({
  selector: 'ux-tabset',
  templateUrl: './tabset.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TabsetService,
    {
      provide: TabsetToken,
      useExisting: forwardRef(() => TabsetComponent),
    },
  ],
  host: {
    '[class.tabs-left]': 'stacked === "left"',
    '[class.tabs-right]': 'stacked === "right"',
  },
  standalone: false,
})
export class TabsetComponent implements AfterViewInit, OnDestroy {
  readonly _tabset = inject(TabsetService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  /** Determine if the appearance of the tabset */
  @Input() minimal: boolean = true;

  /** Determine if the tabset should appear stacked */
  @Input() stacked: 'left' | 'right' | 'none' = 'none';

  /** Determine if we want to manually update the active state */
  @Input() set manual(manual: boolean) {
    this._tabset.manual = manual;
  }

  /** Provide am aria label for the tabset */
  @Input('aria-label') ariaLabel: string;

  /** Access all the children */
  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;

  /** Remove subscriptions on destroy */
  private readonly _onDestroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    // provide the service with the initial array of items
    this._tabset.update(this._tabs.toArray());

    // Make sure a tab is selected
    if (!this._tabset.isTabActive()) {
      this._tabset.selectFirstTab();
    }

    // run change detection once we have setup the tabs
    this._changeDetector.detectChanges();

    // watch for any future changes
    this._tabs.changes.pipe(takeUntil(this._onDestroy$)).subscribe(tabs => {
      // update the internal list of tabs
      this._tabset.update(tabs);

      // run change detection
      this._changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  selectTab(tab: number | TabComponent): void {
    // pass tab to select method
    this._tabset.select(tab instanceof TabComponent ? tab : this._tabs.toArray()[tab]);

    // run change detection
    this._changeDetector.detectChanges();
  }

  handleKeyDown(event: KeyboardEvent, tab: HTMLElement): void {
    if (event.keyCode === SPACE) {
      event.preventDefault();
      tab.click();
    }
  }

  markForCheck(): void {
    this._changeDetector.detectChanges();
  }
}
