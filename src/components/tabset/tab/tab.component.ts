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

    /** Define the active state of this tab */
    @Input() active: boolean = false;

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

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

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

    selectTab(): void {
        // if this tab is currently active do nothing
        if (this.active && !this._tabset.manual) {
            return;
        }

        if (!this._tabset.manual) {
            this.active = true;
        }

        this.select.emit();

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

        this.deselect.emit();

        this._changeDetector.detectChanges();
    }
}