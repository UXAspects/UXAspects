import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { MenuTriggerDirective } from '../menu/menu-trigger/menu-trigger.directive';

@Component({
    selector: 'ux-input-dropdown',
    templateUrl: './input-dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputDropdownComponent)
        }
    ]
})
export class InputDropdownComponent<T> implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {

    /** Define the selected item */
    @Input() selected: T;

    /** Hide the filter input */
    @Input() hideFilter: boolean;

    /** Define the max height of the dropdown */
    @Input() set maxHeight(value: string | any) {
        this._maxHeight = coerceCssPixelValue(value);
    }

    /** Define if null values are allowed */
    @Input() allowNull: boolean;

    /** Define the placeholder for the filter input */
    @Input() placeholder: string = 'Type to filter...';

    /** Aria label of the filter field. If not specified, the placeholder will be used. */
    @Input('aria-label') ariaLabel: string = '';

    /** Emit when the selected item is changed */
    @Output() selectedChange = new EventEmitter<T>();

    /** Emit when the filter text is changed */
    @Output() filterChange = new EventEmitter<string>();

    /** Emits when `dropdownOpen` changes. */
    @Output() dropdownOpenChange = new EventEmitter<boolean>();

    /** The status of the dropdown. */
    @Input() dropdownOpen: boolean = false;

    /** Access the display content template if specified */
    @ContentChild('displayContent', { static: false }) displayContentRef: TemplateRef<void>;

    /** Access the dropdown menu trigger directive */
    @ViewChild(MenuTriggerDirective, { static: false }) menuTrigger: MenuTriggerDirective;

    /** Access the filter text input element */
    @ViewChild('filterInput', { static: false }) filterInputElement: ElementRef<HTMLInputElement>;

    /** Store the current filter text */
    _filterText: string = '';

    /** Store the max height */
    _maxHeight: string;

    /** Store the change callback provided by Angular Forms */
    onChange: (_: T) => void = () => { };

    /** Store the touched callback provided by Angular Forms */
    onTouched: () => void = () => { };

    /** Unsubscribe from all observables on component destroy */
    private readonly _onDestroy$ = new Subject<void>();

    ngOnChanges(changes: SimpleChanges): void {

        // if the dropdownOpen state changes via the input we should show or hide the input accordingly
        if (changes.dropdownOpen && !changes.dropdownOpen.firstChange && changes.dropdownOpen.currentValue !== changes.dropdownOpen.previousValue) {
            changes.dropdownOpen.currentValue ? this.menuTrigger.openMenu() : this.menuTrigger.closeMenu();
        }

        if (changes.selected) {

            // if an item is programmatically selected we should close the menu if it is open
            if (this.menuTrigger && !changes.selected.firstChange) {
                this.menuTrigger.closeMenu();
            }

            this.selectedChange.emit(changes.selected.currentValue);
            this.onChange(changes.selected.currentValue);
            this.onTouched();
        }
    }

    ngAfterViewInit(): void {

        // if the user has initially set the dropdownOpen input to true we should open the menu
        // once we have access to the ViewChild menu trigger directive
        if (this.dropdownOpen) {
            // trigger menu open on the next tick to avoid expression changed issues)
            Promise.resolve().then(() => this.menuTrigger.openMenu());
        }
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    resetFilter(event: MouseEvent): void {
        this._filterText = '';
        this.filterChange.emit(this._filterText);
        this.filterInputElement.nativeElement.focus();
        event.stopPropagation();
    }

    registerOnChange(onChange: (value: T) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    writeValue(value: T): void {
        this.selected = value;
    }

    resetValue(event: Event): void {
        this.writeValue(undefined);
        event.stopPropagation();
    }

    onMenuOpen(): void {
        this._focusFilter();

        if (this.dropdownOpen !== true) {
            this.dropdownOpen = true;
            this.dropdownOpenChange.emit(this.dropdownOpen);
        }
    }

    onMenuClose(): void {
        if (this.dropdownOpen !== false) {
            this.dropdownOpen = false;
            this.dropdownOpenChange.emit(this.dropdownOpen);
        }
    }

    _focusFilter(): void {
        if (this.filterInputElement) {
            this.filterInputElement.nativeElement.focus();
        }
    }

    inputFocusHandler() {
        this.dropdownOpen = true;
        this.dropdownOpenChange.emit(this.dropdownOpen);
    }

    toggleMenu(): void {
        this.dropdownOpen = !this.dropdownOpen;
        this.dropdownOpenChange.emit(this.dropdownOpen);
        this.menuTrigger.toggleMenu();
    }
}
