import { DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({
    selector: '[uxMenuNavigation]',
    exportAs: 'uxMenuNavigation',
    providers: [MenuNavigationService]
})
export class MenuNavigationDirective implements OnInit, AfterContentInit, OnDestroy {

    @Input()
    toggleButton: MenuNavigationToggleDirective;

    @Input()
    toggleButtonPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

    @Output()
    navigatedOut = new EventEmitter<KeyboardEvent>();

    @ContentChildren(MenuNavigationItemDirective, { descendants: true })
    items: QueryList<MenuNavigationItemDirective>;

    get activeIndex(): number {
        return this._itemsOrdered.indexOf(this._service.active$.value);
    }

    private _itemsOrdered: MenuNavigationItemDirective[];
    private _onDestroy = new Subject<void>();

    constructor(
        private _service: MenuNavigationService,
        private _elementRef: ElementRef,
        @Inject(DOCUMENT) private _document: any
    ) { }

    ngOnInit(): void {
        if (this.toggleButton) {
            this.toggleButton.keyEnter.pipe(takeUntil(this._onDestroy))
                .subscribe(() => this.focusFirst());
        }
    }

    ngAfterContentInit(): void {

        this.items.changes.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._itemsOrdered = this.items.toArray());

        this._itemsOrdered = this.items.toArray();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    focusFirst(): void {
        this.moveFirst();
    }

    @HostListener('document:keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {

        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }

        let handled = false;

        switch (event.which) {

            case UP_ARROW:
                this.movePrevious(event);
                handled = true;
                break;

            case DOWN_ARROW:
                this.moveNext(event);
                handled = true;
                break;

            case LEFT_ARROW:
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;

            case RIGHT_ARROW:
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;

            case HOME:
                this.moveFirst();
                handled = true;
                break;

            case END:
                this.moveLast();
                handled = true;
                break;

            case ESCAPE:
                this.navigatedOut.emit(event);
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private moveNext(event: KeyboardEvent): void {

        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }

        const nextIndex = this.activeIndex + 1;
        if (nextIndex < this._itemsOrdered.length) {

            // Activate the next menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);

        } else {

            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'bottom') {
                this.moveToToggleButton(event);
            }
        }
    }

    private movePrevious(event: KeyboardEvent): void {

        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }

        const nextIndex = this.activeIndex - 1;
        if (nextIndex >= 0) {

            // Activate the previous menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);

        } else {

            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'top') {
                this.moveToToggleButton(event);
            }
        }
    }

    private moveFirst(): void {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[0]);
        }
    }

    private moveLast(): void {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[this._itemsOrdered.length - 1]);
        }
    }

    private moveToToggleButton(event: KeyboardEvent): void {
        if (this.toggleButton) {
            this.toggleButton.focus();
            this.toggleButton.menuOpen = false;
        }

        this.navigatedOut.emit(event);
    }
}