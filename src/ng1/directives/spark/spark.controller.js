export default class SparkCtrl {

    // give the chart a default theme
    get _type() {
        return this.$colorService.resolveColorName(this.type || 'spark-chart1');
    }

    // determine if the label should be displayed inline
    get _inline() {
        return this.label !== undefined;
    }

    // get the value or values as an array
    get _values() {
        // ensure 'value' is an array at this point
        const values = Array.isArray(this.value) ? this.value : [this.value];

        // get the total value of all lines
        const total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);

        // figure out the percentages for each spark line
        return values.map(val => (val / total) * 100);
    }

    get _trackColor() {
        if (this.trackColor) {
            return this.$colorService.resolve(this.trackColor);
        }
    }

    get _barColor() {

        if (!this.barColor) {
            return;
        }

        if (Array.isArray(this.barColor)) {
            return this.barColor.map(color => this.$colorService.resolve(color));
        } else {
            return [this.$colorService.resolve(this.barColor)];
        }
    }

    get _styles() {
        return {
            height: this.fillheight + 'px',
            marginTop: (this.top !== undefined) ? this.top : 0 + 'px',
            backgroundColor: this._trackColor
        };
    }

    constructor($colorService) {
        this.$colorService = $colorService;
    }

    segmentTooltip(index) {
        return Array.isArray(this.sparkTooltips) && this.sparkTooltips.length > index ? this.sparkTooltips[index] : undefined;
    }

    onSegmentClick(index) {
        if (typeof this.segmentClick === 'function') {
            this.segmentClick(index);
        }
    }
}

SparkCtrl.$inject = ['$colorService'];