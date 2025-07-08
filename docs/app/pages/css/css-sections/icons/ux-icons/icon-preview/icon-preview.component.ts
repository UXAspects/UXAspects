import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AccessibilityModule,
  IconModule,
  PopoverDirective,
  PopoverModule,
} from '@ux-aspects/ux-aspects';
import { IconSnippetComponent } from './icon-snippet/icon-snippet.component';

@Component({
  selector: 'uxd-icon-preview',
  templateUrl: './icon-preview.component.html',
  styleUrls: ['./icon-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule, PopoverModule, IconModule, IconSnippetComponent],
})
export class IconPreviewComponent implements OnInit {
  @Input() name: string;
  @Input() classname: string;
  @Input() size: string;

  uxComponentSnippet: string;
  iconSnippet: string;

  @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement>;

  @ViewChild(PopoverDirective, { static: true }) popover: PopoverDirective;

  ngOnInit(): void {
    this.uxComponentSnippet = `<ux-icon name="${this.name}"></ux-icon>`;

    this.iconSnippet = `<i class="ux-icon ${this.classname}"></i>`;
  }

  @HostListener('document:keydown.escape')
  closePopover(): void {
    if (this.popover.isVisible) {
      this.popover.hide();
      this.button.nativeElement.focus();
    }
  }
}
