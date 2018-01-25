import { Directive, ElementRef, Injector, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-organization-chart-ng1'
})
export class OrganizationChartComponent extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;
    @Output() dataChange = new EventEmitter<any>();
    @Output() optionsChange = new EventEmitter<any>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxOrganizationChartNg1', elementRef, injector);
    }
}