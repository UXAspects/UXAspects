import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Host, HostBinding, HostListener, Inject, Injectable, Injector, Input, NgModule, NgZone, Output, Pipe, ReflectiveInjector, Renderer, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/concat';
import { Http, HttpModule, ResponseContentType } from '@angular/http';
import 'rxjs/add/observable/timer';

class BreadcrumbsComponent {
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    clickCrumb(event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    }
}
BreadcrumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-breadcrumbs',
                template: `
      <ol class="breadcrumb">
          <li *ngFor="let crumb of crumbs">

              <!-- If there is a router link then use a tag -->
              <a *ngIf="crumb.routerLink"
                 [routerLink]="crumb.routerLink" 
                 [fragment]="crumb.fragment" 
                 [queryParams]="crumb.queryParams" 
                 (click)="clickCrumb($event, crumb)">
                      {{ crumb.title }}
              </a>

              <!-- If there is not router link then display text in a span -->
              <span *ngIf="!crumb.routerLink">{{ crumb.title }}</span>
          </li>
      </ol>
    `
            },] },
];
/**
 * @nocollapse
 */
BreadcrumbsComponent.ctorParameters = () => [];
BreadcrumbsComponent.propDecorators = {
    'crumbs': [{ type: Input },],
};

class BreadcrumbsModule {
}
BreadcrumbsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                exports: [BreadcrumbsComponent],
                declarations: [BreadcrumbsComponent]
            },] },
];
/**
 * @nocollapse
 */
BreadcrumbsModule.ctorParameters = () => [];

const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
class CheckboxComponent {
    constructor() {
        this.name = '';
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // invoke change event
        this.valueChange.emit(this._value);
        // call callback
        this.onChangeCallback(this._value);
    }
    /**
     * @return {?}
     */
    toggleChecked() {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyDown(event) {
        // then toggle the checkbox
        this.toggleChecked();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-checkbox',
                template: `
      <div class="ux-checkbox" tabindex="0"
          [class.ux-checked]="value == true"
          [class.ux-indeterminate]="value == indeterminateValue"
          [class.ux-simplified]="simplified == true"
          [class.ux-disabled]="disabled == true"
          (keydown.space)="keyDown($event)">

          <input type="checkbox" role="checkbox" tabindex="-1"
              [name]="name" 
              [checked]="value" 
              [disabled]="disabled" />
        
      </div>

      <div class="ux-checkbox-content">
          <ng-content></ng-content>
      </div>
    `,
                providers: [CHECKBOX_VALUE_ACCESSOR],
                host: {
                    '(click)': 'toggleChecked()'
                }
            },] },
];
/**
 * @nocollapse
 */
CheckboxComponent.ctorParameters = () => [];
CheckboxComponent.propDecorators = {
    'name': [{ type: Input },],
    'clickable': [{ type: Input },],
    'disabled': [{ type: Input },],
    'simplified': [{ type: Input },],
    'indeterminateValue': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'value': [{ type: Input },],
};

class CheckboxModule {
}
CheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [CheckboxComponent],
                declarations: [CheckboxComponent]
            },] },
];
/**
 * @nocollapse
 */
CheckboxModule.ctorParameters = () => [];

class ColumnSortingComponent {
    constructor() {
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    initParent(parent) {
        this._parent = parent;
        // watch for any events
        this._parent.events.subscribe(event => {
            let /** @type {?} */ idx = event.findIndex(column => column.key === this.key);
            if (idx == -1) {
                this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            if (event.length > 1) {
                this.orderNumber = idx === -1 ? null : idx + 1;
            }
            else {
                this.orderNumber = null;
            }
            this.stateChange.emit(this.state);
        });
    }
    /**
     * @return {?}
     */
    changeState() {
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
        return this._parent.toggleColumn(this.key, this.state);
    }
}
ColumnSortingComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-column-sorting',
                template: `
      <div class="ux-column-sorting">
          <i class="ux-column-sorting-icon hpe-icon" 
              [class.hpe-ascend]="state === columnSortingState.Ascending" 
              [class.hpe-descend]="state === columnSortingState.Descending" 
              [class.column-sorting-icon-hidden]="state === columnSortingState.NoSort"></i>
          <p class="ux-column-sorting-number">{{ orderNumber }}</p>
      </div>
    `,
                exportAs: 'ux-column-sorting'
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingComponent.ctorParameters = () => [];
ColumnSortingComponent.propDecorators = {
    'state': [{ type: Input },],
    'key': [{ type: Input },],
    'orderNumber': [{ type: Input },],
    'stateChange': [{ type: Output },],
};
let ColumnSortingState = {};
ColumnSortingState.Ascending = 0;
ColumnSortingState.Descending = 1;
ColumnSortingState.NoSort = 2;
ColumnSortingState[ColumnSortingState.Ascending] = "Ascending";
ColumnSortingState[ColumnSortingState.Descending] = "Descending";
ColumnSortingState[ColumnSortingState.NoSort] = "NoSort";

class ColumnSortingDirective {
    constructor() {
        this.events = new Subject$1();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.components.forEach(component => component.initParent(this));
    }
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    toggleColumn(key, state) {
        if (this.singleSort) {
            if (state === ColumnSortingState.NoSort) {
                this.order = [];
            }
            else {
                this.order = [{ key: key, state: state }];
            }
        }
        else {
            // reorder columns here
            let /** @type {?} */ idx = this.order.findIndex(column => column.key === key);
            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state });
            }
            else if (state === ColumnSortingState.Ascending || state === ColumnSortingState.Descending) {
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
    }
}
ColumnSortingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxColumnSorting]'
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingDirective.ctorParameters = () => [];
ColumnSortingDirective.propDecorators = {
    'singleSort': [{ type: Input },],
    'components': [{ type: ContentChildren, args: [ColumnSortingComponent,] },],
};

