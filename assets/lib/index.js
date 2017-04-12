(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"), require("@angular/platform-browser"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/common", "@angular/platform-browser"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@angular/core"), require("@angular/forms"), require("@angular/common"), require("@angular/platform-browser")) : factory(root["@angular/core"], root["@angular/forms"], root["@angular/common"], root["@angular/platform-browser"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_33__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ThemeColor; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ColorService = (function () {
    function ColorService(document) {
        this.html = '<div class="primary-color"></div>' +
            '<div class="accent-color"></div>' +
            '<div class="secondary-color"></div>' +
            '<div class="alternate1-color"></div>' +
            '<div class="alternate2-color"></div>' +
            '<div class="alternate3-color"></div>' +
            '<div class="vibrant1-color"></div>' +
            '<div class="vibrant2-color"></div>' +
            '<div class="grey1-color"></div>' +
            '<div class="grey2-color"></div>' +
            '<div class="grey3-color"></div>' +
            '<div class="grey4-color"></div>' +
            '<div class="grey5-color"></div>' +
            '<div class="grey6-color"></div>' +
            '<div class="grey7-color"></div>' +
            '<div class="grey8-color"></div>' +
            '<div class="chart1-color"></div>' +
            '<div class="chart2-color"></div>' +
            '<div class="chart3-color"></div>' +
            '<div class="chart4-color"></div>' +
            '<div class="chart5-color"></div>' +
            '<div class="chart6-color"></div>' +
            '<div class="ok-color"></div>' +
            '<div class="warning-color"></div>' +
            '<div class="critical-color"></div>';
        this.element = document.createElement('div');
        this.element.className = 'color-chart';
        this.element.innerHTML = this.html;
        document.body.appendChild(this.element);
        this.colors = {
            primary: this.getColorValue('primary'),
            accent: this.getColorValue('accent'),
            secondary: this.getColorValue('secondary'),
            alternate1: this.getColorValue('alternate1'),
            alternate2: this.getColorValue('alternate2'),
            alternate3: this.getColorValue('alternate3'),
            vibrant1: this.getColorValue('vibrant1'),
            vibrant2: this.getColorValue('vibrant2'),
            grey1: this.getColorValue('grey1'),
            grey2: this.getColorValue('grey2'),
            grey3: this.getColorValue('grey3'),
            grey4: this.getColorValue('grey4'),
            grey5: this.getColorValue('grey5'),
            grey6: this.getColorValue('grey6'),
            grey7: this.getColorValue('grey7'),
            grey8: this.getColorValue('grey8'),
            chart1: this.getColorValue('chart1'),
            chart2: this.getColorValue('chart2'),
            chart3: this.getColorValue('chart3'),
            chart4: this.getColorValue('chart4'),
            chart5: this.getColorValue('chart5'),
            chart6: this.getColorValue('chart6'),
            ok: this.getColorValue('ok'),
            warning: this.getColorValue('warning'),
            critical: this.getColorValue('critical')
        };
        this.element.parentNode.removeChild(this.element);
    }
    ColorService.prototype.getColorValue = function (color) {
        var target = this.element.querySelector('.' + color + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        var colorValue = window.getComputedStyle(target).backgroundColor;
        var rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    };
    ColorService.prototype.getColor = function (color) {
        return this.colors[color];
    };
    return ColorService;
}());
ColorService = __decorate([
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["DOCUMENT"]))
], ColorService);

