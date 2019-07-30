import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { TabsetService } from '../tabset.service';
import { TabHeadingDirective } from './tab-heading.directive';

let uniqueTabId = 0;

@Component({
    selector: 'ux-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, OnDestroy {

    /** Define the tab unique id */
    @Input() id: string = `ux-tab-${++uniqueTabId}`;

    /** Define if this tab is disabled */
    @Input() disabled: boolean = false;

    /** Define the tab heading */
    @Input() heading: string;

    /** provide a custom class for the tab */
    @Input() customClass: string;

    /** Emit when this tab is selected */
    @Output() select = new EventEmitter<void>();

    /** Emit when this tab is deselected */
    @Output() deselect = new EventEmitter<void>();

    /** Define the active state of this tab */
    @Input() set active(isActive: boolean) {

        // store the previous value
        const wasActive = this.active;

        // store the new active state
        this._active = isActive;

        // update the active state of all other tabs
        if (isActive && isActive !== wasActive) {
            this._tabset.select(this);
        }

        // emit the appropriate value
        if (isActive !== wasActive) {
            isActive ? this.select.emit() : this.deselect.emit();
        }

        // mark this component for check
        this._changeDetector.detectChanges();
    }

    get active(): boolean {
        return this._active;
    }

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

    /** Store the internal active state */
    private _active: boolean = false;

    constructor(
        private readonly _tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this._tabset.add(this);
    }

    ngOnDestroy(): void {
        this._tabset.remove(this);
    }
}