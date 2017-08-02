(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Observable"), require("rxjs/Subject"), require("rxjs/BehaviorSubject"), require("ngx-bootstrap/tooltip"), require("ngx-bootstrap/dropdown"), require("rxjs/add/operator/takeUntil"), require("@angular/platform-browser"), require("rxjs/add/operator/switchMap"), require("rxjs/add/observable/fromEvent"), require("rxjs/add/operator/debounceTime"), require("ngx-bootstrap/typeahead"), require("rxjs/add/observable/of"), require("@angular/http"), require("@angular/router"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("rxjs/add/operator/auditTime"), require("rxjs/add/operator/combineLatest"), require("rxjs/add/operator/partition"), require("rxjs/add/observable/concat"), require("rxjs/add/observable/from"), require("rxjs/add/observable/timer"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms", "rxjs/Observable", "rxjs/Subject", "rxjs/BehaviorSubject", "ngx-bootstrap/tooltip", "ngx-bootstrap/dropdown", "rxjs/add/operator/takeUntil", "@angular/platform-browser", "rxjs/add/operator/switchMap", "rxjs/add/observable/fromEvent", "rxjs/add/operator/debounceTime", "ngx-bootstrap/typeahead", "rxjs/add/observable/of", "@angular/http", "@angular/router", "rxjs/add/operator/filter", "rxjs/add/operator/map", "rxjs/add/operator/auditTime", "rxjs/add/operator/combineLatest", "rxjs/add/operator/partition", "rxjs/add/observable/concat", "rxjs/add/observable/from", "rxjs/add/observable/timer"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"), require("rxjs/Observable"), require("rxjs/Subject"), require("rxjs/BehaviorSubject"), require("ngx-bootstrap/tooltip"), require("ngx-bootstrap/dropdown"), require("rxjs/add/operator/takeUntil"), require("@angular/platform-browser"), require("rxjs/add/operator/switchMap"), require("rxjs/add/observable/fromEvent"), require("rxjs/add/operator/debounceTime"), require("ngx-bootstrap/typeahead"), require("rxjs/add/observable/of"), require("@angular/http"), require("@angular/router"), require("rxjs/add/operator/filter"), require("rxjs/add/operator/map"), require("rxjs/add/operator/auditTime"), require("rxjs/add/operator/combineLatest"), require("rxjs/add/operator/partition"), require("rxjs/add/observable/concat"), require("rxjs/add/observable/from"), require("rxjs/add/observable/timer")) : factory(root["@angular/core"], root["@angular/common"], root["@angular/forms"], root["rxjs/Observable"], root["rxjs/Subject"], root["rxjs/BehaviorSubject"], root["ngx-bootstrap/tooltip"], root["ngx-bootstrap/dropdown"], root["rxjs/add/operator/takeUntil"], root["@angular/platform-browser"], root["rxjs/add/operator/switchMap"], root["rxjs/add/observable/fromEvent"], root["rxjs/add/operator/debounceTime"], root["ngx-bootstrap/typeahead"], root["rxjs/add/observable/of"], root["@angular/http"], root["@angular/router"], root["rxjs/add/operator/filter"], root["rxjs/add/operator/map"], root["rxjs/add/operator/auditTime"], root["rxjs/add/operator/combineLatest"], root["rxjs/add/operator/partition"], root["rxjs/add/observable/concat"], root["rxjs/add/observable/from"], root["rxjs/add/observable/timer"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_44__, __WEBPACK_EXTERNAL_MODULE_46__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_83__, __WEBPACK_EXTERNAL_MODULE_99__, __WEBPACK_EXTERNAL_MODULE_117__, __WEBPACK_EXTERNAL_MODULE_120__, __WEBPACK_EXTERNAL_MODULE_155__, __WEBPACK_EXTERNAL_MODULE_156__, __WEBPACK_EXTERNAL_MODULE_157__, __WEBPACK_EXTERNAL_MODULE_176__, __WEBPACK_EXTERNAL_MODULE_178__, __WEBPACK_EXTERNAL_MODULE_181__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_module__ = __webpack_require__(147);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__color_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_service__ = __webpack_require__(61);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__color_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__color_service__["b"]; });




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resize_service__ = __webpack_require__(18);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__resize_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize_directive__ = __webpack_require__(43);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__resize_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resize_module__ = __webpack_require__(110);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__resize_module__["a"]; });





/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DashboardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Rounding; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DashboardService = (function () {
    function DashboardService() {
        this._widgets = [];
        this._options$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this._placeholder = { visible: false, x: 0, y: 0, width: 0, height: 0 };
        this._dimensions = {};
        this._columnWidth = 0;
        this._rowHeight = 0;
        this._stacked = false;
        this._defaultOptions = {
            columns: 5,
            padding: 5,
            minWidth: 100,
            minHeight: 100,
            emptyRow: true
        };
        this.height = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this.layout = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    /**
     * Return all the options currently being used as a subject
     */
    DashboardService.prototype.options = function () {
        return this._options$;
    };
    /**
     * Return all the options currently being used
     */
    DashboardService.prototype.getOptions = function () {
        return this._options;
    };
    /**
     * Get all the default dashboard options
     */
    DashboardService.prototype.getDefaultOptions = function () {
        return this._defaultOptions;
    };
    /**
     * Set the options - automatically set default values where not specified
     * @param options The DashboardOptions that will configure the dashboard
     */
    DashboardService.prototype.setOptions = function (options) {
        this._options = Object.assign({}, this._defaultOptions, options);
        // update the observable
        this._options$.next(this._options);
    };
    /**
     * Allow uniform spacing around each widget
     * @param padding The number of pixels around each widget
     */
    DashboardService.prototype.setPadding = function (padding) {
        this._options.padding = padding;
        this.options().next(this._options);
    };
    /**
     * Set the dashboard container element
     * @param dashboard The HTMLElement that is the dashboard container
     */
    DashboardService.prototype.setDashboard = function (dashboard) {
        this._dashboard = dashboard;
    };
    /**
     * Add a widget to the dashboard
     * @param widget The widget component to add to the dashboard
     */
    DashboardService.prototype.addWidget = function (widget) {
        this._widgets.push(widget);
    };
    /**
     * Remove a widget from the dashboard
     * @param widget The widget to remove
     */
    DashboardService.prototype.removeWidget = function (widget) {
        this._widgets.findIndex(function (wgt) { return wgt === widget; });
    };
    /**
     * Indicate that the dashboard element has been resized
     * @param width The width of the dashboard element in px
     * @param height The height of the dashboard element in px
     */
    DashboardService.prototype.setDimensions = function (width, height) {
        this._dimensions.width = width;
        this._dimensions.height = height;
        // trigger re-render
        this.renderDashboard();
    };
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     */
    DashboardService.prototype.getLayoutData = function () {
        return this._widgets.map(function (widget) {
            return { id: widget.getId(), col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    };
    /**
     * Position widgets programatically
     */
    DashboardService.prototype.setLayoutData = function (layout) {
        var _this = this;
        // iterate through each widget data and find a match
        layout.forEach(function (widget) {
            // find the matching widget
            var target = _this._widgets.find(function (wgt) { return wgt.getId() === widget.id; });
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    };
    /**
     * Update the positions and sizes of the widgets
     */
    DashboardService.prototype.renderDashboard = function () {
        var _this = this;
        // get the dimensions of the dashboard
        this._columnWidth = this._dimensions.width / this._options.columns;
        this._rowHeight = this._options.rowHeight || this._columnWidth;
        // ensure the column width is not below the min widths
        if (this._columnWidth < this._options.minWidth) {
            this.setStacked(true);
        }
        else {
            this.setStacked(false);
        }
        // ensure the row height is not below the min widths
        if (this._rowHeight < this._options.minWidth) {
            this._rowHeight = this._options.minWidth;
        }
        this.setDashboardLayout();
        // iterate through each widget and set the size - except the one being resized
        this._widgets.filter(function (widget) { return !_this._actionWidget || widget !== _this._actionWidget.widget; })
            .forEach(function (widget) { return widget.render(); });
    };
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     */
    DashboardService.prototype.setDashboardLayout = function () {
        var _this = this;
        // find any widgets that do not currently have a position set
        this._widgets.filter(function (widget) { return widget.getColumn() === undefined || widget.getRow() === undefined; })
            .forEach(function (widget) { return _this.setWidgetPosition(widget); });
        this.setDashboardHeight();
    };
    DashboardService.prototype.setStacked = function (stacked) {
        var _this = this;
        // only do the following if the stacked state has changed
        if (stacked === this._stacked) {
            return;
        }
        // store the stacked state
        this._stacked = stacked;
        // update the stacked state for all widgets
        this._widgets.forEach(function (widget) { return widget.setStacked(_this._stacked); });
        // if stacked is true we need to do some reordering etc..
        if (stacked === true) {
            // iterate through each widget set it's stacked state and
            this.getWidgetsByOrder().forEach(function (widget, idx) {
                widget.setStacked(true);
                widget.setColumn(0);
                widget.setRow(idx);
            });
        }
    };
    DashboardService.prototype.getWidgetsByOrder = function () {
        return this._widgets.sort(function (w1, w2) {
            var w1Position = w1.getColumn() * w1.getRow();
            var w2Position = w2.getColumn() * w2.getRow();
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    };
    /**
     * Find a position that a widget can fit in the dashboard
     * @param widget The widget to try and position
     */
    DashboardService.prototype.setWidgetPosition = function (widget) {
        // find a position for the widget
        var position = 0;
        var success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            var column = position % this._options.columns;
            var row = Math.floor(position / this._options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            position++;
        }
    };
    /**
     * Check if a position in the dashboard is vacant or not
     */
    DashboardService.prototype.getPositionAvailable = function (column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        var spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this._options.columns) {
            return false;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                if (spaces.find(function (block) { return block.column === x && block.row === y && block.widget !== ignoreWidget; })) {
                    return { value: false };
                }
            };
            for (var y = row; y < row + rowSpan; y++) {
                var state_1 = _loop_2(y);
                if (typeof state_1 === "object")
                    return state_1;
            }
        };
        // check each required position
        for (var x = column; x < column + columnSpan; x++) {
            var state_2 = _loop_1(x);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return true;
    };
    DashboardService.prototype.getOccupiedSpaces = function () {
        var _this = this;
        // find all spaces that are currently occupied
        return this._widgets.filter(function (widget) { return widget.getColumn() !== undefined && widget.getRow() !== undefined; })
            .reduce(function (value, widget) {
            _this.forEachBlock(widget, function (column, row) { return value.push({ widget: widget, column: column, row: row }); });
            return value;
        }, []);
    };
    /**
     * Begin resizing a widget
     * @param action The the widget to resize
     */
    DashboardService.prototype.onResizeStart = function (action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    };
    DashboardService.prototype.onResizeDrag = function (action) {
        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        var handle = action.widget.getHandles().find(function (hnd) { return hnd.direction === action.direction; });
        // get the bounds of the handle
        var bounds = handle.element.getBoundingClientRect();
        // get the center of the handle
        var centerX = bounds.left + (bounds.width / 2);
        var centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        var mouseX = action.event.x - centerX;
        var mouseY = action.event.y - centerY;
        // store the new proposed dimensions for the widget
        var dimensions = {
            x: action.widget.actualX,
            y: action.widget.actualY,
            width: action.widget.actualWidth,
            height: action.widget.actualHeight
        };
        // update widget based on the handle being dragged
        switch (action.direction) {
            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;
            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this._options.minWidth) {
                    var difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.Bottom:
                dimensions.height += mouseY;
                break;
            case ActionDirection.Top:
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this._options.minHeight) {
                    var difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this._options.minWidth) {
                    var difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this._options.minHeight) {
                    var difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this._options.minHeight) {
                    var difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this._options.minWidth) {
                    var difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        var currentWidth = action.widget.actualX + action.widget.actualWidth;
        var currentHeight = action.widget.actualY + action.widget.actualHeight;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this._dimensions.width) {
            dimensions.width = this._dimensions.width - dimensions.x;
        }
        if ((dimensions.y + dimensions.height) > this._dimensions.height) {
            dimensions.height = currentHeight;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this._options.minWidth) {
            dimensions.x = action.widget.actualX;
            dimensions.width = this._options.minWidth;
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this._options.minHeight) {
            dimensions.y = action.widget.actualY;
            dimensions.height = this._options.minHeight;
        }
        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    };
    DashboardService.prototype.onResizeEnd = function () {
        // commit resize changes
        this.commitWidgetChanges();
        // hide placeholder
        this.getPlaceholder().visible = false;
        this._actionWidget = null;
        this._mouseEvent = null;
        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();
        // update dashboard height
        this.setDashboardHeight();
        // emit information about the layout
        this.layout.next(this.getLayoutData());
    };
    DashboardService.prototype.onDragStart = function (action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    };
    DashboardService.prototype.onDragEnd = function () {
        this.onResizeEnd();
        this._widgetOrigin = {};
    };
    DashboardService.prototype.onDrag = function (action) {
        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }
        // get the current mouse position
        var mouseX = action.event.x - this._mouseEvent.x;
        var mouseY = action.event.y - this._mouseEvent.y;
        // store the latest event
        this._mouseEvent = action.event;
        var dimensions = {
            x: action.widget.actualX + mouseX,
            y: action.widget.actualY + mouseY,
            width: action.widget.actualWidth,
            height: action.widget.actualHeight
        };
        this.restoreWidgets(true);
        // update widget position
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        this.setDashboardHeight();
    };
    DashboardService.prototype.cacheWidgets = function () {
        this._cache = this._widgets.map(function (widget) {
            return {
                id: widget.getId(),
                column: widget.getColumn(),
                row: widget.getRow()
            };
        });
    };
    DashboardService.prototype.restoreWidgets = function (ignoreActionWidget) {
        var _this = this;
        if (ignoreActionWidget === void 0) { ignoreActionWidget = false; }
        this._cache.filter(function (widget) { return !ignoreActionWidget || widget.id !== _this._actionWidget.widget.getId(); }).forEach(function (widget) {
            var match = _this._widgets.find(function (wgt) { return wgt.getId() === widget.id; });
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    };
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     */
    DashboardService.prototype.shiftWidgets = function () {
        var _this = this;
        var widgetsToMove = [];
        var _loop_3 = function (row) {
            var _loop_4 = function (column) {
                // store reference to any widgets that need moved
                this_1.getOccupiedSpaces()
                    .filter(function (space) { return space.column === column && space.row === row && space.widget !== _this._actionWidget.widget; })
                    .forEach(function (space) { return widgetsToMove.push(space.widget); });
            };
            for (var column = this_1.getPlaceholder().column; column < this_1.getPlaceholder().column + this_1.getPlaceholder().columnSpan; column++) {
                _loop_4(column);
            }
        };
        var this_1 = this;
        // check if there are any widgets under the placeholder
        for (var row = this.getPlaceholder().row; row < this.getPlaceholder().row + this.getPlaceholder().rowSpan; row++) {
            _loop_3(row);
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter(function (widget, idx, array) { return array.indexOf(widget) === idx; });
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        var unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(function (widget) {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            var grid = _this.getOccupiedSpaces().filter(function (space) { return !unmovedWidgets.find(function (wgt) { return wgt === space.widget; }); });
            // iterate each free block
            for (var row = _this._widgetOrigin.row; row < _this._widgetOrigin.row + _this._widgetOrigin.rowSpan; row++) {
                for (var column = _this._widgetOrigin.column; column < _this._widgetOrigin.column + _this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    var requiredSpaces = _this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    var available = requiredSpaces.every(function (space) {
                        return !grid.find(function (gridSpace) { return gridSpace.column === space.column && gridSpace.row === space.row; }) && space.column < _this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(function (wgt) { return wgt === widget; }), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (_this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (_this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                _this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            var distance = (_this._actionWidget.widget.getRow() - widget.getRow()) + _this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            _this.moveWidgetDown(widget, distance);
        });
    };
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param shiftDirection - the position widgets were shifted
     */
    DashboardService.prototype.validatePlaceholderPosition = function (shiftDirection) {
        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(this.getPlaceholder().column, this.getPlaceholder().row, true).length > 0) {
            // move the placeholder the opposite direction
            switch (shiftDirection) {
                case ActionDirection.Left:
                    this.setPlaceholderBounds(this.getPlaceholder().visible, this.getPlaceholder().x + this.getColumnWidth(), this.getPlaceholder().y, this.getPlaceholder().width, this.getPlaceholder().height);
                    break;
                case ActionDirection.Right:
                    this.setPlaceholderBounds(this.getPlaceholder().visible, this.getPlaceholder().x - this.getColumnWidth(), this.getPlaceholder().y, this.getPlaceholder().width, this.getPlaceholder().height);
                    break;
            }
            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
    };
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     */
    DashboardService.prototype.canWidgetMoveLeft = function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        var targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveLeft(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveLeft(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }
        return moveable;
    };
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     */
    DashboardService.prototype.canWidgetMoveRight = function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this._options.columns) {
            return false;
        }
        // find the positions required
        var targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveRight(wgt); }); });
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).forEach(function (wgt) { return _this.canWidgetMoveRight(wgt, true); }); });
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    };
    /**
     * Store the initial position of the widget being dragged
     */
    DashboardService.prototype.setWidgetOrigin = function () {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    };
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     */
    DashboardService.prototype.getRequiredSpacesFromPoint = function (widget, column, row) {
        var spaces = [];
        for (var y = row; y < row + widget.getRowSpan(); y++) {
            for (var x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    };
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     */
    DashboardService.prototype.updateWidgetPositions = function (widget) {
        var _this = this;
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (var column = this._placeholder.column; column < this._placeholder.column + this._placeholder.columnSpan; column++) {
            for (var row = this._placeholder.row; row < this._placeholder.row + this._placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(function (wgt) { return wgt !== widget; })
                    .forEach(function (wgt) { return _this.moveWidgetDown(wgt); });
            }
        }
        // update the height of the dashboard
        this.setDashboardHeight();
        // if we arent dragging the top handle then fill spaces
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            this.shiftWidgetsUp();
        }
    };
    /**
     * Determine if a widget is occupying a specific row and column
     * @param column The columns to check if occupied
     * @param row The row to check if occupied
     * @param ignoreResizing Whether or not to ignore the widget currently being resized
     */
    DashboardService.prototype.getWidgetsAtPosition = function (column, row, ignoreResizing) {
        var _this = this;
        if (ignoreResizing === void 0) { ignoreResizing = false; }
        return this.getOccupiedSpaces()
            .filter(function (space) { return space.column === column && space.row === row; })
            .filter(function (space) { return space.widget !== _this._actionWidget.widget || !ignoreResizing; })
            .map(function (space) { return space.widget; });
    };
    /**
     * Update the placeholder visibility, position and size
     */
    DashboardService.prototype.setPlaceholderBounds = function (visible, x, y, width, height) {
        var _this = this;
        var rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
        this._placeholder.visible = visible;
        this._placeholder.column = this.getPlaceholderColumn(x, width);
        this._placeholder.row = this.getPlaceholderRow(y, height);
        this._placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        this._placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        var rowCount = this._widgets.filter(function (widget) { return widget !== _this._actionWidget.widget; })
            .reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
        // constrain maximum placeholder row
        this._placeholder.row = Math.min(this._placeholder.row, rowCount);
        this._placeholder.x = (this._placeholder.column * this.getColumnWidth()) + this._options.padding;
        this._placeholder.y = (this._placeholder.row * this.getRowHeight()) + this._options.padding;
        this._placeholder.width = (this._placeholder.columnSpan * this.getColumnWidth()) - (this._options.padding * 2);
        this._placeholder.height = (this._placeholder.rowSpan * this.getRowHeight()) - (this._options.padding * 2);
        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(this._placeholder.column, false);
        this._actionWidget.widget.setRow(this._placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(this._placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(this._placeholder.rowSpan, false);
    };
    /**
     * Get the placeholder column position
     */
    DashboardService.prototype.getPlaceholderColumn = function (x, width) {
        var column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var columnSpan = Math.floor(width / this.getColumnWidth());
        var upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        var overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    };
    /**
     * Get the column span of the placeholder
     */
    DashboardService.prototype.getPlaceholderColumnSpan = function (width) {
        var columnSpan = this.getColumnFromPx(width);
        // if we arent dragging right or left then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Right &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.BottomRight &&
            this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(columnSpan, 1);
        }
        // get the current column span and any overflow
        var overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    };
    /**
     * Get the row position of the placeholder
     */
    DashboardService.prototype.getPlaceholderRow = function (y, height) {
        var row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var rowSpan = Math.ceil(height / this.getRowHeight());
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        var overflow = height < this.getRowHeight() ? 0 : height % this.getRowHeight();
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this.getRowHeight() / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    };
    /**
     * Get the row span of the placeholder
     */
    DashboardService.prototype.getPlaceholderRowSpan = function (height) {
        var rowSpan = this.getRowFromPx(height);
        // if we arent dragging up or down then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.Bottom &&
            this._actionWidget.direction !== ActionDirection.BottomLeft &&
            this._actionWidget.direction !== ActionDirection.BottomRight) {
            return Math.max(rowSpan, 1);
        }
        // get the current column span and any overflow
        var overflow = height % this.getRowHeight();
        return (overflow > (this.getRowHeight() / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    };
    DashboardService.prototype.getColumnFromPx = function (x, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var column = Math.floor(x / Math.floor(this.getColumnWidth()));
        var overflow = (x % Math.floor(this.getColumnWidth()));
        var half = this.getColumnWidth() / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return column;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? column : column + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? column + 1 : column;
            case Rounding.RoundUp:
                return overflow > 0 ? column + 1 : column;
        }
    };
    DashboardService.prototype.getRowFromPx = function (y, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var row = Math.floor(y / Math.floor(this.getRowHeight()));
        var overflow = (y % Math.floor(this.getRowHeight()));
        var half = this.getRowHeight() / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return row;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? row : row + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? row + 1 : row;
            case Rounding.RoundUp:
                return overflow > 0 ? row + 1 : row;
        }
    };
    DashboardService.prototype.commitWidgetChanges = function () {
        // check that we have all the values we need
        if (this._placeholder.column === undefined || this._placeholder.row === undefined ||
            this._placeholder.columnSpan === undefined || this._placeholder.rowSpan === undefined) {
            return;
        }
        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(this._placeholder.column);
            this._actionWidget.widget.setRow(this._placeholder.row);
            this._actionWidget.widget.setColumnSpan(this._placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(this._placeholder.rowSpan);
        }
        // reset all placeholder values
        this._placeholder.column = undefined;
        this._placeholder.row = undefined;
        this._placeholder.columnSpan = undefined;
        this._placeholder.rowSpan = undefined;
    };
    DashboardService.prototype.getPlaceholder = function () {
        return this._placeholder;
    };
    /**
     * Get the current column width
     */
    DashboardService.prototype.getColumnWidth = function () {
        return Math.floor(this._columnWidth);
    };
    /**
     * Get the current column height
     */
    DashboardService.prototype.getRowHeight = function () {
        return this._rowHeight;
    };
    /**
     * Calculate the number of rows populated with widgets
     */
    DashboardService.prototype.getRowCount = function () {
        return this._widgets.reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
    };
    /**
     * Set the height of the dashboard container element
     */
    DashboardService.prototype.setDashboardHeight = function () {
        // size the dashboard container to ensure all rows fit
        var rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this._options.emptyRow) {
            rowCount++;
        }
        this._dimensions.height = rowCount * this.getRowHeight();
        this.height.next(this._dimensions.height);
    };
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param widget The widget that should be brought to the front
     */
    DashboardService.prototype.bringToFront = function (widget) {
        this._widgets.forEach(function (wgt) { return wgt.sendToBack(); });
        widget.bringToFront();
    };
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param widget The widget to move downwards
     */
    DashboardService.prototype.moveWidgetDown = function (widget, distance) {
        var _this = this;
        if (distance === void 0) { distance = 1; }
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, function (column, row) {
            return _this.getWidgetsAtPosition(column, row, true)
                .filter(function (wgt) { return wgt !== widget; })
                .forEach(function (wgt) { return _this.moveWidgetDown(wgt, distance); });
        });
    };
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     */
    DashboardService.prototype.shiftWidgetsUp = function () {
        var _this = this;
        // check whether or not changes have been made - if so we need to repeat until stable
        var stable = true;
        // iterate each widget and 
        this._widgets.forEach(function (widget) {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (_this._actionWidget && _this._actionWidget.widget === widget) {
                return;
            }
            if (_this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    };
    /**
     * Iterate over each space a widget occupied
     * @param widget The widget to determine spaces
     * @param callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     */
    DashboardService.prototype.forEachBlock = function (widget, callback) {
        for (var row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (var column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    };
    /**
     * Returns the number of columns available
     */
    DashboardService.prototype.getColumnCount = function () {
        return this._stacked ? 1 : this._options.columns;
    };
    return DashboardService;
}());
DashboardService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], DashboardService);

var ActionDirection;
(function (ActionDirection) {
    ActionDirection[ActionDirection["Top"] = 0] = "Top";
    ActionDirection[ActionDirection["TopRight"] = 1] = "TopRight";
    ActionDirection[ActionDirection["Right"] = 2] = "Right";
    ActionDirection[ActionDirection["BottomRight"] = 3] = "BottomRight";
    ActionDirection[ActionDirection["Bottom"] = 4] = "Bottom";
    ActionDirection[ActionDirection["BottomLeft"] = 5] = "BottomLeft";
    ActionDirection[ActionDirection["Left"] = 6] = "Left";
    ActionDirection[ActionDirection["TopLeft"] = 7] = "TopLeft";
    ActionDirection[ActionDirection["Move"] = 8] = "Move";
})(ActionDirection || (ActionDirection = {}));
var Rounding;
(function (Rounding) {
    Rounding[Rounding["RoundDown"] = 0] = "RoundDown";
    Rounding[Rounding["RoundDownBelowHalf"] = 1] = "RoundDownBelowHalf";
    Rounding[Rounding["RoundUp"] = 2] = "RoundUp";
    Rounding[Rounding["RoundUpOverHalf"] = 3] = "RoundUpOverHalf";
})(Rounding || (Rounding = {}));


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeahead_event__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__typeahead_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typeahead_key_service__ = __webpack_require__(65);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__typeahead_key_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__typeahead_component__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__typeahead_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__typeahead_module__ = __webpack_require__(154);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__typeahead_module__["a"]; });






/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetBaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facet_container_component__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facet_events__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var FacetBaseComponent = (function () {
    function FacetBaseComponent(facetContainer, _elementRef) {
        var _this = this;
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.events = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_2__facet_events__["a" /* FacetDeselect */]; })
                .filter(function (event) { return !!_this.selected.find(function (facet) { return facet === event.facet; }); })
                .subscribe(function (event) { return _this.deselectFacet(event.facet); });
            // subscribe to any deselect all events from facet container
            facetContainer.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_2__facet_events__["b" /* FacetDeselectAll */]; }).subscribe(function (_) { return _this.deselectAll(); });
        }
    }
    FacetBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(function (facet) { return _this.facetContainer.selectFacet(facet); });
        }
    };
    FacetBaseComponent.prototype.selectFacet = function (facet) {
        // if the facet is disabled it should not be selected
        if (facet.disabled) {
            return;
        }
        // add the facet to the list of selected facets
        this.selected.push(facet);
        // send the new value to the event emitter
        this.selectedChange.emit(this.selected);
        // fire the event to the observable
        this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_2__facet_events__["c" /* FacetSelect */](facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    };
    FacetBaseComponent.prototype.deselectFacet = function (facet) {
        // find facet to remove
        var index = this.selected.findIndex(function (selectedFacet) { return selectedFacet === facet; });
        // only continue if facet is found
        if (index !== -1) {
            // remove the facet from the selected list
            this.selected.splice(index, 1);
            // emit the changes to selected event emitter
            this.selectedChange.emit(this.selected);
            // fire the event to the observable
            this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_2__facet_events__["a" /* FacetDeselect */](facet));
            // deselect the facet in the facet container
            if (this.facetContainer) {
                this.facetContainer.deselectFacet(facet);
            }
        }
    };
    FacetBaseComponent.prototype.deselectAll = function () {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_2__facet_events__["b" /* FacetDeselectAll */]());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    };
    FacetBaseComponent.prototype.toggleFacetSelection = function (facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    };
    FacetBaseComponent.prototype.isFacetSelected = function (facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(function (selectedFacet) { return selectedFacet === facet; });
    };
    FacetBaseComponent.prototype.triggerEvent = function (event) {
        this.events.next(event);
    };
    return FacetBaseComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FacetBaseComponent.prototype, "selected", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FacetBaseComponent.prototype, "selectedChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"])
], FacetBaseComponent.prototype, "events", void 0);
FacetBaseComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-facet-base',
        template: '',
    }),
    __param(0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"]()),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__facet_container_component__["a" /* FacetContainerComponent */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], FacetBaseComponent);



/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterBaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_container_component__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var FilterBaseComponent = (function () {
    function FilterBaseComponent(filtersContainer) {
        this.filtersContainer = filtersContainer;
        filtersContainer.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__filter_container_component__["c" /* FilterRemoveAllEvent */]; }).subscribe(this.removeFilter.bind(this));
    }
    FilterBaseComponent.prototype.addFilter = function (filter) {
        if (!filter.initial) {
            this.filtersContainer.addFilter(filter);
        }
    };
    FilterBaseComponent.prototype.removeFilter = function (filter) {
        if (!filter) {
            return;
        }
        this.filtersContainer.removeFilter(filter);
    };
    return FilterBaseComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FilterBaseComponent.prototype, "filters", void 0);
FilterBaseComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: 'ux-filter-base'
    }),
    __param(0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"]()),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__filter_container_component__["b" /* FilterContainerComponent */]])
], FilterBaseComponent);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerBaseExtensionDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_player_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MediaPlayerBaseExtensionDirective = (function () {
    function MediaPlayerBaseExtensionDirective(mediaPlayerService) {
        this.mediaPlayerService = mediaPlayerService;
    }
    return MediaPlayerBaseExtensionDirective;
}());
MediaPlayerBaseExtensionDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[mediaPlayerBaseExtension]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__media_player_service__["a" /* MediaPlayerService */]])
], MediaPlayerBaseExtensionDirective);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnSortingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ColumnSortingState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColumnSortingComponent = (function () {
    function ColumnSortingComponent() {
        this.stateChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.columnSortingState = ColumnSortingState;
    }
    ColumnSortingComponent.prototype.initParent = function (parent) {
        var _this = this;
        this.parent = parent;
        // watch for any events
        this.parent.events.subscribe(function (event) {
            var idx = event.findIndex(function (column) { return column.key === _this.key; });
            if (idx == -1) {
                _this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                _this.orderNumber = idx === -1 ? null : idx + 1;
            }
            else {
                _this.orderNumber = null;
            }
            _this.stateChange.emit(_this.state);
        });
    };
    ColumnSortingComponent.prototype.changeState = function () {
        if (this.state === ColumnSortingState.Ascending) {
            this.state = ColumnSortingState.Descending;
        }
        else if (this.state === ColumnSortingState.Descending) {
            this.state = ColumnSortingState.NoSort;
        }
        else {
            this.state = ColumnSortingState.Ascending;
        }
        // inform parent
        return this.parent.toggleColumn(this.key, this.state);
    };
    return ColumnSortingComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], ColumnSortingComponent.prototype, "state", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], ColumnSortingComponent.prototype, "key", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], ColumnSortingComponent.prototype, "orderNumber", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ColumnSortingComponent.prototype, "stateChange", void 0);
ColumnSortingComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-column-sorting',
        template: __webpack_require__(105),
        exportAs: 'ux-column-sorting'
    })
], ColumnSortingComponent);

var ColumnSortingState;
(function (ColumnSortingState) {
    ColumnSortingState[ColumnSortingState["Ascending"] = 0] = "Ascending";
    ColumnSortingState[ColumnSortingState["Descending"] = 1] = "Descending";
    ColumnSortingState[ColumnSortingState["NoSort"] = 2] = "NoSort";
})(ColumnSortingState || (ColumnSortingState = {}));


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardWidgetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardWidgetComponent = (function () {
    function DashboardWidgetComponent(_dashboardService, _elementRef) {
        var _this = this;
        this._dashboardService = _dashboardService;
        this._elementRef = _elementRef;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.resizable = false;
        this.actualX = 0;
        this.actualY = 0;
        this.actualWidth = 100;
        this.actualHeight = 100;
        this.padding = 0;
        this.zIndex = 0;
        this.stacked = false;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._dragMove = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(document, 'mousemove');
        this._dragEnd = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(document, 'mouseup');
        this._nativeElement = _elementRef.nativeElement;
        // add the widget to the dashboard
        _dashboardService.addWidget(this);
        // watch for changes to the options
        _dashboardService.options().subscribe(function (options) {
            _this.padding = options.padding;
            _this._columnSpan.stacked = options.columns;
        });
    }
    DashboardWidgetComponent.prototype.ngOnInit = function () {
        // check to ensure values are numbers and not strings
        if (typeof this.col === 'string') {
            this.col = parseFloat(this.col);
        }
        if (typeof this.row === 'string') {
            this.row = parseFloat(this.row);
        }
        if (typeof this.colSpan === 'string') {
            this.colSpan = parseFloat(this.colSpan);
        }
        if (typeof this.rowSpan === 'string') {
            this.rowSpan = parseFloat(this.rowSpan);
        }
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    };
    /**
     * Once component is initialised link the resize handle elements with their direction
     */
    DashboardWidgetComponent.prototype.ngAfterViewInit = function () {
        this.initialiseHandles();
    };
    /**
     * If component is removed, then unregister it from the service
     */
    DashboardWidgetComponent.prototype.ngOnDestroy = function () {
        this._dashboardService.removeWidget(this);
    };
    /**
     * Return the ID of the widget
     */
    DashboardWidgetComponent.prototype.getId = function () {
        return this.id;
    };
    /**
     * Set the actual position and size values
     */
    DashboardWidgetComponent.prototype.render = function () {
        this.actualX = this.getColumn() * this._dashboardService.getColumnWidth();
        this.actualY = this.getRow() * this._dashboardService.getRowHeight();
        this.actualWidth = this.getColumnSpan() * this._dashboardService.getColumnWidth();
        this.actualHeight = this.getRowSpan() * this._dashboardService.getRowHeight();
    };
    /**
     * Returns all the resize handles and their associated directions
     */
    DashboardWidgetComponent.prototype.getHandles = function () {
        return this._handles;
    };
    /**
     * Indicates whether or not the widget should be displayed in stacked mode
     * @param stacked indicates the stacked mode
     */
    DashboardWidgetComponent.prototype.setStacked = function (stacked) {
        this.stacked = stacked;
    };
    DashboardWidgetComponent.prototype.getColumn = function () {
        return this.getStackableValue(this._column);
    };
    DashboardWidgetComponent.prototype.getRow = function () {
        return this.getStackableValue(this._row);
    };
    DashboardWidgetComponent.prototype.setColumn = function (column, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    };
    DashboardWidgetComponent.prototype.setRow = function (row, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    };
    DashboardWidgetComponent.prototype.getColumnSpan = function () {
        return this.getStackableValue(this._columnSpan);
    };
    DashboardWidgetComponent.prototype.getRowSpan = function () {
        return this.getStackableValue(this._rowSpan);
    };
    DashboardWidgetComponent.prototype.setColumnSpan = function (columnSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    };
    DashboardWidgetComponent.prototype.setRowSpan = function (rowSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    };
    DashboardWidgetComponent.prototype.bringToFront = function () {
        this.zIndex = 1;
    };
    DashboardWidgetComponent.prototype.sendToBack = function () {
        this.zIndex = 0;
    };
    DashboardWidgetComponent.prototype.setBounds = function (x, y, width, height) {
        this.actualX = x;
        this.actualY = y;
        this.actualWidth = width;
        this.actualHeight = height;
    };
    /**
     * Allows automatic setting of stackable value
     * @param property The current StackableValue object
     * @param value The value to set in the appropriate field
     */
    DashboardWidgetComponent.prototype.setStackableValue = function (property, value) {
        if (this.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    };
    /**
     * Return the appropriate value from a stackable value
     * @param property The Stackable value object
     */
    DashboardWidgetComponent.prototype.getStackableValue = function (property) {
        return this.stacked ? property.stacked : property.regular;
    };
    /**
     * Create data representations of the resize handle elements and the direction they will resize in
     */
    DashboardWidgetComponent.prototype.initialiseHandles = function () {
        var _this = this;
        this._handles = [
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].Top
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-right'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].TopRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-right'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].Right
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-right'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].BottomRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].Bottom
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-left'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].BottomLeft
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-left'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].Left
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-left'),
                direction: __WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* ActionDirection */].TopLeft
            }
        ];
        // bind resize events to each handle
        this._handles.forEach(function (handle) { return _this.bindResize(handle); });
    };
    /**
     * This will apply event listeners to each resize handle
     * @param handle The element and direction to subscribe to
     */
    DashboardWidgetComponent.prototype.bindResize = function (handle) {
        var _this = this;
        // bind to resize events
        handle.listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(handle.element, 'mousedown').subscribe(function (downEvent) {
            downEvent.preventDefault();
            // inform service that we are beginning to drag
            _this._dashboardService.onResizeStart({ widget: _this, direction: handle.direction, event: downEvent });
            var move$ = _this._dragMove.takeUntil(_this._dragEnd).subscribe(function (moveEvent) {
                moveEvent.preventDefault();
                _this._dashboardService.onResizeDrag({ widget: _this, direction: handle.direction, event: moveEvent });
            }, null, function () {
                move$.unsubscribe();
                _this._dashboardService.onResizeEnd();
            });
        });
    };
    return DashboardWidgetComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], DashboardWidgetComponent.prototype, "id", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], DashboardWidgetComponent.prototype, "col", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], DashboardWidgetComponent.prototype, "row", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], DashboardWidgetComponent.prototype, "colSpan", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], DashboardWidgetComponent.prototype, "rowSpan", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], DashboardWidgetComponent.prototype, "resizable", void 0);
DashboardWidgetComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-dashboard-widget',
        template: __webpack_require__(109),
        host: {
            '[style.left.px]': 'actualX',
            '[style.top.px]': 'actualY',
            '[style.width.px]': 'actualWidth',
            '[style.height.px]': 'actualHeight',
            '[style.padding.px]': 'padding',
            '[style.zIndex]': 'zIndex'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__dashboard_service__["b" /* DashboardService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], DashboardWidgetComponent);



/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromEvent__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ResizeService = (function () {
    function ResizeService() {
    }
    ResizeService.prototype.addResizeListener = function (nativeElement, renderer) {
        // create subject
        var subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // determine the style of the element
        var displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        var iframe = renderer.createElement('iframe');
        // style the iframe to be invisible but fill containing element
        renderer.setStyle(iframe, 'position', 'absolute');
        renderer.setStyle(iframe, 'width', '100%');
        renderer.setStyle(iframe, 'height', '100%');
        renderer.setStyle(iframe, 'top', '0');
        renderer.setStyle(iframe, 'right', '0');
        renderer.setStyle(iframe, 'bottom', '0');
        renderer.setStyle(iframe, 'left', '0');
        renderer.setStyle(iframe, 'z-index', '-1');
        renderer.setStyle(iframe, 'opacity', '0');
        renderer.setStyle(iframe, 'border', 'none');
        renderer.setStyle(iframe, 'margin', '0');
        renderer.setStyle(iframe, 'pointer-events', 'none');
        renderer.setStyle(iframe, 'overflow', 'hidden');
        // ensure the iframe ignores any tabbing
        renderer.setAttribute(iframe, 'tabindex', '-1');
        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            renderer.setStyle(nativeElement, 'position', 'relative');
        }
        // add the iframe to the container element
        renderer.appendChild(nativeElement, iframe);
        this.waitUntilReady(iframe, function () {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            var attachListener = function () {
                __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(iframe.contentWindow, 'resize').subscribe(function (event) {
                    subject.next({
                        width: nativeElement.offsetWidth,
                        height: nativeElement.offsetHeight
                    });
                });
            };
            if (iframeDoc.readyState === 'complete') {
                attachListener();
            }
            else {
                // wait for iframe to load
                iframe.addEventListener('load', function () { return attachListener(); });
            }
        });
        return subject;
    };
    ResizeService.prototype.waitUntilReady = function (iframe, callback) {
        var _this = this;
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        }
        else {
            setTimeout(function () { return _this.waitUntilReady(iframe, callback); });
        }
    };
    return ResizeService;
}());
ResizeService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], ResizeService);



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facet_events__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FacetContainerComponent = (function () {
    function FacetContainerComponent() {
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FacetContainerComponent.prototype.selectFacet = function (facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_1__facet_events__["c" /* FacetSelect */](facet));
    };
    FacetContainerComponent.prototype.deselectFacet = function (facet) {
        // find the index of the item in the selected array
        var idx = this.facets.findIndex(function (selectedFacet) { return facet === selectedFacet; });
        // if match there was no match then finish
        if (idx === -1) {
            return;
        }
        // remove the last item
        this.facets.splice(idx, 1);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_1__facet_events__["a" /* FacetDeselect */](facet));
    };
    FacetContainerComponent.prototype.deselectAllFacets = function () {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new __WEBPACK_IMPORTED_MODULE_1__facet_events__["b" /* FacetDeselectAll */]());
    };
    FacetContainerComponent.prototype.triggerEvent = function (event) {
        this.events.next(event);
    };
    return FacetContainerComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetContainerComponent.prototype, "header", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetContainerComponent.prototype, "clearTooltip", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetContainerComponent.prototype, "emptyText", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FacetContainerComponent.prototype, "facets", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FacetContainerComponent.prototype, "facetsChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FacetContainerComponent.prototype, "events", void 0);
FacetContainerComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-facet-container',
        template: __webpack_require__(116)
    })
], FacetContainerComponent);



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FacetSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetDeselect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FacetDeselectAll; });
var FacetSelect = (function () {
    function FacetSelect(facet) {
        this.facet = facet;
    }
    return FacetSelect;
}());

var FacetDeselect = (function () {
    function FacetDeselect(facet) {
        this.facet = facet;
    }
    return FacetDeselect;
}());

var FacetDeselectAll = (function () {
    function FacetDeselectAll() {
    }
    return FacetDeselectAll;
}());



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FilterContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterAddEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FilterRemoveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FilterRemoveAllEvent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilterContainerComponent = (function () {
    function FilterContainerComponent() {
        this.filters = [];
        this.filtersChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.events = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FilterContainerComponent.prototype.addFilter = function (filter) {
        this.filters.push(filter);
        this.events.next(new FilterAddEvent(filter));
        this.filtersChange.emit(this.filters);
    };
    FilterContainerComponent.prototype.removeFilter = function (filter) {
        var idx = this.filters.findIndex(function (filters) { return filters === filter; });
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter));
            this.filtersChange.emit(this.filters);
        }
    };
    FilterContainerComponent.prototype.removeAll = function () {
        this.events.next(new FilterRemoveAllEvent());
    };
    return FilterContainerComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FilterContainerComponent.prototype, "filters", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FilterContainerComponent.prototype, "clearTooltip", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FilterContainerComponent.prototype, "filtersChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FilterContainerComponent.prototype, "events", void 0);
FilterContainerComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-filter-container',
        template: __webpack_require__(125)
    })
], FilterContainerComponent);

var FilterAddEvent = (function () {
    function FilterAddEvent(filter) {
        this.filter = filter;
    }
    return FilterAddEvent;
}());

var FilterRemoveEvent = (function () {
    function FilterRemoveEvent(filter) {
        this.filter = filter;
    }
    return FilterRemoveEvent;
}());

var FilterRemoveAllEvent = (function () {
    function FilterRemoveAllEvent() {
    }
    return FilterRemoveAllEvent;
}());



/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_directive__ = __webpack_require__(67);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_directive__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_directive__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_directive__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_load_button_directive__ = __webpack_require__(24);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_load_button_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infinite_scroll_loading_directive__ = __webpack_require__(25);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__infinite_scroll_loading_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__infinite_scroll_module__ = __webpack_require__(158);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__infinite_scroll_module__["a"]; });






/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollLoadButtonDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InfiniteScrollLoadButtonDirective = (function () {
    function InfiniteScrollLoadButtonDirective(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.load = this._load.asObservable();
    }
    Object.defineProperty(InfiniteScrollLoadButtonDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._template);
                    // Template content follows the elementRef, which is a comment.
                    var clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                    this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScrollLoadButtonDirective.prototype.onClick = function (event) {
        this._load.next(event);
    };
    InfiniteScrollLoadButtonDirective.prototype.getNextElementSibling = function (element) {
        var next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    };
    return InfiniteScrollLoadButtonDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"]('uxInfiniteScrollLoadButton'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], InfiniteScrollLoadButtonDirective.prototype, "visible", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
], InfiniteScrollLoadButtonDirective.prototype, "load", void 0);
InfiniteScrollLoadButtonDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxInfiniteScrollLoadButton]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
], InfiniteScrollLoadButtonDirective);



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollLoadingDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InfiniteScrollLoadingDirective = (function () {
    function InfiniteScrollLoadingDirective(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    Object.defineProperty(InfiniteScrollLoadingDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._templateRef);
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return InfiniteScrollLoadingDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"]('uxInfiniteScrollLoading'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], InfiniteScrollLoadingDirective.prototype, "visible", null);
InfiniteScrollLoadingDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxInfiniteScrollLoading]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
], InfiniteScrollLoadingDirective);



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollIntoViewService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ScrollIntoViewService = (function () {
    function ScrollIntoViewService() {
    }
    ScrollIntoViewService.prototype.scrollIntoView = function (elem, scrollParent) {
        var offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            var offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    };
    return ScrollIntoViewService;
}());
ScrollIntoViewService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], ScrollIntoViewService);



