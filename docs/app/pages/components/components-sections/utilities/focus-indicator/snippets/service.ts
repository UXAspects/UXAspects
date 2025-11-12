import { ElementRef, inject, OnDestroy } from '@angular/core';
import { FocusIndicator, FocusIndicatorService } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
})
export class ButtonComponent implements OnDestroy {
  private readonly _focusIndicator: FocusIndicator;
  private readonly focusIndicatorService = inject(FocusIndicatorService);
  private readonly elementRef = inject(ElementRef);
  constructor() {
    // begin controlling focus indicator with defined options
    this._focusIndicator = this.focusIndicatorService.monitor(this.elementRef.nativeElement, {
      mouseFocusIndicator: true,
      touchFocusIndicator: true,
      keyboardFocusIndicator: true,
      programmaticFocusIndicator: true,
      checkChildren: false,
    });
  }

  ngOnDestroy(): void {
    // stop monitoring focus when component is destroyed
    this._focusIndicator.destroy();
  }
}
