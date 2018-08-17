import { Component, Input } from '@angular/core';
import { AccordionService } from './accordion.service';

@Component({
    selector: 'ux-accordion',
    templateUrl: './accordion.component.html',
    providers: [ AccordionService ],
    host: {
        'class': 'panel-group',
        'role': 'tablist',
        'aria-multiselectable': 'true'
    }
})
export class AccordionComponent {

    @Input() set collapseOthers(collapseOthers: boolean) {
        this._accordion.collapseOthers = collapseOthers;
    }

    constructor(private _accordion: AccordionService) { }
}