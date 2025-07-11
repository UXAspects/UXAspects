import { animate, style, transition, trigger } from '@angular/animations';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { TAB } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewRef,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AnchorAlignment, AnchorPlacement } from '../../../common/overlay/index';
import { MenuItemType } from '../menu-item/menu-item-type.enum';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MENU_OPTIONS_TOKEN } from '../menu-options.token';
import { MenuTabbableItemDirective } from '../menu-tabbable-item/menu-tabbable-item.directive';

let uniqueId = 0;

@Component({
  selector: 'ux-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'scaleY(0)' })),
      ]),
    ]),
  ],
  standalone: false,
})
export class MenuComponent implements AfterContentInit, OnDestroy, OnChanges {
  private readonly _options = inject(MENU_OPTIONS_TOKEN, { optional: true });

  private readonly _changeDetector = inject(ChangeDetectorRef);

  /** A unique id for the component. */
  @Input() @HostBinding('attr.id') id: string = `ux-menu-${++uniqueId}`;

  /** Define the position of the menu */
  @Input() placement: AnchorPlacement = 'bottom';

  /** Define the alignment of the menu */
  @Input() alignment: AnchorAlignment = 'start';

  /** Define if we should animate the menu */
  // eslint-disable-next-line no-prototype-builtins
  @Input() animate: boolean =
    this._options && 'animate' in this._options ? this._options.animate : true;

  /** Forward any classes to the actual menu element */
  @Input() menuClass: string;

  /** Emit when the opening has begun (the opened EventEmitter waits until the animation has finished) */
  @Output() readonly opening = new EventEmitter<void>();

  /** Emit when the menu is opened */
  @Output() readonly opened = new EventEmitter<void>();

  /** Emit whenever closing has begun (the closed EventEmitter waits until animation has finished) */
  @Output() readonly closing = new EventEmitter<void>();

  /** Emit when the menu is closed */
  @Output() readonly closed = new EventEmitter<void>();

  /** Access the menu content template */
  @ViewChild(TemplateRef, { static: false }) templateRef: TemplateRef<void>;

  /** Store the menu open state */
  isMenuOpen: boolean = false;

  /** Store the animation state */
  _isAnimating: boolean = false;

  /** Determine if this is a submenu */
  _isSubMenu: boolean = false;

  /** Handle keyboard interactions */
  _keyManager: FocusKeyManager<MenuItemComponent | MenuTabbableItemDirective>;

  /** Whether this menu should close when it loses focus */
  _closeOnBlur: boolean = false;

  /** Emit when the focused item changes (we use this as the key manager is not instantiated until a late lifecycle hook) */
  readonly _activeItem$ = new BehaviorSubject<MenuItemComponent | MenuTabbableItemDirective>(null);

  /** Access allow a close event to propagate all the way up the submenus */
  readonly _closeAll$ = new Subject<FocusOrigin | 'tabout'>();

  /** Emit keyboard events */
  readonly _onKeydown$ = new Subject<KeyboardEvent>();

  /** Emit hover events */
  readonly _isHovering$ = new BehaviorSubject<boolean>(false);

  /** Emit focus events */
  readonly _isFocused$ = new BehaviorSubject<boolean>(false);

  /** Emit placement change */
  readonly _placement$ = new BehaviorSubject<AnchorPlacement>('bottom');
  readonly _alignment$ = new BehaviorSubject<AnchorAlignment>('start');

  /** Access all child menu items for accessibility purposes */
  private readonly _items$ = new BehaviorSubject<(MenuItemComponent | MenuTabbableItemDirective)[]>(
    []
  );

  /** Automatically unsubscribe when the component is destroyed */
  private readonly _onDestroy$ = new Subject<void>();

  private _isTabPressed = false;

  /** Get innerId for use for accessibility  */
  get innerId(): string {
    return `${this.id}-menu`;
  }

  get _isExpanded(): Observable<boolean> {
    return this._menuItems.pipe(
      switchMap(items => merge(...items.map(item => item.isExpanded$))),
      takeUntil(this._onDestroy$)
    );
  }

  get _menuItemClick(): Observable<FocusOrigin> {
    return this._menuItems.pipe(
      switchMap(items => merge(...items.map(item => item.onClick$))),
      takeUntil(this._onDestroy$)
    );
  }

  /** Return only menu items an not custom tabbable items */
  private get _menuItems(): Observable<MenuItemComponent[]> {
    return this._items$.pipe(
      map(items => items.filter(item => item.type === MenuItemType.Default) as MenuItemComponent[])
    );
  }

