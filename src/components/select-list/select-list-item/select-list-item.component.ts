import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../../directives/selection/selection.service';

@Component({
    selector: 'ux-select-list-item',
    templateUrl: './select-list-item.component.html',
    host: {
        role: 'listitem'
    }
})
export class SelectListItemComponent implements OnDestroy {

    @Input() data: any;
    @HostBinding('tabindex') tabindex: number = -1;

    @HostBinding('class.selected')
    @HostBinding('attr.aria-selected')
    set selected(isSelected: boolean) {
        isSelected ? this._selection.select(this.data) : this._selection.deselect(this.data);
    }

    get selected(): boolean {
        return this._selection.isSelected(this.data);
    }

    private _onDestroy = new Subject<void>();

    constructor(private _selection: SelectionService, elementRef: ElementRef) {

        _selection.active$.pipe(takeUntil(this._onDestroy), filter(data => data === this.data)).subscribe(active => {
            _selection.focus$.next(active);
            elementRef.nativeElement.focus();
        });

        // make this item tabbable or not based on the focused element
        _selection.focus$.pipe(takeUntil(this._onDestroy))
            .subscribe(focused => this.tabindex = focused === this.data ? 0 : -1);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        this._selection.strategy.mousedown(event, this.data);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this._selection.strategy.click(event, this.data);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this._selection.strategy.keydown(event, this.data);
    }
}