import { EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TabsetService } from '../tabset.service';
export declare class TabComponent implements OnDestroy {
    private _tabset;
    id: string;
    disabled: boolean;
    heading: string;
    customClass: string;
    select: EventEmitter<void>;
    deselect: EventEmitter<void>;
    active: boolean;
    headingRef: TemplateRef<any>;
    active$: Observable<boolean>;
    private _subscription;
    constructor(_tabset: TabsetService);
    ngOnDestroy(): void;
}
