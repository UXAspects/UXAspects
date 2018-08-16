import { OnDestroy, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
export declare class SelectListService implements OnDestroy {
    multiple: boolean;
    selected$: BehaviorSubject<any[]>;
    focused$: ReplaySubject<SelectListItemComponent>;
    private _items;
    private _focusKeyManager;
    private _onDestroy;
    ngOnDestroy(): void;
    initialise(items: QueryList<SelectListItemComponent>): void;
    select(item: any): void;
    deselect(item: any): void;
    focus(item: SelectListItemComponent): void;
    onKeydown(event: KeyboardEvent): void;
    private getIndexOfItem(item);
}
