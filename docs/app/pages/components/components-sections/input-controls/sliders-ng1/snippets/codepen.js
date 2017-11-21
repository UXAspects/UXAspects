angular.module('app').controller('SlidersCtrl', SlidersCtrl);

SlidersCtrl.$inject = ['$colorService'];

function SlidersCtrl($colorService) {
    var vm = this;

    vm.slider1 = {
        value: 50,
        options: {
            track: {
                ticks: {
                    major: {
                        steps: [0, 50, 100],
                        labels: true,
                        formatter: function (value) {
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

    vm.slider2 = {
        value: 3.8,
        options: {
            handles: {
                style: 'line',
                callout: {
                    trigger: 'drag',
                    formatter: function (value) {
                        return value ? value.toFixed(1) : value;
                    }
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

    vm.slider3 = {
        value: 4,
        options: {
            track: {
                min: 0,
                max: 5,
                height: 'narrow',
                ticks: {
                    snap: 'all',
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
                    lower: $colorService.getColor('accent').toHex()
                }
            }
        }
    };

    vm.slider4 = {
        value: 60,
        options: {
            handles: {
                style: 'line',
                callout: {
                    trigger: 'hover',
                    formatter: function (value) {
                        return value ? parseInt(value) : value;
                    }
                }
            },
            track: {
                height: 'narrow',
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

    vm.slider5 = {
        value: {
            low: 1234,
            high: 9876
        },
        options: {
            type: 'range',
            handles: {
                callout: {
                    trigger: 'persistent',
                    formatter: function (value) {
                        return value ? parseInt(value) : value;
                    }
                }
            },
            track: {
                height: 'narrow',
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
                    range: $colorService.getColor('accent').toHex()
                }
            }
        }
    };

    vm.slider6 = {
        value: {
            low: 22,
            high: 76
        },
        options: {
            type: 'range',
            handles: {
                style: 'line',
                callout: {
                    trigger: 'hover',
                    background: $colorService.getColor('accent').toHex(),
                    formatter: function (value) {
                        return value ? parseInt(value) : value;
                    }
                }
            },
            track: {
                height: 'narrow',
                ticks: {
                    major: {
                        steps: 25
                    },
                    minor: {
                        steps: 5
                    }
                },
                colors: {
                    range: $colorService.getColor('alternate1').toHex()
                }
            }
        }
    };

    vm.slider7 = {
        value: {
            low: 25,
            high: 75
        },
        options: {
            type: 'range',
            handles: {
                style: 'line',
                callout: {
                    trigger: 'hover',
                    background: $colorService.getColor('accent').toHex(),
                    formatter: function (value) {
                        return value ? parseInt(value) : value;
                    }
                }
            },
            track: {
                ticks: {
                    snap: 'all',
                    major: {
                        steps: 25
                    },
                    minor: {
                        steps: 5
                    }
                },
                colors: {
                    range: $colorService.getColor('accent').toHex()
                }
            }
        }
    };
}