/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_frame_extraction_index__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MediaPlayerService = (function () {
    function MediaPlayerService(_frameExtractionService) {
        var _this = this;
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
            Create observables for media player events
        */
        this.playing = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.initEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.abortEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.canPlayEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.canPlayThroughEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.durationChangeEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.endedEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.errorEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.loadedDataEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.loadedMetadataEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.loadStartEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.pauseEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.playEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.playingEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.rateChangeEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.seekedEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.seekingEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.stalledEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.suspendEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.timeUpdateEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.volumeChangeEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.waitingEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.mediaClickEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.fullscreenEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.quietModeEvent = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.progressEvent = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            // repeat until the whole video has fully loaded
            var interval = setInterval(function () {
                var buffered = _this._mediaPlayer.buffered;
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === _this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayer", {
        /*
            Create all the getters and setters the can be used by media player extensions
        */
        get: function () {
            return this._mediaPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "quietMode", {
        get: function () {
            return this._quietMode;
        },
        set: function (value) {
            // quiet mode cannot be enabled on audio player
            if (this.type === 'audio') {
                value = false;
            }
            this._quietMode = value;
            this.quietModeEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerWidth", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerHeight", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "audioTracks", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "autoplay", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
        },
        set: function (value) {
            this._mediaPlayer.autoplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "buffered", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "crossOrigin", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
        },
        set: function (value) {
            this._mediaPlayer.crossOrigin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentSrc", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentTime", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
        },
        set: function (value) {
            this._mediaPlayer.currentTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultMuted", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
        },
        set: function (value) {
            this._mediaPlayer.defaultMuted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultPlaybackRate", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
        },
        set: function (value) {
            this._mediaPlayer.defaultPlaybackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "duration", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "ended", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.ended : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "loop", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.loop : false;
        },
        set: function (value) {
            this._mediaPlayer.loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "muted", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.muted : false;
        },
        set: function (value) {
            this._mediaPlayer.muted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "networkState", {
        get: function () {
            return this._mediaPlayer.networkState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "paused", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.paused : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "playbackRate", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
        },
        set: function (value) {
            this._mediaPlayer.playbackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "played", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "preload", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
        },
        set: function (value) {
            this._mediaPlayer.preload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "readyState", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seekable", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seeking", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "src", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.src : '';
        },
        set: function (value) {
            this._mediaPlayer.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "textTracks", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "videoTracks", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "volume", {
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.volume : 1;
        },
        set: function (value) {
            this._mediaPlayer.volume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "fullscreen", {
        get: function () {
            return this._mediaPlayer ? this._fullscreen : false;
        },
        set: function (value) {
            this._fullscreen = value;
            this.fullscreenEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    MediaPlayerService.prototype.setMediaPlayer = function (hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    };
    /**
     * Toggle playing state
     */
    MediaPlayerService.prototype.togglePlay = function () {
        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }
        if (this.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    };
    /**
     * Starts playing the audio/video
     */
    MediaPlayerService.prototype.play = function () {
        this._mediaPlayer.play();
    };
    /**
     * Pauses the currently playing audio/video
     */
    MediaPlayerService.prototype.pause = function () {
        this._mediaPlayer.pause();
    };
    /**
     * Re-loads the audio/video element
     */
    MediaPlayerService.prototype.load = function () {
        this._mediaPlayer.load();
    };
    /**
     * Checks if the browser can play the specified audio/video type
     */
    MediaPlayerService.prototype.canPlayType = function (type) {
        return this._mediaPlayer.canPlayType(type);
    };
    /**
     * Adds a new text track to the audio/video
     */
    MediaPlayerService.prototype.addTextTrack = function (kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    };
    /**
     * Attempt to display media in fullscreen mode
     */
    MediaPlayerService.prototype.requestFullscreen = function () {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if (this._hostElement.msRequestFullscreen) {
            this._hostElement.msRequestFullscreen();
        }
        else if (this._hostElement.mozRequestFullScreen) {
            this._hostElement.mozRequestFullScreen();
        }
    };
    /**
     * Exit full screen mode
     */
    MediaPlayerService.prototype.exitFullscreen = function () {
        if (this._hostElement.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    };
    MediaPlayerService.prototype.fullscreenChange = function (event) {
        this.fullscreen = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null && document.msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    };
    /**
     * Toggle Fullscreen State
     */
    MediaPlayerService.prototype.toggleFullscreen = function () {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    };
    /**
     * Extract the frames from the video
     */
    MediaPlayerService.prototype.getFrames = function (width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].from([]);
    };
    return MediaPlayerService;
}());
MediaPlayerService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_frame_extraction_index__["b" /* FrameExtractionService */]])
], MediaPlayerService);



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_module__ = __webpack_require__(177);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__audio_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_service__ = __webpack_require__(82);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__audio_service__["a"]; });




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualScrollLoadingDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VirtualScrollLoadingDirective = (function () {
    function VirtualScrollLoadingDirective() {
    }
    return VirtualScrollLoadingDirective;
}());
VirtualScrollLoadingDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxVirtualScrollLoading]'
    })
], VirtualScrollLoadingDirective);



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualScrollLoadButtonDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VirtualScrollLoadButtonDirective = (function () {
    function VirtualScrollLoadButtonDirective() {
    }
    return VirtualScrollLoadButtonDirective;
}());
VirtualScrollLoadButtonDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxVirtualScrollLoadButton]'
    })
], VirtualScrollLoadButtonDirective);



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualScrollCellDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VirtualScrollCellDirective = (function () {
    function VirtualScrollCellDirective() {
    }
    return VirtualScrollCellDirective;
}());
VirtualScrollCellDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxVirtualScrollCell]'
    })
], VirtualScrollCellDirective);



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpCenterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HelpCenterService = (function () {
    function HelpCenterService() {
        this.items = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
    }
    HelpCenterService.prototype.registerItem = function (item) {
        // get the current items
        var items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    };
    HelpCenterService.prototype.unregisterItem = function (item) {
        // get the current items
        var items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(function (itm) { return itm !== item; });
        // update the observable
        this.items.next(items);
    };
    return HelpCenterService;
}());
HelpCenterService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], HelpCenterService);



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutSwitcherItemDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LayoutSwitcherItemDirective = (function () {
    function LayoutSwitcherItemDirective(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    LayoutSwitcherItemDirective.prototype.getLayout = function () {
        return this._templateRef;
    };
    LayoutSwitcherItemDirective.prototype.getConfig = function () {
        return this._config;
    };
    LayoutSwitcherItemDirective.prototype.activate = function () {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    };
    LayoutSwitcherItemDirective.prototype.deactivate = function () {
        var index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    };
    return LayoutSwitcherItemDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"]('uxLayoutSwitcherItem'),
    __metadata("design:type", Object)
], LayoutSwitcherItemDirective.prototype, "_config", void 0);
LayoutSwitcherItemDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxLayoutSwitcherItem]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
], LayoutSwitcherItemDirective);



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_breadcrumbs_index__ = __webpack_require__(36);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__components_breadcrumbs_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsModule", function() { return __WEBPACK_IMPORTED_MODULE_0__components_breadcrumbs_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_checkbox_index__ = __webpack_require__(100);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CheckboxModule", function() { return __WEBPACK_IMPORTED_MODULE_1__components_checkbox_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CHECKBOX_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_1__components_checkbox_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__components_checkbox_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_column_sorting_index__ = __webpack_require__(103);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColumnSortingModule", function() { return __WEBPACK_IMPORTED_MODULE_2__components_column_sorting_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColumnSortingComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__components_column_sorting_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColumnSortingState", function() { return __WEBPACK_IMPORTED_MODULE_2__components_column_sorting_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColumnSortingDirective", function() { return __WEBPACK_IMPORTED_MODULE_2__components_column_sorting_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__ = __webpack_require__(106);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DashboardService", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ActionDirection", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Rounding", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DashboardDragHandleDirective", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DashboardWidgetComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__components_dashboard_index__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ebox_index__ = __webpack_require__(111);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EboxModule", function() { return __WEBPACK_IMPORTED_MODULE_4__components_ebox_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EboxComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__components_ebox_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EboxHeaderDirective", function() { return __WEBPACK_IMPORTED_MODULE_4__components_ebox_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EboxContentDirective", function() { return __WEBPACK_IMPORTED_MODULE_4__components_ebox_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_facets_index__ = __webpack_require__(114);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetsModule", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetContainerComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetSelect", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetDeselect", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetDeselectAll", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetHeaderComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetBaseComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetCheckListComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetTypeaheadListComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FacetTypeaheadHighlight", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Facet", function() { return __WEBPACK_IMPORTED_MODULE_5__components_facets_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_filters_index__ = __webpack_require__(123);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterModule", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterContainerComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterAddEvent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterRemoveEvent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterRemoveAllEvent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterBaseComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterDropdownComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FilterDynamicComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__components_filters_index__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_flippable_card_index__ = __webpack_require__(128);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FlippableCardModule", function() { return __WEBPACK_IMPORTED_MODULE_7__components_flippable_card_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FlippableCardComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__components_flippable_card_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FlippableCardFrontDirective", function() { return __WEBPACK_IMPORTED_MODULE_7__components_flippable_card_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FlippableCardBackDirective", function() { return __WEBPACK_IMPORTED_MODULE_7__components_flippable_card_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_item_display_panel_index__ = __webpack_require__(131);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemDisplayPanelModule", function() { return __WEBPACK_IMPORTED_MODULE_8__components_item_display_panel_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemDisplayPanelContentDirective", function() { return __WEBPACK_IMPORTED_MODULE_8__components_item_display_panel_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemDisplayPanelFooterDirective", function() { return __WEBPACK_IMPORTED_MODULE_8__components_item_display_panel_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemDisplayPanelComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__components_item_display_panel_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_number_picker_index__ = __webpack_require__(134);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NumberPickerModule", function() { return __WEBPACK_IMPORTED_MODULE_9__components_number_picker_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NUMBER_PICKER_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_9__components_number_picker_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NumberPickerComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__components_number_picker_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_page_header_index__ = __webpack_require__(137);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PageHeaderModule", function() { return __WEBPACK_IMPORTED_MODULE_10__components_page_header_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PageHeaderComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__components_page_header_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PageHeaderNavigationComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__components_page_header_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_progress_bar_index__ = __webpack_require__(145);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProgressBarModule", function() { return __WEBPACK_IMPORTED_MODULE_11__components_progress_bar_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProgressBarComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__components_progress_bar_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_radiobutton_index__ = __webpack_require__(149);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RadioButtonModule", function() { return __WEBPACK_IMPORTED_MODULE_12__components_radiobutton_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RADIOBUTTON_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_12__components_radiobutton_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RadioButtonComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__components_radiobutton_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_select_index__ = __webpack_require__(152);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SELECT_VALUE_ACCESSOR", function() { return __WEBPACK_IMPORTED_MODULE_13__components_select_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return __WEBPACK_IMPORTED_MODULE_13__components_select_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SelectModule", function() { return __WEBPACK_IMPORTED_MODULE_13__components_select_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_slider_index__ = __webpack_require__(165);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderModule", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderType", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderStyle", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderSize", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderCalloutTrigger", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderSnap", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderTickType", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderThumbEvent", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SliderThumb", function() { return __WEBPACK_IMPORTED_MODULE_14__components_slider_index__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_spark_index__ = __webpack_require__(168);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SparkModule", function() { return __WEBPACK_IMPORTED_MODULE_15__components_spark_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SparkComponent", function() { return __WEBPACK_IMPORTED_MODULE_15__components_spark_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_tag_input_index__ = __webpack_require__(70);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagInputEvent", function() { return __WEBPACK_IMPORTED_MODULE_16__components_tag_input_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagInputComponent", function() { return __WEBPACK_IMPORTED_MODULE_16__components_tag_input_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TagInputModule", function() { return __WEBPACK_IMPORTED_MODULE_16__components_tag_input_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_toggleswitch_index__ = __webpack_require__(171);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToggleSwitchModule", function() { return __WEBPACK_IMPORTED_MODULE_17__components_toggleswitch_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ToggleSwitchComponent", function() { return __WEBPACK_IMPORTED_MODULE_17__components_toggleswitch_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_typeahead_index__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeaheadOptionEvent", function() { return __WEBPACK_IMPORTED_MODULE_18__components_typeahead_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeaheadKeyService", function() { return __WEBPACK_IMPORTED_MODULE_18__components_typeahead_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeaheadComponent", function() { return __WEBPACK_IMPORTED_MODULE_18__components_typeahead_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TypeaheadModule", function() { return __WEBPACK_IMPORTED_MODULE_18__components_typeahead_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__ = __webpack_require__(174);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MediaPlayerModule", function() { return __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MediaPlayerComponent", function() { return __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MediaPlayerBaseExtensionDirective", function() { return __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MediaPlayerControlsExtensionComponent", function() { return __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MediaPlayerTimelineExtensionComponent", function() { return __WEBPACK_IMPORTED_MODULE_19__components_media_player_index__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__ = __webpack_require__(185);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualScrollModule", function() { return __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualScrollComponent", function() { return __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualScrollLoadingDirective", function() { return __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualScrollLoadButtonDirective", function() { return __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VirtualScrollCellDirective", function() { return __WEBPACK_IMPORTED_MODULE_20__components_virtual_scroll_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__directives_focus_if_index__ = __webpack_require__(73);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FocusIfDirective", function() { return __WEBPACK_IMPORTED_MODULE_21__directives_focus_if_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FocusIfModule", function() { return __WEBPACK_IMPORTED_MODULE_21__directives_focus_if_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__directives_help_center_index__ = __webpack_require__(188);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HelpCenterModule", function() { return __WEBPACK_IMPORTED_MODULE_22__directives_help_center_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HelpCenterService", function() { return __WEBPACK_IMPORTED_MODULE_22__directives_help_center_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HelpCenterItemDirective", function() { return __WEBPACK_IMPORTED_MODULE_22__directives_help_center_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__directives_hover_action_index__ = __webpack_require__(190);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HoverActionModule", function() { return __WEBPACK_IMPORTED_MODULE_23__directives_hover_action_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HoverActionContainerDirective", function() { return __WEBPACK_IMPORTED_MODULE_23__directives_hover_action_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HoverActionDirective", function() { return __WEBPACK_IMPORTED_MODULE_23__directives_hover_action_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__ = __webpack_require__(23);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollDirective", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollLoadingEvent", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollLoadedEvent", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollLoadErrorEvent", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollLoadButtonDirective", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollLoadingDirective", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrollModule", function() { return __WEBPACK_IMPORTED_MODULE_24__directives_infinite_scroll_index__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__directives_layout_switcher_index__ = __webpack_require__(192);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LayoutSwitcherModule", function() { return __WEBPACK_IMPORTED_MODULE_25__directives_layout_switcher_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LayoutSwitcherDirective", function() { return __WEBPACK_IMPORTED_MODULE_25__directives_layout_switcher_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LayoutSwitcherItemDirective", function() { return __WEBPACK_IMPORTED_MODULE_25__directives_layout_switcher_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__directives_resize_index__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResizeService", function() { return __WEBPACK_IMPORTED_MODULE_26__directives_resize_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResizeDirective", function() { return __WEBPACK_IMPORTED_MODULE_26__directives_resize_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResizeModule", function() { return __WEBPACK_IMPORTED_MODULE_26__directives_resize_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__directives_scroll_into_view_if_index__ = __webpack_require__(68);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ScrollIntoViewIfDirective", function() { return __WEBPACK_IMPORTED_MODULE_27__directives_scroll_into_view_if_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ScrollIntoViewService", function() { return __WEBPACK_IMPORTED_MODULE_27__directives_scroll_into_view_if_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ScrollIntoViewIfModule", function() { return __WEBPACK_IMPORTED_MODULE_27__directives_scroll_into_view_if_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_duration_index__ = __webpack_require__(86);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DurationPipeModule", function() { return __WEBPACK_IMPORTED_MODULE_28__pipes_duration_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DurationPipe", function() { return __WEBPACK_IMPORTED_MODULE_28__pipes_duration_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pipes_file_size_index__ = __webpack_require__(88);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileSizePipeModule", function() { return __WEBPACK_IMPORTED_MODULE_29__pipes_file_size_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileSizePipe", function() { return __WEBPACK_IMPORTED_MODULE_29__pipes_file_size_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pipes_string_filter_index__ = __webpack_require__(194);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StringFilterPipe", function() { return __WEBPACK_IMPORTED_MODULE_30__pipes_string_filter_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StringFilterModule", function() { return __WEBPACK_IMPORTED_MODULE_30__pipes_string_filter_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_audio_index__ = __webpack_require__(29);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AudioServiceModule", function() { return __WEBPACK_IMPORTED_MODULE_31__services_audio_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AudioService", function() { return __WEBPACK_IMPORTED_MODULE_31__services_audio_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_color_index__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColorServiceModule", function() { return __WEBPACK_IMPORTED_MODULE_32__services_color_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ColorService", function() { return __WEBPACK_IMPORTED_MODULE_32__services_color_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ThemeColor", function() { return __WEBPACK_IMPORTED_MODULE_32__services_color_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_frame_extraction_index__ = __webpack_require__(79);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FrameExtractionModule", function() { return __WEBPACK_IMPORTED_MODULE_33__services_frame_extraction_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FrameExtractionService", function() { return __WEBPACK_IMPORTED_MODULE_33__services_frame_extraction_index__["b"]; });
/*
  Export Components
*/





















/*
  Export Directives
*/







/*
  Export Pipes
*/



/*
  Export Services
*/





/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__breadcrumbs_component__ = __webpack_require__(37);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__breadcrumbs_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumbs_module__ = __webpack_require__(98);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__breadcrumbs_module__["a"]; });




/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent() {
    }
    BreadcrumbsComponent.prototype.clickCrumb = function (event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    };
    return BreadcrumbsComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], BreadcrumbsComponent.prototype, "crumbs", void 0);
BreadcrumbsComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-breadcrumbs',
        template: __webpack_require__(97)
    })
], BreadcrumbsComponent);



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHECKBOX_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CheckboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CHECKBOX_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"](function () { return CheckboxComponent; }),
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
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    };
    CheckboxComponent.prototype.keyDown = function (event) {
        // then toggle the checkbox
        this.toggleChecked();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "name", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "clickable", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "simplified", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "indeterminateValue", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CheckboxComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CheckboxComponent.prototype, "value", null);
CheckboxComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-checkbox',
        template: __webpack_require__(102),
        providers: [CHECKBOX_VALUE_ACCESSOR],
        host: {
            '(click)': 'toggleChecked()'
        }
    }),
    __metadata("design:paramtypes", [])
], CheckboxComponent);



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnSortingDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__column_sorting_component__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColumnSortingDirective = (function () {
    function ColumnSortingDirective() {
        this.events = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.order = [];
    }
    ColumnSortingDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.components.forEach(function (component) { return component.initParent(_this); });
    };
    ColumnSortingDirective.prototype.toggleColumn = function (key, state) {
        if (this.singleSort) {
            if (state === __WEBPACK_IMPORTED_MODULE_0__column_sorting_component__["b" /* ColumnSortingState */].NoSort) {
                this.order = [];
            }
            else {
                this.order = [{ key: key, state: state }];
            }
        }
        else {
            // reorder columns here
            var idx = this.order.findIndex(function (column) { return column.key === key; });
            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state });
            }
            else if (state === __WEBPACK_IMPORTED_MODULE_0__column_sorting_component__["b" /* ColumnSortingState */].Ascending || state === __WEBPACK_IMPORTED_MODULE_0__column_sorting_component__["b" /* ColumnSortingState */].Descending) {
                this.order.splice(idx, 1);
                this.order.push({ key: key, state: state });
            }
            else {
                this.order.splice(idx, 1);
            }
        }
        this.events.next(this.order);
        // return the order
        return this.order;
    };
    return ColumnSortingDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], ColumnSortingDirective.prototype, "singleSort", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_0__column_sorting_component__["a" /* ColumnSortingComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
], ColumnSortingDirective.prototype, "components", void 0);
ColumnSortingDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"]({
        selector: '[uxColumnSorting]'
    })
], ColumnSortingDirective);



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_service__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(_dashboardService, _elementRef, _ngZone) {
        var _this = this;
        this._dashboardService = _dashboardService;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this.options = {};
        this.layoutChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.height = 0;
        this.placeholder = this._dashboardService.getPlaceholder();
        this._nativeElement = _elementRef.nativeElement;
        this._dashboardService.setDashboard(this._nativeElement);
        // watch for changes to component height
        this._dashboardService.height.subscribe(function (height) { return _this.height = height; });
        // subscribe to layout changes
        this._dashboardService.layout.subscribe(function (layout) {
            _this.layout = layout;
            _this.layoutChange.emit(layout);
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.setOptions(this.options);
    };
    DashboardComponent.prototype.ngDoCheck = function () {
        // get the current set of options
        var options = Object.assign({}, this._dashboardService.getDefaultOptions(), this.options);
        // if anything has changed then update them
        if (JSON.stringify(this._dashboardService.getOptions()) !== JSON.stringify(options)) {
            this.setOptions(options);
        }
        // check if the layout has changed
        if (JSON.stringify(this.layout) !== JSON.stringify(this._layout)) {
            this._layout = this.layout.slice();
            this._dashboardService.setLayoutData(this.layout);
        }
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        // initially set dimensions
        this._dashboardService.setDimensions(this._nativeElement.offsetWidth, this._nativeElement.offsetHeight);
    };
    DashboardComponent.prototype.setOptions = function (options) {
        this._dashboardService.setOptions(options);
    };
    DashboardComponent.prototype.onResize = function (event) {
        var _this = this;
        // ensure this gets run inside Angular
        this._ngZone.run(function () {
            var target = event.target;
            _this._dashboardService.setDimensions(target.innerWidth, target.innerHeight);
        });
    };
    return DashboardComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], DashboardComponent.prototype, "options", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], DashboardComponent.prototype, "layout", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], DashboardComponent.prototype, "layoutChange", void 0);
DashboardComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-dashboard',
        template: __webpack_require__(108),
        providers: [__WEBPACK_IMPORTED_MODULE_1__dashboard_service__["b" /* DashboardService */]],
        host: {
            '[style.height.px]': 'height'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__dashboard_service__["b" /* DashboardService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
], DashboardComponent);



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardDragHandleDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget_dashboard_widget_component__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_service__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var DashboardDragHandleDirective = (function () {
    function DashboardDragHandleDirective(widget, elementRef, dashboardService) {
        var _this = this;
        this._dragMove = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(document, 'mousemove');
        this._dragEnd = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(document, 'mouseup');
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(elementRef.nativeElement, 'mousedown').subscribe(function (downEvent) {
            downEvent.preventDefault();
            // inform service that we are beginning to drag
            dashboardService.onDragStart({ widget: widget, direction: __WEBPACK_IMPORTED_MODULE_3__dashboard_service__["a" /* ActionDirection */].Move, event: downEvent });
            var move$ = _this._dragMove.takeUntil(_this._dragEnd).subscribe(function (moveEvent) {
                moveEvent.preventDefault();
                dashboardService.onDrag({ widget: widget, direction: __WEBPACK_IMPORTED_MODULE_3__dashboard_service__["a" /* ActionDirection */].Move, event: moveEvent });
            }, null, function () {
                move$.unsubscribe();
                dashboardService.onDragEnd();
            });
        });
    }
    return DashboardDragHandleDirective;
}());
DashboardDragHandleDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[ux-dashboard-widget-drag-handle]'
    }),
    __param(0, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Host"]()),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__widget_dashboard_widget_component__["a" /* DashboardWidgetComponent */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_3__dashboard_service__["b" /* DashboardService */]])
], DashboardDragHandleDirective);



/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResizeDirective = (function () {
    function ResizeDirective(elementRef, resizeService, renderer) {
        this.elementRef = elementRef;
        this.resizeService = resizeService;
        this.renderer = renderer;
        this.throttle = 0;
        this.resize = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ResizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.resizeService.addResizeListener(this.elementRef.nativeElement, this.renderer).debounceTime(this.throttle).subscribe(function (event) {
            _this.resize.emit(event);
        });
    };
    return ResizeDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], ResizeDirective.prototype, "throttle", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"]('uxResize'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ResizeDirective.prototype, "resize", void 0);
ResizeDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxResize]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__resize_service__["a" /* ResizeService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
], ResizeDirective);



/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EboxComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EboxHeaderDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EboxContentDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-ebox',
        template: __webpack_require__(113)
    })
], EboxComponent);

var EboxHeaderDirective = (function () {
    function EboxHeaderDirective() {
    }
    return EboxHeaderDirective;
}());
EboxHeaderDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: 'ux-ebox-header'
    })
], EboxHeaderDirective);

var EboxContentDirective = (function () {
    function EboxContentDirective() {
    }
    return EboxContentDirective;
}());
EboxContentDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: 'ux-ebox-content'
    })
], EboxContentDirective);



/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_46__;

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FacetHeaderComponent = (function () {
    function FacetHeaderComponent() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FacetHeaderComponent.prototype.toggleExpand = function () {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    return FacetHeaderComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetHeaderComponent.prototype, "header", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetHeaderComponent.prototype, "canExpand", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetHeaderComponent.prototype, "expanded", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FacetHeaderComponent.prototype, "expandedChange", void 0);
FacetHeaderComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-facet-header',
        template: __webpack_require__(118),
        host: {
            'tabindex': '0',
            '(click)': 'toggleExpand()',
            '(keyup.enter)': 'toggleExpand()'
        }
    })
], FacetHeaderComponent);



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetCheckListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_facet_base_facet_base_component__ = __webpack_require__(11);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FacetCheckListComponent = (function (_super) {
    __extends(FacetCheckListComponent, _super);
    function FacetCheckListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facets = [];
        _this.scrollbar = true;
        _this.expanded = true;
        return _this;
    }
    return FacetCheckListComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_facet_base_facet_base_component__["a" /* FacetBaseComponent */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FacetCheckListComponent.prototype, "facets", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetCheckListComponent.prototype, "header", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetCheckListComponent.prototype, "scrollbar", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetCheckListComponent.prototype, "expanded", void 0);
FacetCheckListComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-facet-check-list',
        template: __webpack_require__(119)
    })
], FacetCheckListComponent);



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FacetTypeaheadListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetTypeaheadHighlight; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_facet_base_facet_base_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FacetTypeaheadListComponent = (function (_super) {
    __extends(FacetTypeaheadListComponent, _super);
    function FacetTypeaheadListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expanded = true;
        _this.typeaheadConfig = {};
        _this.suggestions = [];
        _this.simplified = true;
        _this.nativeElement = _this._elementRef.nativeElement;
        _this.defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
        return _this;
    }
    FacetTypeaheadListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"]) {
            // handle an observable of data
            this.typeaheadOptions = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].from(this.facets).map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            });
        }
        else {
            // handle an array of data
            this.typeaheadOptions = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.facets).map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            });
        }
        // provide default values for typeahead config
        for (var prop in this.defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this.defaultTypeaheadConfig[prop];
            }
        }
    };
    FacetTypeaheadListComponent.prototype.selectOption = function (typeaheadOption) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(function (facet) { return facet === typeaheadOption.item; })) {
            return;
        }
        // select the facet
        this.selectFacet(typeaheadOption.item);
        // clear the typeahead
        this.searchQuery = '';
    };
    FacetTypeaheadListComponent.prototype.scrollToFocused = function () {
        var dropdown = this.nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(function () {
            // find the currently active element if there is one
            var activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                var elementBounds = activeElement.getBoundingClientRect();
                var dropdownBounds = dropdown.getBoundingClientRect();
                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }
                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
    };
    return FacetTypeaheadListComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_facet_base_facet_base_component__["a" /* FacetBaseComponent */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], FacetTypeaheadListComponent.prototype, "facets", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FacetTypeaheadListComponent.prototype, "header", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetTypeaheadListComponent.prototype, "expanded", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], FacetTypeaheadListComponent.prototype, "typeaheadConfig", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], FacetTypeaheadListComponent.prototype, "suggestions", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FacetTypeaheadListComponent.prototype, "simplified", void 0);
FacetTypeaheadListComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-facet-typeahead-list',
        template: __webpack_require__(121)
    })
], FacetTypeaheadListComponent);

var FacetTypeaheadHighlight = (function () {
    function FacetTypeaheadHighlight() {
    }
    FacetTypeaheadHighlight.prototype.transform = function (value, searchQuery) {
        var regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"facet-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    return FacetTypeaheadHighlight;
}());
FacetTypeaheadHighlight = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"]({
        name: 'facetTypeaheadHighlight'
    })
], FacetTypeaheadHighlight);



/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterDynamicComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_dropdown__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_base_filter_base_component__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilterDynamicComponent = (function (_super) {
    __extends(FilterDynamicComponent, _super);
    function FilterDynamicComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        _this.showTypeahead = true;
        _this.typeaheadItems = [];
        return _this;
    }
    FilterDynamicComponent.prototype.getItems = function () {
        var _this = this;
        return this.filters.filter(function (item) { return item !== _this.initial; }).map(function (item) { return item.name; });
    };
    FilterDynamicComponent.prototype.ngOnInit = function () {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    };
    FilterDynamicComponent.prototype.selectOption = function (typeaheadOption) {
        this.removeFilter();
        var idx = this.filters.findIndex(function (filter) { return filter.name === typeaheadOption.value; });
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.searchQuery = '';
        this.dropdown.hide();
    };
    FilterDynamicComponent.prototype.clickOff = function (event) {
        var target = event.target;
        var hideDropdown = true;
        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            }
            else {
                target = target.parentElement;
            }
        }
        if (hideDropdown) {
            this.searchQuery = '';
            this.dropdown.hide();
        }
    };
    FilterDynamicComponent.prototype.removeFilter = function () {
        if (this.selected !== this.initial) {
            _super.prototype.removeFilter.call(this, this.selected);
            this.selected = this.initial;
        }
        this.searchQuery = '';
    };
    FilterDynamicComponent.prototype.selectFilter = function (filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    };
    return FilterDynamicComponent;
}(__WEBPACK_IMPORTED_MODULE_2__filter_base_filter_base_component__["a" /* FilterBaseComponent */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Array)
], FilterDynamicComponent.prototype, "filters", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Object)
], FilterDynamicComponent.prototype, "initial", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Object)
], FilterDynamicComponent.prototype, "options", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"](__WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_dropdown__["BsDropdownDirective"]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_dropdown__["BsDropdownDirective"])
], FilterDynamicComponent.prototype, "dropdown", void 0);
FilterDynamicComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'ux-filter-dynamic',
        template: __webpack_require__(126),
        host: {
            '(document:click)': 'clickOff($event)',
        }
    })
], FilterDynamicComponent);



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_base_filter_base_component__ = __webpack_require__(13);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterDropdownComponent = (function (_super) {
    __extends(FilterDropdownComponent, _super);
    function FilterDropdownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterDropdownComponent.prototype.removeFilter = function () {
        _super.prototype.removeFilter.call(this, this.selected);
        this.selected = this.initial;
    };
    FilterDropdownComponent.prototype.ngOnInit = function () {
        this.selected = this.initial;
    };
    FilterDropdownComponent.prototype.selectFilter = function (filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    };
    return FilterDropdownComponent;
}(__WEBPACK_IMPORTED_MODULE_1__filter_base_filter_base_component__["a" /* FilterBaseComponent */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], FilterDropdownComponent.prototype, "initial", void 0);
FilterDropdownComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-filter-dropdown',
        template: __webpack_require__(127),
    })
], FilterDropdownComponent);



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FlippableCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FlippableCardFrontDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlippableCardBackDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FlippableCardComponent = (function () {
    function FlippableCardComponent() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    FlippableCardComponent.prototype.setFlipped = function (state) {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    };
    FlippableCardComponent.prototype.toggleFlipped = function () {
        this.setFlipped(!this.flipped);
    };
    FlippableCardComponent.prototype.clickTrigger = function () {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    };
    FlippableCardComponent.prototype.hoverEnter = function () {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    };
    FlippableCardComponent.prototype.hoverExit = function () {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    };
    return FlippableCardComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FlippableCardComponent.prototype, "direction", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], FlippableCardComponent.prototype, "trigger", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], FlippableCardComponent.prototype, "width", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], FlippableCardComponent.prototype, "height", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FlippableCardComponent.prototype, "flipped", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], FlippableCardComponent.prototype, "flippedChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlippableCardComponent.prototype, "clickTrigger", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlippableCardComponent.prototype, "hoverEnter", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlippableCardComponent.prototype, "hoverExit", null);
FlippableCardComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-flippable-card',
        template: __webpack_require__(130),
        host: {
            '[class.horizontal]': 'direction === "horizontal"',
            '[class.vertical]': 'direction === "vertical"'
        },
        exportAs: 'ux-flippable-card'
    })
], FlippableCardComponent);

var FlippableCardFrontDirective = (function () {
    function FlippableCardFrontDirective() {
    }
    return FlippableCardFrontDirective;
}());
FlippableCardFrontDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: 'ux-flippable-card-front'
    })
], FlippableCardFrontDirective);

var FlippableCardBackDirective = (function () {
    function FlippableCardBackDirective() {
    }
    return FlippableCardBackDirective;
}());
FlippableCardBackDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: 'ux-flippable-card-back'
    })
], FlippableCardBackDirective);



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ItemDisplayPanelContentDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ItemDisplayPanelFooterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDisplayPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ItemDisplayPanelContentDirective = (function () {
    function ItemDisplayPanelContentDirective() {
    }
    return ItemDisplayPanelContentDirective;
}());
ItemDisplayPanelContentDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxItemDisplayPanelContent]'
    })
], ItemDisplayPanelContentDirective);

var ItemDisplayPanelFooterDirective = (function () {
    function ItemDisplayPanelFooterDirective() {
    }
    return ItemDisplayPanelFooterDirective;
}());
ItemDisplayPanelFooterDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxItemDisplayPanelFooter]'
    })
], ItemDisplayPanelFooterDirective);

