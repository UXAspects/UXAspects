import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { tick } from '../../../common';
import { TabsetService } from '../tabset.service';
import { TabsetToken } from '../tabset.token';
import { TabHeadingDirective } from './tab-heading.directive';

let uniqueTabId = 0;

@Component({
  selector: 'ux-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit, OnDestroy, OnChanges {
  private readonly _tabsetService = inject(TabsetService);

  private readonly _changeDetector = inject(ChangeDetectorRef);

  private readonly _tabset = inject(TabsetToken);

  /** Define the tab unique id */
  @Input()
  set id(id: string) {
    if (id) {
      this._id = id;
    }
  }

  get id() {
    return this._id;
  }

  /** Define the active state of this tab */
  @Input()
  set active(active: boolean) {
    if (active) {
      this._tabsetService.setTabActive(this);
    }
  }

  /** Define if this tab is disabled */
  @Input() disabled: boolean = false;

  /** Define the tab heading */
  @Input() heading: string;

  /** Define the tab router path */
  @Input() route: string | unknown[];

  /** Define the tab router additional parameters */
  @Input() routerLinkExtras: NavigationExtras;

  /** provide a custom class for the tab */
  @Input() customClass: string;

  /** Emits when the active state changes. */
  @Output() activeChange = new EventEmitter<boolean>();

  /** Emit when this tab is selected */
  @Output() activated = new EventEmitter<void>();

  /** Emit when this tab is deselected */
  @Output() deactivated = new EventEmitter<void>();

  /** Store a custom header templateRef */
  @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false })
  headingRef: TemplateRef<void>;

  // Active state of the tab, for use in the template
  _active = false;

  // Id of tab, for use in the template
  _id: string = `ux-tab-${++uniqueTabId}`;

  /** Unsubscribe from all subscriptions when component is destroyed */
  private readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this._tabsetService.activeTab$
      .pipe(tick(), distinctUntilChanged(), takeUntil(this._onDestroy))
      .subscribe(activeTab => {
        const isActive = activeTab === this;
        if (this._active !== isActive) {
          this.setActive(isActive);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && changes.disabled.previousValue !== changes.disabled.currentValue) {
      this._tabset.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  activate(): void {
    this.activated.emit();
  }

  deactivate(): void {
    this.deactivated.emit();
  }

  /**
   * Update the internal active state and emit appropriate events.
   */
  private setActive(active: boolean): void {
    this._active = active;
    this.activeChange.emit(active);

    if (!this._tabsetService.manual) {
      if (active) {
        this.activate();
      } else {
        this.deactivate();
      }
    }

    this._changeDetector.detectChanges();
  }
}
