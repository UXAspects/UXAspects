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
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ux-date-input',
    templateUrl: './date-input.component.html',
    // styleUrls: ['']
})
export class DateInputComponent implements AfterViewInit, OnDestroy {
    @Input()
    set value(value: number) {
        const date = new Date(value);
        this.date = !isNaN(date.getDate()) ? date : new Date();
    }

    @Input()
    set data(data: DateInputOptions) {
        this.timezone = data?.timezone ?? { name: 'GMT', offset: 0 };

        this.showTime = data?.showTime ?? true;
        this.showTimezones = data?.showTimezones ?? true;
        this.showMeridians = data?.showMeridians ?? true;
        this.showSpinners = data?.showSpinners ?? true;

        this.dateFormat = data?.dateFormat ?? 'dd MMMM yyyy HH:mm';
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
    showTimezones: boolean;
    showMeridians: boolean;
    showSpinners: boolean;

    dateFormat: string;

    inputSubscription: Subscription;

    ngAfterViewInit(): void {
        this.inputSubscription = fromEvent(this.dateInput.nativeElement, 'input')
            .pipe(debounceTime(500))
            .subscribe(() => {
                this.parse(this.dateInput.nativeElement.value);
            });
    }

    ngOnDestroy(): void {
        this.inputSubscription.unsubscribe();
    }

    parse(value: string): void {
        // try and parse the date
        const date = new Date(value);

        // check if the date is valid
        if (!isNaN(date.getDate())) {
            this.date = date;
        }
    }
}

interface DateInputOptions {
    timezone?: DateTimePickerTimezone;
    showTime?: boolean;
    showTimezones?: boolean;
    showMeridians?: boolean;
    showSpinners?: boolean;
    dateFormat?: string;
}