class ColumnSortingModule {
}
ColumnSortingModule.decorators = [
    { type: NgModule, args: [{
                exports: [ColumnSortingComponent, ColumnSortingDirective],
                declarations: [ColumnSortingComponent, ColumnSortingDirective]
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingModule.ctorParameters = () => [];

class DashboardService {
    constructor() {
        this._widgets = [];
        this._options$ = new Subject$1();
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
        this.height = new BehaviorSubject$1(0);
        this.layout = new Subject$1();
    }
    /**
     * Return all the options currently being used as a subject
     * @return {?}
     */
    options() {
        return this._options$;
    }
    /**
     * Return all the options currently being used
     * @return {?}
     */
    getOptions() {
        return this._options;
    }
    /**
     * Get all the default dashboard options
     * @return {?}
     */
    getDefaultOptions() {
        return this._defaultOptions;
    }
    /**
     * Set the options - automatically set default values where not specified
     * @param {?} options The DashboardOptions that will configure the dashboard
     * @return {?}
     */
    setOptions(options) {
        this._options = Object.assign({}, this._defaultOptions, options);
        // update the observable
        this._options$.next(this._options);
    }
    /**
     * Allow uniform spacing around each widget
     * @param {?} padding The number of pixels around each widget
     * @return {?}
     */
    setPadding(padding) {
        this._options.padding = padding;
        this.options().next(this._options);
    }
    /**
     * Set the dashboard container element
     * @param {?} dashboard The HTMLElement that is the dashboard container
     * @return {?}
     */
    setDashboard(dashboard) {
        this._dashboard = dashboard;
    }
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    addWidget(widget) {
        this._widgets.push(widget);
    }
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    removeWidget(widget) {
        this._widgets.findIndex(wgt => wgt === widget);
    }
    /**
     * Indicate that the dashboard element has been resized
     * @param {?} width The width of the dashboard element in px
     * @param {?} height The height of the dashboard element in px
     * @return {?}
     */
    setDimensions(width, height) {
        this._dimensions.width = width;
        this._dimensions.height = height;
        // trigger re-render
        this.renderDashboard();
    }
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    getLayoutData() {
        return this._widgets.map(widget => {
            return { id: widget.getId(), col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    }
    /**
     * Position widgets programatically
     * @param {?} layout
     * @return {?}
     */
    setLayoutData(layout) {
        // iterate through each widget data and find a match
        layout.forEach(widget => {
            // find the matching widget
            let /** @type {?} */ target = this._widgets.find(wgt => wgt.getId() === widget.id);
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    }
    /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    renderDashboard() {
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
        this._widgets.filter(widget => !this._actionWidget || widget !== this._actionWidget.widget)
            .forEach(widget => widget.render());
    }
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    setDashboardLayout() {
        // find any widgets that do not currently have a position set
        this._widgets.filter(widget => widget.getColumn() === undefined || widget.getRow() === undefined)
            .forEach(widget => this.setWidgetPosition(widget));
        this.setDashboardHeight();
    }
    /**
     * @param {?} stacked
     * @return {?}
     */
    setStacked(stacked) {
        // only do the following if the stacked state has changed
        if (stacked === this._stacked) {
            return;
        }
        // store the stacked state
        this._stacked = stacked;
        // update the stacked state for all widgets
        this._widgets.forEach(widget => widget.setStacked(this._stacked));
        // if stacked is true we need to do some reordering etc..
        if (stacked === true) {
            // iterate through each widget set it's stacked state and
            this.getWidgetsByOrder().forEach((widget, idx) => {
                widget.setStacked(true);
                widget.setColumn(0);
                widget.setRow(idx);
            });
        }
    }
    /**
     * @return {?}
     */
    getWidgetsByOrder() {
        return this._widgets.sort((w1, w2) => {
            let /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            let /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    setWidgetPosition(widget) {
        // find a position for the widget
        let /** @type {?} */ position = 0;
        let /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            let /** @type {?} */ column = position % this._options.columns;
            let /** @type {?} */ row = Math.floor(position / this._options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            position++;
        }
    }
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    getPositionAvailable(column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        let /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this._options.columns) {
            return false;
        }
        // check each required position
        for (let /** @type {?} */ x = column; x < column + columnSpan; x++) {
            for (let /** @type {?} */ y = row; y < row + rowSpan; y++) {
                if (spaces.find(block => block.column === x && block.row === y && block.widget !== ignoreWidget)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    getOccupiedSpaces() {
        // find all spaces that are currently occupied
        return this._widgets.filter(widget => widget.getColumn() !== undefined && widget.getRow() !== undefined)
            .reduce((value, widget) => {
            this.forEachBlock(widget, (column, row) => value.push({ widget: widget, column: column, row: row }));
            return value;
        }, []);
    }
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    onResizeStart(action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onResizeDrag(action) {
        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        let /** @type {?} */ handle = action.widget.getHandles().find(hnd => hnd.direction === action.direction);
        // get the bounds of the handle
        let /** @type {?} */ bounds = handle.element.getBoundingClientRect();
        // get the center of the handle
        let /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        let /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        let /** @type {?} */ mouseX = action.event.x - centerX;
        let /** @type {?} */ mouseY = action.event.y - centerY;
        // store the new proposed dimensions for the widget
        let /** @type {?} */ dimensions = {
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
                    let /** @type {?} */ difference = this._options.minWidth - dimensions.width;
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
                    let /** @type {?} */ difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this._options.minWidth) {
                    let /** @type {?} */ difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this._options.minHeight) {
                    let /** @type {?} */ difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this._options.minHeight) {
                    let /** @type {?} */ difference = this._options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this._options.minWidth) {
                    let /** @type {?} */ difference = this._options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        let /** @type {?} */ currentWidth = action.widget.actualX + action.widget.actualWidth;
        let /** @type {?} */ currentHeight = action.widget.actualY + action.widget.actualHeight;
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
    }
    /**
     * @return {?}
     */
    onResizeEnd() {
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
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDragStart(action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    }
    /**
     * @return {?}
     */
    onDragEnd() {
        this.onResizeEnd();
        this._widgetOrigin = {};
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDrag(action) {
        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }
        // get the current mouse position
        let /** @type {?} */ mouseX = action.event.x - this._mouseEvent.x;
        let /** @type {?} */ mouseY = action.event.y - this._mouseEvent.y;
        // store the latest event
        this._mouseEvent = action.event;
        let /** @type {?} */ dimensions = {
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
    }
    /**
     * @return {?}
     */
    cacheWidgets() {
        this._cache = this._widgets.map(widget => {
            return {
                id: widget.getId(),
                column: widget.getColumn(),
                row: widget.getRow()
            };
        });
    }
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    restoreWidgets(ignoreActionWidget = false) {
        this._cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.getId()).forEach(widget => {
            let /** @type {?} */ match = this._widgets.find(wgt => wgt.getId() === widget.id);
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    }
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    shiftWidgets() {
        let /** @type {?} */ widgetsToMove = [];
        // check if there are any widgets under the placeholder
        for (let /** @type {?} */ row = this.getPlaceholder().row; row < this.getPlaceholder().row + this.getPlaceholder().rowSpan; row++) {
            for (let /** @type {?} */ column = this.getPlaceholder().column; column < this.getPlaceholder().column + this.getPlaceholder().columnSpan; column++) {
                // store reference to any widgets that need moved
                this.getOccupiedSpaces()
                    .filter(space => space.column === column && space.row === row && space.widget !== this._actionWidget.widget)
                    .forEach(space => widgetsToMove.push(space.widget));
            }
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter((widget, idx, array) => array.indexOf(widget) === idx);
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        let /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(widget => {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            let /** @type {?} */ grid = this.getOccupiedSpaces().filter(space => !unmovedWidgets.find(wgt => wgt === space.widget));
            // iterate each free block
            for (let /** @type {?} */ row = this._widgetOrigin.row; row < this._widgetOrigin.row + this._widgetOrigin.rowSpan; row++) {
                for (let /** @type {?} */ column = this._widgetOrigin.column; column < this._widgetOrigin.column + this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    let /** @type {?} */ requiredSpaces = this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    let /** @type {?} */ available = requiredSpaces.every(space => {
                        return !grid.find(gridSpace => gridSpace.column === space.column && gridSpace.row === space.row) && space.column < this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(wgt => wgt === widget), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            let /** @type {?} */ distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            this.moveWidgetDown(widget, distance);
        });
    }
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    validatePlaceholderPosition(shiftDirection) {
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
    }
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveLeft(widget, performMove = false) {
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        let /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        let /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveLeft(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }
        return moveable;
    }
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveRight(widget, performMove = false) {
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this._options.columns) {
            return false;
        }
        // find the positions required
        let /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        let /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveRight(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveRight(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    }
    /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    setWidgetOrigin() {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    }
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    getRequiredSpacesFromPoint(widget, column, row) {
        let /** @type {?} */ spaces = [];
        for (let /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (let /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    }
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    updateWidgetPositions(widget) {
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (let /** @type {?} */ column = this._placeholder.column; column < this._placeholder.column + this._placeholder.columnSpan; column++) {
            for (let /** @type {?} */ row = this._placeholder.row; row < this._placeholder.row + this._placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(wgt => wgt !== widget)
                    .forEach(wgt => this.moveWidgetDown(wgt));
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
    }
    /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    getWidgetsAtPosition(column, row, ignoreResizing = false) {
        return this.getOccupiedSpaces()
            .filter(space => space.column === column && space.row === row)
            .filter(space => space.widget !== this._actionWidget.widget || !ignoreResizing)
            .map(space => space.widget);
    }
    /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setPlaceholderBounds(visible, x, y, width, height) {
        this._placeholder.visible = visible;
        this._placeholder.column = this.getPlaceholderColumn(x, width);
        this._placeholder.row = this.getPlaceholderRow(y, height);
        this._placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        this._placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        let /** @type {?} */ rowCount = this._widgets.filter(widget => widget !== this._actionWidget.widget)
            .reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
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
    }
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumn(x, width) {
        let /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        let /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        let /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        let /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    }
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumnSpan(width) {
        let /** @type {?} */ columnSpan = this.getColumnFromPx(width);
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
        let /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    }
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRow(y, height) {
        let /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        let /** @type {?} */ rowSpan = Math.ceil(height / this.getRowHeight());
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        let /** @type {?} */ overflow = height < this.getRowHeight() ? 0 : height % this.getRowHeight();
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this.getRowHeight() / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    }
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRowSpan(height) {
        let /** @type {?} */ rowSpan = this.getRowFromPx(height);
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
        let /** @type {?} */ overflow = height % this.getRowHeight();
        return (overflow > (this.getRowHeight() / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    }
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    getColumnFromPx(x, rounding = Rounding.RoundDown) {
        let /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        let /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        let /** @type {?} */ half = this.getColumnWidth() / 2;
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
    }
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    getRowFromPx(y, rounding = Rounding.RoundDown) {
        let /** @type {?} */ row = Math.floor(y / Math.floor(this.getRowHeight()));
        let /** @type {?} */ overflow = (y % Math.floor(this.getRowHeight()));
        let /** @type {?} */ half = this.getRowHeight() / 2;
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
    }
    /**
     * @return {?}
     */
    commitWidgetChanges() {
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
    }
    /**
     * @return {?}
     */
    getPlaceholder() {
        return this._placeholder;
    }
    /**
     * Get the current column width
     * @return {?}
     */
    getColumnWidth() {
        return Math.floor(this._columnWidth);
    }
    /**
     * Get the current column height
     * @return {?}
     */
    getRowHeight() {
        return this._rowHeight;
    }
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    getRowCount() {
        return this._widgets.reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
    }
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    setDashboardHeight() {
        // size the dashboard container to ensure all rows fit
        let /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this._options.emptyRow) {
            rowCount++;
        }
        this._dimensions.height = rowCount * this.getRowHeight();
        this.height.next(this._dimensions.height);
    }
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    bringToFront(widget) {
        this._widgets.forEach(wgt => wgt.sendToBack());
        widget.bringToFront();
    }
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    moveWidgetDown(widget, distance = 1) {
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, (column, row) => this.getWidgetsAtPosition(column, row, true)
            .filter(wgt => wgt !== widget)
            .forEach(wgt => this.moveWidgetDown(wgt, distance)));
    }
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    shiftWidgetsUp() {
        // check whether or not changes have been made - if so we need to repeat until stable
        let /** @type {?} */ stable = true;
        // iterate each widget and 
        this._widgets.forEach(widget => {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (this._actionWidget && this._actionWidget.widget === widget) {
                return;
            }
            if (this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    }
    /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    forEachBlock(widget, callback) {
        for (let /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (let /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    }
    /**
     * Returns the number of columns available
     * @return {?}
     */
    getColumnCount() {
        return this._stacked ? 1 : this._options.columns;
    }
}
DashboardService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DashboardService.ctorParameters = () => [];
let ActionDirection = {};
ActionDirection.Top = 0;
ActionDirection.TopRight = 1;
ActionDirection.Right = 2;
ActionDirection.BottomRight = 3;
ActionDirection.Bottom = 4;
ActionDirection.BottomLeft = 5;
ActionDirection.Left = 6;
ActionDirection.TopLeft = 7;
ActionDirection.Move = 8;
ActionDirection[ActionDirection.Top] = "Top";
ActionDirection[ActionDirection.TopRight] = "TopRight";
ActionDirection[ActionDirection.Right] = "Right";
ActionDirection[ActionDirection.BottomRight] = "BottomRight";
ActionDirection[ActionDirection.Bottom] = "Bottom";
ActionDirection[ActionDirection.BottomLeft] = "BottomLeft";
ActionDirection[ActionDirection.Left] = "Left";
ActionDirection[ActionDirection.TopLeft] = "TopLeft";
ActionDirection[ActionDirection.Move] = "Move";
let Rounding = {};
Rounding.RoundDown = 0;
Rounding.RoundDownBelowHalf = 1;
Rounding.RoundUp = 2;
Rounding.RoundUpOverHalf = 3;
Rounding[Rounding.RoundDown] = "RoundDown";
Rounding[Rounding.RoundDownBelowHalf] = "RoundDownBelowHalf";
Rounding[Rounding.RoundUp] = "RoundUp";
Rounding[Rounding.RoundUpOverHalf] = "RoundUpOverHalf";

class DashboardComponent {
    /**
     * @param {?} _dashboardService
     * @param {?} _elementRef
     * @param {?} _ngZone
     */
    constructor(_dashboardService, _elementRef, _ngZone) {
        this._dashboardService = _dashboardService;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this.options = {};
        this.layoutChange = new EventEmitter();
        this.height = 0;
        this.placeholder = this._dashboardService.getPlaceholder();
        this._nativeElement = _elementRef.nativeElement;
        this._dashboardService.setDashboard(this._nativeElement);
        // watch for changes to component height
        this._dashboardService.height.subscribe(height => this.height = height);
        // subscribe to layout changes
        this._dashboardService.layout.subscribe(layout => {
            this.layout = layout;
            this.layoutChange.emit(layout);
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setOptions(this.options);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        // get the current set of options
        let /** @type {?} */ options = Object.assign({}, this._dashboardService.getDefaultOptions(), this.options);
        // if anything has changed then update them
        if (JSON.stringify(this._dashboardService.getOptions()) !== JSON.stringify(options)) {
            this.setOptions(options);
        }
        // check if the layout has changed
        if (JSON.stringify(this.layout) !== JSON.stringify(this._layout)) {
            this._layout = this.layout.slice();
            this._dashboardService.setLayoutData(this.layout);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // initially set dimensions
        this._dashboardService.setDimensions(this._nativeElement.offsetWidth, this._nativeElement.offsetHeight);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this._dashboardService.setOptions(options);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        // ensure this gets run inside Angular
        this._ngZone.run(() => {
            this._dashboardService.setDimensions(event.width, event.height);
        });
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard',
                template: `
      <div (uxResize)="onResize($event)" throttle="16" class="dashboard-container">
          <ng-content></ng-content>
      </div>

      <div class="position-indicator" *ngIf="placeholder.visible" [style.left.px]="placeholder.x" [style.top.px]="placeholder.y" [style.width.px]="placeholder.width"
          [style.height.px]="placeholder.height"></div>
    `,
                providers: [DashboardService],
                host: {
                    '[style.height.px]': 'height'
                }
            },] },
];
/**
 * @nocollapse
 */
DashboardComponent.ctorParameters = () => [
    { type: DashboardService, },
    { type: ElementRef, },
    { type: NgZone, },
];
DashboardComponent.propDecorators = {
    'options': [{ type: Input },],
    'layout': [{ type: Input },],
    'layoutChange': [{ type: Output },],
};

class DashboardWidgetComponent {
    /**
     * @param {?} _dashboardService
     * @param {?} _elementRef
     */
    constructor(_dashboardService, _elementRef) {
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
        this._dragMove = Observable$1.fromEvent(document, 'mousemove');
        this._dragEnd = Observable$1.fromEvent(document, 'mouseup');
        this._nativeElement = _elementRef.nativeElement;
        // add the widget to the dashboard
        _dashboardService.addWidget(this);
        // watch for changes to the options
        _dashboardService.options().subscribe(options => {
            this.padding = options.padding;
            this._columnSpan.stacked = options.columns;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * Once component is initialised link the resize handle elements with their direction
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialiseHandles();
    }
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    ngOnDestroy() {
        this._dashboardService.removeWidget(this);
    }
    /**
     * Return the ID of the widget
     * @return {?}
     */
    getId() {
        return this.id;
    }
    /**
     * Set the actual position and size values
     * @return {?}
     */
    render() {
        this.actualX = this.getColumn() * this._dashboardService.getColumnWidth();
        this.actualY = this.getRow() * this._dashboardService.getRowHeight();
        this.actualWidth = this.getColumnSpan() * this._dashboardService.getColumnWidth();
        this.actualHeight = this.getRowSpan() * this._dashboardService.getRowHeight();
    }
    /**
     * Returns all the resize handles and their associated directions
     * @return {?}
     */
    getHandles() {
        return this._handles;
    }
    /**
     * Indicates whether or not the widget should be displayed in stacked mode
     * @param {?} stacked indicates the stacked mode
     * @return {?}
     */
    setStacked(stacked) {
        this.stacked = stacked;
    }
    /**
     * @return {?}
     */
    getColumn() {
        return this.getStackableValue(this._column);
    }
    /**
     * @return {?}
     */
    getRow() {
        return this.getStackableValue(this._row);
    }
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    setColumn(column, render = true) {
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    setRow(row, render = true) {
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    getColumnSpan() {
        return this.getStackableValue(this._columnSpan);
    }
    /**
     * @return {?}
     */
    getRowSpan() {
        return this.getStackableValue(this._rowSpan);
    }
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    setColumnSpan(columnSpan, render = true) {
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    setRowSpan(rowSpan, render = true) {
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    bringToFront() {
        this.zIndex = 1;
    }
    /**
     * @return {?}
     */
    sendToBack() {
        this.zIndex = 0;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setBounds(x, y, width, height) {
        this.actualX = x;
        this.actualY = y;
        this.actualWidth = width;
        this.actualHeight = height;
    }
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    setStackableValue(property, value) {
        if (this.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    }
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    getStackableValue(property) {
        return this.stacked ? property.stacked : property.regular;
    }
    /**
     * Create data representations of the resize handle elements and the direction they will resize in
     * @return {?}
     */
    initialiseHandles() {
        this._handles = [
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top'),
                direction: ActionDirection.Top
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-right'),
                direction: ActionDirection.TopRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-right'),
                direction: ActionDirection.Right
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-right'),
                direction: ActionDirection.BottomRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom'),
                direction: ActionDirection.Bottom
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-left'),
                direction: ActionDirection.BottomLeft
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-left'),
                direction: ActionDirection.Left
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-left'),
                direction: ActionDirection.TopLeft
            }
        ];
        // bind resize events to each handle
        this._handles.forEach(handle => this.bindResize(handle));
    }
    /**
     * This will apply event listeners to each resize handle
     * @param {?} handle The element and direction to subscribe to
     * @return {?}
     */
    bindResize(handle) {
        // bind to resize events
        handle.listener = Observable$1.fromEvent(handle.element, 'mousedown').subscribe((downEvent) => {
            downEvent.preventDefault();
            // inform service that we are beginning to drag
            this._dashboardService.onResizeStart({ widget: this, direction: handle.direction, event: downEvent });
            let /** @type {?} */ move$ = this._dragMove.takeUntil(this._dragEnd).subscribe((moveEvent) => {
                moveEvent.preventDefault();
                this._dashboardService.onResizeDrag({ widget: this, direction: handle.direction, event: moveEvent });
            }, null, () => {
                move$.unsubscribe();
                this._dashboardService.onResizeEnd();
            });
        });
    }
}
DashboardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard-widget',
                template: `
      <div class="widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}">
          <ng-content></ng-content>
      </div>

      <div class="resizer-handle handle-top" [style.top.px]="padding" [hidden]="!resizable"></div>
      <div class="resizer-handle handle-top-right" [style.top.px]="padding" [style.right.px]="padding" [hidden]="!resizable && !stacked"></div>
      <div class="resizer-handle handle-right" [style.right.px]="padding" [hidden]="!resizable || stacked"></div>
      <div class="resizer-handle handle-bottom-right" [style.bottom.px]="padding" [style.right.px]="padding" [hidden]="!resizable && !stacked"></div>
      <div class="resizer-handle handle-bottom" [style.bottom.px]="padding" [hidden]="!resizable"></div>
      <div class="resizer-handle handle-bottom-left" [style.bottom.px]="padding" [style.left.px]="padding" [hidden]="!resizable && !stacked"></div>
      <div class="resizer-handle handle-left" [style.left.px]="padding" [hidden]="!resizable || stacked"></div>
      <div class="resizer-handle handle-top-left" [style.top.px]="padding" [style.left.px]="padding" [hidden]="!resizable && !stacked"></div>
    `,
                host: {
                    '[style.left.px]': 'actualX',
                    '[style.top.px]': 'actualY',
                    '[style.width.px]': 'actualWidth',
                    '[style.height.px]': 'actualHeight',
                    '[style.padding.px]': 'padding',
                    '[style.zIndex]': 'zIndex'
                }
            },] },
];
/**
 * @nocollapse
 */
DashboardWidgetComponent.ctorParameters = () => [
    { type: DashboardService, },
    { type: ElementRef, },
];
DashboardWidgetComponent.propDecorators = {
    'id': [{ type: Input },],
    'col': [{ type: Input },],
    'row': [{ type: Input },],
    'colSpan': [{ type: Input },],
    'rowSpan': [{ type: Input },],
    'resizable': [{ type: Input },],
};

class DashboardDragHandleDirective {
    /**
     * @param {?} widget
     * @param {?} elementRef
     * @param {?} dashboardService
     */
    constructor(widget, elementRef, dashboardService) {
        this._dragMove = Observable$1.fromEvent(document, 'mousemove');
        this._dragEnd = Observable$1.fromEvent(document, 'mouseup');
        Observable$1.fromEvent(elementRef.nativeElement, 'mousedown').subscribe((downEvent) => {
            downEvent.preventDefault();
            // inform service that we are beginning to drag
            dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: downEvent });
            let move$ = this._dragMove.takeUntil(this._dragEnd).subscribe((moveEvent) => {
                moveEvent.preventDefault();
                dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: moveEvent });
            }, null, () => {
                move$.unsubscribe();
                dashboardService.onDragEnd();
            });
        });
    }
}
DashboardDragHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ux-dashboard-widget-drag-handle]'
            },] },
];
/**
 * @nocollapse
 */
DashboardDragHandleDirective.ctorParameters = () => [
    { type: DashboardWidgetComponent, decorators: [{ type: Host },] },
    { type: ElementRef, },
    { type: DashboardService, },
];

class ResizeService {
    /**
     * @param {?} nativeElement
     * @param {?} renderer
     * @return {?}
     */
    addResizeListener(nativeElement, renderer) {
        // create subject
        let /** @type {?} */ subject = new Subject$1();
        // determine the style of the element
        let /** @type {?} */ displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        let /** @type {?} */ iframe = renderer.createElement('iframe');
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
        this.waitUntilReady(iframe, () => {
            let /** @type {?} */ iframeDoc = iframe.contentDocument || (iframe.contentWindow.document);
            let /** @type {?} */ attachListener = function () {
                Observable$1.fromEvent(iframe.contentWindow, 'resize').subscribe((event) => {
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
                iframe.addEventListener('load', () => attachListener());
            }
        });
        return subject;
    }
    /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
    waitUntilReady(iframe, callback) {
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        }
        else {
            setTimeout(() => this.waitUntilReady(iframe, callback));
        }
    }
}
ResizeService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ResizeService.ctorParameters = () => [];

class ResizeDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _resizeService
     * @param {?} _renderer
     */
    constructor(_elementRef, _resizeService, _renderer) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._renderer = _renderer;
        this.throttle = 0;
        this.resize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._resizeService.addResizeListener(this._elementRef.nativeElement, this._renderer).debounceTime(this.throttle).subscribe(event => {
            this.resize.emit(event);
        });
    }
}
ResizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxResize]'
            },] },
];
/**
 * @nocollapse
 */
ResizeDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: Renderer2, },
];
ResizeDirective.propDecorators = {
    'throttle': [{ type: Input },],
    'resize': [{ type: Output, args: ['uxResize',] },],
};

class ResizeModule {
}
ResizeModule.decorators = [
    { type: NgModule, args: [{
                exports: [ResizeDirective],
                declarations: [ResizeDirective],
                providers: [ResizeService]
            },] },
];
/**
 * @nocollapse
 */
ResizeModule.ctorParameters = () => [];

const DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
];
class DashboardModule {
}
DashboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS,
                providers: [DashboardService],
            },] },
];
/**
 * @nocollapse
 */
DashboardModule.ctorParameters = () => [];

class EboxComponent {
}
EboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-ebox',
                template: `
      <div class="ux-ebox-header">
          <ng-content select="ux-ebox-header"></ng-content>
      </div>

      <div class="ux-ebox-content">
          <ng-content select="ux-ebox-content"></ng-content>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
EboxComponent.ctorParameters = () => [];
class EboxHeaderDirective {
}
EboxHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-ebox-header'
            },] },
];
/**
 * @nocollapse
 */
EboxHeaderDirective.ctorParameters = () => [];
class EboxContentDirective {
}
EboxContentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-ebox-content'
            },] },
];
/**
 * @nocollapse
 */
EboxContentDirective.ctorParameters = () => [];

class EboxModule {
}
EboxModule.decorators = [
    { type: NgModule, args: [{
                exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
                declarations: [EboxComponent, EboxContentDirective, EboxHeaderDirective]
            },] },
];
/**
 * @nocollapse
 */
EboxModule.ctorParameters = () => [];

/** Default values provider for tooltip */
var TooltipConfig = (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
    }
    TooltipConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TooltipConfig.ctorParameters = function () { return []; };
    return TooltipConfig;
}());

/*tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || {};

var guessedVersion;
function _guessBsVersion() {
    if (typeof document === 'undefined') {
        return null;
    }
    var spanEl = document.createElement('span');
    spanEl.innerText = 'test bs version';
    document.body.appendChild(spanEl);
    spanEl.classList.add('d-none');
    var rect = spanEl.getBoundingClientRect();
    document.body.removeChild(spanEl);
    if (!rect) {
        return 'bs3';
    }
    return rect.top === 0 ? 'bs4' : 'bs3';
}
// todo: in ngx-bootstrap, bs4 will became a default one
function isBs3() {
    if (typeof win === 'undefined') {
        return true;
    }
    if (typeof win.__theme === 'undefined') {
        if (guessedVersion) {
            return guessedVersion === 'bs3';
        }
        guessedVersion = _guessBsVersion();
        return guessedVersion === 'bs3';
    }
    return win.__theme !== 'bs4';
}

var TooltipContainerComponent = (function () {
    function TooltipContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(TooltipContainerComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    TooltipContainerComponent.prototype.ngAfterViewInit = function () {
        this.classMap = { in: false, fade: false };
        this.classMap[this.placement] = true;
        this.classMap['tooltip-' + this.placement] = true;
        this.classMap.in = true;
        if (this.animation) {
            this.classMap.fade = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    };
    TooltipContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-tooltip-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip'
                    },
                    styles: ["    \n    :host.tooltip {\n      display: block;\n    }\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: calc(50% - 2.5px);\n    }\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: calc(50% - 2.5px);\n    }\n  "],
                    template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    "
                    // template: `<div class="tooltip" role="tooltip"
                    //    [ngStyle]="{top: top, left: left, display: display}"
                    //    [ngClass]="classMap">
                    //     <div class="tooltip-arrow"></div>
                    //     <div class="tooltip-inner"
                    //          *ngIf="htmlContent && !isTemplate"
                    //          innerHtml="{{htmlContent}}">
                    //     </div>
                    //     <div class="tooltip-inner"
                    //          *ngIf="htmlContent && isTemplate">
                    //       <template [ngTemplateOutlet]="htmlContent"
                    //                 [ngOutletContext]="{model: context}">
                    //       </template>
                    //     </div>
                    //     <div class="tooltip-inner"
                    //          *ngIf="content">
                    //       {{content}}
                    //     </div>
                    //   </div>`
                },] },
    ];
    /** @nocollapse */
    TooltipContainerComponent.ctorParameters = function () { return [
        { type: TooltipConfig, },
    ]; };
    return TooltipContainerComponent;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var Trigger = (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
    return Trigger;
}());

var DEFAULT_ALIASES = {
    hover: ['mouseover', 'mouseout'],
    focus: ['focusin', 'focusout']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers.split(/\s+/)
        .map(function (trigger) { return trigger.split(':'); })
        .map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers
        .filter(function (triggerPair) { return triggerPair.isManual(); });
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}

function listenToTriggersV2(renderer, options) {
    var parsedTriggers = parseTriggers(options.triggers);
    var target = options.target;
    // do nothing
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    // all listeners
    var listeners = [];
    // lazy listeners registration
    var _registerHide = [];
    var registerHide = function () {
        // add hide listeners to unregister array
        _registerHide.forEach(function (fn) { return listeners.push(fn()); });
        // register hide events only once
        _registerHide.length = 0;
    };
    // register open\close\toggle listeners
    parsedTriggers.forEach(function (trigger) {
        var useToggle = trigger.open === trigger.close;
        var showFn = useToggle ? options.toggle : options.show;
        if (!useToggle) {
            _registerHide.push(function () { return renderer.listen(target, trigger.close, options.hide); });
        }
        listeners.push(renderer.listen(target, trigger.open, function () { return showFn(registerHide); }));
    });
    return function () {
        listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); });
    };
}
function registerOutsideClick(renderer, options) {
    if (!options.outsideClick) {
        return Function.prototype;
    }
    return renderer.listenGlobal('document', 'click', function (event) {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets && options.targets.some(function (target) { return target.contains(event.target); })) {
            return;
        }
        options.hide();
    });
}

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
var ContentRef = (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());

// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
var ComponentLoader = (function () {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     */
    // tslint:disable-next-line
    function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService) {
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._injector = _injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._applicationRef = _applicationRef;
        this._posService = _posService;
        this.onBeforeShow = new EventEmitter();
        this.onShown = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onHidden = new EventEmitter();
        this._providers = [];
        this._listenOpts = {};
        this._globalListener = Function.prototype;
    }
    Object.defineProperty(ComponentLoader.prototype, "isShown", {
        get: function () {
            return !!this._componentRef;
        },
        enumerable: true,
        configurable: true
    });
    
    ComponentLoader.prototype.attach = function (compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    };
    // todo: add behaviour: to target element, `body`, custom element
    ComponentLoader.prototype.to = function (container) {
        this.container = container || this.container;
        return this;
    };
    ComponentLoader.prototype.position = function (opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = opts.target || this._elementRef;
        return this;
    };
    ComponentLoader.prototype.provide = function (provider) {
        this._providers.push(provider);
        return this;
    };
    // todo: appendChild to element or document.querySelector(this.container)
    ComponentLoader.prototype.show = function (opts) {
        if (opts === void 0) { opts = {}; }
        this._subscribePositioning();
        this._innerComponent = null;
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content, opts.context);
            var injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
            this._applicationRef.attachView(this._componentRef.hostView);
            // this._componentRef = this._viewContainerRef
            //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container instanceof ElementRef) {
                this.container.nativeElement
                    .appendChild(this._componentRef.location.nativeElement);
            }
            if (this.container === 'body' && typeof document !== 'undefined') {
                document.querySelector(this.container)
                    .appendChild(this._componentRef.location.nativeElement);
            }
            if (!this.container && this._elementRef && this._elementRef.nativeElement.parentElement) {
                this._elementRef.nativeElement.parentElement
                    .appendChild(this._componentRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered
            // via
            // Renderer::listen() are not picked up by change detection with the
            // OnPush strategy
            if (this._contentRef.componentRef) {
                this._innerComponent = this._contentRef.componentRef.instance;
                this._contentRef.componentRef.changeDetectorRef.markForCheck();
                this._contentRef.componentRef.changeDetectorRef.detectChanges();
            }
            this._componentRef.changeDetectorRef.markForCheck();
            this._componentRef.changeDetectorRef.detectChanges();
            this.onShown.emit(this._componentRef.instance);
        }
        this._registerOutsideClick();
        return this._componentRef;
    };
    ComponentLoader.prototype.hide = function () {
        if (!this._componentRef) {
            return this;
        }
        this.onBeforeHide.emit(this._componentRef.instance);
        var componentEl = this._componentRef.location.nativeElement;
        componentEl.parentNode.removeChild(componentEl);
        if (this._contentRef.componentRef) {
            this._contentRef.componentRef.destroy();
        }
        this._componentRef.destroy();
        if (this._viewContainerRef && this._contentRef.viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        }
        // this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
        //
        // if (this._contentRef.viewRef && this._viewContainerRef.indexOf(this._contentRef.viewRef) !== -1) {
        //   this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        // }
        this._contentRef = null;
        this._componentRef = null;
        this._removeGlobalListener();
        this.onHidden.emit();
        return this;
    };
    ComponentLoader.prototype.toggle = function () {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    };
    ComponentLoader.prototype.dispose = function () {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    };
    ComponentLoader.prototype.listen = function (listenOpts) {
        var _this = this;
        this.triggers = listenOpts.triggers || this.triggers;
        this._listenOpts.outsideClick = listenOpts.outsideClick;
        listenOpts.target = listenOpts.target || this._elementRef.nativeElement;
        var hide = this._listenOpts.hide = function () { return listenOpts.hide ? listenOpts.hide() : _this.hide(); };
        var show = this._listenOpts.show = function (registerHide) {
            listenOpts.show ? listenOpts.show(registerHide) : _this.show(registerHide);
            registerHide();
        };
        var toggle = function (registerHide) {
            _this.isShown ? hide() : show(registerHide);
        };
        this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
            target: listenOpts.target,
            triggers: listenOpts.triggers,
            show: show, hide: hide, toggle: toggle
        });
        return this;
    };
    ComponentLoader.prototype._removeGlobalListener = function () {
        if (this._globalListener) {
            this._globalListener();
            this._globalListener = null;
        }
    };
    ComponentLoader.prototype.attachInline = function (vRef, template) {
        this._inlineViewRef = vRef.createEmbeddedView(template);
        return this;
    };
    ComponentLoader.prototype._registerOutsideClick = function () {
        var _this = this;
        if (!this._componentRef || !this._componentRef.location) {
            return;
        }
        // why: should run after first event bubble
        if (this._listenOpts.outsideClick) {
            var target_1 = this._componentRef.location.nativeElement;
            setTimeout(function () {
                _this._globalListener = registerOutsideClick(_this._renderer, {
                    targets: [target_1, _this._elementRef.nativeElement],
                    outsideClick: _this._listenOpts.outsideClick,
                    hide: function () { return _this._listenOpts.hide(); }
                });
            });
        }
    };
    ComponentLoader.prototype.getInnerComponent = function () {
        return this._innerComponent;
    };
    ComponentLoader.prototype._subscribePositioning = function () {
        var _this = this;
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this._zoneSubscription = this._ngZone
            .onStable.subscribe(function () {
            if (!_this._componentRef) {
                return;
            }
            _this._posService.position({
                element: _this._componentRef.location,
                target: _this._elementRef,
                attachment: _this.attachment,
                appendToBody: _this.container === 'body'
            });
        });
    };
    ComponentLoader.prototype._unsubscribePositioning = function () {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = null;
    };
    ComponentLoader.prototype._getContentRef = function (content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof TemplateRef) {
            if (this._viewContainerRef) {
                var viewRef_1 = this._viewContainerRef.createEmbeddedView(content, context);
                viewRef_1.markForCheck();
                return new ContentRef([viewRef_1.rootNodes], viewRef_1);
            }
            var viewRef = content.createEmbeddedView({});
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'function') {
            var contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
            var modalContentInjector = ReflectiveInjector.resolveAndCreate(this._providers.concat([content]), this._injector);
            var componentRef = contentCmptFactory.create(modalContentInjector);
            this._applicationRef.attachView(componentRef.hostView);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        return new ContentRef([[this._renderer.createText(null, "" + content)]]);
    };
    return ComponentLoader;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
var Positioning = (function () {
    function Positioning() {
    }
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            var bcRect = element.getBoundingClientRect();
            elPosition = {
                width: bcRect.width,
                height: bcRect.height,
                top: bcRect.top,
                bottom: bcRect.bottom,
                left: bcRect.left,
                right: bcRect.right
            };
        }
        else {
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split(' ')[0] || 'top';
        var placementSecondary = placement.split(' ')[1] || 'center';
        var targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        if (placementPrimary === "auto") {
            var newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement, placementSecondary);
            if (!newPlacementPrimary)
                newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement);
            if (newPlacementPrimary)
                placementPrimary = newPlacementPrimary;
            targetElement.classList.add(placementPrimary);
        }
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top = hostElPosition.top - (targetElement.offsetHeight + parseFloat(targetElStyles.marginBottom));
                targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'bottom':
                targetElPosition.top = shiftHeight[placementPrimary];
                targetElPosition.bottom += shiftHeight[placementPrimary];
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'left':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = hostElPosition.left - (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = shiftWidth[placementPrimary];
                targetElPosition.right += shiftWidth[placementPrimary];
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    };
    Positioning.prototype.autoPosition = function (targetElPosition, hostElPosition, targetElement, preferredPosition) {
        if ((!preferredPosition || preferredPosition === "right") && targetElPosition.left + hostElPosition.left - targetElement.offsetWidth < 0) {
            return "right";
        }
        else if ((!preferredPosition || preferredPosition === "top") && targetElPosition.bottom + hostElPosition.bottom + targetElement.offsetHeight > window.innerHeight) {
            return "top";
        }
        else if ((!preferredPosition || preferredPosition === "bottom") && targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0) {
            return "bottom";
        }
        else if ((!preferredPosition || preferredPosition === "left") && targetElPosition.right + hostElPosition.right + targetElement.offsetWidth > window.innerWidth) {
            return "left";
        }
        return null;
    };
    Positioning.prototype.getAllStyles = function (element) { return window.getComputedStyle(element); };
    Positioning.prototype.getStyle = function (element, prop) { return this.getAllStyles(element)[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    return Positioning;
}());
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = pos.top + "px";
    targetElement.style.left = pos.left + "px";
}

var PositioningService = (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        positionElements(this._getHtmlElement(target), this._getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.prototype._getHtmlElement = function (element) {
        // it means that we got a selector
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
        if (element instanceof ElementRef) {
            return element.nativeElement;
        }
        return element;
    };
    PositioningService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return []; };
    return PositioningService;
}());

var ComponentLoaderFactory = (function () {
    function ComponentLoaderFactory(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    ComponentLoaderFactory.prototype.createLoader = function (_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: NgZone, },
        { type: Injector, },
        { type: PositioningService, },
        { type: ApplicationRef, },
    ]; };
    return ComponentLoaderFactory;
}());

/*tslint:disable:no-invalid-this */
function OnChange(defaultValue) {
    var sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        var _key = " __" + propertyKey + "Value";
        Object.defineProperty(target, propertyKey, {
            get: function () { return this[_key]; },
            set: function (value) {
                var prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
/* tslint:enable */

var _messagesHash = {};
var _hideMsg = typeof console === 'undefined' || !console.warn;
function warnOnce(msg) {
    if (!isDevMode() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    /*tslint:disable-next-line*/
    console.warn(msg);
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TooltipDirective = (function () {
    // tslint:disable-next-line
    function TooltipDirective(_viewContainerRef, _renderer, _elementRef, cis, config) {
        /** Fired when tooltip content changes */
        this.tooltipChange = new EventEmitter();
        /**
         * Css class for tooltip container
         */
        this.containerClass = '';
        /** @deprecated - removed, will be added to configuration */
        this._animation = true;
        /** @deprecated */
        this._delay = 0;
        /** @deprecated */
        this._fadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new EventEmitter();
        this._tooltip = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: TooltipConfig, useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    Object.defineProperty(TooltipDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the tooltip is currently being shown
         */
        get: function () { return this._tooltip.isShown; },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "htmlContent", {
        /* tslint:disable */
        /** @deprecated - please use `tooltip` instead */
        set: function (value) {
            warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
            this.tooltip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_placement", {
        /** @deprecated - please use `placement` instead */
        set: function (value) {
            warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
            this.placement = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_isOpen", {
        get: function () {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            return this.isOpen;
        },
        /** @deprecated - please use `isOpen` instead*/
        set: function (value) {
            warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_enable", {
        get: function () {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            return this.isDisabled === true;
        },
        /** @deprecated - please use `isDisabled` instead */
        set: function (value) {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            this.isDisabled = value === true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_appendToBody", {
        get: function () {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            return this.container === 'body';
        },
        /** @deprecated - please use `container="body"` instead */
        set: function (value) {
            warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
            this.container = value ? 'body' : this.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_popupClass", {
        /** @deprecated - will replaced with customClass */
        set: function (value) {
            warnOnce('tooltipClass deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipContext", {
        /** @deprecated - removed */
        set: function (value) {
            warnOnce('tooltipContext deprecated');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "_tooltipTrigger", {
        /** @deprecated -  please use `triggers` instead */
        get: function () {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            return this.triggers;
        },
        set: function (value) {
            warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
            this.triggers = (value || '').toString();
        },
        enumerable: true,
        configurable: true
    });
    
    
    TooltipDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._tooltip.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        this.tooltipChange.subscribe(function (value) {
            if (!value) {
                _this._tooltip.hide();
            }
        });
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    TooltipDirective.prototype.toggle = function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    TooltipDirective.prototype.show = function () {
        var _this = this;
        if (this.isOpen || this.isDisabled || this._delayTimeoutId || !this.tooltip) {
            return;
        }
        var showTooltip = function () { return _this._tooltip
            .attach(TooltipContainerComponent)
            .to(_this.container)
            .position({ attachment: _this.placement })
            .show({
            content: _this.tooltip,
            placement: _this.placement,
            containerClass: _this.containerClass
        }); };
        if (this._delay) {
            this._delayTimeoutId = setTimeout(function () { showTooltip(); }, this._delay);
        }
        else {
            showTooltip();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    TooltipDirective.prototype.hide = function () {
        var _this = this;
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        this._tooltip.instance.classMap.in = false;
        setTimeout(function () {
            _this._tooltip.hide();
        }, this._fadeDuration);
    };
    TooltipDirective.prototype.ngOnDestroy = function () {
        this._tooltip.dispose();
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: Renderer, },
        { type: ElementRef, },
        { type: ComponentLoaderFactory, },
        { type: TooltipConfig, },
    ]; };
    TooltipDirective.propDecorators = {
        'tooltip': [{ type: Input },],
        'tooltipChange': [{ type: Output },],
        'placement': [{ type: Input },],
        'triggers': [{ type: Input },],
        'container': [{ type: Input },],
        'isOpen': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'containerClass': [{ type: Input },],
        'onShown': [{ type: Output },],
        'onHidden': [{ type: Output },],
        'htmlContent': [{ type: Input, args: ['tooltipHtml',] },],
        '_placement': [{ type: Input, args: ['tooltipPlacement',] },],
        '_isOpen': [{ type: Input, args: ['tooltipIsOpen',] },],
        '_enable': [{ type: Input, args: ['tooltipEnable',] },],
        '_appendToBody': [{ type: Input, args: ['tooltipAppendToBody',] },],
        '_animation': [{ type: Input, args: ['tooltipAnimation',] },],
        '_popupClass': [{ type: Input, args: ['tooltipClass',] },],
        '_tooltipContext': [{ type: Input, args: ['tooltipContext',] },],
        '_delay': [{ type: Input, args: ['tooltipPopupDelay',] },],
        '_fadeDuration': [{ type: Input, args: ['tooltipFadeDuration',] },],
        '_tooltipTrigger': [{ type: Input, args: ['tooltipTrigger',] },],
        'tooltipStateChanged': [{ type: Output },],
    };
    __decorate([
        OnChange(),
        __metadata("design:type", Object)
    ], TooltipDirective.prototype, "tooltip", void 0);
    return TooltipDirective;
}());

var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () {
        return {
            ngModule: TooltipModule,
            providers: [TooltipConfig, ComponentLoaderFactory, PositioningService]
        };
    };
    
    TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TooltipDirective, TooltipContainerComponent],
                    exports: [TooltipDirective],
                    entryComponents: [TooltipContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());

/* tslint:disable:max-file-line-count */
var latinMap = {
    'Á': 'A',
    'Ă': 'A',
    'Ắ': 'A',
    'Ặ': 'A',
    'Ằ': 'A',
    'Ẳ': 'A',
    'Ẵ': 'A',
    'Ǎ': 'A',
    'Â': 'A',
    'Ấ': 'A',
    'Ậ': 'A',
    'Ầ': 'A',
    'Ẩ': 'A',
    'Ẫ': 'A',
    'Ä': 'A',
    'Ǟ': 'A',
    'Ȧ': 'A',
    'Ǡ': 'A',
    'Ạ': 'A',
    'Ȁ': 'A',
    'À': 'A',
    'Ả': 'A',
    'Ȃ': 'A',
    'Ā': 'A',
    'Ą': 'A',
    'Å': 'A',
    'Ǻ': 'A',
    'Ḁ': 'A',
    'Ⱥ': 'A',
    'Ã': 'A',
    'Ꜳ': 'AA',
    'Æ': 'AE',
    'Ǽ': 'AE',
    'Ǣ': 'AE',
    'Ꜵ': 'AO',
    'Ꜷ': 'AU',
    'Ꜹ': 'AV',
    'Ꜻ': 'AV',
    'Ꜽ': 'AY',
    'Ḃ': 'B',
    'Ḅ': 'B',
    'Ɓ': 'B',
    'Ḇ': 'B',
    'Ƀ': 'B',
    'Ƃ': 'B',
    'Ć': 'C',
    'Č': 'C',
    'Ç': 'C',
    'Ḉ': 'C',
    'Ĉ': 'C',
    'Ċ': 'C',
    'Ƈ': 'C',
    'Ȼ': 'C',
    'Ď': 'D',
    'Ḑ': 'D',
    'Ḓ': 'D',
    'Ḋ': 'D',
    'Ḍ': 'D',
    'Ɗ': 'D',
    'Ḏ': 'D',
    'ǲ': 'D',
    'ǅ': 'D',
    'Đ': 'D',
    'Ƌ': 'D',
    'Ǳ': 'DZ',
    'Ǆ': 'DZ',
    'É': 'E',
    'Ĕ': 'E',
    'Ě': 'E',
    'Ȩ': 'E',
    'Ḝ': 'E',
    'Ê': 'E',
    'Ế': 'E',
    'Ệ': 'E',
    'Ề': 'E',
    'Ể': 'E',
    'Ễ': 'E',
    'Ḙ': 'E',
    'Ë': 'E',
    'Ė': 'E',
    'Ẹ': 'E',
    'Ȅ': 'E',
    'È': 'E',
    'Ẻ': 'E',
    'Ȇ': 'E',
    'Ē': 'E',
    'Ḗ': 'E',
    'Ḕ': 'E',
    'Ę': 'E',
    'Ɇ': 'E',
    'Ẽ': 'E',
    'Ḛ': 'E',
    'Ꝫ': 'ET',
    'Ḟ': 'F',
    'Ƒ': 'F',
    'Ǵ': 'G',
    'Ğ': 'G',
    'Ǧ': 'G',
    'Ģ': 'G',
    'Ĝ': 'G',
    'Ġ': 'G',
    'Ɠ': 'G',
    'Ḡ': 'G',
    'Ǥ': 'G',
    'Ḫ': 'H',
    'Ȟ': 'H',
    'Ḩ': 'H',
    'Ĥ': 'H',
    'Ⱨ': 'H',
    'Ḧ': 'H',
    'Ḣ': 'H',
    'Ḥ': 'H',
    'Ħ': 'H',
    'Í': 'I',
    'Ĭ': 'I',
    'Ǐ': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ḯ': 'I',
    'İ': 'I',
    'Ị': 'I',
    'Ȉ': 'I',
    'Ì': 'I',
    'Ỉ': 'I',
    'Ȋ': 'I',
    'Ī': 'I',
    'Į': 'I',
    'Ɨ': 'I',
    'Ĩ': 'I',
    'Ḭ': 'I',
    'Ꝺ': 'D',
    'Ꝼ': 'F',
    'Ᵹ': 'G',
    'Ꞃ': 'R',
    'Ꞅ': 'S',
    'Ꞇ': 'T',
    'Ꝭ': 'IS',
    'Ĵ': 'J',
    'Ɉ': 'J',
    'Ḱ': 'K',
    'Ǩ': 'K',
    'Ķ': 'K',
    'Ⱪ': 'K',
    'Ꝃ': 'K',
    'Ḳ': 'K',
    'Ƙ': 'K',
    'Ḵ': 'K',
    'Ꝁ': 'K',
    'Ꝅ': 'K',
    'Ĺ': 'L',
    'Ƚ': 'L',
    'Ľ': 'L',
    'Ļ': 'L',
    'Ḽ': 'L',
    'Ḷ': 'L',
    'Ḹ': 'L',
    'Ⱡ': 'L',
    'Ꝉ': 'L',
    'Ḻ': 'L',
    'Ŀ': 'L',
    'Ɫ': 'L',
    'ǈ': 'L',
    'Ł': 'L',
    'Ǉ': 'LJ',
    'Ḿ': 'M',
    'Ṁ': 'M',
    'Ṃ': 'M',
    'Ɱ': 'M',
    'Ń': 'N',
    'Ň': 'N',
    'Ņ': 'N',
    'Ṋ': 'N',
    'Ṅ': 'N',
    'Ṇ': 'N',
    'Ǹ': 'N',
    'Ɲ': 'N',
    'Ṉ': 'N',
    'Ƞ': 'N',
    'ǋ': 'N',
    'Ñ': 'N',
    'Ǌ': 'NJ',
    'Ó': 'O',
    'Ŏ': 'O',
    'Ǒ': 'O',
    'Ô': 'O',
    'Ố': 'O',
    'Ộ': 'O',
    'Ồ': 'O',
    'Ổ': 'O',
    'Ỗ': 'O',
    'Ö': 'O',
    'Ȫ': 'O',
    'Ȯ': 'O',
    'Ȱ': 'O',
    'Ọ': 'O',
    'Ő': 'O',
    'Ȍ': 'O',
    'Ò': 'O',
    'Ỏ': 'O',
    'Ơ': 'O',
    'Ớ': 'O',
    'Ợ': 'O',
    'Ờ': 'O',
    'Ở': 'O',
    'Ỡ': 'O',
    'Ȏ': 'O',
    'Ꝋ': 'O',
    'Ꝍ': 'O',
    'Ō': 'O',
    'Ṓ': 'O',
    'Ṑ': 'O',
    'Ɵ': 'O',
    'Ǫ': 'O',
    'Ǭ': 'O',
    'Ø': 'O',
    'Ǿ': 'O',
    'Õ': 'O',
    'Ṍ': 'O',
    'Ṏ': 'O',
    'Ȭ': 'O',
    'Ƣ': 'OI',
    'Ꝏ': 'OO',
    'Ɛ': 'E',
    'Ɔ': 'O',
    'Ȣ': 'OU',
    'Ṕ': 'P',
    'Ṗ': 'P',
    'Ꝓ': 'P',
    'Ƥ': 'P',
    'Ꝕ': 'P',
    'Ᵽ': 'P',
    'Ꝑ': 'P',
    'Ꝙ': 'Q',
    'Ꝗ': 'Q',
    'Ŕ': 'R',
    'Ř': 'R',
    'Ŗ': 'R',
    'Ṙ': 'R',
    'Ṛ': 'R',
    'Ṝ': 'R',
    'Ȑ': 'R',
    'Ȓ': 'R',
    'Ṟ': 'R',
    'Ɍ': 'R',
    'Ɽ': 'R',
    'Ꜿ': 'C',
    'Ǝ': 'E',
    'Ś': 'S',
    'Ṥ': 'S',
    'Š': 'S',
    'Ṧ': 'S',
    'Ş': 'S',
    'Ŝ': 'S',
    'Ș': 'S',
    'Ṡ': 'S',
    'Ṣ': 'S',
    'Ṩ': 'S',
    'Ť': 'T',
    'Ţ': 'T',
    'Ṱ': 'T',
    'Ț': 'T',
    'Ⱦ': 'T',
    'Ṫ': 'T',
    'Ṭ': 'T',
    'Ƭ': 'T',
    'Ṯ': 'T',
    'Ʈ': 'T',
    'Ŧ': 'T',
    'Ɐ': 'A',
    'Ꞁ': 'L',
    'Ɯ': 'M',
    'Ʌ': 'V',
    'Ꜩ': 'TZ',
    'Ú': 'U',
    'Ŭ': 'U',
    'Ǔ': 'U',
    'Û': 'U',
    'Ṷ': 'U',
    'Ü': 'U',
    'Ǘ': 'U',
    'Ǚ': 'U',
    'Ǜ': 'U',
    'Ǖ': 'U',
    'Ṳ': 'U',
    'Ụ': 'U',
    'Ű': 'U',
    'Ȕ': 'U',
    'Ù': 'U',
    'Ủ': 'U',
    'Ư': 'U',
    'Ứ': 'U',
    'Ự': 'U',
    'Ừ': 'U',
    'Ử': 'U',
    'Ữ': 'U',
    'Ȗ': 'U',
    'Ū': 'U',
    'Ṻ': 'U',
    'Ų': 'U',
    'Ů': 'U',
    'Ũ': 'U',
    'Ṹ': 'U',
    'Ṵ': 'U',
    'Ꝟ': 'V',
    'Ṿ': 'V',
    'Ʋ': 'V',
    'Ṽ': 'V',
    'Ꝡ': 'VY',
    'Ẃ': 'W',
    'Ŵ': 'W',
    'Ẅ': 'W',
    'Ẇ': 'W',
    'Ẉ': 'W',
    'Ẁ': 'W',
    'Ⱳ': 'W',
    'Ẍ': 'X',
    'Ẋ': 'X',
    'Ý': 'Y',
    'Ŷ': 'Y',
    'Ÿ': 'Y',
    'Ẏ': 'Y',
    'Ỵ': 'Y',
    'Ỳ': 'Y',
    'Ƴ': 'Y',
    'Ỷ': 'Y',
    'Ỿ': 'Y',
    'Ȳ': 'Y',
    'Ɏ': 'Y',
    'Ỹ': 'Y',
    'Ź': 'Z',
    'Ž': 'Z',
    'Ẑ': 'Z',
    'Ⱬ': 'Z',
    'Ż': 'Z',
    'Ẓ': 'Z',
    'Ȥ': 'Z',
    'Ẕ': 'Z',
    'Ƶ': 'Z',
    'Ĳ': 'IJ',
    'Œ': 'OE',
    'ᴀ': 'A',
    'ᴁ': 'AE',
    'ʙ': 'B',
    'ᴃ': 'B',
    'ᴄ': 'C',
    'ᴅ': 'D',
    'ᴇ': 'E',
    'ꜰ': 'F',
    'ɢ': 'G',
    'ʛ': 'G',
    'ʜ': 'H',
    'ɪ': 'I',
    'ʁ': 'R',
    'ᴊ': 'J',
    'ᴋ': 'K',
    'ʟ': 'L',
    'ᴌ': 'L',
    'ᴍ': 'M',
    'ɴ': 'N',
    'ᴏ': 'O',
    'ɶ': 'OE',
    'ᴐ': 'O',
    'ᴕ': 'OU',
    'ᴘ': 'P',
    'ʀ': 'R',
    'ᴎ': 'N',
    'ᴙ': 'R',
    'ꜱ': 'S',
    'ᴛ': 'T',
    'ⱻ': 'E',
    'ᴚ': 'R',
    'ᴜ': 'U',
    'ᴠ': 'V',
    'ᴡ': 'W',
    'ʏ': 'Y',
    'ᴢ': 'Z',
    'á': 'a',
    'ă': 'a',
    'ắ': 'a',
    'ặ': 'a',
    'ằ': 'a',
    'ẳ': 'a',
    'ẵ': 'a',
    'ǎ': 'a',
    'â': 'a',
    'ấ': 'a',
    'ậ': 'a',
    'ầ': 'a',
    'ẩ': 'a',
    'ẫ': 'a',
    'ä': 'a',
    'ǟ': 'a',
    'ȧ': 'a',
    'ǡ': 'a',
    'ạ': 'a',
    'ȁ': 'a',
    'à': 'a',
    'ả': 'a',
    'ȃ': 'a',
    'ā': 'a',
    'ą': 'a',
    'ᶏ': 'a',
    'ẚ': 'a',
    'å': 'a',
    'ǻ': 'a',
    'ḁ': 'a',
    'ⱥ': 'a',
    'ã': 'a',
    'ꜳ': 'aa',
    'æ': 'ae',
    'ǽ': 'ae',
    'ǣ': 'ae',
    'ꜵ': 'ao',
    'ꜷ': 'au',
    'ꜹ': 'av',
    'ꜻ': 'av',
    'ꜽ': 'ay',
    'ḃ': 'b',
    'ḅ': 'b',
    'ɓ': 'b',
    'ḇ': 'b',
    'ᵬ': 'b',
    'ᶀ': 'b',
    'ƀ': 'b',
    'ƃ': 'b',
    'ɵ': 'o',
    'ć': 'c',
    'č': 'c',
    'ç': 'c',
    'ḉ': 'c',
    'ĉ': 'c',
    'ɕ': 'c',
    'ċ': 'c',
    'ƈ': 'c',
    'ȼ': 'c',
    'ď': 'd',
    'ḑ': 'd',
    'ḓ': 'd',
    'ȡ': 'd',
    'ḋ': 'd',
    'ḍ': 'd',
    'ɗ': 'd',
    'ᶑ': 'd',
    'ḏ': 'd',
    'ᵭ': 'd',
    'ᶁ': 'd',
    'đ': 'd',
    'ɖ': 'd',
    'ƌ': 'd',
    'ı': 'i',
    'ȷ': 'j',
    'ɟ': 'j',
    'ʄ': 'j',
    'ǳ': 'dz',
    'ǆ': 'dz',
    'é': 'e',
    'ĕ': 'e',
    'ě': 'e',
    'ȩ': 'e',
    'ḝ': 'e',
    'ê': 'e',
    'ế': 'e',
    'ệ': 'e',
    'ề': 'e',
    'ể': 'e',
    'ễ': 'e',
    'ḙ': 'e',
    'ë': 'e',
    'ė': 'e',
    'ẹ': 'e',
    'ȅ': 'e',
    'è': 'e',
    'ẻ': 'e',
    'ȇ': 'e',
    'ē': 'e',
    'ḗ': 'e',
    'ḕ': 'e',
    'ⱸ': 'e',
    'ę': 'e',
    'ᶒ': 'e',
    'ɇ': 'e',
    'ẽ': 'e',
    'ḛ': 'e',
    'ꝫ': 'et',
    'ḟ': 'f',
    'ƒ': 'f',
    'ᵮ': 'f',
    'ᶂ': 'f',
    'ǵ': 'g',
    'ğ': 'g',
    'ǧ': 'g',
    'ģ': 'g',
    'ĝ': 'g',
    'ġ': 'g',
    'ɠ': 'g',
    'ḡ': 'g',
    'ᶃ': 'g',
    'ǥ': 'g',
    'ḫ': 'h',
    'ȟ': 'h',
    'ḩ': 'h',
    'ĥ': 'h',
    'ⱨ': 'h',
    'ḧ': 'h',
    'ḣ': 'h',
    'ḥ': 'h',
    'ɦ': 'h',
    'ẖ': 'h',
    'ħ': 'h',
    'ƕ': 'hv',
    'í': 'i',
    'ĭ': 'i',
    'ǐ': 'i',
    'î': 'i',
    'ï': 'i',
    'ḯ': 'i',
    'ị': 'i',
    'ȉ': 'i',
    'ì': 'i',
    'ỉ': 'i',
    'ȋ': 'i',
    'ī': 'i',
    'į': 'i',
    'ᶖ': 'i',
    'ɨ': 'i',
    'ĩ': 'i',
    'ḭ': 'i',
    'ꝺ': 'd',
    'ꝼ': 'f',
    'ᵹ': 'g',
    'ꞃ': 'r',
    'ꞅ': 's',
    'ꞇ': 't',
    'ꝭ': 'is',
    'ǰ': 'j',
    'ĵ': 'j',
    'ʝ': 'j',
    'ɉ': 'j',
    'ḱ': 'k',
    'ǩ': 'k',
    'ķ': 'k',
    'ⱪ': 'k',
    'ꝃ': 'k',
    'ḳ': 'k',
    'ƙ': 'k',
    'ḵ': 'k',
    'ᶄ': 'k',
    'ꝁ': 'k',
    'ꝅ': 'k',
    'ĺ': 'l',
    'ƚ': 'l',
    'ɬ': 'l',
    'ľ': 'l',
    'ļ': 'l',
    'ḽ': 'l',
    'ȴ': 'l',
    'ḷ': 'l',
    'ḹ': 'l',
    'ⱡ': 'l',
    'ꝉ': 'l',
    'ḻ': 'l',
    'ŀ': 'l',
    'ɫ': 'l',
    'ᶅ': 'l',
    'ɭ': 'l',
    'ł': 'l',
    'ǉ': 'lj',
    'ſ': 's',
    'ẜ': 's',
    'ẛ': 's',
    'ẝ': 's',
    'ḿ': 'm',
    'ṁ': 'm',
    'ṃ': 'm',
    'ɱ': 'm',
    'ᵯ': 'm',
    'ᶆ': 'm',
    'ń': 'n',
    'ň': 'n',
    'ņ': 'n',
    'ṋ': 'n',
    'ȵ': 'n',
    'ṅ': 'n',
    'ṇ': 'n',
    'ǹ': 'n',
    'ɲ': 'n',
    'ṉ': 'n',
    'ƞ': 'n',
    'ᵰ': 'n',
    'ᶇ': 'n',
    'ɳ': 'n',
    'ñ': 'n',
    'ǌ': 'nj',
    'ó': 'o',
    'ŏ': 'o',
    'ǒ': 'o',
    'ô': 'o',
    'ố': 'o',
    'ộ': 'o',
    'ồ': 'o',
    'ổ': 'o',
    'ỗ': 'o',
    'ö': 'o',
    'ȫ': 'o',
    'ȯ': 'o',
    'ȱ': 'o',
    'ọ': 'o',
    'ő': 'o',
    'ȍ': 'o',
    'ò': 'o',
    'ỏ': 'o',
    'ơ': 'o',
    'ớ': 'o',
    'ợ': 'o',
    'ờ': 'o',
    'ở': 'o',
    'ỡ': 'o',
    'ȏ': 'o',
    'ꝋ': 'o',
    'ꝍ': 'o',
    'ⱺ': 'o',
    'ō': 'o',
    'ṓ': 'o',
    'ṑ': 'o',
    'ǫ': 'o',
    'ǭ': 'o',
    'ø': 'o',
    'ǿ': 'o',
    'õ': 'o',
    'ṍ': 'o',
    'ṏ': 'o',
    'ȭ': 'o',
    'ƣ': 'oi',
    'ꝏ': 'oo',
    'ɛ': 'e',
    'ᶓ': 'e',
    'ɔ': 'o',
    'ᶗ': 'o',
    'ȣ': 'ou',
    'ṕ': 'p',
    'ṗ': 'p',
    'ꝓ': 'p',
    'ƥ': 'p',
    'ᵱ': 'p',
    'ᶈ': 'p',
    'ꝕ': 'p',
    'ᵽ': 'p',
    'ꝑ': 'p',
    'ꝙ': 'q',
    'ʠ': 'q',
    'ɋ': 'q',
    'ꝗ': 'q',
    'ŕ': 'r',
    'ř': 'r',
    'ŗ': 'r',
    'ṙ': 'r',
    'ṛ': 'r',
    'ṝ': 'r',
    'ȑ': 'r',
    'ɾ': 'r',
    'ᵳ': 'r',
    'ȓ': 'r',
    'ṟ': 'r',
    'ɼ': 'r',
    'ᵲ': 'r',
    'ᶉ': 'r',
    'ɍ': 'r',
    'ɽ': 'r',
    'ↄ': 'c',
    'ꜿ': 'c',
    'ɘ': 'e',
    'ɿ': 'r',
    'ś': 's',
    'ṥ': 's',
    'š': 's',
    'ṧ': 's',
    'ş': 's',
    'ŝ': 's',
    'ș': 's',
    'ṡ': 's',
    'ṣ': 's',
    'ṩ': 's',
    'ʂ': 's',
    'ᵴ': 's',
    'ᶊ': 's',
    'ȿ': 's',
    'ɡ': 'g',
    'ᴑ': 'o',
    'ᴓ': 'o',
    'ᴝ': 'u',
    'ť': 't',
    'ţ': 't',
    'ṱ': 't',
    'ț': 't',
    'ȶ': 't',
    'ẗ': 't',
    'ⱦ': 't',
    'ṫ': 't',
    'ṭ': 't',
    'ƭ': 't',
    'ṯ': 't',
    'ᵵ': 't',
    'ƫ': 't',
    'ʈ': 't',
    'ŧ': 't',
    'ᵺ': 'th',
    'ɐ': 'a',
    'ᴂ': 'ae',
    'ǝ': 'e',
    'ᵷ': 'g',
    'ɥ': 'h',
    'ʮ': 'h',
    'ʯ': 'h',
    'ᴉ': 'i',
    'ʞ': 'k',
    'ꞁ': 'l',
    'ɯ': 'm',
    'ɰ': 'm',
    'ᴔ': 'oe',
    'ɹ': 'r',
    'ɻ': 'r',
    'ɺ': 'r',
    'ⱹ': 'r',
    'ʇ': 't',
    'ʌ': 'v',
    'ʍ': 'w',
    'ʎ': 'y',
    'ꜩ': 'tz',
    'ú': 'u',
    'ŭ': 'u',
    'ǔ': 'u',
    'û': 'u',
    'ṷ': 'u',
    'ü': 'u',
    'ǘ': 'u',
    'ǚ': 'u',
    'ǜ': 'u',
    'ǖ': 'u',
    'ṳ': 'u',
    'ụ': 'u',
    'ű': 'u',
    'ȕ': 'u',
    'ù': 'u',
    'ủ': 'u',
    'ư': 'u',
    'ứ': 'u',
    'ự': 'u',
    'ừ': 'u',
    'ử': 'u',
    'ữ': 'u',
    'ȗ': 'u',
    'ū': 'u',
    'ṻ': 'u',
    'ų': 'u',
    'ᶙ': 'u',
    'ů': 'u',
    'ũ': 'u',
    'ṹ': 'u',
    'ṵ': 'u',
    'ᵫ': 'ue',
    'ꝸ': 'um',
    'ⱴ': 'v',
    'ꝟ': 'v',
    'ṿ': 'v',
    'ʋ': 'v',
    'ᶌ': 'v',
    'ⱱ': 'v',
    'ṽ': 'v',
    'ꝡ': 'vy',
    'ẃ': 'w',
    'ŵ': 'w',
    'ẅ': 'w',
    'ẇ': 'w',
    'ẉ': 'w',
    'ẁ': 'w',
    'ⱳ': 'w',
    'ẘ': 'w',
    'ẍ': 'x',
    'ẋ': 'x',
    'ᶍ': 'x',
    'ý': 'y',
    'ŷ': 'y',
    'ÿ': 'y',
    'ẏ': 'y',
    'ỵ': 'y',
    'ỳ': 'y',
    'ƴ': 'y',
    'ỷ': 'y',
    'ỿ': 'y',
    'ȳ': 'y',
    'ẙ': 'y',
    'ɏ': 'y',
    'ỹ': 'y',
    'ź': 'z',
    'ž': 'z',
    'ẑ': 'z',
    'ʑ': 'z',
    'ⱬ': 'z',
    'ż': 'z',
    'ẓ': 'z',
    'ȥ': 'z',
    'ẕ': 'z',
    'ᵶ': 'z',
    'ᶎ': 'z',
    'ʐ': 'z',
    'ƶ': 'z',
    'ɀ': 'z',
    'ﬀ': 'ff',
    'ﬃ': 'ffi',
    'ﬄ': 'ffl',
    'ﬁ': 'fi',
    'ﬂ': 'fl',
    'ĳ': 'ij',
    'œ': 'oe',
    'ﬆ': 'st',
    'ₐ': 'a',
    'ₑ': 'e',
    'ᵢ': 'i',
    'ⱼ': 'j',
    'ₒ': 'o',
    'ᵣ': 'r',
    'ᵤ': 'u',
    'ᵥ': 'v',
    'ₓ': 'x'
};

var TypeaheadMatch = (function () {
    function TypeaheadMatch(item, value, header) {
        if (value === void 0) { value = item; }
        if (header === void 0) { header = false; }
        this.item = item;
        this.value = value;
        this.header = header;
    }
    TypeaheadMatch.prototype.isHeader = function () {
        return this.header;
    };
    TypeaheadMatch.prototype.toString = function () {
        return this.value;
    };
    return TypeaheadMatch;
}());

function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}

/* tslint:disable */
function tokenize(str, wordRegexDelimiters, phraseRegexDelimiters) {
    if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
    if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
    /* tslint:enable */
    var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
    var preTokenized = str.split(new RegExp(regexStr, 'g'));
    var result = [];
    var preTokenizedLength = preTokenized.length;
    var token;
    var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
    for (var i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        var functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    var properties = option.replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    var propertiesArray = properties.split('.');
    for (var _i = 0, propertiesArray_1 = propertiesArray; _i < propertiesArray_1.length; _i++) {
        var property = propertiesArray_1[_i];
        if (property in object) {
            object = object[property];
        }
    }
    if (!object)
        return "";
    return object.toString();
}

var TypeaheadContainerComponent = (function () {
    function TypeaheadContainerComponent(element) {
        this.isFocused = false;
        this._matches = [];
        this.element = element;
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "isBs4", {
        get: function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
                if (this._active.isHeader()) {
                    this.nextActiveMatch();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "optionsListTemplate", {
        get: function () {
            return this.parent ? this.parent.optionsListTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
        get: function () {
            return this.parent ? this.parent.typeaheadItemTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadContainerComponent.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    TypeaheadContainerComponent.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0
            ? this.matches.length - 1
            : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1
            ? 0
            : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.selectActive = function (value) {
        this.isFocused = true;
        this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function (match, query) {
        var itemStr = match.value;
        var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        var startIdx;
        var tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    };
    TypeaheadContainerComponent.prototype.focusLost = function () {
        this.isFocused = false;
    };
    TypeaheadContainerComponent.prototype.isActive = function (value) {
        return this._active === value;
    };
    TypeaheadContainerComponent.prototype.selectMatch = function (value, e) {
        var _this = this;
        if (e === void 0) { e = void 0; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(function () {
            return _this.parent.typeaheadOnSelect.emit(value);
        }, 0);
        return false;
    };
    TypeaheadContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'typeahead-container',
                    // tslint:disable-next-line
                    template: "\n<!-- inject options list template -->\n<template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\"\n  [ngOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></template>\n\n<!-- default options item template -->\n<template #bsItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span></template>\n\n<!-- Bootstrap 3 options list template -->\n<template #bs3Template>\n<ul class=\"dropdown-menu\">\n  <template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n    <li *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{match}}</li>\n    <li *ngIf=\"!match.isHeader()\" [class.active]=\"isActive(match)\" (mouseenter)=\"selectActive(match)\">\n      <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\">\n        <template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\" \n          [ngOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></template>\n      </a>\n    </li>\n  </template>\n</ul>\n</template>\n\n<!-- Bootstrap 4 options list template -->\n<template #bs4Template >\n<template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n   <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{match}}</h6>\n   <template [ngIf]=\"!match.isHeader()\">\n      <button\n        class=\"dropdown-item\"\n        (click)=\"selectMatch(match, $event)\"\n        (mouseenter)=\"selectActive(match)\"\n        [class.active]=\"isActive(match)\">\n          <template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\" \n            [ngOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></template>\n      </button>\n  </template>\n</template>\n</template>\n",
                    // tslint:disable
                    host: {
                        'class': 'dropdown open',
                        '[class.dropdown-menu]': 'isBs4',
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;'
                    },
                    // tslint: enable
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    TypeaheadContainerComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    TypeaheadContainerComponent.propDecorators = {
        'focusLost': [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] },],
    };
    return TypeaheadContainerComponent;
}());

var TypeaheadDirective = (function () {
    function TypeaheadDirective(control, viewContainerRef, element, renderer, cis) {
        /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
        this.typeaheadMinLength = void 0;
        /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
        this.typeaheadAsync = void 0;
        /** match latin symbols. If true the word súper would match super and vice versa. */
        this.typeaheadLatinize = true;
        /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
        this.typeaheadPhraseDelimiters = '\'"';
        /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
        this.typeaheadLoading = new EventEmitter();
        /** fired on every key event and returns true in case of matches are not detected */
        this.typeaheadNoResults = new EventEmitter();
        /** fired when option was selected, return object with data of this option */
        this.typeaheadOnSelect = new EventEmitter();
        /** fired when blur event occurres. returns the active item */
        this.typeaheadOnBlur = new EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
        this.isTypeaheadOptionsListActive = false;
        this.keyUpEventEmitter = new EventEmitter();
        this.placement = 'bottom-left';
        this._subscriptions = [];
        this.element = element;
        this.ngControl = control;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this._typeahead = cis
            .createLoader(element, viewContainerRef, renderer);
    }
    TypeaheadDirective.prototype.onChange = function (e) {
        if (this._container) {
            // esc
            if (e.keyCode === 27) {
                this.hide();
                return;
            }
            // up
            if (e.keyCode === 38) {
                this._container.prevActiveMatch();
                return;
            }
            // down
            if (e.keyCode === 40) {
                this._container.nextActiveMatch();
                return;
            }
            // enter
            if (e.keyCode === 13) {
                this._container.selectActiveMatch();
                return;
            }
        }
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`), use either
        // `textContent` or `innerText` (depending on which one is supported, i.e.
        // Firefox or IE).
        var value = e.target.value !== undefined
            ? e.target.value
            : e.target.textContent !== undefined
                ? e.target.textContent
                : e.target.innerText;
        if (value != null && value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    };
    TypeaheadDirective.prototype.onFocus = function () {
        if (this.typeaheadMinLength === 0) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit('');
        }
    };
    TypeaheadDirective.prototype.onBlur = function () {
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
            this.hide();
        }
    };
    TypeaheadDirective.prototype.onKeydown = function (e) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        // if items is visible - prevent form submition
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
    };
    TypeaheadDirective.prototype.ngOnInit = function () {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength = this.typeaheadMinLength === void 0
            ? 1
            : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable$1)) {
            this.typeaheadAsync = false;
        }
        if (this.typeahead instanceof Observable$1) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
    };
    TypeaheadDirective.prototype.changeModel = function (match) {
        var valueStr = match.value;
        this.ngControl.viewToModelUpdate(valueStr);
        this.ngControl.control.setValue(valueStr);
        this.hide();
    };
    Object.defineProperty(TypeaheadDirective.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadDirective.prototype.show = function () {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            .to(this.container)
            .position({ attachment: (this.dropup ? 'top' : 'bottom') + " left" })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false,
            dropup: this.dropup
        });
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        var normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value).toString()
            .toLowerCase();
        this._container.query = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
    };
    TypeaheadDirective.prototype.hide = function () {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._container = null;
        }
    };
    TypeaheadDirective.prototype.ngOnDestroy = function () {
        // clean up subscriptions
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
        this._typeahead.dispose();
    };
    TypeaheadDirective.prototype.asyncActions = function () {
        var _this = this;
        this._subscriptions.push(this.keyUpEventEmitter
            .debounceTime(this.typeaheadWaitMs)
            .mergeMap(function () { return _this.typeahead; })
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }, function (err) {
            console.error(err);
        }));
    };
    TypeaheadDirective.prototype.syncActions = function () {
        var _this = this;
        this._subscriptions.push(this.keyUpEventEmitter
            .debounceTime(this.typeaheadWaitMs)
            .mergeMap(function (value) {
            var normalizedQuery = _this.normalizeQuery(value);
            return Observable$1.from(_this.typeahead)
                .filter(function (option) {
                return option && _this.testMatch(_this.normalizeOption(option), normalizedQuery);
            })
                .toArray();
        })
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }, function (err) {
            console.error(err);
        }));
    };
    TypeaheadDirective.prototype.normalizeOption = function (option) {
        var optionValue = getValueFromObject(option, this.typeaheadOptionField);
        var normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    };
    TypeaheadDirective.prototype.normalizeQuery = function (value) {
        // If singleWords, break model here to not be doing extra work on each
        // iteration
        var normalizedQuery = (this.typeaheadLatinize ? latinize(value) : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        return normalizedQuery;
    };
    TypeaheadDirective.prototype.testMatch = function (match, test) {
        var spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (var i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        else {
            return match.indexOf(test) >= 0;
        }
    };
    TypeaheadDirective.prototype.finalizeAsyncCall = function (matches) {
        this.prepareMatches(matches);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (this._container) {
            // This improves the speed as it won't have to be done for each list item
            var normalizedQuery = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value).toString()
                .toLowerCase();
            this._container.query = this.typeaheadSingleWords
                ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                : normalizedQuery;
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    };
    TypeaheadDirective.prototype.prepareMatches = function (options) {
        var _this = this;
        var limited = options.slice(0, this.typeaheadOptionsLimit);
        if (this.typeaheadGroupField) {
            var matches_1 = [];
            // extract all group names
            var groups = limited
                .map(function (option) { return getValueFromObject(option, _this.typeaheadGroupField); })
                .filter(function (v, i, a) { return a.indexOf(v) === i; });
            groups.forEach(function (group) {
                // add group header to array of matches
                matches_1.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches_1 = matches_1.concat(limited
                    .filter(function (option) { return getValueFromObject(option, _this.typeaheadGroupField) === group; })
                    .map(function (option) { return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField)); }));
            });
            this._matches = matches_1;
        }
        else {
            this._matches = limited.map(function (option) { return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField)); });
        }
    };
    TypeaheadDirective.prototype.hasMatches = function () {
        return this._matches.length > 0;
    };
    TypeaheadDirective.decorators = [
        { type: Directive, args: [{ selector: '[typeahead]', exportAs: 'bs-typeahead' },] },
    ];
    /** @nocollapse */
    TypeaheadDirective.ctorParameters = function () { return [
        { type: NgControl, },
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: ComponentLoaderFactory, },
    ]; };
    TypeaheadDirective.propDecorators = {
        'typeahead': [{ type: Input },],
        'typeaheadMinLength': [{ type: Input },],
        'typeaheadWaitMs': [{ type: Input },],
        'typeaheadOptionsLimit': [{ type: Input },],
        'typeaheadOptionField': [{ type: Input },],
        'typeaheadGroupField': [{ type: Input },],
        'typeaheadAsync': [{ type: Input },],
        'typeaheadLatinize': [{ type: Input },],
        'typeaheadSingleWords': [{ type: Input },],
        'typeaheadWordDelimiters': [{ type: Input },],
        'typeaheadPhraseDelimiters': [{ type: Input },],
        'typeaheadItemTemplate': [{ type: Input },],
        'optionsListTemplate': [{ type: Input },],
        'typeaheadLoading': [{ type: Output },],
        'typeaheadNoResults': [{ type: Output },],
        'typeaheadOnSelect': [{ type: Output },],
        'typeaheadOnBlur': [{ type: Output },],
        'container': [{ type: Input },],
        'dropup': [{ type: Input },],
        'onChange': [{ type: HostListener, args: ['keyup', ['$event'],] },],
        'onFocus': [{ type: HostListener, args: ['focus',] },],
        'onBlur': [{ type: HostListener, args: ['blur',] },],
        'onKeydown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return TypeaheadDirective;
}());

var TypeaheadModule = (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule.forRoot = function () {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    };
    
    TypeaheadModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                    exports: [TypeaheadContainerComponent, TypeaheadDirective],
                    entryComponents: [TypeaheadContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TypeaheadModule.ctorParameters = function () { return []; };
    return TypeaheadModule;
}());

class FacetSelect {
    /**
     * @param {?} facet
     */
    constructor(facet) {
        this.facet = facet;
    }
}
class FacetDeselect {
    /**
     * @param {?} facet
     */
    constructor(facet) {
        this.facet = facet;
    }
}
class FacetDeselectAll {
    constructor() { }
}

class FacetContainerComponent {
    constructor() {
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    selectFacet(facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    deselectFacet(facet) {
        // find the index of the item in the selected array
        let /** @type {?} */ idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);
        // if match there was no match then finish
        if (idx === -1) {
            return;
        }
        // remove the last item
        this.facets.splice(idx, 1);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselect(facet));
    }
    /**
     * @return {?}
     */
    deselectAllFacets() {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-container',
                template: `
      <!-- Display Any Selected Facets -->
      <div class="facets-selected-container">

          <!-- Display Title an Clear Button -->
          <div class="facets-selected-header-container">

              <!-- Show The Selected Text -->
              <span class="facets-selected-header-label">{{ header }}</span>

              <!-- Add a Clear Button -->
              <div class="facets-selected-clear-button" tabindex="0" [tooltip]="clearTooltip" placement="left" container="body" (click)="deselectAllFacets()"
                  (keyup.enter)="deselectAllFacets()" *ngIf="facets.length > 0">

                  <svg class="facets-selected-clear-graphic" viewBox="0 0 19 12" shape-rendering="geometricPrecision">
                      <rect class="light-grey" x="0" y="2" width="7" height="2"></rect>
                      <rect class="dark-grey" x="0" y="5" width="9" height="2"></rect>
                      <rect class="light-grey" x="0" y="8" width="7" height="2"></rect>
                      <path class="dark-grey" d="M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z"></path>
                      <path class="dark-grey" d="M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z"></path>
                  </svg>
              </div>

          </div>

          <!-- Display Tags For Selected Items -->
          <div class="facets-selected-list">

              <!-- Show Selected Tags -->
              <div class="facet-selected-tag" tabindex="0" *ngFor="let facet of facets" (mousedown)="$event.preventDefault()" (click)="deselectFacet(facet)" (keyup.enter)="deselectFacet(facet)">

                  <!-- Display Label -->
                  <span class="facet-selected-tag-label">{{ facet.title }}</span>

                  <!-- Display Remove Icon -->
                  <span class="hpe-icon hpe-close"></span>
              </div>

          </div>

          <!-- Show Message Here if No Facets Selected -->
          <p class="facets-selected-none-label" *ngIf="emptyText && facets.length === 0">{{ emptyText }}</p>

      </div>

      <!-- Any Facet Elements Should be Added Here By User -->
      <div class="facets-region">
          <ng-content></ng-content>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
FacetContainerComponent.ctorParameters = () => [];
FacetContainerComponent.propDecorators = {
    'header': [{ type: Input },],
    'clearTooltip': [{ type: Input },],
    'emptyText': [{ type: Input },],
    'facets': [{ type: Input },],
    'facetsChange': [{ type: Output },],
    'events': [{ type: Output },],
};

class FacetBaseComponent {
    /**
     * @param {?} facetContainer
     * @param {?} _elementRef
     */
    constructor(facetContainer, _elementRef) {
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        this.events = new Subject$1();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.filter(event => event instanceof FacetDeselect)
                .filter((event) => !!this.selected.find(facet => facet === event.facet))
                .subscribe((event) => this.deselectFacet(event.facet));
            // subscribe to any deselect all events from facet container
            facetContainer.events.filter(event => event instanceof FacetDeselectAll).subscribe(_ => this.deselectAll());
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(facet => this.facetContainer.selectFacet(facet));
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    selectFacet(facet) {
        // if the facet is disabled it should not be selected
        if (facet.disabled) {
            return;
        }
        // add the facet to the list of selected facets
        this.selected.push(facet);
        // send the new value to the event emitter
        this.selectedChange.emit(this.selected);
        // fire the event to the observable
        this.triggerEvent(new FacetSelect(facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    deselectFacet(facet) {
        // find facet to remove
        let /** @type {?} */ index = this.selected.findIndex(selectedFacet => selectedFacet === facet);
        // only continue if facet is found
        if (index !== -1) {
            // remove the facet from the selected list
            this.selected.splice(index, 1);
            // emit the changes to selected event emitter
            this.selectedChange.emit(this.selected);
            // fire the event to the observable
            this.triggerEvent(new FacetDeselect(facet));
            // deselect the facet in the facet container
            if (this.facetContainer) {
                this.facetContainer.deselectFacet(facet);
            }
        }
    }
    /**
     * @return {?}
     */
    deselectAll() {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    toggleFacetSelection(facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    isFacetSelected(facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(selectedFacet => selectedFacet === facet);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetBaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-base',
                template: '',
            },] },
];
/**
 * @nocollapse
 */
FacetBaseComponent.ctorParameters = () => [
    { type: FacetContainerComponent, decorators: [{ type: Host },] },
    { type: ElementRef, },
];
FacetBaseComponent.propDecorators = {
    'selected': [{ type: Input },],
    'selectedChange': [{ type: Output },],
    'events': [{ type: Output },],
};

class FacetHeaderComponent {
    constructor() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}
FacetHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-header',
                template: `
      <span class="facet-header-title">{{ header }}</span>
      <span class="hpe-icon" [class.hpe-down]="expanded" [class.hpe-previous]="!expanded" *ngIf="canExpand"></span>
    `,
                host: {
                    'tabindex': '0',
                    '(click)': 'toggleExpand()',
                    '(keyup.enter)': 'toggleExpand()'
                }
            },] },
];
/**
 * @nocollapse
 */
FacetHeaderComponent.ctorParameters = () => [];
FacetHeaderComponent.propDecorators = {
    'header': [{ type: Input },],
    'canExpand': [{ type: Input },],
    'expanded': [{ type: Input },],
    'expandedChange': [{ type: Output },],
};

class FacetCheckListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.facets = [];
        this.scrollbar = true;
        this.expanded = true;
    }
}
FacetCheckListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list',
                template: `
      <ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

      <!-- Create a container which will show when section is expanded -->
      <div class="facet-check-list-container" [class.facet-check-list-scrollbar]="scrollbar" *ngIf="expanded">

          <!-- Iterate through each possible facet -->
          <div class="facet-check-list-item" *ngFor="let facet of facets" [class.facet-active]="isFacetSelected(facet)" tabindex="0"
              (click)="toggleFacetSelection(facet)" (keyup.enter)="toggleFacetSelection(facet)" [class.disabled]="facet.disabled">

              <!-- Show check icon to indicate the state -->
              <span class="facet-check-list-item-check">
                  <span class="hpe-icon hpe-active"></span>
              </span>

              <!-- Display the title -->
              <span class="facet-check-list-item-title">{{ facet.title }}</span>

              <!-- Display the count if specified -->
              <span class="facet-check-list-item-count" *ngIf="facet.count !== undefined">({{ facet.count }})</span>
          </div>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
FacetCheckListComponent.ctorParameters = () => [];
FacetCheckListComponent.propDecorators = {
    'facets': [{ type: Input },],
    'header': [{ type: Input },],
    'scrollbar': [{ type: Input },],
    'expanded': [{ type: Input },],
};

class FacetTypeaheadListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.expanded = true;
        this.typeaheadConfig = {};
        this.suggestions = [];
        this.simplified = true;
        this._nativeElement = (this._elementRef.nativeElement);
        this._defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable$1) {
            // handle an observable of data
            this.typeaheadOptions = Observable$1.from(this.facets).map((facets) => {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            });
        }
        else {
            // handle an array of data
            this.typeaheadOptions = Observable$1.of(this.facets).map((facets) => {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(facet => !facet.disabled)
                    .filter(facet => !this.selected.find(selectedFacet => selectedFacet === facet))
                    .filter(facet => facet.title.toUpperCase().includes(this.searchQuery.toUpperCase()));
            });
        }
        // provide default values for typeahead config
        for (let /** @type {?} */ prop in this._defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(facet => facet === typeaheadOption.item)) {
            return;
        }
        // select the facet
        this.selectFacet(typeaheadOption.item);
        // clear the typeahead
        this.searchQuery = '';
    }
    /**
     * @return {?}
     */
    scrollToFocused() {
        let /** @type {?} */ dropdown = this._nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(() => {
            // find the currently active element if there is one
            let /** @type {?} */ activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                let /** @type {?} */ elementBounds = activeElement.getBoundingClientRect();
                let /** @type {?} */ dropdownBounds = dropdown.getBoundingClientRect();
                if (elementBounds.top < dropdownBounds.top) {
                    dropdown.scrollTop += elementBounds.top - dropdownBounds.top;
                }
                if (elementBounds.bottom > dropdownBounds.bottom) {
                    dropdown.scrollTop += elementBounds.bottom - dropdownBounds.bottom;
                }
            }
        });
    }
}
FacetTypeaheadListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list',
                template: `
      <ux-facet-header [header]="header" [(expanded)]="expanded"></ux-facet-header>

      <div class="facet-typeahead-list-container" *ngIf="expanded">

          <div class="facet-typeahead-list-selected-container" *ngIf="suggestions?.length > 0">

              <div class="facet-typeahead-list-selected-option" tabindex="0" *ngFor="let facet of suggestions" (click)="toggleFacetSelection(facet)"
                  (keyup.enter)="toggleFacetSelection(facet)">

                  <ux-checkbox [clickable]="false" [value]="isFacetSelected(facet)" [simplified]="simplified">
                      <span class="facet-typeahead-list-selected-option-title">{{ facet.title }}</span>
                      <span class="facet-typeahead-list-selected-option-count">({{ facet.count }})</span>
                  </ux-checkbox>

              </div>

          </div>

          <div class="facet-typeahead-list-control">

              <!-- Create Typeahead Control -->
              <input type="text" class="form-control" [placeholder]="typeaheadConfig?.placeholder" [typeahead]="typeaheadOptions" [(ngModel)]="searchQuery"
                  [typeaheadMinLength]="typeaheadConfig?.minCharacters" [typeaheadOptionsLimit]="typeaheadConfig?.maxResults" [typeaheadWaitMs]="typeaheadConfig?.delay"
                  (typeaheadOnSelect)="selectOption($event)" [typeaheadItemTemplate]="facetOptionTemplate" (keyup.ArrowUp)="scrollToFocused()" (keyup.ArrowDown)="scrollToFocused()">

          </div>

      </div>

      <ng-template #facetOptionTemplate let-model="item" let-index="index">
          <p class="facet-typeahead-list-option"><span [innerHTML]="model.title | facetTypeaheadHighlight: searchQuery"></span> <span class="facet-typeahead-list-option-count"
                  *ngIf="model.count">({{ model.count }})</span></p>
      </ng-template>
    `
            },] },
];
/**
 * @nocollapse
 */
FacetTypeaheadListComponent.ctorParameters = () => [];
FacetTypeaheadListComponent.propDecorators = {
    'facets': [{ type: Input },],
    'header': [{ type: Input },],
    'expanded': [{ type: Input },],
    'typeaheadConfig': [{ type: Input },],
    'suggestions': [{ type: Input },],
    'simplified': [{ type: Input },],
};
class FacetTypeaheadHighlight {
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    transform(value, searchQuery) {
        let /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="facet-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}
FacetTypeaheadHighlight.decorators = [
    { type: Pipe, args: [{
                name: 'facetTypeaheadHighlight'
            },] },
];
/**
 * @nocollapse
 */
FacetTypeaheadHighlight.ctorParameters = () => [];

const DECLARATIONS$1 = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];
class FacetsModule {
}
FacetsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    CheckboxModule,
                    TooltipModule.forRoot(),
                    TypeaheadModule.forRoot()
                ],
                exports: DECLARATIONS$1,
                declarations: DECLARATIONS$1
            },] },
];
/**
 * @nocollapse
 */
FacetsModule.ctorParameters = () => [];

class Facet {
    /**
     * @param {?} title
     * @param {?=} data
     * @param {?=} count
     * @param {?=} disabled
     * @param {?=} id
     */
    constructor(title, data = {}, count, disabled = false, id) {
        this.title = title;
        this.data = data;
        this.count = count;
        this.disabled = disabled;
        this.id = id;
    }
}

/** Default dropdown configuration */
var BsDropdownConfig = (function () {
    function BsDropdownConfig() {
        /** default dropdown auto closing behavior */
        this.autoClose = true;
    }
    BsDropdownConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BsDropdownConfig.ctorParameters = function () { return []; };
    return BsDropdownConfig;
}());

var BsDropdownState = (function () {
    function BsDropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new EventEmitter();
        this.isDisabledChange = new EventEmitter();
        this.toggleClick = new EventEmitter();
        this.dropdownMenu = new Promise(function (resolve) {
            _this.resolveDropdownMenu = resolve;
        });
    }
    BsDropdownState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BsDropdownState.ctorParameters = function () { return []; };
    return BsDropdownState;
}());

var BsDropdownContainerComponent = (function () {
    function BsDropdownContainerComponent(_state, cd, _renderer, _element) {
        var _this = this;
        this._state = _state;
        this.cd = cd;
        this._renderer = _renderer;
        this.isOpen = false;
        this._subscription = _state.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
            var dropdown = _element.nativeElement.querySelector('.dropdown-menu');
            if (dropdown) {
                _this._renderer.setElementClass(dropdown, 'show', true);
                if (dropdown.classList.contains('dropdown-menu-right')) {
                    _this._renderer.setElementStyle(dropdown, 'left', 'auto');
                    _this._renderer.setElementStyle(dropdown, 'right', '0');
                }
                if (_this.direction === 'up') {
                    _this._renderer.setElementStyle(dropdown, 'top', 'auto');
                    _this._renderer.setElementStyle(dropdown, 'transform', 'translateY(-101%)');
                }
            }
            _this.cd.markForCheck();
            _this.cd.detectChanges();
        });
    }
    Object.defineProperty(BsDropdownContainerComponent.prototype, "direction", {
        get: function () {
            return this._state.direction;
        },
        enumerable: true,
        configurable: true
    });
    BsDropdownContainerComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    BsDropdownContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-dropdown-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        style: 'display:block;position: absolute;'
                    },
                    template: "\n    <div [class.dropup]=\"direction === 'up'\"\n         [class.dropdown]=\"direction === 'down'\"\n         [class.show]=\"isOpen\"\n         [class.open]=\"isOpen\"><ng-content></ng-content></div>\n  "
                },] },
    ];
    /** @nocollapse */
    BsDropdownContainerComponent.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ChangeDetectorRef, },
        { type: Renderer, },
        { type: ElementRef, },
    ]; };
    return BsDropdownContainerComponent;
}());

var BsDropdownDirective = (function () {
    function BsDropdownDirective(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        // todo: move to component loader
        this._isInlineOpen = false;
        this._subscriptions = [];
        this._isInited = false;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
    }
    Object.defineProperty(BsDropdownDirective.prototype, "autoClose", {
        get: function () {
            return this._state.autoClose;
        },
        /**
         * Indicates that dropdown will be closed on item or document click,
         * and after pressing ESC
         */
        set: function (value) {
            if (typeof value === 'boolean') {
                this._state.autoClose = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(BsDropdownDirective.prototype, "isDisabled", {
        get: function () { return this._isDisabled; },
        /**
         * Disables dropdown toggle and hides dropdown menu if opened
         */
        set: function (value) {
            this._isDisabled = value;
            this._state.isDisabledChange.emit(value);
            if (value) {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the popover is currently being shown
         */
        get: function () {
            if (this._showInline) {
                return this._isInlineOpen;
            }
            return this._dropdown.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isBs4", {
        get: function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "_showInline", {
        get: function () {
            return !this.container;
        },
        enumerable: true,
        configurable: true
    });
    
    BsDropdownDirective.prototype.ngOnInit = function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        // attach DOM listeners
        this._dropdown.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state
            .toggleClick.subscribe(function (value) { return _this.toggle(value); }));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state
            .isDisabledChange
            .filter(function (value) { return value === true; })
            .subscribe(function (value) { return _this.hide(); }));
    };
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    BsDropdownDirective.prototype.show = function () {
        var _this = this;
        if (this.isOpen || this.isDisabled) {
            return;
        }
        if (this._showInline) {
            if (!this._inlinedMenu) {
                this._state.dropdownMenu
                    .then(function (dropdownMenu) {
                    _this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
                    _this._inlinedMenu = _this._dropdown._inlineViewRef;
                    _this.addBs4Polyfills();
                });
            }
            this.addBs4Polyfills();
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu
            .then(function (dropdownMenu) {
            // check direction in which dropdown should be opened
            var _dropup = _this.dropup === true ||
                (typeof _this.dropup !== 'undefined' && _this.dropup !== false);
            _this._state.direction = _dropup ? 'up' : 'down';
            var _placement = _this.placement ||
                (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            _this._dropdown
                .attach(BsDropdownContainerComponent)
                .to(_this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement
            });
            _this._state.isOpenChange.emit(true);
        });
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    BsDropdownDirective.prototype.hide = function () {
        if (!this.isOpen) {
            return;
        }
        if (this._showInline) {
            this.removeShowClass();
            this._isInlineOpen = false;
            this.onHidden.emit(true);
        }
        else {
            this._dropdown.hide();
        }
        this._state.isOpenChange.emit(false);
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    BsDropdownDirective.prototype.toggle = function (value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    };
    BsDropdownDirective.prototype.ngOnDestroy = function () {
        // clean up subscriptions and destroy dropdown
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    };
    BsDropdownDirective.prototype.addBs4Polyfills = function () {
        if (!isBs3()) {
            this.addShowClass();
            this.checkRightAlignment();
            this.checkDropup();
        }
    };
    BsDropdownDirective.prototype.addShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.setElementClass(this._inlinedMenu.rootNodes[0], 'show', true);
        }
    };
    BsDropdownDirective.prototype.removeShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.setElementClass(this._inlinedMenu.rootNodes[0], 'show', false);
        }
    };
    BsDropdownDirective.prototype.checkRightAlignment = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            var isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-right');
            this._renderer.setElementStyle(this._inlinedMenu.rootNodes[0], 'left', isRightAligned ? 'auto' : '0');
            this._renderer.setElementStyle(this._inlinedMenu.rootNodes[0], 'right', isRightAligned ? '0' : 'auto');
        }
    };
    BsDropdownDirective.prototype.checkDropup = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            // a little hack to not break support of bootstrap 4 beta
            var top_1 = getComputedStyle(this._inlinedMenu.rootNodes[0])['top'];
            var topAuto = top_1 === 'auto' || top_1 === '100%';
            this._renderer.setElementStyle(this._inlinedMenu.rootNodes[0], 'top', this.dropup ? 'auto' : '100%');
            this._renderer.setElementStyle(this._inlinedMenu.rootNodes[0], 'transform', this.dropup && !topAuto ? 'translateY(-101%)' : 'translateY(0)');
        }
    };
    BsDropdownDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdown],[dropdown]',
                    exportAs: 'bs-dropdown',
                    providers: [BsDropdownState],
                    host: {
                        '[class.dropup]': 'dropup',
                        '[class.open]': 'isOpen',
                        '[class.show]': 'isOpen && isBs4'
                    }
                },] },
    ];
    /** @nocollapse */
    BsDropdownDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
        { type: ViewContainerRef, },
        { type: ComponentLoaderFactory, },
        { type: BsDropdownConfig, },
        { type: BsDropdownState, },
    ]; };
    BsDropdownDirective.propDecorators = {
        'placement': [{ type: Input },],
        'triggers': [{ type: Input },],
        'container': [{ type: Input },],
        'dropup': [{ type: Input },],
        'autoClose': [{ type: Input },],
        'isDisabled': [{ type: Input },],
        'isOpen': [{ type: Input },],
        'isOpenChange': [{ type: Output },],
        'onShown': [{ type: Output },],
        'onHidden': [{ type: Output },],
    };
    return BsDropdownDirective;
}());

var BsDropdownMenuDirective = (function () {
    function BsDropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    BsDropdownMenuDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdownMenu],[dropdownMenu]',
                    exportAs: 'bs-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    BsDropdownMenuDirective.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ViewContainerRef, },
        { type: TemplateRef, },
    ]; };
    return BsDropdownMenuDirective;
}());

var BsDropdownToggleDirective = (function () {
    function BsDropdownToggleDirective(_state, _element) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this.isDisabled = null;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state
            .isOpenChange.subscribe(function (value) { return _this.isOpen = value; }));
        // populate disabled state
        this._subscriptions.push(this._state
            .isDisabledChange
            .subscribe(function (value) { return _this.isDisabled = value || null; }));
    }
    BsDropdownToggleDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit();
    };
    BsDropdownToggleDirective.prototype.onDocumentClick = function (event) {
        if (this._state.autoClose && event.button !== 2 &&
            !this._element.nativeElement.contains(event.target)) {
            this._state.toggleClick.emit(false);
        }
    };
    BsDropdownToggleDirective.prototype.onEsc = function () {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    };
    BsDropdownToggleDirective.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    BsDropdownToggleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[bsDropdownToggle],[dropdownToggle]',
                    exportAs: 'bs-dropdown-toggle',
                    host: {
                        '[attr.aria-haspopup]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    BsDropdownToggleDirective.ctorParameters = function () { return [
        { type: BsDropdownState, },
        { type: ElementRef, },
    ]; };
    BsDropdownToggleDirective.propDecorators = {
        'isDisabled': [{ type: HostBinding, args: ['attr.disabled',] },],
        'isOpen': [{ type: HostBinding, args: ['attr.aria-expanded',] },],
        'onClick': [{ type: HostListener, args: ['click',] },],
        'onDocumentClick': [{ type: HostListener, args: ['document:click', ['$event'],] },],
        'onEsc': [{ type: HostListener, args: ['keyup.esc',] },],
    };
    return BsDropdownToggleDirective;
}());

var BsDropdownModule = (function () {
    function BsDropdownModule() {
    }
    BsDropdownModule.forRoot = function (config) {
        return {
            ngModule: BsDropdownModule, providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDropdownState,
                { provide: BsDropdownConfig, useValue: config ? config : { autoClose: true } }
            ]
        };
    };
    
    BsDropdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownContainerComponent,
                        BsDropdownDirective
                    ],
                    exports: [
                        BsDropdownMenuDirective,
                        BsDropdownToggleDirective,
                        BsDropdownDirective
                    ],
                    entryComponents: [BsDropdownContainerComponent]
                },] },
    ];
    /** @nocollapse */
    BsDropdownModule.ctorParameters = function () { return []; };
    return BsDropdownModule;
}());

class FilterContainerComponent {
    constructor() {
        this.filters = [];
        this.filtersChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    addFilter(filter$$1) {
        this.filters.push(filter$$1);
        this.events.next(new FilterAddEvent(filter$$1));
        this.filtersChange.emit(this.filters);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    removeFilter(filter$$1) {
        let /** @type {?} */ idx = this.filters.findIndex(filters => filters === filter$$1);
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter$$1));
            this.filtersChange.emit(this.filters);
        }
    }
    /**
     * @return {?}
     */
    removeAll() {
        this.events.next(new FilterRemoveAllEvent());
    }
}
FilterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-container',
                template: `
      <ng-content></ng-content>

      <!-- Add a Clear Button -->
      <div class="filter-selected-clear-button" *ngIf="filters.length > 0" [tooltip]="clearTooltip || 'Clear All'" (click)="removeAll()">
    
          <svg class="filter-selected-clear-graphic" width="19" height="12" viewBox="0 0 19 12" shape-rendering="geometricPrecision">
              <rect class="light-grey" x="0" y="2" width="7" height="2"></rect>
              <rect class="dark-grey" x="0" y="5" width="9" height="2"></rect>
              <rect class="light-grey" x="0" y="8" width="7" height="2"></rect>
              <path class="dark-grey" d="M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z"></path>
              <path class="dark-grey" d="M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z"></path>
          </svg>

      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
FilterContainerComponent.ctorParameters = () => [];
FilterContainerComponent.propDecorators = {
    'filters': [{ type: Input },],
    'clearTooltip': [{ type: Input },],
    'filtersChange': [{ type: Output },],
    'events': [{ type: Output },],
};
class FilterAddEvent {
    /**
     * @param {?} filter
     */
    constructor(filter$$1) {
        this.filter = filter$$1;
    }
}
class FilterRemoveEvent {
    /**
     * @param {?} filter
     */
    constructor(filter$$1) {
        this.filter = filter$$1;
    }
}
class FilterRemoveAllEvent {
}

class FilterBaseComponent {
    /**
     * @param {?} filtersContainer
     */
    constructor(filtersContainer) {
        this.filtersContainer = filtersContainer;
        filtersContainer.events.filter(event => event instanceof FilterRemoveAllEvent).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    addFilter(filter$$1) {
        if (!filter$$1.initial) {
            this.filtersContainer.addFilter(filter$$1);
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    removeFilter(filter$$1) {
        if (!filter$$1) {
            return;
        }
        this.filtersContainer.removeFilter(filter$$1);
    }
}
FilterBaseComponent.decorators = [
    { type: Directive, args: [{
                selector: 'ux-filter-base'
            },] },
];
/**
 * @nocollapse
 */
FilterBaseComponent.ctorParameters = () => [
    { type: FilterContainerComponent, decorators: [{ type: Host },] },
];
FilterBaseComponent.propDecorators = {
    'filters': [{ type: Input },],
};

class FilterDynamicComponent extends FilterBaseComponent {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        this.showTypeahead = true;
        this.typeaheadItems = [];
    }
    /**
     * @return {?}
     */
    getItems() {
        return this.filters.filter(item => item !== this.initial).map(item => item.name);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        this.removeFilter();
        let /** @type {?} */ idx = this.filters.findIndex(filter$$1 => filter$$1.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.searchQuery = '';
        this.dropdown.hide();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOff(event) {
        let /** @type {?} */ target = (event.target);
        let /** @type {?} */ hideDropdown = true;
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
    }
    /**
     * @return {?}
     */
    removeFilter() {
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        this.searchQuery = '';
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    }
}
FilterDynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dynamic',
                template: `
      <div class="btn-group ux-dynamic-filter" dropdown #dynamicDropdown="bs-dropdown">
          <button (click)="dynamicDropdown.show()" type="button" [class.active]="selected !== initial" class="filter-dropdown btn dropdown-toggle">{{ selected?.title }} 
              <span class="hpe-icon hpe-down"></span>
          </button>
          <ul *dropdownMenu class="dropdown-menu" role="menu">

              <li class="dropdown-list-item" *ngIf="showTypeahead" role="menuitem">
                  <a class="dropdown-item" (click)="removeFilter(); dynamicDropdown.hide();">
                      <i class="hpe-icon" [class.hpe-checkmark]="initial === selected"></i>
                      <span class="filter-dropdown-title">{{ initial.name }}</span>
                  </a>
              </li>

              <li class="dropdown-list-item" *ngIf="selected !== initial && showTypeahead" role="menuitem">
                  <a class="dropdown-item">
                      <i class="hpe-icon hpe-checkmark"></i>
                      <span class="filter-dropdown-title">{{ selected.name }}</span>
                  </a>
              </li>

              <hr>

              <li *ngIf="showTypeahead" class="typeahead-box">
                  <input [(ngModel)]="searchQuery" [typeahead]="typeaheadItems" class="form-control" 
                  (typeaheadOnSelect)="selectOption($event)" 
                  [placeholder]="options?.placeholder || defaultOptions.placeholder"
                  [typeaheadMinLength]="options?.minCharacters || defaultOptions.minCharacters"
                  [typeaheadOptionsLimit]="options?.maxResults">
              </li>

              <span *ngIf="!showTypeahead">
                  <li class="dropdown-list-item" *ngFor="let filter of filters" role="menuitem">
                      <a class="dropdown-item" (click)="selectFilter(filter)">
                          <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                          <span class="filter-dropdown-title">{{ filter.name }}</span>
                      </a>
                  </li>
              </span>

          </ul>
      </div>
    `,
                host: {
                    '(document:click)': 'clickOff($event)',
                }
            },] },
];
/**
 * @nocollapse
 */
FilterDynamicComponent.ctorParameters = () => [];
FilterDynamicComponent.propDecorators = {
    'filters': [{ type: Input },],
    'initial': [{ type: Input },],
    'options': [{ type: Input },],
    'dropdown': [{ type: ViewChild, args: [BsDropdownDirective,] },],
};

class FilterDropdownComponent extends FilterBaseComponent {
    /**
     * @return {?}
     */
    removeFilter() {
        super.removeFilter(this.selected);
        this.selected = this.initial;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    }
}
FilterDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dropdown',
                template: `
      <div class="btn-group" dropdown>
          <button dropdownToggle type="button" class="filter-dropdown btn dropdown-toggle" [class.active]="selected !== initial">{{ selected?.title }} 
              <span class="hpe-icon hpe-down"></span>
          </button>
          <ul *dropdownMenu class="dropdown-menu" role="menu">
              <li class="dropdown-list-item" *ngFor="let filter of filters" role="menuitem">
                  <a class="dropdown-item" (click)="selectFilter(filter)">
                      <i class="hpe-icon" [class.hpe-checkmark]="filter === selected"></i>
                      <span class="filter-dropdown-title">{{ filter.name }}</span>
                  </a>
              </li>
          </ul>
      </div>
    `,
            },] },
];
/**
 * @nocollapse
 */
FilterDropdownComponent.ctorParameters = () => [];
FilterDropdownComponent.propDecorators = {
    'initial': [{ type: Input },],
};

const DECLARATIONS$2 = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent
];
class FilterModule {
}
FilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BsDropdownModule.forRoot(),
                    TypeaheadModule.forRoot(),
                    TooltipModule.forRoot(),
                    FormsModule,
                    CommonModule
                ],
                exports: DECLARATIONS$2,
                declarations: DECLARATIONS$2
            },] },
];
/**
 * @nocollapse
 */
FilterModule.ctorParameters = () => [];

class FlippableCardComponent {
    constructor() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new EventEmitter();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setFlipped(state) {
        this.flipped = state;
        this.flippedChange.emit(this.flipped);
    }
    /**
     * @return {?}
     */
    toggleFlipped() {
        this.setFlipped(!this.flipped);
    }
    /**
     * @return {?}
     */
    clickTrigger() {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    }
    /**
     * @return {?}
     */
    hoverEnter() {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    }
    /**
     * @return {?}
     */
    hoverExit() {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    }
}
FlippableCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-flippable-card',
                template: `
      <div class="ux-flipper" [class.ux-flip-card]="flipped" [style.width.px]="width" [style.height.px]="height">

          <div class="ux-flippable-card-front" [style.width.px]="width" [style.height.px]="height">
              <ng-content select="ux-flippable-card-front"></ng-content>
          </div>

          <div class="ux-flippable-card-back" [style.width.px]="width" [style.height.px]="height">
              <ng-content select="ux-flippable-card-back"></ng-content>
          </div>
      </div>
    `,
                host: {
                    '[class.horizontal]': 'direction === "horizontal"',
                    '[class.vertical]': 'direction === "vertical"'
                },
                exportAs: 'ux-flippable-card'
            },] },
];
/**
 * @nocollapse
 */
FlippableCardComponent.ctorParameters = () => [];
FlippableCardComponent.propDecorators = {
    'direction': [{ type: Input },],
    'trigger': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'flipped': [{ type: Input },],
    'flippedChange': [{ type: Output },],
    'clickTrigger': [{ type: HostListener, args: ['click',] },],
    'hoverEnter': [{ type: HostListener, args: ['mouseenter',] },],
    'hoverExit': [{ type: HostListener, args: ['mouseleave',] },],
};
class FlippableCardFrontDirective {
}
FlippableCardFrontDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-front'
            },] },
];
/**
 * @nocollapse
 */
FlippableCardFrontDirective.ctorParameters = () => [];
class FlippableCardBackDirective {
}
FlippableCardBackDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-back'
            },] },
];
/**
 * @nocollapse
 */
FlippableCardBackDirective.ctorParameters = () => [];

class FlippableCardModule {
}
FlippableCardModule.decorators = [
    { type: NgModule, args: [{
                exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
                declarations: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective]
            },] },
];
/**
 * @nocollapse
 */
FlippableCardModule.ctorParameters = () => [];

class ItemDisplayPanelContentDirective {
}
ItemDisplayPanelContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelContent]'
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelContentDirective.ctorParameters = () => [];
class ItemDisplayPanelFooterDirective {
}
ItemDisplayPanelFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelFooterDirective.ctorParameters = () => [];
class ItemDisplayPanelComponent {
    constructor() {
        this.visibleChange = new EventEmitter();
        this._visible = false;
        this._boxShadow = true;
        this._closeVisible = true;
        this._preventClose = false;
        this._inline = false;
        this._animate = false;
        this._shadow = false;
    }
    /**
     * @return {?}
     */
    get top() {
        return this._top;
    }
    /**
     * @param {?} top
     * @return {?}
     */
    set top(top) {
        this._top = typeof top === 'string' ? parseFloat(top) : top;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    set visible(visible) {
        this._visible = visible;
        // invoke change event
        this.visibleChange.emit(this._visible);
    }
    /**
     * @return {?}
     */
    get boxShadow() {
        return this._boxShadow;
    }
    /**
     * @param {?} boxShadow
     * @return {?}
     */
    set boxShadow(boxShadow) {
        this._boxShadow = typeof boxShadow === 'string' ? !(boxShadow === 'false') : boxShadow;
    }
    /**
     * @return {?}
     */
    get closeVisible() {
        return this._closeVisible;
    }
    /**
     * @param {?} closeVisible
     * @return {?}
     */
    set closeVisible(closeVisible) {
        this._closeVisible = typeof closeVisible === 'string' ? !(closeVisible === 'false') : closeVisible;
    }
    /**
     * @return {?}
     */
    get preventClose() {
        return this._preventClose;
    }
    /**
     * @param {?} preventClose
     * @return {?}
     */
    set preventClose(preventClose) {
        this._preventClose = typeof preventClose === 'string' ? preventClose === 'true' : preventClose;
    }
    /**
     * @return {?}
     */
    get inline() {
        return this._inline;
    }
    /**
     * @param {?} inline
     * @return {?}
     */
    set inline(inline) {
        this._inline = typeof inline === 'string' ? inline === 'true' : inline;
    }
    /**
     * @return {?}
     */
    get animate() {
        return this._animate;
    }
    /**
     * @param {?} animate
     * @return {?}
     */
    set animate(animate) {
        this._animate = typeof animate === 'string' ? animate === 'true' : animate;
    }
    /**
     * @return {?}
     */
    get shadow() {
        return this._shadow;
    }
    /**
     * @param {?} shadow
     * @return {?}
     */
    set shadow(shadow) {
        this._shadow = typeof shadow === 'string' ? shadow === 'true' : shadow;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOff(event) {
        // dont close
        if (this.preventClose) {
            return;
        }
        // dont do anything if the panel is hidden
        if (this._visible) {
            let /** @type {?} */ target = event.target;
            // if the target node is the HTML tag, then this was triggered by scrolling and we should not close the panel
            if (target.nodeName === 'HTML') {
                return;
            }
            let /** @type {?} */ hidePanel = true;
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
    }
}
ItemDisplayPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-item-display-panel',
                template: `
      <div class="ux-item-display-panel" [class.box-shadow]="boxShadow" [class.inline]="inline" [class.animate]="animate" [class.item-display-panel-hide]="!visible" [style.top]="top" [style.height]='"calc(100% - " + top + "px)"'>

          <div class="item-display-panel-header" [class.item-display-panel-shadow]="shadow">
              <div class="heading-flex-box">
                  <h3>{{ title }}</h3>
                  <span *ngIf="closeVisible" class="heading-close-button" tabindex="0" (click)="visible = false" (keydown.enter)="visible = false">
                      <i class="hpe-icon hpe-close"></i>
                  </span>
              </div>
          </div>

          <div class="item-display-panel-content">
              <ng-content select="[uxItemDisplayPanelContent]"></ng-content>
          </div>

          <div class="item-display-panel-footer" *ngIf="footer">
              <ng-content select="[uxItemDisplayPanelFooter]"></ng-content>
          </div>

      </div>
    `,
                host: {
                    '(document:click)': 'clickOff($event)',
                    '(document:keyup.escape)': 'visible = false',
                    '[class.inline-host]': 'inline',
                    '[class.visible-host]': 'visible'
                }
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelComponent.ctorParameters = () => [];
ItemDisplayPanelComponent.propDecorators = {
    'title': [{ type: Input },],
    'footer': [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
    'visibleChange': [{ type: Output },],
    'top': [{ type: Input },],
    'visible': [{ type: Input },],
    'boxShadow': [{ type: Input },],
    'closeVisible': [{ type: Input },],
    'preventClose': [{ type: Input },],
    'inline': [{ type: Input },],
    'animate': [{ type: Input },],
    'shadow': [{ type: Input },],
};

const DECLARATIONS$3 = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];
class ItemDisplayPanelModule {
}
ItemDisplayPanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: DECLARATIONS$3,
                declarations: DECLARATIONS$3
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelModule.ctorParameters = () => [];

const NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberPickerComponent),
    multi: true
};
class NumberPickerComponent {
    constructor() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = (_) => { };
        this.valid = true;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
        this._propagateChange(value);
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set step(value) {
        this._step = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    increment(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    decrement(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    }
    /**
     * @return {?}
     */
    isValid() {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        let /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NumberPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-number-picker',
                template: `
      <input type="number" class="form-control number-picker-input" [(ngModel)]="value" [min]="min" [max]="max" (keydown.ArrowDown)="decrement($event)"
          (keydown.ArrowUp)="increment($event)" (wheel)="onScroll($event)" step="any" [disabled]="disabled">

      <div class="number-picker-controls">

          <div class="number-picker-control-up" (click)="increment($event)" [class.disabled]="disabled || value >= max">
              <span class="hpe-icon hpe-up"></span>
          </div>

          <div class="number-picker-control-down" (click)="decrement($event)" [class.disabled]="disabled || value <= min">
              <span class="hpe-icon hpe-down"></span>
          </div>

      </div>
    `,
                providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                host: {
                    '[class.has-error]': '!isValid()'
                }
            },] },
];
/**
 * @nocollapse
 */
NumberPickerComponent.ctorParameters = () => [];
NumberPickerComponent.propDecorators = {
    'valid': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'value': [{ type: Input, args: ['value',] },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'step': [{ type: Input },],
    'disabled': [{ type: Input },],
};

class NumberPickerModule {
}
NumberPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [NumberPickerComponent],
                declarations: [NumberPickerComponent]
            },] },
];
/**
 * @nocollapse
 */
