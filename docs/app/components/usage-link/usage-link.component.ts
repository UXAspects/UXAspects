import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Usage } from './../../interfaces/Usage';

@Component({
    selector: 'uxd-usage-link',
    templateUrl: './usage-link.component.html',
    styleUrls: ['./usage-link.component.less'],
})
export class UsageLinkComponent {

    @Input() usage: Usage;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

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