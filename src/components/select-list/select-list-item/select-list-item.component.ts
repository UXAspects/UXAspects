import { FocusableOption } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectListService } from '../select-list.service';

@Component({
    selector: 'ux-select-list-item',
    templateUrl: './select-list-item.component.html',
    host: {
        role: 'listitem'
    }
})
export class SelectListItemComponent implements OnInit, OnDestroy, FocusableOption {

    @Input() data: any;
    @HostBinding('tabindex') tabindex: number = -1;
    @HostBinding('class.selected') @HostBinding('attr.aria-selected') isSelected: boolean = false;

    private _onDestroy = new Subject<void>();

    constructor(private _selectTable: SelectListService, private _elementRef: ElementRef) { }

    ngOnInit(): void {

        // watch for changes to the selected state
        this._selectTable.selected$.pipe(takeUntil(this._onDestroy), map((selected: any[]) => selected.indexOf(this.data) !== -1))
            .subscribe(isSelected => this.isSelected = isSelected);

        // watch for changes to the focus item - debounce to avoid expression has changed after check warning
        this._selectTable.focused$.pipe(debounceTime(1), takeUntil(this._onDestroy)).subscribe(active => this.tabindex = active === this ? 0 : -1);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('focus')
    focus(): void {
        this._elementRef.nativeElement.focus();
        this._selectTable.focus(this);
    }

    @HostListener('click')
    @HostListener('keydown.enter')
    select(): void {
        // select or deselect the item accordingly
        this.isSelected ? this._selectTable.deselect(this.data) : this._selectTable.select(this.data);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this._selectTable.onKeydown(event);
    }
}