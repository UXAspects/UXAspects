import { Component } from '@angular/core';
import { SliderCalloutTrigger, SliderSize, SliderType } from '@ux-aspects/ux-aspects';
import { SliderExample } from '../slider-example';

@Component({
  selector: 'sliders-persistent-callout',
  templateUrl: 'sliders-persistent-callout.component.html',
  standalone: false,
})
export class SlidersPersistentCalloutTestPageComponent {
  rangeCallout: SliderExample;
  rangeCalloutOnDrag: SliderExample;

  constructor() {
    this.rangeCallout = {
      value: {
        low: 1234,
        high: 9876,
      },
      options: {
        type: SliderType.Range,
        handles: {
          callout: {
            trigger: SliderCalloutTrigger.Persistent,
            formatter: value => (value ? value.toFixed(0) : value),
          },
        },
        track: {
          height: SliderSize.Narrow,
          min: 1000,
          max: 10000,
          ticks: {
            major: {
              show: false,
            },
            minor: {
              show: false,
            },
          },
          colors: {},
        },
      },
    };

    this.rangeCalloutOnDrag = {
      value: {
        low: 1234,
        high: 9876,
      },
      options: {
        type: SliderType.Range,
        handles: {
          callout: {
            trigger: SliderCalloutTrigger.Dynamic,
            formatter: value => (value ? value.toFixed(0) : value),
          },
        },
        track: {
          height: SliderSize.Narrow,
          min: 1000,
          max: 10000,
          ticks: {
            major: {
              show: false,
            },
            minor: {
              show: false,
            },
          },
        },
      },
    };
  }
}
