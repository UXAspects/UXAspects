import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'organization-chart'
})
export class OrganizationChartNg1Component extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;
    @Output() dataChange = new EventEmitter<any>();
    @Output() optionsChange = new EventEmitter<any>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxOrganizationChartNg1', elementRef, injector);
    }
}