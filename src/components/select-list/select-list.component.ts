import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListService } from './select-list.service';

@Component({
    selector: 'ux-select-list',
    templateUrl: './select-list.component.html',
    providers: [SelectListService],
    host: {
        role: 'list'
    }
})
export class SelectListComponent implements AfterViewInit, OnDestroy {

    @Input() set multiple(multiple: boolean) { this._selectList.multiple = multiple; }
    @Input() set selected(items: any[]) { this._selectList.selected$.next(items); }
    @Output() selectedChange = new EventEmitter<any[]>();

    @ContentChildren(SelectListItemComponent) items: QueryList<SelectListItemComponent>;

    private _onDestroy = new Subject<void>();

    constructor(private _selectList: SelectListService) {
        // any time the selection changes emit the latest value
        _selectList.selected$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy))
            .subscribe(selected => this.selectedChange.emit(selected));
    }

    ngAfterViewInit(): void {
        this._selectList.initialise(this.items);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}