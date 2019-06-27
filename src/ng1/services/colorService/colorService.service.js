export default function $colorService() {

    var $colorService = {};
    var colorSet = colorSets.keppel;
    var colors = {};

    for (const key in colorSet.colorValueSet) {
        colors[key] = getColorValueByHex(colorSet.colorValueSet[key]);
    }

    function getColorValueByHex(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16).toString();
        const g = parseInt(hex.substring(2, 4), 16).toString();
        const b = parseInt(hex.substring(4, 6), 16).toString();

        return new ThemeColor(r, g, b, '1');
    }

    $colorService.getColor = function (color) {
        const themeColor = colors[$colorService.resolveColorName(color)];
        if (!themeColor) {
            throw new Error('Color not found: ' + color);
        }

        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    };

    $colorService.setColorSet = function (customColorSet) {

        if (typeof customColorSet === 'string') {
            customColorSet = colorSets[customColorSet] || {};
        }

        colorSet = customColorSet;
        colors = {};

        for (const key in colorSet.colorValueSet) {
            colors[key] = getColorValueByHex(colorSet.colorValueSet[key]);
        }
    };

    $colorService.resolve = function resolve(value) {
        if (!value) {
            return;
        }

        const colorName = value.replace(/\s+/g, '-').toLowerCase();

        for (const color in colors) {
            if (colorName === color.toLowerCase()) {
                return $colorService.getColor(colorName).toRgba();
            }
        }

        return value;
    };

    $colorService.resolveColorName = function resolveColorName(value) {
        return value.replace(/\s+/g, '-').toLowerCase();
    };

    $colorService.getColorSet = function () {
        return colorSet;
    };

    return $colorService;

}

class ThemeColor {

    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a === undefined ? 1 : a;
    }

    toHex() {
        var red = parseInt(this.r).toString(16);
        var green = parseInt(this.g).toString(16);
        var blue = parseInt(this.b).toString(16);

        if (red.length < 2)
            red = "0" + red;
        if (green.length < 2)
            green = "0" + green;
        if (blue.length < 2)
            blue = "0" + blue;

        return '#' + red + green + blue;
    }

    toRgb() {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }

    toRgba() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }

    setRed(red) {
        this.r = red;
        return this;
    }

    setGreen(green) {
        this.g = green;
        return this;
    }

    setBlue(blue) {
        this.b = blue;
        return this;
    }

    setAlpha(alpha) {
        this.a = alpha;
        return this;
    }

    getRed() {
        return this.r;
    }

    getGreen() {
        return this.g;
    }

    getBlue() {
        return this.b;
    }

    getAlpha() {
        return this.a;
    }
}

export const colorSets = {
    keppel: {
        colorValueSet: {
            'primary': '#00a7a2',
            'accent': '#7b63a3',
            'secondary': '#ffffff',
            'alternate1': '#3baa43',
            'alternate2': '#025662',
            'alternate3': '#b08f5c',
            'vibrant1': '#00cceb',
            'vibrant2': '#ff9048',
            'grey1': '#2a2a2a',
            'grey2': '#333333',
            'grey3': '#666666',
            'grey4': '#999999',
            'grey5': '#cccccc',
            'grey6': '#eeeeee',
            'grey7': '#f5f5f5',
            'grey8': '#fafafa',
            'chart1': '#00a7a2',
            'chart2': '#7b63a3',
            'chart3': '#3baa43',
            'chart4': '#025662',
            'chart5': '#b08f5c',
            'chart6': '#cccccc',
            'ok': '#3baa43',
            'warning': '#ff9048',
            'critical': '#ff454f',
            'partition1': '#635387',
            'partition9': '#4a4066',
            'partition10': '#308935',
            'partition11': '#023e42',
            'partition12': '#91744d',
            'partition13': '#999999',
            'partition14': '#294266',
            'social-chart-node': '#00cceb',
            'social-chart-edge': '#00cceb'
        }
    },
    microFocus: {
        colorValueSet: {
            'cerulean': '#1668c1',
            'aqua': '#29ceff',
            'aquamarine': '#2fd6c3',
            'fuchsia': '#c6179d',
            'indigo': '#7425ad',
            'dark-blue': '#231ca5',
            'white': '#ffffff',
            'slightly-gray': '#f5f7f8',
            'bright-gray': '#f1f2f3',
            'gray': '#dcdedf',
            'silver': '#bdbec0',
            'dim-gray': '#656668',
            'dark-gray': '#323435',
            'black': '#000000',
            'crimson-negative': '#e5004c',
            'apricot': '#f48b34',
            'yellow': '#fcdb1f',
            'green-positive': '#1aac60',
            'ultramarine': '#3939c6',
            'skyblue': '#00abf3',
            'pale-aqua': '#43e4ff',
            'pale-green': '#1ffbba',
            'lime': '#75da4d',
            'orange': '#ffce00',
            'magenta': '#eb23c2',
            'pale-purple': '#ba47e2',
            'dark-ultramarine': '#271782',
            'steelblue': '#014272',
            'arctic-blue': '#0b8eac',
            'emerald': '#00a989',
            'olive': '#5bba36',
            'goldenrod': '#ffb000',
            'purple': '#9b1e83',
            'pale-eggplant': '#5216ac',
            'red': '#ff454f',
            'pale-amber': '#ffb24d',
            'pale-lemon': '#fde159',
            'pale-emerald': '#33c180',
            'plum': '#b21646',
            'copper': '#e57828',
            'amber': '#ffc002',
            'leaf-green': '#118c4f',
            'forest-green': '#00645a',
            'primary': '#0073e7',
            'accent': '#7425ad',
            'secondary': '#ffffff',
            'alternate1': '#29ceff',
            'alternate2': '#2fd6c3',
            'alternate3': '#c6179d',
            'vibrant1': '#43e4ff',
            'vibrant2': '#ffce00',
            'grey1': '#000000',
            'grey2': '#323435',
            'grey3': '#656668',
            'grey4': '#bdbec0',
            'grey5': '#dcdedf',
            'grey6': '#f1f2f3',
            'grey7': '#f5f7f8',
            'grey8': '#ffffff',
            'chart1': '#3939c6',
            'chart2': '#00abf3',
            'chart3': '#75da4d',
            'chart4': '#ffce00',
            'chart5': '#eb23c2',
            'chart6': '#ba47e2',
            'ok': '#1aac60',
            'warning': '#f48b34',
            'critical': '#e5004c',
            'partition1': '#7425ad',
            'partition9': '#5216ac',
            'partition10': '#5bba36',
            'partition11': '#014272',
            'partition12': '#ffb000',
            'partition13': '#bdbec0',
            'partition14': '#271782',
            'social-chart-node': '#ff00ff',
            'social-chart-edge': '#ff00f'
        }
    }
};