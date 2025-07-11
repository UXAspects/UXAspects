import { FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { FocusIndicator } from './focus-indicator';
import { LocalFocusIndicatorOptions } from './focus-indicator-options/focus-indicator-options';
import { FocusIndicatorService } from './focus-indicator.service';

@Directive({
  selector: '[uxFocusIndicator]',
  exportAs: 'ux-focus-indicator',
  standalone: false,
})
export class FocusIndicatorDirective implements OnInit, OnDestroy {
  readonly optionsService = inject(AccessibilityOptionsService);

  private readonly _elementRef = inject(ElementRef);

  private readonly _focusIndicatorService = inject(FocusIndicatorService);

  private readonly _ngZone = inject(NgZone);

  readonly localOptions = inject(LocalFocusIndicatorOptions, { optional: true });

  /** Specify whether or not we should mark this element as having focus if a child is focused */
  @Input() set checkChildren(checkChildren: boolean | string) {
    // allow a string to be used so we can skip checking a binding for performance benefits
    checkChildren = coerceBooleanProperty(checkChildren);

    if (checkChildren !== null && checkChildren !== undefined) {
      this._checkChildren = checkChildren;
      this.setOptions();
    }
  }

  /** Indicate whether or not mouse events should cause the focus indicator to appear - will override any global setting */
  @Input() set mouseFocusIndicator(mouseFocusIndicator: boolean | string) {
    // allow a string to be used so we can skip checking a binding for performance benefits
    mouseFocusIndicator = coerceBooleanProperty(mouseFocusIndicator);

    if (mouseFocusIndicator !== null && mouseFocusIndicator !== undefined) {
      this._options.set('mouseFocusIndicator', mouseFocusIndicator);
      this.setOptions();
    }
  }

  /** Indicate whether or not touch events should cause the focus indicator to appear - will override any global setting */
  @Input() set touchFocusIndicator(touchFocusIndicator: boolean | string) {
    // allow a string to be used so we can skip checking a binding for performance benefits
    touchFocusIndicator = coerceBooleanProperty(touchFocusIndicator);

    if (touchFocusIndicator !== null && touchFocusIndicator !== undefined) {
      this._options.set('touchFocusIndicator', touchFocusIndicator);
      this.setOptions();
    }
  }

  /** Indicate whether or not keyboard events should cause the focus indicator to appear - will override any global setting */
  @Input() set keyboardFocusIndicator(keyboardFocusIndicator: boolean | string) {
    // allow a string to be used so we can skip checking a binding for performance benefits
    keyboardFocusIndicator = coerceBooleanProperty(keyboardFocusIndicator);

    if (keyboardFocusIndicator !== null && keyboardFocusIndicator !== undefined) {
      this._options.set('keyboardFocusIndicator', keyboardFocusIndicator);
      this.setOptions();
    }
  }

  /** Indicate whether or not programmatic events should cause the focus indicator to appear - will override any global setting */
  @Input() set programmaticFocusIndicator(programmaticFocusIndicator: boolean | string) {
    // allow a string to be used so we can skip checking a binding for performance benefits
    programmaticFocusIndicator = coerceBooleanProperty(programmaticFocusIndicator);

    if (programmaticFocusIndicator !== null && programmaticFocusIndicator !== undefined) {
      this._options.set('programmaticFocusIndicator', programmaticFocusIndicator);
      this.setOptions();
    }
  }

  /** Emit the latest focus state */
  @Output() indicator = new EventEmitter<boolean>();

  /** Store a private reference for the checkChildren option */
  private _checkChildren: boolean = false;

  /** Store all configuation options*/
  private readonly _options = new Map<string, boolean>();

  /** Store a reference to the focus handler */
  private _focusIndicator: FocusIndicator;

  /** Unsubscribe on component destroy */
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // set the inital option values based on global options
    for (const option in this.optionsService.options || {}) {
      this._options.set(option, this.optionsService.options[option]);
    }

    // set the inital option values based on local options (if there are any)
    for (const option in this.localOptions || {}) {
      this._options.set(option, this.localOptions[option]);
    }
  }

  /** Setup the focus monitoring */
  ngOnInit(): void {
    // start the focus monitoring
    this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement, {
      checkChildren: this._checkChildren,
      mouseFocusIndicator: this._options.get('mouseFocusIndicator'),
      touchFocusIndicator: this._options.get('touchFocusIndicator'),
      keyboardFocusIndicator: this._options.get('keyboardFocusIndicator'),
      programmaticFocusIndicator: this._options.get('programmaticFocusIndicator'),
    });

    // subscribe to the focus state to emit an event on change
    this._focusIndicator.isFocused$.pipe(takeUntil(this._onDestroy)).subscribe(isFocused => {
      // emit the latest value
      this._ngZone.run(() => this.indicator.emit(isFocused));
    });
  }

  /** Tear down the directive */
  ngOnDestroy(): void {
    if (this._focusIndicator) {
      this._focusIndicator.destroy();
    }

    // unsubscribe from all observables
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Focus this element with a specific origin */
  focus(origin?: FocusOrigin, options?: { preventScroll: boolean }): void {
    this._focusIndicator.focus(origin, options);
  }

  /** Update the focus indicator with the latest options */
  private setOptions(): void {
    if (this._focusIndicator) {
      this._focusIndicator.setOptions({
        checkChildren: this._checkChildren,
        mouseFocusIndicator: this._options.get('mouseFocusIndicator'),
        touchFocusIndicator: this._options.get('touchFocusIndicator'),
        keyboardFocusIndicator: this._options.get('keyboardFocusIndicator'),
        programmaticFocusIndicator: this._options.get('programmaticFocusIndicator'),
      });
    }
  }
}
