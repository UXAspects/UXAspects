/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "angular.module(\"app\").controller(\"BarChartCtrl\", BarChartCtrl);\r\n\r\nBarChartCtrl.$inject = ['$colorService'];\r\n\r\nfunction BarChartCtrl($colorService) {\r\n    var bc = this;\r\n\r\n    bc.data = [{\r\n        label: 'bar',\r\n        data: [\r\n            [1, 34],\r\n            [2, 25],\r\n            [3, 19],\r\n            [4, 34],\r\n            [5, 32],\r\n            [6, 44]\r\n        ],\r\n        forecastData: [\r\n            [7, 50],\r\n            [8, 67]\r\n        ]\r\n    }];\r\n\r\n    bc.options = {\r\n        series: {\r\n            bars: {\r\n                show: true,\r\n                fill: true,\r\n                fillColor: {\r\n                    colors: [{\r\n                        opacity: 0.1\r\n                    }, {\r\n                        opacity: 0.1\r\n                    }]\r\n                },\r\n                barWidth: 0.5,\r\n                lineWidth: 1,\r\n                align: 'center'\r\n            },\r\n            highlightColor: $colorService.getColor(\"chart1\").setAlpha(0.2).toRgba(),\r\n            forecastFillColor: $colorService.getColor(\"chart1\").setAlpha(0.3).toRgba(),\r\n            forecastColor: $colorService.getColor(\"chart1\").setAlpha(0.8).toRgba(),\r\n            forecastHighLightColor: $colorService.getColor(\"chart1\").setAlpha(0.2).toRgba(),\r\n            forecastDashStyle: [5]\r\n        },\r\n        xaxis: {\r\n            tickDecimals: 0,\r\n            color: $colorService.getColor(\"secondary\").toHex(),\r\n            ticks: [\r\n                [1, '.doc'],\r\n                [2, '.ppt'],\r\n                [3, '.pdf'],\r\n                [4, '.xls'],\r\n                [5, '.html'],\r\n                [6, '.txt'],\r\n                [7, '.csv'],\r\n                [8, '.mht']\r\n            ]\r\n\r\n        },\r\n        colors: [$colorService.getColor('primary').toRgb()],\r\n        grid: {\r\n            color: $colorService.getColor('grey4').toHex(),\r\n            hoverable: true,\r\n            clickable: true,\r\n            borderWidth: {\r\n                left: 1,\r\n                bottom: 1,\r\n                right: 0,\r\n                top: 0\r\n            },\r\n            borderColor: {\r\n                left: $colorService.getColor(\"grey2\").setAlpha(0.5).toRgba(),\r\n                bottom: $colorService.getColor(\"grey2\").setAlpha(0.5).toRgba()\r\n            }\r\n        },\r\n        legend: {\r\n            show: false\r\n        },\r\n        tooltip: {\r\n            show: true,\r\n            shifts: {\r\n                x: 0,\r\n                y: -30\r\n            },\r\n            content: function (label, xval, yval) {\r\n                var content = 'x: ' + '%x' + ', y: ' + yval;\r\n                return content;\r\n            }\r\n        }\r\n    };\r\n}"

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(0);

console.log(content);

/***/ })
/******/ ]);