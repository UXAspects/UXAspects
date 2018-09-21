import { Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { distinctUntilChanged, takeUntil, pairwise, skip } from 'rxjs/operators';
import { tick } from '../../common/operators/tick.operator';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridService } from './tree-grid.service';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[uxTreeGridRow]',
    exportAs: 'uxTreeGridRow'
})
export class TreeGridRowDirective implements OnInit, OnDestroy {

    @Input('uxTreeGridRow')
    item: TreeGridItem;

    @Input()
    canExpand: boolean;

    @Input()
    set expanded(expanded: boolean) {
        this._expanded$.next(!!expanded);
    }
    get expanded(): boolean {
        return this._expanded$.getValue();
    }

    @Output()
    expandedChange = new EventEmitter<boolean>();

    @HostBinding('class.treegrid-row-loading')
    loading: boolean = false;

    @HostBinding('class.treegrid-row-expanded')
    private _rowExpanded: boolean = false;

    @HostBinding('class')
    private _class: string;

    private _expanded$ = new BehaviorSubject(false);

    private _onDestroy = new Subject<void>();

    constructor(private _treeGridService: TreeGridService) {
        this._expanded$.pipe(skip(1), tick(), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(expanded => {
            this.expandedChange.emit(expanded);
            this._treeGridService.setExpanded(this.item, expanded);
            this._rowExpanded = expanded;
        });
    }

    ngOnInit(): void {
        this._class = `treegrid-row treegrid-level-${this.item.treeGridState.level}`;

        if (!this.item || !this.item.treeGridState) {
            throw new Error('uxTreeGridRow should be configured with an object emitted by uxTreeGrid.rows.');
        }

        this.item.treeGridState.loading$.subscribe(loading => this.loading = loading);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('keydown.ArrowLeft', ['$event'])
    collapse(event?: Event): void {
        this.expanded = false;
        if (event) {
            event.preventDefault();
        }
    }

    @HostListener('keydown.ArrowRight', ['$event'])
    expand(event?: Event): void {
        this.expanded = true;
        if (event) {
            event.preventDefault();
        }
    }

    toggle(): void {
        this.expanded = !this.expanded;
    }
}