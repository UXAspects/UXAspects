import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
    selector: 'uxd-icon-snippet',
    templateUrl: './icon-snippet.component.html',
    styleUrls: ['./icon-snippet.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IconSnippetComponent {

    @Input() code: string;

    constructor(
        private readonly _renderer: Renderer2,
        private readonly _elementRef: ElementRef
    ) {}

    copy(): void {

        const dummy = this._renderer.createElement('input');
        this._renderer.appendChild(this._elementRef.nativeElement, dummy);

        dummy.value = this.code;

        dummy.select();
        document.execCommand('copy');
        this._renderer.removeChild(this._elementRef.nativeElement, dummy);
    }
}