var ItemDisplayPanelComponent = (function () {
    function ItemDisplayPanelComponent() {
        this.visibleChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._visible = false;
        this._boxShadow = true;
        this._closeVisible = true;
        this._preventClose = false;
        this._inline = false;
        this._animate = false;
        this._shadow = false;
    }
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "top", {
        get: function () {
            return this._top;
        },
        set: function (top) {
            this._top = typeof top === 'string' ? parseFloat(top) : top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (visible) {
            this._visible = visible;
            // invoke change event
            this.visibleChange.emit(this._visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "boxShadow", {
        get: function () {
            return this._boxShadow;
        },
        set: function (boxShadow) {
            this._boxShadow = typeof boxShadow === 'string' ? !(boxShadow === 'false') : boxShadow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "closeVisible", {
        get: function () {
            return this._closeVisible;
        },
        set: function (closeVisible) {
            this._closeVisible = typeof closeVisible === 'string' ? !(closeVisible === 'false') : closeVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "preventClose", {
        get: function () {
            return this._preventClose;
        },
        set: function (preventClose) {
            this._preventClose = typeof preventClose === 'string' ? preventClose === 'true' : preventClose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "inline", {
        get: function () {
            return this._inline;
        },
        set: function (inline) {
            this._inline = typeof inline === 'string' ? inline === 'true' : inline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "animate", {
        get: function () {
            return this._animate;
        },
        set: function (animate) {
            this._animate = typeof animate === 'string' ? animate === 'true' : animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "shadow", {
        get: function () {
            return this._shadow;
        },
        set: function (shadow) {
            this._shadow = typeof shadow === 'string' ? shadow === 'true' : shadow;
        },
        enumerable: true,
        configurable: true
    });
    ItemDisplayPanelComponent.prototype.clickOff = function (event) {
        // dont close
        if (this.preventClose) {
            return;
        }
        // dont do anything if the panel is hidden
        if (this._visible) {
            var target = event.target;
            // if the target node is the HTML tag, then this was triggered by scrolling and we should not close the panel
            if (target.nodeName === 'HTML') {
                return;
            }
            var hidePanel = true;
            while (target && target.nodeName !== 'BODY') {
                if (target.classList.contains('ux-item-display-panel')) {
                    hidePanel = false;
                    break;
                }
                else {
                    target = target.parentElement;
                }
            }
            if (hidePanel) {
                this._visible = false;
                this.visibleChange.emit(this._visible);
            }
        }
    };
    return ItemDisplayPanelComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], ItemDisplayPanelComponent.prototype, "title", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"](ItemDisplayPanelFooterDirective),
    __metadata("design:type", ItemDisplayPanelFooterDirective)
], ItemDisplayPanelComponent.prototype, "footer", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ItemDisplayPanelComponent.prototype, "visibleChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ItemDisplayPanelComponent.prototype, "top", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "visible", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "boxShadow", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "closeVisible", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "preventClose", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "inline", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "animate", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ItemDisplayPanelComponent.prototype, "shadow", null);
ItemDisplayPanelComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-item-display-panel',
        template: __webpack_require__(133),
        host: {
            '(document:click)': 'clickOff($event)',
            '(document:keyup.escape)': 'visible = false',
            '[class.inline-host]': 'inline',
            '[class.visible-host]': 'visible'
        }
    })
], ItemDisplayPanelComponent);



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NUMBER_PICKER_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NumberPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"](function () { return NumberPickerComponent; }),
    multi: true
};
var NumberPickerComponent = (function () {
    function NumberPickerComponent() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = function (_) { };
        this.valid = true;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(NumberPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this._propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            this._step = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
        },
        enumerable: true,
        configurable: true
    });
    NumberPickerComponent.prototype.increment = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    };
    NumberPickerComponent.prototype.decrement = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    };
    NumberPickerComponent.prototype.isValid = function () {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    };
    NumberPickerComponent.prototype.onScroll = function (event) {
        var scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    };
    NumberPickerComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this._value = value;
        }
    };
    NumberPickerComponent.prototype.registerOnChange = function (fn) {
        this._propagateChange = fn;
    };
    NumberPickerComponent.prototype.registerOnTouched = function (fn) { };
    NumberPickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return NumberPickerComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], NumberPickerComponent.prototype, "valid", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", Object)
], NumberPickerComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"]('value'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], NumberPickerComponent.prototype, "value", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], NumberPickerComponent.prototype, "min", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], NumberPickerComponent.prototype, "max", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Object])
], NumberPickerComponent.prototype, "step", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Object])
], NumberPickerComponent.prototype, "disabled", null);
NumberPickerComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-number-picker',
        template: __webpack_require__(136),
        providers: [NUMBER_PICKER_VALUE_ACCESSOR],
        host: {
            '[class.has-error]': '!isValid()'
        }
    })
], NumberPickerComponent);



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageHeaderComponent = (function () {
    function PageHeaderComponent() {
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.backClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PageHeaderComponent.prototype.goBack = function () {
        this.backClick.emit();
    };
    PageHeaderComponent.prototype.getCondensedBreadcrumbs = function () {
        if (this.crumbs) {
            var crumbs = this.crumbs.slice();
            crumbs.push({ title: this.header });
            return crumbs;
        }
        return [{ title: this.header }];
    };
    return PageHeaderComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "logo", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], PageHeaderComponent.prototype, "items", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], PageHeaderComponent.prototype, "crumbs", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "header", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "alignment", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], PageHeaderComponent.prototype, "condensed", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], PageHeaderComponent.prototype, "iconMenus", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], PageHeaderComponent.prototype, "backVisible", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", Object)
], PageHeaderComponent.prototype, "backClick", void 0);
PageHeaderComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-page-header',
        exportAs: 'ux-page-header',
        template: __webpack_require__(139),
        host: {
            '[class.page-header-condensed]': 'condensed'
        }
    })
], PageHeaderComponent);



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderNavigationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigation_item_navigation_item_component__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PageHeaderNavigationComponent = (function () {
    function PageHeaderNavigationComponent() {
        this.items = [];
    }
    PageHeaderNavigationComponent.prototype.onSelect = function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
        // deselect all items in all menus
        this.deselectAll();
    };
    PageHeaderNavigationComponent.prototype.deselectAll = function () {
        var _this = this;
        this.items.forEach(function (item) { return _this.deselect(item); });
    };
    PageHeaderNavigationComponent.prototype.deselect = function (navItem) {
        var _this = this;
        // deselect the current item
        navItem.selected = false;
        // iterate any children and deselect them
        if (navItem.children) {
            navItem.children.forEach(function (item) { return _this.deselect(item); });
        }
    };
    return PageHeaderNavigationComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"](__WEBPACK_IMPORTED_MODULE_1__navigation_item_navigation_item_component__["a" /* PageHeaderNavigationItemComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
], PageHeaderNavigationComponent.prototype, "menuItems", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Array)
], PageHeaderNavigationComponent.prototype, "items", void 0);
PageHeaderNavigationComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-page-header-horizontal-navigation',
        template: __webpack_require__(144)
    })
], PageHeaderNavigationComponent);



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderNavigationItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_dropdown__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigation_dropdown_item_navigation_dropdown_item_component__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PageHeaderNavigationItemComponent = (function () {
    function PageHeaderNavigationItemComponent() {
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    PageHeaderNavigationItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.onHidden.subscribe(function () { return _this.dropdownComponents.forEach(function (dropdown) { return dropdown.close(); }); });
    };
    PageHeaderNavigationItemComponent.prototype.selectItem = function () {
        // if the item has children then do nothing at this stage 
        if (this.item.children) {
            return;
        }
        // otherwise select the current item
        this.onItemSelect(this.item);
    };
    PageHeaderNavigationItemComponent.prototype.onItemSelect = function (item) {
        this.onSelect.emit(item);
        // select the current item
        this.item.selected = true;
    };
    return PageHeaderNavigationItemComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('menu'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_dropdown__["BsDropdownDirective"])
], PageHeaderNavigationItemComponent.prototype, "menu", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"](__WEBPACK_IMPORTED_MODULE_2__navigation_dropdown_item_navigation_dropdown_item_component__["a" /* PageHeaderNavigationDropdownItemComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
], PageHeaderNavigationItemComponent.prototype, "dropdownComponents", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], PageHeaderNavigationItemComponent.prototype, "item", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PageHeaderNavigationItemComponent.prototype, "onSelect", void 0);
PageHeaderNavigationItemComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-page-header-horizontal-navigation-item',
        template: __webpack_require__(143)
    })
], PageHeaderNavigationItemComponent);



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderNavigationDropdownItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PageHeaderNavigationDropdownItemComponent = (function () {
    function PageHeaderNavigationDropdownItemComponent() {
        var _this = this;
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dropdownOpen = false;
        // create a new subject observable
        this.dropdownEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this.dropdownEvents.debounceTime(1).subscribe(function (visible) { return _this.dropdownOpen = visible; });
    }
    PageHeaderNavigationDropdownItemComponent.prototype.selectItem = function (item, parentItem) {
        // clicking on an item with children then return
        if (item.children) {
            return;
        }
        // emit the selected item in an event
        this.onSelect.emit(item);
        // select the current item
        item.selected = true;
        // now also select the parent menu
        if (parentItem) {
            parentItem.selected = true;
        }
    };
    PageHeaderNavigationDropdownItemComponent.prototype.hoverStart = function () {
        this.dropdownEvents.next(true);
    };
    PageHeaderNavigationDropdownItemComponent.prototype.hoverLeave = function () {
        this.dropdownEvents.next(false);
    };
    PageHeaderNavigationDropdownItemComponent.prototype.close = function () {
        this.dropdownOpen = false;
    };
    return PageHeaderNavigationDropdownItemComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], PageHeaderNavigationDropdownItemComponent.prototype, "item", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], PageHeaderNavigationDropdownItemComponent.prototype, "onSelect", void 0);
PageHeaderNavigationDropdownItemComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-page-header-horizontal-navigation-dropdown-item',
        template: __webpack_require__(142)
    }),
    __metadata("design:paramtypes", [])
], PageHeaderNavigationDropdownItemComponent);



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_color_index__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProgressBarComponent = (function () {
    function ProgressBarComponent(colorService) {
        this.colorService = colorService;
        this.value = 0;
        this.max = 100;
        this.trackColor = this.colorService.getColor('grey7').toHex();
        this.barColor = this.colorService.getColor('accent').toHex();
        this.percentage = 0;
    }
    ProgressBarComponent.prototype.ngOnChanges = function (changes) {
        this.percentage = (this.value / this.max) * 100;
    };
    return ProgressBarComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "value", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "max", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], ProgressBarComponent.prototype, "trackColor", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], ProgressBarComponent.prototype, "barColor", void 0);
ProgressBarComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-progress-bar',
        template: __webpack_require__(148)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_color_index__["a" /* ColorService */]])
], ProgressBarComponent);



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ThemeColor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    __param(0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"](__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["DOCUMENT"])),
    __metadata("design:paramtypes", [Object])
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
        this.a = alpha.toString();
        return this;
    };
    return ThemeColor;
}());



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RADIOBUTTON_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RadioButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RADIOBUTTON_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"](function () { return RadioButtonComponent; }),
    multi: true
};
var RadioButtonComponent = (function () {
    function RadioButtonComponent() {
        this.simplified = false;
        this.disabled = false;
        this.name = '';
        this.clickable = true;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(RadioButtonComponent.prototype, "value", {
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
    RadioButtonComponent.prototype.checkItem = function () {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    };
    RadioButtonComponent.prototype.keyDown = function (event) {
        // then toggle the checkbox
        this.checkItem();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    };
    // Functions required to update ng-model
    RadioButtonComponent.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], RadioButtonComponent.prototype, "id", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], RadioButtonComponent.prototype, "simplified", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], RadioButtonComponent.prototype, "disabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], RadioButtonComponent.prototype, "name", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], RadioButtonComponent.prototype, "clickable", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], RadioButtonComponent.prototype, "option", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], RadioButtonComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], RadioButtonComponent.prototype, "value", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RadioButtonComponent.prototype, "checkItem", null);
RadioButtonComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-radio-button',
        template: __webpack_require__(151),
        providers: [RADIOBUTTON_VALUE_ACCESSOR]
    })
], RadioButtonComponent);



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SELECT_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeahead_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SELECT_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_1__angular_core__["forwardRef"](function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    function SelectComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this._input = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]('');
        this.inputChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this._dropdownOpen = false;
        this.dropdownOpenChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this.propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "input", {
        get: function () {
            return this._input.getValue();
        },
        set: function (value) {
            this._input.next(value);
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownOpen", {
        get: function () {
            return this._dropdownOpen;
        },
        set: function (value) {
            this._dropdownOpen = value;
            this.dropdownOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Changes to the input field
        this._input.subscribe(function (next) {
            if (!_this.multiple && next !== _this.getDisplay(_this.value)) {
                if (_this.allowNull) {
                    _this.value = null;
                }
            }
        });
        // Set up filter from input
        this.filter = this._input
            .map(function (input) {
            if (!_this.multiple && input === _this.getDisplay(_this.value)) {
                return '';
            }
            return input;
        })
            .debounceTime(200);
        // Changes to filter value
        this.filter.subscribe(function (next) {
            // Open the dropdown when filter is nonempty.
            if (next && next.length > 0) {
                _this.dropdownOpen = true;
            }
        });
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.value) {
            if (!this.multiple && changes.value.currentValue !== null) {
                this.input = this.getDisplay(changes.value.currentValue);
            }
        }
        if (changes.multiple && changes.multiple.currentValue !== changes.multiple.previousValue) {
            this.input = '';
        }
    };
    SelectComponent.prototype.writeValue = function (obj) {
        if (obj !== undefined) {
            this._value = obj;
        }
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) { };
    SelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    SelectComponent.prototype.inputClickHandler = function (event) {
        this.selectInputText();
        this.dropdownOpen = true;
    };
    SelectComponent.prototype.inputBlurHandler = function (event) {
        var _this = this;
        // Close dropdown and reset text input if focus is lost
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.dropdownOpen = false;
                if (!_this.multiple) {
                    _this.input = _this.getDisplay(_this.value);
                }
            }
        }, 200);
    };
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     */
    SelectComponent.prototype.inputKeyHandler = function (event) {
        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);
        switch (event.key) {
            case 'Enter':
                if (this.dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                }
                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    };
    SelectComponent.prototype.singleOptionSelected = function (event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    };
    /**
     * Returns the display value of the given option.
     */
    SelectComponent.prototype.getDisplay = function (option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[this.display];
        }
        return option;
    };
    SelectComponent.prototype.selectInputText = function () {
        this.singleInput.nativeElement.select();
    };
    return SelectComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"]('value'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SelectComponent.prototype, "value", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object)
], SelectComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"]('input'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], SelectComponent.prototype, "input", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object)
], SelectComponent.prototype, "inputChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"]('dropdownOpen'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], SelectComponent.prototype, "dropdownOpen", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object)
], SelectComponent.prototype, "dropdownOpenChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Object)
], SelectComponent.prototype, "options", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Function)
], SelectComponent.prototype, "display", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Function)
], SelectComponent.prototype, "key", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "allowNull", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "disabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], SelectComponent.prototype, "dropDirection", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], SelectComponent.prototype, "maxHeight", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], SelectComponent.prototype, "multiple", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Number)
], SelectComponent.prototype, "pageSize", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], SelectComponent.prototype, "placeholder", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], SelectComponent.prototype, "loadingTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], SelectComponent.prototype, "noOptionsTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], SelectComponent.prototype, "optionTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('singleInput'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
], SelectComponent.prototype, "singleInput", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('multipleTypeahead'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__typeahead_index__["a" /* TypeaheadComponent */])
], SelectComponent.prototype, "multipleTypeahead", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('singleTypeahead'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__typeahead_index__["a" /* TypeaheadComponent */])
], SelectComponent.prototype, "singleTypeahead", void 0);
SelectComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'ux-select',
        template: __webpack_require__(160),
        providers: [SELECT_VALUE_ACCESSOR]
    }),
    __param(1, __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"](__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["DOCUMENT"])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        HTMLDocument,
        __WEBPACK_IMPORTED_MODULE_0__typeahead_index__["b" /* TypeaheadKeyService */]])
], SelectComponent);



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeaheadOptionEvent; });
var TypeaheadOptionEvent = (function () {
    function TypeaheadOptionEvent(option) {
        this.option = option;
    }
    return TypeaheadOptionEvent;
}());



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeaheadKeyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TypeaheadKeyService = (function () {
    function TypeaheadKeyService() {
    }
    TypeaheadKeyService.prototype.handleKey = function (event, typeahead) {
        if (typeahead) {
            switch (event.key) {
                case 'ArrowUp':
                case 'Up':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(-1);
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                case 'Down':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(1);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                case 'Esc':
                    typeahead.open = false;
                    break;
            }
        }
    };
    return TypeaheadKeyService;
}());
TypeaheadKeyService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [])
], TypeaheadKeyService);



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeaheadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeahead_event__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TypeaheadComponent = (function () {
    function TypeaheadComponent(typeaheadElement) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this._open = false;
        this.openChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.optionSelected = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this._highlighted = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.visibleOptions = [];
        this.loading = false;
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = function (pageNum, pageSize, filter) {
            if (typeof _this.options === 'function') {
                return _this.options(pageNum, pageSize, filter);
            }
            return null;
        };
    }
    Object.defineProperty(TypeaheadComponent.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            var originalValue = this._open;
            this._open = value;
            if (value !== originalValue) {
                this.openChange.emit(value);
                if (value) {
                    this.initOptions();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadComponent.prototype, "highlighted", {
        get: function () {
            return this._highlighted.getValue();
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadComponent.prototype.ngOnInit = function () {
        // Attach default loading template
        if (!this.loadingTemplate) {
            this.loadingTemplate = this._defaultLoadingTemplate;
        }
        // Attach default option template
        if (!this.optionTemplate) {
            this.optionTemplate = this._defaultOptionTemplate;
        }
        // Attach default "no results" template
        if (!this.noOptionsTemplate) {
            this.noOptionsTemplate = this._defaultNoOptionsTemplate;
        }
    };
    TypeaheadComponent.prototype.ngOnChanges = function (changes) {
        // Open the dropdown if the filter value updates
        if (changes.filter) {
            if (this.openOnFilterChange && changes.filter.currentValue && changes.filter.currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    };
    TypeaheadComponent.prototype.optionMousedownHandler = function (event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    };
    TypeaheadComponent.prototype.optionClickHandler = function (event, option) {
        this.select(option);
    };
    /**
     * Returns the unique key value of the given option.
     */
    TypeaheadComponent.prototype.getKey = function (option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[this.key];
        }
        return this.getDisplay(option);
    };
    /**
     * Returns the display value of the given option.
     */
    TypeaheadComponent.prototype.getDisplay = function (option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[this.display];
        }
        return option;
    };
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param option
     */
    TypeaheadComponent.prototype.getDisplayHtml = function (option) {
        var displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var displayHtml = displayText;
        if (this.filter) {
            var length_1 = this.filter.length;
            var matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var highlight = "<span class=\"ux-filter-match\">" + displayText.substr(matchIndex, length_1) + "</span>";
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length_1);
            }
        }
        return displayHtml;
    };
    /**
     * Returns true if the infinite scroll component should load
     */
    TypeaheadComponent.prototype.isInfiniteScroll = function () {
        return typeof this.options === 'function';
    };
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     */
    TypeaheadComponent.prototype.select = function (option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new __WEBPACK_IMPORTED_MODULE_0__typeahead_event__["a" /* TypeaheadOptionEvent */](option));
            this._highlighted.next(null);
            this.open = false;
        }
    };
    /**
     * Returns true if the given option is part of the disabledOptions array.
     */
    TypeaheadComponent.prototype.isDisabled = function (option) {
        var _this = this;
        if (this.disabledOptions) {
            var optionKey_1 = this.getKey(option);
            var result = this.disabledOptions.find(function (selectedOption) {
                return _this.getKey(selectedOption) === optionKey_1;
            });
            return result !== undefined;
        }
        return false;
    };
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     */
    TypeaheadComponent.prototype.highlight = function (option) {
        if (!this.isDisabled(option)) {
            this._highlighted.next(option);
        }
    };
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     */
    TypeaheadComponent.prototype.moveHighlight = function (d) {
        var highlightIndex = this.indexOfVisibleOption(this.highlighted);
        var newIndex = highlightIndex;
        var disabled = true;
        var inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < this.visibleOptions.length);
            disabled = inBounds && this.isDisabled(this.visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this._highlighted.next(this.visibleOptions[newIndex]);
        }
        return this.highlighted;
    };
    /**
     * Returns true if the given option is the highlighted option.
     */
    TypeaheadComponent.prototype.isHighlighted = function (option) {
        return this.getKey(option) === this.getKey(this.highlighted);
    };
    /**
     * Set up the options before the dropdown is displayed.
     */
    TypeaheadComponent.prototype.initOptions = function () {
        // Clear previous highlight
        this._highlighted.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    };
    /**
     * Update the visibleOptions array with the current filter.
     */
    TypeaheadComponent.prototype.updateOptions = function () {
        var _this = this;
        if (typeof this.options === 'object') {
            var normalisedInput_1 = (this.filter || '').toLowerCase();
            this.visibleOptions = this.options.filter(function (option) {
                return _this.getDisplay(option).toLowerCase().indexOf(normalisedInput_1) >= 0;
            });
        }
        this.initOptions();
    };
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     */
    TypeaheadComponent.prototype.indexOfVisibleOption = function (option) {
        var _this = this;
        if (option) {
            var optionKey_2 = this.getKey(option);
            return this.visibleOptions.findIndex(function (el) {
                return _this.getKey(el) === optionKey_2;
            });
        }
        return -1;
    };
    return TypeaheadComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Object)
], TypeaheadComponent.prototype, "options", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], TypeaheadComponent.prototype, "filter", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"]('open'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], TypeaheadComponent.prototype, "open", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object)
], TypeaheadComponent.prototype, "openChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Function)
], TypeaheadComponent.prototype, "display", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Function)
], TypeaheadComponent.prototype, "key", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Array)
], TypeaheadComponent.prototype, "disabledOptions", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], TypeaheadComponent.prototype, "dropDirection", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", String)
], TypeaheadComponent.prototype, "maxHeight", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TypeaheadComponent.prototype, "openOnFilterChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Number)
], TypeaheadComponent.prototype, "pageSize", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TypeaheadComponent.prototype, "selectFirst", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "loadingTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "optionTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "noOptionsTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object)
], TypeaheadComponent.prototype, "optionSelected", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TypeaheadComponent.prototype, "highlighted", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('defaultLoadingTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "_defaultLoadingTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('defaultOptionTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "_defaultOptionTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"]('defaultNoOptionsTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"])
], TypeaheadComponent.prototype, "_defaultNoOptionsTemplate", void 0);
TypeaheadComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"]({
        selector: 'ux-typeahead',
        template: __webpack_require__(153),
        host: {
            '[class.open]': 'open',
            '[class.drop-up]': 'dropDirection === "up"',
            '[style.maxHeight]': 'maxHeight'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]])
], TypeaheadComponent);



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return InfiniteScrollLoadingEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return InfiniteScrollLoadedEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return InfiniteScrollLoadErrorEvent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_load_button_directive__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_loading_directive__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_auditTime__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_auditTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_auditTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_combineLatest__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_partition__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_partition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_partition__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var InfiniteScrollDirective = (function () {
    function InfiniteScrollDirective(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.loadingEvent = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.loadedEvent = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.loadErrorEvent = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this._nextPageNum = 0;
        this._updateRequests = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this._isLoading = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this._isExhausted = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this._loadButtonEnabled = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this._loadButtonSubscriptions = [];
        this._canLoadManually = this._isLoading.combineLatest(this._isExhausted, this._loadButtonEnabled, function (isLoading, isExhausted, loadButtonEnabled) {
            return !isLoading && !isExhausted && loadButtonEnabled;
        });
    }
    Object.defineProperty(InfiniteScrollDirective.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this.collectionChange.emit(value);
            this._collection = value;
        },
        enumerable: true,
        configurable: true
    });
    InfiniteScrollDirective.prototype.ngOnInit = function () {
        if (!this.scrollElement) {
            this.scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    };
    InfiniteScrollDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        var requests = this._updateRequests.partition(function (r) { return r.check; });
        requests[0].auditTime(200).subscribe(this.doRequest.bind(this));
        requests[1].subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.subscribe(function (canLoad) {
            _this._loadButtonQuery.forEach(function (loadButton) {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.subscribe(function (isLoading) {
            _this._loadingIndicatorQuery.forEach(function (loading) {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.subscribe(function (query) {
            _this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    };
    InfiniteScrollDirective.prototype.ngOnChanges = function (changes) {
        var check = true;
        if (changes.enabled && changes.enabled.currentValue !== changes.enabled.previousValue) {
            if (changes.enabled.currentValue) {
                this.attachEventHandlers();
                this.reset();
                check = false;
            }
            else {
                this.detachEventHandlers();
            }
        }
        if (this.enabled) {
            if (changes.filter && changes.filter.currentValue !== changes.filter.previousValue) {
                this.reset();
                check = false;
            }
            if (changes.loadOnScroll) {
                this._loadButtonEnabled.next(!changes.loadOnScroll.currentValue);
            }
            if (changes.pageSize && changes.pageSize.currentValue !== changes.pageSize.previousValue) {
                this.reset();
                check = false;
            }
            this._updateRequests.next({
                check: check,
                pageNumber: this._nextPageNum,
                pageSize: this.pageSize,
                filter: this.filter
            });
        }
    };
    InfiniteScrollDirective.prototype.ngOnDestroy = function () {
        this.detachEventHandlers();
    };
    /**
     * Request an additional page of data.
     */
    InfiniteScrollDirective.prototype.loadNextPage = function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     */
    InfiniteScrollDirective.prototype.check = function () {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    };
    /**
     * Clear the collection. Future requests will load from page 0.
     */
    InfiniteScrollDirective.prototype.reset = function () {
        if (!this.enabled) {
            return;
        }
        // Reset the page counter.
        this._nextPageNum = 0;
        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }
        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
    };
    InfiniteScrollDirective.prototype.onScroll = function (event) {
        this.check();
    };
    InfiniteScrollDirective.prototype.onDomChange = function () {
        this.check();
    };
    /**
     * Attach scroll event handler and DOM observer.
     */
    InfiniteScrollDirective.prototype.attachEventHandlers = function () {
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].fromEvent(this.scrollElement.nativeElement, 'scroll')
            .subscribe(this.onScroll.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.onDomChange.bind(this));
        this._domObserver.observe(this.scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    };
    /**
     * Detach scroll event handler and DOM observer.
     */
    InfiniteScrollDirective.prototype.detachEventHandlers = function () {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    };
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     */
    InfiniteScrollDirective.prototype.attachLoadButtonEvents = function () {
        var _this = this;
        this._loadButtonSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._loadButtonSubscriptions = this._loadButtonQuery.map(function (loadButton) {
            return loadButton.load.subscribe(_this.loadNextPage.bind(_this));
        });
    };
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     */
    InfiniteScrollDirective.prototype.doRequest = function (request) {
        var _this = this;
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not 
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            var loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            Promise.resolve(loadResult)
                .then(function (newData) {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === _this.filter && request.pageSize === _this.pageSize) {
                    if (newData && newData.length) {
                        Array.prototype.push.apply(_this.collection, newData);
                    }
                    // Emit the loaded event
                    _this.endLoading(request, newData);
                }
            })
                .catch(function (reason) {
                // Emit the loadError event
                _this.endLoadingWithError(request, reason);
            });
        }
    };
    /**
     * Returns true if the request should be fulfilled.
     */
    InfiniteScrollDirective.prototype.needsData = function (request) {
        if (!this.enabled) {
            return false;
        }
        // Always load for a load request
        if (!request.check) {
            return true;
        }
        // Ignore a check request when the end of data has been detected, or if data is currently loading.
        if (this._isExhausted.getValue() || this._isLoading.getValue()) {
            return false;
        }
        // Load if the remaining scroll area is <= the element height.
        if (this.scrollElement && this.loadOnScroll) {
            var element = this.scrollElement.nativeElement;
            var remainingScroll = element.scrollHeight - (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    };
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     */
    InfiniteScrollDirective.prototype.beginLoading = function (request) {
        var event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    };
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     */
    InfiniteScrollDirective.prototype.endLoading = function (request, data) {
        this._isLoading.next(false);
        var isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        this._nextPageNum += 1;
    };
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     */
    InfiniteScrollDirective.prototype.endLoadingWithError = function (request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    };
    return InfiniteScrollDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"]('uxInfiniteScroll'),
    __metadata("design:type", Function)
], InfiniteScrollDirective.prototype, "load", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"]('collection'),
    __metadata("design:type", Array)
], InfiniteScrollDirective.prototype, "_collection", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], InfiniteScrollDirective.prototype, "enabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Object)
], InfiniteScrollDirective.prototype, "filter", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], InfiniteScrollDirective.prototype, "loadOnInit", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], InfiniteScrollDirective.prototype, "loadOnScroll", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Number)
], InfiniteScrollDirective.prototype, "pageSize", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"])
], InfiniteScrollDirective.prototype, "scrollElement", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], InfiniteScrollDirective.prototype, "collectionChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"]('loading'),
    __metadata("design:type", Object)
], InfiniteScrollDirective.prototype, "loadingEvent", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"]('loaded'),
    __metadata("design:type", Object)
], InfiniteScrollDirective.prototype, "loadedEvent", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"]('loadError'),
    __metadata("design:type", Object)
], InfiniteScrollDirective.prototype, "loadErrorEvent", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_0__infinite_scroll_load_button_directive__["a" /* InfiniteScrollLoadButtonDirective */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["QueryList"])
], InfiniteScrollDirective.prototype, "_loadButtonQuery", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_1__infinite_scroll_loading_directive__["a" /* InfiniteScrollLoadingDirective */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["QueryList"])
], InfiniteScrollDirective.prototype, "_loadingIndicatorQuery", void 0);
InfiniteScrollDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Directive"]({
        selector: '[uxInfiniteScroll]',
        exportAs: 'uxInfiniteScroll'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"]])
], InfiniteScrollDirective);

