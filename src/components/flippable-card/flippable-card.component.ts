import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FocusIndicator, FocusIndicatorService } from '../../directives/accessibility/index';

@Component({
  selector: 'ux-flippable-card',
  templateUrl: './flippable-card.component.html',
  host: {
    tabindex: '0',
    '[class.horizontal]': 'direction === "horizontal"',
    '[class.vertical]': 'direction === "vertical"',
  },
  exportAs: 'ux-flippable-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FlippableCardComponent implements OnDestroy {
  readonly focusIndicatorService = inject(FocusIndicatorService);

  readonly elementRef = inject(ElementRef);

  /** Determines whether the card should flip horizontally or vertically. */
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Determines when the card should flip. Possible options are `click`, `hover` and `manual`.
   * The manual option should be used if you want complete control over when the card should flip.
   */
  @Input() trigger: 'click' | 'hover' | 'manual' = 'hover';

  /** Sets the width (in pixels) of the card. */
  @Input() width: number = 280;

  /** Sets the height (in pixels) of the card. */
  @Input() height: number = 200;

  /** Determines whether or not the card is flipped. */
  @Input() flipped: boolean = false;

  /** If two way binding is used this value will be updated when the state of the card changes. */
  @Output() flippedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Focus Indicator instance */
  private readonly _focusIndicator: FocusIndicator;

  constructor() {
    this._focusIndicator = this.focusIndicatorService.monitor(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._focusIndicator.destroy();
  }

  setFlipped(state: boolean): void {
    this.flipped = state;
    this.flippedChange.emit(this.flipped);
  }

  toggleFlipped(): void {
    this.setFlipped(!this.flipped);
  }

  @HostListener('click')
  clickTrigger(): void {
    // add or remove the class depending on whether or not the card has been flipped
    if (this.trigger === 'click') {
      this.toggleFlipped();
    }
  }

  @HostListener('mouseenter')
  hoverEnter(): void {
    // if the trigger is hover then begin to flip
    if (this.trigger === 'hover') {
      this.setFlipped(true);
    }
  }

  @HostListener('mouseleave')
  hoverExit(): void {
    if (this.trigger === 'hover') {
      this.setFlipped(false);
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.spacebar', ['$event']) // IE uses different naming
  onKeyDown(event: KeyboardEvent): void {
    if (this.trigger !== 'manual') {
      this.toggleFlipped();
      event.preventDefault();
    }
  }
}

@Directive({
  selector: 'ux-flippable-card-front',
  standalone: false,
})
export class FlippableCardFrontDirective {}

@Directive({
  selector: 'ux-flippable-card-back',
  standalone: false,
})
export class FlippableCardBackDirective {}
