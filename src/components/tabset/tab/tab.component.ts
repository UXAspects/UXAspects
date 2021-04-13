import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { tick } from '../../../common';
import { TabsetService } from '../tabset.service';
import { TabHeadingDirective } from './tab-heading.directive';

let uniqueTabId = 0;

@Component({
    selector: 'ux-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit, OnDestroy {

    /** Define the tab unique id */
    @Input() id: string = `ux-tab-${++uniqueTabId}`;

    /** Define the active state of this tab */
    @Input()
    set active(active: boolean) {
        if (active) {
            this._tabset.setTabActive(this);
        }
    }

    /** Define if this tab is disabled */
    @Input() disabled: boolean = false;

    /** Define the tab heading */
    @Input() heading: string;

    /** Define the tab router path */
    @Input() route: string | any[];

    /** Define the tab router additional parameters */
    @Input() routerLinkExtras: NavigationExtras;

    /** provide a custom class for the tab */
    @Input() customClass: string;

    /** Emits when the active state changes. */
    @Output() activeChange = new EventEmitter<boolean>();

    /** Emit when this tab is selected */
    @Output() activated = new EventEmitter<void>();

    /** Emit when this tab is deselected */
    @Output() deactivated = new EventEmitter<void>();

    /** Store a custom header templateRef */
    @ContentChild(TabHeadingDirective, { read: TemplateRef, static: false }) headingRef: TemplateRef<void>;

    // Active state of the tab, for use in the template
    _active = false;

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private readonly _tabset: TabsetService,
        private readonly _changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this._tabset.activeTab$.pipe(tick(), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(activeTab => {
            const isActive = (activeTab === this);
            if (this._active !== isActive) {
                this.setActive(isActive);
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    activate(): void {
        this.activated.emit();
    }

    deactivate(): void {
        this.deactivated.emit();
    }

    /**
     * Update the internal active state and emit appropriate events.
     */
    private setActive(active: boolean): void {
        this._active = active;
        this.activeChange.emit(active);

        if (!this._tabset.manual) {
            if (active) {
                this.activate();
            } else {
                this.deactivate();
            }
        }

        this._changeDetector.detectChanges();
    }
}
