import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-sankey-ng1'
})
export class SankeyComponent extends UpgradeComponent {

    @Input() chartSize: any;
    @Input() chartData: any;
    @Input() options: any;
    @Input() click: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxSankeyNg1', elementRef, injector);
    }
}