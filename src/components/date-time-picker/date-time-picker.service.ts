import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class DateTimePickerService {

    date: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
    activeDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    mode: BehaviorSubject<DatePickerMode> = new BehaviorSubject<DatePickerMode>(DatePickerMode.Day);

    month: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getMonth());
    year: BehaviorSubject<number> = new BehaviorSubject<number>(new Date().getFullYear());

    constructor() {

        // when the date changes update the current month and year
        this.date.distinctUntilChanged((previous, current) => previous.getTime() === current.getTime()).subscribe(date => {
            this.month.next(date.getMonth());
            this.year.next(date.getFullYear());
        });
    }
}

export enum DatePickerMode {
    Day,
    Month,
    Year
  }