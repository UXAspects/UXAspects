import { Directive, ContentChildren, QueryList, AfterContentInit, HostListener, ElementRef, Inject, Output, EventEmitter, Input, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationService } from './menu-navigation.service';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';

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

    private _document: Document;

    private _subscription = new Subscription();

    constructor(
        private _service: MenuNavigationService,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        @Inject(DOCUMENT) document: any
    ) {
        this._document = document;
    }

    ngOnInit(): void {
        if (this.toggleButton) {
            this._subscription.add(
                this.toggleButton.keyEnter.subscribe(this.focusFirst.bind(this))
            );
        }
    }

    ngAfterContentInit(): void {

        this._subscription.add(
            this.items.changes.subscribe(() => {
                this._itemsOrdered = this.items.toArray();
            })
        );

        this._itemsOrdered = this.items.toArray();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    focusFirst(): void {
        this.moveFirst();
    }

    @HostListener('document:keydown', ['$event'])
    private keydownHandler(event: KeyboardEvent): void {

        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }

        let handled = false;

        switch (event.key) {

            case 'ArrowUp':
            case 'Up':
                this.movePrevious(event);
                handled = true;
                break;

            case 'ArrowDown':
            case 'Down':
                this.moveNext(event);
                handled = true;
                break;

            case 'ArrowLeft':
            case 'Left':
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;

            case 'ArrowRight':
            case 'Right':
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;

            case 'Home':
                this.moveFirst();
                handled = true;
                break;

            case 'End':
                this.moveLast();
                handled = true;
                break;

            case 'Escape':
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