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

    @ViewChild(TooltipDirective, { static: true }) tooltip: TooltipDirective;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _elementRef: ElementRef
    ) {}

    copy(iconType: string): void {

        const dummy = this._renderer.createElement('input');
        this._renderer.appendChild(this._elementRef.nativeElement, dummy);

        if (iconType === 'ux-icon-component') {
            dummy.value = `<ux-icon name="${this.name}"></ux-icon>`;
        } else if (iconType === 'ux-icon') {
            dummy.value = `<i class="ux-icon ${this.classname}"></i>`;
        } else {
            dummy.value = `<i class="hpe-icon ${this.classname}"></i>`;
        }

        dummy.select();
        document.execCommand('copy');
        this._renderer.removeChild(this._elementRef.nativeElement, dummy);
    }
}