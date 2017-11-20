import '../../../pages/components/components-sections/timeline/timeline-ng1/wrapper/timeline-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-timeline-wrapper'
})
export class TimelineComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTimelineWrapper', elementRef, injector);
    }
}