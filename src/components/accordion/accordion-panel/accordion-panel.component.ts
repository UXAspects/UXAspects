import { Component, EventEmitter, HostBinding, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccordionService } from '../accordion.service';

let uniqueId: number = 1;

@Component({
    selector: 'ux-accordion-panel',
    templateUrl: './accordion-panel.component.html',
    host: {
        'class': 'panel panel-default'
    },
    standalone: false
})
export class AccordionPanelComponent implements OnInit, OnDestroy {

    readonly accordion = inject(AccordionService);

    @Input() panelId: string = `ux-accordion-panel-${uniqueId++}`;
    @Input() headingId: string = `${this.panelId}-heading`;

    @Input() disabled: boolean = false;
    @Input() heading: string;
    @Input() @HostBinding('class.panel-open') expanded: boolean = false;

    @Output() expandedChange = new EventEmitter<boolean>();

    private readonly _onDestroy = new Subject<void>();

    ngOnInit(): void {
        this.accordion.collapse.pipe(takeUntil(this._onDestroy)).subscribe(() => this.collapse());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    toggle(): void {

        if (this.expanded) {
            this.collapse();
            return;
        }

        // check if we should collapse others
        if (this.accordion.collapseOthers) {
            this.accordion.collapseAll();
        }

        // store the new expanded state
        this.expand();
    }

    expand(): void {
        if (this.disabled === false && this.expanded === false) {
            this.expanded = true;
            this.expandedChange.next(true);
        }
    }

    collapse(): void {
        if (this.disabled === false && this.expanded === true) {
            this.expanded = false;
            this.expandedChange.next(false);
        }
    }

}
