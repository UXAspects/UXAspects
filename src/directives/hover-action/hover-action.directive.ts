import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { HoverActionService } from './hover-action.service';

@Directive({
  selector: '[uxHoverAction]',
  standalone: false,
})
export class HoverActionDirective implements OnDestroy {
  private readonly _elementRef = inject(ElementRef);

  private readonly _hoverActionService = inject(HoverActionService);

  readonly focusIndicatorService = inject(FocusIndicatorService);

  @Input()
  @HostBinding('tabindex')
  tabindex: number = 0;

  @HostBinding('class.hover-action-active')
  active: boolean = false;

  @HostBinding('class.hover-action-focused')
  focused: boolean = false;

  private readonly _focusIndicator: FocusIndicator;
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // create the focus indicator
    this._focusIndicator = this.focusIndicatorService.monitor(this._elementRef.nativeElement);

    // register the action
    this._hoverActionService.register(this);

    // watch for changes to the activeness of the container
    this._hoverActionService.active
      .pipe(takeUntil(this._onDestroy))
      .subscribe(active => (this.active = active));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

    this._hoverActionService.unregister(this);
    this._focusIndicator.destroy();
  }

  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  @HostListener('focus') onFocus(): void {
    this.focused = true;
    this._hoverActionService.updateVisibility();
  }

  @HostListener('blur') onBlur(): void {
    this.focused = false;
    this._hoverActionService.updateVisibility();
  }
}