var ThemeColor = (function () {
    function ThemeColor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a === undefined ? '1' : a;
    }
    ThemeColor.prototype.toHex = function () {
        var red = parseInt(this.r).toString(16);
        var green = parseInt(this.g).toString(16);
        var blue = parseInt(this.b).toString(16);
        if (red.length < 2) {
            red = '0' + red;
        }
        if (green.length < 2) {
            green = '0' + green;
        }
        if (blue.length < 2) {
            blue = '0' + blue;
        }
        return '#' + red + green + blue;
    };
    ThemeColor.prototype.toRgb = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };
    ThemeColor.prototype.toRgba = function () {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    };
    ThemeColor.prototype.setRed = function (red) {
        this.r = red;
        return this;
    };
    ThemeColor.prototype.setGreen = function (green) {
        this.g = green;
        return this;
    };
    ThemeColor.prototype.setBlue = function (blue) {
        this.b = blue;
        return this;
    };
    ThemeColor.prototype.setAlpha = function (alpha) {
        this.a = alpha;
        return this;
    };
    return ThemeColor;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkbox_component__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    return CheckboxModule;
}());
CheckboxModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__checkbox_component__["a" /* CheckboxComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__checkbox_component__["a" /* CheckboxComponent */]]
    })
], CheckboxModule);



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ebox_component__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EboxModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var EboxModule = (function () {
    function EboxModule() {
    }
    return EboxModule;
}());
EboxModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        exports: [__WEBPACK_IMPORTED_MODULE_1__ebox_component__["a" /* EboxComponent */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["b" /* EboxContentDirective */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["c" /* EboxHeaderDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__ebox_component__["a" /* EboxComponent */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["b" /* EboxContentDirective */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["c" /* EboxHeaderDirective */]]
    })
], EboxModule);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlippableCardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FlippableCardModule = (function () {
    function FlippableCardModule() {
    }
    return FlippableCardModule;
}());
FlippableCardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        exports: [__WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["a" /* FlippableCardComponent */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["b" /* FlippableCardBackDirective */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["c" /* FlippableCardFrontDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["a" /* FlippableCardComponent */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["b" /* FlippableCardBackDirective */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["c" /* FlippableCardFrontDirective */]]
    })
], FlippableCardModule);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progressbar_component__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    return ProgressBarModule;
}());
ProgressBarModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        exports: [__WEBPACK_IMPORTED_MODULE_1__progressbar_component__["a" /* ProgressBarComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__progressbar_component__["a" /* ProgressBarComponent */]]
    })
], ProgressBarModule);



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__radiobutton_component__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioButtonModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__radiobutton_component__["a" /* RadioButtonComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__radiobutton_component__["a" /* RadioButtonComponent */]]
    })
], RadioButtonModule);



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spark_component__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparkModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SparkModule = (function () {
    function SparkModule() {
    }
    return SparkModule;
}());
SparkModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__spark_component__["a" /* SparkComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__spark_component__["a" /* SparkComponent */]]
    })
], SparkModule);



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleSwitchModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ToggleSwitchModule = (function () {
    function ToggleSwitchModule() {
    }
    return ToggleSwitchModule;
}());
ToggleSwitchModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__["a" /* ToggleSwitchComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__["a" /* ToggleSwitchComponent */]]
    })
], ToggleSwitchModule);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_service__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorServiceModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ColorServiceModule = (function () {
    function ColorServiceModule() {
    }
    return ColorServiceModule;
}());
ColorServiceModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [],
        exports: [],
        declarations: [],
        providers: [__WEBPACK_IMPORTED_MODULE_1__color_service__["a" /* ColorService */]],
    })
], ColorServiceModule);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* unused harmony export CHECKBOX_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CHECKBOX_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CheckboxComponent; }),
    multi: true
};
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this.name = '';
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            // invoke change event
            this.valueChange.emit(this._value);
            // call callback
            this.onChangeCallback(this._value);
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.toggleChecked = function () {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    };
    CheckboxComponent.prototype.keyDown = function (event) {
        // if spacebar key is pressed
        if (event.keyCode === 32) {
            // then toggle the checkbox
            this.toggleChecked();
            // prevent default browser behavior
            event.stopPropagation();
            event.preventDefault();
        }
    };
    // Functions required to update ngModel
    CheckboxComponent.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return CheckboxComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "clickable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "simplified", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "indeterminateValue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])()
], CheckboxComponent.prototype, "valueChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], CheckboxComponent.prototype, "value", null);
CheckboxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-checkbox',
        template: __webpack_require__(25),
        styles: [__webpack_require__(18)],
        providers: [CHECKBOX_VALUE_ACCESSOR],
        host: {
            '(click)': 'toggleChecked()'
        }
    })
], CheckboxComponent);



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EboxComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EboxHeaderDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EboxContentDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EboxComponent = (function () {
    function EboxComponent() {
    }
    return EboxComponent;
}());
EboxComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-ebox',
        template: __webpack_require__(26),
        styles: [__webpack_require__(19)]
    })
], EboxComponent);

