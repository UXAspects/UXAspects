import { Component } from '@angular/core';
import { SliderValue, SliderOptions, ColorService, SliderStyle, SliderCalloutTrigger, SliderSize, SliderSnap, SliderType } from 'ux-aspects';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    slider1: SliderExample;
    slider2: SliderExample;
    slider3: SliderExample;
    slider4: SliderExample;
    slider5: SliderExample;
    slider6: SliderExample;
    slider7: SliderExample;

    lowerValue: BehaviorSubject<number> = new BehaviorSubject<number>(25);
    upperValue: BehaviorSubject<number> = new BehaviorSubject<number>(75);

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
                    },
                    colors: {
                        range: colorService.getColor('accent').toHex()
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
                        background: colorService.getColor('accent').toHex(),
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

        this.lowerValue.debounceTime(300).distinctUntilChanged().subscribe(value => {

            if (!value || isNaN(Number(value))) {
                return;
            }

            (<SliderValue>this.slider7.value).low = Number(value);
        });

        this.upperValue.debounceTime(300).distinctUntilChanged().subscribe(value => {

            if (!value || isNaN(Number(value))) {
                return;
            }

            (<SliderValue>this.slider7.value).high = Number(value);
        });
    }

    updateValue(value: SliderValue) {
        this.slider7.value = value;

        this.lowerValue.next(value.low);
        this.upperValue.next(value.high);
    }

}

interface SliderExample {
    value: number | SliderValue;
    options: SliderOptions;
}