import { FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewContainerRef,
  forwardRef,
  inject,
} from '@angular/core';
import { Observable, Subject, combineLatest, merge, of, timer } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';
import { AnchorPlacement } from '../../../common/overlay/anchor-placement';
import {
  FocusIndicator,
  FocusIndicatorOriginService,
  FocusIndicatorService,
} from '../../../directives/accessibility/index';
import { OverlayPlacementService } from '../../../services/overlay-placement/index';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';

@Directive({
  selector: '[uxMenuTriggerFor]',
  exportAs: 'ux-menu-trigger',
  host: {
    '[attr.disabled]': 'disabled ? true : null',
    '[attr.aria-haspopup]': '!!menu',
    '[attr.aria-expanded]': 'menu?.isMenuOpen',
    '[attr.aria-controls]': 'ariaControls',
  },
  standalone: false,
})
export class MenuTriggerDirective implements OnInit, OnDestroy {
  private readonly _overlay = inject(Overlay);

  private readonly _elementRef = inject(ElementRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _focusOrigin = inject(FocusIndicatorOriginService);

  private readonly _focusIndicatorService = inject(FocusIndicatorService);

  private readonly _overlayPlacement = inject(OverlayPlacementService);

  private readonly _parentMenu = inject(MenuComponent, { optional: true });

  private readonly _menuItem = inject(MenuItemComponent, { optional: true, self: true });

  /** Access the menu we should show */
  @Input('uxMenuTriggerFor') menu: MenuComponent;

  /** Determine if we should disable the trigger */
  @Input() disabled: boolean = false;

  /** Optionally specify the menu's parent element */
  @Input('uxMenuParent') parent: ElementRef;

  /** Determine if the menu should close when it loses focus */
  @Input() set closeOnBlur(value: boolean) {
    this._closeOnBlur = coerceBooleanProperty(value);
  }

  get closeOnBlur(): boolean {
    return this._closeOnBlur;
  }

  /** Emit when the menu is closed */
  @Output() readonly closed = new EventEmitter<void>();

  /** Reference to the portal based off the MenuCompont templateRef */
  private _portal: TemplatePortal;

  /** Store the reference to the overlay */
  private _overlayRef?: OverlayRef;

  /** Get the aria controls for accessibility */
  get ariaControls(): string | null {
    return this.menu?.isMenuOpen ? this.menu?.innerId : null;
  }

  /** Store the instance of the focus indicator */
  private _focusIndicator: FocusIndicator;

  /** Automatically unsubscribe on directive destroy */
  private readonly _onDestroy$ = new Subject<void>();

  /** Reference to the menu should close when it loses focus */
  private _closeOnBlur: boolean = false;

  /** Determine if this triggers a submenu */
  private get _isSubmenuTrigger(): boolean {
    return !!this._parentMenu;
  }

  /** Determine if this is the root trigger */
  private get _isRootTrigger(): boolean {
    return !this._isSubmenuTrigger;
  }

  private readonly _debounceTime: number = 50;

  @ContentChildren(forwardRef(() => MenuTriggerDirective))
  menuTriggers: QueryList<MenuTriggerDirective>;

  /** If this is a submenu we want to know when the mouse leaves the items or parent item */
  private get _menuShouldClose(): Observable<boolean[]> {
    if (!this._isSubmenuTrigger) {
      return of();
    }

    // This combined observable will essentially check for all of the combinations of events that can cause a menu
    // to remain open, for example:
    //
    // 1. Hovering over any item in the menu should keep the menu open
    // 2. Having any item in the menu focused should keep the menu open
    // 3. Having the parent menu item hovered should keep a submenu open
    // 4. Having the parent menu item focused should keep a submenu open
    // 5. Having a submenu open should keep the parent open (if the submenu meets one of the above conditions)
    //
    // We also debounce this because there is often a delay between a blur and a focus event or moving the mouse
    // from a menu item to a sub menu item, so we add this buffer time to prevent the menu from closing unexpectedly
    return combineLatest([
      this.menu._isHovering$,
      this.menu._isFocused$,
      this._menuItem.isHovered$,
      this.menu._isExpanded,
      this._menuItem.isFocused$,
    ]).pipe(
      debounceTime(50),
      filter(
        ([isHovered, isFocused, isItemHovered, isExpanded, isItemFocused]) =>
          !isHovered && !isFocused && !isItemHovered && !isExpanded && !isItemFocused
      )
    );
  }

  ngOnInit(): void {
    // set up focus indicator handling
    this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement);

    // if there is a parent menu then we should override the default initial
    // position to be to the right rather than beneath. Note this gets called
    // before ngOnInit in the MenuComponent so if the user specifies an explicit
    // position then it will still take precendence
    if (this._isSubmenuTrigger) {
      this.menu._isSubMenu = true;
      this.menu.placement = this.getSubMenuPlacement(this.menu.placement);
    }

    // listen for the menu to open (after animation so we can focus the first item)
    this.menu.opened.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.menuDidOpen());

