import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isKeyboardTrigger } from '../../../common/index';
import { FocusIndicator, FocusIndicatorService } from '../../../directives/accessibility/index';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemType } from './menu-item-type.enum';

@Component({
  selector: '[uxMenuItem]',
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.disabled]': 'disabled ? "disabled" : null',
    '[attr.role]': 'role',
    '[class.disabled]': 'disabled',
    '[class.ux-menu-item]': 'true',
    '[class.open]': 'isOpen',
  },
  standalone: false,
})
export class MenuItemComponent implements OnInit, OnDestroy, FocusableOption {
  private readonly _menu = inject(MenuComponent);

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly _focusIndicatorService = inject(FocusIndicatorService);

  private readonly _renderer = inject(Renderer2);

  /** Define if this item is disabled or not */
  @Input() set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /** Determine if the menu should close on item click/enter.*/
  @Input() set closeOnSelect(value: boolean) {
    this._closeOnSelect = coerceBooleanProperty(value);
  }

  get closeOnSelect(): boolean {
    return this._closeOnSelect;
  }

  /** Define the role of the element */
  @Input() role: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox' = 'menuitem';

  /** Emits when the menu item is clicked or the enter key is pressed. */
  @Output() activate = new EventEmitter<MouseEvent | KeyboardEvent>();

  /** Access the open state */
  get isOpen(): boolean {
    return this._menu.isMenuOpen;
  }

  /** Indicate the type of the menu item */
  readonly type: MenuItemType = MenuItemType.Default;

  /** Store the current hover state */
  readonly isHovered$ = new BehaviorSubject<boolean>(false);

  /** Store the current focus state */
  readonly isFocused$ = new BehaviorSubject<boolean>(false);

  /** Store the current expanded state */
  readonly isExpanded$ = new BehaviorSubject<boolean>(false);

  /** Emit when an item is clicked */
  readonly onClick$ = new Subject<FocusOrigin>();

  /** Store the focus indicator instance */
  private _focusIndicator: FocusIndicator;

  /** Automatically unsubscribe from observables on destroy */
  private readonly _onDestroy$ = new Subject<void>();

  private _disabled: boolean = false;

  private _closeOnSelect: boolean = true;

  ngOnInit(): void {
    // register this item in the MenuComponent
    this._menu._addItem(this);

    // we only want to show the focus indicator whenever the keyboard is used
    this._focusIndicator = this._focusIndicatorService.monitor(this._elementRef.nativeElement);

    // subscribe to active item changes
    this._menu._activeItem$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(item => this.setTabIndex(item === this));
  }

  ngOnDestroy(): void {
    this._menu._removeItem(this);
    this.isHovered$.complete();
    this.isExpanded$.complete();
    this.isFocused$.complete();
    this.onClick$.complete();
    this._focusIndicator.destroy();
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  focus(origin: FocusOrigin): void {
    this._focusIndicator.focus(origin);
  }

  /** This function is built into the CDK manager to allow jumping to items based on text content */
  getLabel(): string {
    return this._elementRef.nativeElement.textContent.trim();
  }

  @HostListener('mouseenter')
  _onMouseEnter(): void {
    this.isHovered$.next(true);
  }

  @HostListener('mouseleave')
  _onMouseLeave(): void {
    this.isHovered$.next(false);
  }

  @HostListener('focus')
  _onFocus(): void {
    this.isFocused$.next(true);
  }

  @HostListener('blur')
  _onBlur(): void {
    this.isFocused$.next(false);
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onClick(event: MouseEvent | KeyboardEvent): void {
    if (!this.disabled) {
      if (this.closeOnSelect) {
        this.onClick$.next(isKeyboardTrigger(event) ? 'keyboard' : 'mouse');
      }
      this.activate.emit(event);
    }
  }

  /** Forward any keyboard events to the MenuComponent for accessibility */
  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent): void {
    this._menu._onKeydown(event);
  }

  /** Update the tab index on this item */
  private setTabIndex(isTabbable: boolean): void {
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'tabindex',
      isTabbable ? '0' : '-1'
    );
  }

  static ngAcceptInputType_disabled: boolean | string;
  static ngAcceptInputType_closeOnSelect: BooleanInput;
}
