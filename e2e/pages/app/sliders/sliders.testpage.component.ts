import { Component } from '@angular/core';
import { SliderValue, SliderOptions, ColorService, SliderStyle, SliderCalloutTrigger, SliderSize, SliderSnap, SliderType } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'sliders-app',
  templateUrl: './sliders.testpage.component.html',
})
export class SlidersTestPageComponent {

    slider1: SliderExample;
    slider2: SliderExample;
    slider3: SliderExample;
    slider4: SliderExample;
    slider5: SliderExample;
    slider6: SliderExample;
    slider7: SliderExample;
    slider8: SliderExample;

    lowerValue: number = 25;
    upperValue: number = 75;

    constructor(colorService: ColorService) {

        this.slider1 = {
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

        this.slider2 = {
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
                    }
                }
            }
        };

        this.slider3 = {
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
                    },
                    colors: {
                        lower: colorService.getColor('accent').toHex()
                    }
                }
            }
        };

        this.slider4 = {
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

        this.slider5 = {
            value: {
                low: 1234,
                high: 9876
            },
            options: {
                type: SliderType.Range,
                handles: {
                    callout: {
                        trigger: SliderCalloutTrigger.Persistent,
                        formatter: value => value ? value.toFixed(0) : value
                    }
                },
                track: {
                    height: SliderSize.Narrow,
                    min: 1000,
                    max: 10000,
                    ticks: {
                        major: {
                            show: false
                        },
                        minor: {
                            show: false
                        }
                    }
                }
            }
        };

        this.slider6 = {
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
                    },
                    colors: {
                        range: colorService.getColor('alternate1').toHex()
                    }
                }
            }
        };

        this.slider7 = {
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
                    },
                    colors: {
                        range: colorService.getColor('accent').toHex()
                    }
                }
            }
        };

        this.slider8 = {
            value: {
                low: 1234,
                high: 9876
            },
            options: {
                type: SliderType.Range,
                handles: {
                    callout: {
                        trigger: SliderCalloutTrigger.Dynamic,
                        formatter: value => value ? value.toFixed(0) : value
                    }
                },
                track: {
                    height: SliderSize.Narrow,
                    min: 1000,
                    max: 10000,
                    ticks: {
                        major: {
                            show: false
                        },
                        minor: {
                            show: false
                        }
                    },
                    colors: {
                        range: colorService.getColor('accent').toHex()
                    }
                }
            }
        };
    }

    updateValues(): void {
        this.slider7.value = this.slider7.value as SliderValue;

        if (!isNaN(Number(this.lowerValue))) {
            this.slider7.value.low = Number(this.lowerValue);
        }

        if (!isNaN(Number(this.upperValue))) {
            this.slider7.value.high = Number(this.upperValue);
        }
    }

    valueHasChanged(value: SliderValue): void {
        this.slider7.value = value;

        this.lowerValue = value.low;
        this.upperValue = value.high;
    }

    trackColorChange(): void {
        this.slider5.options = { ...this.slider5.options };

        this.slider5.options.track.colors.lower = '#0f0';
        this.slider5.options.track.colors.range = '#f00';
        this.slider5.options.track.colors.higher = '#0f0';

        this.slider2.options = { ...this.slider2.options };

        this.slider2.options.track.colors.lower = '#0f0';
        this.slider2.options.track.colors.higher = '#f00';
    }
}

interface SliderExample {
    value: number | SliderValue;
    options: SliderOptions;
}
