import { Directive, ElementRef, Injector, Input, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-thumbnail-ng1'
})
export class ThumbnailComponent extends UpgradeComponent {

    @Input() url: string;
    @Input() show: boolean;
    @Input() width: string;
    @Input() height: string;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('thumbnail', elementRef, injector);
    }
}