    // propagate the close event if it is triggered
    this.menu._closeAll$.pipe(takeUntil(this._onDestroy$)).subscribe(origin => {
      if (origin === 'tabout' && this._isRootTrigger) {
        this.closeMenu('keyboard', true, true, true);
      } else {
        this.closeMenu(origin as FocusOrigin, true);
      }
    });

    // handle keyboard events in the menu
    this.menu._onKeydown$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(event => this.onMenuKeydown(event));

    combineLatest([this.menu._placement$, this.menu._alignment$])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        if (this._isSubmenuTrigger) {
          this.menu.placement = this.getSubMenuPlacement(this.menu.placement);
        }
        this.getOverlay(true);
      });
  }

  ngOnDestroy(): void {
    this.destroyMenu();
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /** Focus the next focusable element */
  focusNextElement() {
    // add elements we want to include in our selection
    const focusableElements =
      'a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

    if (document.activeElement) {
      const focusable: NodeListOf<HTMLElement> = document.querySelectorAll(focusableElements);
      const suitableElements = [];

      focusable.forEach(element => {
        if (
          (element.offsetWidth > 0 ||
            element.offsetHeight > 0 ||
            element === document.activeElement) &&
          !element.classList.contains('cdk-visually-hidden')
        ) {
          suitableElements.push(element);
        }
      });

      const index = suitableElements.indexOf(document.activeElement);

      if (index > -1) {
        const nextElement = suitableElements[index + 1] || focusable[0];
        nextElement.focus();
      }
    }
  }

  /** Open the menu */
  openMenu(): void {
    // if the menu is already open then do nothing
    if (this.menu.isMenuOpen || this.disabled) {
      return;
    }

    this.menu._closeOnBlur = this.closeOnBlur;

    // get or create an overlayRef
    const overlayRef = this.getOverlay();
    const portal = this.getPortal();

    // if the overlay is already attached do nothing
    if (overlayRef.hasAttached()) {
      return;
    }

    // attach the menu to the DOM
    overlayRef.attach(portal);

    // mark the menu as open
    this.menu._setMenuOpen(true);

    if (this._menuItem) {
      // timer is needed because isExpanded$ will get set to false
      // prematurely due to the debounceTime on the menuShouldClose.
      timer(this._debounceTime)
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this._menuItem.isExpanded$.next(true));
    }

    // listen for a menu item to be selected
    this.menu._menuItemClick
      .pipe(take(1), takeUntil(this._onDestroy$))
      .subscribe(origin => this.closeMenu(origin, true));

    // subscribe to any close events
    this.didMenuClose()
      .pipe(take(1), takeUntil(this._onDestroy$))
      .subscribe(() => this.closeMenu());

    // listen for the menu to animate closed then destroy it, if submenu wait for it to start closing to destroy.
    if (this._isSubmenuTrigger) {
      this.menu.closing
        .pipe(take(1), takeUntil(this._onDestroy$))
        .subscribe(() => this.destroyMenu());
    } else {
      this.menu.closed
        .pipe(take(1), takeUntil(this._onDestroy$))
        .subscribe(() => this.destroyMenu());
    }
  }

  /** Close a menu or submenu */
  closeMenu(
    origin?: FocusOrigin,
    closeParents: boolean = false,
    focusTrigger: boolean = true,
    focusNextElement: boolean = false
  ): Observable<void> {
    if (!this._overlayRef.hasAttached()) {
      return;
    }

    // update the menu state
    this.menu._setMenuOpen(false);

    if (this._menuItem) {
      this._menuItem.isExpanded$.next(false);
    }

    // if we should close parents then propagate the event
    if (closeParents && this._parentMenu) {
      this._parentMenu._closeAll$.next(origin);
    }

    // we should focus the trigger element if this is the root trigger unless otherwise specified
    if (this._isRootTrigger && focusTrigger) {
      this._focusIndicator.focus(origin);
    }

    if (focusNextElement) {
      this.focusNextElement();
    }

    this.closed.emit();
    return this.menu.closed;
  }

  /** Toggle the open state of a menu */
  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  toggleMenu(event?: MouseEvent | KeyboardEvent): void {
    // if this occurs on a submenu trigger then we can skip
    if (this._isSubmenuTrigger) {
      return;
    }

    if (!this.menu._isAnimating) {
      // determine the focus origin based on whether or not a keyboard was used
      const origin = event instanceof KeyboardEvent ? 'keyboard' : 'mouse';

      // set the correct focus origin - if triggered by an event then use the source otherwise it was programmatic
      this._focusOrigin.setOrigin(event ? origin : 'program');

      // toggle the menu open state
      this.menu.isMenuOpen ? this.closeMenu(origin, true) : this.openMenu();
    }

    // the enter key will trigger the click event and therefore set the wrong focus origin
    // so we nee to ensure this doesn't happen
    if (event) {
      event.preventDefault();
    }
  }

  /** Submenus should be opened by hovering on the menu item */
  @HostListener('mouseenter')
  _onMouseEnter(): void {
    if (this._isSubmenuTrigger && !this._parentMenu._isAnimating) {
      this.openMenu();
    }
  }

  @HostListener('mousemove')
  _onMouseMove(): void {
    if (this._isSubmenuTrigger && !this._parentMenu._isAnimating) {
      setTimeout(() => {
        this.openMenu();
      }, this._debounceTime);
    }
  }

  /** Pressing the escape key should close all menus */
  @HostListener('document:keydown.escape')
  _onEscape(): void {
    if (this.menu.isMenuOpen) {
      this.closeMenu();

      // refocus the root trigger and show the focus ring
      if (this._isRootTrigger) {
        this._focusIndicator.focus('keyboard');
      }
    }
  }

  /** Handle keyboard events for opening submenus */
  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent): void {
    // arrow key in the correct direction should open the menu
    if (
      (this.menu.placement === 'right' && event.keyCode === RIGHT_ARROW) ||
      (this.menu.placement === 'left' && event.keyCode === LEFT_ARROW) ||
      (this.menu.placement === 'top' && event.keyCode === UP_ARROW) ||
      (this.menu.placement === 'bottom' && event.keyCode === DOWN_ARROW)
    ) {
      this._focusOrigin.setOrigin('keyboard');

      // if the menu was opened by a click but we subsequently use the arrow keys focus the first item
      if (this.menu.isMenuOpen) {
        this.menu._keyManager.setFocusOrigin('keyboard').setFirstItemActive();
      } else {
        // otherwise open the menu
        this.openMenu();
      }

      // prevent the browser from scrolling
      event.preventDefault();
    }
  }

  /** Blurring the trigger should check if the menu has focus and close it if not */
  @HostListener('blur')
  _onBlur(): void {
    if (this.closeOnBlur) {
      this.closeOnFocusout();
    }
  }

  /** Remove the menu from the DOM */
  private destroyMenu(): void {
    // if the menu has been destroyed already then do nothing
    if (!this._overlayRef) {
      return;
    }

    // remove the overlay
    this._overlayRef.detach();
  }

  /** Create an overlay or return an existing instance */
  private getOverlay(recreateOverlay: boolean = false): OverlayRef {
    // if we have already created the overlay then reuse it
    if (this._overlayRef && !recreateOverlay) {
      return this._overlayRef;
    }

    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this.parent ?? this._elementRef)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withTransformOriginOn('.ux-menu');

    // otherwise create a new one
    this._overlayRef = this._overlay.create({
      hasBackdrop: !this._isSubmenuTrigger,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
      positionStrategy: strategy,
    });

    this._overlayPlacement.updatePosition(
      this._overlayRef,
      this.menu.placement,
      this.menu.alignment,
      undefined
    );

    return this._overlayRef;
  }

  /** Create a Template portal if one does not already exist (or the template has changed) */
  private getPortal(): TemplatePortal {
    // if there is no portal or the templateRef has changed then create a new one
    if (!this._portal || this.menu.templateRef !== this._portal.templateRef) {
      this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
    }

    return this._portal;
  }

  /** Get an observable that emits on any of the triggers that close a menu */

  private didMenuClose(): Observable<any> {
    return merge(
      this._overlayRef.backdropClick(),
      this._parentMenu ? this._parentMenu.closing : of(),
      this._menuShouldClose
    );
  }

  /** When the menu opens we want to focus the first item in the list */
  private menuDidOpen(): void {
    // if the keyboard is used we should always focus and show the indicator
    // regardless of it this is the root menu or not
    if (this._focusOrigin.getOrigin() === 'keyboard') {
      this.menu._keyManager.setFocusOrigin('keyboard').setFirstItemActive();
    }
  }

  /** Handle keypresses in submenus where we may want to close them */
  private onMenuKeydown(event: KeyboardEvent): void {
    // if we are a submenu and the user presses an arrow key in the opposite
    // direction than it is positioned from its parents then we should close the menu
    if (this._parentMenu) {
      if (
        (this.menu.placement === 'right' && event.keyCode === LEFT_ARROW) ||
        (this.menu.placement === 'left' && event.keyCode === RIGHT_ARROW) ||
        (this.menu.placement === 'top' && event.keyCode === DOWN_ARROW) ||
        (this.menu.placement === 'bottom' && event.keyCode === UP_ARROW)
      ) {
        this.closeMenu();

        // refocus the parent menu item
        this._menuItem.focus('keyboard');
      }
    }
  }

  /** Check whether the overlay has focus */
  private hasFocus(): boolean {
    let check = false;

    document.querySelectorAll('.cdk-overlay-container .ux-menu').forEach(el => {
      if (el.contains(document.activeElement)) {
        check = true;
      }
    });

    return check;
  }

  /** Close the menu if there is no element focused */
  private closeOnFocusout(): void {
    if (this.menu.isMenuOpen) {
      setTimeout(() => {
        if (!this.hasFocus()) {
          this.closeMenu(undefined, true, false);
        }
      }, this._debounceTime);
    }
  }

  private getSubMenuPlacement(placement: AnchorPlacement): AnchorPlacement {
    return placement === 'left' ? 'left' : 'right';
  }

  static ngAcceptInputType_closeOnBlur: BooleanInput;
}
