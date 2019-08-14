import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import { MenuTriggerDirective } from '../menu/menu-trigger/menu-trigger.directive';


@Component({
    selector: 'ux-input-dropdown',
    templateUrl: './input-drowdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputDrowdownComponent)
        }
    ]
})
export class InputDrowdownComponent<T> implements ControlValueAccessor, OnChanges, OnDestroy {

    /** Define the selected item */
    @Input() selected: T;

    /** Hide the filter input */
    @Input() hideFilter: boolean;

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

    @ViewChild(MenuTriggerDirective, { static: false }) menuTrigger: MenuTriggerDirective;
    @ViewChild('filterInput', { static: false }) filterInputElement: ElementRef;

    filterText: string = '';

    onChange: (_: T) => void = () => { };
    onTouched: () => void = () => { };

    private readonly _onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selected) {
            if (this.menuTrigger) {
                this.menuTrigger.closeMenu();
            }
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
        this.selectedChange.emit(value);
    }

    resetValue(event: Event): void {
        this.writeValue(undefined);
        event.stopPropagation();
    }

}