NumberPickerModule.ctorParameters = () => [];

class PageHeaderCustomMenuDirective {
}
PageHeaderCustomMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPageHeaderCustomMenu]'
            },] },
];
/**
 * @nocollapse
 */
PageHeaderCustomMenuDirective.ctorParameters = () => [];

class PageHeaderComponent {
    constructor() {
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.backClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    goBack() {
        this.backClick.emit();
    }
    /**
     * @return {?}
     */
    getCondensedBreadcrumbs() {
        if (this.crumbs) {
            let /** @type {?} */ crumbs = this.crumbs.slice();
            crumbs.push({ title: this.header });
            return crumbs;
        }
        return [{ title: this.header }];
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header',
                exportAs: 'ux-page-header',
                template: `
      <!-- Display Upper Section when not condensed -->
      <div class="page-header-actions" *ngIf="!condensed">

          <div class="page-header-logo-container" [hidden]="!logo">
              <img [attr.src]="logo" class="page-header-logo">
          </div>

          <div class="page-header-navigation" [ngClass]="alignment">

              <!-- The Top Navigation Options -->
              <ux-page-header-horizontal-navigation [items]="items"></ux-page-header-horizontal-navigation>
          </div>

          <div class="page-header-icon-menus">
              <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>

              <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
          </div>
      </div>

      <!-- Display Lower Section When Not Condensed -->
      <div class="page-header-details" *ngIf="!condensed">

          <div class="page-header-state-container">

              <div *ngIf="backVisible == true" class="page-header-back-button" (click)="goBack()">
                  <span class="hpe-icon hpe-previous text-primary"></span>
              </div>

              <div class="page-header-title-container">

                  <ux-breadcrumbs [crumbs]="crumbs"></ux-breadcrumbs>

                  <h1 class="page-header-title">{{ header }}</h1>
              </div>

          </div>

      </div>

      <!-- Display This Section Optimized for Condensed Mode -->
      <div class="page-header-condensed-content" *ngIf="condensed">

          <div class="page-header-breadcrumbs">
              <ux-breadcrumbs [crumbs]="getCondensedBreadcrumbs()"></ux-breadcrumbs>
          </div>

          <div class="page-header-navigation" [ngClass]="alignment">

              <!-- The Top Navigation Options -->
              <ux-page-header-horizontal-navigation [items]="items"></ux-page-header-horizontal-navigation>
          </div>

          <div class="page-header-icon-menus">
              <ng-container *ngFor="let menu of customMenus" [ngTemplateOutlet]="menu"></ng-container>
              <ux-page-header-icon-menu *ngFor="let menu of iconMenus" [menu]="menu"></ux-page-header-icon-menu>
          </div>

      </div>
    `,
                host: {
                    '[class.page-header-condensed]': 'condensed'
                }
            },] },
];
/**
 * @nocollapse
 */
