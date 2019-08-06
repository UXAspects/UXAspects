import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ux-select-custom',
  templateUrl: './select-custom.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectCustomComponent)
    }
  ]
})
export class SelectCustomComponent implements ControlValueAccessor, OnChanges, OnInit {

  @ContentChild('dropdownContent') dropdownContentRef: TemplateRef<any>;
  @ContentChild('buttonContent') buttonContentRef: TemplateRef<any>;
  @Input() selected: Object;
  @Output() selectedChange = new EventEmitter();
  @Input() hideFilter: boolean;
  @Input() filterChangeDebounce: number = 500;
  @Output() filterChange = new EventEmitter<string>();
  @Input() width: number;
  @Input() maxHeight: number;
  @Input() busy: boolean;
  @Input() allowNull: boolean;
  @Input() placeholder: string = 'type to filter ...';

  @ViewChild('rootElement') rootElement: ElementRef;
  @ViewChild('filterInput') filterInputElement: ElementRef;


  filterText = '';
  filterTextChanged$: Subject<string> = new Subject<string>();

  onChange: (_: any) => void = () => true;
  onTouched: () => void = () => true;

  constructor() {
  }

  ngOnInit() {
    this.filterTextChanged$.pipe(
      debounceTime(this.filterChangeDebounce),
      distinctUntilChanged() // only emit if value is different from previous value
    ).subscribe(textValue => {
      this.filterText = textValue;
      this.filterChange.emit(this.filterText);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.onChange(changes.selected.currentValue);
      this.onTouched();
    }
  }

  onToggle() {
    setTimeout(
      () => {
        if (this.rootElement.nativeElement.classList.contains('open')) {
          this.filterInputElement.nativeElement.focus();
        }
      }, 0
    );
  }

  resetFilter(event: MouseEvent) {
    this.filterTextChanged$.next('');
    this.filterInputElement.nativeElement.focus();
    event.stopPropagation();
  }

  onFilterTextChanged(textValue: string) {
    this.filterTextChanged$.next(textValue);
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  public writeValue(obj: any): void {
    this.selected = obj;
    this.selectedChange.emit(obj);
  }

  resetValue($event: Event) {
    this.writeValue(undefined);
    $event.stopPropagation();
  }
}
