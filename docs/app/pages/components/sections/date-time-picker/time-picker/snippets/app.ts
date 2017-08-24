import { Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    public myTime: Date = new Date();
    public minTime: Date = new Date();
    public maxTime: Date = new Date();
    public hstep: number = 1;
    public mstep: number = 1;
    public ismeridian: boolean = true;
    public showSec: boolean = false;
    public isEnabled: boolean = true;
    public mousewheel: boolean = true;
    public arrowkeys: boolean = true;

    public options: any = {
        hstep: ['1', '2', '3', '4', '5', '6'],
        mstep: ['1', '5', '10', '15', '25', '30']
    };

    private _minHour = 0;
    private _maxHour = 23;
    private _minMinute = 0;
    private _maxMinute = 59;

    get minHour() {
        return this._minHour;
    }
    set minHour(value: number) {
        this._minHour = (value >= 0) ? value : 0;
    }

    get maxHour() {
        return this._maxHour;
    }
    set maxHour(value: number) {
        this._maxHour = (value >= 0) ? value : 0;
    }

    get minMinute() {
        return this._minMinute;
    }
    set minMinute(value: number) {
        this._minMinute = (value >= 0) ? value : 0;
    }

    get maxMinute() {
        return this._maxMinute;
    }
    set maxMinute(value: number) {
        this._maxMinute = (value >= 0) ? value : 0;
    }

    checkModel = {
        input: false,
        mousewheel: false,
        arrowkeys: false
    };

    constructor() {

        this.minTime.setHours(0);
        this.minTime.setMinutes(0);
        this.maxTime.setHours(23);
        this.maxTime.setMinutes(59);
    }

    changed(time: Date): void {
        this.myTime = time;
        console.log('Time changed to: ' + this.myTime);
    }
}
