import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-date-input',
    templateUrl: './leb-date-input.component.html'
})
export class LebDateInputComponent implements AfterViewInit, OnDestroy {
    @ViewChild('input') dateInput: ElementRef;

    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: Date) {
        this.date = !isNaN(value?.getDate()) ? value : new Date();
    }

    @Input()
    set configuration(config: DateInputOptions) {
        this.showTime = config?.showTime ?? this.showTime;
        this.showNowBtn = config?.showNowBtn ?? this.showNowBtn;
        this.dateFormat = config?.dateFormat ?? this.dateFormat;
        this.validate = config?.validateFunction ?? this.validate;
    }

    private validate: (value: Date) => boolean = () => true;
    _valid: boolean;

    private _date: Date;

    get date(): Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
        this.valueChange.emit(this._date);
        this._valid = this.validate(this._date);
        this.validChange.emit(this._valid);
    }

    showTime: boolean = false;
    showNowBtn: boolean = false;
    dateFormat: string = 'short';

    private destroy$: Subject<void> = new Subject<void>();

    ngAfterViewInit(): void {
        fromEvent(this.dateInput.nativeElement, 'input')
            .pipe(takeUntil(this.destroy$), debounceTime(500))
            .subscribe(() => {
                this.parse(this.dateInput.nativeElement.value);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    parse(value: string): void {
        // try and parse the date
        const date: Date = new Date(value);

        // check if the date is valid
        if (!isNaN(date.getDate())) {
            this.date = date;
        }
    }
}

interface DateInputOptions {
    showTime?: boolean;
    dateFormat?: string;
    showNowBtn?: boolean;
    validateFunction?: (value: Date) => boolean;
}
