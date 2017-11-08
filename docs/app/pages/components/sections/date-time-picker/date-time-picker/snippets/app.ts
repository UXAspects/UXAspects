import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnDestroy {

    @ViewChild('input') dateInput: ElementRef;

    date: Date = new Date();
    timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    showTime: boolean = true;
    showTimezones: boolean = true;
    showMeridians: boolean = true;
    showSpinners: boolean = true;
    subscription: Subscription;

    ngAfterViewInit(): void {
        this.subscription = Observable.fromEvent(this.dateInput.nativeElement, 'input')
            .debounceTime(500)
            .subscribe(event => this.parse(this.dateInput.nativeElement.value));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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