import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import {Subject } from 'rxjs';

@Component({
    selector: 'ux-date-input',
    templateUrl: './date-input.component.html'
})
export class DateInputComponent implements OnDestroy {
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: number) {
        const date: Date = value ? new Date(value) : new Date();
        this.date = !isNaN(date.getDate()) ? date : new Date();
    }

    @Input('data')
    set options(options: DateInputOptions) {
        this._showTime = options?.showTime ?? this._showTime;
        this._showNowBtn = options?.showNowBtn ?? this._showNowBtn;
        this._dateFormat = options?.dateFormat ?? this._dateFormat;
        this._validate = options?.validateFunction ?? this._validate;
    }

    private _validate: (value: number) => boolean = () => true;
    public _valid: boolean;

    private _date: Date;

    get date(): Date {
        return this._date;
    }

    set date(date: Date) {
        this._date = date;
        this.valueChange.emit(this._date.getTime());
        this._valid = this._validate(this._date.getTime());
        this.valid.emit(this._valid);
    }

    public _showTime: boolean = false;
    public _showNowBtn: boolean = false;
    public _dateFormat: string = 'medium';

    private _destroy$: Subject<void> = new Subject<void>();

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}

interface DateInputOptions {
    showTime?: boolean;
    dateFormat?: string;
    showNowBtn?: boolean;
    validateFunction?: (value: number) => boolean;
}
