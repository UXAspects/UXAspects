import {
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TooltipDirective } from '../tooltip/index';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
  selector: 'ux-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: false,
})
export class FloatingActionButtonComponent implements AfterViewInit, OnDestroy {
  readonly fab = inject(FloatingActionButtonsService);

  private readonly _tooltip = inject(TooltipDirective, { optional: true });

  /** Define the aria label for the button */
  @Input('aria-label') ariaLabel: string;

  /** Access the element ref of the button element */
  @ViewChild('button', { static: true }) button: ElementRef;

  /** Determine if this is the primary button in the set */
  primary: boolean = false;

  /** Store the tabindex */
  tabindex$ = new BehaviorSubject<number>(-1);

  /** Unsubscribe from all observables on component destroy */
  private readonly _onDestroy = new Subject<void>();

  constructor(@Attribute('fab-primary') primary: string) {
    this.primary = primary !== null;
  }

  ngAfterViewInit(): void {
    if (this._tooltip) {
      // ensure the tooltip gets hidden when the button is hidden
      this.fab.open$
        .pipe(
          takeUntil(this._onDestroy),
          filter(isOpen => !isOpen && !this.primary)
        )
        .subscribe(() => this._tooltip.hide());
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  focus(): void {
    this.button.nativeElement.focus();
  }

  onFocus(): void {
    // ensure the tooltip gets shown
    if (this._tooltip) {
      this._tooltip.show();
    }
  }

  onBlur(): void {
    // ensure the tooltip gets hidden
    if (this._tooltip) {
      this._tooltip.hide();
    }
  }

  close(): void {
    this.fab.close();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.which) {
      case UP_ARROW:
        if (this.fab.isVertical()) {
          this.fab.focusSibling(this.fab.direction$.value !== 'bottom');
          event.preventDefault();
        }
        break;

      case DOWN_ARROW:
        if (this.fab.isVertical()) {
          this.fab.focusSibling(this.fab.direction$.value === 'bottom');
          event.preventDefault();
        }
        break;

      case LEFT_ARROW:
        if (this.fab.isHorizontal()) {
          this.fab.focusSibling(this.fab.direction$.value !== 'right');
          event.preventDefault();
        }
        break;

      case RIGHT_ARROW:
        if (this.fab.isHorizontal()) {
          this.fab.focusSibling(this.fab.direction$.value === 'right');
          event.preventDefault();
        }
        break;

      case ENTER:
        this.fab.focusPrimaryButton();
        break;

      case ESCAPE:
        this.fab.focusPrimaryButton();
        this.fab.close();
        break;
    }
  }
}
