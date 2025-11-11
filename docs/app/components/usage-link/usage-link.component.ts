import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, inject } from '@angular/core';
import {
  AccessibilityModule,
  IconModule,
  PopoverModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import { Usage } from './../../interfaces/Usage';

@Component({
  selector: 'uxd-usage-link',
  templateUrl: './usage-link.component.html',
  styleUrls: ['./usage-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconModule, TooltipModule, AccessibilityModule, PopoverModule],
})
export class UsageLinkComponent {
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);

  @Input() usage: Usage;

  // copy to clipboard button
  copy(text: string): void {
    const dummy = this._renderer.createElement('input');
    this._renderer.appendChild(this._elementRef.nativeElement, dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    this._renderer.removeChild(this._elementRef.nativeElement, dummy);
  }
}
