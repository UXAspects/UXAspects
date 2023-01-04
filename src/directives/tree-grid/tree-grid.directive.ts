import { ChangeDetectorRef, Directive, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
import { TreeGridService } from './tree-grid.service';

@Directive({
    selector: '[uxTreeGrid]',
    providers: [TreeGridService],
    host: {
        class: 'treegrid'
    }
})
export class TreeGridDirective implements OnInit, OnDestroy {
    private readonly _changeDetector = inject(ChangeDetectorRef);

    private readonly _treeGridService = inject(TreeGridService);

    @Input('uxTreeGrid')
    set data(data: TreeGridItem[]) {
        this._treeGridService.data$.next(data);
    }

    @Input()
    set loadChildren(loadChildren: TreeGridLoadFunction) {
        this._treeGridService.loadChildren = loadChildren;
    }

    @Output()
    rowsChange = new EventEmitter<TreeGridItem[]>();

    private _onDestroy = new Subject<void>();

    ngOnInit(): void {
        this._treeGridService.rows$
            .pipe(takeUntil(this._onDestroy))
            .subscribe(rows => {
                this.rowsChange.emit(rows);
                this._changeDetector.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
