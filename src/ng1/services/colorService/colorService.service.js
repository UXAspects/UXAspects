export default function $colorService() {

	var $colorService = {};
	var colorSet = colorSets.keppel;
	var html;
	var element;
	var colors;

	function setColors() {

		html = '';

		for (let key in colorSet) {
            html += '<div class="' + colorSet[key] + '-color"></div>';
        }

		element = document.createElement('div');
		element.className = 'color-chart';
		element.innerHTML = html;

		document.body.appendChild(element);

		colors = {};

        for (let key in colorSet) {
            colors[key] = getColorValue(colorSet[key]);
        }

		element.parentNode.removeChild(element);
	}

	setColors();

	function getColorValue(color) {
		
		let target = element.querySelector('.' + colorSet[color] + '-color');

		if(!target) {
			throw new Error('Invalid color');
		}

		let colorValue = window.getComputedStyle(target).backgroundColor;

		let rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

		return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);

	}

   	$colorService.getColor = function(color) {
	    return colors[color.toLowerCase()];
	};

	$colorService.setColorSet = function(customColorSet) {
	    colorSet = customColorSet;
		setColors();
	};

	$colorService.getColorSet = function() {
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

export const colorSets = {
	keppel: require('../../../data/keppel-colors.json'),
	microFocus: require('../../../data/micro-focus-colors.json')
};