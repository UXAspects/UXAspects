import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { TabsetService } from '../tabset.service';
import { TabHeadingDirective } from './tab-heading.directive';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

let uniqueTabId = 0;

@Component({
    selector: 'ux-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, OnDestroy {

    /** Define the tab unique id */
    @Input() id: string = `ux-tab-${++uniqueTabId}`;

    /** Define the active state of this tab */
    @Input() active: boolean = false;

    /** Define if this tab is disabled */
    @Input() disabled: boolean = false;

    /** Define the tab heading */
    @Input() heading: string;

    /** provide a custom class for the tab */
    @Input() customClass: string;

    /** @deprecated Emit when this tab is selected - use activated output instead */
        // tslint:disable-next-line
    @Output() select = new EventEmitter<void>();

    /** Emit when this tab is selected */
    @Output() activated = new EventEmitter<void>();

    /** @deprecated Emit when this tab is deselected - - use deactivated output instead */
    @Output() deselect = new EventEmitter<void>();

    /** Emit when this tab is deselected */
    @Output() deactivated = new EventEmitter<void>();

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private readonly _tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        // warn anyone using the select output that it is deprecated
        if (this.select.observers.length > 0) {
            console.warn('Tab Component - (select) output is deprecated use activated instead');
        }

        // warn anyone using the deselect output that it is deprecated
        if (this.deselect.observers.length > 0) {
            console.warn('Tab Component - (deselect) output is deprecated use deactivated instead');
        }

        // for backwards compatibility emit deprecated select event
        this.activated.pipe(takeUntil(this._onDestroy)).subscribe(() => this.select.emit());

        // for backwards compatibility emit deprecated deselect event
        this.deactivated.pipe(takeUntil(this._onDestroy)).subscribe(() => this.deselect.emit());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
    }

    selectTab(): void {
        // if this tab is currently active do nothing
        if (this.active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this.active = true;
        }

        this.activated.emit();

        this._changeDetector.detectChanges();
    }

    deselectTab(): void {

        // if this tab is not currently active do nothing
        if (!this.active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this.active = false;
        }

        this.deactivated.emit();

        this._changeDetector.detectChanges();
    }
}