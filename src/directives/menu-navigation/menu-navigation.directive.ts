import { DOWN_ARROW, END, ESCAPE, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class MenuNavigationDirective implements OnInit, OnDestroy {

    /** Define the menu toggle button */
    @Input() toggleButton: MenuNavigationToggleDirective;

    /** Define the position of the toggle button relative to the menu */
    @Input() toggleButtonPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

    /** Emit when the menu is no longer focused */
    @Output() navigatedOut = new EventEmitter<KeyboardEvent>();

    /** Get the index of the currently active item */
    get activeIndex(): number {
        return this.menuItems.indexOf(this._menuNavigationService.active$.value);
    }

    // get the list of menu items
    get menuItems(): ReadonlyArray<MenuNavigationItemDirective> {
        return this._menuNavigationService.menuItems;
    }

    /** Determine if the menu currently has focus */
    private _isFocused: boolean = false;

    /** Unsubscribe from all observables on destroy */
    private _onDestroy = new Subject<void>();

    constructor(private _menuNavigationService: MenuNavigationService) { }

    ngOnInit(): void {
        if (this.toggleButton) {
            this.toggleButton.keyEnter.pipe(takeUntil(this._onDestroy))
                .subscribe(() => this.focusFirst());
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    focusFirst(): void {
        this.moveFirst();
    }

    @HostListener('focusin')
    onFocusIn(): void {
        this._isFocused = true;
    }

    @HostListener('focusout')
    onFocusOut(): void {
        this._isFocused = false;
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {

        // Only handle events when focus in within the list of menu items
        if (this._isFocused === false) {
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
                this.moveToToggleButton(event);
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
        if (nextIndex < this.menuItems.length) {

            // Activate the next menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._menuNavigationService.active$.next(this.menuItems[nextIndex]);

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
            this._menuNavigationService.active$.next(this.menuItems[nextIndex]);

        } else {

            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'top') {
                this.moveToToggleButton(event);
            }
        }
    }

    private moveFirst(): void {
        if (this.menuItems.length > 0) {
            this._menuNavigationService.active$.next(this.menuItems[0]);
        }
    }

    private moveLast(): void {
        if (this.menuItems.length > 0) {
            this._menuNavigationService.active$.next(this.menuItems[this.menuItems.length - 1]);
        }
    }

    private moveToToggleButton(event: KeyboardEvent): void {
        if (this.toggleButton) {
            this.toggleButton.focus('keyboard');
            this.toggleButton.menuOpen = false;
        }

        this.navigatedOut.emit(event);
    }
}