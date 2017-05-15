import { Component } from '@angular/core';
import { SliderValue, SliderOptions, ColorService, SliderStyle, SliderCalloutTrigger, SliderSnap, SliderType } from 'ux-aspects';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'my-slider-example',
    templateUrl: './slider.component.html'
})
export class SliderExampleComponent {

    value: SliderValue = {
        low: 25,
        high: 75
    };

    options: SliderOptions;

    lowerValue: BehaviorSubject<number> = new BehaviorSubject<number>(25);
    upperValue: BehaviorSubject<number> = new BehaviorSubject<number>(75);

    constructor(colorService: ColorService) {

        this.options = {
            type: SliderType.Range,
            handles: {
                style: SliderStyle.Line,
                callout: {
                    trigger: SliderCalloutTrigger.Hover,
                    background: colorService.getColor('accent').toHex(),
                    formatter: value => value ? value.toFixed(0) : value
                }
            },
            track: {
                ticks: {
                    snap: SliderSnap.All,
                    major: {
                        steps: 25
                    },
                    minor: {
                        steps: 5
                    }
                },
                colors: {
                    range: colorService.getColor('accent').toHex()
                }
            }
        };

        this.lowerValue.debounceTime(300).distinctUntilChanged().subscribe(value => {

            if (!value || isNaN(Number(value))) {
                return;
            }

            this.value.low = Number(value);
        });

        this.upperValue.debounceTime(300).distinctUntilChanged().subscribe(value => {

            if (!value || isNaN(Number(value))) {
                return;
            }

            this.value.high = Number(value);
        });
    }

    updateValue(value: SliderValue) {
        this.value = value;

        this.lowerValue.next(value.low);
        this.upperValue.next(value.high);
    }

}