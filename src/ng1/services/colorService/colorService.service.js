export default function $colorService() {

	var $colorService = {};

	const defaultTheme = [
		'primary',
		'accent',
		'secondary',
		'alternate1',
		'alternate2',
		'alternate3',
		'vibrant1',
		'vibrant2',
		'grey1',
		'grey2',
		'grey3',
		'grey4',
		'grey5',
		'grey6',
		'grey7',
		'grey8',
		'chart1',
		'chart2',
		'chart3',
		'chart4',
		'chart5',
		'chart6',
		'ok',
		'warning',
		'critical'
	];

	var theme = defaultTheme;
	var html;
	var element;

	function setColors() {

		for (var i = 0; i < theme.length; i++) {
			html += '<div class="' + theme[i] + '-color"></div>';
		}

		element = document.createElement('div');
		element.className = 'color-chart';
		element.innerHTML = html;

		document.body.appendChild(element);
	}

	setColors();

	function getColorValue(color) {
		
		let target = element.querySelector('.' + color + '-color');

		if(!target) {
			throw new Error('Invalid color');
		}

		let colorValue = window.getComputedStyle(target).backgroundColor;

		let rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

		return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);

	}

	var colors = {};

	function getColors() {

		for (var i = 0; i < theme.length; i++) {
			colors[theme[i]] = getColorValue(theme[i]);
		}

		element.parentNode.removeChild(element);
	}

	getColors();

   	$colorService.getColor = function(color) {
	    return colors[color.toLowerCase()];
	};

	$colorService.setTheme = function(customTheme) {
	    theme.push.apply(theme, customTheme);
		setColors();
		getColors();
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

		if(red.length < 2)
			red = "0" + red;
		if(green.length < 2)
			green = "0" + green;
		if(blue.length < 2)
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
}

export const microFocusTheme = [
    'brand-blue',
    'cerulean',
    'aqua',
    'aquamarine',
    'fushsia',
    'indigo',
    'dark-blue',
    'white',
    'slightly-gray',
    'bright-gray',
    'gray',
    'silver',
    'dim-gray',
    'dark-gray',
    'black',
    'crimson-negative',
    'apricot',
    'yellow',
    'green-positive',
    'ultramarine',
    'skyblue',
    'pale-aqua',
    'pale-green',
    'lime',
    'orange',
    'magenta',
    'pale-purple',
    'dark-ultramarine',
    'steelblue',
    'arctic-blue',
    'emerald',
    'olive',
    'goldenrod',
    'purple',
    'pale-eggplant',
    'red',
    'pale-amber',
    'pale-lemon',
    'pale-emerald',
    'plum',
    'coper',
    'amber',
    'leaf-green'
];