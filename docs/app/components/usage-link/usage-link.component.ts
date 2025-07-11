import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
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
  imports: [NgFor, IconModule, TooltipModule, AccessibilityModule, PopoverModule],
})
export class UsageLinkComponent {
  @Input() usage: Usage;

  constructor(
    private readonly _renderer: Renderer2,
    private readonly _elementRef: ElementRef
  ) {}

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
