import { Directive, ElementRef, Injector, Input, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-grid-ng1'
})
export class GridComponent extends UpgradeComponent {

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