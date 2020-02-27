import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
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
export class InputDropdownComponent<T> implements ControlValueAccessor, OnChanges, OnDestroy {
    _maxHeightString: string;

    /** Define the selected item */
    @Input() selected: T;

    /** Hide the filter input */
    @Input() hideFilter: boolean;

    /** Define the max height of the dropdown */
    @Input() set maxHeight(value: string | any) {
        this._maxHeightString = coerceCssPixelValue(value);
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
    @Input()
    set dropdownOpen(value: boolean) {

        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);

        if (value) {
            this.menuTrigger.openMenu();
        }
    }

    get dropdownOpen() {
        return this._dropdownOpen;
    }

    @ContentChild('displayContent', { static: false }) displayContentRef: TemplateRef<void>;

    @ViewChild(MenuTriggerDirective, { static: false }) menuTrigger: MenuTriggerDirective;
    @ViewChild('filterInput', { static: false }) filterInputElement: ElementRef;

    filterText: string = '';

    onChange: (_: T) => void = () => { };
    onTouched: () => void = () => { };

    private readonly _onDestroy$ = new Subject<void>();
    private _dropdownOpen: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selected) {
            if (this.menuTrigger && !changes.selected.firstChange) {
                this.menuTrigger.closeMenu();
            }
            this.selectedChange.emit(changes.selected.currentValue);
            this.onChange(changes.selected.currentValue);
            this.onTouched();
        }
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    resetFilter(event: MouseEvent): void {
        this.filterText = '';
        this.filterChange.emit(this.filterText);
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

    _focusFilter(): void {
        if (this.filterInputElement) {
            this.filterInputElement.nativeElement.focus();
        }
    }

    inputBlurHandler() {
        this.dropdownOpen = false;
    }

    inputFocusHandler() {
        this.dropdownOpen = true;
    }
}
