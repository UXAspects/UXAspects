import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SliderValue, SliderOptions, ColorService, SliderStyle, SliderCalloutTrigger, SliderSize, SliderSnap, SliderType } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-sliders',
    templateUrl: './sliders.component.html'
})
@DocumentationSectionComponent('ComponentsSlidersComponent')
export class ComponentsSlidersComponent extends BaseDocumentationSection implements IPlunkProvider {

    slider1: SliderExample;
    slider2: SliderExample;
    slider3: SliderExample;
    slider4: SliderExample;
    slider5: SliderExample;
    slider6: SliderExample;
    slider7: SliderExample;

    lowerValue: string;
    upperValue: string;

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml
        },
        modules: [{
            imports: ['SliderModule', 'ColorServiceModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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
                    },
                    keyboard: {
                        step: 50
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
    }

    updateValues() {
        this.slider7.value = this.slider7.value as SliderValue;

        if (!isNaN(Number(this.lowerValue))) {
            this.slider7.value.low = Number(this.lowerValue);
        }

        if (!isNaN(Number(this.upperValue))) {
            this.slider7.value.high = Number(this.upperValue);
        }
    }

    valueHasChanged(value: SliderValue) {
        this.slider7.value = value;

        this.lowerValue = value.low.toString();
        this.upperValue = value.high.toString();
    }

}

interface SliderExample {
    value: number | SliderValue;
    options: SliderOptions;
}