  /** Create an internal querylist to store the menu items */
  private readonly _itemsList = new QueryList<MenuItemComponent | MenuTabbableItemDirective>();

  ngAfterContentInit(): void {
    // initialise the query list with the items
    this._items$.pipe(takeUntil(this._onDestroy$)).subscribe(items => {
      // if no items has been marked as tabbable then this should be
      if (!this._activeItem$.value && items.length > 0) {
        this._activeItem$.next(items[0]);
      }

      this._itemsList.reset(items);
      this._itemsList.notifyOnChanges();
    });

    // setup keyboard functionality
    this._keyManager = new FocusKeyManager<MenuItemComponent | MenuTabbableItemDirective>(
      this._itemsList
    )
      .withVerticalOrientation()
      .withTypeAhead()
      .withWrap();

    // emit the tabbable item on change
    this._keyManager.change
      .pipe(
        map(() => this._keyManager.activeItem),
        takeUntil(this._onDestroy$)
      )
      .subscribe(item => this._activeItem$.next(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.placement && changes.placement.currentValue !== changes.placement.previousValue) {
      this._placement$.next(changes.placement.currentValue);
    }

    if (changes.alignment && changes.alignment.currentValue !== changes.alignment.previousValue) {
      this._alignment$.next(changes.alignment.currentValue);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
    this._closeAll$.complete();
    this._isHovering$.complete();
    this._isFocused$.complete();
    this._activeItem$.complete();
    this._items$.complete();
    this._placement$.complete();
  }

  /** Register a menu item - we do this do avoid `@ContentChildren` detecting submenu items */
  _addItem(item: MenuItemComponent | MenuTabbableItemDirective): void {
    if (!this.hasItem(item)) {
      this._items$.next([...this._items$.value, item]);
    }
  }

  /** Remove an item */
  _removeItem(item: MenuItemComponent | MenuTabbableItemDirective): void {
    if (this.hasItem(item)) {
      this._items$.next(this._items$.value.filter(_item => _item !== item));
    }
  }

  /** Determine if an item exists */
  private hasItem(item: MenuItemComponent | MenuTabbableItemDirective): boolean {
    return !!this._items$.value.find(_item => _item === item);
  }

  /** Internal function to set the open state and run change detection */
  _setMenuOpen(menuOpen: boolean): void {
    // store the open state
    this.isMenuOpen = menuOpen;

    // if we are closing the menu reset some values
    if (!menuOpen) {
      this._isHovering$.next(false);
      this._isFocused$.next(false);
    }

    // the change detector is actually an instance of a ViewRef (which extends ChangeDetectorRef) when used within a component
    // and the ViewRef contains the destroyed state of the component which is more reliable
    // than setting a flag in ngOnDestroy as the component can be destroyed before
    // the lifecycle hook is called
    const viewRef = this._changeDetector as ViewRef;

    // check for changes - required to show the menu as we are using `*ngIf`
    if (!viewRef.destroyed) {
      this._changeDetector.detectChanges();
    }

    // emit the closing event
    menuOpen ? this.opening.emit() : this.closing.emit();
  }

  /** Close the menu if the focus event is null */
  _focusChange(event) {
    if (event === null && this._closeOnBlur && this._isTabPressed) {
      this._closeAll$.next('tabout');
    }
  }

  /** Track the animation state */
  _onAnimationStart(): void {
    this._isAnimating = true;
  }

  /** Track animation state and emit event when opening or closing */
  _onAnimationDone(): void {
    this._isAnimating = false;

    if (this.isMenuOpen) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  _closeMenu(): void {
    this._setMenuOpen(false);
  }

  /** Forward any keyboard events to the key manage for accessibility */
  _onKeydown(event: KeyboardEvent): void {
    this._keyManager.setFocusOrigin('keyboard').onKeydown(event);

    // emit the keydown event
    this._onKeydown$.next(event);
  }

  _onHoverStart(): void {
    this._isHovering$.next(true);
  }

  _onHoverEnd(): void {
    this._isHovering$.next(false);
  }

  _onFocus(): void {
    this._isFocused$.next(true);
  }

  _onBlur(): void {
    this._isFocused$.next(false);
  }

  _onKeyDown(event: KeyboardEvent): void {
    this._isTabPressed = event.keyCode === TAB;
  }
}
