import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, inject } from '@angular/core';
import {
  AccessibilityModule,
  FocusIndicatorDirective,
  FocusIndicatorOriginService,
  IconModule,
  TooltipModule,
} from '@ux-aspects/ux-aspects';
import { SnippetComponent } from '../../../../../../../components/snippet/snippet.component';

@Component({
  selector: 'uxd-icon-snippet',
  templateUrl: './icon-snippet.component.html',
  styleUrls: ['./icon-snippet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SnippetComponent, AccessibilityModule, TooltipModule, IconModule],
})
export class IconSnippetComponent implements AfterViewInit {
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);
  private readonly _focusOrigin = inject(FocusIndicatorOriginService);

  /** The code to display in the snippet */
  @Input() code: string;

  /** Determine if we should focus the copy button on init */
  @Input() focusOnShow: boolean = false;

  /** Emit whenever the user presses copy button */
  @Output() copied = new EventEmitter<void>();

  @ViewChild(FocusIndicatorDirective, { static: true }) copyFocusIndicator: FocusIndicatorDirective;

  ngAfterViewInit(): void {
    if (this.focusOnShow) {
      this.copyFocusIndicator.focus(this._focusOrigin.getOrigin());
    }
  }

  copy(): void {
    const dummy = this._renderer.createElement('input');
    this._renderer.appendChild(this._elementRef.nativeElement, dummy);

    dummy.value = this.code;

    dummy.select();
    document.execCommand('copy');
    this._renderer.removeChild(this._elementRef.nativeElement, dummy);

    this.copied.emit();
  }
}