PageHeaderComponent.ctorParameters = () => [];
PageHeaderComponent.propDecorators = {
    'logo': [{ type: Input },],
    'items': [{ type: Input },],
    'crumbs': [{ type: Input },],
    'header': [{ type: Input },],
    'alignment': [{ type: Input },],
    'condensed': [{ type: Input },],
    'iconMenus': [{ type: Input },],
    'backVisible': [{ type: Input },],
    'backClick': [{ type: Output },],
    'customMenus': [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] },],
};

class PageHeaderIconMenuComponent {
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.select) {
            item.select.call(item, item);
        }
    }
}
PageHeaderIconMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-icon-menu',
                template: `
      <div class="page-header-icon-menu" dropdown dropdownToggle placement="bottom right">

          <a class="page-header-icon-menu-button" (click)="select(menu)">
              <i class="hpe-icon" [ngClass]="menu.icon"></i>
              <span class="label label-primary" *ngIf="menu?.badge">{{ menu.badge }}</span>
          </a>

          <ul *dropdownMenu class="dropdown-menu" role="menu">

              <li role="menuitem" *ngFor="let dropdown of menu?.dropdown" [class.dropdown-header]="dropdown.header" [class.dropdown-divider]="dropdown.divider">

                  <span class="font-bold" *ngIf="dropdown.header">{{ dropdown.title }}</span>

                  <a class="dropdown-item" *ngIf="!dropdown.header" (click)="select(dropdown)">
                      <i class="hpe-icon hp-fw text-muted" [ngClass]="dropdown.icon"></i>
                      {{ dropdown.title }}
                      <span class="pull-right text-muted small" *ngIf="dropdown.subtitle">{{ dropdown.subtitle }}</span>
                  </a>
              </li>

          </ul>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
PageHeaderIconMenuComponent.ctorParameters = () => [];
PageHeaderIconMenuComponent.propDecorators = {
    'menu': [{ type: Input },],
};

class PageHeaderNavigationDropdownItemComponent {
    constructor() {
        this.onSelect = new EventEmitter();
        this.dropdownOpen = false;
        this._dropdownEvents = new Subject$1();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._dropdownEvents.debounceTime(1).subscribe(visible => this.dropdownOpen = visible);
    }
    /**
     * @param {?} item
     * @param {?=} parentItem
     * @return {?}
     */
    selectItem(item, parentItem) {
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
    }
    /**
     * @return {?}
     */
    hoverStart() {
        this._dropdownEvents.next(true);
    }
    /**
     * @return {?}
     */
    hoverLeave() {
        this._dropdownEvents.next(false);
    }
    /**
     * @return {?}
     */
    close() {
        this.dropdownOpen = false;
    }
}
PageHeaderNavigationDropdownItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                template: `
      <div role="menu-item" dropdown [isOpen]="dropdownOpen" container="body" placement="right" [isDisabled]="!item.children" (mouseenter)="hoverStart()"
          (mouseleave)="hoverLeave()" #subMenu="bs-dropdown">

          <!-- Show the menu item and the arrow if there are children -->
          <a class="dropdown-item" tabindex="0" [class.selected]="item.selected" (keyup.enter)="selectItem(item); subMenu.toggle()" (click)="selectItem(item)">
              <span class="dropdown-item-title">{{ item.title }}</span>
              <span class="dropdown-item-icon hpe-icon hpe-next" *ngIf="item.children"></span>
          </a>

          <!-- Allow another level of menu items -->
          <ul *dropdownMenu class="dropdown-menu horizontal-navigation-dropdown-submenu" role="menu" (mouseenter)="hoverStart()" (mouseleave)="hoverLeave()">

              <li role="menuitem" *ngFor="let subItem of item.children" (click)="selectItem(subItem, item)" (keyup.enter)="selectItem(subItem, item)">
                  <a class="dropdown-item" tabindex="0" [class.selected]="subItem.selected">
                      <span class="dropdown-item-title">{{ subItem.title }}</span>
                  </a>
              </li>
          </ul>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationDropdownItemComponent.ctorParameters = () => [];
