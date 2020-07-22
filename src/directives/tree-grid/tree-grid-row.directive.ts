import { ChangeDetectorRef, Directive, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
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

    constructor(changeDetector: ChangeDetectorRef, private _treeGridService: TreeGridService) {
        this._expanded$.pipe(distinctUntilChanged(), tick(), takeUntil(this._onDestroy)).subscribe(expanded => {
            this._treeGridService.setExpanded(this.item, expanded);
            this.isExpanded = expanded;
            changeDetector.detectChanges();
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
        this.expandedChange.emit(false);

        if (event) {
            event.preventDefault();
        }
    }

    @HostListener('keydown.ArrowRight', ['$event'])
    expand(event?: Event): void {

        // take into account whether or not the item can expanded
        if (!this.canExpand) {
            return;
        }

        this.expanded = true;
        this.expandedChange.emit(true);

        if (event) {
            event.preventDefault();
        }
    }

    toggle(): void {
        this.expanded ? this.collapse() : this.expand();
    }
}
