import { OnDestroy, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CardTabsService } from '../card-tabs.service';
export declare class CardTabComponent implements OnDestroy {
    private _tabService;
    active$: Observable<boolean>;
    content: TemplateRef<any>;
    constructor(_tabService: CardTabsService);
    ngOnDestroy(): void;
}
