import { Directive, ElementRef, Injector, Input, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'grid'
})
export class GridNg1Component extends UpgradeComponent {

    @Input() source: any[] = [];
    @Input() columns: GridColumn[] = [];

    /**
     * The following inputs are undocumented
     */
    @Input() options: any;
    @Input() events: any;
    @Input() plugins: any;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('grid', elementRef, injector);
    }
}

export interface GridColumn {
    title: string;
    template: string;
    width?: string;
}