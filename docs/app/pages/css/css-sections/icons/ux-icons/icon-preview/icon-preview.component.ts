import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
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

    public tooltipText: string = 'Click to copy icon text';
    public copied: boolean = false;

    hideTriggers: string [] = ['mouseleave', 'blur'];
    showTriggers: string [] = ['focus', 'mouseenter'];

    @ViewChild(TooltipDirective, { static: true }) tooltip: TooltipDirective;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _elementRef: ElementRef
    ) {}

    copy(): void {

        const dummy = this._renderer.createElement('input');
        this._renderer.appendChild(this._elementRef.nativeElement, dummy);

        switch (this.iconset) {
            case 'ux-icons':
                dummy.value =  '<i class="ux-icon' + ' ' + this.classname + '"></i>';
                break;
            case 'ux-icon':
                dummy.value =  '<ux-icon name="' + this.name + '"></ux-icon>';
                break;
            case 'hpe-icons':
                dummy.value =  '<i class="hpe-icon' + ' ' + this.classname + '"></i>';
                break;
        }

        dummy.select();
        document.execCommand('copy');
        this._renderer.removeChild(this._elementRef.nativeElement, dummy);

        this.hideTriggers = ['mouseleave', 'blur'];
        this.tooltip.show();
        this.tooltipText = 'Copied';
        this.copied = true;

        setTimeout(() => {
            this.hideTriggers  = ['mouseleave', 'blur'];
            this.tooltip.hide();
            this.tooltipText = 'Click to copy icon text';
            this.copied = false;
        }, 1000);

    }
}