import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-icon-preview',
    templateUrl: './icon-preview.component.html',
    styleUrls: ['./icon-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPreviewComponent implements OnInit {
    @Input() name: string;
    @Input() classname: string;
    @Input() iconset: string;
    @Input() iconSetClass: string;
    @Input() size: string;

    uxComponentSnippet: string;
    iconSnippet: string;

    @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement>;

    @ViewChild(PopoverDirective, { static: true }) popover: PopoverDirective;

    ngOnInit(): void {
        this.uxComponentSnippet = `<ux-icon name="${this.name}"></ux-icon>`;

        this.iconSnippet = `<i class="${this.iconSetClass} ${this.classname}"></i>`;
    }

    @HostListener('document:keydown.escape')
    closePopover(): void {
        if (this.popover.isVisible) {
            this.popover.hide();
            this.button.nativeElement.focus();
        }
    }
}