import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[uxOverflowObserver], [uxOverflowHorizontalObserver], [uxOverflowVerticalObserver]',
  exportAs: 'ux-overflow-observer',
  standalone: false,
})
export class OverflowDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  /** Allow a observable to be used to check for overflow */
  @Input() trigger: Observable<void>;

  /** Allow overflow to be within a range before emitting */
  @Input() tolerance: number = 0;

  /** Emit when there is a change to the overflow state - horizontal or vertical */
  @Output() uxOverflowObserver = new EventEmitter<boolean>();

  /** Emit when there is a change to overflow on the horizontal axis */
  @Output() uxOverflowHorizontalObserver = new EventEmitter<boolean>();

  /** Emit when there is a change to overflow on the vertical axis */
  @Output() uxOverflowVerticalObserver = new EventEmitter<boolean>();

  /** Store the overflow state on both axis */
  private _state = { horizontalOverflow: false, verticalOverflow: false };

  /** Unsubscribe from all the observables */
  private readonly _onDestroy = new Subject<void>();

  /** Set up the trigger if specified */
  ngOnInit(): void {
    if (this.trigger) {
      this.trigger.pipe(takeUntil(this._onDestroy)).subscribe(() => this.checkForOverflow());
    }
  }

  /** Perform an intial check for overflow */
  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.checkForOverflow());
  }

  /** Unsubscribe from the trigger */
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Programmatically trigger check for overflow */
  checkForOverflow(): void {
    const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = this._elementRef.nativeElement;
    const horizontalOverflow = scrollWidth - offsetWidth > this.tolerance;
    const verticalOverflow = scrollHeight - offsetHeight > this.tolerance;

    if (horizontalOverflow !== this._state.horizontalOverflow) {
      this.uxOverflowHorizontalObserver.emit(horizontalOverflow);
    }

    if (verticalOverflow !== this._state.verticalOverflow) {
      this.uxOverflowVerticalObserver.emit(verticalOverflow);
    }

    if (
      horizontalOverflow !== this._state.horizontalOverflow ||
      verticalOverflow !== this._state.verticalOverflow
    ) {
      this.uxOverflowObserver.emit(horizontalOverflow || verticalOverflow);
    }

    // store the state
    this._state = { horizontalOverflow, verticalOverflow };
  }
}
