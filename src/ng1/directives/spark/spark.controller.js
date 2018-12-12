export default function SparkCtrl($colorService) {
    var sc = this;

    sc.inline = sc.label !== undefined;

    // give the chart a default theme
    sc.type = sc.type || 'spark-chart1';

    // ensure 'value' is an array at this point
    const values = Array.isArray(sc.value) ? sc.value : [sc.value];

    // get the total value of all lines
    let total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);

    // figure out the percentages for each spark line
    sc.values = values.map(val => (val / total) * 100);

    sc.type = $colorService.resolveColorName(sc.type);

    if (sc.barColor) {
        if (Array.isArray(sc.barColor)) {
            sc.barColor = sc.barColor.map(color => $colorService.resolve(color));
        } else {
            sc.barColor = $colorService.resolve(sc.barColor);
        }
    }

    if (sc.trackColor) {
        sc.trackColor = $colorService.resolve(sc.trackColor);
    }

    sc.barColor = Array.isArray(sc.barColor) ? sc.barColor : [sc.barColor];

    sc.styles = {
        height: sc.fillheight + 'px',
        marginTop: (sc.top !== undefined) ? sc.top : 0 + 'px',
        backgroundColor: sc.trackColor
    };

    sc.segmentTooltip = function(index) {
        return Array.isArray(sc.sparkTooltips) && sc.sparkTooltips.length > index ? sc.sparkTooltips[index] : undefined;
    };
}

SparkCtrl.$inject = ['$colorService'];