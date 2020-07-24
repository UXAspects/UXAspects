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
import { DateTimePickerTimezone } from '../../../date-time-picker';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ux-date-input',
    templateUrl: './date-input.component.html'
})
export class DateInputComponent implements AfterViewInit, OnDestroy {
    @Input()
    set value(value: number) {
        const date: Date = new Date(value);
        this.date = !isNaN(date.getDate()) ? date : new Date();
    }

    @Input('data')
    set options(options: DateInputOptions) {
        this.showTime = options?.showTime ?? false;
    }

    @Output() valueChange = new EventEmitter<number>();

    @ViewChild('input') dateInput: ElementRef;

    private _date: Date;

    get date(): Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
        this.valueChange.emit(this._date.getTime());
    }

    timezone: DateTimePickerTimezone;

    showTime: boolean;

    private _destroy$: Subject<void> = new Subject<void>();

    ngAfterViewInit(): void {
        fromEvent(this.dateInput.nativeElement, 'input')
            .pipe(takeUntil(this._destroy$), debounceTime(500))
            .subscribe(() => {
                this.parse(this.dateInput.nativeElement.value);
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
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
}
