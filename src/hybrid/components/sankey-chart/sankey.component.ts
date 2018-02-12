import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'sankey'
})
export class SankeyNg1Component extends UpgradeComponent {

    @Input() chartSize: any;
    @Input() chartData: any;
    @Input() options: any;
    @Input() click: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxSankeyNg1', elementRef, injector);
    }
}