import { Component } from '@angular/core';
import {
  ColorService,
  SliderCalloutTrigger,
  SliderOptions,
  SliderSize,
  SliderStyle,
  SliderType,
} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'sliders-thumb-order-app',
  templateUrl: './sliders-thumb-order.testpage.component.html',
  styles: [
    `
      .test-container {
        width: 150px;
        margin-left: 20px;
      }
    `,
  ],
  standalone: false,
})
export class SlidersThumbOrderTestPageComponent {
  standard: SliderOptions;
  minNotZero: SliderOptions;

  lowerValue: number = 25;
  upperValue: number = 75;
  disabled: boolean = false;

  constructor(colorService: ColorService) {
    this.standard = {
      type: SliderType.Range,
      handles: {
        style: SliderStyle.Line,
        callout: {
          trigger: SliderCalloutTrigger.Hover,
          background: colorService.getColor('alternate1').toHex(),
          formatter: value => (value ? value.toFixed(0) : value),
        },
      },
      track: {
        height: SliderSize.Narrow,
        ticks: {
          major: {
            steps: 25,
          },
          minor: {
            steps: 5,
          },
        },
        colors: {
          range: colorService.getColor('alternate1').toHex(),
        },
      },
    };

    this.minNotZero = {
      type: SliderType.Range,
      handles: {
        style: SliderStyle.Line,
        callout: {
          trigger: SliderCalloutTrigger.Hover,
          background: colorService.getColor('alternate1').toHex(),
          formatter: value => (value ? value.toFixed(0) : value),
        },
      },
      track: {
        min: 9900,
        max: 10000,
        ticks: {
          major: {
            steps: 2500,
          },
          minor: {
            steps: 500,
          },
        },
      },
    };
  }
}
