export default function SparkCtrl() {
    var sc = this;

    sc.inline = sc.label !== undefined;

    sc.setPosition = {
        'height': sc.fillheight + 'px',
        'margin-top': (sc.top !== undefined) ? sc.top : 0 + 'px'
    };

    // if (!Array.isArray(sc.value)) {
    //     sc.value = [sc.value];
    // }

    // calculate the bar widths
    //...
        
        debugger; // jshint ignore: line

        // ensure 'value' is an array at this point
        const values = Array.isArray(sc.value) ? sc.value : [sc.value];

        // get the total value of all lines
        let total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);

        // figure out the percentages for each spark line
        this.values = values.map(val => (val / total) * 100);

        // ensure 'barColor' is an array
        this.barColor = Array.isArray(this.barColor) ? this.barColor : [this.barColor];
    
        return this.values;
    
}