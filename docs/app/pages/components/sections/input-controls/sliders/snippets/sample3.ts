options: SliderOptions = {
    type: SliderType.Value,
    handles: {
        style: SliderStyle.Button,
        callout: {
            trigger: SliderCalloutTrigger.None,
            background: '#464646',
            color: '#fff',
            formatter: (value: number): string | number => value
        }
    },
    track: {
        height: SliderSize.Wide,
        min: 0,
        max: 100,
        ticks: {
            snap: SliderSnap.None,
            major: {
                show: true,
                steps: 10,
                labels: true,
                formatter: (value: number): string | number => value
            },
            minor: {
                show: true,
                steps: 5,
                labels: false,
                formatter: (value: number): string | number => value
            }
        },
        colors: {
            lower: '#f2f2f2',
            range: 'rgba(96,121,141, 0.75)',
            higher: '#f2f2f2'
        }
    }
};