import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'thumbnail'
})
export class ThumbnailNg1Component extends UpgradeComponent {

    @Input() url: string;
    @Input() show: boolean;
    @Input() width: string;
    @Input() height: string;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('thumbnail', elementRef, injector);
    }
}