import { Component } from '@angular/core';
import {
    SliderValue, SliderOptions, ColorService, SliderStyle,
    SliderCalloutTrigger, SliderSnap, SliderType
} from '@ux-aspects/ux-aspects';

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

    lowerValue: number = 25;
    upperValue: number = 75;

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
    }

    updateValues() {

        if (!isNaN(Number(this.lowerValue))) {
            this.value.low = Number(this.lowerValue);
        }

        if (!isNaN(Number(this.upperValue))) {
            this.value.high = Number(this.upperValue);
        }
    }

    valueHasChanged(value: SliderValue) {
        this.value = value;

        this.lowerValue = value.low.toString();
        this.upperValue = value.high.toString();
    }

}