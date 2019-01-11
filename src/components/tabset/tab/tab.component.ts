import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { tick } from '../../../common/index';
import { TabsetService } from '../tabset.service';

let uniqueTabId = 0;

@Component({
    selector: 'ux-tab',
    templateUrl: './tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnDestroy {

    @Input() id: string = `ux-tab-${++uniqueTabId}`;
    @Input() disabled: boolean = false;
    @Input() heading: string;
    @Input() customClass: string;

    @Output() select = new EventEmitter<void>();
    @Output() deselect = new EventEmitter<void>();

    @Input() set active(value: boolean) {
        if (value) {
            this._tabset.select(this);
        }
    }

    headingRef: TemplateRef<any>;
    active$: Observable<boolean> = this._tabset.active$.pipe(map(active => active === this), tick());

    private _subscription: Subscription;

    constructor(private _tabset: TabsetService) {
        _tabset.add(this);

        this._subscription = this.active$.subscribe(active => active ? this.select.emit() : this.deselect.emit());
    }

    ngOnDestroy(): void {
        this._tabset.remove(this);
        this._subscription.unsubscribe();
    }

}