import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'social-chart'
})
export class SocialChartComponent extends UpgradeComponent {

    @Input() data: any;
    @Input() options: any;
    @Input() width: any;
    @Input() height: any;
    @Input() api: any;
    @Input() communities: any;
    @Input() detailStyle: any;
    @Input() popoverStyle: any;
    @Input() nodeDetail: any;
    @Input() edgeDetail: any;
    @Input() nodePopover: any;
    @Input() edgePopover: any;
    @Input() forceAtlasDuration: any;
    @Input() nodeSizeAttribute: any;
    @Input() startMaximized: any;
    @Input() startMaximised: any;
    @Input() showMaximizeControl: any;
    @Input() showMaximiseControl: any;
    @Input() socialChartContainer: any;
    @Input() fullscreenButtonPosition: any;
    @Input() localStrings: any;
    @Input() chartTitle: any;
    @Input() titleDisplayTime: any;
    @Input() edgeWeightInfluence: any;
    @Input() minLabels: any;
    

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxSocialChartNg1', elementRef, injector);
    }
}