/**
 * The internal data associated with a load/check request.
 */
var InfiniteScrollRequest = (function () {
    function InfiniteScrollRequest() {
    }
    return InfiniteScrollRequest;
}());
/**
 * Event raised before the `loading` function is called.
 */
var InfiniteScrollLoadingEvent = (function () {
    function InfiniteScrollLoadingEvent(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber, 
        /**
         * The number of items requested.
         */
        pageSize, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     */
    InfiniteScrollLoadingEvent.prototype.preventDefault = function () {
        this._defaultPrevented = true;
    };
    InfiniteScrollLoadingEvent.prototype.defaultPrevented = function () {
        return this._defaultPrevented;
    };
    return InfiniteScrollLoadingEvent;
}());

/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
var InfiniteScrollLoadedEvent = (function () {
    function InfiniteScrollLoadedEvent(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber, 
        /**
         * The number of items requested.
         */
        pageSize, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter, 
        /**
         * The result of the promise returned from the loading function.
         */
        data, 
        /**
         * True if the data is considered exhausted (number of items returned less than `pageSize`).
         */
        exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.data = data;
        this.exhausted = exhausted;
    }
    return InfiniteScrollLoadedEvent;
}());

/**
 * Event raised if the loading function returns a rejected promise.
 */
var InfiniteScrollLoadErrorEvent = (function () {
    function InfiniteScrollLoadErrorEvent(
        /**
         * The index of the requested page, starting from 0.
         */
        pageNumber, 
        /**
         * The number of items requested.
         */
        pageSize, 
        /**
         * The filter details as provided via the `filter` binding.
         */
        filter, 
        /**
         * The object provided when rejecting the promise.
         */
        error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter;
        this.error = error;
    }
    return InfiniteScrollLoadErrorEvent;
}());



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll_into_view_if_directive__ = __webpack_require__(69);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__scroll_into_view_if_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scroll_into_view_service__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__scroll_into_view_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scroll_into_view_if_module__ = __webpack_require__(159);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__scroll_into_view_if_module__["a"]; });





/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollIntoViewIfDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll_into_view_service__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScrollIntoViewIfDirective = (function () {
    function ScrollIntoViewIfDirective(element, scrollIntoViewService) {
        this.element = element;
        this.scrollIntoViewService = scrollIntoViewService;
        this.condition = false;
    }
    ScrollIntoViewIfDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.condition) {
            setTimeout(function () {
                _this.scrollIntoViewService.scrollIntoView(_this.element.nativeElement, _this.scrollParent);
            });
        }
    };
    return ScrollIntoViewIfDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"]('uxScrollIntoViewIf'),
    __metadata("design:type", Object)
], ScrollIntoViewIfDirective.prototype, "condition", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"](),
    __metadata("design:type", HTMLElement)
], ScrollIntoViewIfDirective.prototype, "scrollParent", void 0);
ScrollIntoViewIfDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"]({ selector: '[uxScrollIntoViewIf]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__scroll_into_view_service__["a" /* ScrollIntoViewService */]])
], ScrollIntoViewIfDirective);



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tag_input_event__ = __webpack_require__(71);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__tag_input_event__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_input_component__ = __webpack_require__(72);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__tag_input_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag_input_module__ = __webpack_require__(163);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__tag_input_module__["a"]; });





/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagInputEvent; });
var TagInputEvent = (function () {
    function TagInputEvent(tag) {
        this.tag = tag;
        this._defaultPrevented = false;
    }
    TagInputEvent.prototype.preventDefault = function () {
        this._defaultPrevented = true;
    };
    TagInputEvent.prototype.defaultPrevented = function () {
        return this._defaultPrevented;
    };
    return TagInputEvent;
}());



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__typeahead_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_input_event__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var TAGINPUT_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_3__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_2__angular_core__["forwardRef"](function () { return TagInputComponent; }),
    multi: true
};
var TAGINPUT_VALIDATOR = {
    provide: __WEBPACK_IMPORTED_MODULE_3__angular_forms__["NG_VALIDATORS"],
    useExisting: __WEBPACK_IMPORTED_MODULE_2__angular_core__["forwardRef"](function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = (function () {
    function TagInputComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this._tags = [];
        this.tagsChange = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this._input = '';
        this.inputChange = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.addOnPaste = true;
        this.disabled = false;
        this.enforceTagLimits = false;
        this.freeInput = true;
        this.maxTags = Number.MAX_VALUE;
        this.minTags = 0;
        this.placeholder = '';
        this.showTypeaheadOnClick = false;
        this.tagDelimiters = '';
        this.validationErrors = {};
        this.tagAdding = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tagAdded = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tagInvalidated = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tagRemoving = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tagRemoved = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.tagClick = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.selectedIndex = -1;
        this.tagApi = {
            getTagDisplay: this.getTagDisplay.bind(this),
            removeTagAt: this.removeTagAt.bind(this),
            canRemoveTagAt: this.canRemoveTagAt.bind(this)
        };
        this.valid = true;
        this.inputValid = true;
        this.onChangeHandler = function () { };
        this.onTouchedHandler = function () { };
    }
    Object.defineProperty(TagInputComponent.prototype, "tags", {
        get: function () {
            if (!this._tags) {
                this._tags = [];
            }
            return this._tags;
        },
        set: function (value) {
            this._tags = value;
            this.onChangeHandler(this._tags);
            this.tagsChange.emit(this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "input", {
        get: function () {
            return this._input;
        },
        set: function (value) {
            this._input = value;
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    TagInputComponent.prototype.ngOnInit = function () {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    };
    TagInputComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe(function (query) {
            _this.connectTypeahead(query.first);
        });
    };
    TagInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.disabled) {
            if (changes.disabled.currentValue) {
                // Clear selection and close dropdown
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }
        // Update validation status
        this.validate();
    };
    TagInputComponent.prototype.writeValue = function (value) {
        if (value) {
            this.tags = value;
        }
    };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeHandler = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedHandler = fn;
    };
    /**
     * Validate the value of the control (tags property).
     */
    TagInputComponent.prototype.validate = function () {
        this.valid = true;
        var tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    };
    TagInputComponent.prototype.keyHandler = function (event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        var inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        var hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        var tagSelected = this.isValidTagIndex(this.selectedIndex);
        var inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        var canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        var canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
        // Forward key events to the typeahead component.
        this._typeaheadKeyService.handleKey(event, this.typeahead);
        switch (event.key) {
            case 'Enter':
                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                }
                else {
                    // Validate and add the input text as a tag, if possible
                    this.commitInput();
                }
                event.preventDefault();
                break;
            case 'Backspace':
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'Delete':
            case 'Del':
                if (tagSelected) {
                    this.removeTagAt(this.selectedIndex);
                }
                break;
            case 'ArrowLeft':
            case 'Left':
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (canNavigateRight) {
                    this.moveSelection(1);
                    event.preventDefault();
                }
                break;
        }
        // Check for keys in the tagDelimiters
        if (this.tagDelimiters && this.tagDelimiters.indexOf(this.getKeyChar(event)) >= 0) {
            // Commit previous text
            this.commitInput();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    TagInputComponent.prototype.focusOutHandler = function (event) {
        var _this = this;
        // Close the dropdown on blur
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.selectedIndex = -1;
                if (_this.typeahead) {
                    _this.typeahead.open = false;
                }
            }
        }, 200);
    };
    TagInputComponent.prototype.tagClickHandler = function (event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        var tagClickEvent = new __WEBPACK_IMPORTED_MODULE_1__tag_input_event__["a" /* TagInputEvent */](tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    };
    TagInputComponent.prototype.inputClickHandler = function () {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    };
    TagInputComponent.prototype.inputFocusHandler = function () {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    };
    TagInputComponent.prototype.inputPasteHandler = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            var input = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            }
            else if (window.clipboardData) {
                // Internet Explorer only
                input = window.clipboardData.getData('Text');
            }
            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    TagInputComponent.prototype.typeaheadOptionSelectedHandler = function (event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    };
    /**
     * Commit the current input value and clear the input field if successful.
     */
    TagInputComponent.prototype.commitInput = function () {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given tag object and clear the input if successful.
     */
    TagInputComponent.prototype.commitTypeahead = function (tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     */
    TagInputComponent.prototype.commit = function (input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            var newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            var allValid = true;
            for (var _i = 0, newTags_1 = newTags; _i < newTags_1.length; _i++) {
                var newTag = newTags_1[_i];
                var valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }
            // Add the tags if all are valid
            if (allValid) {
                for (var _a = 0, newTags_2 = newTags; _a < newTags_2.length; _a++) {
                    var newTag = newTags_2[_a];
                    this.addTag(this.createTag(newTag));
                }
                return true;
            }
        }
        return false;
    };
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     */
    TagInputComponent.prototype.backspace = function () {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    };
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    TagInputComponent.prototype.moveSelection = function (d) {
        if (this.disabled) {
            return;
        }
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;
            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            }
            else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    };
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     */
    TagInputComponent.prototype.getTagDisplay = function (tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[this.display];
        }
        return tag;
    };
    /**
     * Returns true if the given index is selected (tag index or input field).
     */
    TagInputComponent.prototype.isSelected = function (index) {
        return index === this.selectedIndex;
    };
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     */
    TagInputComponent.prototype.selectTagAt = function (tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    };
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    TagInputComponent.prototype.selectInput = function () {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    };
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    TagInputComponent.prototype.removeTagAt = function (tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            var tag = this.tags[tagIndex];
            var tagRemovingEvent = new __WEBPACK_IMPORTED_MODULE_1__tag_input_event__["a" /* TagInputEvent */](tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();
                // Remove the tag
                this.tags.splice(tagIndex, 1);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new __WEBPACK_IMPORTED_MODULE_1__tag_input_event__["a" /* TagInputEvent */](tag));
                this.validate();
            }
        }
    };
    /**
     * Returns true if the tag at the given index can be removed.
     */
    TagInputComponent.prototype.canRemoveTagAt = function (tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if the input field should be available.
     */
    TagInputComponent.prototype.isInputVisible = function () {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if any part of the control has focus.
     */
    TagInputComponent.prototype.hasFocus = function () {
        return this.isValidSelectIndex(this.selectedIndex);
    };
    TagInputComponent.prototype.connectTypeahead = function (typeahead) {
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
        }
    };
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     */
    TagInputComponent.prototype.validateTag = function (tagValue) {
        var inputPattern = null;
        this.inputValid = true;
        if (this.tagPattern && !this.tagPattern.test(tagValue)) {
            inputPattern = {
                given: tagValue,
                pattern: this.tagPattern
            };
            this.inputValid = false;
        }
        this.validationErrors['inputPattern'] = inputPattern;
        return this.inputValid;
    };
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     */
    TagInputComponent.prototype.createTag = function (tagValue) {
        var tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        }
        else if (typeof this.display === 'string') {
            tag = {};
            tag[this.display] = tagValue;
        }
        else {
            tag = tagValue;
        }
        return tag;
    };
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     */
    TagInputComponent.prototype.addTag = function (tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            var displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                var tagAddingEvent = new __WEBPACK_IMPORTED_MODULE_1__tag_input_event__["a" /* TagInputEvent */](tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = this.tags || [];
                    this.tags.push(tag);
                    this.tagAdded.emit(new __WEBPACK_IMPORTED_MODULE_1__tag_input_event__["a" /* TagInputEvent */](tag));
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns true if the given tagIndex is a valid tag index.
     */
    TagInputComponent.prototype.isValidTagIndex = function (tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    };
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     */
    TagInputComponent.prototype.isValidSelectIndex = function (index) {
        return index >= 0 && index <= this.tags.length;
    };
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     */
    TagInputComponent.prototype.getKeyChar = function (event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    };
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     */
    TagInputComponent.prototype.splitTagInput = function (input) {
        var tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            var escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var delimiterRegex = new RegExp("[" + escapedDelimiters + "]", 'g');
            tagValues = input.split(delimiterRegex).filter(function (s) { return s.length > 0; });
        }
        return tagValues;
    };
    return TagInputComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"]('tags'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Array])
], TagInputComponent.prototype, "tags", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagsChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"]('input'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], TagInputComponent.prototype, "input", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "inputChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Function)
], TagInputComponent.prototype, "display", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "addOnPaste", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "disabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "enforceTagLimits", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "freeInput", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Number)
], TagInputComponent.prototype, "maxTags", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Number)
], TagInputComponent.prototype, "minTags", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", String)
], TagInputComponent.prototype, "placeholder", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], TagInputComponent.prototype, "showTypeaheadOnClick", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", String)
], TagInputComponent.prototype, "tagDelimiters", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", RegExp)
], TagInputComponent.prototype, "tagPattern", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["TemplateRef"])
], TagInputComponent.prototype, "tagTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "validationErrors", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"]('createTag'),
    __metadata("design:type", Function)
], TagInputComponent.prototype, "createTagHandler", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagAdding", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagAdded", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagInvalidated", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagRemoving", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagRemoved", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"](),
    __metadata("design:type", Object)
], TagInputComponent.prototype, "tagClick", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_0__typeahead_index__["a" /* TypeaheadComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["QueryList"])
], TagInputComponent.prototype, "typeaheadQuery", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"]('tagInput'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"])
], TagInputComponent.prototype, "tagInput", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"]('defaultTagTemplate'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["TemplateRef"])
], TagInputComponent.prototype, "_defaultTagTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["HostListener"]('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], TagInputComponent.prototype, "keyHandler", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["HostListener"]('focusout', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FocusEvent]),
    __metadata("design:returntype", void 0)
], TagInputComponent.prototype, "focusOutHandler", null);
TagInputComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"]({
        selector: 'ux-tag-input',
        template: __webpack_require__(162),
        providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
        host: {
            '[class.disabled]': 'disabled',
            '[class.focus]': 'hasFocus()',
            '[class.invalid]': '!valid || !inputValid'
        }
    }),
    __param(1, __WEBPACK_IMPORTED_MODULE_2__angular_core__["Inject"](__WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["DOCUMENT"])),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"],
        Document,
        __WEBPACK_IMPORTED_MODULE_0__typeahead_index__["b" /* TypeaheadKeyService */]])
], TagInputComponent);



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__focus_if_directive__ = __webpack_require__(74);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__focus_if_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__focus_if_module__ = __webpack_require__(164);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__focus_if_module__["a"]; });




/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusIfDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FocusIfDirective = (function () {
    function FocusIfDirective(elementRef) {
        this.elementRef = elementRef;
        this.focusIf = false;
    }
    FocusIfDirective.prototype.ngOnChanges = function (changes) {
        if (changes.focusIf && changes.focusIf.previousValue === false && changes.focusIf.currentValue === true) {
            this.elementRef.nativeElement.focus();
        }
    };
    return FocusIfDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], FocusIfDirective.prototype, "focusIf", void 0);
FocusIfDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({ selector: '[focusIf]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], FocusIfDirective);



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SliderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SliderType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SliderStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SliderSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderCalloutTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SliderSnap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SliderTickType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SliderThumbEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SliderThumb; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_color_index__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SliderComponent = (function () {
    function SliderComponent(colorService) {
        this.value = 0;
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // expose enums to Angular view
        this.sliderType = SliderType;
        this.sliderStyle = SliderStyle;
        this.sliderSize = SliderSize;
        this.sliderThumb = SliderThumb;
        this.sliderTickType = SliderTickType;
        this.sliderThumbEvent = SliderThumbEvent;
        this.tracks = {
            lower: {
                size: 0,
                color: ''
            },
            middle: {
                size: 0,
                color: ''
            },
            upper: {
                size: 0,
                color: ''
            }
        };
        this.tooltips = {
            lower: {
                visible: false,
                position: 0,
                label: ''
            },
            upper: {
                visible: false,
                position: 0,
                label: ''
            }
        };
        this.thumbs = {
            lower: {
                hover: false,
                drag: false,
                position: 0,
                order: 100,
                value: null
            },
            upper: {
                hover: false,
                drag: false,
                position: 0,
                order: 101,
                value: null
            }
        };
        // store all the ticks to display
        this.ticks = [];
        this.mouseMove = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(document, 'mousemove');
        this.mouseUp = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(document, 'mouseup');
        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: function (value) { return value; }
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
                        formatter: function (value) { return value; }
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: function (value) { return value; }
                    }
                },
                colors: {
                    lower: colorService.getColor('grey6').toHex(),
                    range: colorService.getColor('accent').setAlpha(0.75).toRgba(),
                    higher: colorService.getColor('grey6').toHex()
                }
            }
        };
    }
    SliderComponent.prototype.ngOnInit = function () {
        // set up event observables
        this.initObservables();
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
    };
    SliderComponent.prototype.ngDoCheck = function () {
        // check if value has changed
        if (!this.deepCompare(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(function () {
            _this.updateTooltipPosition(SliderThumb.Lower);
            _this.updateTooltipPosition(SliderThumb.Upper);
        });
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        this.lowerDrag.unsubscribe();
        this.upperDrag.unsubscribe();
    };
    SliderComponent.prototype.getFormattedValue = function (thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    };
    SliderComponent.prototype.initObservables = function () {
        var _this = this;
        // when a user begins to drag lower thumb - subscribe to mouse move events until the mouse is lifted
        this.lowerThumbDown = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.lowerThumb.nativeElement, 'mousedown');
        this.lowerDrag = this.lowerThumbDown.switchMap(function (event) {
            event.preventDefault();
            return _this.mouseMove.takeUntil(_this.mouseUp);
        }).subscribe(function (event) {
            event.preventDefault();
            _this.updateThumbPosition(event, SliderThumb.Lower);
        });
        // when a user begins to drag upper thumb - subscribe to mouse move events until the mouse is lifted
        this.upperThumbDown = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.upperThumb.nativeElement, 'mousedown');
        this.upperDrag = this.upperThumbDown.switchMap(function (event) {
            event.preventDefault();
            return _this.mouseMove.takeUntil(_this.mouseUp);
        }).subscribe(function (event) {
            event.preventDefault();
            _this.updateThumbPosition(event, SliderThumb.Upper);
        });
    };
    SliderComponent.prototype.getThumbState = function (thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    };
    SliderComponent.prototype.setThumbState = function (thumb, hover, drag) {
        if (thumb === SliderThumb.Lower) {
            this.thumbs.lower.hover = hover;
            this.thumbs.lower.drag = drag;
        }
        else {
            this.thumbs.upper.hover = hover;
            this.thumbs.upper.drag = drag;
        }
        // update the visibility of the tooltips
        this.updateTooltips(thumb);
    };
    SliderComponent.prototype.onDragEnd = function () {
        // update thumb state here as we are not dragging any more
        this.thumbEvent(SliderThumb.Lower, SliderThumbEvent.DragEnd);
        this.thumbEvent(SliderThumb.Upper, SliderThumbEvent.DragEnd);
    };
    SliderComponent.prototype.thumbEvent = function (thumb, event) {
        // get the current thumb state
        var state = this.getThumbState(thumb);
        // update based upon event
        switch (event) {
            case SliderThumbEvent.DragStart:
                state.drag = true;
                break;
            case SliderThumbEvent.DragEnd:
                state.drag = false;
                break;
            case SliderThumbEvent.MouseOver:
                state.hover = true;
                break;
            case SliderThumbEvent.MouseLeave:
                state.hover = false;
                break;
            case SliderThumbEvent.None:
                state.drag = false;
                state.hover = false;
                break;
        }
        // update the thumb state
        this.setThumbState(thumb, state.hover, state.drag);
    };
    SliderComponent.prototype.updateTooltips = function (thumb) {
        var visible = false;
        var state = this.getThumbState(thumb);
        switch (this.options.handles.callout.trigger) {
            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;
            case SliderCalloutTrigger.Drag:
                visible = state.drag;
                break;
            case SliderCalloutTrigger.Hover:
                visible = state.hover || state.drag;
                break;
        }
        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;
        // update the tooltip text
        this.updateTooltipText(thumb);
        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    };
    SliderComponent.prototype.updateTooltipText = function (thumb) {
        // get the thumb value
        var state = this.getThumbState(thumb);
        var tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    };
    SliderComponent.prototype.getThumbElement = function (thumb) {
        return thumb === SliderThumb.Lower ? this.lowerThumb : this.upperThumb;
    };
    SliderComponent.prototype.getTooltipElement = function (thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    };
    SliderComponent.prototype.getTooltip = function (thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    };
    SliderComponent.prototype.updateTooltipPosition = function (thumb) {
        var tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        var tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        var thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        var tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        var tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
    };
    SliderComponent.prototype.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    SliderComponent.prototype.updateThumbPosition = function (event, thumb) {
        // get event position - either mouse or touch
        var eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        var mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        var trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        var position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        var fraction = (position / trackBounds.width);
        // convert to value within the range
        var value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
        // ensure value is valid
        value = this.validateValue(thumb, value);
        // snap to a tick if required
        value = this.snapToTick(value, thumb);
        // update the value accordingly
        this.setThumbValue(thumb, value);
        this.updateOrder(thumb);
        this.updateValues();
        // update tooltip text & position
        this.updateTooltipText(thumb);
        this.updateTooltipPosition(thumb);
    };
    SliderComponent.prototype.updateOrder = function (thumb) {
        var lower = thumb === SliderThumb.Lower ? 101 : 100;
        var upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    };
    SliderComponent.prototype.snapToTick = function (value, thumb) {
        // get the snap target
        var snapTarget = this.options.track.ticks.snap;
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return value;
        }
        // get filtered ticks
        var ticks;
        switch (snapTarget) {
            case SliderSnap.Minor:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Minor; });
                break;
            case SliderSnap.Major:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Major; });
                break;
            default:
                ticks = this.ticks.slice(0);
        }
        // get the track limit
        var lowerLimit = this.options.track.min;
        var upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        var closest = ticks.filter(function (tick) { return tick.value >= lowerLimit && tick.value <= upperLimit; })
            .reduceRight(function (previous, current) {
            var previousDistance = Math.max(previous.value, value) - Math.min(previous.value, value);
            var currentDistance = Math.max(current.value, value) - Math.min(current.value, value);
            return previousDistance < currentDistance ? previous : current;
        });
        return closest.value;
    };
    SliderComponent.prototype.validateValue = function (thumb, value) {
        // if slider is not a range value is always valid
        if (this.options.type === SliderType.Value) {
            return value;
        }
        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return this.options.track.max;
        }
        if (value < this.options.track.min) {
            return this.options.track.min;
        }
        // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
        if (thumb === SliderThumb.Lower) {
            if (this.thumbs.upper.value === null) {
                return value;
            }
            return value <= this.thumbs.upper.value ? value : this.thumbs.upper.value;
        }
        if (thumb === SliderThumb.Upper) {
            if (this.thumbs.lower.value === null) {
                return value;
            }
            return value >= this.thumbs.lower.value ? value : this.thumbs.lower.value;
        }
    };
    SliderComponent.prototype.updateOptions = function () {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    };
    SliderComponent.prototype.updateValues = function () {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        var lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        var upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, lowerValue);
        upperValue = this.validateValue(SliderThumb.Upper, upperValue);
        // calculate the positions as percentages
        var lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        var upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;
        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;
        // update the value input
        this.setValue(lowerValue, upperValue);
    };
    SliderComponent.prototype.setValue = function (low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        var previousValue = this.value;
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.value !== previousValue) {
            this.valueChange.emit(this.value);
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
    };
    SliderComponent.prototype.setThumbValue = function (thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    };
    SliderComponent.prototype.updateTicks = function () {
        // get tick options
        var majorOptions = this.options.track.ticks.major;
        var minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor
        var majorTicks = this.getTicks(majorOptions, SliderTickType.Major);
        var minorTicks = this.getTicks(minorOptions, SliderTickType.Minor);
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    };
    SliderComponent.prototype.updateTrackColors = function () {
        // get colors for each part of the track
        var lower = this.options.track.colors.lower;
        var range = this.options.track.colors.range;
        var higher = this.options.track.colors.higher;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : "linear-gradient(to right, " + lower.join(', ') + ")";
        this.tracks.middle.color = typeof range === 'string' ? range : "linear-gradient(to right, " + range.join(', ') + ")";
        this.tracks.upper.color = typeof higher === 'string' ? higher : "linear-gradient(to right, " + higher.join(', ') + ")";
    };
    SliderComponent.prototype.getSteps = function (steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        var output = [];
        // otherwise calculate the steps
        for (var idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    };
    SliderComponent.prototype.getTicks = function (options, type) {
        // create an array to store the ticks and step points
        var steps = this.getSteps(options.steps);
        // get some chart options
        var min = this.options.track.min;
        var max = this.options.track.max;
        // convert each step to a slider tick and remove invalid ticks
        return steps.map(function (step) {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(function (tick) { return tick.position >= 0 && tick.position <= 100; });
    };
    SliderComponent.prototype.unionTicks = function (majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter(function (tick, index, array) { return tick.type === SliderTickType.Major || !array.find(function (tk) { return tk.type === SliderTickType.Major && tk.position === tick.position; }); })
            .sort(function (t1, t2) { return t1.value - t2.value; });
    };
    SliderComponent.prototype.deepMerge = function (destination, source) {
        // loop though all of the properties in the source object
        for (var prop in source) {
            // check if the destination object has the property
            if (!destination.hasOwnProperty(prop)) {
                // copy the property across
                destination[prop] = source[prop];
                continue;
            }
            // if the property exists and is not an object then skip
            if (typeof destination[prop] !== 'object') {
                continue;
            }
            // check if property is an array
            if (destination[prop] instanceof Array) {
                continue;
            }
            // if it is an object then perform a recursive check
            destination[prop] = this.deepMerge(destination[prop], source[prop]);
        }
        return destination;
    };
    SliderComponent.prototype.deepCompare = function (value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            return value1 === value2;
        }
        return JSON.stringify(value1) === JSON.stringify(value2);
    };
    SliderComponent.prototype.clone = function (value) {
        if (typeof value !== 'object') {
            return value;
        }
        return Object.assign({}, value);
    };
    return SliderComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], SliderComponent.prototype, "value", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], SliderComponent.prototype, "options", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], SliderComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('lowerThumb'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SliderComponent.prototype, "lowerThumb", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('lowerTooltip'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SliderComponent.prototype, "lowerTooltip", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('upperThumb'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SliderComponent.prototype, "upperThumb", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('upperTooltip'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SliderComponent.prototype, "upperTooltip", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('track'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SliderComponent.prototype, "track", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('document:mouseup', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SliderComponent.prototype, "onDragEnd", null);
SliderComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-slider',
        template: __webpack_require__(167)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_color_index__["a" /* ColorService */]])
], SliderComponent);

var SliderType;
(function (SliderType) {
    SliderType[SliderType["Value"] = 0] = "Value";
    SliderType[SliderType["Range"] = 1] = "Range";
})(SliderType || (SliderType = {}));
var SliderStyle;
(function (SliderStyle) {
    SliderStyle[SliderStyle["Button"] = 0] = "Button";
    SliderStyle[SliderStyle["Line"] = 1] = "Line";
})(SliderStyle || (SliderStyle = {}));
var SliderSize;
(function (SliderSize) {
    SliderSize[SliderSize["Narrow"] = 0] = "Narrow";
    SliderSize[SliderSize["Wide"] = 1] = "Wide";
})(SliderSize || (SliderSize = {}));
var SliderCalloutTrigger;
(function (SliderCalloutTrigger) {
    SliderCalloutTrigger[SliderCalloutTrigger["None"] = 0] = "None";
    SliderCalloutTrigger[SliderCalloutTrigger["Hover"] = 1] = "Hover";
    SliderCalloutTrigger[SliderCalloutTrigger["Drag"] = 2] = "Drag";
    SliderCalloutTrigger[SliderCalloutTrigger["Persistent"] = 3] = "Persistent";
})(SliderCalloutTrigger || (SliderCalloutTrigger = {}));
var SliderSnap;
(function (SliderSnap) {
    SliderSnap[SliderSnap["None"] = 0] = "None";
    SliderSnap[SliderSnap["Minor"] = 1] = "Minor";
    SliderSnap[SliderSnap["Major"] = 2] = "Major";
    SliderSnap[SliderSnap["All"] = 3] = "All";
})(SliderSnap || (SliderSnap = {}));
var SliderTickType;
(function (SliderTickType) {
    SliderTickType[SliderTickType["Minor"] = 0] = "Minor";
    SliderTickType[SliderTickType["Major"] = 1] = "Major";
})(SliderTickType || (SliderTickType = {}));
var SliderThumbEvent;
(function (SliderThumbEvent) {
    SliderThumbEvent[SliderThumbEvent["None"] = 0] = "None";
    SliderThumbEvent[SliderThumbEvent["MouseOver"] = 1] = "MouseOver";
    SliderThumbEvent[SliderThumbEvent["MouseLeave"] = 2] = "MouseLeave";
    SliderThumbEvent[SliderThumbEvent["DragStart"] = 3] = "DragStart";
    SliderThumbEvent[SliderThumbEvent["DragEnd"] = 4] = "DragEnd";
})(SliderThumbEvent || (SliderThumbEvent = {}));
var SliderThumb;
(function (SliderThumb) {
    SliderThumb[SliderThumb["Lower"] = 0] = "Lower";
    SliderThumb[SliderThumb["Upper"] = 1] = "Upper";
})(SliderThumb || (SliderThumb = {}));


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_color_index__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SparkComponent = (function () {
    function SparkComponent(colorService) {
        this.colorService = colorService;
        this.trackColor = this.colorService.getColor('primary').setAlpha(0.2).toRgba();
        this.barColor = this.colorService.getColor('primary').toHex();
        this.value = 0;
        this.barHeight = 10;
    }
    Object.defineProperty(SparkComponent.prototype, "theme", {
        set: function (themeName) {
            this.trackColor = this.colorService.getColor(themeName).setAlpha(0.2).toRgba();
            this.barColor = this.colorService.getColor(themeName).toHex();
        },
        enumerable: true,
        configurable: true
    });
    return SparkComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "trackColor", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "barColor", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], SparkComponent.prototype, "value", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], SparkComponent.prototype, "barHeight", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "inlineLabel", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "topLeftLabel", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "topRightLabel", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "bottomLeftLabel", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "bottomRightLabel", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], SparkComponent.prototype, "tooltip", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SparkComponent.prototype, "theme", null);
SparkComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-spark',
        template: __webpack_require__(170)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_color_index__["a" /* ColorService */]])
], SparkComponent);



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleSwitchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: __WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"](function () { return ToggleSwitchComponent; }),
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], ToggleSwitchComponent.prototype, "name", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], ToggleSwitchComponent.prototype, "disabled", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], ToggleSwitchComponent.prototype, "clickable", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], ToggleSwitchComponent.prototype, "valueChange", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], ToggleSwitchComponent.prototype, "value", null);
ToggleSwitchComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-toggleswitch',
        template: __webpack_require__(173),
        providers: [TOGGLESWITCH_VALUE_ACCESSOR],
        host: {
            '(click)': 'toggleChecked()'
        }
    })
], ToggleSwitchComponent);



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_player_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_audio_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MediaPlayerComponent = (function () {
    function MediaPlayerComponent(mediaPlayerService, _audioService, _elementRef) {
        var _this = this;
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        // show controls when hovering and in quiet mode
        this._hover$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this._elementRef.nativeElement, 'mousemove').switchMap(function (event) {
            _this.hovering = true;
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(event);
        }).debounceTime(2000).subscribe(function () { return _this.hovering = false; });
    }
    Object.defineProperty(MediaPlayerComponent.prototype, "source", {
        get: function () {
            return this.mediaPlayerService.source;
        },
        set: function (value) {
            this.mediaPlayerService.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "type", {
        get: function () {
            return this.mediaPlayerService.type;
        },
        set: function (value) {
            this.mediaPlayerService.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "quietMode", {
        get: function () {
            return this.mediaPlayerService.quietMode;
        },
        set: function (value) {
            this.mediaPlayerService.quietMode = value;
        },
        enumerable: true,
        configurable: true
    });
    MediaPlayerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this._playing$ = this.mediaPlayerService.playingEvent.subscribe(function (event) { return _this.mediaPlayerService.playing.next(true); });
        this._paused$ = this.mediaPlayerService.pauseEvent.subscribe(function (event) { return _this.mediaPlayerService.playing.next(false); });
        this._clicked$ = this.mediaPlayerService.mediaClickEvent.subscribe(function () { return _this.mediaPlayerService.togglePlay(); });
        this._loading$ = this.mediaPlayerService.loadedMetadataEvent.subscribe(function () { return _this.mediaPlayerService.loaded = true; });
    };
    MediaPlayerComponent.prototype.ngOnDestroy = function () {
        this._hover$.unsubscribe();
        this._playing$.unsubscribe();
        this._paused$.unsubscribe();
        this._clicked$.unsubscribe();
        this._loading$.unsubscribe();
    };
    return MediaPlayerComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('player'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerComponent.prototype, "_playerRef", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('trackBar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerComponent.prototype, "_trackBarRef", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MediaPlayerComponent.prototype, "source", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], MediaPlayerComponent.prototype, "type", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], MediaPlayerComponent.prototype, "quietMode", null);
MediaPlayerComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-media-player',
        template: __webpack_require__(179),
        providers: [__WEBPACK_IMPORTED_MODULE_1__media_player_service__["a" /* MediaPlayerService */]],
        host: {
            'tabindex': '0',
            '(keydown.Space)': 'mediaPlayerService.togglePlay()',
            '[class.standard]': '!mediaPlayerService.fullscreen',
            '[class.fullscreen]': 'mediaPlayerService.fullscreen',
            '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
            '[class.hover]': 'hovering',
            '[class.video]': 'type === "video"',
            '[class.audio]': 'type === "audio"',
            '(mouseenter)': 'hovering = true',
            '(mouseleave)': 'hovering = false',
            '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
            '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
            '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange($event)'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__media_player_service__["a" /* MediaPlayerService */], __WEBPACK_IMPORTED_MODULE_3__services_audio_index__["a" /* AudioService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
], MediaPlayerComponent);



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__frame_extraction_module__ = __webpack_require__(80);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__frame_extraction_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frame_extraction_service__ = __webpack_require__(81);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__frame_extraction_service__["a"]; });




/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrameExtractionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frame_extraction_service__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FrameExtractionModule = (function () {
    function FrameExtractionModule() {
    }
    return FrameExtractionModule;
}());
FrameExtractionModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        providers: [__WEBPACK_IMPORTED_MODULE_1__frame_extraction_service__["a" /* FrameExtractionService */]],
    })
], FrameExtractionModule);



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrameExtractionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_concat__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_concat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_concat__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FrameExtractionService = (function () {
    function FrameExtractionService() {
    }
    FrameExtractionService.prototype.createVideoPlayer = function (source) {
        var videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    };
    FrameExtractionService.prototype.createCanvas = function (width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    FrameExtractionService.prototype.goToFrame = function (videoPlayer, time) {
        videoPlayer.currentTime = time;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    };
    FrameExtractionService.prototype.getThumbnail = function (videoPlayer, canvas, time, width, height) {
        var _this = this;
        if (width === void 0) { width = 160; }
        if (height === void 0) { height = 90; }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            // go to specified frame
            var subscription = _this.goToFrame(videoPlayer, time).subscribe(function (event) {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    };
    FrameExtractionService.prototype.getFrameThumbnail = function (source, width, height, time) {
        // create required elements
        var videoPlayer = this.createVideoPlayer(source);
        var canvas = this.createCanvas(width, height);
        var frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished        
        frameSubscription.subscribe(null, null, function () {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    };
    FrameExtractionService.prototype.getFrameThumbnails = function (source, width, height, start, end, skip) {
        var _this = this;
        if (skip === void 0) { skip = 5; }
        // create required elements
        var videoPlayer = this.createVideoPlayer(source);
        var canvas = this.createCanvas(width, height);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(videoPlayer, 'loadedmetadata').subscribe(function () {
                // calculate the frames required
                var frames = [];
                for (var idx = start; idx < end; idx += skip) {
                    frames.push(_this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].concat.apply(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"], frames).subscribe(function (frame) { return observer.next(frame); }, null, function () {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    };
    return FrameExtractionService;
}());
FrameExtractionService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], FrameExtractionService);



/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AudioService = (function () {
    function AudioService(_http) {
        this._http = _http;
    }
    AudioService.prototype.getAudioFileMetadata = function (mediaElement) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this._http.request(mediaElement.src, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["ResponseContentType"].Blob }).subscribe(function (response) {
                var filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                var extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                var blob = response.blob();
                var description;
                switch (extension) {
                    case 'mp3':
                        description = 'MPEG audio layer 3 file';
                        break;
                    case 'wma':
                        description = 'Windows media audio file';
                        break;
                    case 'wav':
                        description = 'WAVE audio file';
                        break;
                    case 'ogg':
                        description = 'Ogg Vorbis file';
                        break;
                    case 'aac':
                        description = 'Advanced audio coding file';
                        break;
                    case 'midi':
                        description = 'Musical instrument digital interface file';
                        break;
                    default:
                        description = 'Audio file';
                        break;
                }
                observer.next({
                    filename: filename,
                    extension: extension,
                    description: description,
                    size: blob.size
                });
            });
        });
    };
    AudioService.prototype.getWaveformFromUrl = function (url) {
        var _this = this;
        // if audio context is not support return a stream of empty data
        if (!window.AudioContext) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            // load the media from the URL provided
            _this._http.request(url, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["ResponseContentType"].ArrayBuffer }).subscribe(function (response) {
                _this.getAudioBuffer(response.arrayBuffer()).subscribe(function (audioBuffer) {
                    // create the buffer source
                    _this.createBufferSource(audioBuffer);
                    var dataPoints = [];
                    var channels = _this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (var channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = _this._audioBuffer.getChannelData(channelIdx);
                    }
                    observer.next(dataPoints);
                    observer.complete();
                    // cleanup after ourselves
                    dataPoints = null;
                }, function (error) { return observer.error(error); });
            }, function (error) { return observer.error(error); });
        });
    };
    AudioService.prototype.getWaveformPoints = function (channels, skip) {
        if (channels === void 0) { channels = []; }
        if (skip === void 0) { skip = 1000; }
        var waveform = [];
        var duration = channels.length > 0 ? channels[0].length : 0;
        var _loop_1 = function (idx) {
            // get all the channel data for a specific point
            var points = channels.map(function (channel) { return channel[idx]; });
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce(function (previous, current) { return current < previous ? current : previous; }),
                max: points.reduce(function (previous, current) { return current > previous ? current : previous; })
            });
        };
        // convert each channel data to a series of waveform points
        for (var idx = 0; idx < duration; idx += skip) {
            _loop_1(idx);
        }
        return waveform;
    };
    AudioService.prototype.getAudioBuffer = function (arrayBuffer) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            _this.getOfflineAudioContext().decodeAudioData(arrayBuffer, function (audioBuffer) {
                observer.next(audioBuffer);
                observer.complete();
            }, function (error) { return observer.error(error); });
        });
    };
    AudioService.prototype.getOfflineAudioContext = function () {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    };
    AudioService.prototype.createBufferSource = function (audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    };
    AudioService.prototype.createVolumeNode = function () {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    };
    AudioService.prototype.createAnalyserNode = function () {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    };
    AudioService.prototype.disconnectSource = function () {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    };
    return AudioService;
}());
AudioService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"](),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
], AudioService);



/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_83__;

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerTimelineExtensionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_extension_directive__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MediaPlayerTimelineExtensionComponent = (function (_super) {
    __extends(MediaPlayerTimelineExtensionComponent, _super);
    function MediaPlayerTimelineExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.current = 0;
        _this.position = 0;
        _this.duration = 0;
        _this.buffered = [];
        _this.mouseDown = false;
        _this.quietMode = false;
        _this.fullscreen = false;
        _this.scrub = {
            visible: false,
            position: 0,
            time: 0
        };
        return _this;
    }
    MediaPlayerTimelineExtensionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.subscribe(function (duration) { return _this.duration = duration; });
        this.mediaPlayerService.quietModeEvent.subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.fullscreenEvent.subscribe(function (fullscreen) {
            _this.fullscreen = fullscreen;
            _this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.subscribe(function (current) {
            _this.current = current;
            _this.position = (_this.current / _this.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.subscribe(function (buffered) {
            _this.buffered = [];
            for (var idx = 0; idx < buffered.length; idx++) {
                _this.buffered.push({ start: (buffered.start(idx) / _this.duration) * 100, end: (buffered.end(idx) / _this.duration) * 100 });
            }
        });
    };
    MediaPlayerTimelineExtensionComponent.prototype.updateScrub = function (event) {
        var timeline = this.timelineRef.nativeElement;
        var bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    };
    return MediaPlayerTimelineExtensionComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_extension_directive__["a" /* MediaPlayerBaseExtensionDirective */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('timeline'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerTimelineExtensionComponent.prototype, "timelineRef", void 0);
MediaPlayerTimelineExtensionComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-media-player-timeline',
        template: __webpack_require__(180),
        host: {
            '(document:mouseup)': 'mouseDown = false',
            '[class.quiet]': 'quietMode || fullscreen'
        }
    })
], MediaPlayerTimelineExtensionComponent);



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerControlsExtensionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_extension_directive__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_timer__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_timer__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MediaPlayerControlsExtensionComponent = (function (_super) {
    __extends(MediaPlayerControlsExtensionComponent, _super);
    function MediaPlayerControlsExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fullscreen = false;
        _this.volumeActive = false;
        _this.volumeDragging = false;
        _this._volume = 50;
        _this._previousVolume = 50;
        return _this;
    }
    Object.defineProperty(MediaPlayerControlsExtensionComponent.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (value) {
            if (value === 0 && this._volume !== 0) {
                this._previousVolume = this._volume;
            }
            this._volume = Math.min(Math.max(value, 0), 100);
            this.mediaPlayerService.volume = this._volume / 100;
        },
        enumerable: true,
        configurable: true
    });
    MediaPlayerControlsExtensionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mediaPlayerService.playEvent.subscribe(function (_) { return _this.playing = true; });
        this.mediaPlayerService.pauseEvent.subscribe(function (_) { return _this.playing = false; });
        this.mediaPlayerService.quietModeEvent.subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.volumeChangeEvent.subscribe(function (volume) { return _this.volume = volume * 100; });
        this.mediaPlayerService.initEvent.debounceTime(1).filter(function (init) { return init === true; }).subscribe(function () { return _this.volume = _this.mediaPlayerService.volume * 100; });
        this.mediaPlayerService.fullscreenEvent.subscribe(function (fullscreen) { return _this.fullscreen = fullscreen; });
        var mouseenter$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        var mouseenterContainer$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        var mouseleaveContainer$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.subscribe(function () { return _this.volumeActive = true; });
        mouseleaveContainer$.switchMap(function () { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].timer(1500).takeUntil(mouseenterContainer$); }).subscribe(function () { return _this.volumeActive = false; });
    };
    MediaPlayerControlsExtensionComponent.prototype.toggleMute = function () {
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    };
    MediaPlayerControlsExtensionComponent.prototype.togglePlay = function () {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    };
    MediaPlayerControlsExtensionComponent.prototype.setFullscreen = function () {
        this.mediaPlayerService.toggleFullscreen();
    };
    MediaPlayerControlsExtensionComponent.prototype.goToStart = function () {
        this.mediaPlayerService.currentTime = 0;
    };
    MediaPlayerControlsExtensionComponent.prototype.goToEnd = function () {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    };
    MediaPlayerControlsExtensionComponent.prototype.dragStart = function (event) {
        event.preventDefault();
        this.volumeDragging = true;
        var thumb = event.target;
        thumb.focus();
    };
    MediaPlayerControlsExtensionComponent.prototype.dragMove = function (event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        var slider = this.volumeSlider.nativeElement;
        var bounds = slider.getBoundingClientRect();
        var x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    };
    MediaPlayerControlsExtensionComponent.prototype.dragEnd = function () {
        this.volumeDragging = false;
    };
    return MediaPlayerControlsExtensionComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_extension_directive__["a" /* MediaPlayerBaseExtensionDirective */]));
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('volumeIcon'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerControlsExtensionComponent.prototype, "volumeIcon", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('volumeSlider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerControlsExtensionComponent.prototype, "volumeSlider", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('volumeContainer'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], MediaPlayerControlsExtensionComponent.prototype, "volumeContainer", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('document:mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], MediaPlayerControlsExtensionComponent.prototype, "dragMove", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('document:mouseup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaPlayerControlsExtensionComponent.prototype, "dragEnd", null);
MediaPlayerControlsExtensionComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-media-player-controls',
        template: __webpack_require__(182),
        host: {
            '[class.quiet]': 'quietMode || fullscreen'
        }
    })
], MediaPlayerControlsExtensionComponent);



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__duration_module__ = __webpack_require__(183);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__duration_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration_pipe__ = __webpack_require__(87);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__duration_pipe__["a"]; });




/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DurationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DurationPipe = (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (seconds) {
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
        }
        else {
            return this.pad(minutes) + ":" + this.pad(seconds);
        }
    };
    DurationPipe.prototype.pad = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value.toString();
    };
    return DurationPipe;
}());
DurationPipe = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"]({
        name: 'duration'
    })
], DurationPipe);



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_size_module__ = __webpack_require__(184);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__file_size_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_size_pipe__ = __webpack_require__(89);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__file_size_pipe__["a"]; });




/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileSizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FileSizePipe = (function () {
    function FileSizePipe() {
    }
    FileSizePipe.prototype.transform = function (value) {
        // allow for async values
        if (!value) {
            return value;
        }
        var units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        var idx = Math.floor(Math.log(value) / Math.log(1024));
        var formattedValue = value / Math.pow(1024, idx);
        return formattedValue.toFixed(2) + " " + units[idx];
    };
    return FileSizePipe;
}());
FileSizePipe = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"]({
        name: 'fileSize'
    })
], FileSizePipe);



/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualScrollComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_virtual_scroll_loading_directive__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_virtual_scroll_load_button_directive__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_cell_directive__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(_elementRef, resizeService, renderer) {
        var _this = this;
        this._elementRef = _elementRef;
        this.collection = __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].create();
        this.loadOnScroll = true;
        this.loading = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cells = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement, renderer).subscribe(function (event) { return _this._height = event.height; });
    }
    VirtualScrollComponent.prototype.ngOnInit = function () {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    };
    VirtualScrollComponent.prototype.ngAfterContentInit = function () {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    };
    VirtualScrollComponent.prototype.ngOnChanges = function (changes) {
        if (changes.collection && changes.collection.currentValue !== changes.collection.previousValue && !changes.collection.isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    };
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    VirtualScrollComponent.prototype.setupObservable = function () {
        var _this = this;
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(function (collection) {
            (_a = _this.data).push.apply(_a, collection);
            _this.renderCells();
            _this.isLoading = false;
            var _a;
        }, null, function () {
            _this.loadingComplete = true;
        });
    };
    VirtualScrollComponent.prototype.renderCells = function () {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            var remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    };
    VirtualScrollComponent.prototype.getVisibleCells = function () {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        var scrollTop = this._elementRef.nativeElement.scrollTop;
        var startCell = Math.floor(scrollTop / this.cellHeight);
        var endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    };
    VirtualScrollComponent.prototype.getTotalHeight = function () {
        return this.cellHeight * this.data.length;
    };
    VirtualScrollComponent.prototype.loadNextPage = function () {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    };
    VirtualScrollComponent.prototype.reset = function () {
        // reset all values
        this.scrollTop = 0;
        this.data = [];
        this._height = undefined;
        this.pageNumber = 0;
        this.loadingComplete = false;
        // set scroll position
        this._elementRef.nativeElement.scrollTop = 0;
        // clear the current cells
        this.renderCells();
        // reload first page
        this.loadNextPage();
    };
    return VirtualScrollComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"])
], VirtualScrollComponent.prototype, "collection", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], VirtualScrollComponent.prototype, "cellHeight", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Boolean)
], VirtualScrollComponent.prototype, "loadOnScroll", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"](),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], VirtualScrollComponent.prototype, "loading", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"](__WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_cell_directive__["a" /* VirtualScrollCellDirective */], { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], VirtualScrollComponent.prototype, "cellTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"](__WEBPACK_IMPORTED_MODULE_2__directives_virtual_scroll_loading_directive__["a" /* VirtualScrollLoadingDirective */], { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], VirtualScrollComponent.prototype, "loadingIndicatorTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"](__WEBPACK_IMPORTED_MODULE_3__directives_virtual_scroll_load_button_directive__["a" /* VirtualScrollLoadButtonDirective */], { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"])
], VirtualScrollComponent.prototype, "loadButtonTemplate", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('scroll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VirtualScrollComponent.prototype, "renderCells", null);
VirtualScrollComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-virtual-scroll',
        template: __webpack_require__(187)
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__directives_resize_index__["c" /* ResizeService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
], VirtualScrollComponent);



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpCenterItemDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_center_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HelpCenterItemDirective = (function () {
    function HelpCenterItemDirective(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    HelpCenterItemDirective.prototype.ngOnInit = function () {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    };
    HelpCenterItemDirective.prototype.ngOnDestroy = function () {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    };
    return HelpCenterItemDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], HelpCenterItemDirective.prototype, "uxHelpCenterItem", void 0);
HelpCenterItemDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({ selector: '[uxHelpCenterItem]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__help_center_service__["a" /* HelpCenterService */]])
], HelpCenterItemDirective);



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverActionContainerDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hover_action_service__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HoverActionContainerDirective = (function () {
    function HoverActionContainerDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    HoverActionContainerDirective.prototype.ngOnDestroy = function () {
        this.active$.unsubscribe();
    };
    HoverActionContainerDirective.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    HoverActionContainerDirective.prototype.onFocus = function () {
        this._hoverActionService.setFocusState(true);
    };
    HoverActionContainerDirective.prototype.onBlur = function () {
        this._hoverActionService.setFocusState(false);
    };
    HoverActionContainerDirective.prototype.onHover = function () {
        this._hoverActionService.setHoverState(true);
    };
    HoverActionContainerDirective.prototype.onLeave = function () {
        this._hoverActionService.setHoverState(false);
    };
    HoverActionContainerDirective.prototype.next = function () {
        this._hoverActionService.next();
    };
    return HoverActionContainerDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], HoverActionContainerDirective.prototype, "tabindex", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "focus", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "onFocus", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "onBlur", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "onHover", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "onLeave", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('keydown.arrowright'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionContainerDirective.prototype, "next", null);
HoverActionContainerDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxHoverActionContainer]',
        providers: [__WEBPACK_IMPORTED_MODULE_1__hover_action_service__["a" /* HoverActionService */]],
        host: {
            '[class.hover-action-container-active]': 'active',
            '[tabindex]': 'tabindex'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__hover_action_service__["a" /* HoverActionService */]])
], HoverActionContainerDirective);



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverActionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HoverActionService = (function () {
    function HoverActionService() {
        this.active = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    HoverActionService.prototype.register = function (action) {
        this._actions.push(action);
    };
    HoverActionService.prototype.unregister = function (action) {
        this._actions = this._actions.filter(function (actn) { return actn !== action; });
    };
    HoverActionService.prototype.setContainer = function (container) {
        this._container = container;
    };
    HoverActionService.prototype.setFocusState = function (focus) {
        this._focused = focus;
        this.updateVisibility();
    };
    HoverActionService.prototype.setHoverState = function (hover) {
        this._hovered = hover;
        this.updateVisibility();
    };
    HoverActionService.prototype.next = function () {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            var index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    };
    HoverActionService.prototype.previous = function () {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            var index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    };
    HoverActionService.prototype.updateVisibility = function () {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    };
    HoverActionService.prototype.focusActionAtIndex = function (index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    };
    HoverActionService.prototype.getFocusedActionIndex = function () {
        var _this = this;
        return this._actions.findIndex(function (action) { return action === _this.getFocusedAction(); });
    };
    HoverActionService.prototype.containerHasFocus = function () {
        return this._focused;
    };
    HoverActionService.prototype.actionHasFocus = function () {
        return !!this.getFocusedAction();
    };
    HoverActionService.prototype.getFocusedAction = function () {
        return this._actions.find(function (action) { return action.focused; });
    };
    return HoverActionService;
}());
HoverActionService = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], HoverActionService);



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverActionDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hover_action_service__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HoverActionDirective = (function () {
    function HoverActionDirective(_elementRef, _hoverActionService) {
        var _this = this;
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(function (active) { return _this.active = active; });
    }
    HoverActionDirective.prototype.ngOnDestroy = function () {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    };
    HoverActionDirective.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    HoverActionDirective.prototype.onFocus = function () {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    };
    HoverActionDirective.prototype.onBlur = function () {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    };
    HoverActionDirective.prototype.previous = function (event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    };
    HoverActionDirective.prototype.next = function (event) {
        event.stopPropagation();
        this._hoverActionService.next();
    };
    return HoverActionDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Number)
], HoverActionDirective.prototype, "tabindex", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('focus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionDirective.prototype, "onFocus", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoverActionDirective.prototype, "onBlur", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('keydown.arrowleft', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], HoverActionDirective.prototype, "previous", null);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"]('keydown.arrowright', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], HoverActionDirective.prototype, "next", null);
HoverActionDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxHoverAction]',
        host: {
            '[class.hover-action-active]': 'active',
            '[class.hover-action-focused]': 'focused',
            '[tabindex]': 'tabindex'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__hover_action_service__["a" /* HoverActionService */]])
], HoverActionDirective);



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutSwitcherDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LayoutSwitcherDirective = (function () {
    function LayoutSwitcherDirective(_elementRef, resizeService, renderer, _viewContainerRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement, renderer).subscribe(function (event) {
            _this._width = event.width;
            // render the appropriate layout
            _this.updateActiveLayout();
        });
    }
    LayoutSwitcherDirective.prototype.ngOnChanges = function (changes) {
        // if the active group has changed then render the appropriate layout
        if (changes.group.currentValue !== changes.group.previousValue) {
            this.updateActiveLayout();
        }
    };
    LayoutSwitcherDirective.prototype.getActiveLayout = function () {
        var _this = this;
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(function (layout) { return _this.group === layout.getConfig().group; }).find(function (layout) {
            var minWidth = layout.getConfig().minWidth || 0;
            var maxWidth = layout.getConfig().maxWidth || Infinity;
            return _this._width >= minWidth && _this._width < maxWidth;
        });
    };
    LayoutSwitcherDirective.prototype.updateActiveLayout = function () {
        // get the layout that should be shown
        var layout = this.getActiveLayout();
        // check if we are currently showing the layout
        if (this._activeLayout === layout) {
            return;
        }
        // remove the current layout
        if (this._activeLayout) {
            this._activeLayout.deactivate();
        }
        // store the new active layout
        this._activeLayout = layout;
        // if there is an active layout then activate
        if (this._activeLayout) {
            this._activeLayout.activate();
        }
    };
    LayoutSwitcherDirective.prototype.ngAfterContentInit = function () {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    };
    return LayoutSwitcherDirective;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", String)
], LayoutSwitcherDirective.prototype, "group", void 0);
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"](__WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__["a" /* LayoutSwitcherItemDirective */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
], LayoutSwitcherDirective.prototype, "_layouts", void 0);
LayoutSwitcherDirective = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"]({
        selector: '[uxLayoutSwitcher]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__resize_index__["c" /* ResizeService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]])
], LayoutSwitcherDirective);



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StringFilterPipe = (function () {
    function StringFilterPipe() {
    }
    StringFilterPipe.prototype.transform = function (items, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it.toLowerCase().indexOf(value.toLowerCase()) >= 0; });
    };
    return StringFilterPipe;
}());
StringFilterPipe = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"]({
        name: 'stringFilter'
    }),
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"]()
], StringFilterPipe);