var EboxHeaderDirective = (function () {
    function EboxHeaderDirective() {
    }
    return EboxHeaderDirective;
}());
EboxHeaderDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'ux-ebox-header'
    })
], EboxHeaderDirective);

var EboxContentDirective = (function () {
    function EboxContentDirective() {
    }
    return EboxContentDirective;
}());
EboxContentDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'ux-ebox-content'
    })
], EboxContentDirective);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlippableCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FlippableCardFrontDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FlippableCardBackDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FlippableCardComponent = (function () {
    function FlippableCardComponent() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flippedState = false;
    }
    FlippableCardComponent.prototype.setFlippedState = function (isFlipped) {
        this.flippedState = isFlipped;
    };
    FlippableCardComponent.prototype.clickTrigger = function () {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click' && this.flippedState === false) {
            this.setFlippedState(true);
        }
        else if (this.trigger === 'click' && this.flippedState === true) {
            this.setFlippedState(false);
        }
    };
    FlippableCardComponent.prototype.hoverEnter = function () {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlippedState(true);
        }
    };
    FlippableCardComponent.prototype.hoverExit = function () {
        if (this.trigger === 'hover') {
            this.setFlippedState(false);
        }
    };
    return FlippableCardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], FlippableCardComponent.prototype, "direction", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], FlippableCardComponent.prototype, "trigger", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], FlippableCardComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], FlippableCardComponent.prototype, "height", void 0);
FlippableCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-flippable-card',
        template: __webpack_require__(27),
        styles: [__webpack_require__(20)],
        host: {
            '[class.horizontal]': 'direction === "horizontal"',
            '[class.vertical]': 'direction === "vertical"',
            '(click)': 'clickTrigger()',
            '(mouseenter)': 'hoverEnter()',
            '(mouseleave)': 'hoverExit()'
        }
    })
], FlippableCardComponent);

var FlippableCardFrontDirective = (function () {
    function FlippableCardFrontDirective() {
    }
    return FlippableCardFrontDirective;
}());
FlippableCardFrontDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'ux-flippable-card-front'
    })
], FlippableCardFrontDirective);

var FlippableCardBackDirective = (function () {
    function FlippableCardBackDirective() {
    }
    return FlippableCardBackDirective;
}());
FlippableCardBackDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: 'ux-flippable-card-back'
    })
], FlippableCardBackDirective);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.max = 100;
        this.trackColor = '#f5f5f5';
        this.barColor = '#60798d';
    }
    return ProgressBarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ProgressBarComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ProgressBarComponent.prototype, "max", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ProgressBarComponent.prototype, "trackColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ProgressBarComponent.prototype, "barColor", void 0);
ProgressBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-progressbar',
        template: __webpack_require__(28),
        styles: [__webpack_require__(21)]
    })
], ProgressBarComponent);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* unused harmony export RADIOBUTTON_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioButtonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RADIOBUTTON_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return RadioButtonComponent; }),
    multi: true
};
var RadioButtonComponent = (function () {
    function RadioButtonComponent() {
        this.simplified = false;
        this.disabled = false;
        this.name = '';
        this.clickable = true;
        this.model = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    RadioButtonComponent.prototype.checkItem = function () {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        // toggle the checked state
        this.model = this.option;
        // call callback
        this.onChangeCallback(this.model);
    };
    RadioButtonComponent.prototype.keyDown = function (event) {
        // if spacebar key is pressed
        if (event.keyCode === 32) {
            // then toggle the checkbox
            this.checkItem();
            // prevent default browser behavior
            event.stopPropagation();
            event.preventDefault();
        }
    };
    // Functions required to update ng-model
    RadioButtonComponent.prototype.writeValue = function (value) {
        if (value !== this.model) {
            this.model = value;
        }
    };
    RadioButtonComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    RadioButtonComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return RadioButtonComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "simplified", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "disabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "clickable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "option", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], RadioButtonComponent.prototype, "id", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', [])
], RadioButtonComponent.prototype, "checkItem", null);
RadioButtonComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-radiobutton',
        template: __webpack_require__(29),
        styles: [__webpack_require__(22)],
        providers: [RADIOBUTTON_VALUE_ACCESSOR]
    })
], RadioButtonComponent);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparkComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SparkComponent = (function () {
    function SparkComponent() {
        // TODO: use color service
        this.trackColor = 'rgba(0, 167, 162, 0.2)';
        this.barColor = '#00a7a2';
        this.fillHeight = 10;
    }
    return SparkComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "trackColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "barColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "value", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "fillHeight", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "inlineLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "topLeftLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "topRightLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "bottomLeftLabel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], SparkComponent.prototype, "bottomRightLabel", void 0);
SparkComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-spark',
        template: __webpack_require__(30),
        styles: [__webpack_require__(23)]
    })
], SparkComponent);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleSwitchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return ToggleSwitchComponent; }),
    multi: true
};
var ToggleSwitchComponent = (function () {
    function ToggleSwitchComponent() {
        this.name = '';
        this.disabled = false;
        this.clickable = true;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(ToggleSwitchComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            // Update value output
            this.valueChange.emit(value);
            // Notify ngModel
            this.onChangeCallback(value);
        },
        enumerable: true,
        configurable: true
    });
    ToggleSwitchComponent.prototype.toggleChecked = function () {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    };
    ToggleSwitchComponent.prototype.keydown = function (event) {
        // if spacebar is pressed toggle state
        if (event.keyCode === 32) {
            this.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    ToggleSwitchComponent.prototype.writeValue = function (value) {
        this.value = !!value;
    };
    ToggleSwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    ToggleSwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return ToggleSwitchComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ToggleSwitchComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ToggleSwitchComponent.prototype, "disabled", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ToggleSwitchComponent.prototype, "clickable", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])()
], ToggleSwitchComponent.prototype, "valueChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])()
], ToggleSwitchComponent.prototype, "value", null);
ToggleSwitchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ux-toggleswitch',
        template: __webpack_require__(31),
        styles: [__webpack_require__(24)],
        providers: [TOGGLESWITCH_VALUE_ACCESSOR],
        host: {
            '(click)': 'toggleChecked()'
        }
    })
], ToggleSwitchComponent);