PageHeaderNavigationDropdownItemComponent.propDecorators = {
    'item': [{ type: Input },],
    'onSelect': [{ type: Output },],
};

class PageHeaderNavigationItemComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.menu.onHidden.subscribe(() => this.dropdownComponents.forEach(dropdown => dropdown.close()));
    }
    /**
     * @return {?}
     */
    selectItem() {
        // if the item has children then do nothing at this stage 
        if (this.item.children) {
            return;
        }
        // otherwise select the current item
        this.onItemSelect(this.item);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onItemSelect(item) {
        this.onSelect.emit(item);
        // select the current item
        this.item.selected = true;
    }
}
PageHeaderNavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-item',
                template: `
      <div class="horizontal-navigation-button" dropdown dropdownToggle placement="bottom left" [isDisabled]="!item?.children" tabindex="0" container="body"
          #menu="bs-dropdown" (keyup.enter)="menu.toggle()" [class.selected]="item?.selected" (click)="selectItem()">

          <span class="hpe-icon navigation-item-icon" *ngIf="item.icon" [ngClass]="item?.icon"></span>
          <span class="navigation-item-label">{{ item?.title }}</span>
          <span class="hpe-icon hpe-down" *ngIf="item?.children"></span>

          <div *dropdownMenu class="dropdown-menu horizontal-navigation-dropdown-menu" role="menu">
              <ux-page-header-horizontal-navigation-dropdown-item *ngFor="let item of item?.children" [item]="item" (onSelect)="onItemSelect($event)"></ux-page-header-horizontal-navigation-dropdown-item>
          </div>

      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationItemComponent.ctorParameters = () => [
    { type: ElementRef, },
];
PageHeaderNavigationItemComponent.propDecorators = {
    'menu': [{ type: ViewChild, args: ['menu',] },],
    'dropdownComponents': [{ type: ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] },],
    'item': [{ type: Input },],
    'onSelect': [{ type: Output },],
};

class PageHeaderNavigationComponent {
    /**
     * @param {?} elementRef
     * @param {?} resizeService
     * @param {?} renderer
     */
    constructor(elementRef, resizeService, renderer) {
        this.items = [];
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        resizeService.addResizeListener(elementRef.nativeElement, renderer).subscribe(this.updateSelectedIndicator.bind(this));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateSelectedIndicator();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onSelect(item) {
        if (item.select) {
            item.select.call(item, item);
        }
        // deselect all items in all menus
        this.deselectAll();
        // update the selected indicator
        this.updateSelectedIndicator();
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.items.forEach(item => this.deselect(item));
    }
    /**
     * @param {?} navItem
     * @return {?}
     */
    deselect(navItem) {
        // deselect the current item
        navItem.selected = false;
        // iterate any children and deselect them
        if (navItem.children) {
            navItem.children.forEach(item => this.deselect(item));
        }
        // update the selected indicator
        this.updateSelectedIndicator();
    }
    /**
     * @return {?}
     */
    updateSelectedIndicator() {
        setTimeout(() => {
            // find the selected item
            let /** @type {?} */ selectedItem = this.menuItems.find(item => item.item.selected);
            // determine whether or not to show the indicator
            this.indicatorVisible = !!selectedItem;
            // set the width of the indicator to match the width of the navigation item
            if (selectedItem) {
                let /** @type {?} */ styles = getComputedStyle(selectedItem.elementRef.nativeElement);
                this.indicatorX = selectedItem.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }
}
PageHeaderNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation',
                template: `
      <ux-page-header-horizontal-navigation-item *ngFor="let item of items" [item]="item" (onSelect)="onSelect($event)"></ux-page-header-horizontal-navigation-item>
      <div class="selected-indicator" [style.opacity]="indicatorVisible ? 1 : 0" [style.margin-left.px]="indicatorX" [style.width.px]="indicatorWidth"></div>
    `
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: Renderer2, },
];
PageHeaderNavigationComponent.propDecorators = {
    'menuItems': [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] },],
    'items': [{ type: Input },],
};

class PageHeaderModule {
}
PageHeaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BreadcrumbsModule,
                    ResizeModule,
                    BsDropdownModule.forRoot()
                ],
                exports: [
                    PageHeaderComponent,
                    PageHeaderCustomMenuDirective
                ],
                declarations: [
                    PageHeaderComponent,
                    PageHeaderIconMenuComponent,
                    PageHeaderCustomMenuDirective,
                    PageHeaderNavigationComponent,
                    PageHeaderNavigationItemComponent,
                    PageHeaderNavigationDropdownItemComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
PageHeaderModule.ctorParameters = () => [];

class ColorService {
    /**
     * @param {?} document
     */
    constructor(document) {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this._setColors();
        }
        else {
            for (let key in this._colorSet.colorValueSet) {
                this._colors[key] = this._getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    _setColors() {
        this._html = '';
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    _getColorValueByHex(color) {
        let /** @type {?} */ hex = color.replace('#', '');
        let /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        let /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        let /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColorValue(color) {
        let /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        let /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        let /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColor(color) {
        return this._colors[color.toLowerCase()];
    }
    /**
     * @return {?}
     */
    getColorSet() {
        return this._colorSet;
    }
    /**
     * @param {?} colorSet
     * @return {?}
     */
    setColorSet(colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this._setColors();
        }
        else {
            for (let /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this._getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
}
/**
 * @nocollapse
 */
ColorService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
class ThemeColor {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    constructor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static parse(value) {
        let /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        var /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        var /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
        let /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        let /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        let /** @type {?} */ longHexMatch = value.match(longHexPattern);
        if (rgbaMatch) {
            r = rgbaMatch[1];
            g = rgbaMatch[2];
            b = rgbaMatch[3];
            a = rgbaMatch[4] ? rgbaMatch[4] : '1';
        }
        else if (longHexMatch) {
            r = parseInt(longHexMatch[1], 16).toString();
            g = parseInt(longHexMatch[2], 16).toString();
            b = parseInt(longHexMatch[3], 16).toString();
        }
        else if (shortHexMatch) {
            r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16).toString();
            g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16).toString();
            b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16).toString();
        }
        else {
            throw new Error(`Cannot parse color - ${value} is not a valid color.`);
        }
        return new ThemeColor(r, g, b, a);
    }
    /**
     * @return {?}
     */
    toHex() {
        var /** @type {?} */ red = parseInt(this._r).toString(16);
        var /** @type {?} */ green = parseInt(this._g).toString(16);
        var /** @type {?} */ blue = parseInt(this._b).toString(16);
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
    }
    /**
     * @return {?}
     */
    toRgb() {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    }
    /**
     * @return {?}
     */
    toRgba() {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    }
    /**
     * @return {?}
     */
    getRed() {
        return this._r;
    }
    /**
     * @return {?}
     */
    getGreen() {
        return this._g;
    }
    /**
     * @return {?}
     */
    getBlue() {
        return this._b;
    }
    /**
     * @return {?}
     */
    getAlpha() {
        return this._a;
    }
    /**
     * @param {?} red
     * @return {?}
     */
    setRed(red) {
        this._r = red;
        return this;
    }
    /**
     * @param {?} green
     * @return {?}
     */
    setGreen(green) {
        this._g = green;
        return this;
    }
    /**
     * @param {?} blue
     * @return {?}
     */
    setBlue(blue) {
        this._b = blue;
        return this;
    }
    /**
     * @param {?} alpha
     * @return {?}
     */
    setAlpha(alpha) {
        this._a = alpha.toString();
        return this;
    }
}
const colorSets = {
    keppel: {
        colorClassSet: {
            'primary': 'primary',
            'accent': 'accent',
            'secondary': 'secondary',
            'alternate1': 'alternate1',
            'alternate2': 'alternate2',
            'alternate3': 'alternate3',
            'vibrant1': 'vibrant1',
            'vibrant2': 'vibrant2',
            'grey1': 'grey1',
            'grey2': 'grey2',
            'grey3': 'grey3',
            'grey4': 'grey4',
            'grey5': 'grey5',
            'grey6': 'grey6',
            'grey7': 'grey7',
            'grey8': 'grey8',
            'chart1': 'chart1',
            'chart2': 'chart2',
            'chart3': 'chart3',
            'chart4': 'chart4',
            'chart5': 'chart5',
            'chart6': 'chart6',
            'ok': 'ok',
            'warning': 'warning',
            'critical': 'critical',
            'partition1': 'partition1',
            'partition9': 'partition9',
            'partition10': 'partition10',
            'partition11': 'partition11',
            'partition12': 'partition12',
            'partition13': 'partition13',
            'partition14': 'partition14',
            'social-chart-node': 'social-chart-node',
            'social-chart-edge': 'social-chart-edge'
        }
    },
    microFocus: {
        'colorValueSet': {
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
            'critical': 'e5004c',
            'partition1': '#7425ad',
            'partition9': '#5216ac',
            'partition10': '#5bba36',
            'partition11': '#014272',
            'partition12': '#ffb000',
            'partition13': '#bdbec0',
            'partition14': '#271782',
            'social-chart-node': '#ff00ff',
            'social-chart-edge': '#ff00ff'
        }
    }
};

class ColorServiceModule {
}
ColorServiceModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [],
                declarations: [],
                providers: [ColorService],
            },] },
];
/**
 * @nocollapse
 */
ColorServiceModule.ctorParameters = () => [];

class ProgressBarComponent {
    /**
     * @param {?} colorService
     */
    constructor(colorService) {
        this.colorService = colorService;
        this.value = 0;
        this.max = 100;
        this.trackColor = this.colorService.getColor('grey7').toHex();
        this.barColor = this.colorService.getColor('accent').toHex();
        this.percentage = 0;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.percentage = (this.value / this.max) * 100;
    }
}
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-progress-bar',
                template: `
      <div class="progressbar-track" [style.width.%]="percentage" [style.backgroundColor]="barColor">
          <ng-content></ng-content>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
ProgressBarComponent.ctorParameters = () => [
    { type: ColorService, },
];
ProgressBarComponent.propDecorators = {
    'value': [{ type: Input },],
    'max': [{ type: Input },],
    'trackColor': [{ type: Input },],
    'barColor': [{ type: Input },],
};

class ProgressBarModule {
}
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [ColorServiceModule],
                exports: [ProgressBarComponent],
                declarations: [ProgressBarComponent]
            },] },
];
/**
 * @nocollapse
 */
ProgressBarModule.ctorParameters = () => [];

const RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};
class RadioButtonComponent {
    constructor() {
        this.simplified = false;
        this.disabled = false;
        this.name = '';
        this.clickable = true;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // invoke change event
        this.valueChange.emit(this._value);
        // call callback
        this.onChangeCallback(this._value);
    }
    /**
     * @return {?}
     */
    checkItem() {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyDown(event) {
        // then toggle the checkbox
        this.checkItem();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-radio-button',
                template: `
      <div class="ux-radio-button" tabindex="0"
          [class.ux-checked]="value === option"
          [class.ux-simplified]="simplified === true"
          [class.ux-disabled]="disabled === true"
          (keydown.space)="keyDown($event)">

          <input type="radio" role="radio" tabindex="-1"
              [name]="name" 
              [checked]="value === option" 
              [disabled]="disabled"
              [value]="option"
              [id]="id" />
        
      </div>

      <div class="ux-radio-button-content">
          <ng-content></ng-content>
      </div>
    `,
                providers: [RADIOBUTTON_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
RadioButtonComponent.ctorParameters = () => [];
RadioButtonComponent.propDecorators = {
    'id': [{ type: Input },],
    'simplified': [{ type: Input },],
    'disabled': [{ type: Input },],
    'name': [{ type: Input },],
    'clickable': [{ type: Input },],
    'option': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'value': [{ type: Input },],
    'checkItem': [{ type: HostListener, args: ['click',] },],
};

class RadioButtonModule {
}
RadioButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [RadioButtonComponent],
                declarations: [RadioButtonComponent]
            },] },
];
/**
 * @nocollapse
 */
RadioButtonModule.ctorParameters = () => [];

class TypeaheadOptionEvent {
    /**
     * @param {?} option
     */
    constructor(option) {
        this.option = option;
    }
}

class TypeaheadKeyService {
    constructor() { }
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    handleKey(event, typeahead) {
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
    }
}
TypeaheadKeyService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
TypeaheadKeyService.ctorParameters = () => [];

