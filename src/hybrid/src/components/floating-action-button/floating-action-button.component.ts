import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'floating-action-button'
})
export class FloatingActionButtonNg1Component extends UpgradeComponent {

    @Input() items: FloatingActionButtonItem[] = [];
    @Input() primary: string;
    @Input() direction: 'top' | 'right' | 'bottom' | 'left';
    @Input() fabTooltip: string;
    @Input() fabTooltipPlacement: 'top' | 'right' | 'bottom' | 'left';

    constructor(elementRef: ElementRef, injector: Injector) {
        super('floatingActionButton', elementRef, injector);
    }
}

export interface FloatingActionButtonItem {
    icon: string;
    event: Function;
    tooltip?: string;
    tooltipPlacement?: string;
}