/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-block;\n  margin-bottom: 5px;\n  white-space: nowrap;\n}\n.ux-checkbox {\n  display: inline-flex;\n  color: transparent;\n  font-family: 'hpe-icons';\n  width: 24px;\n  height: 24px;\n  background-color: transparent;\n  cursor: pointer;\n  border: 1px solid #cccccc;\n  margin-top: 1px;\n  font-size: 16px;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.ux-checkbox:before {\n  content: \"\\f12c\";\n}\n.ux-checkbox:focus {\n  outline: 1px dotted #2a2a2a;\n}\n:host:hover .ux-checkbox {\n  border: 2px solid #7b63a3;\n}\n:host:hover .ux-checkbox.ux-disabled {\n  border: 1px solid #eeeeee;\n}\n:host:hover .ux-checkbox.ux-simplified {\n  color: #cccccc;\n  border-color: transparent;\n  border-width: 1px;\n}\n:host:hover .ux-checkbox.ux-simplified.ux-disabled {\n  color: transparent;\n}\n:host:hover .ux-checkbox.ux-simplified.ux-checked,\n:host:hover .ux-checkbox.ux-simplified.ux-indeterminate {\n  color: #7b63a3;\n}\n:host:hover .ux-checkbox.ux-simplified.ux-checked.ux-disabled,\n:host:hover .ux-checkbox.ux-simplified.ux-indeterminate.ux-disabled {\n  color: #cccccc;\n}\ninput[type=\"checkbox\"] {\n  display: none;\n}\n.ux-checkbox.ux-indeterminate:before {\n  content: \"\\f20b\";\n}\n.ux-checkbox.ux-checked,\n.ux-checkbox.ux-indeterminate {\n  background-color: #7b63a3;\n  color: #ffffff;\n  border-color: transparent;\n}\n.ux-checkbox.ux-disabled {\n  border-color: #eeeeee;\n  cursor: default;\n}\n.ux-checkbox.ux-disabled:focus {\n  outline: none;\n}\n.ux-checkbox.ux-disabled.ux-checked,\n.ux-checkbox.ux-disabled.ux-indeterminate {\n  background-color: #eeeeee;\n}\n.ux-checkbox.ux-simplified {\n  font-size: 20px;\n  border-color: transparent;\n  background-color: transparent;\n}\n.ux-checkbox.ux-simplified.ux-checked,\n.ux-checkbox.ux-simplified.ux-indeterminate {\n  color: #7b63a3;\n  background-color: transparent;\n  border-color: transparent;\n}\n.ux-checkbox.ux-simplified.ux-disabled.ux-checked,\n.ux-checkbox.ux-simplified.ux-disabled.ux-indeterminate {\n  color: #cccccc;\n}\n.ux-checkbox-content {\n  display: inline-block;\n  margin-left: 7px;\n  margin-top: 1px;\n  white-space: normal;\n  vertical-align: bottom;\n  height: 24px;\n  cursor: default;\n  line-height: 22px;\n}\n"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n}\n.ux-ebox-header {\n  position: relative;\n  background-color: #ffffff;\n  margin-bottom: 0;\n  overflow: hidden;\n  padding: 14px 15px 7px;\n}\n.ux-ebox-header h1,\n.ux-ebox-header h2,\n.ux-ebox-header h3,\n.ux-ebox-header h4,\n.ux-ebox-header h5,\n.ux-ebox-header h6 {\n  margin-top: 0;\n}\n.ux-ebox-content {\n  background-color: #ffffff;\n  padding: 15px 20px 20px 20px;\n  border-color: #eeeeee;\n  border-image: none;\n  border-style: solid solid none;\n  border-width: 1px 0px;\n}\n"

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = ":host {\n  perspective: 1000px;\n  transform-style: preserve-3d;\n  display: inline-block;\n}\n:host .ux-flipper.ux-flip-card {\n  transform: none;\n}\n:host .ux-flipper.ux-flip-card .ux-flippable-card-back {\n  transform: rotateY(0deg);\n}\n:host .ux-flipper.ux-flip-card .ux-flippable-card-front {\n  transform: rotateY(180deg);\n}\n:host.vertical {\n  position: relative;\n}\n:host.vertical .ux-flippable-card-back {\n  transform: rotateX(180deg);\n}\n:host.vertical .ux-flipper.ux-flip-card {\n  transform: none;\n}\n:host.vertical .ux-flipper.ux-flip-card .ux-flippable-card-back {\n  transform: rotateX(0deg);\n}\n:host.vertical .ux-flipper.ux-flip-card .ux-flippable-card-front {\n  transform: rotateX(-180deg);\n}\n/* flip speed */\n.ux-flipper {\n  transition: 0.6s;\n  transform-style: preserve-3d;\n  position: relative;\n}\n.hover-flipper .ux-flippable-card-front,\n.hover-flipper .ux-flippable-card-back {\n  transition-delay: 0.3s;\n}\n/* hide back of pane during swap */\n.ux-flippable-card-front,\n.ux-flippable-card-back {\n  backface-visibility: hidden;\n  transition: 0.6s;\n  transform-style: flat;\n  position: absolute;\n  top: 0;\n  left: 0;\n  box-shadow: 0px 2px 10px #999999;\n  background-color: #ffffff;\n}\n/* front pane, placed above back */\n.ux-flippable-card-front {\n  z-index: 2;\n  transform: rotateY(0deg);\n}\n/* back, initially hidden pane */\n.ux-flippable-card-back {\n  transform: rotateY(-180deg);\n}\n"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  height: 20px;\n  margin-bottom: 20px;\n  overflow: hidden;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.progressbar-track {\n  float: left;\n  width: 0;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #ffffff;\n  text-align: center;\n  background-color: #7b63a3;\n  font-size: 14px;\n  -webkit-transition: width .6s ease;\n  -o-transition: width .6s ease;\n  transition: width .6s ease;\n}\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: inline-block;\n  margin-bottom: 5px;\n  white-space: nowrap;\n}\n.ux-radio-button {\n  display: inline-flex;\n  color: transparent;\n  font-family: 'hpe-icons';\n  width: 24px;\n  height: 24px;\n  background-color: transparent;\n  cursor: pointer;\n  border: 1px solid #cccccc;\n  margin-top: 1px;\n  font-size: 16px;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  box-sizing: border-box;\n  border-radius: 50%;\n}\n.ux-radio-button:before {\n  content: \"\\f12c\";\n}\n.ux-radio-button:focus {\n  outline: 1px dotted #2a2a2a;\n}\n:host:hover .ux-radio-button {\n  border: 2px solid #7b63a3;\n}\n:host:hover .ux-radio-button.ux-disabled {\n  border: 1px solid #eeeeee;\n}\n:host:hover .ux-radio-button.ux-simplified {\n  color: #cccccc;\n  border-color: transparent;\n  border-width: 1px;\n}\n:host:hover .ux-radio-button.ux-simplified.ux-disabled {\n  color: transparent;\n}\n:host:hover .ux-radio-button.ux-simplified.ux-checked {\n  color: #7b63a3;\n}\n:host:hover .ux-radio-button.ux-simplified.ux-checked.ux-disabled {\n  color: #cccccc;\n}\ninput[type=\"radio\"] {\n  display: none;\n}\n.ux-radio-button.ux-checked {\n  background-color: #7b63a3;\n  color: #ffffff;\n  border-color: transparent;\n}\n.ux-radio-button.ux-disabled {\n  border-color: #eeeeee;\n  cursor: default;\n}\n.ux-radio-button.disabled:focus {\n  outline: none;\n}\n.ux-radio-button.ux-disabled.ux-checked {\n  background-color: #eeeeee;\n}\n.ux-radio-button.ux-simplified {\n  font-size: 20px;\n  border-color: transparent;\n  background-color: transparent;\n}\n.ux-radio-button.ux-simplified.ux-checked {\n  color: #7b63a3;\n  background-color: transparent;\n  border-color: transparent;\n}\n.ux-radio-button.ux-simplified.ux-disabled.ux-checked {\n  color: #cccccc;\n}\n.ux-radio-button-content {\n  display: inline-block;\n  margin-left: 7px;\n  margin-top: 1px;\n  white-space: normal;\n  vertical-align: bottom;\n  height: 24px;\n  cursor: default;\n  line-height: 22px;\n}\n"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n}\n.ux-spark {\n  overflow: hidden;\n}\n.ux-spark .ux-spark-bar {\n  height: 100%;\n}\n.ux-spark .ux-fill {\n  transition: none;\n}\n.ux-spark.ux-inline {\n  margin-bottom: 0;\n  display: inline-block;\n  width: 100%;\n  float: left;\n}\n.ux-spark-line {\n  flex: 1;\n}\n.ux-spark-inline-label-container {\n  display: flex;\n  align-items: center;\n}\n.ux-spark-inline-label-left {\n  flex: none;\n  text-align: right;\n  margin-right: 5px;\n}\n.ux-spark-top-container {\n  min-height: 24px;\n}\n.ux-spark-bottom-container {\n  min-height: 24px;\n  line-height: 22px;\n}\n.ux-spark-label-top-left,\n.ux-spark-label-top-right,\n.ux-spark-label-bottom-left,\n.ux-spark-label-bottom-right {\n  display: inline-block;\n}\n.ux-spark-label-top-left,\n.ux-spark-label-bottom-left {\n  float: left;\n}\n.ux-spark-label-top-right,\n.ux-spark-label-bottom-right {\n  float: right;\n  text-align: right;\n}\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = ":host {\n  margin-bottom: 5px;\n  white-space: nowrap;\n}\n:host .ux-toggleswitch {\n  display: inline-flex;\n  cursor: pointer;\n  color: transparent;\n}\n:host .ux-toggleswitch.disabled {\n  cursor: default;\n}\n:host .ux-toggleswitch.disabled:focus {\n  outline: none;\n}\n:host .ux-toggleswitch:focus {\n  outline: 1px dotted #2a2a2a;\n}\n:host .ux-toggleswitch input[type=\"checkbox\"] {\n  display: none;\n}\n:host .ux-toggleswitch {\n  width: 44px;\n  height: 22px;\n  position: relative;\n  vertical-align: middle;\n  color: #7b63a3;\n}\n:host .ux-toggleswitch .ux-toggleswitch-bg {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  border-radius: 999px;\n  box-shadow: inset 0 0 0 0;\n  transition: border 0.3s, box-shadow 0.3s, background-color 0s;\n}\n:host .ux-toggleswitch.checked .ux-toggleswitch-bg {\n  background-color: currentColor;\n  border-color: currentColor;\n  box-shadow: inset 0 0 0 12px;\n  transition: border 0.3s, box-shadow 0.3s, background-color 0s 0.3s;\n}\n:host .ux-toggleswitch.disabled {\n  opacity: 0.5;\n}\n:host .ux-toggleswitch .ux-toggleswitch-nub {\n  background-color: #ffffff;\n  border: 2px solid #cccccc;\n  border-radius: 50%;\n  height: 22px;\n  width: 22px;\n  position: absolute;\n  left: 0;\n  transition: left 0.15s;\n}\n:host .ux-toggleswitch.checked .ux-toggleswitch-nub {\n  left: 22px;\n  border-color: currentColor;\n}\n:host .ux-toggleswitch-content {\n  display: inline-block;\n  margin-left: 7px;\n  margin-top: 1px;\n  white-space: normal;\n  vertical-align: top;\n}\n:host.toggleswitch-lg .ux-toggleswitch {\n  width: 60px;\n  height: 30px;\n}\n:host.toggleswitch-lg .ux-toggleswitch.checked .ux-toggleswitch-bg {\n  box-shadow: inset 0 0 0 16px;\n}\n:host.toggleswitch-lg .ux-toggleswitch .ux-toggleswitch-nub {\n  height: 30px;\n  width: 30px;\n}\n:host.toggleswitch-lg .ux-toggleswitch.checked .ux-toggleswitch-nub {\n  left: 30px;\n}\n:host.toggleswitch-lg .ux-toggleswitch-content {\n  margin-top: 5px;\n}\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /* Internet Explorer workaround for border-radius rendering issue. */\n  .ux-toggleswitch-nub {\n    background-clip: padding-box;\n  }\n}\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-checkbox\" tabindex=\"0\"\r\n    [class.ux-checked]=\"value == true\"\r\n    [class.ux-indeterminate]=\"value == indeterminateValue\"\r\n    [class.ux-simplified]=\"simplified == true\"\r\n    [class.ux-disabled]=\"disabled == true\"\r\n    (keypress)=\"keyDown($event)\">\r\n\r\n    <input type=\"checkbox\" role=\"checkbox\" tabindex=\"-1\"\r\n        [name]=\"name\" \r\n        [checked]=\"value\" \r\n        [disabled]=\"disabled\" />\r\n        \r\n</div>\r\n\r\n<div class=\"ux-checkbox-content\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-ebox-header\">\r\n    <ng-content select=\"ux-ebox-header\"></ng-content>\r\n</div>\r\n\r\n<div class=\"ux-ebox-content\">\r\n    <ng-content select=\"ux-ebox-content\"></ng-content>\r\n</div>"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-flipper\" [class.ux-flip-card]=\"flippedState\" [style.width.px]=\"width\" [style.height.px]=\"height\">\r\n\r\n    <div class=\"ux-flippable-card-front\" [style.width.px]=\"width\" [style.height.px]=\"height\">\r\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\r\n    </div>\r\n\r\n    <div class=\"ux-flippable-card-back\" [style.width.px]=\"width\" [style.height.px]=\"height\">\r\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\r\n    </div>\r\n</div>"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<div class=\"progressbar-track\" [style.width]=\"((value / max) * 100) + '%'\" [style.backgroundColor]=\"barColor\">\r\n    <ng-content></ng-content>\r\n</div>"

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-radio-button\" tabindex=\"0\"\r\n    [class.ux-checked]=\"model === option\"\r\n    [class.ux-simplified]=\"simplified === true\"\r\n    [class.ux-disabled]=\"disabled === true\"\r\n    (keypress)=\"keyDown($event)\">\r\n\r\n    <input type=\"radio\" role=\"radio\" tabindex=\"-1\"\r\n        [name]=\"name\" \r\n        [checked]=\"model === option\" \r\n        [disabled]=\"disabled\"\r\n        [value]=\"option\"\r\n        [id]=\"id\" />\r\n        \r\n</div>\r\n\r\n<div class=\"ux-radio-button-content\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<!-- Inline Spark Chart -->\r\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\r\n\r\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\r\n\r\n    <div class=\"ux-spark-line\">\r\n\r\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\r\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\r\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\r\n        </div>\r\n\r\n        <div class=\"ux-spark ux-inline\" [style.height.px]=\"fillHeight\" [style.backgroundColor]=\"trackColor\">\r\n            <div class=\"ux-spark-bar\" [style.width]=\"(value < 100 ? value : 100) + '%'\" [style.backgroundColor]=\"barColor\"></div>\r\n        </div>\r\n\r\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\r\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\r\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n<!-- End Inline Spark Chart -->\r\n\r\n\r\n<!-- Non Inline Spark Chart -->\r\n<div *ngIf=\"!inlineLabel\">\r\n\r\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\r\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\r\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\r\n    </div>\r\n\r\n    <div class=\"ux-spark\" [style.height.px]=\"fillHeight\" [style.backgroundColor]=\"trackColor\">\r\n        <div class=\"ux-spark-bar\" [style.width]=\"(value < 100 ? value : 100) + '%'\" [style.backgroundColor]=\"barColor\"></div>\r\n    </div>\r\n\r\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\r\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\r\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\r\n    </div>\r\n</div>\r\n\r\n<!-- End Non Inline Spark Chart -->"

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-toggleswitch\" \r\n  tabindex=\"0\"\r\n  (keydown)=\"keydown($event)\"\r\n  [class.checked]=\"value === true\"\r\n  [class.disabled]=\"disabled === true\">\r\n\r\n  <span class=\"ux-toggleswitch-bg\"></span>\r\n  \r\n  <span class=\"ux-toggleswitch-nub\"></span>\r\n\r\n  <input type=\"checkbox\" \r\n    role=\"checkbox\"\r\n    [name]=\"name\" \r\n    [checked]=\"value === true\"\r\n    [disabled]=\"disabled === true\"\r\n    tabindex=\"-1\" />\r\n</div>\r\n\r\n<div class=\"ux-toggleswitch-content\">\r\n  <ng-content></ng-content>\r\n</div>\r\n"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_checkbox_checkbox_module__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CheckboxModule", function() { return __WEBPACK_IMPORTED_MODULE_0__components_checkbox_checkbox_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ebox_ebox_module__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EboxModule", function() { return __WEBPACK_IMPORTED_MODULE_1__components_ebox_ebox_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_flippable_card_flippable_card_module__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FlippableCardModule", function() { return __WEBPACK_IMPORTED_MODULE_2__components_flippable_card_flippable_card_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_progressbar_progressbar_module__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProgressBarModule", function() { return __WEBPACK_IMPORTED_MODULE_3__components_progressbar_progressbar_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_radiobutton_radiobutton_module__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RadioButtonModule", function() { return __WEBPACK_IMPORTED_MODULE_4__components_radiobutton_radiobutton_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_spark_spark_module__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SparkModule", function() { return __WEBPACK_IMPORTED_MODULE_5__components_spark_spark_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_toggleswitch_toggleswitch_module__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToggleSwitchModule", function() { return __WEBPACK_IMPORTED_MODULE_6__components_toggleswitch_toggleswitch_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_color_color_module__ = __webpack_require__(10);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColorServiceModule", function() { return __WEBPACK_IMPORTED_MODULE_7__services_color_color_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_color_color_service__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColorService", function() { return __WEBPACK_IMPORTED_MODULE_8__services_color_color_service__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ThemeColor", function() { return __WEBPACK_IMPORTED_MODULE_8__services_color_color_service__["b"]; });
/*
  Export Modules
*/








/*
  Export Services
*/



/***/ })
/******/ ]);
});