/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\n    <li *ngFor=\"let crumb of crumbs\">\n\n        <!-- If there is a router link then use a tag -->\n        <a *ngIf=\"crumb.routerLink\"\n           [routerLink]=\"crumb.routerLink\" \n           [fragment]=\"crumb.fragment\" \n           [queryParams]=\"crumb.queryParams\" \n           (click)=\"clickCrumb($event, crumb)\">\n                {{ crumb.title }}\n        </a>\n\n        <!-- If there is not router link then display text in a span -->\n        <span *ngIf=\"!crumb.routerLink\">{{ crumb.title }}</span>\n    </li>\n</ol>"

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumbs_component__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_router__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BreadcrumbsModule = (function () {
    function BreadcrumbsModule() {
    }
    return BreadcrumbsModule;
}());
BreadcrumbsModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["RouterModule"]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__breadcrumbs_component__["a" /* BreadcrumbsComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__breadcrumbs_component__["a" /* BreadcrumbsComponent */]]
    })
], BreadcrumbsModule);



/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_99__;

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox_module__ = __webpack_require__(101);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__checkbox_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__checkbox_component__ = __webpack_require__(38);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__checkbox_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__checkbox_component__["b"]; });




/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckboxModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkbox_component__ = __webpack_require__(38);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__checkbox_component__["b" /* CheckboxComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__checkbox_component__["b" /* CheckboxComponent */]]
    })
], CheckboxModule);



/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-checkbox\" tabindex=\"0\"\n    [class.ux-checked]=\"value == true\"\n    [class.ux-indeterminate]=\"value == indeterminateValue\"\n    [class.ux-simplified]=\"simplified == true\"\n    [class.ux-disabled]=\"disabled == true\"\n    (keydown.space)=\"keyDown($event)\">\n\n    <input type=\"checkbox\" role=\"checkbox\" tabindex=\"-1\"\n        [name]=\"name\" \n        [checked]=\"value\" \n        [disabled]=\"disabled\" />\n        \n</div>\n\n<div class=\"ux-checkbox-content\">\n    <ng-content></ng-content>\n</div>\n"

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__column_sorting_module__ = __webpack_require__(104);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__column_sorting_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__column_sorting_component__ = __webpack_require__(15);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__column_sorting_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__column_sorting_component__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__column_sorting_directive__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__column_sorting_directive__["a"]; });





/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnSortingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__column_sorting_component__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__column_sorting_directive__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ColumnSortingModule = (function () {
    function ColumnSortingModule() {
    }
    return ColumnSortingModule;
}());
ColumnSortingModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__column_sorting_component__["a" /* ColumnSortingComponent */], __WEBPACK_IMPORTED_MODULE_2__column_sorting_directive__["a" /* ColumnSortingDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__column_sorting_component__["a" /* ColumnSortingComponent */], __WEBPACK_IMPORTED_MODULE_2__column_sorting_directive__["a" /* ColumnSortingDirective */]]
    })
], ColumnSortingModule);



/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-column-sorting\">\n    <i class=\"ux-column-sorting-icon hpe-icon\" \n        [class.hpe-ascend]=\"state===columnSortingState.Ascending\" \n        [class.hpe-descend]=\"state===columnSortingState.Descending\" \n        [class.column-sorting-icon-hidden]=\"state===columnSortingState.NoSort\"></i>\n    <p class=\"ux-column-sorting-number\">{{ orderNumber }}</p>\n</div>"

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_module__ = __webpack_require__(107);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__dashboard_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_component__ = __webpack_require__(40);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__dashboard_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_service__ = __webpack_require__(8);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__dashboard_service__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drag_handle_drag_handle_directive__ = __webpack_require__(41);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__drag_handle_drag_handle_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__widget_dashboard_widget_component__ = __webpack_require__(16);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__widget_dashboard_widget_component__["a"]; });







/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__widget_dashboard_widget_component__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__drag_handle_drag_handle_directive__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_resize_index__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */],
    __WEBPACK_IMPORTED_MODULE_3__widget_dashboard_widget_component__["a" /* DashboardWidgetComponent */],
    __WEBPACK_IMPORTED_MODULE_5__drag_handle_drag_handle_directive__["a" /* DashboardDragHandleDirective */]
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_6__directives_resize_index__["b" /* ResizeModule */]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS,
        providers: [__WEBPACK_IMPORTED_MODULE_4__dashboard_service__["b" /* DashboardService */]],
    })
], DashboardModule);



/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = "<div (uxResize)=\"onResize($event)\" throttle=\"16\" class=\"dashboard-container\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"position-indicator\" *ngIf=\"placeholder.visible\" [style.left.px]=\"placeholder.x\" [style.top.px]=\"placeholder.y\" [style.width.px]=\"placeholder.width\"\n    [style.height.px]=\"placeholder.height\"></div>"

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = "<div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"resizer-handle handle-top\" [style.top.px]=\"padding\" [hidden]=\"!resizable\"></div>\n<div class=\"resizer-handle handle-top-right\" [style.top.px]=\"padding\" [style.right.px]=\"padding\" [hidden]=\"!resizable && !stacked\"></div>\n<div class=\"resizer-handle handle-right\" [style.right.px]=\"padding\" [hidden]=\"!resizable || stacked\"></div>\n<div class=\"resizer-handle handle-bottom-right\" [style.bottom.px]=\"padding\" [style.right.px]=\"padding\" [hidden]=\"!resizable && !stacked\"></div>\n<div class=\"resizer-handle handle-bottom\" [style.bottom.px]=\"padding\" [hidden]=\"!resizable\"></div>\n<div class=\"resizer-handle handle-bottom-left\" [style.bottom.px]=\"padding\" [style.left.px]=\"padding\" [hidden]=\"!resizable && !stacked\"></div>\n<div class=\"resizer-handle handle-left\" [style.left.px]=\"padding\" [hidden]=\"!resizable || stacked\"></div>\n<div class=\"resizer-handle handle-top-left\" [style.top.px]=\"padding\" [style.left.px]=\"padding\" [hidden]=\"!resizable && !stacked\"></div>"

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResizeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize_directive__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resize_service__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResizeModule = (function () {
    function ResizeModule() {
    }
    return ResizeModule;
}());
ResizeModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__resize_directive__["a" /* ResizeDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__resize_directive__["a" /* ResizeDirective */]],
        providers: [__WEBPACK_IMPORTED_MODULE_2__resize_service__["a" /* ResizeService */]]
    })
], ResizeModule);



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ebox_module__ = __webpack_require__(112);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__ebox_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ebox_component__ = __webpack_require__(45);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__ebox_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__ebox_component__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__ebox_component__["c"]; });




/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EboxModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ebox_component__ = __webpack_require__(45);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__ebox_component__["a" /* EboxComponent */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["b" /* EboxContentDirective */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["c" /* EboxHeaderDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__ebox_component__["a" /* EboxComponent */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["b" /* EboxContentDirective */], __WEBPACK_IMPORTED_MODULE_1__ebox_component__["c" /* EboxHeaderDirective */]]
    })
], EboxModule);



/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-ebox-header\">\n    <ng-content select=\"ux-ebox-header\"></ng-content>\n</div>\n\n<div class=\"ux-ebox-content\">\n    <ng-content select=\"ux-ebox-content\"></ng-content>\n</div>"

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__facets_module__ = __webpack_require__(115);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_0__facets_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__facet_container_component__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__facet_container_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facet_events__ = __webpack_require__(20);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__facet_events__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__facet_events__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_2__facet_events__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_facet_header_facet_header_component__ = __webpack_require__(47);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__base_facet_header_facet_header_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_facet_base_facet_base_component__ = __webpack_require__(11);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__base_facet_base_facet_base_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__facet_check_list_facet_check_list_component__ = __webpack_require__(48);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__facet_check_list_facet_check_list_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__facet_typeahead_list_facet_typeahead_list_component__ = __webpack_require__(49);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_6__facet_typeahead_list_facet_typeahead_list_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_6__facet_typeahead_list_facet_typeahead_list_component__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_facet__ = __webpack_require__(122);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_7__models_facet__["a"]; });










/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacetsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_typeahead__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_typeahead___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_typeahead__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__facet_container_component__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_facet_base_facet_base_component__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base_facet_header_facet_header_component__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__facet_check_list_facet_check_list_component__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__facet_typeahead_list_facet_typeahead_list_component__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__index__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_4__facet_container_component__["a" /* FacetContainerComponent */],
    __WEBPACK_IMPORTED_MODULE_6__base_facet_header_facet_header_component__["a" /* FacetHeaderComponent */],
    __WEBPACK_IMPORTED_MODULE_5__base_facet_base_facet_base_component__["a" /* FacetBaseComponent */],
    __WEBPACK_IMPORTED_MODULE_7__facet_check_list_facet_check_list_component__["a" /* FacetCheckListComponent */],
    __WEBPACK_IMPORTED_MODULE_8__facet_typeahead_list_facet_typeahead_list_component__["b" /* FacetTypeaheadListComponent */],
    __WEBPACK_IMPORTED_MODULE_8__facet_typeahead_list_facet_typeahead_list_component__["a" /* FacetTypeaheadHighlight */]
];
var FacetsModule = (function () {
    function FacetsModule() {
    }
    return FacetsModule;
}());
FacetsModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_9__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_10__index__["CheckboxModule"],
            __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_tooltip__["TooltipModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_typeahead__["TypeaheadModule"].forRoot()
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS
    })
], FacetsModule);



/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = "<!-- Display Any Selected Facets -->\n<div class=\"facets-selected-container\">\n\n    <!-- Display Title an Clear Button -->\n    <div class=\"facets-selected-header-container\">\n\n        <!-- Show The Selected Text -->\n        <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n        <!-- Add a Clear Button -->\n        <div class=\"facets-selected-clear-button\" tabindex=\"0\" [tooltip]=\"clearTooltip\" placement=\"left\" container=\"body\" (click)=\"deselectAllFacets()\"\n            (keyup.enter)=\"deselectAllFacets()\" *ngIf=\"facets.length > 0\">\n\n            <svg class=\"facets-selected-clear-graphic\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n            </svg>\n        </div>\n\n    </div>\n\n    <!-- Display Tags For Selected Items -->\n    <div class=\"facets-selected-list\">\n\n        <!-- Show Selected Tags -->\n        <div class=\"facet-selected-tag\" tabindex=\"0\" *ngFor=\"let facet of facets\" (mousedown)=\"$event.preventDefault()\" (click)=\"deselectFacet(facet)\" (keyup.enter)=\"deselectFacet(facet)\">\n\n            <!-- Display Label -->\n            <span class=\"facet-selected-tag-label\">{{ facet.title }}</span>\n\n            <!-- Display Remove Icon -->\n            <span class=\"hpe-icon hpe-close\"></span>\n        </div>\n\n    </div>\n\n    <!-- Show Message Here if No Facets Selected -->\n    <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n</div>\n\n<!-- Any Facet Elements Should be Added Here By User -->\n<div class=\"facets-region\">\n    <ng-content></ng-content>\n</div>"

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_117__;

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = "<span class=\"facet-header-title\">{{ header }}</span>\n<span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>"

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<!-- Create a container which will show when section is expanded -->\n<div class=\"facet-check-list-container\" [class.facet-check-list-scrollbar]=\"scrollbar\" *ngIf=\"expanded\">\n\n    <!-- Iterate through each possible facet -->\n    <div class=\"facet-check-list-item\" *ngFor=\"let facet of facets\" [class.facet-active]=\"isFacetSelected(facet)\" tabindex=\"0\"\n        (click)=\"toggleFacetSelection(facet)\" (keyup.enter)=\"toggleFacetSelection(facet)\" [class.disabled]=\"facet.disabled\">\n\n        <!-- Show check icon to indicate the state -->\n        <span class=\"facet-check-list-item-check\">\n            <span class=\"hpe-icon hpe-active\"></span>\n        </span>\n\n        <!-- Display the title -->\n        <span class=\"facet-check-list-item-title\">{{ facet.title }}</span>\n\n        <!-- Display the count if specified -->\n        <span class=\"facet-check-list-item-count\" *ngIf=\"facet.count !== undefined\">({{ facet.count }})</span>\n    </div>\n</div>"

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_120__;

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" *ngIf=\"suggestions?.length > 0\">\n\n        <div class=\"facet-typeahead-list-selected-option\" tabindex=\"0\" *ngFor=\"let facet of suggestions\" (click)=\"toggleFacetSelection(facet)\"\n            (keyup.enter)=\"toggleFacetSelection(facet)\">\n\n            <ux-checkbox [clickable]=\"false\" [value]=\"isFacetSelected(facet)\" [simplified]=\"simplified\">\n                <span class=\"facet-typeahead-list-selected-option-title\">{{ facet.title }}</span>\n                <span class=\"facet-typeahead-list-selected-option-count\">({{ facet.count }})</span>\n            </ux-checkbox>\n\n        </div>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\" class=\"form-control\" [placeholder]=\"typeaheadConfig?.placeholder\" [typeahead]=\"typeaheadOptions\" [(ngModel)]=\"searchQuery\"\n            [typeaheadMinLength]=\"typeaheadConfig?.minCharacters\" [typeaheadOptionsLimit]=\"typeaheadConfig?.maxResults\" [typeaheadWaitMs]=\"typeaheadConfig?.delay\"\n            (typeaheadOnSelect)=\"selectOption($event)\" [typeaheadItemTemplate]=\"facetOptionTemplate\" (keyup.ArrowUp)=\"scrollToFocused()\" (keyup.ArrowDown)=\"scrollToFocused()\">\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-model=\"item\" let-index=\"index\">\n    <p class=\"facet-typeahead-list-option\"><span [innerHTML]=\"model.title | facetTypeaheadHighlight: searchQuery\"></span> <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"model.count\">({{ model.count }})</span></p>\n</ng-template>"

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Facet; });
var Facet = (function () {
    function Facet(title, data, count, disabled, id) {
        if (data === void 0) { data = {}; }
        if (disabled === void 0) { disabled = false; }
        this.title = title;
        this.data = data;
        this.count = count;
        this.disabled = disabled;
        this.id = id;
    }
    return Facet;
}());



/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filter_module__ = __webpack_require__(124);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__filter_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_container_component__ = __webpack_require__(21);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__filter_container_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__filter_container_component__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__filter_container_component__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__filter_container_component__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_base_filter_base_component__ = __webpack_require__(13);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__filter_base_filter_base_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter_dropdown_filter_dropdown_component__ = __webpack_require__(52);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__filter_dropdown_filter_dropdown_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filter_dynamic_filter_dynamic_component__ = __webpack_require__(51);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__filter_dynamic_filter_dynamic_component__["a"]; });







/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_tooltip__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_dynamic_filter_dynamic_component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_dropdown_filter_dropdown_component__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_dropdown__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter_container_component__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filter_base_filter_base_component__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_typeahead__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_typeahead___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_typeahead__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_7__filter_base_filter_base_component__["a" /* FilterBaseComponent */],
    __WEBPACK_IMPORTED_MODULE_6__filter_container_component__["b" /* FilterContainerComponent */],
    __WEBPACK_IMPORTED_MODULE_2__filter_dropdown_filter_dropdown_component__["a" /* FilterDropdownComponent */],
    __WEBPACK_IMPORTED_MODULE_1__filter_dynamic_filter_dynamic_component__["a" /* FilterDynamicComponent */]
];
var FilterModule = (function () {
    function FilterModule() {
    }
    return FilterModule;
}());
FilterModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_dropdown__["BsDropdownModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_typeahead__["TypeaheadModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap_tooltip__["TooltipModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS
    })
], FilterModule);



/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<div class=\"filter-selected-clear-button\" *ngIf=\"filters.length > 0\" [tooltip]=\"clearTooltip || 'Clear All'\" (click)=\"removeAll()\">\n    \n    <svg class=\"filter-selected-clear-graphic\" width=\"19\" height=\"12\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</div>"

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group ux-dynamic-filter\" dropdown #dynamicDropdown=\"bs-dropdown\">\n    <button (click)=\"dynamicDropdown.show()\" type=\"button\" [class.active]=\"selected !== initial\" class=\"filter-dropdown btn dropdown-toggle\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\" *ngIf=\"showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"removeFilter(); dynamicDropdown.hide();\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\" *ngIf=\"selected !== initial && showTypeahead\" role=\"menuitem\">\n            <a class=\"dropdown-item\">\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\">\n            <input [(ngModel)]=\"searchQuery\" [typeahead]=\"typeaheadItems\" class=\"form-control\" \n            (typeaheadOnSelect)=\"selectOption($event)\" \n            [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n            [typeaheadMinLength]=\"options?.minCharacters || defaultOptions.minCharacters\"\n            [typeaheadOptionsLimit]=\"options?.maxResults\">\n        </li>\n\n        <span *ngIf=\"!showTypeahead\">\n            <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n                <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n        </span>\n\n    </ul>\n</div>"

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\" dropdown>\n    <button dropdownToggle type=\"button\" class=\"filter-dropdown btn dropdown-toggle\" [class.active]=\"selected !== initial\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n        <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flippable_card_module__ = __webpack_require__(129);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__flippable_card_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__ = __webpack_require__(53);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["c"]; });




/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlippableCardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__ = __webpack_require__(53);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["b" /* FlippableCardComponent */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["a" /* FlippableCardBackDirective */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["c" /* FlippableCardFrontDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["b" /* FlippableCardComponent */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["a" /* FlippableCardBackDirective */], __WEBPACK_IMPORTED_MODULE_1__flippable_card_component__["c" /* FlippableCardFrontDirective */]]
    })
], FlippableCardModule);



/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-flipper\" [class.ux-flip-card]=\"flipped\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n\n    <div class=\"ux-flippable-card-front\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\n    </div>\n\n    <div class=\"ux-flippable-card-back\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\n    </div>\n</div>"

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item_display_panel_module__ = __webpack_require__(132);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__item_display_panel_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__ = __webpack_require__(54);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["c"]; });




/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDisplayPanelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["a" /* ItemDisplayPanelComponent */],
    __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["b" /* ItemDisplayPanelContentDirective */],
    __WEBPACK_IMPORTED_MODULE_1__item_display_panel_component__["c" /* ItemDisplayPanelFooterDirective */]
];
var ItemDisplayPanelModule = (function () {
    function ItemDisplayPanelModule() {
    }
    return ItemDisplayPanelModule;
}());
ItemDisplayPanelModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS
    })
], ItemDisplayPanelModule);



/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-item-display-panel\" [class.box-shadow]=\"boxShadow\" [class.inline]=\"inline\" [class.animate]=\"animate\" [class.item-display-panel-hide]=\"!visible\" [style.top]=\"top\" [style.height]='\"calc(100% - \" + top + \"px)\"'>\n\n    <div class=\"item-display-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n        <div class=\"heading-flex-box\">\n            <h3>{{ title }}</h3>\n            <span *ngIf=\"closeVisible\" class=\"heading-close-button\" tabindex=\"0\" (click)=\"visible = false\" (keydown.enter)=\"visible = false\">\n                <i class=\"hpe-icon hpe-close\"></i>\n            </span>\n        </div>\n    </div>\n\n    <div class=\"item-display-panel-content\">\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n    </div>\n\n    <div class=\"item-display-panel-footer\" *ngIf=\"footer\">\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n    </div>\n\n</div>"

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_picker_module__ = __webpack_require__(135);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__number_picker_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__number_picker_component__ = __webpack_require__(55);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__number_picker_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__number_picker_component__["b"]; });




/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberPickerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__number_picker_component__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var NumberPickerModule = (function () {
    function NumberPickerModule() {
    }
    return NumberPickerModule;
}());
NumberPickerModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__number_picker_component__["b" /* NumberPickerComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__number_picker_component__["b" /* NumberPickerComponent */]]
    })
], NumberPickerModule);



/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = "<input type=\"number\" class=\"form-control number-picker-input\" [(ngModel)]=\"value\" [min]=\"min\" [max]=\"max\" (keydown.ArrowDown)=\"decrement($event)\"\n    (keydown.ArrowUp)=\"increment($event)\" (wheel)=\"onScroll($event)\" step=\"any\" [disabled]=\"disabled\">\n\n<div class=\"number-picker-controls\">\n\n    <div class=\"number-picker-control-up\" (click)=\"increment($event)\" [class.disabled]=\"disabled || value >= max\">\n        <span class=\"hpe-icon hpe-up\"></span>\n    </div>\n\n    <div class=\"number-picker-control-down\" (click)=\"decrement($event)\" [class.disabled]=\"disabled || value <= min\">\n        <span class=\"hpe-icon hpe-down\"></span>\n    </div>\n\n</div>"

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_header_module__ = __webpack_require__(138);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__page_header_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_header_component__ = __webpack_require__(56);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__page_header_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigation_navigation_component__ = __webpack_require__(57);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__navigation_navigation_component__["a"]; });





/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_header_component__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__breadcrumbs_index__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icon_menu_icon_menu_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__navigation_navigation_component__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__navigation_navigation_item_navigation_item_component__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__navigation_navigation_dropdown_item_navigation_dropdown_item_component__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    return PageHeaderModule;
}());
PageHeaderModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__breadcrumbs_index__["b" /* BreadcrumbsModule */],
            __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown__["BsDropdownModule"].forRoot()
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__page_header_component__["a" /* PageHeaderComponent */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__page_header_component__["a" /* PageHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_5__icon_menu_icon_menu_component__["a" /* PageHeaderIconMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_6__navigation_navigation_component__["a" /* PageHeaderNavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_7__navigation_navigation_item_navigation_item_component__["a" /* PageHeaderNavigationItemComponent */],
            __WEBPACK_IMPORTED_MODULE_8__navigation_navigation_dropdown_item_navigation_dropdown_item_component__["a" /* PageHeaderNavigationDropdownItemComponent */]
        ]
    })
], PageHeaderModule);



/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = "<!-- Display Upper Section when not condensed -->\n<div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n    <div class=\"page-header-logo-container\" [hidden]=\"!logo\">\n        <img [attr.src]=\"logo\" class=\"page-header-logo\">\n    </div>\n\n    <div class=\"page-header-navigation\" [ngClass]=\"alignment\">\n\n        <!-- The Top Navigation Options -->\n        <ux-page-header-horizontal-navigation [items]=\"items\"></ux-page-header-horizontal-navigation>\n    </div>\n\n    <div class=\"page-header-icon-menus\">\n        <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n    </div>\n</div>\n\n<!-- Display Lower Section When Not Condensed -->\n<div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n    <div class=\"page-header-state-container\">\n\n        <div *ngIf=\"backVisible == true\" class=\"page-header-back-button\" (click)=\"goBack()\">\n            <span class=\"hpe-icon hpe-previous text-primary\"></span>\n        </div>\n\n        <div class=\"page-header-title-container\">\n\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n            <h1 class=\"page-header-title\">{{ header }}</h1>\n        </div>\n\n    </div>\n\n</div>\n\n<!-- Display This Section Optimized for Condensed Mode -->\n<div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n    <div class=\"page-header-breadcrumbs\">\n        <ux-breadcrumbs [crumbs]=\"getCondensedBreadcrumbs()\"></ux-breadcrumbs>\n    </div>\n\n    <div class=\"page-header-navigation\">\n\n        <!-- The Top Navigation Options -->\n        <ux-page-header-horizontal-navigation [items]=\"items\"></ux-page-header-horizontal-navigation>\n    </div>\n\n    <div class=\"page-header-icon-menus\">\n        <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n    </div>\n\n</div>"

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageHeaderIconMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageHeaderIconMenuComponent = (function () {
    function PageHeaderIconMenuComponent() {
    }
    PageHeaderIconMenuComponent.prototype.select = function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
    };
    return PageHeaderIconMenuComponent;
}());
__decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"](),
    __metadata("design:type", Object)
], PageHeaderIconMenuComponent.prototype, "menu", void 0);
PageHeaderIconMenuComponent = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"]({
        selector: 'ux-page-header-icon-menu',
        template: __webpack_require__(141)
    })
], PageHeaderIconMenuComponent);



/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page-header-icon-menu\" dropdown dropdownToggle placement=\"bottom right\">\n\n    <a class=\"page-header-icon-menu-button\" (click)=\"select(menu)\">\n        <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n        <span class=\"label label-primary\" *ngIf=\"menu?.badge\">{{ menu.badge }}</span>\n    </a>\n\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n        <li role=\"menuitem\" *ngFor=\"let dropdown of menu?.dropdown\" [class.dropdown-header]=\"dropdown.header\" [class.dropdown-divider]=\"dropdown.divider\">\n\n            <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n            <a class=\"dropdown-item\" *ngIf=\"!dropdown.header\" (click)=\"select(dropdown)\">\n                <i class=\"hpe-icon hp-fw text-muted\" [ngClass]=\"dropdown.icon\"></i>\n                {{ dropdown.title }}\n                <span class=\"pull-right text-muted small\" *ngIf=\"dropdown.subtitle\">{{ dropdown.subtitle }}</span>\n            </a>\n        </li>\n\n    </ul>\n</div>"

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = "<div role=\"menu-item\" dropdown [isOpen]=\"dropdownOpen\" container=\"body\" placement=\"right\" [isDisabled]=\"!item.children\" (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\" #subMenu=\"bs-dropdown\">\n\n    <!-- Show the menu item and the arrow if there are children -->\n    <a class=\"dropdown-item\" tabindex=\"0\" [class.selected]=\"item.selected\" (keyup.enter)=\"selectItem(item); subMenu.toggle()\" (click)=\"selectItem(item)\">\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n        <span class=\"dropdown-item-icon hpe-icon hpe-next\" *ngIf=\"item.children\"></span>\n    </a>\n\n    <!-- Allow another level of menu items -->\n    <ul *dropdownMenu class=\"dropdown-menu horizontal-navigation-dropdown-submenu\" role=\"menu\" (mouseenter)=\"hoverStart()\" (mouseleave)=\"hoverLeave()\">\n\n        <li role=\"menuitem\" *ngFor=\"let subItem of item.children\" (click)=\"selectItem(subItem, item)\" (keyup.enter)=\"selectItem(subItem, item)\">\n            <a class=\"dropdown-item\" tabindex=\"0\" [class.selected]=\"subItem.selected\">\n                <span class=\"dropdown-item-title\">{{ subItem.title }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = "<div class=\"horizontal-navigation-button\" dropdown dropdownToggle placement=\"bottom left\" [isDisabled]=\"!item?.children\" tabindex=\"0\" container=\"body\"\n    #menu=\"bs-dropdown\" (keyup.enter)=\"menu.toggle()\" [class.selected]=\"item?.selected\" (click)=\"selectItem()\">\n\n    <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n    <span class=\"navigation-item-label\">{{ item?.title }}</span>\n    <span class=\"hpe-icon hpe-down\" *ngIf=\"item?.children\"></span>\n\n    <div *dropdownMenu class=\"dropdown-menu horizontal-navigation-dropdown-menu\" role=\"menu\">\n        <ux-page-header-horizontal-navigation-dropdown-item *ngFor=\"let item of item?.children\" [item]=\"item\" (onSelect)=\"onItemSelect($event)\"></ux-page-header-horizontal-navigation-dropdown-item>\n    </div>\n\n</div>"

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = "<ux-page-header-horizontal-navigation-item *ngFor=\"let item of items\" [item]=\"item\" (onSelect)=\"onSelect($event)\"></ux-page-header-horizontal-navigation-item>"

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__progress_bar_module__ = __webpack_require__(146);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__progress_bar_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_bar_component__ = __webpack_require__(60);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__progress_bar_component__["a"]; });




