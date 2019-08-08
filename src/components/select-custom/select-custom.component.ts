import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
// import { MenuTriggerDirective } from '../menu/menu-trigger/menu-trigger.directive';


@Component({
    selector: 'ux-select-custom',
    templateUrl: './select-custom.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectCustomComponent)
        }
    ],
    host: {
        '[style.width.px]': 'width'
    }
})
export class SelectCustomComponent<T> implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {

    /** Define the selected item */
    @Input() selected: T;

    /** Hide the filter input */
    @Input() hideFilter: boolean;

    /** Debounce the filter change event emitter */
    @Input() filterChangeDebounce: number = 500;

    /** Define the width of the component */
    @Input() width: number;

    /** Define the max height of the dropdown */
    @Input() maxHeight: number;

    /** Determine if we should show the loading indicator */
    @Input() busy: boolean;

    /** Define if null values are allowed */
    @Input() allowNull: boolean;

    /** Define the placeholder for the filter input */
    @Input() placeholder: string = 'Type to filter...';

    /** Emit when the selected item is changed */
    @Output() selectedChange = new EventEmitter<T>();

    /** Emit when the filter text is changed */
    @Output() filterChange = new EventEmitter<string>();

    @ContentChild('dropdownContent', { static: false }) dropdownContentRef: TemplateRef<void>;
    @ContentChild('buttonContent', { static: false }) buttonContentRef: TemplateRef<void>;

    // @ViewChild(MenuTriggerDirective, { static: false }) menuTrigger: MenuTriggerDirective;
    @ViewChild('filterInput', { static: false }) filterInputElement: ElementRef;

    filterText: string = '';
    filterTextChanged$: Subject<string> = new Subject<string>();

    onChange: (_: T) => void = () => { };
    onTouched: () => void = () => { };

    private readonly _onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void {
        this.filterTextChanged$.pipe(
            debounceTime(this.filterChangeDebounce),
            distinctUntilChanged(), // only emit if value is different from previous value
            takeUntil(this._onDestroy$)
        ).subscribe(textValue => {
            this.filterText = textValue;
            this.filterChange.emit(this.filterText);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selected) {
            this.onChange(changes.selected.currentValue);
            this.onTouched();
        }
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    resetFilter(event: MouseEvent): void {
        this.filterTextChanged$.next('');
        this.filterInputElement.nativeElement.focus();
        event.stopPropagation();
    }

    onFilterTextChanged(textValue: string): void {
        this.filterTextChanged$.next(textValue);
    }

    registerOnChange(onChange: (value: T) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    writeValue(value: T): void {
        this.selected = value;
        this.selectedChange.emit(value);
        // this.menuTrigger.closeMenu();
    }

    resetValue(event: Event): void {
        this.writeValue(undefined);
        event.stopPropagation();
    }

}
