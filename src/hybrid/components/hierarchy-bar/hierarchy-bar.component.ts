import { Directive, ElementRef, Injector, Input, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'hierarchy-bar'
})
export class HierarchyBarNg1Component extends UpgradeComponent {

    @Input() data: any[];
    @Input() options: HierarchyBarOptions;
    @Input() selectNode: any;
    @Input() containerClass: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('hierarchyBar', elementRef, injector);
    }
}

export interface HierarchyBarOptions {
    enabled: boolean;
    overview?: Function;
    image: Function;
    valueFormatter: Function;
    action?: {
        title: string;
        event: Function;
    };
}