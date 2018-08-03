import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListService } from './tabbable-list.service';

@Directive({
    selector: '[uxTabbableListItem]',
    exportAs: 'ux-tabbable-list-item'
})
export class TabbableListItemDirective implements FocusableOption, OnDestroy {
    @Input() disabled: boolean = false;
    @HostBinding() tabindex: number = -1;

    private _onDestroy = new Subject<void>();

    constructor(private _tabbableList: TabbableListService, private _elementRef: ElementRef) {}

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onInit(): void {
        this._tabbableList.focusKeyManager.change.pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);
    }

    @HostListener('focus')
    focus(): void {

        // apply focus to the element
        this._elementRef.nativeElement.focus();

        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {

        // prevent anything happening when modifier keys are pressed if they have been disabled
        if (!this._tabbableList.allowAltModifier && event.altKey || !this._tabbableList.allowCtrlModifier && event.ctrlKey) {
            return;
        }

        this._tabbableList.focusKeyManager.onKeydown(event);
    }
}