export default function $colorService() {

	var $colorService = {};

	var html = '<div class="primary-color"></div>'+
				'<div class="accent-color"></div>'+
				'<div class="secondary-color"></div>'+
				'<div class="alternate1-color"></div>'+
				'<div class="alternate2-color"></div>'+
				'<div class="alternate3-color"></div>'+
				'<div class="vibrant1-color"></div>'+
				'<div class="vibrant2-color"></div>'+
				'<div class="grey1-color"></div>'+
				'<div class="grey2-color"></div>'+
				'<div class="grey3-color"></div>'+
				'<div class="grey4-color"></div>'+
				'<div class="grey5-color"></div>'+
				'<div class="grey6-color"></div>'+
				'<div class="grey7-color"></div>'+
				'<div class="grey8-color"></div>'+
				'<div class="chart1-color"></div>'+
				'<div class="chart2-color"></div>'+
				'<div class="chart3-color"></div>'+
				'<div class="chart4-color"></div>'+
				'<div class="chart5-color"></div>'+
				'<div class="chart6-color"></div>'+
				'<div class="ok-color"></div>'+
				'<div class="warning-color"></div>'+
				'<div class="critical-color"></div>'+
				'<div class="partition1-color"></div>'+
				'<div class="partition9-color"></div>'+
				'<div class="partition10-color"></div>'+
				'<div class="partition11-color"></div>'+
				'<div class="partition12-color"></div>'+
				'<div class="partition13-color"></div>'+
				'<div class="partition14-color"></div>'+
				'<div class="social-chart-node-color"></div>'+
				'<div class="social-chart-edge-color"></div>';

	var element = document.createElement('div');
	element.className = 'color-chart';
	element.innerHTML = html;

	document.body.appendChild(element);

	function getColorValue(color) {
		
		let target = element.querySelector('.' + color + '-color');

		if(!target) {
			throw new Error('Invalid color');
		}

		let colorValue = window.getComputedStyle(target).backgroundColor;

		let rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

		return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);

	}

	var colors = {
		primary: getColorValue('primary'),
		accent: getColorValue('accent'),
		secondary: getColorValue('secondary'),
		alternate1: getColorValue('alternate1'),
		alternate2: getColorValue('alternate2'),
		alternate3: getColorValue('alternate3'),
		vibrant1: getColorValue('vibrant1'),
		vibrant2: getColorValue('vibrant2'),
		grey1: getColorValue('grey1'),
		grey2: getColorValue('grey2'),
		grey3: getColorValue('grey3'),
		grey4: getColorValue('grey4'),
		grey5: getColorValue('grey5'),
		grey6: getColorValue('grey6'),
		grey7: getColorValue('grey7'),
		grey8: getColorValue('grey8'),
		chart1: getColorValue('chart1'),
		chart2: getColorValue('chart2'),
		chart3: getColorValue('chart3'),
		chart4: getColorValue('chart4'),
		chart5: getColorValue('chart5'),
		chart6: getColorValue('chart6'),
		ok: getColorValue('ok'),
		warning: getColorValue('warning'),
		critical: getColorValue('critical'),
		partition1: getColorValue('partition1'),
		partition9: getColorValue('partition9'),
		partition10: getColorValue('partition10'),
		partition11: getColorValue('partition11'),
		partition12: getColorValue('partition12'),
		partition13: getColorValue('partition13'),
		partition14: getColorValue('partition14'),
		'social-chart-node': getColorValue('social-chart-node'),
		'social-chart-edge': getColorValue('social-chart-edge')
   	};

   	element.parentNode.removeChild(element);

   	$colorService.getColor = function(color) {
	    return colors[color];
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