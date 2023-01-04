import { ChangeDetectionStrategy, Component, ContentChild, inject, OnDestroy, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardTabsService } from '../card-tabs.service';
import { CardTabContentDirective } from './card-tab-content.directive';

@Component({
    selector: 'ux-card-tab',
    templateUrl: './card-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTabComponent implements OnDestroy {

    private _tabService = inject(CardTabsService);

    active$: Observable<boolean> = this._tabService.tab$.pipe(map(tab => tab === this));
    @ContentChild(CardTabContentDirective, { read: TemplateRef, static: false }) content: TemplateRef<any>;

    constructor() {
        this._tabService.addTab(this);
    }

    ngOnDestroy(): void {
        this._tabService.removeTab(this);
    }

}
