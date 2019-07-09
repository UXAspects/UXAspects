import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FocusIndicator, FocusIndicatorService } from '../../../directives/accessibility/index';
import { MenuComponent } from '../menu/menu.component';

@Directive({
    selector: '[uxMenuTabbableItem]',
})
export class MenuTabbableItemDirective implements OnInit, OnDestroy, FocusableOption {

    /** Define if this item is disabled or not */
    @Input() disabled: boolean = false;

    /** Store the focus indicator instance */
    private _focusIndicator: FocusIndicator;

    /** Automatically unsubscribe when directive is destroyed */
    private _onDestroy$ = new Subject<void>();

    constructor(
        private readonly _menu: MenuComponent,
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _focusIndicatorService: FocusIndicatorService,
        private readonly _renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // register this item in the MenuComponent
        this._menu._addItem(this);

        // we only want to show the focus indicator whenever the keyboard is used
        this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement);

        // subscribe to active item changes
        this._menu._activeItem$.pipe(takeUntil(this._onDestroy$))
            .subscribe(item => this.setTabIndex(item === this));
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._focusIndicator.destroy();
    }

    /** Focus this item with a given origin */
    focus(origin: FocusOrigin): void {
        this._focusIndicator.focus(origin);
    }

    /** This function is built into the CDK manager to allow jumping to items based on text content */
    getLabel(): string {
        return this._elementRef.nativeElement.textContent.trim();
    }

    /** Forward any keyboard events to the MenuComponent for accessibility */
    @HostListener('keydown', ['$event'])
    _onKeydown(event: KeyboardEvent): void {
        this._menu._onKeydown(event);
    }

    /** Update the tab index on this item */
    private setTabIndex(isTabbable: boolean): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', isTabbable ? '0' : '-1');
    }

}
