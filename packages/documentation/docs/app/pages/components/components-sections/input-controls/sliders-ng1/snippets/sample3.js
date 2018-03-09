vm.options = {
    type: 'value',
    handles: {
        style: 'button',
        callout: {
            trigger: 'none',
            background: '#464646',
            color: '#fff',
            formatter: function (value) {
                return value;
            }
        }
    },
    track: {
        height: 'wide',
        min: 0,
        max: 100,
        ticks: {
            snap: 'none',
            major: {
                show: true,
                steps: 10,
                labels: true,
                formatter: function (value) {
                    return value;
                }
            },
            minor: {
                show: true,
                steps: 5,
                labels: false,
                formatter: function (value) {
                    return value;
                }
            }
        },
        colors: {
            lower: '#f2f2f2',
            range: '#7b63a3',
            higher: '#f2f2f2'
        }
    }
};