class TypeaheadComponent {
    /**
     * @param {?} typeaheadElement
     */
    constructor(typeaheadElement) {
        this.typeaheadElement = typeaheadElement;
        this._open = false;
        this.openChange = new EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.optionSelected = new EventEmitter();
        this._highlighted = new BehaviorSubject$1(null);
        this.visibleOptions = [];
        this.loading = false;
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = (pageNum, pageSize, filter$$1) => {
            if (typeof this.options === 'function') {
                return this.options(pageNum, pageSize, filter$$1);
            }
            return null;
        };
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        const /** @type {?} */ originalValue = this._open;
        this._open = value;
        if (value !== originalValue) {
            this.openChange.emit(value);
            if (value) {
                this.initOptions();
            }
        }
    }
    /**
     * @return {?}
     */
    get highlighted() {
        return this._highlighted.getValue();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Open the dropdown if the filter value updates
        if (changes.filter) {
            if (this.openOnFilterChange && changes.filter.currentValue && changes.filter.currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    optionMousedownHandler(event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    optionClickHandler(event, option) {
        this.select(option);
    }
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    getKey(option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[(this.key)];
        }
        return this.getDisplay(option);
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[(this.display)];
        }
        return option;
    }
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    getDisplayHtml(option) {
        let /** @type {?} */ displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        let /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            const /** @type {?} */ length = this.filter.length;
            const /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = `<span class="ux-filter-match">${displayText.substr(matchIndex, length)}</span>`;
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    }
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    isInfiniteScroll() {
        return typeof this.options === 'function';
    }
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    select(option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option));
            this._highlighted.next(null);
            this.open = false;
        }
    }
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    isDisabled(option) {
        if (this.disabledOptions) {
            const /** @type {?} */ optionKey = this.getKey(option);
            const /** @type {?} */ result = this.disabledOptions.find((selectedOption) => {
                return this.getKey(selectedOption) === optionKey;
            });
            return result !== undefined;
        }
        return false;
    }
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    highlight(option) {
        if (!this.isDisabled(option)) {
            this._highlighted.next(option);
        }
    }
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveHighlight(d) {
        const /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        let /** @type {?} */ newIndex = highlightIndex;
        let /** @type {?} */ disabled = true;
        let /** @type {?} */ inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < this.visibleOptions.length);
            disabled = inBounds && this.isDisabled(this.visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this._highlighted.next(this.visibleOptions[newIndex]);
        }
        return this.highlighted;
    }
    /**
     * Returns true if the given option is the highlighted option.
     * @param {?} option
     * @return {?}
     */
    isHighlighted(option) {
        return this.getKey(option) === this.getKey(this.highlighted);
    }
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    initOptions() {
        // Clear previous highlight
        this._highlighted.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    }
    /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    updateOptions() {
        if (typeof this.options === 'object') {
            const /** @type {?} */ normalisedInput = (this.filter || '').toLowerCase();
            this.visibleOptions = this.options.filter((option) => {
                return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
            });
        }
        this.initOptions();
    }
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    indexOfVisibleOption(option) {
        if (option) {
            const /** @type {?} */ optionKey = this.getKey(option);
            return this.visibleOptions.findIndex((el) => {
                return this.getKey(el) === optionKey;
            });
        }
        return -1;
    }
}
TypeaheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-typeahead',
                template: `
      <div class="ux-typeahead-options"
          [uxInfiniteScroll]="loadOptionsCallback"
          [(collection)]="visibleOptions"
          [enabled]="isInfiniteScroll()"
          [filter]="filter"
          [loadOnScroll]="true"
          [pageSize]="pageSize"
          [scrollElement]="typeaheadElement"
          (loading)="loading = true"
          (loaded)="loading = false">

          <ol *ngIf="visibleOptions.length > 0">
              <li *ngFor="let option of visibleOptions; let i = index"
                  [class.disabled]="isDisabled(option)"
                  [class.highlighted]="isHighlighted(option)"
                  [uxScrollIntoViewIf]="isHighlighted(option)"
                  [scrollParent]="typeaheadElement.nativeElement"
                  (mousedown)="optionMousedownHandler($event)"
                  (click)="optionClickHandler($event, option)"
                  (mouseover)="highlight(option)">

                  <ng-container [ngTemplateOutlet]="optionTemplate"
                      [ngOutletContext]="{option: option, api: optionApi}">
                  </ng-container>

              </li>
          </ol>

          <div *uxInfiniteScrollLoading>
              <ng-container [ngTemplateOutlet]="loadingTemplate">
              </ng-container>
          </div>

      </div>
      <div *ngIf="visibleOptions.length === 0 && !loading">
          <ng-container [ngTemplateOutlet]="noOptionsTemplate">
          </ng-container>
      </div>

      <ng-template #defaultLoadingTemplate>
          <div class="ux-typeahead-loading">
              <div class="spinner spinner-accent spinner-bounce-middle"></div>
              <div>Loading...</div>
          </div>
      </ng-template>

      <ng-template #defaultOptionTemplate let-option="option" let-api="api">
          <span class="ux-typeahead-option" [innerHtml]="api.getDisplayHtml(option)"></span>
      </ng-template>

      <ng-template #defaultNoOptionsTemplate>
          <span class="ux-typeahead-no-options">No results</span>
      </ng-template>
    `,
                host: {
                    '[class.open]': 'open',
                    '[class.drop-up]': 'dropDirection === "up"',
                    '[style.maxHeight]': 'maxHeight'
                }
            },] },
];
/**
 * @nocollapse
 */
TypeaheadComponent.ctorParameters = () => [
    { type: ElementRef, },
];
TypeaheadComponent.propDecorators = {
    'options': [{ type: Input },],
    'filter': [{ type: Input },],
    'open': [{ type: Input, args: ['open',] },],
    'openChange': [{ type: Output },],
    'display': [{ type: Input },],
    'key': [{ type: Input },],
    'disabledOptions': [{ type: Input },],
    'dropDirection': [{ type: Input },],
    'maxHeight': [{ type: Input },],
    'openOnFilterChange': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'selectFirst': [{ type: Input },],
    'loadingTemplate': [{ type: Input },],
    'optionTemplate': [{ type: Input },],
    'noOptionsTemplate': [{ type: Input },],
    'optionSelected': [{ type: Output },],
    'highlighted': [{ type: Output },],
    '_defaultLoadingTemplate': [{ type: ViewChild, args: ['defaultLoadingTemplate',] },],
    '_defaultOptionTemplate': [{ type: ViewChild, args: ['defaultOptionTemplate',] },],
    '_defaultNoOptionsTemplate': [{ type: ViewChild, args: ['defaultNoOptionsTemplate',] },],
};

class InfiniteScrollLoadButtonDirective {
    /**
     * @param {?} _element
     * @param {?} _template
     * @param {?} _viewContainer
     * @param {?} _renderer
     */
    constructor(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject$1();
        this.load = this._load.asObservable();
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (value !== this._visible) {
            if (value) {
                this._viewContainer.createEmbeddedView(this._template);
                // Template content follows the elementRef, which is a comment.
                const /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
            }
            else {
                this._viewContainer.clear();
            }
        }
        this._visible = value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._load.next(event);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getNextElementSibling(element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    }
}
InfiniteScrollLoadButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScrollLoadButton]'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollLoadButtonDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Renderer2, },
];
InfiniteScrollLoadButtonDirective.propDecorators = {
    'visible': [{ type: Input, args: ['uxInfiniteScrollLoadButton',] },],
    'load': [{ type: Output },],
};

class InfiniteScrollLoadingDirective {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainer
     */
    constructor(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (value !== this._visible) {
            if (value) {
                this._viewContainer.createEmbeddedView(this._templateRef);
            }
            else {
                this._viewContainer.clear();
            }
        }
        this._visible = value;
    }
}
InfiniteScrollLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScrollLoading]'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollLoadingDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
InfiniteScrollLoadingDirective.propDecorators = {
    'visible': [{ type: Input, args: ['uxInfiniteScrollLoading',] },],
};

class InfiniteScrollDirective {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new EventEmitter();
        this.loadingEvent = new EventEmitter();
        this.loadedEvent = new EventEmitter();
        this.loadErrorEvent = new EventEmitter();
        this._nextPageNum = 0;
        this._updateRequests = new Subject$1();
        this._isLoading = new BehaviorSubject$1(false);
        this._isExhausted = new BehaviorSubject$1(false);
        this._loadButtonEnabled = new BehaviorSubject$1(false);
        this._loadButtonSubscriptions = [];
        this._canLoadManually = this._isLoading.combineLatest(this._isExhausted, this._loadButtonEnabled, (isLoading, isExhausted, loadButtonEnabled) => {
            return !isLoading && !isExhausted && loadButtonEnabled;
        });
    }
    /**
     * @return {?}
     */
    get collection() {
        return this._collection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collection(value) {
        this.collectionChange.emit(value);
        this._collection = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.scrollElement) {
            this.scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        const /** @type {?} */ requests = this._updateRequests.partition((r) => r.check);
        requests[0].auditTime(200).subscribe(this.doRequest.bind(this));
        requests[1].subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.subscribe((canLoad) => {
            this._loadButtonQuery.forEach((loadButton) => {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.subscribe((isLoading) => {
            this._loadingIndicatorQuery.forEach((loading) => {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.subscribe((query) => {
            this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ check = true;
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.detachEventHandlers();
    }
    /**
     * Request an additional page of data.
     * @return {?}
     */
    loadNextPage() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    check() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    reset() {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        this.check();
    }
    /**
     * @return {?}
     */
    onDomChange() {
        this.check();
    }
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    attachEventHandlers() {
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = Observable$1.fromEvent(this.scrollElement.nativeElement, 'scroll')
            .subscribe(this.onScroll.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.onDomChange.bind(this));
        this._domObserver.observe(this.scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    }
    /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    detachEventHandlers() {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    }
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    attachLoadButtonEvents() {
        this._loadButtonSubscriptions.forEach((s) => s.unsubscribe());
        this._loadButtonSubscriptions = this._loadButtonQuery.map((loadButton) => {
            return loadButton.load.subscribe(this.loadNextPage.bind(this));
        });
    }
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    doRequest(request) {
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not 
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            const /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            Promise.resolve(loadResult)
                .then((newData) => {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === this.filter && request.pageSize === this.pageSize) {
                    if (newData && newData.length) {
                        Array.prototype.push.apply(this.collection, newData);
                    }
                    // Emit the loaded event
                    this.endLoading(request, newData);
                }
            })
                .catch((reason) => {
                // Emit the loadError event
                this.endLoadingWithError(request, reason);
            });
        }
    }
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    needsData(request) {
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
            const /** @type {?} */ element = (this.scrollElement.nativeElement);
            const /** @type {?} */ remainingScroll = element.scrollHeight - (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    }
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    beginLoading(request) {
        const /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    }
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    endLoading(request, data) {
        this._isLoading.next(false);
        const /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        this._nextPageNum += 1;
    }
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    endLoadingWithError(request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    }
}
InfiniteScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScroll]',
                exportAs: 'uxInfiniteScroll'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollDirective.ctorParameters = () => [
    { type: ElementRef, },
];
InfiniteScrollDirective.propDecorators = {
    'load': [{ type: Input, args: ['uxInfiniteScroll',] },],
    '_collection': [{ type: Input, args: ['collection',] },],
    'enabled': [{ type: Input },],
    'filter': [{ type: Input },],
    'loadOnInit': [{ type: Input },],
    'loadOnScroll': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'scrollElement': [{ type: Input },],
    'collectionChange': [{ type: Output },],
    'loadingEvent': [{ type: Output, args: ['loading',] },],
    'loadedEvent': [{ type: Output, args: ['loaded',] },],
    'loadErrorEvent': [{ type: Output, args: ['loadError',] },],
    '_loadButtonQuery': [{ type: ContentChildren, args: [InfiniteScrollLoadButtonDirective,] },],
    '_loadingIndicatorQuery': [{ type: ContentChildren, args: [InfiniteScrollLoadingDirective,] },],
};
/**
 * Event raised before the `loading` function is called.
 */
class InfiniteScrollLoadingEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     */
    constructor(pageNumber, pageSize, filter$$1) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    preventDefault() {
        this._defaultPrevented = true;
    }
    /**
     * @return {?}
     */
    defaultPrevented() {
        return this._defaultPrevented;
    }
}
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
class InfiniteScrollLoadedEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} data
     * @param {?} exhausted
     */
    constructor(pageNumber, pageSize, filter$$1, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.data = data;
        this.exhausted = exhausted;
    }
}
/**
 * Event raised if the loading function returns a rejected promise.
 */
class InfiniteScrollLoadErrorEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} error
     */
    constructor(pageNumber, pageSize, filter$$1, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.error = error;
    }
}

class InfiniteScrollModule {
}
InfiniteScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [
                    InfiniteScrollDirective,
                    InfiniteScrollLoadButtonDirective,
                    InfiniteScrollLoadingDirective
                ],
                declarations: [
                    InfiniteScrollDirective,
                    InfiniteScrollLoadButtonDirective,
                    InfiniteScrollLoadingDirective
                ],
                providers: [],
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollModule.ctorParameters = () => [];

class ScrollIntoViewService {
    /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    scrollIntoView(elem, scrollParent) {
        const /** @type {?} */ offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            const /** @type {?} */ offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    }
}
ScrollIntoViewService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollIntoViewService.ctorParameters = () => [];

class ScrollIntoViewIfDirective {
    /**
     * @param {?} element
     * @param {?} scrollIntoViewService
     */
    constructor(element, scrollIntoViewService) {
        this.element = element;
        this.scrollIntoViewService = scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.condition) {
            setTimeout(() => {
                this.scrollIntoViewService.scrollIntoView(this.element.nativeElement, this.scrollParent);
            });
        }
    }
}
ScrollIntoViewIfDirective.decorators = [
    { type: Directive, args: [{ selector: '[uxScrollIntoViewIf]' },] },
];
/**
 * @nocollapse
 */
ScrollIntoViewIfDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ScrollIntoViewService, },
];
ScrollIntoViewIfDirective.propDecorators = {
    'condition': [{ type: Input, args: ['uxScrollIntoViewIf',] },],
    'scrollParent': [{ type: Input },],
};

class ScrollIntoViewIfModule {
}
ScrollIntoViewIfModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [ScrollIntoViewIfDirective],
                declarations: [ScrollIntoViewIfDirective],
                providers: [ScrollIntoViewService],
            },] },
];
/**
 * @nocollapse
 */
ScrollIntoViewIfModule.ctorParameters = () => [];

class TypeaheadModule$1 {
}
TypeaheadModule$1.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    InfiniteScrollModule,
                    ScrollIntoViewIfModule
                ],
                exports: [TypeaheadComponent],
                declarations: [TypeaheadComponent],
                providers: [TypeaheadKeyService],
            },] },
];
/**
 * @nocollapse
 */
TypeaheadModule$1.ctorParameters = () => [];

const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
class SelectComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.valueChange = new EventEmitter();
        this._input = new BehaviorSubject$1('');
        this.inputChange = new EventEmitter();
        this._dropdownOpen = false;
        this.dropdownOpenChange = new EventEmitter();
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.propagateChange = (_) => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
        this.propagateChange(value);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input.getValue();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input.next(value);
        this.inputChange.emit(value);
    }
    /**
     * @return {?}
     */
    get dropdownOpen() {
        return this._dropdownOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dropdownOpen(value) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Changes to the input field
        this._input.subscribe((next) => {
            if (!this.multiple && next !== this.getDisplay(this.value)) {
                if (this.allowNull) {
                    this.value = null;
                }
            }
        });
        // Set up filter from input
        this.filter = this._input
            .map((input) => {
            if (!this.multiple && input === this.getDisplay(this.value)) {
                return '';
            }
            return input;
        })
            .debounceTime(200);
        // Changes to filter value
        this.filter.subscribe((next) => {
            // Open the dropdown when filter is nonempty.
            if (next && next.length > 0) {
                this.dropdownOpen = true;
            }
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value) {
            if (!this.multiple && changes.value.currentValue !== null) {
                this.input = this.getDisplay(changes.value.currentValue);
            }
        }
        if (changes.multiple && changes.multiple.currentValue !== changes.multiple.previousValue) {
            this.input = '';
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined) {
            this._value = obj;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputClickHandler(event) {
        this.selectInputText();
        this.dropdownOpen = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputBlurHandler(event) {
        // Close dropdown and reset text input if focus is lost
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.dropdownOpen = false;
                if (!this.multiple) {
                    this.input = this.getDisplay(this.value);
                }
            }
        }, 200);
    }
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    inputKeyHandler(event) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    singleOptionSelected(event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[(this.display)];
        }
        return option;
    }
    /**
     * @return {?}
     */
    selectInputText() {
        this.singleInput.nativeElement.select();
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-select',
                template: `
      <ux-tag-input *ngIf="multiple"
          [(tags)]="value"
          [(input)]="input"
          [addOnPaste]="false"
          [disabled]="disabled"
          [display]="display"
          [freeInput]="false"
          [placeholder]="placeholder"
          [showTypeaheadOnClick]="true">

          <ux-typeahead #multipleTypeahead
              [options]="options"
              [filter]="filter | async"
              [(open)]="dropdownOpen"
              [display]="display"
              [key]="key"
              [disabledOptions]="value"
              [dropDirection]="dropDirection"
              [maxHeight]="maxHeight"
              [pageSize]="pageSize"
              [selectFirst]="true"
              [loadingTemplate]="loadingTemplate"
              [optionTemplate]="optionTemplate"
              [noOptionsTemplate]="noOptionsTemplate">
          </ux-typeahead>

      </ux-tag-input>

      <div *ngIf="!multiple" class="inner-addon right-addon" [class.disabled]="disabled">

          <i class="hpe-icon"
              [class.hpe-down]="dropDirection === 'down'"
              [class.hpe-up]="dropDirection === 'up'"></i>

          <input #singleInput type="text" class="form-control"
              [(ngModel)]="input"
              [placeholder]="placeholder"
              [disabled]="disabled"
              (click)="inputClickHandler($event)"
              (blur)="inputBlurHandler($event)"
              (keydown)="inputKeyHandler($event)">

          <ux-typeahead #singleTypeahead
              [options]="options"
              [filter]="filter | async"
              [(open)]="dropdownOpen"
              [display]="display"
              [key]="key"
              [dropDirection]="dropDirection"
              [maxHeight]="maxHeight"
              [openOnFilterChange]="false"
              [pageSize]="pageSize"
              [selectFirst]="true"
              [loadingTemplate]="loadingTemplate"
              [optionTemplate]="optionTemplate"
              [noOptionsTemplate]="noOptionsTemplate"
              (optionSelected)="singleOptionSelected($event)" >
          </ux-typeahead>

      </div>
    `,
                providers: [SELECT_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
SelectComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: HTMLDocument, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
];
SelectComponent.propDecorators = {
    'value': [{ type: Input, args: ['value',] },],
    'valueChange': [{ type: Output },],
    'input': [{ type: Input, args: ['input',] },],
    'inputChange': [{ type: Output },],
    'dropdownOpen': [{ type: Input, args: ['dropdownOpen',] },],
    'dropdownOpenChange': [{ type: Output },],
    'options': [{ type: Input },],
    'display': [{ type: Input },],
    'key': [{ type: Input },],
    'allowNull': [{ type: Input },],
    'disabled': [{ type: Input },],
    'dropDirection': [{ type: Input },],
    'maxHeight': [{ type: Input },],
    'multiple': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'loadingTemplate': [{ type: Input },],
    'noOptionsTemplate': [{ type: Input },],
    'optionTemplate': [{ type: Input },],
    'singleInput': [{ type: ViewChild, args: ['singleInput',] },],
    'multipleTypeahead': [{ type: ViewChild, args: ['multipleTypeahead',] },],
    'singleTypeahead': [{ type: ViewChild, args: ['singleTypeahead',] },],
};

class TagInputEvent {
    /**
     * @param {?} tag
     */
    constructor(tag) {
        this.tag = tag;
        this._defaultPrevented = false;
    }
    /**
     * @return {?}
     */
    preventDefault() {
        this._defaultPrevented = true;
    }
    /**
     * @return {?}
     */
    defaultPrevented() {
        return this._defaultPrevented;
    }
}

const TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
const TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
class TagInputComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this._tags = [];
        this.tagsChange = new EventEmitter();
        this._input = '';
        this.inputChange = new EventEmitter();
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
        this.tagAdding = new EventEmitter();
        this.tagAdded = new EventEmitter();
        this.tagInvalidated = new EventEmitter();
        this.tagRemoving = new EventEmitter();
        this.tagRemoved = new EventEmitter();
        this.tagClick = new EventEmitter();
        this.selectedIndex = -1;
        this.tagApi = {
            getTagDisplay: this.getTagDisplay.bind(this),
            removeTagAt: this.removeTagAt.bind(this),
            canRemoveTagAt: this.canRemoveTagAt.bind(this)
        };
        this.valid = true;
        this.inputValid = true;
        this.onChangeHandler = () => { };
        this.onTouchedHandler = () => { };
    }
    /**
     * @return {?}
     */
    get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tags(value) {
        this._tags = value;
        this.onChangeHandler(this._tags);
        this.tagsChange.emit(this._tags);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input = value;
        this.inputChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe((query) => {
            this.connectTypeahead(query.first);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            this.tags = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeHandler = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedHandler = fn;
    }
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    validate() {
        this.valid = true;
        let /** @type {?} */ tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyHandler(event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        const /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        const /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        const /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        const /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        const /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        const /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    focusOutHandler(event) {
        // Close the dropdown on blur
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }, 200);
    }
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    tagClickHandler(event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        const /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    }
    /**
     * @return {?}
     */
    inputClickHandler() {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    }
    /**
     * @return {?}
     */
    inputFocusHandler() {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputPasteHandler(event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            let /** @type {?} */ input = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            }
            else if (((window)).clipboardData) {
                // Internet Explorer only
                input = ((window)).clipboardData.getData('Text');
            }
            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    typeaheadOptionSelectedHandler(event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    }
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    commitInput() {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    commitTypeahead(tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    commit(input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            const /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            let /** @type {?} */ allValid = true;
            for (let /** @type {?} */ newTag of newTags) {
                const /** @type {?} */ valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }
            // Add the tags if all are valid
            if (allValid) {
                for (let /** @type {?} */ newTag of newTags) {
                    this.addTag(this.createTag(newTag));
                }
                return true;
            }
        }
        return false;
    }
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    backspace() {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    }
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveSelection(d) {
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
    }
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    getTagDisplay(tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[(this.display)];
        }
        return tag;
    }
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        return index === this.selectedIndex;
    }
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    selectTagAt(tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    selectInput() {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    }
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    removeTagAt(tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            const /** @type {?} */ tag = this.tags[tagIndex];
            const /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();
                // Remove the tag
                this.tags.splice(tagIndex, 1);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
                this.validate();
            }
        }
    }
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    canRemoveTagAt(tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    isInputVisible() {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    hasFocus() {
        return this.isValidSelectIndex(this.selectedIndex);
    }
    /**
     * @param {?} typeahead
     * @return {?}
     */
    connectTypeahead(typeahead) {
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
        }
    }
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    validateTag(tagValue) {
        let /** @type {?} */ inputPattern = null;
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
    }
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    createTag(tagValue) {
        let /** @type {?} */ tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        }
        else if (typeof this.display === 'string') {
            tag = {};
            tag[(this.display)] = tagValue;
        }
        else {
            tag = tagValue;
        }
        return tag;
    }
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    addTag(tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            const /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = this.tags || [];
                    this.tags.push(tag);
                    this.tagAdded.emit(new TagInputEvent(tag));
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    isValidTagIndex(tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    }
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    isValidSelectIndex(index) {
        return index >= 0 && index <= this.tags.length;
    }
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    getKeyChar(event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    }
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    splitTagInput(input) {
        let /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            const /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const /** @type {?} */ delimiterRegex = new RegExp(`[${escapedDelimiters}]`, 'g');
            tagValues = input.split(delimiterRegex).filter((s) => s.length > 0);
        }
        return tagValues;
    }
}
TagInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tag-input',
                template: `
      <ol>
          <li *ngFor="let tag of tags; let i = index" class="ux-tag"
              [class.disabled]="disabled"
              [attr.tabindex]="disabled ? null : i"
              [focusIf]="isSelected(i)"
              (click)="tagClickHandler($event, tag, i)"
              (focus)="selectTagAt(i)">
        
              <ng-container [ngTemplateOutlet]="tagTemplate"
                  [ngOutletContext]="{tag: tag, index: i, disabled: disabled, api: tagApi}">
              </ng-container>

          </li>
          <li *ngIf="isInputVisible()" class="ux-tag-input">
              <input #tagInput type="text" class="ux-tag-input"
                  [(ngModel)]="input"
                  [class.invalid]="!inputValid"
                  [placeholder]="disabled ? '' : (placeholder || '')"
                  [disabled]="disabled"
                  [focusIf]="isSelected(tags.length)"
                  (click)="inputClickHandler()"
                  (focus)="inputFocusHandler()"
                  (paste)="inputPasteHandler($event)">
          </li>
      </ol>

      <ng-content #typeahead></ng-content>

      <ng-template #defaultTagTemplate let-tag="tag" let-index="index" let-disabled="disabled" let-api="api">
          <span class="ux-tag-text">{{api.getTagDisplay(tag)}}</span>
          <button *ngIf="api.canRemoveTagAt(index)" type="button" class="ux-tag-remove" [disabled]="disabled" (click)="api.removeTagAt(index); $event.stopPropagation();"><i class="hpe-icon hpe-close"></i></button>
      </ng-template>
    `,
                providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
                host: {
                    '[class.disabled]': 'disabled',
                    '[class.focus]': 'hasFocus()',
                    '[class.invalid]': '!valid || !inputValid'
                }
            },] },
];
/**
 * @nocollapse
 */
TagInputComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
];
TagInputComponent.propDecorators = {
    'tags': [{ type: Input, args: ['tags',] },],
    'tagsChange': [{ type: Output },],
    'input': [{ type: Input, args: ['input',] },],
    'inputChange': [{ type: Output },],
    'display': [{ type: Input },],
    'addOnPaste': [{ type: Input },],
    'disabled': [{ type: Input },],
    'enforceTagLimits': [{ type: Input },],
    'freeInput': [{ type: Input },],
    'maxTags': [{ type: Input },],
    'minTags': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'showTypeaheadOnClick': [{ type: Input },],
    'tagDelimiters': [{ type: Input },],
    'tagPattern': [{ type: Input },],
    'tagTemplate': [{ type: Input },],
    'validationErrors': [{ type: Input },],
    'createTagHandler': [{ type: Input, args: ['createTag',] },],
    'tagAdding': [{ type: Output },],
    'tagAdded': [{ type: Output },],
    'tagInvalidated': [{ type: Output },],
    'tagRemoving': [{ type: Output },],
    'tagRemoved': [{ type: Output },],
    'tagClick': [{ type: Output },],
    'typeaheadQuery': [{ type: ContentChildren, args: [TypeaheadComponent,] },],
    'tagInput': [{ type: ViewChild, args: ['tagInput',] },],
    '_defaultTagTemplate': [{ type: ViewChild, args: ['defaultTagTemplate',] },],
    'keyHandler': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    'focusOutHandler': [{ type: HostListener, args: ['focusout', ['$event'],] },],
};

class FocusIfDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.focusIf = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.focusIf && changes.focusIf.previousValue === false && changes.focusIf.currentValue === true) {
            this.elementRef.nativeElement.focus();
        }
    }
}
FocusIfDirective.decorators = [
    { type: Directive, args: [{ selector: '[focusIf]' },] },
];
/**
 * @nocollapse
 */
FocusIfDirective.ctorParameters = () => [
    { type: ElementRef, },
];
FocusIfDirective.propDecorators = {
    'focusIf': [{ type: Input },],
};

class FocusIfModule {
}
FocusIfModule.decorators = [
    { type: NgModule, args: [{
                exports: [FocusIfDirective],
                declarations: [FocusIfDirective]
            },] },
];
/**
 * @nocollapse
 */
FocusIfModule.ctorParameters = () => [];

class TagInputModule {
}
TagInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    FocusIfModule,
                    TypeaheadModule$1
                ],
                exports: [TagInputComponent],
                declarations: [TagInputComponent],
                providers: [],
            },] },
];
/**
 * @nocollapse
 */
TagInputModule.ctorParameters = () => [];

class SelectModule {
}
SelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    InfiniteScrollModule,
                    TagInputModule,
                    TypeaheadModule$1
                ],
                exports: [SelectComponent],
                declarations: [SelectComponent]
            },] },
];
/**
 * @nocollapse
 */
SelectModule.ctorParameters = () => [];

