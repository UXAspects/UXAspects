import { Component } from '@angular/core';
import { ColorService, SliderCalloutTrigger, SliderSize, SliderSnap, SliderStyle, SliderType, SliderValue } from '@ux-aspects/ux-aspects';
import { SliderExample } from './slider-example';

@Component({
    selector: 'sliders-app',
    templateUrl: './sliders.testpage.component.html',
})
export class SlidersTestPageComponent {

    singleValueCustomLabels: SliderExample;
    singleValueCalloutOnDrag: SliderExample;
    singleValueNarrowSnapping: SliderExample;
    singleValueNarrowCalloutOnHover: SliderExample;
    rangeCalloutCustom: SliderExample;
    rangeWithTextInputs: SliderExample;

    lowerValue: number = 25;
    upperValue: number = 75;
    disabled: boolean = false;

    constructor(colorService: ColorService) {

        this.singleValueCustomLabels = {
            value: 50,
            options: {
                track: {
                    ticks: {
                        major: {
                            steps: [0, 50, 100],
                            labels: true,
                            formatter: (value) => {
                                if (value === 0) {
                                    return 'Minimum';
                                }
                                if (value === 50) {
                                    return 'Default';
                                }
                                if (value === 100) {
                                    return 'Maximum';
                                }
                            }
                        },
                        minor: {
                            show: false
                        }
                    }
                }
            }
        };

        this.singleValueCalloutOnDrag = {
            value: 3.8,
            options: {
                handles: {
                    style: SliderStyle.Line,
                    callout: {
                        trigger: SliderCalloutTrigger.Drag,
                        formatter: value => value ? value.toFixed(1) : value
                    }
                },
                track: {
                    min: 1,
                    max: 5,
                    ticks: {
                        major: {
                            steps: [1, 5],
                            labels: true
                        },
                        minor: {
                            steps: 1,
                            labels: false
                        }
                    },
                    colors: {}
                }
            }
        };

        this.singleValueNarrowSnapping = {
            value: 4,
            options: {
                track: {
                    min: 0,
                    max: 5,
                    height: SliderSize.Narrow,
                    ticks: {
                        snap: SliderSnap.All,
                        major: {
                            steps: 5,
                            labels: true
                        },
                        minor: {
                            steps: 1,
                            labels: true
                        }
                    }
                }
            }
        };

        this.singleValueNarrowCalloutOnHover = {
            value: 60,
            options: {
                handles: {
                    style: SliderStyle.Line,
                    callout: {
                        trigger: SliderCalloutTrigger.Hover,
                        formatter: value => value ? value.toFixed(0) : value
                    }
                },
                track: {
                    height: SliderSize.Narrow,
                    ticks: {
                        snap: SliderSnap.All,
                        major: {
                            steps: 50
                        },
                        minor: {
                            steps: 10
                        }
                    },
                    colors: {
                        higher: ['#fdf690', '#f14a50']
                    }
                }
            }
        };

        this.rangeCalloutCustom = {
            value: {
                low: 22,
                high: 76
            },
            options: {
                type: SliderType.Range,
                handles: {
                    style: SliderStyle.Line,
                    callout: {
                        trigger: SliderCalloutTrigger.Hover,
                        background: colorService.getColor('alternate1').toHex(),
                        formatter: value => value ? value.toFixed(0) : value
                    }
                },
                track: {
                    height: SliderSize.Narrow,
                    ticks: {
                        major: {
                            steps: 25
                        },
                        minor: {
                            steps: 5
                        }
                    }
                }
            }
        };

        this.rangeWithTextInputs = {
            value: {
                low: 25,
                high: 75
            },
            options: {
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
                    }
                }
            }
        };
    }

    updateValues(): void {
        this.rangeWithTextInputs.value = this.rangeWithTextInputs.value as SliderValue;

        if (!isNaN(Number(this.lowerValue))) {
            this.rangeWithTextInputs.value.low = Number(this.lowerValue);
        }

        if (!isNaN(Number(this.upperValue))) {
            this.rangeWithTextInputs.value.high = Number(this.upperValue);
        }
    }

    valueHasChanged(value: SliderValue): void {
        this.rangeWithTextInputs.value = value;

        this.lowerValue = value.low;
        this.upperValue = value.high;
    }

    trackColorChange(): void {
        this.singleValueCalloutOnDrag.options = { ...this.singleValueCalloutOnDrag.options };

        this.singleValueCalloutOnDrag.options.track.colors.lower = '#0f0';
        this.singleValueCalloutOnDrag.options.track.colors.higher = '#f00';

        this.rangeCalloutCustom.options = { ...this.rangeCalloutCustom.options };

        this.rangeCalloutCustom.options.track.colors.lower = '#0f0';
        this.rangeCalloutCustom.options.track.colors.range = '#f00';
        this.rangeCalloutCustom.options.track.colors.higher = '#0f0';
    }

    disableSliders(): void {
        this.disabled = true;
    }
}
