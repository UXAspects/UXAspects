import {ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild} from "@angular/core";
import { TooltipDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-icon-preview',
    templateUrl: './icon-preview.component.html',
    styleUrls: ['./icon-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPreviewComponent {
    @Input() name: string;
    @Input() classname: string;
    @Input() iconset: string;
    @Input() iconClass: string;

    isCopied: boolean = false;

    @ViewChild(TooltipDirective, { static: true }) tooltip: TooltipDirective;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _elementRef: ElementRef
    ) {}

    // copy to clipboard
    copy(iconClassSelector: string, iconName: string): void {
        const dummy = this._renderer.createElement('input');
        this._renderer.appendChild(this._elementRef.nativeElement, dummy);
        switch (this.iconset) {
            case "ux-icons":
                dummy.value =  '<i class="ux-icon' + ' ' + iconClassSelector + '"></i>';
                break;
            case "ux-icon":
                dummy.value =  '<ux-icon name="' + iconName + '"></ux-icon>';
                break;
            case "hpe-icons":
                dummy.value =  '<i class="hpe-icon'+ ' ' + iconClassSelector + '"></i>';
                break;
        }
        dummy.select();
        document.execCommand('copy');
        this._renderer.removeChild(this._elementRef.nativeElement, dummy);
    }
}