/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__progress_bar_component__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_color_index__ = __webpack_require__(6);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [__WEBPACK_IMPORTED_MODULE_2__services_color_index__["b" /* ColorServiceModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__progress_bar_component__["a" /* ProgressBarComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__progress_bar_component__["a" /* ProgressBarComponent */]]
    })
], ProgressBarModule);



/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorServiceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_service__ = __webpack_require__(61);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [],
        exports: [],
        declarations: [],
        providers: [__WEBPACK_IMPORTED_MODULE_1__color_service__["a" /* ColorService */]],
    })
], ColorServiceModule);



/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = "<div class=\"progressbar-track\" [style.width.%]=\"percentage\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>"

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radiobutton_module__ = __webpack_require__(150);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__radiobutton_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__radiobutton_component__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__radiobutton_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__radiobutton_component__["b"]; });




/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RadioButtonModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__radiobutton_component__ = __webpack_require__(62);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__radiobutton_component__["b" /* RadioButtonComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__radiobutton_component__["b" /* RadioButtonComponent */]]
    })
], RadioButtonModule);



/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-radio-button\" tabindex=\"0\"\n    [class.ux-checked]=\"value === option\"\n    [class.ux-simplified]=\"simplified === true\"\n    [class.ux-disabled]=\"disabled === true\"\n    (keydown.space)=\"keyDown($event)\">\n\n    <input type=\"radio\" role=\"radio\" tabindex=\"-1\"\n        [name]=\"name\" \n        [checked]=\"value === option\" \n        [disabled]=\"disabled\"\n        [value]=\"option\"\n        [id]=\"id\" />\n        \n</div>\n\n<div class=\"ux-radio-button-content\">\n    <ng-content></ng-content>\n</div>\n"

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_component__ = __webpack_require__(63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__select_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__select_component__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_module__ = __webpack_require__(161);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__select_module__["a"]; });




/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [(collection)]=\"visibleOptions\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"visibleOptions.length > 0\">\n        <li *ngFor=\"let option of visibleOptions; let i = index\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"isHighlighted(option)\"\n            [uxScrollIntoViewIf]=\"isHighlighted(option)\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate\"\n                [ngOutletContext]=\"{option: option, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate\">\n        </ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"visibleOptions.length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>"

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeaheadModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_infinite_scroll_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_scroll_into_view_if_index__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__typeahead_key_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__typeahead_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TypeaheadModule = (function () {
    function TypeaheadModule() {
    }
    return TypeaheadModule;
}());
TypeaheadModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_5__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_0__directives_infinite_scroll_index__["g" /* InfiniteScrollModule */],
            __WEBPACK_IMPORTED_MODULE_1__directives_scroll_into_view_if_index__["b" /* ScrollIntoViewIfModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__typeahead_component__["a" /* TypeaheadComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__typeahead_component__["a" /* TypeaheadComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_2__typeahead_key_service__["a" /* TypeaheadKeyService */]],
    })
], TypeaheadModule);



/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_155__;

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_156__;

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_157__;

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_load_button_directive__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_loading_directive__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infinite_scroll_directive__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    return InfiniteScrollModule;
}());
InfiniteScrollModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"]({
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__infinite_scroll_directive__["a" /* InfiniteScrollDirective */],
            __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_load_button_directive__["a" /* InfiniteScrollLoadButtonDirective */],
            __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_loading_directive__["a" /* InfiniteScrollLoadingDirective */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__infinite_scroll_directive__["a" /* InfiniteScrollDirective */],
            __WEBPACK_IMPORTED_MODULE_0__infinite_scroll_load_button_directive__["a" /* InfiniteScrollLoadButtonDirective */],
            __WEBPACK_IMPORTED_MODULE_1__infinite_scroll_loading_directive__["a" /* InfiniteScrollLoadingDirective */]
        ],
        providers: [],
    })
], InfiniteScrollModule);



/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollIntoViewIfModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scroll_into_view_if_directive__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scroll_into_view_service__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScrollIntoViewIfModule = (function () {
    function ScrollIntoViewIfModule() {
    }
    return ScrollIntoViewIfModule;
}());
ScrollIntoViewIfModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1__scroll_into_view_if_directive__["a" /* ScrollIntoViewIfDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__scroll_into_view_if_directive__["a" /* ScrollIntoViewIfDirective */]],
        providers: [__WEBPACK_IMPORTED_MODULE_2__scroll_into_view_service__["a" /* ScrollIntoViewService */]],
    })
], ScrollIntoViewIfModule);



/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = "<ux-tag-input *ngIf=\"multiple\"\n    [(tags)]=\"value\"\n    [(input)]=\"input\"\n    [addOnPaste]=\"false\"\n    [disabled]=\"disabled\"\n    [display]=\"display\"\n    [freeInput]=\"false\"\n    [placeholder]=\"placeholder\"\n    [showTypeaheadOnClick]=\"true\">\n\n    <ux-typeahead #multipleTypeahead\n        [options]=\"options\"\n        [filter]=\"filter | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [disabledOptions]=\"value\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\">\n    </ux-typeahead>\n\n</ux-tag-input>\n\n<div *ngIf=\"!multiple\" class=\"inner-addon right-addon\">\n\n    <i class=\"hpe-icon\"\n        [class.hpe-down]=\"dropDirection === 'down'\"\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\n\n    <input #singleInput type=\"text\" class=\"form-control\"\n        [(ngModel)]=\"input\"\n        [placeholder]=\"placeholder\"\n        [disabled]=\"disabled\"\n        (click)=\"inputClickHandler($event)\"\n        (blur)=\"inputBlurHandler($event)\"\n        (keydown)=\"inputKeyHandler($event)\">\n\n    <ux-typeahead #singleTypeahead\n        [options]=\"options\"\n        [filter]=\"filter | async\"\n        [(open)]=\"dropdownOpen\"\n        [display]=\"display\"\n        [key]=\"key\"\n        [dropDirection]=\"dropDirection\"\n        [maxHeight]=\"maxHeight\"\n        [openOnFilterChange]=\"false\"\n        [pageSize]=\"pageSize\"\n        [selectFirst]=\"true\"\n        [loadingTemplate]=\"loadingTemplate\"\n        [optionTemplate]=\"optionTemplate\"\n        [noOptionsTemplate]=\"noOptionsTemplate\"\n        (optionSelected)=\"singleOptionSelected($event)\" >\n    </ux-typeahead>\n\n</div>\n"

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_infinite_scroll_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tag_input_index__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__typeahead_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__select_component__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
SelectModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_5__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_0__directives_infinite_scroll_index__["g" /* InfiniteScrollModule */],
            __WEBPACK_IMPORTED_MODULE_1__tag_input_index__["c" /* TagInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__typeahead_index__["c" /* TypeaheadModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__select_component__["b" /* SelectComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__select_component__["b" /* SelectComponent */]]
    })
], SelectModule);



/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = "<ol>\n    <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n        [class.disabled]=\"disabled\"\n        [attr.tabindex]=\"disabled ? null : i\"\n        [focusIf]=\"isSelected(i)\"\n        (click)=\"tagClickHandler($event, tag, i)\"\n        (focus)=\"selectTagAt(i)\">\n        \n        <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n            [ngOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n        </ng-container>\n\n    </li>\n    <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\">\n        <input #tagInput type=\"text\" class=\"ux-tag-input\"\n            [(ngModel)]=\"input\"\n            [class.invalid]=\"!inputValid\"\n            [placeholder]=\"disabled ? '' : (placeholder || '')\"\n            [disabled]=\"disabled\"\n            [focusIf]=\"isSelected(tags.length)\"\n            (click)=\"inputClickHandler()\"\n            (focus)=\"inputFocusHandler()\"\n            (paste)=\"inputPasteHandler($event)\">\n    </li>\n</ol>\n\n<ng-content #typeahead></ng-content>\n\n<ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n    <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n    <button *ngIf=\"api.canRemoveTagAt(index)\" type=\"button\" class=\"ux-tag-remove\" [disabled]=\"disabled\" (click)=\"api.removeTagAt(index); $event.stopPropagation();\"><i class=\"hpe-icon hpe-close\"></i></button>\n</ng-template>"

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagInputModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_focus_if_index__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__typeahead_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag_input_component__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__angular_forms__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TagInputModule = (function () {
    function TagInputModule() {
    }
    return TagInputModule;
}());
TagInputModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_0__directives_focus_if_index__["b" /* FocusIfModule */],
            __WEBPACK_IMPORTED_MODULE_1__typeahead_index__["c" /* TypeaheadModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_2__tag_input_component__["a" /* TagInputComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__tag_input_component__["a" /* TagInputComponent */]],
        providers: [],
    })
], TagInputModule);



/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FocusIfModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__focus_if_directive__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FocusIfModule = (function () {
    function FocusIfModule() {
    }
    return FocusIfModule;
}());
FocusIfModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__focus_if_directive__["a" /* FocusIfDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__focus_if_directive__["a" /* FocusIfDirective */]]
    })
], FocusIfModule);



/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slider_module__ = __webpack_require__(166);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__slider_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slider_component__ = __webpack_require__(75);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__slider_component__["i"]; });




/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_color_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slider_component__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SliderModule = (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
SliderModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__services_color_index__["b" /* ColorServiceModule */]
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__slider_component__["b" /* SliderComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__slider_component__["b" /* SliderComponent */]]
    })
], SliderModule);



/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = "<div class=\"track\" #track [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\">\n\n    <!-- Section Beneath Lower Thumb -->\n    <div class=\"track-section track-lower\" [style.flex-grow]=\"tracks.lower.size\" [style.background]=\"tracks.lower.color\"></div>\n\n    <!-- Lower Thumb Button / Line -->\n    <div class=\"thumb lower\" #lowerThumb [style.left.%]=\"thumbs.lower.position\" [style.z-index]=\"thumbs.lower.order\" [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\" [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\" (mouseenter)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\" (mousedown)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart)\">\n\n        <!-- Lower Thumb Callout -->\n        <div class=\"tooltip top tooltip-lower\" #lowerTooltip [style.opacity]=\"tooltips.lower.visible ? 1 : 0\" [style.left.px]=\"tooltips.lower.position\">\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n            <div class=\"tooltip-inner\" [style.background-color]=\"options.handles.callout.background\" [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.lower.label }}\n            </div>\n        </div>\n\n    </div>\n\n    <!-- Section of Track Between Lower and Upper Thumbs -->\n    <div class=\"track-section track-range\" *ngIf=\"options.type === sliderType.Range\" [style.flex-grow]=\"tracks.middle.size\" [style.background]=\"tracks.middle.color\">\n    </div>\n\n    <!-- Upper Thumb Button / Line -->\n    <div class=\"thumb upper\" #upperThumb [hidden]=\"options.type !== sliderType.Range\" [style.left.%]=\"thumbs.upper.position\" [style.z-index]=\"thumbs.upper.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\" [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\" (mouseenter)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\" (mousedown)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart)\">\n\n        <!-- Upper Thumb Callout -->\n        <div class=\"tooltip top tooltip-upper\" #upperTooltip [style.opacity]=\"tooltips.upper.visible ? 1 : 0\" [style.left.px]=\"tooltips.upper.position\">\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n            <div class=\"tooltip-inner\" *ngIf=\"options.type === sliderType.Range\" [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.upper.label }}\n            </div>\n        </div>\n    </div>\n\n    <!-- Section of Track Abover Upper Thumb -->\n    <div class=\"track-section track-higher\" [style.flex-grow]=\"tracks.upper.size\" [style.background]=\"tracks.upper.color\"></div>\n\n</div>\n\n<!-- Chart Ticks and Tick Labels -->\n<div class=\"tick-container\" *ngIf=\"options.track.ticks.major.show || options.track.ticks.minor.show\" [class.show-labels]=\"options.track.ticks.major.labels || options.track.ticks.minor.labels\">\n\n    <div class=\"tick\" *ngFor=\"let tick of ticks\" [class.major]=\"tick.type === sliderTickType.Major\" [class.minor]=\"tick.type === sliderTickType.Minor\"\n        [style.left.%]=\"tick.position\" [hidden]=\"!tick.showTicks\">\n        <div class=\"tick-indicator\"></div>\n        <div class=\"tick-label\" [hidden]=\"!tick.showLabels\">{{ tick.label }}</div>\n    </div>\n</div>"

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spark_module__ = __webpack_require__(169);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__spark_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spark_component__ = __webpack_require__(76);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__spark_component__["a"]; });




/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SparkModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spark_component__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tooltip__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_color_index__ = __webpack_require__(6);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__services_color_index__["b" /* ColorServiceModule */],
            __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_tooltip__["TooltipModule"].forRoot()
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_2__spark_component__["a" /* SparkComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__spark_component__["a" /* SparkComponent */]]
    })
], SparkModule);



/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div class=\"ux-spark ux-inline\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [tooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" [style.width]=\"(value < 100 ? value : 100) + '%'\" [style.backgroundColor]=\"barColor\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div class=\"ux-spark\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [tooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" [style.width]=\"(value < 100 ? value : 100) + '%'\" [style.backgroundColor]=\"barColor\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->"

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toggleswitch_module__ = __webpack_require__(172);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__toggleswitch_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__toggleswitch_component__ = __webpack_require__(77);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__toggleswitch_component__["a"]; });




/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToggleSwitchModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__ = __webpack_require__(77);
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
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__["a" /* ToggleSwitchComponent */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__toggleswitch_component__["a" /* ToggleSwitchComponent */]]
    })
], ToggleSwitchModule);



/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-toggleswitch\" \n  tabindex=\"0\"\n  (keydown)=\"keydown($event)\"\n  [class.checked]=\"value === true\"\n  [class.disabled]=\"disabled === true\">\n\n  <span class=\"ux-toggleswitch-bg\"></span>\n  \n  <span class=\"ux-toggleswitch-nub\"></span>\n\n  <input type=\"checkbox\" \n    role=\"checkbox\"\n    [name]=\"name\" \n    [checked]=\"value === true\"\n    [disabled]=\"disabled === true\"\n    tabindex=\"-1\" />\n</div>\n\n<div class=\"ux-toggleswitch-content\">\n  <ng-content></ng-content>\n</div>\n"

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__media_player_module__ = __webpack_require__(175);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__media_player_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__media_player_component__ = __webpack_require__(78);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__media_player_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__extensions_base_extension_directive__ = __webpack_require__(14);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__extensions_base_extension_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extensions_controls_controls_component__ = __webpack_require__(85);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__extensions_controls_controls_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extensions_timeline_timeline_component__ = __webpack_require__(84);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__extensions_timeline_timeline_component__["a"]; });







/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaPlayerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__media_player_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extensions_timeline_timeline_component__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__extensions_base_extension_directive__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__extensions_controls_controls_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_frame_extraction_frame_extraction_module__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_tooltip__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_audio_index__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_duration_index__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_file_size_index__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__media_player_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_2__media_player_component__["a" /* MediaPlayerComponent */],
    __WEBPACK_IMPORTED_MODULE_3__extensions_timeline_timeline_component__["a" /* MediaPlayerTimelineExtensionComponent */],
    __WEBPACK_IMPORTED_MODULE_4__extensions_base_extension_directive__["a" /* MediaPlayerBaseExtensionDirective */],
    __WEBPACK_IMPORTED_MODULE_5__extensions_controls_controls_component__["a" /* MediaPlayerControlsExtensionComponent */]
];
var MediaPlayerModule = (function () {
    function MediaPlayerModule() {
    }
    return MediaPlayerModule;
}());
MediaPlayerModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_6__services_frame_extraction_frame_extraction_module__["a" /* FrameExtractionModule */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_tooltip__["TooltipModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__services_audio_index__["b" /* AudioServiceModule */],
            __WEBPACK_IMPORTED_MODULE_9__pipes_duration_index__["b" /* DurationPipeModule */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_file_size_index__["b" /* FileSizePipeModule */]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS,
        providers: [__WEBPACK_IMPORTED_MODULE_11__media_player_service__["a" /* MediaPlayerService */]]
    })
], MediaPlayerModule);



/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_176__;

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioServiceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_http__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AudioServiceModule = (function () {
    function AudioServiceModule() {
    }
    return AudioServiceModule;
}());
AudioServiceModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_1__audio_service__["a" /* AudioService */]]
    })
], AudioServiceModule);



/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_178__;

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = "<div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n    <video class=\"video-player\" #player [src]=\"source\" (abort)=\"mediaPlayerService.abortEvent.next()\" (canplay)=\"mediaPlayerService.canPlayEvent.next()\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next()\" (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\" (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\" (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\" (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\" (pause)=\"mediaPlayerService.pauseEvent.next()\" (play)=\"mediaPlayerService.playEvent.next()\" (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\" (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\" (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\" (suspend)=\"mediaPlayerService.suspendEvent.next()\" (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\" (waiting)=\"mediaPlayerService.waitingEvent.next()\" (click)=\"mediaPlayerService.mediaClickEvent.next($event)\"></video>\n\n    <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n        <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n            <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n            <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n        </svg>\n    </div>\n\n</div>\n\n\n<div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n    <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g transform=\"translate(-98.000000, -458.000000)\">\n                <g transform=\"translate(98.000000, 458.000000)\">\n                    <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                        stroke=\"#60798D\"></path>\n                    <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                    <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                </g>\n            </g>\n        </g>\n    </svg>\n\n    <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n    <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n    <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n    <audio #player [src]=\"source\" (abort)=\"mediaPlayerService.abortEvent.next()\" (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\" (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\" (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\" (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\" (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\" (pause)=\"mediaPlayerService.pauseEvent.next()\" (play)=\"mediaPlayerService.playEvent.next()\" (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\" (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\" (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\" (suspend)=\"mediaPlayerService.suspendEvent.next()\" (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\" (waiting)=\"mediaPlayerService.waitingEvent.next()\" (click)=\"mediaPlayerService.mediaClickEvent.next($event)\"></audio>\n</div>\n\n<div class=\"control-bar\">\n    <ux-media-player-timeline></ux-media-player-timeline>\n    <ux-media-player-controls></ux-media-player-controls>\n</div>"

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = "<p class=\"current-time\">{{ current | duration }}</p>\n\n<div #timeline class=\"timeline-bar\" (mouseenter)=\"scrub.visible = true; pop.show()\" (mouseleave)=\"scrub.visible = false; pop.hide()\"\n    (mousemove)=\"updateScrub($event)\" (mouseup)=\"updateScrub($event)\" (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n    <div class=\"buffered-bar\" *ngFor=\"let buffer of buffered\" [style.left.%]=\"buffer.start\" [style.width.%]=\"buffer.end - buffer.start\"></div>\n\n    <div class=\"media-progress-bar\" [style.width.%]=\"position\"></div>\n\n    <div class=\"scrub-handle\" [style.left.px]=\"scrub.position\" [tooltip]=\"popTemplate\" placement=\"top\" triggers=\"\" #pop=\"bs-tooltip\"\n        container=\"body\" tooltipPopupDelay=\"100\" [isDisabled]=\"duration === 0\"></div>\n\n</div>\n\n<p class=\"duration-time\">{{ duration | duration }}</p>\n\n<ng-template #popTemplate>\n    <span>{{ scrub.time | duration }}</span>\n</ng-template>"

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_181__;

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\" #volumeContainer [class.active]=\"volumeActive\">\n        <div class=\"volume-slider-icon\" #volumeIcon>\n            <span class=\"hpe-icon\" [class.hpe-volume-mute]=\"volume === 0\" [class.hpe-volume-low]=\"volume > 0 && volume <= 70\" [class.hpe-volume]=\"volume > 70\" [tooltip]=\"muteTooltip\" (click)=\"toggleMute()\"></span>\n        </div>\n        \n        <div class=\"volume-slider-node\">\n            <div class=\"volume-slider\" #volumeSlider>\n                <div class=\"volume-track-lower\" [style.width.%]=\"volume\"></div>\n                <div class=\"volume-slider-thumb\" (mousedown)=\"dragStart($event)\" [style.left.%]=\"volume\" tabindex=\"0\" (keydown.ArrowRight)=\"volume = volume + 10\" (keydown.ArrowLeft)=\"volume = volume - 10\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer\"></div>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToStart()\">\n    <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n</svg>\n\n<svg viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" class=\"control-button\" *ngIf=\"!playing\" (click)=\"togglePlay()\">\n    <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n</svg>\n\n<svg viewBox=\"0 0 43 56.9\" class=\"control-button\" width=\"20\" height=\"29\" *ngIf=\"playing\" (click)=\"togglePlay()\">\n    <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n</svg>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToEnd()\">\n    <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"0,64 0,0 44.1,32 \" />\n</svg>\n\n<div class=\"spacer\"></div>\n\n<span class=\"hpe-icon\" *ngIf=\"mediaPlayerService.type !== 'audio'\" [class.hpe-expand]=\"!mediaPlayerService.fullscreen\" [class.hpe-contract]=\"mediaPlayerService.fullscreen\"\n    (click)=\"setFullscreen()\"></span>\n\n<ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>"

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DurationPipeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration_pipe__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DurationPipeModule = (function () {
    function DurationPipeModule() {
    }
    return DurationPipeModule;
}());
DurationPipeModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__duration_pipe__["a" /* DurationPipe */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__duration_pipe__["a" /* DurationPipe */]]
    })
], DurationPipeModule);



/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileSizePipeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_size_pipe__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FileSizePipeModule = (function () {
    function FileSizePipeModule() {
    }
    return FileSizePipeModule;
}());
FileSizePipeModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_1__file_size_pipe__["a" /* FileSizePipe */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__file_size_pipe__["a" /* FileSizePipe */]]
    })
], FileSizePipeModule);



/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__virtual_scroll_module__ = __webpack_require__(186);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__virtual_scroll_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__virtual_scroll_component__ = __webpack_require__(90);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__virtual_scroll_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_virtual_scroll_loading_directive__ = __webpack_require__(30);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_virtual_scroll_loading_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_virtual_scroll_load_button_directive__ = __webpack_require__(31);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_virtual_scroll_load_button_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_cell_directive__ = __webpack_require__(32);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_cell_directive__["a"]; });







/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualScrollModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__virtual_scroll_component__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_resize_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_loading_directive__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_virtual_scroll_load_button_directive__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_virtual_scroll_cell_directive__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_2__virtual_scroll_component__["a" /* VirtualScrollComponent */],
    __WEBPACK_IMPORTED_MODULE_4__directives_virtual_scroll_loading_directive__["a" /* VirtualScrollLoadingDirective */],
    __WEBPACK_IMPORTED_MODULE_5__directives_virtual_scroll_load_button_directive__["a" /* VirtualScrollLoadButtonDirective */],
    __WEBPACK_IMPORTED_MODULE_6__directives_virtual_scroll_cell_directive__["a" /* VirtualScrollCellDirective */]
];
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    return VirtualScrollModule;
}());
VirtualScrollModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__directives_resize_index__["b" /* ResizeModule */]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS
    })
], VirtualScrollModule);



/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = "<div class=\"virtual-scroll-content-height\" [style.height.px]=\"getTotalHeight()\"></div>\n<div class=\"virtual-scroll-content\" [style.transform]=\"'translateY(' + scrollTop + 'px)'\">\n\n    <!-- Virtually Render Cells -->\n    <ng-container *ngFor=\"let cell of cells | async\">\n        <ng-container *ngTemplateOutlet=\"cellTemplate; context: { cell: cell }\"></ng-container>\n    </ng-container>\n\n    <!-- Loading Indicator -->\n    <ng-container *ngIf=\"loadingIndicatorTemplate && isLoading\" [ngTemplateOutlet]=\"loadingIndicatorTemplate\"></ng-container>\n\n    <!-- Loading Button -->\n    <div class=\"virtual-scroll-load-button\" *ngIf=\"loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading\" (click)=\"loadNextPage()\">\n        <ng-container *ngTemplateOutlet=\"loadButtonTemplate\"></ng-container>\n    </div>\n    \n</div>"

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__help_center_module__ = __webpack_require__(189);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__help_center_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_center_service__ = __webpack_require__(33);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__help_center_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help_center_item_directive__ = __webpack_require__(91);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__help_center_item_directive__["a"]; });





/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpCenterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__help_center_item_directive__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__help_center_service__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HelpCenterModule = (function () {
    function HelpCenterModule() {
    }
    return HelpCenterModule;
}());
HelpCenterModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1__help_center_item_directive__["a" /* HelpCenterItemDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__help_center_item_directive__["a" /* HelpCenterItemDirective */]],
        providers: [__WEBPACK_IMPORTED_MODULE_2__help_center_service__["a" /* HelpCenterService */]],
    })
], HelpCenterModule);



/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hover_action_module__ = __webpack_require__(191);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__hover_action_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hover_action_container_directive__ = __webpack_require__(92);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__hover_action_container_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hover_action_directive__ = __webpack_require__(94);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__hover_action_directive__["a"]; });





/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverActionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hover_action_container_directive__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hover_action_directive__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_2__hover_action_directive__["a" /* HoverActionDirective */],
    __WEBPACK_IMPORTED_MODULE_1__hover_action_container_directive__["a" /* HoverActionContainerDirective */]
];
var HoverActionModule = (function () {
    function HoverActionModule() {
    }
    return HoverActionModule;
}());
HoverActionModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        exports: DECLARATIONS,
        declarations: DECLARATIONS
    })
], HoverActionModule);



/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout_switcher_module__ = __webpack_require__(193);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__layout_switcher_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_switcher_directive__ = __webpack_require__(95);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__layout_switcher_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__ = __webpack_require__(34);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__["a"]; });





/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutSwitcherModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layout_switcher_directive__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resize_index__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DECLARATIONS = [
    __WEBPACK_IMPORTED_MODULE_1__layout_switcher_directive__["a" /* LayoutSwitcherDirective */],
    __WEBPACK_IMPORTED_MODULE_2__layout_switcher_item_directive__["a" /* LayoutSwitcherItemDirective */]
];
var LayoutSwitcherModule = (function () {
    function LayoutSwitcherModule() {
    }
    return LayoutSwitcherModule;
}());
LayoutSwitcherModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"]({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__resize_index__["b" /* ResizeModule */]
        ],
        exports: DECLARATIONS,
        declarations: DECLARATIONS,
        providers: [],
    })
], LayoutSwitcherModule);



/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string_filter_pipe__ = __webpack_require__(96);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__string_filter_pipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string_filter_module__ = __webpack_require__(195);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__string_filter_module__["a"]; });




/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringFilterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string_filter_pipe__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var StringFilterModule = (function () {
    function StringFilterModule() {
    }
    return StringFilterModule;
}());
StringFilterModule = __decorate([
    __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"]({
        exports: [__WEBPACK_IMPORTED_MODULE_0__string_filter_pipe__["a" /* StringFilterPipe */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_0__string_filter_pipe__["a" /* StringFilterPipe */]]
    })
], StringFilterModule);



/***/ })
/******/ ]);
});