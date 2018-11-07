import { Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/operators/tick.operator';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridService } from './tree-grid.service';

@Directive({
    selector: '[uxTreeGridRow]',
    exportAs: 'uxTreeGridRow',
    host: {
        '[class.treegrid-row]': 'true'
    }
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
    isExpanded: boolean = false;

    private _expanded$ = new BehaviorSubject(false);

    private _onDestroy = new Subject<void>();

    constructor(private _treeGridService: TreeGridService) {
        this._expanded$.pipe(skip(1), tick(), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(expanded => {
            this.expandedChange.emit(expanded);
            this._treeGridService.setExpanded(this.item, expanded);
            this.isExpanded = expanded;
        });
    }

    ngOnInit(): void {

        if (!this.item || !this.item.state) {
            throw new Error('uxTreeGridRow should be configured with an object emitted by uxTreeGrid.rows.');
        }

        this.item.state.loading$.pipe(takeUntil(this._onDestroy))
            .subscribe(loading => this.loading = loading);
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

        // take into account whether or not the item can expanded
        this.expanded = this.canExpand && true;

        if (event) {
            event.preventDefault();
        }
    }

    toggle(): void {
        this.expanded ? this.collapse() : this.expand();
    }
}