class SliderComponent {
    /**
     * @param {?} colorService
     */
    constructor(colorService) {
        this.value = 0;
        this.valueChange = new EventEmitter();
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
                value: /** @type {?} */ (null)
            },
            upper: {
                hover: false,
                drag: false,
                position: 0,
                order: 101,
                value: /** @type {?} */ (null)
            }
        };
        // store all the ticks to display
        this.ticks = [];
        this._mouseMove = Observable$1.fromEvent(document, 'mousemove');
        this._mouseUp = Observable$1.fromEvent(document, 'mouseup');
        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: (value) => value
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
                        formatter: (value) => value
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: (value) => value
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
    /**
     * @return {?}
     */
    ngOnInit() {
        // set up event observables
        this.initObservables();
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        // check if value has changed
        if (!this.deepCompare(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(() => {
            this.updateTooltipPosition(SliderThumb.Lower);
            this.updateTooltipPosition(SliderThumb.Upper);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._lowerDrag.unsubscribe();
        this._upperDrag.unsubscribe();
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getFormattedValue(thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    }
    /**
     * @return {?}
     */
    initObservables() {
        // when a user begins to drag lower thumb - subscribe to mouse move events until the mouse is lifted
        this._lowerThumbDown = Observable$1.fromEvent(this.lowerThumb.nativeElement, 'mousedown');
        this._lowerDrag = this._lowerThumbDown.switchMap(event => {
            event.preventDefault();
            return this._mouseMove.takeUntil(this._mouseUp);
        }).subscribe(event => {
            event.preventDefault();
            this.updateThumbPosition(event, SliderThumb.Lower);
        });
        // when a user begins to drag upper thumb - subscribe to mouse move events until the mouse is lifted
        this._upperThumbDown = Observable$1.fromEvent(this.upperThumb.nativeElement, 'mousedown');
        this._upperDrag = this._upperThumbDown.switchMap(event => {
            event.preventDefault();
            return this._mouseMove.takeUntil(this._mouseUp);
        }).subscribe(event => {
            event.preventDefault();
            this.updateThumbPosition(event, SliderThumb.Upper);
        });
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getThumbState(thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    }
    /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    setThumbState(thumb, hover, drag) {
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
    }
    /**
     * @return {?}
     */
    onDragEnd() {
        // update thumb state here as we are not dragging any more
        this.thumbEvent(SliderThumb.Lower, SliderThumbEvent.DragEnd);
        this.thumbEvent(SliderThumb.Upper, SliderThumbEvent.DragEnd);
    }
    /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    thumbEvent(thumb, event) {
        // get the current thumb state
        let /** @type {?} */ state = this.getThumbState(thumb);
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
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltips(thumb) {
        let /** @type {?} */ visible = false;
        let /** @type {?} */ state = this.getThumbState(thumb);
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
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltipText(thumb) {
        // get the thumb value
        let /** @type {?} */ state = this.getThumbState(thumb);
        let /** @type {?} */ tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getThumbElement(thumb) {
        return thumb === SliderThumb.Lower ? this.lowerThumb : this.upperThumb;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getTooltipElement(thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getTooltip(thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltipPosition(thumb) {
        let /** @type {?} */ tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        let /** @type {?} */ tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        let /** @type {?} */ thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        let /** @type {?} */ tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        let /** @type {?} */ tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
    }
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    updateThumbPosition(event, thumb) {
        // get event position - either mouse or touch
        let /** @type {?} */ eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        let /** @type {?} */ mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        let /** @type {?} */ trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        let /** @type {?} */ position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        let /** @type {?} */ fraction = (position / trackBounds.width);
        // convert to value within the range
        let /** @type {?} */ value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
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
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateOrder(thumb) {
        let /** @type {?} */ lower = thumb === SliderThumb.Lower ? 101 : 100;
        let /** @type {?} */ upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    }
    /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    snapToTick(value, thumb) {
        // get the snap target
        let /** @type {?} */ snapTarget = this.options.track.ticks.snap;
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return value;
        }
        // get filtered ticks
        let /** @type {?} */ ticks;
        switch (snapTarget) {
            case SliderSnap.Minor:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Minor);
                break;
            case SliderSnap.Major:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Major);
                break;
            default:
                ticks = this.ticks.slice(0);
        }
        // get the track limit
        let /** @type {?} */ lowerLimit = this.options.track.min;
        let /** @type {?} */ upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        let /** @type {?} */ closest = ticks.filter(tick => tick.value >= lowerLimit && tick.value <= upperLimit)
            .reduceRight((previous, current) => {
            let /** @type {?} */ previousDistance = Math.max(previous.value, value) - Math.min(previous.value, value);
            let /** @type {?} */ currentDistance = Math.max(current.value, value) - Math.min(current.value, value);
            return previousDistance < currentDistance ? previous : current;
        });
        return closest.value;
    }
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    validateValue(thumb, value) {
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
    }
    /**
     * @return {?}
     */
    updateOptions() {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    }
    /**
     * @return {?}
     */
    updateValues() {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        let /** @type {?} */ lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        let /** @type {?} */ upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, lowerValue);
        upperValue = this.validateValue(SliderThumb.Upper, upperValue);
        // calculate the positions as percentages
        let /** @type {?} */ lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        let /** @type {?} */ upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;
        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;
        // update the value input
        this.setValue(lowerValue, upperValue);
    }
    /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    setValue(low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        let /** @type {?} */ previousValue = this.value;
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.value !== previousValue) {
            this.valueChange.emit(this.value);
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
    }
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    setThumbValue(thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    }
    /**
     * @return {?}
     */
    updateTicks() {
        // get tick options
        let /** @type {?} */ majorOptions = this.options.track.ticks.major;
        let /** @type {?} */ minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor
        let /** @type {?} */ majorTicks = this.getTicks(majorOptions, SliderTickType.Major);
        let /** @type {?} */ minorTicks = this.getTicks(minorOptions, SliderTickType.Minor);
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    }
    /**
     * @return {?}
     */
    updateTrackColors() {
        // get colors for each part of the track
        let /** @type {?} */ lower = this.options.track.colors.lower;
        let /** @type {?} */ range = this.options.track.colors.range;
        let /** @type {?} */ higher = this.options.track.colors.higher;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : `linear-gradient(to right, ${lower.join(', ')})`;
        this.tracks.middle.color = typeof range === 'string' ? range : `linear-gradient(to right, ${range.join(', ')})`;
        this.tracks.upper.color = typeof higher === 'string' ? higher : `linear-gradient(to right, ${higher.join(', ')})`;
    }
    /**
     * @param {?} steps
     * @return {?}
     */
    getSteps(steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        let /** @type {?} */ output = [];
        // otherwise calculate the steps
        for (let /** @type {?} */ idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    }
    /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    getTicks(options, type) {
        // create an array to store the ticks and step points
        let /** @type {?} */ steps = this.getSteps(options.steps);
        // get some chart options
        let /** @type {?} */ min = this.options.track.min;
        let /** @type {?} */ max = this.options.track.max;
        // convert each step to a slider tick and remove invalid ticks
        return steps.map(step => {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(tick => tick.position >= 0 && tick.position <= 100);
    }
    /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    unionTicks(majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter((tick, index, array) => tick.type === SliderTickType.Major || !array.find(tk => tk.type === SliderTickType.Major && tk.position === tick.position))
            .sort((t1, t2) => t1.value - t2.value);
    }
    /**
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    deepMerge(destination, source) {
        // loop though all of the properties in the source object
        for (let /** @type {?} */ prop in source) {
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
    }
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    deepCompare(value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            return value1 === value2;
        }
        return JSON.stringify(value1) === JSON.stringify(value2);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    clone(value) {
        if (typeof value !== 'object') {
            return value;
        }
        return Object.assign({}, value);
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-slider',
                template: `
      <div class="track" #track [class.narrow]="options.track.height === sliderSize.Narrow" [class.wide]="options.track.height === sliderSize.Wide" [class.range]="options.type === sliderType.Range">

          <!-- Section Beneath Lower Thumb -->
          <div class="track-section track-lower" [style.flex-grow]="tracks.lower.size" [style.background]="tracks.lower.color"></div>

          <!-- Lower Thumb Button / Line -->
          <div class="thumb lower" #lowerThumb [style.left.%]="thumbs.lower.position" [class.active]="thumbs.lower.drag" [style.z-index]="thumbs.lower.order" [class.button]="options.handles.style === sliderStyle.Button"
              [class.line]="options.handles.style === sliderStyle.Line" [class.narrow]="options.track.height === sliderSize.Narrow"
              [class.wide]="options.track.height === sliderSize.Wide" (mouseenter)="thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)"
              (mouseleave)="thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)" (mousedown)="thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart)">

              <!-- Lower Thumb Callout -->
              <div class="tooltip top tooltip-lower" #lowerTooltip [style.opacity]="tooltips.lower.visible ? 1 : 0" [style.left.px]="tooltips.lower.position">
                  <div class="tooltip-arrow" [style.border-top-color]="options.handles.callout.background"></div>
                  <div class="tooltip-inner" [style.background-color]="options.handles.callout.background" [style.color]="options.handles.callout.color">
                      {{ tooltips.lower.label }}
                  </div>
              </div>

          </div>

          <!-- Section of Track Between Lower and Upper Thumbs -->
          <div class="track-section track-range" *ngIf="options.type === sliderType.Range" [style.flex-grow]="tracks.middle.size" [style.background]="tracks.middle.color">
          </div>

          <!-- Upper Thumb Button / Line -->
          <div class="thumb upper" #upperThumb [hidden]="options.type !== sliderType.Range" [class.active]="thumbs.upper.drag" [style.left.%]="thumbs.upper.position" [style.z-index]="thumbs.upper.order"
              [class.button]="options.handles.style === sliderStyle.Button" [class.line]="options.handles.style === sliderStyle.Line"
              [class.narrow]="options.track.height === sliderSize.Narrow" [class.wide]="options.track.height === sliderSize.Wide" (mouseenter)="thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)"
              (mouseleave)="thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)" (mousedown)="thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart)">

              <!-- Upper Thumb Callout -->
              <div class="tooltip top tooltip-upper" #upperTooltip [style.opacity]="tooltips.upper.visible ? 1 : 0" [style.left.px]="tooltips.upper.position">
                  <div class="tooltip-arrow" [style.border-top-color]="options.handles.callout.background"></div>
                  <div class="tooltip-inner" *ngIf="options.type === sliderType.Range" [style.background-color]="options.handles.callout.background"
                      [style.color]="options.handles.callout.color">
                      {{ tooltips.upper.label }}
                  </div>
              </div>
          </div>

          <!-- Section of Track Abover Upper Thumb -->
          <div class="track-section track-higher" [style.flex-grow]="tracks.upper.size" [style.background]="tracks.upper.color"></div>

      </div>

      <!-- Chart Ticks and Tick Labels -->
      <div class="tick-container" *ngIf="options.track.ticks.major.show || options.track.ticks.minor.show" [class.show-labels]="options.track.ticks.major.labels || options.track.ticks.minor.labels">

          <div class="tick" *ngFor="let tick of ticks" [class.major]="tick.type === sliderTickType.Major" [class.minor]="tick.type === sliderTickType.Minor"
              [style.left.%]="tick.position" [hidden]="!tick.showTicks">
              <div class="tick-indicator"></div>
              <div class="tick-label" [hidden]="!tick.showLabels">{{ tick.label }}</div>
          </div>
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
SliderComponent.ctorParameters = () => [
    { type: ColorService, },
];
SliderComponent.propDecorators = {
    'value': [{ type: Input },],
    'options': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'lowerThumb': [{ type: ViewChild, args: ['lowerThumb',] },],
    'lowerTooltip': [{ type: ViewChild, args: ['lowerTooltip',] },],
    'upperThumb': [{ type: ViewChild, args: ['upperThumb',] },],
    'upperTooltip': [{ type: ViewChild, args: ['upperTooltip',] },],
    'track': [{ type: ViewChild, args: ['track',] },],
    'onDragEnd': [{ type: HostListener, args: ['document:mouseup', [],] },],
};
let SliderType = {};
SliderType.Value = 0;
SliderType.Range = 1;
SliderType[SliderType.Value] = "Value";
SliderType[SliderType.Range] = "Range";
let SliderStyle = {};
SliderStyle.Button = 0;
SliderStyle.Line = 1;
SliderStyle[SliderStyle.Button] = "Button";
SliderStyle[SliderStyle.Line] = "Line";
let SliderSize = {};
SliderSize.Narrow = 0;
SliderSize.Wide = 1;
SliderSize[SliderSize.Narrow] = "Narrow";
SliderSize[SliderSize.Wide] = "Wide";
let SliderCalloutTrigger = {};
SliderCalloutTrigger.None = 0;
SliderCalloutTrigger.Hover = 1;
SliderCalloutTrigger.Drag = 2;
SliderCalloutTrigger.Persistent = 3;
SliderCalloutTrigger[SliderCalloutTrigger.None] = "None";
SliderCalloutTrigger[SliderCalloutTrigger.Hover] = "Hover";
SliderCalloutTrigger[SliderCalloutTrigger.Drag] = "Drag";
SliderCalloutTrigger[SliderCalloutTrigger.Persistent] = "Persistent";
let SliderSnap = {};
SliderSnap.None = 0;
SliderSnap.Minor = 1;
SliderSnap.Major = 2;
SliderSnap.All = 3;
SliderSnap[SliderSnap.None] = "None";
SliderSnap[SliderSnap.Minor] = "Minor";
SliderSnap[SliderSnap.Major] = "Major";
SliderSnap[SliderSnap.All] = "All";
let SliderTickType = {};
SliderTickType.Minor = 0;
SliderTickType.Major = 1;
SliderTickType[SliderTickType.Minor] = "Minor";
SliderTickType[SliderTickType.Major] = "Major";
let SliderThumbEvent = {};
SliderThumbEvent.None = 0;
SliderThumbEvent.MouseOver = 1;
SliderThumbEvent.MouseLeave = 2;
SliderThumbEvent.DragStart = 3;
SliderThumbEvent.DragEnd = 4;
SliderThumbEvent[SliderThumbEvent.None] = "None";
SliderThumbEvent[SliderThumbEvent.MouseOver] = "MouseOver";
SliderThumbEvent[SliderThumbEvent.MouseLeave] = "MouseLeave";
SliderThumbEvent[SliderThumbEvent.DragStart] = "DragStart";
SliderThumbEvent[SliderThumbEvent.DragEnd] = "DragEnd";
let SliderThumb = {};
SliderThumb.Lower = 0;
SliderThumb.Upper = 1;
SliderThumb[SliderThumb.Lower] = "Lower";
SliderThumb[SliderThumb.Upper] = "Upper";

class SliderModule {
}
SliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ColorServiceModule
                ],
                exports: [SliderComponent],
                declarations: [SliderComponent]
            },] },
];
/**
 * @nocollapse
 */
SliderModule.ctorParameters = () => [];

class SparkComponent {
    /**
     * @param {?} colorService
     */
    constructor(colorService) {
        this.colorService = colorService;
        this.trackColor = this.colorService.getColor('primary').setAlpha(0.2).toRgba();
        this.barColor = this.colorService.getColor('primary').toHex();
        this.value = 0;
        this.barHeight = 10;
    }
    /**
     * @param {?} themeName
     * @return {?}
     */
    set theme(themeName) {
        this.trackColor = this.colorService.getColor(themeName).setAlpha(0.2).toRgba();
        this.barColor = this.colorService.getColor(themeName).toHex();
    }
}
SparkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-spark',
                template: `
      <!-- Inline Spark Chart -->
      <div *ngIf="inlineLabel" class="ux-spark-inline-label-container">

          <div class="ux-spark-inline-label-left" [innerHtml]="inlineLabel"></div>

          <div class="ux-spark-line">

              <div class="ux-spark-top-container" *ngIf="topLeftLabel || topRightLabel">
                  <div class="ux-spark-label-top-left" *ngIf="topLeftLabel" [innerHtml]="topLeftLabel"></div>
                  <div class="ux-spark-label-top-right" *ngIf="topRightLabel" [innerHtml]="topRightLabel"></div>
              </div>

              <div class="ux-spark ux-inline" [style.height.px]="barHeight" [style.backgroundColor]="trackColor" [tooltip]="tooltip">
                  <div class="ux-spark-bar" [style.width]="(value < 100 ? value : 100) + '%'" [style.backgroundColor]="barColor"></div>
              </div>

              <div class="ux-spark-bottom-container" *ngIf="bottomLeftLabel || bottomRightLabel">
                  <div class="ux-spark-label-bottom-left" *ngIf="bottomLeftLabel" [innerHtml]="bottomLeftLabel"></div>
                  <div class="ux-spark-label-bottom-right" *ngIf="bottomRightLabel" [innerHtml]="bottomRightLabel"></div>
              </div>

          </div>
      </div>

      <!-- End Inline Spark Chart -->


      <!-- Non Inline Spark Chart -->
      <div *ngIf="!inlineLabel">

          <div class="ux-spark-top-container" *ngIf="topLeftLabel || topRightLabel">
              <div class="ux-spark-label-top-left" *ngIf="topLeftLabel" [innerHtml]="topLeftLabel"></div>
              <div class="ux-spark-label-top-right" *ngIf="topRightLabel" [innerHtml]="topRightLabel"></div>
          </div>

          <div class="ux-spark" [style.height.px]="barHeight" [style.backgroundColor]="trackColor" [tooltip]="tooltip">
              <div class="ux-spark-bar" [style.width]="(value < 100 ? value : 100) + '%'" [style.backgroundColor]="barColor"></div>
          </div>

          <div class="ux-spark-bottom-container" *ngIf="bottomLeftLabel || bottomRightLabel">
              <div class="ux-spark-label-bottom-left" *ngIf="bottomLeftLabel" [innerHtml]="bottomLeftLabel"></div>
              <div class="ux-spark-label-bottom-right" *ngIf="bottomRightLabel" [innerHtml]="bottomRightLabel"></div>
          </div>
      </div>

      <!-- End Non Inline Spark Chart -->
    `
            },] },
];
/**
 * @nocollapse
 */
SparkComponent.ctorParameters = () => [
    { type: ColorService, },
];
SparkComponent.propDecorators = {
    'trackColor': [{ type: Input },],
    'barColor': [{ type: Input },],
    'value': [{ type: Input },],
    'barHeight': [{ type: Input },],
    'inlineLabel': [{ type: Input },],
    'topLeftLabel': [{ type: Input },],
    'topRightLabel': [{ type: Input },],
    'bottomLeftLabel': [{ type: Input },],
    'bottomRightLabel': [{ type: Input },],
    'tooltip': [{ type: Input },],
    'theme': [{ type: Input },],
};

class SparkModule {
}
SparkModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ColorServiceModule,
                    TooltipModule.forRoot()
                ],
                exports: [SparkComponent],
                declarations: [SparkComponent]
            },] },
];
/**
 * @nocollapse
 */
SparkModule.ctorParameters = () => [];

const TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};
class ToggleSwitchComponent {
    constructor() {
        this.name = '';
        this.disabled = false;
        this.clickable = true;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // Update value output
        this.valueChange.emit(value);
        // Notify ngModel
        this.onChangeCallback(value);
    }
    /**
     * @return {?}
     */
    toggleChecked() {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        // if spacebar is pressed toggle state
        if (event.keyCode === 32) {
            this.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = !!value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
ToggleSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-toggleswitch',
                template: `
      <div class="ux-toggleswitch" 
        tabindex="0"
        (keydown)="keydown($event)"
        [class.checked]="value === true"
        [class.disabled]="disabled === true">

        <span class="ux-toggleswitch-bg"></span>
  
        <span class="ux-toggleswitch-nub"></span>

        <input type="checkbox" 
          role="checkbox"
          [name]="name" 
          [checked]="value === true"
          [disabled]="disabled === true"
          tabindex="-1" />
      </div>

      <div class="ux-toggleswitch-content">
        <ng-content></ng-content>
      </div>
    `,
                providers: [TOGGLESWITCH_VALUE_ACCESSOR],
                host: {
                    '(click)': 'toggleChecked()'
                }
            },] },
];
/**
 * @nocollapse
 */
ToggleSwitchComponent.ctorParameters = () => [];
ToggleSwitchComponent.propDecorators = {
    'name': [{ type: Input },],
    'disabled': [{ type: Input },],
    'clickable': [{ type: Input },],
    'valueChange': [{ type: Output },],
    'value': [{ type: Input },],
};

class ToggleSwitchModule {
}
ToggleSwitchModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [ToggleSwitchComponent],
                declarations: [ToggleSwitchComponent]
            },] },
];
/**
 * @nocollapse
 */
ToggleSwitchModule.ctorParameters = () => [];

class FrameExtractionService {
    /**
     * @param {?} source
     * @return {?}
     */
    createVideoPlayer(source) {
        let /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    }
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    createCanvas(width, height) {
        let /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    goToFrame(videoPlayer, time) {
        videoPlayer.currentTime = time;
        return Observable$1.fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    }
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    getThumbnail(videoPlayer, canvas, time, width = 160, height = 90) {
        return Observable$1.create((observer) => {
            // go to specified frame
            let /** @type {?} */ subscription = this.goToFrame(videoPlayer, time).subscribe((event) => {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    getFrameThumbnail(source, width, height, time) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        let /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished        
        frameSubscription.subscribe(null, null, () => {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    getFrameThumbnails(source, width, height, start, end, skip = 5) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable$1.create((observer) => {
            Observable$1.fromEvent(videoPlayer, 'loadedmetadata').subscribe(() => {
                // calculate the frames required
                let /** @type {?} */ frames = [];
                for (let /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                Observable$1.concat(...frames).subscribe((frame) => observer.next(frame), null, () => {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    }
}
FrameExtractionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FrameExtractionService.ctorParameters = () => [];

class FrameExtractionModule {
}
FrameExtractionModule.decorators = [
    { type: NgModule, args: [{
                providers: [FrameExtractionService],
            },] },
];
/**
 * @nocollapse
 */
FrameExtractionModule.ctorParameters = () => [];

class MediaPlayerService {
    /**
     * @param {?} _frameExtractionService
     */
    constructor(_frameExtractionService) {
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
            Create observables for media player events
        */
        this.playing = new BehaviorSubject$1(false);
        this.initEvent = new BehaviorSubject$1(false);
        this.abortEvent = new Subject$1();
        this.canPlayEvent = new BehaviorSubject$1(false);
        this.canPlayThroughEvent = new BehaviorSubject$1(false);
        this.durationChangeEvent = new Subject$1();
        this.endedEvent = new Subject$1();
        this.errorEvent = new Subject$1();
        this.loadedDataEvent = new Subject$1();
        this.loadedMetadataEvent = new Subject$1();
        this.loadStartEvent = new Subject$1();
        this.pauseEvent = new Subject$1();
        this.playEvent = new Subject$1();
        this.playingEvent = new Subject$1();
        this.rateChangeEvent = new Subject$1();
        this.seekedEvent = new Subject$1();
        this.seekingEvent = new Subject$1();
        this.stalledEvent = new Subject$1();
        this.suspendEvent = new Subject$1();
        this.timeUpdateEvent = new Subject$1();
        this.volumeChangeEvent = new Subject$1();
        this.waitingEvent = new Subject$1();
        this.mediaClickEvent = new Subject$1();
        this.fullscreenEvent = new BehaviorSubject$1(false);
        this.quietModeEvent = new BehaviorSubject$1(false);
        this.progressEvent = Observable$1.create((observer) => {
            // repeat until the whole video has fully loaded
            let /** @type {?} */ interval = setInterval(() => {
                let /** @type {?} */ buffered = (this._mediaPlayer.buffered);
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    /**
     * @return {?}
     */
    get mediaPlayer() {
        return this._mediaPlayer;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this._quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        // quiet mode cannot be enabled on audio player
        if (this.type === 'audio') {
            value = false;
        }
        this._quietMode = value;
        this.quietModeEvent.next(value);
    }
    /**
     * @return {?}
     */
    get mediaPlayerWidth() {
        return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
    }
    /**
     * @return {?}
     */
    get mediaPlayerHeight() {
        return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
    }
    /**
     * @return {?}
     */
    get audioTracks() {
        return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
    }
    /**
     * @return {?}
     */
    get autoplay() {
        return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this._mediaPlayer.autoplay = value;
    }
    /**
     * @return {?}
     */
    get buffered() {
        return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get crossOrigin() {
        return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set crossOrigin(value) {
        this._mediaPlayer.crossOrigin = value;
    }
    /**
     * @return {?}
     */
    get currentSrc() {
        return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
    }
    /**
     * @return {?}
     */
    get currentTime() {
        return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentTime(value) {
        this._mediaPlayer.currentTime = value;
    }
    /**
     * @return {?}
     */
    get defaultMuted() {
        return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultMuted(value) {
        this._mediaPlayer.defaultMuted = value;
    }
    /**
     * @return {?}
     */
    get defaultPlaybackRate() {
        return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultPlaybackRate(value) {
        this._mediaPlayer.defaultPlaybackRate = value;
    }
    /**
     * @return {?}
     */
    get duration() {
        return this._mediaPlayer ? this._mediaPlayer.duration : 0;
    }
    /**
     * @return {?}
     */
    get ended() {
        return this._mediaPlayer ? this._mediaPlayer.ended : false;
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._mediaPlayer ? this._mediaPlayer.loop : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this._mediaPlayer.loop = value;
    }
    /**
     * @return {?}
     */
    get muted() {
        return this._mediaPlayer ? this._mediaPlayer.muted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set muted(value) {
        this._mediaPlayer.muted = value;
    }
    /**
     * @return {?}
     */
    get networkState() {
        return this._mediaPlayer.networkState;
    }
    /**
     * @return {?}
     */
    get paused() {
        return this._mediaPlayer ? this._mediaPlayer.paused : true;
    }
    /**
     * @return {?}
     */
    get playbackRate() {
        return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set playbackRate(value) {
        this._mediaPlayer.playbackRate = value;
    }
    /**
     * @return {?}
     */
    get played() {
        return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get preload() {
        return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preload(value) {
        this._mediaPlayer.preload = value;
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
    }
    /**
     * @return {?}
     */
    get seekable() {
        return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get seeking() {
        return this._mediaPlayer ? this._mediaPlayer.seeking : false;
    }
    /**
     * @return {?}
     */
    get src() {
        return this._mediaPlayer ? this._mediaPlayer.src : '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set src(value) {
        this._mediaPlayer.src = value;
    }
    /**
     * @return {?}
     */
    get textTracks() {
        return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
    }
    /**
     * @return {?}
     */
    get videoTracks() {
        return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._mediaPlayer ? this._mediaPlayer.volume : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        this._mediaPlayer.volume = value;
    }
    /**
     * @return {?}
     */
    get fullscreen() {
        return this._mediaPlayer ? this._fullscreen : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fullscreen(value) {
        this._fullscreen = value;
        this.fullscreenEvent.next(value);
    }
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    setMediaPlayer(hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    }
    /**
     * Toggle playing state
     * @return {?}
     */
    togglePlay() {
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
    }
    /**
     * Starts playing the audio/video
     * @return {?}
     */
    play() {
        this._mediaPlayer.play();
    }
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    pause() {
        this._mediaPlayer.pause();
    }
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    load() {
        this._mediaPlayer.load();
    }
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    canPlayType(type) {
        return this._mediaPlayer.canPlayType(type);
    }
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    addTextTrack(kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    }
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    requestFullscreen() {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if (((this._hostElement)).msRequestFullscreen) {
            ((this._hostElement)).msRequestFullscreen();
        }
        else if (((this._hostElement)).mozRequestFullScreen) {
            ((this._hostElement)).mozRequestFullScreen();
        }
    }
    /**
     * Exit full screen mode
     * @return {?}
     */
    exitFullscreen() {
        if (((this._hostElement)).exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (((document)).msExitFullscreen) {
            ((document)).msExitFullscreen();
        }
        else if (((document)).mozCancelFullScreen) {
            ((document)).mozCancelFullScreen();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    fullscreenChange(event) {
        this.fullscreen = ((document)).fullscreen || document.webkitIsFullScreen || ((document)).mozFullScreen || ((document)).msFullscreenElement !== null && ((document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    }
    /**
     * Toggle Fullscreen State
     * @return {?}
     */
    toggleFullscreen() {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    }
    /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    getFrames(width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return Observable$1.from([]);
    }
}
MediaPlayerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MediaPlayerService.ctorParameters = () => [
    { type: FrameExtractionService, },
];

class AudioService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    getAudioFileMetadata(mediaElement) {
        return Observable$1.create((observer) => {
            this._http.request(mediaElement.src, { responseType: ResponseContentType.Blob }).subscribe(response => {
                let /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                let /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                let /** @type {?} */ blob = response.blob();
                let /** @type {?} */ description;
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
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getWaveformFromUrl(url) {
        // if audio context is not support return a stream of empty data
        if (!((window)).AudioContext) {
            return Observable$1.of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable$1.create((observer) => {
            // load the media from the URL provided
            this._http.request(url, { responseType: ResponseContentType.ArrayBuffer }).subscribe(response => {
                this.getAudioBuffer(response.arrayBuffer()).subscribe(audioBuffer => {
                    // create the buffer source
                    this.createBufferSource(audioBuffer);
                    let /** @type {?} */ dataPoints = [];
                    let /** @type {?} */ channels = this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (let /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = this._audioBuffer.getChannelData(channelIdx);
                    }
                    observer.next(dataPoints);
                    observer.complete();
                    // cleanup after ourselves
                    dataPoints = null;
                }, (error) => observer.error(error));
            }, (error) => observer.error(error));
        });
    }
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    getWaveformPoints(channels = [], skip = 1000) {
        let /** @type {?} */ waveform = [];
        let /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        // convert each channel data to a series of waveform points
        for (let /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            // get all the channel data for a specific point
            let /** @type {?} */ points = channels.map(channel => channel[idx]);
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce((previous, current) => current < previous ? current : previous),
                max: points.reduce((previous, current) => current > previous ? current : previous)
            });
        }
        return waveform;
    }
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    getAudioBuffer(arrayBuffer) {
        return Observable$1.create((observer) => {
            this.getOfflineAudioContext().decodeAudioData(arrayBuffer, (audioBuffer) => {
                observer.next(audioBuffer);
                observer.complete();
            }, (error) => observer.error(error));
        });
    }
    /**
     * @return {?}
     */
    getOfflineAudioContext() {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    }
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    createBufferSource(audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    }
    /**
     * @return {?}
     */
    createVolumeNode() {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    }
    /**
     * @return {?}
     */
    createAnalyserNode() {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    }
    /**
     * @return {?}
     */
    disconnectSource() {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    }
}
AudioService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AudioService.ctorParameters = () => [
    { type: Http, },
];

class AudioServiceModule {
}
AudioServiceModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpModule
                ],
                providers: [AudioService]
            },] },
];
/**
 * @nocollapse
 */
AudioServiceModule.ctorParameters = () => [];

class MediaPlayerComponent {
    /**
     * @param {?} mediaPlayerService
     * @param {?} _audioService
     * @param {?} _elementRef
     */
    constructor(mediaPlayerService, _audioService, _elementRef) {
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        // show controls when hovering and in quiet mode
        this._hover$ = Observable$1.fromEvent(this._elementRef.nativeElement, 'mousemove').switchMap((event) => {
            this.hovering = true;
            return Observable$1.of(event);
        }).debounceTime(2000).subscribe(() => this.hovering = false);
    }
    /**
     * @return {?}
     */
    get source() {
        return this.mediaPlayerService.source;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set source(value) {
        this.mediaPlayerService.source = value;
    }
    /**
     * @return {?}
     */
    get type() {
        return this.mediaPlayerService.type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this.mediaPlayerService.type = value;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this.mediaPlayerService.quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        this.mediaPlayerService.quietMode = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this._playing$ = this.mediaPlayerService.playingEvent.subscribe(event => this.mediaPlayerService.playing.next(true));
        this._paused$ = this.mediaPlayerService.pauseEvent.subscribe(event => this.mediaPlayerService.playing.next(false));
        this._clicked$ = this.mediaPlayerService.mediaClickEvent.subscribe(() => this.mediaPlayerService.togglePlay());
        this._loading$ = this.mediaPlayerService.loadedMetadataEvent.subscribe(() => this.mediaPlayerService.loaded = true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._hover$.unsubscribe();
        this._playing$.unsubscribe();
        this._paused$.unsubscribe();
        this._clicked$.unsubscribe();
        this._loading$.unsubscribe();
    }
}
MediaPlayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player',
                template: `
      <div class="video-player-container" *ngIf="type === 'video'">

          <video class="video-player" #player [src]="source" (abort)="mediaPlayerService.abortEvent.next()" (canplay)="mediaPlayerService.canPlayEvent.next()"
              (canplaythrough)="mediaPlayerService.canPlayThroughEvent.next()" (durationchange)="mediaPlayerService.durationChangeEvent.next(player.duration)" (ended)="mediaPlayerService.endedEvent.next()"
              (error)="mediaPlayerService.errorEvent.next($event)" (loadeddata)="mediaPlayerService.loadedDataEvent.next($event)" (loadedmetadata)="mediaPlayerService.loadedMetadataEvent.next($event)"
              (loadstart)="mediaPlayerService.loadStartEvent.next()" (pause)="mediaPlayerService.pauseEvent.next()" (play)="mediaPlayerService.playEvent.next()" (playing)="mediaPlayerService.playingEvent.next(!player.paused)"
              (ratechange)="mediaPlayerService.rateChangeEvent.next(player.playbackRate)" (seeked)="mediaPlayerService.seekedEvent.next(player.currentTime)" (seeking)="mediaPlayerService.seekingEvent.next(player.currentTime)"
              (stalled)="mediaPlayerService.stalledEvent.next()" (suspend)="mediaPlayerService.suspendEvent.next()" (timeupdate)="mediaPlayerService.timeUpdateEvent.next(player.currentTime)"
              (volumechange)="mediaPlayerService.volumeChangeEvent.next(player.volume)" (waiting)="mediaPlayerService.waitingEvent.next()" (click)="mediaPlayerService.mediaClickEvent.next($event)"></video>

          <div class="video-overlay" [class.playing]="mediaPlayerService.playing | async">
              <svg class="play-graphic" x="0px" y="0px" viewBox="0 0 64 64">
                  <circle class="play-circle" cx="32.2" cy="31.8" r="31.8" />
                  <polygon class="play-triangle" points="23,14.1 23,50.8 48.3,32.5" />
              </svg>
          </div>

      </div>


      <div class="audio-player" *ngIf="type === 'audio'">

          <svg width="24px" height="24px" viewBox="0 0 24 24">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-98.000000, -458.000000)">
                      <g transform="translate(98.000000, 458.000000)">
                          <path d="M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z" fill="#CCEAE2"></path>
                          <path d="M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5" stroke="#60798D" fill="#CCEAE2"></path>
                          <path d="M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z" stroke="#60798D" fill="#85D2BE"></path>
                          <path d="M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532"
                              stroke="#60798D"></path>
                          <path d="M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23" stroke="#60798D"></path>
                          <path d="M17.5219116,0.761413574 L17.5219116,6 L23,6" stroke="#60798D" fill="#85D2BE"></path>
                      </g>
                  </g>
              </g>
          </svg>

          <p class="audio-file-name">{{ (audioMetadata | async)?.filename }}</p>
          <p class="audio-file-format">{{ (audioMetadata | async)?.description }}</p>
          <p class="audio-file-size">{{ (audioMetadata | async)?.size | fileSize }}</p>

          <audio #player [src]="source" (abort)="mediaPlayerService.abortEvent.next()" (canplay)="mediaPlayerService.canPlayEvent.next(true)"
              (canplaythrough)="mediaPlayerService.canPlayThroughEvent.next(true)" (durationchange)="mediaPlayerService.durationChangeEvent.next(player.duration)" (ended)="mediaPlayerService.endedEvent.next()"
              (error)="mediaPlayerService.errorEvent.next($event)" (loadeddata)="mediaPlayerService.loadedDataEvent.next($event)" (loadedmetadata)="mediaPlayerService.loadedMetadataEvent.next($event)"
              (loadstart)="mediaPlayerService.loadStartEvent.next()" (pause)="mediaPlayerService.pauseEvent.next()" (play)="mediaPlayerService.playEvent.next()" (playing)="mediaPlayerService.playingEvent.next(!player.paused)"
              (ratechange)="mediaPlayerService.rateChangeEvent.next(player.playbackRate)" (seeked)="mediaPlayerService.seekedEvent.next(player.currentTime)" (seeking)="mediaPlayerService.seekingEvent.next(player.currentTime)"
              (stalled)="mediaPlayerService.stalledEvent.next()" (suspend)="mediaPlayerService.suspendEvent.next()" (timeupdate)="mediaPlayerService.timeUpdateEvent.next(player.currentTime)"
              (volumechange)="mediaPlayerService.volumeChangeEvent.next(player.volume)" (waiting)="mediaPlayerService.waitingEvent.next()" (click)="mediaPlayerService.mediaClickEvent.next($event)"></audio>
      </div>

      <div class="control-bar">
          <ux-media-player-timeline></ux-media-player-timeline>
          <ux-media-player-controls></ux-media-player-controls>
      </div>
    `,
                providers: [MediaPlayerService],
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
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerComponent.ctorParameters = () => [
    { type: MediaPlayerService, },
    { type: AudioService, },
    { type: ElementRef, },
];
MediaPlayerComponent.propDecorators = {
    '_playerRef': [{ type: ViewChild, args: ['player',] },],
    '_trackBarRef': [{ type: ViewChild, args: ['trackBar',] },],
    'source': [{ type: Input },],
    'type': [{ type: Input },],
    'quietMode': [{ type: Input },],
};

class MediaPlayerBaseExtensionDirective {
    /**
     * @param {?} mediaPlayerService
     */
    constructor(mediaPlayerService) {
        this.mediaPlayerService = mediaPlayerService;
    }
}
MediaPlayerBaseExtensionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mediaPlayerBaseExtension]'
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerBaseExtensionDirective.ctorParameters = () => [
    { type: MediaPlayerService, },
];

class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.position = 0;
        this.duration = 0;
        this.buffered = [];
        this.mouseDown = false;
        this.quietMode = false;
        this.fullscreen = false;
        this.scrub = {
            visible: false,
            position: 0,
            time: 0
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.subscribe(duration => this.duration = duration);
        this.mediaPlayerService.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.fullscreenEvent.subscribe(fullscreen => {
            this.fullscreen = fullscreen;
            this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.subscribe(current => {
            this.current = current;
            this.position = (this.current / this.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.subscribe((buffered) => {
            this.buffered = [];
            for (let /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({ start: (buffered.start(idx) / this.duration) * 100, end: (buffered.end(idx) / this.duration) * 100 });
            }
        });
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    updateScrub(event) {
        let /** @type {?} */ timeline = (this.timelineRef.nativeElement);
        let /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }
}
MediaPlayerTimelineExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-timeline',
                template: `
      <p class="current-time">{{ current | duration }}</p>

      <div #timeline class="timeline-bar" (mouseenter)="scrub.visible = true; pop.show()" (mouseleave)="scrub.visible = false; pop.hide()"
          (mousemove)="updateScrub($event)" (mouseup)="updateScrub($event)" (mousedown)="mouseDown = true; $event.preventDefault()">

          <div class="buffered-bar" *ngFor="let buffer of buffered" [style.left.%]="buffer.start" [style.width.%]="buffer.end - buffer.start"></div>

          <div class="media-progress-bar" [style.width.%]="position"></div>

          <div class="scrub-handle" [style.left.px]="scrub.position" [tooltip]="popTemplate" placement="top" triggers="" #pop="bs-tooltip"
              container="body" tooltipPopupDelay="100" [isDisabled]="duration === 0"></div>

      </div>

      <p class="duration-time">{{ duration | duration }}</p>

      <ng-template #popTemplate>
          <span>{{ scrub.time | duration }}</span>
      </ng-template>
    `,
                host: {
                    '(document:mouseup)': 'mouseDown = false',
                    '[class.quiet]': 'quietMode || fullscreen'
                }
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerTimelineExtensionComponent.ctorParameters = () => [];
MediaPlayerTimelineExtensionComponent.propDecorators = {
    'timelineRef': [{ type: ViewChild, args: ['timeline',] },],
};

class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.fullscreen = false;
        this.volumeActive = false;
        this.volumeDragging = false;
        this._volume = 50;
        this._previousVolume = 50;
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._volume;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        if (value === 0 && this._volume !== 0) {
            this._previousVolume = this._volume;
        }
        this._volume = Math.min(Math.max(value, 0), 100);
        this.mediaPlayerService.volume = this._volume / 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mediaPlayerService.playEvent.subscribe(_ => this.playing = true);
        this.mediaPlayerService.pauseEvent.subscribe(_ => this.playing = false);
        this.mediaPlayerService.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.volumeChangeEvent.subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.debounceTime(1).filter(init => init === true).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mediaPlayerService.fullscreenEvent.subscribe(fullscreen => this.fullscreen = fullscreen);
        let /** @type {?} */ mouseenter$ = Observable$1.fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        let /** @type {?} */ mouseenterContainer$ = Observable$1.fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        let /** @type {?} */ mouseleaveContainer$ = Observable$1.fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.subscribe(() => this.volumeActive = true);
        mouseleaveContainer$.switchMap(() => Observable$1.timer(1500).takeUntil(mouseenterContainer$)).subscribe(() => this.volumeActive = false);
    }
    /**
     * @return {?}
     */
    toggleMute() {
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    }
    /**
     * @return {?}
     */
    togglePlay() {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    }
    /**
     * @return {?}
     */
    setFullscreen() {
        this.mediaPlayerService.toggleFullscreen();
    }
    /**
     * @return {?}
     */
    goToStart() {
        this.mediaPlayerService.currentTime = 0;
    }
    /**
     * @return {?}
     */
    goToEnd() {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        event.preventDefault();
        this.volumeDragging = true;
        let /** @type {?} */ thumb = (event.target);
        thumb.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragMove(event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        let /** @type {?} */ slider = (this.volumeSlider.nativeElement);
        let /** @type {?} */ bounds = slider.getBoundingClientRect();
        let /** @type {?} */ x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    }
    /**
     * @return {?}
     */
    dragEnd() {
        this.volumeDragging = false;
    }
}
MediaPlayerControlsExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-controls',
                template: `
      <div class="volume-container">

          <div class="volume-slider-container" #volumeContainer [class.active]="volumeActive">
              <div class="volume-slider-icon" #volumeIcon>
                  <span class="hpe-icon" [class.hpe-volume-mute]="volume === 0" [class.hpe-volume-low]="volume > 0 && volume <= 70" [class.hpe-volume]="volume > 70" [tooltip]="muteTooltip" (click)="toggleMute()"></span>
              </div>
        
              <div class="volume-slider-node">
                  <div class="volume-slider" #volumeSlider>
                      <div class="volume-track-lower" [style.width.%]="volume"></div>
                      <div class="volume-slider-thumb" (mousedown)="dragStart($event)" [style.left.%]="volume" tabindex="0" (keydown.ArrowRight)="volume = volume + 10" (keydown.ArrowLeft)="volume = volume - 10"></div>
                  </div>
              </div>
          </div>
      </div>

      <div class="spacer"></div>

      <svg viewBox="0 0 51.5 64" width="14" height="17" class="control-button" (click)="goToStart()">
          <rect x="0" y="0" width="7.5" height="64" />
          <polygon points="51.5,64 51.5,0 7.4,32 " />
      </svg>

      <svg viewBox="0 0 45 64" width="20" height="29" class="control-button" *ngIf="!playing" (click)="togglePlay()">
          <polygon points="0.4,0 0.4,64 44.6,32" />
      </svg>

      <svg viewBox="0 0 43 56.9" class="control-button" width="20" height="29" *ngIf="playing" (click)="togglePlay()">
          <rect y="0.1" width="15.7" height="56.9" />
          <rect x="27.3" y="0.1" width="15.7" height="56.9" />
      </svg>

      <svg viewBox="0 0 51.5 64" width="14" height="17" class="control-button" (click)="goToEnd()">
          <rect x="44.1" y="0" width="7.5" height="64" />
          <polygon points="0,64 0,0 44.1,32 " />
      </svg>

      <div class="spacer"></div>

      <span class="hpe-icon" *ngIf="mediaPlayerService.type !== 'audio'" [class.hpe-expand]="!mediaPlayerService.fullscreen" [class.hpe-contract]="mediaPlayerService.fullscreen"
          (click)="setFullscreen()"></span>

      <ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>
    `,
                host: {
                    '[class.quiet]': 'quietMode || fullscreen'
                }
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerControlsExtensionComponent.ctorParameters = () => [];
MediaPlayerControlsExtensionComponent.propDecorators = {
    'volumeIcon': [{ type: ViewChild, args: ['volumeIcon',] },],
    'volumeSlider': [{ type: ViewChild, args: ['volumeSlider',] },],
    'volumeContainer': [{ type: ViewChild, args: ['volumeContainer',] },],
    'dragMove': [{ type: HostListener, args: ['document:mousemove', ['$event'],] },],
    'dragEnd': [{ type: HostListener, args: ['document:mouseup',] },],
};

class DurationPipe {
    /**
     * @param {?} seconds
     * @return {?}
     */
    transform(seconds) {
        let /** @type {?} */ minutes = Math.floor(seconds / 60);
        let /** @type {?} */ hours = Math.floor(minutes / 60);
        let /** @type {?} */ days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        }
        else {
            return `${this.pad(minutes)}:${this.pad(seconds)}`;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    pad(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }
}
DurationPipe.decorators = [
    { type: Pipe, args: [{
                name: 'duration'
            },] },
];
/**
 * @nocollapse
 */
DurationPipe.ctorParameters = () => [];

class DurationPipeModule {
}
DurationPipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [DurationPipe],
                declarations: [DurationPipe]
            },] },
];
/**
 * @nocollapse
 */
DurationPipeModule.ctorParameters = () => [];

class FileSizePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        // allow for async values
        if (!value) {
            return value;
        }
        let /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        let /** @type {?} */ idx = Math.floor(Math.log(value) / Math.log(1024));
        let /** @type {?} */ formattedValue = value / Math.pow(1024, idx);
        return `${formattedValue.toFixed(2)} ${units[idx]}`;
    }
}
FileSizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileSize'
            },] },
];
/**
 * @nocollapse
 */
FileSizePipe.ctorParameters = () => [];

class FileSizePipeModule {
}
FileSizePipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [FileSizePipe],
                declarations: [FileSizePipe]
            },] },
];
/**
 * @nocollapse
 */
FileSizePipeModule.ctorParameters = () => [];

const DECLARATIONS$4 = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];
class MediaPlayerModule {
}
MediaPlayerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FrameExtractionModule,
                    TooltipModule.forRoot(),
                    AudioServiceModule,
                    DurationPipeModule,
                    FileSizePipeModule
                ],
                exports: DECLARATIONS$4,
                declarations: DECLARATIONS$4,
                providers: [MediaPlayerService]
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerModule.ctorParameters = () => [];

class VirtualScrollLoadingDirective {
}
VirtualScrollLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollLoading]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollLoadingDirective.ctorParameters = () => [];

class VirtualScrollLoadButtonDirective {
}
VirtualScrollLoadButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollLoadButton]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollLoadButtonDirective.ctorParameters = () => [];

class VirtualScrollCellDirective {
}
VirtualScrollCellDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollCell]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollCellDirective.ctorParameters = () => [];

class VirtualScrollComponent {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     * @param {?} renderer
     */
    constructor(_elementRef, resizeService, renderer) {
        this._elementRef = _elementRef;
        this.collection = Observable$1.create();
        this.loadOnScroll = true;
        this.loading = new EventEmitter();
        this.cells = new BehaviorSubject$1([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement, renderer).subscribe(event => this._height = event.height);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.collection && changes.collection.currentValue !== changes.collection.previousValue && !changes.collection.isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setupObservable() {
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(collection => {
            this.data.push(...collection);
            this.renderCells();
            this.isLoading = false;
        }, null, () => {
            this.loadingComplete = true;
        });
    }
    /**
     * @return {?}
     */
    renderCells() {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            const /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    }
    /**
     * @return {?}
     */
    getVisibleCells() {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        const /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        const /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        const /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    }
    /**
     * @return {?}
     */
    getTotalHeight() {
        return this.cellHeight * this.data.length;
    }
    /**
     * @return {?}
     */
    loadNextPage() {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    }
    /**
     * @return {?}
     */
    reset() {
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
    }
}
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-virtual-scroll',
                template: `
      <div class="virtual-scroll-content-height" [style.height.px]="getTotalHeight()"></div>
      <div class="virtual-scroll-content" [style.transform]="'translateY(' + scrollTop + 'px)'">

          <!-- Virtually Render Cells -->
          <ng-container *ngFor="let cell of cells | async">
              <ng-container *ngTemplateOutlet="cellTemplate; context: { cell: cell }"></ng-container>
          </ng-container>

          <!-- Loading Indicator -->
          <ng-container *ngIf="loadingIndicatorTemplate && isLoading" [ngTemplateOutlet]="loadingIndicatorTemplate"></ng-container>

          <!-- Loading Button -->
          <div class="virtual-scroll-load-button" *ngIf="loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading" (click)="loadNextPage()">
              <ng-container *ngTemplateOutlet="loadButtonTemplate"></ng-container>
          </div>
    
      </div>
    `
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: Renderer2, },
];
VirtualScrollComponent.propDecorators = {
    'collection': [{ type: Input },],
    'cellHeight': [{ type: Input },],
    'loadOnScroll': [{ type: Input },],
    'loading': [{ type: Output },],
    'cellTemplate': [{ type: ContentChild, args: [VirtualScrollCellDirective, { read: TemplateRef },] },],
    'loadingIndicatorTemplate': [{ type: ContentChild, args: [VirtualScrollLoadingDirective, { read: TemplateRef },] },],
    'loadButtonTemplate': [{ type: ContentChild, args: [VirtualScrollLoadButtonDirective, { read: TemplateRef },] },],
    'renderCells': [{ type: HostListener, args: ['scroll',] },],
};

const DECLARATIONS$5 = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];
class VirtualScrollModule {
}
VirtualScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule
                ],
                exports: DECLARATIONS$5,
                declarations: DECLARATIONS$5
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollModule.ctorParameters = () => [];

class HelpCenterService {
    constructor() {
        this.items = new BehaviorSubject$1([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    registerItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unregisterItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(itm => itm !== item);
        // update the observable
        this.items.next(items);
    }
}
HelpCenterService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
HelpCenterService.ctorParameters = () => [];

class HelpCenterItemDirective {
    /**
     * @param {?} _helpCenterService
     */
    constructor(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    }
}
HelpCenterItemDirective.decorators = [
    { type: Directive, args: [{ selector: '[uxHelpCenterItem]' },] },
];
/**
 * @nocollapse
 */
HelpCenterItemDirective.ctorParameters = () => [
    { type: HelpCenterService, },
];
HelpCenterItemDirective.propDecorators = {
    'uxHelpCenterItem': [{ type: Input },],
};

class HelpCenterModule {
}
HelpCenterModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [HelpCenterItemDirective],
                declarations: [HelpCenterItemDirective],
                providers: [HelpCenterService],
            },] },
];
/**
 * @nocollapse
 */
HelpCenterModule.ctorParameters = () => [];

class HoverActionService {
    constructor() {
        this.active = new BehaviorSubject$1(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    register(action) {
        this._actions.push(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    unregister(action) {
        this._actions = this._actions.filter(actn => actn !== action);
    }
    /**
     * @param {?} container
     * @return {?}
     */
    setContainer(container) {
        this._container = container;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    setFocusState(focus) {
        this._focused = focus;
        this.updateVisibility();
    }
    /**
     * @param {?} hover
     * @return {?}
     */
    setHoverState(hover) {
        this._hovered = hover;
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    next() {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    }
    /**
     * @return {?}
     */
    previous() {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    updateVisibility() {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    }
    /**
     * @param {?} index
     * @return {?}
     */
    focusActionAtIndex(index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    }
    /**
     * @return {?}
     */
    getFocusedActionIndex() {
        return this._actions.findIndex(action => action === this.getFocusedAction());
    }
    /**
     * @return {?}
     */
    containerHasFocus() {
        return this._focused;
    }
    /**
     * @return {?}
     */
    actionHasFocus() {
        return !!this.getFocusedAction();
    }
    /**
     * @return {?}
     */
    getFocusedAction() {
        return this._actions.find(action => action.focused);
    }
}
HoverActionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
HoverActionService.ctorParameters = () => [];

class HoverActionContainerDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.active$.unsubscribe();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this._hoverActionService.setFocusState(true);
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._hoverActionService.setFocusState(false);
    }
    /**
     * @return {?}
     */
    onHover() {
        this._hoverActionService.setHoverState(true);
    }
    /**
     * @return {?}
     */
    onLeave() {
        this._hoverActionService.setHoverState(false);
    }
    /**
     * @return {?}
     */
    next() {
        this._hoverActionService.next();
    }
}
HoverActionContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverActionContainer]',
                providers: [HoverActionService],
                host: {
                    '[class.hover-action-container-active]': 'active',
                    '[tabindex]': 'tabindex'
                }
            },] },
];
/**
 * @nocollapse
 */
HoverActionContainerDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: HoverActionService, },
];
HoverActionContainerDirective.propDecorators = {
    'tabindex': [{ type: Input },],
    'focus': [{ type: HostListener, args: ['click',] },],
    'onFocus': [{ type: HostListener, args: ['focus',] },],
    'onBlur': [{ type: HostListener, args: ['blur',] },],
    'onHover': [{ type: HostListener, args: ['mouseenter',] },],
    'onLeave': [{ type: HostListener, args: ['mouseleave',] },],
    'next': [{ type: HostListener, args: ['keydown.arrowright',] },],
};

class HoverActionDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    previous(event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    next(event) {
        event.stopPropagation();
        this._hoverActionService.next();
    }
}
HoverActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverAction]',
                host: {
                    '[class.hover-action-active]': 'active',
                    '[class.hover-action-focused]': 'focused',
                    '[tabindex]': 'tabindex'
                }
            },] },
];
/**
 * @nocollapse
 */
HoverActionDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: HoverActionService, },
];
HoverActionDirective.propDecorators = {
    'tabindex': [{ type: Input },],
    'onFocus': [{ type: HostListener, args: ['focus',] },],
    'onBlur': [{ type: HostListener, args: ['blur',] },],
    'previous': [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] },],
    'next': [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] },],
};

const DECLARATIONS$6 = [
    HoverActionDirective,
    HoverActionContainerDirective
];
class HoverActionModule {
}
HoverActionModule.decorators = [
    { type: NgModule, args: [{
                exports: DECLARATIONS$6,
                declarations: DECLARATIONS$6
            },] },
];
/**
 * @nocollapse
 */
HoverActionModule.ctorParameters = () => [];

class LayoutSwitcherItemDirective {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainerRef
     */
    constructor(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    getLayout() {
        return this._templateRef;
    }
    /**
     * @return {?}
     */
    getConfig() {
        return this._config;
    }
    /**
     * @return {?}
     */
    activate() {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    /**
     * @return {?}
     */
    deactivate() {
        let /** @type {?} */ index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    }
}
LayoutSwitcherItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcherItem]'
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherItemDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
LayoutSwitcherItemDirective.propDecorators = {
    '_config': [{ type: Input, args: ['uxLayoutSwitcherItem',] },],
};

class LayoutSwitcherDirective {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     * @param {?} renderer
     * @param {?} _viewContainerRef
     */
    constructor(_elementRef, resizeService, renderer, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement, renderer).subscribe(event => {
            this._width = event.width;
            // render the appropriate layout
            this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // if the active group has changed then render the appropriate layout
        if (changes.group.currentValue !== changes.group.previousValue) {
            this.updateActiveLayout();
        }
    }
    /**
     * @return {?}
     */
    getActiveLayout() {
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(layout => this.group === layout.getConfig().group).find(layout => {
            let /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            let /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return this._width >= minWidth && this._width < maxWidth;
        });
    }
    /**
     * @return {?}
     */
    updateActiveLayout() {
        // get the layout that should be shown
        let /** @type {?} */ layout = this.getActiveLayout();
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
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    }
}
LayoutSwitcherDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcher]'
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: ResizeService, },
    { type: Renderer2, },
    { type: ViewContainerRef, },
];
LayoutSwitcherDirective.propDecorators = {
    'group': [{ type: Input },],
    '_layouts': [{ type: ContentChildren, args: [LayoutSwitcherItemDirective,] },],
};

const DECLARATIONS$7 = [
    LayoutSwitcherDirective,
    LayoutSwitcherItemDirective
];
class LayoutSwitcherModule {
}
LayoutSwitcherModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ResizeModule
                ],
                exports: DECLARATIONS$7,
                declarations: DECLARATIONS$7,
                providers: [],
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherModule.ctorParameters = () => [];

class StringFilterPipe {
    /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    transform(items, value) {
        if (!items) {
            return [];
        }
        return items.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
}
StringFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stringFilter'
            },] },
    { type: Injectable },
];
/**
 * @nocollapse
 */
StringFilterPipe.ctorParameters = () => [];

class StringFilterModule {
}
StringFilterModule.decorators = [
    { type: NgModule, args: [{
                exports: [StringFilterPipe],
                declarations: [StringFilterPipe]
            },] },
];
/**
 * @nocollapse
 */
StringFilterModule.ctorParameters = () => [];

/*
  Export Components
*/

/**
 * Generated bundle index. Do not edit.
 */

export { BreadcrumbsComponent, BreadcrumbsModule, CheckboxModule, CHECKBOX_VALUE_ACCESSOR, CheckboxComponent, ColumnSortingModule, ColumnSortingComponent, ColumnSortingState, ColumnSortingDirective, DashboardModule, DashboardComponent, DashboardService, ActionDirection, Rounding, DashboardDragHandleDirective, DashboardWidgetComponent, EboxModule, EboxComponent, EboxHeaderDirective, EboxContentDirective, FacetsModule, FacetContainerComponent, FacetSelect, FacetDeselect, FacetDeselectAll, FacetHeaderComponent, FacetBaseComponent, FacetCheckListComponent, FacetTypeaheadListComponent, FacetTypeaheadHighlight, Facet, FilterModule, FilterContainerComponent, FilterAddEvent, FilterRemoveEvent, FilterRemoveAllEvent, FilterBaseComponent, FilterDropdownComponent, FilterDynamicComponent, FlippableCardModule, FlippableCardComponent, FlippableCardFrontDirective, FlippableCardBackDirective, ItemDisplayPanelModule, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective, ItemDisplayPanelComponent, NumberPickerModule, NUMBER_PICKER_VALUE_ACCESSOR, NumberPickerComponent, PageHeaderModule, PageHeaderComponent, PageHeaderNavigationComponent, PageHeaderIconMenuComponent, PageHeaderCustomMenuDirective, ProgressBarModule, ProgressBarComponent, RadioButtonModule, RADIOBUTTON_VALUE_ACCESSOR, RadioButtonComponent, SELECT_VALUE_ACCESSOR, SelectComponent, SelectModule, SliderModule, SliderComponent, SliderType, SliderStyle, SliderSize, SliderCalloutTrigger, SliderSnap, SliderTickType, SliderThumbEvent, SliderThumb, SparkModule, SparkComponent, TagInputEvent, TagInputComponent, TagInputModule, ToggleSwitchModule, ToggleSwitchComponent, TypeaheadOptionEvent, TypeaheadKeyService, TypeaheadComponent, TypeaheadModule$1 as TypeaheadModule, MediaPlayerModule, MediaPlayerComponent, MediaPlayerBaseExtensionDirective, MediaPlayerControlsExtensionComponent, MediaPlayerTimelineExtensionComponent, VirtualScrollModule, VirtualScrollComponent, VirtualScrollLoadingDirective, VirtualScrollLoadButtonDirective, VirtualScrollCellDirective, FocusIfDirective, FocusIfModule, HelpCenterModule, HelpCenterService, HelpCenterItemDirective, HoverActionModule, HoverActionContainerDirective, HoverActionDirective, InfiniteScrollDirective, InfiniteScrollLoadingEvent, InfiniteScrollLoadedEvent, InfiniteScrollLoadErrorEvent, InfiniteScrollLoadButtonDirective, InfiniteScrollLoadingDirective, InfiniteScrollModule, LayoutSwitcherModule, LayoutSwitcherDirective, LayoutSwitcherItemDirective, ResizeService, ResizeDirective, ResizeModule, ScrollIntoViewIfDirective, ScrollIntoViewService, ScrollIntoViewIfModule, DurationPipeModule, DurationPipe, FileSizePipeModule, FileSizePipe, StringFilterPipe, StringFilterModule, AudioServiceModule, AudioService, ColorServiceModule, ColorService, ThemeColor, colorSets, FrameExtractionModule, FrameExtractionService, MediaPlayerService as ɵc, PageHeaderNavigationDropdownItemComponent as ɵb, PageHeaderNavigationItemComponent as ɵa, HoverActionService as ɵd };
//# sourceMappingURL=ux-aspects.js.map
