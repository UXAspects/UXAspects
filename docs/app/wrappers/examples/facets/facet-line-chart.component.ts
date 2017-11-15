import '../../../pages/components/components-sections/facets/facet-line-chart-ng1/wrapper/facet-line-chart-ng1-wrapper';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-facet-line-chart-wrapper'
})
export class FacetLineChartComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFacetLineChartWrapper', elementRef, injector);
    }
}