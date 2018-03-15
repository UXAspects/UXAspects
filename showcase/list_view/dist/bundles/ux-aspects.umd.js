(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('@angular/forms'), require('rxjs/Subject'), require('rxjs/BehaviorSubject'), require('rxjs/observable/fromEvent'), require('rxjs/Observable'), require('rxjs/add/observable/fromEvent'), require('rxjs/operator/distinctUntilChanged'), require('rxjs/operator/map'), require('rxjs/operator/observeOn'), require('rxjs/operator/scan'), require('rxjs/add/operator/distinctUntilChanged'), require('rxjs/add/observable/merge'), require('rxjs/add/observable/timer'), require('rxjs/add/observable/from'), require('rxjs/add/operator/debounceTime'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/toArray'), require('rxjs/add/observable/of'), require('@angular/animations'), require('@angular/platform-browser'), require('rxjs/observable/of'), require('rxjs/observable/from'), require('rxjs/add/operator/auditTime'), require('rxjs/add/operator/combineLatest'), require('rxjs/add/operator/first'), require('rxjs/add/operator/partition'), require('rxjs/add/observable/concat'), require('@angular/http'), require('rxjs/add/operator/takeUntil'), require('@angular/upgrade/static')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/router', '@angular/forms', 'rxjs/Subject', 'rxjs/BehaviorSubject', 'rxjs/observable/fromEvent', 'rxjs/Observable', 'rxjs/add/observable/fromEvent', 'rxjs/operator/distinctUntilChanged', 'rxjs/operator/map', 'rxjs/operator/observeOn', 'rxjs/operator/scan', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/observable/merge', 'rxjs/add/observable/timer', 'rxjs/add/observable/from', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/toArray', 'rxjs/add/observable/of', '@angular/animations', '@angular/platform-browser', 'rxjs/observable/of', 'rxjs/observable/from', 'rxjs/add/operator/auditTime', 'rxjs/add/operator/combineLatest', 'rxjs/add/operator/first', 'rxjs/add/operator/partition', 'rxjs/add/observable/concat', '@angular/http', 'rxjs/add/operator/takeUntil', '@angular/upgrade/static'], factory) :
	(factory((global['ux-aspects'] = {}),global.ng.core,global.ng.common,global.ng.router,global.ng.forms,global.Rx,global.Rx,global.Rx.Observable,global.Rx,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable,global.ng.animations,global.ng.platformBrowser,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable,global.ng.http,global.Rx.Observable.prototype,global['']['/node_modules/@angular/upgrade/bundles/upgrade-static'].umd.js));
}(this, (function (exports,core,common,router,forms,Subject,BehaviorSubject,fromEvent,Observable,fromEvent$2,distinctUntilChanged,map,observeOn,scan,distinctUntilChanged$2,merge,timer,from,debounceTime,filter,map$2,switchMap,mergeMap,toArray,of,animations,platformBrowser,of$1,from$1,auditTime,combineLatest,first,partition,concat,http,takeUntil,_static) { 'use strict';

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
var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent() {
    }
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    BreadcrumbsComponent.prototype.clickCrumb = function (event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    };
    return BreadcrumbsComponent;
}());
BreadcrumbsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-breadcrumbs',
                template: "\n      <ol class=\"breadcrumb\">\n          <li *ngFor=\"let crumb of crumbs\">\n\n              <!-- If there is a router link then use a tag -->\n              <a *ngIf=\"crumb.routerLink\"\n                 [routerLink]=\"crumb.routerLink\" \n                 [fragment]=\"crumb.fragment\" \n                 [queryParams]=\"crumb.queryParams\" \n                 (click)=\"clickCrumb($event, crumb)\">\n                      {{ crumb.title }}\n              </a>\n\n              <!-- If there is not router link then display text in a span -->\n              <span *ngIf=\"!crumb.routerLink\">{{ crumb.title }}</span>\n          </li>\n      </ol>\n    "
            },] },
];
/**
 * @nocollapse
 */
BreadcrumbsComponent.ctorParameters = function () { return []; };
BreadcrumbsComponent.propDecorators = {
    'crumbs': [{ type: core.Input },],
};
var BreadcrumbsModule = (function () {
    function BreadcrumbsModule() {
    }
    return BreadcrumbsModule;
}());
BreadcrumbsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule
                ],
                exports: [BreadcrumbsComponent],
                declarations: [BreadcrumbsComponent]
            },] },
];
/**
 * @nocollapse
 */
BreadcrumbsModule.ctorParameters = function () { return []; };
var CHECKBOX_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return CheckboxComponent; }),
    multi: true
};
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this.name = '';
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.valueChange = new core.EventEmitter();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(CheckboxComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
    /**
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    CheckboxComponent.prototype.keyDown = function (event) {
        // then toggle the checkbox
        this.toggleChecked();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxComponent.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return CheckboxComponent;
}());
CheckboxComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-checkbox',
                template: "\n      <div class=\"ux-checkbox\" tabindex=\"0\"\n          [class.ux-checked]=\"value == true\"\n          [class.ux-indeterminate]=\"value == indeterminateValue\"\n          [class.ux-simplified]=\"simplified == true\"\n          [class.ux-disabled]=\"disabled == true\"\n          (keydown.space)=\"keyDown($event)\">\n\n          <input type=\"checkbox\" role=\"checkbox\" tabindex=\"-1\"\n              [name]=\"name\" \n              [checked]=\"value\" \n              [disabled]=\"disabled\" />\n        \n      </div>\n\n      <div class=\"ux-checkbox-content\">\n          <ng-content></ng-content>\n      </div>\n    ",
                providers: [CHECKBOX_VALUE_ACCESSOR],
                host: {
                    '(click)': 'toggleChecked()'
                }
            },] },
];
/**
 * @nocollapse
 */
CheckboxComponent.ctorParameters = function () { return []; };
CheckboxComponent.propDecorators = {
    'name': [{ type: core.Input },],
    'clickable': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'simplified': [{ type: core.Input },],
    'indeterminateValue': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'value': [{ type: core.Input },],
};
var CheckboxModule = (function () {
    function CheckboxModule() {
    }
    return CheckboxModule;
}());
CheckboxModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [forms.FormsModule],
                exports: [CheckboxComponent],
                declarations: [CheckboxComponent]
            },] },
];
/**
 * @nocollapse
 */
CheckboxModule.ctorParameters = function () { return []; };
var ColumnSortingComponent = (function () {
    function ColumnSortingComponent() {
        this.stateChange = new core.EventEmitter();
        this.columnSortingState = ColumnSortingState;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    ColumnSortingComponent.prototype.initParent = function (parent) {
        var _this = this;
        this._parent = parent;
        // watch for any events
        this._parent.events.subscribe(function (event) {
            var /** @type {?} */ idx = event.findIndex(function (column) { return column.key === _this.key; });
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
    /**
     * @return {?}
     */
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
        return this._parent.toggleColumn(this.key, this.state);
    };
    return ColumnSortingComponent;
}());
ColumnSortingComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-column-sorting',
                template: "\n      <div class=\"ux-column-sorting\">\n          <i class=\"ux-column-sorting-icon hpe-icon\" \n              [class.hpe-ascend]=\"state === columnSortingState.Ascending\" \n              [class.hpe-descend]=\"state === columnSortingState.Descending\" \n              [class.column-sorting-icon-hidden]=\"state === columnSortingState.NoSort\"></i>\n          <p class=\"ux-column-sorting-number\">{{ orderNumber }}</p>\n      </div>\n    ",
                exportAs: 'ux-column-sorting'
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingComponent.ctorParameters = function () { return []; };
ColumnSortingComponent.propDecorators = {
    'state': [{ type: core.Input },],
    'key': [{ type: core.Input },],
    'orderNumber': [{ type: core.Input },],
    'stateChange': [{ type: core.Output },],
};
var ColumnSortingState = {};
ColumnSortingState.Ascending = 0;
ColumnSortingState.Descending = 1;
ColumnSortingState.NoSort = 2;
ColumnSortingState[ColumnSortingState.Ascending] = "Ascending";
ColumnSortingState[ColumnSortingState.Descending] = "Descending";
ColumnSortingState[ColumnSortingState.NoSort] = "NoSort";
var ColumnSortingDirective = (function () {
    function ColumnSortingDirective() {
        this.events = new Subject.Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ColumnSortingDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.components.forEach(function (component) { return component.initParent(_this); });
    };
    /**
     * @param {?} key
     * @param {?} state
     * @return {?}
     */
    ColumnSortingDirective.prototype.toggleColumn = function (key, state$$1) {
        if (this.singleSort) {
            if (state$$1 === ColumnSortingState.NoSort) {
                this.order = [];
            }
            else {
                this.order = [{ key: key, state: state$$1 }];
            }
        }
        else {
            // reorder columns here
            var /** @type {?} */ idx = this.order.findIndex(function (column) { return column.key === key; });
            // if wasnt previously selected add to list
            if (idx === -1) {
                this.order.push({ key: key, state: state$$1 });
            }
            else if (state$$1 === ColumnSortingState.Ascending || state$$1 === ColumnSortingState.Descending) {
                this.order.splice(idx, 1);
                this.order.push({ key: key, state: state$$1 });
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
ColumnSortingDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxColumnSorting]'
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingDirective.ctorParameters = function () { return []; };
ColumnSortingDirective.propDecorators = {
    'singleSort': [{ type: core.Input },],
    'components': [{ type: core.ContentChildren, args: [ColumnSortingComponent,] },],
};
var ColumnSortingModule = (function () {
    function ColumnSortingModule() {
    }
    return ColumnSortingModule;
}());
ColumnSortingModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [ColumnSortingComponent, ColumnSortingDirective],
                declarations: [ColumnSortingComponent, ColumnSortingDirective]
            },] },
];
/**
 * @nocollapse
 */
ColumnSortingModule.ctorParameters = function () { return []; };
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;
var isFunction_1 = {
    isFunction: isFunction_2
};
var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
var isArray = {
    isArray: isArray_1
};
function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;
var isObject_1 = {
    isObject: isObject_2
};
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };
var errorObject = {
    errorObject: errorObject_1
};
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.errorObject.e = e;
        return errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;
var tryCatch_1 = {
    tryCatch: tryCatch_2
};
var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;
var UnsubscriptionError_1 = {
    UnsubscriptionError: UnsubscriptionError_2
};
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
            }
        }
        if (isArray.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
var Subscription_1 = {
    Subscription: Subscription_2
};
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
var Observer = {
    empty: empty
};
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
var root = {
    root: root_1
};
var rxSubscriber = createCommonjsModule(function (module, exports) {
    var Symbol = root.root.Symbol;
    exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
        Symbol.for('rxSubscriber') : '@@rxSubscriber';
    /**
     * @deprecated use rxSubscriber instead
     */
    exports.$$rxSubscriber = exports.rxSubscriber;
});
var rxSubscriber_1 = rxSubscriber.rxSubscriber;
var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;
var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
var Subscriber_1 = {
    Subscriber: Subscriber_2
};
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter$1(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var filter_2 = filter$1;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends$5(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state$$1, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
var Action_2 = Action;
var Action_1 = {
    Action: Action_2
};
var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends$4(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state$$1, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state$$1;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return root.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state$$1, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state$$1, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state$$1, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state$$1);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
var AsyncAction_2 = AsyncAction;
var AsyncAction_1 = {
    AsyncAction: AsyncAction_2
};
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state$$1) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state$$1, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
var Scheduler_2 = Scheduler;
var Scheduler_1 = {
    Scheduler: Scheduler_2
};
var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler = (function (_super) {
    __extends$6(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
var AsyncScheduler_2 = AsyncScheduler;
var AsyncScheduler_1 = {
    AsyncScheduler: AsyncScheduler_2
};
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
var async_1 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
var async = {
    async: async_1
};
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
var isDate_2 = isDate;
var isDate_1 = {
    isDate: isDate_2
};
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
            return nextOrObserver[rxSubscriber.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;
var toSubscriber_1 = {
    toSubscriber: toSubscriber_2
};
var observable = createCommonjsModule(function (module, exports) {
    function getSymbolObservable(context) {
        var $$observable;
        var Symbol = context.Symbol;
        if (typeof Symbol === 'function') {
            if (Symbol.observable) {
                $$observable = Symbol.observable;
            }
            else {
                $$observable = Symbol('observable');
                Symbol.observable = $$observable;
            }
        }
        else {
            $$observable = '@@observable';
        }
        return $$observable;
    }
    exports.getSymbolObservable = getSymbolObservable;
    exports.observable = getSymbolObservable(root.root);
    /**
     * @deprecated use observable instead
     */
    exports.$$observable = exports.observable;
});
var observable_1 = observable.getSymbolObservable;
var observable_2 = observable.observable;
var observable_3 = observable.$$observable;
/* tslint:disable:no-empty */
function noop() { }
var noop_2 = noop;
var noop_1 = {
    noop: noop_2
};
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
var pipe_2 = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
var pipeFromArray_1 = pipeFromArray;
var pipe_1 = {
    pipe: pipe_2,
    pipeFromArray: pipeFromArray_1
};
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable$2 = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable$$1(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable$$1.prototype.lift = function (operator) {
        var observable$$1 = new Observable$$1();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable$$1.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable$$1.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable$$1.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable$$1.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable$$1.prototype[observable.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable$$1.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable$$1.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root.root.Rx && root.root.Rx.config && root.root.Rx.config.Promise) {
                PromiseCtor = root.root.Rx.config.Promise;
            }
            else if (root.root.Promise) {
                PromiseCtor = root.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable$$1.create = function (subscribe) {
        return new Observable$$1(subscribe);
    };
    return Observable$$1;
}());
var Observable_2 = Observable$2;
var Observable_1 = {
    Observable: Observable_2
};
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
var Notification_2 = Notification;
var Notification_1 = {
    Notification: Notification_2
};
var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The IScheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay(delay, scheduler) {
    if (scheduler === void 0) {
        scheduler = async.async;
    }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return function (source) { return source.lift(new DelayOperator(delayFor, scheduler)); };
}
var delay_2 = delay;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends$3(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state$$1) {
        var source = state$$1.source;
        var queue = source.queue;
        var scheduler = state$$1.scheduler;
        var destination = state$$1.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state$$1, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());
var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map$3(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var map_2 = map$3;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends$7(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged$3(compare, keySelector) {
    return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
}
var distinctUntilChanged_2 = distinctUntilChanged$3;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends$8(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject.errorObject) {
                return this.destination.error(errorObject.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject.errorObject) {
                return this.destination.error(errorObject.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
var DashboardService = (function () {
    function DashboardService() {
        var _this = this;
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject.BehaviorSubject([]);
        this.options$ = new BehaviorSubject.BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject.BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(delay_2(0), map_2(function (dimensions) { return dimensions.height; }), distinctUntilChanged_2());
        this.placeholder$ = new BehaviorSubject.BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject.Subject();
        this.stacked$ = new BehaviorSubject.BehaviorSubject(false);
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter_2(function (stacked) { return stacked === true; })).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay_2(0)).subscribe(function () { return _this.renderDashboard(); });
        this.dimensions$.pipe(delay_2(0)).subscribe(function () { return _this.renderDashboard(); });
    }
    Object.defineProperty(DashboardService.prototype, "options", {
        /**
         * @return {?}
         */
        get: function () {
            return this.options$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "widgets", {
        /**
         * @return {?}
         */
        get: function () {
            return this.widgets$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "stacked", {
        /**
         * @return {?}
         */
        get: function () {
            return this.stacked$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "dimensions", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dimensions$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardService.prototype, "columnWidth", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dimensions.width / this.options.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the dashboard container element
     * @param {?} dashboard The HTMLElement that is the dashboard container
     * @return {?}
     */
    DashboardService.prototype.setDashboard = function (dashboard) {
        this._dashboard = dashboard;
    };
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    DashboardService.prototype.addWidget = function (widget) {
        this.widgets$.next(this.widgets$.getValue().concat([widget]));
    };
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    DashboardService.prototype.removeWidget = function (widget) {
        this.widgets$.next(this.widgets$.getValue().filter(function (_widget) { return _widget !== widget; }));
    };
    /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    DashboardService.prototype.setDimensions = function (width, height) {
        if (width === void 0) { width = this.dimensions.width; }
        if (height === void 0) { height = this.dimensions.height; }
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    };
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    DashboardService.prototype.getLayoutData = function () {
        return this.widgets.map(function (widget) {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    };
    /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    DashboardService.prototype.setLayoutData = function (widgets) {
        var _this = this;
        // iterate through each widget data and find a match
        widgets.forEach(function (widget) {
            // find the matching widget
            var /** @type {?} */ target = _this.widgets.find(function (_widget) { return _widget.id === widget.id; });
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
     * @return {?}
     */
    DashboardService.prototype.renderDashboard = function () {
        var _this = this;
        // get the dimensions of the dashboard
        this._rowHeight = this.options.rowHeight || this.columnWidth;
        // ensure the column width is not below the min widths
        this.stacked$.next(this.columnWidth < this.options.minWidth);
        // ensure the row height is not below the min widths
        if (this._rowHeight < this.options.minWidth) {
            this._rowHeight = this.options.minWidth;
        }
        this.setDashboardLayout();
        // iterate through each widget and set the size - except the one being resized
        this.widgets.filter(function (widget) { return !_this._actionWidget || widget !== _this._actionWidget.widget; })
            .forEach(function (widget) { return widget.render(); });
    };
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    DashboardService.prototype.setDashboardLayout = function () {
        var _this = this;
        // find any widgets that do not currently have a position set
        this.widgets.filter(function (widget) { return widget.getColumn() === undefined || widget.getRow() === undefined; })
            .forEach(function (widget) { return _this.setWidgetPosition(widget); });
        this.setDashboardHeight();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.updateWhenStacked = function () {
        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach(function (widget, idx) {
            widget.setColumn(0);
            widget.setRow(idx);
        });
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getWidgetsByOrder = function () {
        return this.widgets.sort(function (w1, w2) {
            var /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            var /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
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
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    DashboardService.prototype.setWidgetPosition = function (widget) {
        // find a position for the widget
        var /** @type {?} */ position = 0;
        var /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            var /** @type {?} */ column = position % this.options.columns;
            var /** @type {?} */ row = Math.floor(position / this.options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            if (column === 0 && widget.colSpan > this.options.columns) {
                throw new Error('Dashboard widgets have a colSpan greater than the max number of dashboard columns!');
            }
            position++;
        }
    };
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    DashboardService.prototype.getPositionAvailable = function (column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        var /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
            return false;
        }
        var _loop_1 = function (x) {
            var _loop_2 = function (y) {
                if (spaces.find(function (block) { return block.column === x && block.row === y && block.widget !== ignoreWidget; })) {
                    return { value: false };
                }
            };
            for (var /** @type {?} */ y = row; y < row + rowSpan; y++) {
                var state_1 = _loop_2(/** @type {?} */ y);
                if (typeof state_1 === "object")
                    return state_1;
            }
        };
        // check each required position
        for (var /** @type {?} */ x = column; x < column + columnSpan; x++) {
            var state_2 = _loop_1(/** @type {?} */ x);
            if (typeof state_2 === "object")
                return state_2.value;
        }
        return true;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.getOccupiedSpaces = function () {
        var _this = this;
        // find all spaces that are currently occupied
        return this.widgets.filter(function (widget) { return widget.getColumn() !== undefined && widget.getRow() !== undefined; })
            .reduce(function (value, widget) {
            _this.forEachBlock(widget, function (column, row) { return value.push({ widget: widget, column: column, row: row }); });
            return value;
        }, []);
    };
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    DashboardService.prototype.onResizeStart = function (action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onResizeDrag = function (action) {
        // if there was no movement then do nothing
        if (action.event.x === this._mouseEvent.x && action.event.y === this._mouseEvent.y) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        var handle = action.handle;
        // get the bounds of the handle
        var /** @type {?} */ bounds = handle.getBoundingClientRect();
        // get the center of the handle
        var /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        var /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        var /** @type {?} */ mouseX = action.event.x - centerX;
        var /** @type {?} */ mouseY = action.event.y - centerY;
        // store the new proposed dimensions for the widget
        var /** @type {?} */ dimensions = {
            x: action.widget.x,
            y: action.widget.y,
            width: action.widget.width,
            height: action.widget.height
        };
        // update widget based on the handle being dragged
        switch (action.direction) {
            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;
            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
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
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    var /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    var /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        var /** @type {?} */ currentWidth = action.widget.x + action.widget.width;
        var /** @type {?} */ currentHeight = action.widget.y + action.widget.height;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this.dimensions.width) {
            dimensions.width = this.dimensions.width - dimensions.x;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.options.minWidth) {
            dimensions.x = action.widget.x;
            dimensions.width = this.options.minWidth;
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.options.minHeight) {
            dimensions.y = action.widget.y;
            dimensions.height = this.options.minHeight;
        }
        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onResizeEnd = function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // commit resize changes
        this.commitWidgetChanges();
        // hide placeholder
        placeholder.visible = false;
        // update the placeholder
        this.placeholder$.next(placeholder);
        this._actionWidget = null;
        this._mouseEvent = null;
        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();
        // update dashboard height
        this.setDashboardHeight();
        // emit information about the layout
        this.layout$.next(this.getLayoutData());
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDragStart = function (action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.onDragEnd = function () {
        this.onResizeEnd();
        this._widgetOrigin = {};
    };
    /**
     * @param {?} action
     * @return {?}
     */
    DashboardService.prototype.onDrag = function (action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }
        // get the current mouse position
        var /** @type {?} */ mouseX = action.event.pageX - this._mouseEvent.pageX;
        var /** @type {?} */ mouseY = action.event.pageY - this._mouseEvent.pageY;
        // store the latest event
        this._mouseEvent = action.event;
        var /** @type {?} */ dimensions = {
            x: action.widget.x + mouseX,
            y: action.widget.y + mouseY,
            width: action.widget.width,
            height: action.widget.height
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
    /**
     * @return {?}
     */
    DashboardService.prototype.getRowHeight = function () {
        return this._rowHeight;
    };
    /**
     * @return {?}
     */
    DashboardService.prototype.cacheWidgets = function () {
        this._cache = this.widgets.map(function (widget) { return ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }); });
    };
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    DashboardService.prototype.restoreWidgets = function (ignoreActionWidget) {
        var _this = this;
        if (ignoreActionWidget === void 0) { ignoreActionWidget = false; }
        this._cache.filter(function (widget) { return !ignoreActionWidget || widget.id !== _this._actionWidget.widget.id; }).forEach(function (widget) {
            var /** @type {?} */ match = _this.widgets.find(function (wgt) { return wgt.id === widget.id; });
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    };
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    DashboardService.prototype.shiftWidgets = function () {
        var _this = this;
        var /** @type {?} */ widgetsToMove = [];
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var _loop_3 = function (row) {
            var _loop_4 = function (column) {
                // store reference to any widgets that need moved
                this_1.getOccupiedSpaces()
                    .filter(function (space) { return space.column === column && space.row === row && space.widget !== _this._actionWidget.widget; })
                    .forEach(function (space) { return widgetsToMove.push(space.widget); });
            };
            for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
                _loop_4(/** @type {?} */ column);
            }
        };
        var this_1 = this;
        // check if there are any widgets under the placeholder
        for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            _loop_3(/** @type {?} */ row);
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter(function (widget, idx, array) { return array.indexOf(widget) === idx; });
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        var /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(function (widget) {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            var /** @type {?} */ grid = _this.getOccupiedSpaces().filter(function (space) { return !unmovedWidgets.find(function (wgt) { return wgt === space.widget; }); });
            // iterate each free block
            for (var /** @type {?} */ row = _this._widgetOrigin.row; row < _this._widgetOrigin.row + _this._widgetOrigin.rowSpan; row++) {
                for (var /** @type {?} */ column = _this._widgetOrigin.column; column < _this._widgetOrigin.column + _this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    var /** @type {?} */ requiredSpaces = _this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    var /** @type {?} */ available = requiredSpaces.every(function (space) {
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
            var /** @type {?} */ distance = (_this._actionWidget.widget.getRow() - widget.getRow()) + _this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            _this.moveWidgetDown(widget, distance);
        });
    };
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    DashboardService.prototype.validatePlaceholderPosition = function (shiftDirection) {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(placeholder.column, placeholder.row, true).length > 0) {
            // move the placeholder the opposite direction
            switch (shiftDirection) {
                case ActionDirection.Left:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x + this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
                case ActionDirection.Right:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x - this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
            }
            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
    };
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveLeft = function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveLeft(wgt); }); });
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
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    DashboardService.prototype.canWidgetMoveRight = function (widget, performMove) {
        var _this = this;
        if (performMove === void 0) { performMove = false; }
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }
        // find the positions required
        var /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(function (space) { return space.widget === widget; }).map(function (space) {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        var /** @type {?} */ moveable = targetSpaces.every(function (space) { return _this.getWidgetsAtPosition(space.column, space.row).filter(function (wgt) { return wgt !== space.widget; }).every(function (wgt) { return _this.canWidgetMoveRight(wgt); }); });
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
     * @return {?}
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
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    DashboardService.prototype.getRequiredSpacesFromPoint = function (widget, column, row) {
        var /** @type {?} */ spaces = [];
        for (var /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (var /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    };
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    DashboardService.prototype.updateWidgetPositions = function (widget) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (var /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (var /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
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
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
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
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.setPlaceholderBounds = function (visible, x, y, width, height) {
        var _this = this;
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        var /** @type {?} */ rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
        placeholder.visible = visible;
        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        var /** @type {?} */ rowCount = this.widgets.filter(function (widget) { return widget !== _this._actionWidget.widget; })
            .reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
        // constrain maximum placeholder row
        placeholder.row = Math.min(placeholder.row, rowCount);
        placeholder.x = (placeholder.column * this.getColumnWidth()) + this.options.padding;
        placeholder.y = (placeholder.row * this._rowHeight) + this.options.padding;
        placeholder.width = (placeholder.columnSpan * this.getColumnWidth()) - (this.options.padding * 2);
        placeholder.height = (placeholder.rowSpan * this._rowHeight) - (this.options.padding * 2);
        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(placeholder.column, false);
        this._actionWidget.widget.setRow(placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(placeholder.rowSpan, false);
        // update the placeholder
        this.placeholder$.next(placeholder);
    };
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumn = function (x, width) {
        var /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        var /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    };
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderColumnSpan = function (width) {
        var /** @type {?} */ columnSpan = this.getColumnFromPx(width);
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
        var /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    };
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRow = function (y, height) {
        var /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        var /** @type {?} */ rowSpan = Math.ceil(height / this._rowHeight);
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        var /** @type {?} */ overflow = height < this._rowHeight ? 0 : height % this._rowHeight;
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    };
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    DashboardService.prototype.getPlaceholderRowSpan = function (height) {
        var /** @type {?} */ rowSpan = this.getRowFromPx(height);
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
        var /** @type {?} */ overflow = height % this._rowHeight;
        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    };
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getColumnFromPx = function (x, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        var /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        var /** @type {?} */ half = this.getColumnWidth() / 2;
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
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    DashboardService.prototype.getRowFromPx = function (y, rounding) {
        if (rounding === void 0) { rounding = Rounding.RoundDown; }
        var /** @type {?} */ row = Math.floor(y / Math.floor(this._rowHeight));
        var /** @type {?} */ overflow = (y % Math.floor(this._rowHeight));
        var /** @type {?} */ half = this._rowHeight / 2;
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
    /**
     * @return {?}
     */
    DashboardService.prototype.commitWidgetChanges = function () {
        var /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check that we have all the values we need
        if (placeholder.column === undefined || placeholder.row === undefined ||
            placeholder.columnSpan === undefined || placeholder.rowSpan === undefined) {
            return;
        }
        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(placeholder.column);
            this._actionWidget.widget.setRow(placeholder.row);
            this._actionWidget.widget.setColumnSpan(placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(placeholder.rowSpan);
        }
        // reset all placeholder values
        placeholder.column = undefined;
        placeholder.row = undefined;
        placeholder.columnSpan = undefined;
        placeholder.rowSpan = undefined;
        // emit the new placeholder values
        this.placeholder$.next(placeholder);
    };
    /**
     * Get the current column width
     * @return {?}
     */
    DashboardService.prototype.getColumnWidth = function () {
        return Math.floor(this.columnWidth);
    };
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    DashboardService.prototype.getRowCount = function () {
        return this.widgets.reduce(function (previous, widget) { return Math.max(widget.getRow() + widget.getRowSpan(), previous); }, 0);
    };
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    DashboardService.prototype.setDashboardHeight = function () {
        // size the dashboard container to ensure all rows fit
        var /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }
        this.setDimensions(undefined, rowCount * this._rowHeight);
    };
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    DashboardService.prototype.bringToFront = function (widget) {
        this.widgets.forEach(function (_widget) { return _widget === widget ? _widget.bringToFront() : _widget.sendToBack(); });
    };
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    DashboardService.prototype.moveWidgetDown = function (widget, distance) {
        var _this = this;
        if (distance === void 0) { distance = 1; }
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, function (column, row) { return _this.getWidgetsAtPosition(column, row, true)
            .filter(function (wgt) { return wgt !== widget; })
            .forEach(function (wgt) { return _this.moveWidgetDown(wgt, distance); }); });
    };
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    DashboardService.prototype.shiftWidgetsUp = function () {
        var _this = this;
        // check whether or not changes have been made - if so we need to repeat until stable
        var /** @type {?} */ stable = true;
        // iterate each widget and 
        this.widgets.forEach(function (widget) {
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
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    DashboardService.prototype.forEachBlock = function (widget, callback) {
        for (var /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (var /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    };
    /**
     * Returns the number of columns available
     * @return {?}
     */
    DashboardService.prototype.getColumnCount = function () {
        return this.stacked ? 1 : this.options.columns;
    };
    return DashboardService;
}());
DashboardService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DashboardService.ctorParameters = function () { return []; };
var defaultOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
var ActionDirection = {};
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
var Rounding = {};
Rounding.RoundDown = 0;
Rounding.RoundDownBelowHalf = 1;
Rounding.RoundUp = 2;
Rounding.RoundUpOverHalf = 3;
Rounding[Rounding.RoundDown] = "RoundDown";
Rounding[Rounding.RoundDownBelowHalf] = "RoundDownBelowHalf";
Rounding[Rounding.RoundUp] = "RoundUp";
Rounding[Rounding.RoundUpOverHalf] = "RoundUpOverHalf";
var DashboardComponent = (function () {
    /**
     * @param {?} dashboardService
     */
    function DashboardComponent(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.layoutChange = new core.EventEmitter();
        dashboardService.layout$.subscribe(function (layout) { return _this.layoutChange.emit(layout); });
    }
    Object.defineProperty(DashboardComponent.prototype, "layout", {
        /**
         * @param {?} layout
         * @return {?}
         */
        set: function (layout) {
            if (layout) {
                this.dashboardService.layout$.next(layout);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardComponent.prototype, "options", {
        /**
         * @param {?} options
         * @return {?}
         */
        set: function (options) {
            this.dashboardService.options$.next(Object.assign({}, defaultOptions, options));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the initial dimensions
     * @return {?}
     */
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.dashboardService.setDashboard(this.dashboardElement.nativeElement);
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DashboardComponent.prototype.onResize = function (event) {
        this.dashboardService.setDimensions(event.width, event.height);
    };
    return DashboardComponent;
}());
DashboardComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-dashboard',
                template: "\n      <div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n          <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n              <ng-content></ng-content>\n          </div>\n    \n          <div class=\"position-indicator\" *ngIf=\"(dashboardService.placeholder$ | async).visible\" \n              [style.left.px]=\"(dashboardService.placeholder$ | async).x\" \n              [style.top.px]=\"(dashboardService.placeholder$ | async).y\" \n              [style.width.px]=\"(dashboardService.placeholder$ | async).width\"\n              [style.height.px]=\"(dashboardService.placeholder$ | async).height\"></div>\n      </div>\n    ",
                providers: [DashboardService],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
DashboardComponent.ctorParameters = function () { return [
    { type: DashboardService, },
]; };
DashboardComponent.propDecorators = {
    'layout': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'layoutChange': [{ type: core.Output },],
    'dashboardElement': [{ type: core.ViewChild, args: ['dashboard',] },],
};
var DashboardWidgetComponent = (function () {
    /**
     * @param {?} dashboardService
     */
    function DashboardWidgetComponent(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.resizable = false;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.padding = 0;
        this.zIndex = 0;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._subscription = dashboardService.options$.subscribe(function () { return _this.update(); });
    }
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnInit = function () {
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngAfterViewInit = function () {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);
        // apply the current options
        this.update();
    };
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
        this.dashboardService.removeWidget(this);
    };
    /**
     * Apply the current dashboard options
     * @return {?}
     */
    DashboardWidgetComponent.prototype.update = function () {
        // get the current options at the time 
        var _c = this.dashboardService.options, padding = _c.padding, columns = _c.columns;
        this.padding = padding;
        this._columnSpan.stacked = columns;
    };
    /**
     * Set the actual position and size values
     * @return {?}
     */
    DashboardWidgetComponent.prototype.render = function () {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumn = function () {
        return this.getStackableValue(this._column);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRow = function () {
        return this.getStackableValue(this._row);
    };
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumn = function (column, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRow = function (row, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumnSpan = function () {
        return this.getStackableValue(this._columnSpan);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRowSpan = function () {
        return this.getStackableValue(this._rowSpan);
    };
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumnSpan = function (columnSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRowSpan = function (rowSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.bringToFront = function () {
        this.zIndex = 1;
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.sendToBack = function () {
        this.zIndex = 0;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setBounds = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragstart = function (handle, event, direction) {
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.drag = function (handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragend = function () {
        this.dashboardService.onResizeEnd();
    };
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setStackableValue = function (property, value) {
        if (this.dashboardService.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    };
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getStackableValue = function (property) {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    };
    return DashboardWidgetComponent;
}());
DashboardWidgetComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-dashboard-widget',
                template: "\n      <div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n          <ng-content></ng-content>\n      </div>\n\n      <div uxDrag #handleTop class=\"resizer-handle handle-top\" \n          (dragstart)=\"dragstart(handleTop, $event, 0)\"\n          (drag)=\"drag(handleTop, $event, 0)\"\n          (dragend)=\"dragend()\"\n          [style.top.px]=\"padding\" \n          [hidden]=\"!resizable\">\n      </div>\n\n      <div uxDrag #handleTopRight class=\"resizer-handle handle-top-right\" \n          (dragstart)=\"dragstart(handleTopRight, $event, 1)\"\n          (drag)=\"drag(handleTopRight, $event, 1)\"\n          (dragend)=\"dragend()\"\n          [style.top.px]=\"padding\" \n          [style.right.px]=\"padding\" \n          [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n      </div>\n\n      <div uxDrag #handleRight class=\"resizer-handle handle-right\" \n          (dragstart)=\"dragstart(handleRight, $event, 2)\"\n          (drag)=\"drag(handleRight, $event, 2)\"\n          (dragend)=\"dragend()\"\n          [style.right.px]=\"padding\" \n          [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n      </div>\n\n      <div uxDrag #handleBottomRight class=\"resizer-handle handle-bottom-right\" \n          (dragstart)=\"dragstart(handleBottomRight, $event, 3)\"\n          (drag)=\"drag(handleBottomRight, $event, 3)\"\n          (dragend)=\"dragend()\"\n          [style.bottom.px]=\"padding\" \n          [style.right.px]=\"padding\" \n          [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n      </div>\n\n      <div uxDrag #handleBottom class=\"resizer-handle handle-bottom\" \n          (dragstart)=\"dragstart(handleBottom, $event, 4)\"\n          (drag)=\"drag(handleBottom, $event, 4)\"\n          (dragend)=\"dragend()\"\n          [style.bottom.px]=\"padding\" \n          [hidden]=\"!resizable\">\n      </div>\n\n      <div uxDrag #handleBottomLeft class=\"resizer-handle handle-bottom-left\" \n          (dragstart)=\"dragstart(handleBottomLeft, $event, 5)\"\n          (drag)=\"drag(handleBottomLeft, $event, 5)\"\n          (dragend)=\"dragend()\"\n          [style.bottom.px]=\"padding\" \n          [style.left.px]=\"padding\" \n          [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n      </div>\n\n      <div uxDrag #handleLeft class=\"resizer-handle handle-left\" \n          (dragstart)=\"dragstart(handleLeft, $event, 6)\"\n          (drag)=\"drag(handleLeft, $event, 6)\"\n          (dragend)=\"dragend()\"\n          [style.left.px]=\"padding\" \n          [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n      </div>\n\n      <div uxDrag #handleTopLeft class=\"resizer-handle handle-top-left\" \n          (dragstart)=\"dragstart(handleTopLeft, $event, 7)\"\n          (drag)=\"drag(handleTopLeft, $event, 7)\"\n          (dragend)=\"dragend()\"\n          [style.top.px]=\"padding\" \n          [style.left.px]=\"padding\" \n          [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
DashboardWidgetComponent.ctorParameters = function () { return [
    { type: DashboardService, },
]; };
DashboardWidgetComponent.propDecorators = {
    'id': [{ type: core.Input },],
    'col': [{ type: core.Input },],
    'row': [{ type: core.Input },],
    'colSpan': [{ type: core.Input },],
    'rowSpan': [{ type: core.Input },],
    'resizable': [{ type: core.Input },],
    'x': [{ type: core.HostBinding, args: ['style.left.px',] },],
    'y': [{ type: core.HostBinding, args: ['style.top.px',] },],
    'width': [{ type: core.HostBinding, args: ['style.width.px',] },],
    'height': [{ type: core.HostBinding, args: ['style.height.px',] },],
    'padding': [{ type: core.HostBinding, args: ['style.padding.px',] },],
    'zIndex': [{ type: core.HostBinding, args: ['style.z-index',] },],
};
var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends$10(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
var OuterSubscriber_2 = OuterSubscriber;
var OuterSubscriber_1 = {
    OuterSubscriber: OuterSubscriber_2
};
var isArrayLike_1 = (function (x) { return x && typeof x.length === 'number'; });
var isArrayLike = {
    isArrayLike: isArrayLike_1
};
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
var isPromise_2 = isPromise;
var isPromise_1 = {
    isPromise: isPromise_2
};
var iterator = createCommonjsModule(function (module, exports) {
    function symbolIteratorPonyfill(root$$2) {
        var Symbol = root$$2.Symbol;
        if (typeof Symbol === 'function') {
            if (!Symbol.iterator) {
                Symbol.iterator = Symbol('iterator polyfill');
            }
            return Symbol.iterator;
        }
        else {
            // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
            var Set_1 = root$$2.Set;
            if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
                return '@@iterator';
            }
            var Map_1 = root$$2.Map;
            // required for compatability with es6-shim
            if (Map_1) {
                var keys = Object.getOwnPropertyNames(Map_1.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                    if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                        return key;
                    }
                }
            }
            return '@@iterator';
        }
    }
    exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
    exports.iterator = symbolIteratorPonyfill(root.root);
    /**
     * @deprecated use iterator instead
     */
    exports.$$iterator = exports.iterator;
});
var iterator_1 = iterator.symbolIteratorPonyfill;
var iterator_2 = iterator.iterator;
var iterator_3 = iterator.$$iterator;
var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends$11(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
var InnerSubscriber_2 = InnerSubscriber;
var InnerSubscriber_1 = {
    InnerSubscriber: InnerSubscriber_2
};
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            destination.syncErrorThrowable = true;
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator.iterator] === 'function') {
        var iterator$$1 = result[iterator.iterator]();
        do {
            var item = iterator$$1.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable.observable] === 'function') {
        var obs = result[observable.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
var subscribeToResult_2 = subscribeToResult;
var subscribeToResult_1 = {
    subscribeToResult: subscribeToResult_2
};
var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil$1(notifier) {
    return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
}
var takeUntil_2 = takeUntil$1;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends$9(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
var DragDirective = (function () {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     */
    function DragDirective(elementRef, ngZone) {
        var _this = this;
        this.dragstart = new core.EventEmitter();
        this.drag = new core.EventEmitter();
        this.dragend = new core.EventEmitter();
        var mousedown$ = fromEvent.fromEvent(elementRef.nativeElement, 'mousedown');
        var mousemove$ = fromEvent.fromEvent(document, 'mousemove');
        var mouseup$ = fromEvent.fromEvent(document, 'mouseup');
        this._subscription = mousedown$.subscribe(function (event) {
            event.preventDefault();
            // emit the drag start event 
            ngZone.run(function () { return _this.dragstart.emit(event); });
            mousemove$.pipe(takeUntil_2(mouseup$)).subscribe(function (moveevent) {
                moveevent.preventDefault();
                // emit the drag start event 
                ngZone.run(function () { return _this.drag.emit(moveevent); });
            }, null, function () { return ngZone.run(function () { return _this.dragend.emit(); }); });
        });
    }
    /**
     * @return {?}
     */
    DragDirective.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return DragDirective;
}());
DragDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxDrag]'
            },] },
];
/**
 * @nocollapse
 */
DragDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.NgZone, },
]; };
DragDirective.propDecorators = {
    'dragstart': [{ type: core.Output },],
    'drag': [{ type: core.Output },],
    'dragend': [{ type: core.Output },],
};
var DashboardDragHandleDirective = (function (_super) {
    __extends(DashboardDragHandleDirective, _super);
    /**
     * @param {?} widget
     * @param {?} dashboardService
     * @param {?} elementRef
     * @param {?} ngZone
     */
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone) {
        var _this = _super.call(this, elementRef, ngZone) || this;
        _this.dragstart.subscribe(function (event) { return dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.drag.subscribe(function (event) { return dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.dragend.subscribe(function () { return dashboardService.onDragEnd(); });
        return _this;
    }
    return DashboardDragHandleDirective;
}(DragDirective));
DashboardDragHandleDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
            },] },
];
/**
 * @nocollapse
 */
DashboardDragHandleDirective.ctorParameters = function () { return [
    { type: DashboardWidgetComponent, },
    { type: DashboardService, },
    { type: core.ElementRef, },
    { type: core.NgZone, },
]; };
var ResizeService = (function () {
    /**
     * @param {?} rendererFactory
     */
    function ResizeService(rendererFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    ResizeService.prototype.addResizeListener = function (nativeElement) {
        // create subject
        var /** @type {?} */ subject = new Subject.Subject();
        // determine the style of the element
        var /** @type {?} */ displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');
        // create the iframe element
        var /** @type {?} */ iframe = this._renderer.createElement('iframe');
        // style the iframe to be invisible but fill containing element
        this._renderer.setStyle(iframe, 'position', 'absolute');
        this._renderer.setStyle(iframe, 'width', '100%');
        this._renderer.setStyle(iframe, 'height', '100%');
        this._renderer.setStyle(iframe, 'top', '0');
        this._renderer.setStyle(iframe, 'right', '0');
        this._renderer.setStyle(iframe, 'bottom', '0');
        this._renderer.setStyle(iframe, 'left', '0');
        this._renderer.setStyle(iframe, 'z-index', '-1');
        this._renderer.setStyle(iframe, 'opacity', '0');
        this._renderer.setStyle(iframe, 'border', 'none');
        this._renderer.setStyle(iframe, 'margin', '0');
        this._renderer.setStyle(iframe, 'pointer-events', 'none');
        this._renderer.setStyle(iframe, 'overflow', 'hidden');
        // ensure the iframe ignores any tabbing
        this._renderer.setAttribute(iframe, 'tabindex', '-1');
        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            this._renderer.setStyle(nativeElement, 'position', 'relative');
        }
        // add the iframe to the container element
        this._renderer.appendChild(nativeElement, iframe);
        this.waitUntilReady(iframe, function () {
            var /** @type {?} */ iframeDoc = iframe.contentDocument || (iframe.contentWindow.document);
            var /** @type {?} */ attachListener = function () {
                Observable.Observable.fromEvent(iframe.contentWindow, 'resize').subscribe(function (event) {
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
    /**
     * @param {?} iframe
     * @param {?} callback
     * @return {?}
     */
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
ResizeService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ResizeService.ctorParameters = function () { return [
    { type: core.RendererFactory2, },
]; };
var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime$1(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = async.async;
    }
    return function (source) { return source.lift(new DebounceTimeOperator(dueTime, scheduler)); };
}
var debounceTime_2 = debounceTime$1;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends$12(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
var ResizeDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _resizeService
     * @param {?} _ngZone
     */
    function ResizeDirective(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    ResizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime_2(this.throttle))
            .subscribe(function (event) { return _this._ngZone.run(function () { return _this.uxResize.emit(event); }); });
    };
    return ResizeDirective;
}());
ResizeDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxResize]'
            },] },
];
/**
 * @nocollapse
 */
ResizeDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ResizeService, },
    { type: core.NgZone, },
]; };
ResizeDirective.propDecorators = {
    'throttle': [{ type: core.Input },],
    'uxResize': [{ type: core.Output },],
};
var ResizeModule = (function () {
    function ResizeModule() {
    }
    return ResizeModule;
}());
ResizeModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [ResizeDirective],
                declarations: [ResizeDirective],
                providers: [ResizeService]
            },] },
];
/**
 * @nocollapse
 */
ResizeModule.ctorParameters = function () { return []; };
var DragModule = (function () {
    function DragModule() {
    }
    return DragModule;
}());
DragModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [DragDirective],
                declarations: [DragDirective]
            },] },
];
/**
 * @nocollapse
 */
DragModule.ctorParameters = function () { return []; };
var DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
];
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    ResizeModule,
                    DragModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS,
                providers: [DashboardService],
            },] },
];
/**
 * @nocollapse
 */
DashboardModule.ctorParameters = function () { return []; };
var TimepickerActions = (function () {
    function TimepickerActions() {
    }
    TimepickerActions.prototype.writeValue = function (value) {
        return {
            type: TimepickerActions.WRITE_VALUE,
            payload: value
        };
    };
    TimepickerActions.prototype.changeHours = function (event) {
        return {
            type: TimepickerActions.CHANGE_HOURS,
            payload: event
        };
    };
    TimepickerActions.prototype.changeMinutes = function (event) {
        return {
            type: TimepickerActions.CHANGE_MINUTES,
            payload: event
        };
    };
    TimepickerActions.prototype.changeSeconds = function (event) {
        return {
            type: TimepickerActions.CHANGE_SECONDS,
            payload: event
        };
    };
    TimepickerActions.prototype.setTime = function (value) {
        return {
            type: TimepickerActions.SET_TIME_UNIT,
            payload: value
        };
    };
    TimepickerActions.prototype.updateControls = function (value) {
        return {
            type: TimepickerActions.UPDATE_CONTROLS,
            payload: value
        };
    };
    TimepickerActions.WRITE_VALUE = '[timepicker] write value from ng model';
    TimepickerActions.CHANGE_HOURS = '[timepicker] change hours';
    TimepickerActions.CHANGE_MINUTES = '[timepicker] change minutes';
    TimepickerActions.CHANGE_SECONDS = '[timepicker] change seconds';
    TimepickerActions.SET_TIME_UNIT = '[timepicker] set time unit';
    TimepickerActions.UPDATE_CONTROLS = '[timepicker] update controls';
    TimepickerActions.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TimepickerActions.ctorParameters = function () { return []; };
    return TimepickerActions;
}());
var dex = 10;
var hoursPerDay = 24;
var hoursPerDayHalf = 12;
var minutesPerHour = 60;
var secondsPerMinute = 60;
function isValidDate(value) {
    if (!value) {
        return false;
    }
    if (value instanceof Date && isNaN(value.getHours())) {
        return false;
    }
    if (typeof value === 'string') {
        return isValidDate(new Date(value));
    }
    return true;
}
function isValidLimit(controls, newDate) {
    if (controls.min && newDate < controls.min) {
        return false;
    }
    if (controls.max && newDate > controls.max) {
        return false;
    }
    return true;
}
function toNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    return parseInt(value, dex);
}
function parseHours(value, isPM) {
    if (isPM === void 0) {
        isPM = false;
    }
    var hour = toNumber(value);
    if (isNaN(hour) ||
        hour < 0 ||
        hour > (isPM ? hoursPerDayHalf : hoursPerDay)) {
        return NaN;
    }
    return hour;
}
function parseMinutes(value) {
    var minute = toNumber(value);
    if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
        return NaN;
    }
    return minute;
}
function parseSeconds(value) {
    var seconds = toNumber(value);
    if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
        return NaN;
    }
    return seconds;
}
function parseTime(value) {
    if (typeof value === 'string') {
        return new Date(value);
    }
    return value;
}
function changeTime(value, diff) {
    if (!value) {
        return changeTime(createDate(new Date(), 0, 0, 0), diff);
    }
    var hour = value.getHours();
    var minutes = value.getMinutes();
    var seconds = value.getSeconds();
    if (diff.hour) {
        hour = (hour + toNumber(diff.hour)) % hoursPerDay;
        if (hour < 0) {
            hour += hoursPerDay;
        }
    }
    if (diff.minute) {
        minutes = minutes + toNumber(diff.minute);
    }
    if (diff.seconds) {
        seconds = seconds + toNumber(diff.seconds);
    }
    return createDate(value, hour, minutes, seconds);
}
function setTime(value, opts) {
    var hour = parseHours(opts.hour);
    var minute = parseMinutes(opts.minute);
    var seconds = parseSeconds(opts.seconds) || 0;
    if (opts.isPM) {
        hour += hoursPerDayHalf;
    }
    if (!value) {
        if (!isNaN(hour) && !isNaN(minute)) {
            return createDate(new Date(), hour, minute, seconds);
        }
        return value;
    }
    if (isNaN(hour) || isNaN(minute)) {
        return value;
    }
    return createDate(value, hour, minute, seconds);
}
function createDate(value, hours, minutes, seconds) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes, seconds, value.getMilliseconds());
}
function padNumber(value) {
    var _value = value.toString();
    if (_value.length > 1) {
        return _value;
    }
    return "0" + _value;
}
function isHourInputValid(hours, isPM) {
    return !isNaN(parseHours(hours, isPM));
}
function isMinuteInputValid(minutes) {
    return !isNaN(parseMinutes(minutes));
}
function isSecondInputValid(seconds) {
    return !isNaN(parseSeconds(seconds));
}
function isInputLimitValid(diff, max, min) {
    var newDate = changeTime(new Date(), diff);
    if (max && newDate > max) {
        return false;
    }
    if (min && newDate < min) {
        return false;
    }
    return true;
}
function isInputValid(hours, minutes, seconds, isPM) {
    if (minutes === void 0) {
        minutes = '0';
    }
    if (seconds === void 0) {
        seconds = '0';
    }
    return isHourInputValid(hours, isPM)
        && isMinuteInputValid(minutes)
        && isSecondInputValid(seconds);
}
function canChangeValue(state$$1, event) {
    if (state$$1.readonlyInput || state$$1.disabled) {
        return false;
    }
    if (event) {
        if (event.source === 'wheel' && !state$$1.mousewheel) {
            return false;
        }
        if (event.source === 'key' && !state$$1.arrowkeys) {
            return false;
        }
    }
    return true;
}
function canChangeHours(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementHours) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementHours) {
        return false;
    }
    return true;
}
function canChangeMinutes(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementMinutes) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementMinutes) {
        return false;
    }
    return true;
}
function canChangeSeconds(event, controls) {
    if (!event.step) {
        return false;
    }
    if (event.step > 0 && !controls.canIncrementSeconds) {
        return false;
    }
    if (event.step < 0 && !controls.canDecrementSeconds) {
        return false;
    }
    return true;
}
function getControlsValue(state$$1) {
    var hourStep = state$$1.hourStep, minuteStep = state$$1.minuteStep, secondsStep = state$$1.secondsStep, readonlyInput = state$$1.readonlyInput, disabled = state$$1.disabled, mousewheel = state$$1.mousewheel, arrowkeys = state$$1.arrowkeys, showSpinners = state$$1.showSpinners, showMeridian = state$$1.showMeridian, showSeconds = state$$1.showSeconds, meridians = state$$1.meridians, min = state$$1.min, max = state$$1.max;
    return {
        hourStep: hourStep,
        minuteStep: minuteStep,
        secondsStep: secondsStep,
        readonlyInput: readonlyInput,
        disabled: disabled,
        mousewheel: mousewheel,
        arrowkeys: arrowkeys,
        showSpinners: showSpinners,
        showMeridian: showMeridian,
        showSeconds: showSeconds,
        meridians: meridians,
        min: min,
        max: max
    };
}
function timepickerControls(value, state$$1) {
    var hoursPerDayHalf = 12;
    var min = state$$1.min, max = state$$1.max, hourStep = state$$1.hourStep, minuteStep = state$$1.minuteStep, secondsStep = state$$1.secondsStep, showSeconds = state$$1.showSeconds;
    var res = {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,
        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true,
        canToggleMeridian: true
    };
    if (!value) {
        return res;
    }
    // compare dates
    if (max) {
        var _newHour = changeTime(value, { hour: hourStep });
        res.canIncrementHours = max > _newHour;
        if (!res.canIncrementHours) {
            var _newMinutes = changeTime(value, { minute: minuteStep });
            res.canIncrementMinutes = showSeconds
                ? max > _newMinutes
                : max >= _newMinutes;
        }
        if (!res.canIncrementMinutes) {
            var _newSeconds = changeTime(value, { seconds: secondsStep });
            res.canIncrementSeconds = max >= _newSeconds;
        }
        if (value.getHours() < hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: hoursPerDayHalf }) < max;
        }
    }
    if (min) {
        var _newHour = changeTime(value, { hour: -hourStep });
        res.canDecrementHours = min < _newHour;
        if (!res.canDecrementHours) {
            var _newMinutes = changeTime(value, { minute: -minuteStep });
            res.canDecrementMinutes = showSeconds
                ? min < _newMinutes
                : min <= _newMinutes;
        }
        if (!res.canDecrementMinutes) {
            var _newSeconds = changeTime(value, { seconds: -secondsStep });
            res.canDecrementSeconds = min <= _newSeconds;
        }
        if (value.getHours() >= hoursPerDayHalf) {
            res.canToggleMeridian = changeTime(value, { hour: -hoursPerDayHalf }) > min;
        }
    }
    return res;
}
/** Provides default configuration values for timepicker */
var TimepickerConfig = (function () {
    function TimepickerConfig() {
        /** hours change step */
        this.hourStep = 1;
        /** hours change step */
        this.minuteStep = 5;
        /** seconds changes step */
        this.secondsStep = 10;
        /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
        this.showMeridian = true;
        /** meridian labels based on locale */
        this.meridians = ['AM', 'PM'];
        /** if true hours and minutes fields will be readonly */
        this.readonlyInput = false;
        /** if true hours and minutes fields will be disabled */
        this.disabled = false;
        /** if true scroll inside hours and minutes inputs will change time */
        this.mousewheel = true;
        /** if true up/down arrowkeys inside hours and minutes inputs will change time */
        this.arrowkeys = true;
        /** if true spinner arrows above and below the inputs will be shown */
        this.showSpinners = true;
        /** show seconds in timepicker */
        this.showSeconds = false;
        /** show minutes in timepicker */
        this.showMinutes = true;
    }
    TimepickerConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TimepickerConfig.ctorParameters = function () { return []; };
    return TimepickerConfig;
}());
var initialState = {
    value: null,
    config: new TimepickerConfig(),
    controls: {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,
        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true,
        canToggleMeridian: true
    }
};
function timepickerReducer(state$$1, action) {
    if (state$$1 === void 0) {
        state$$1 = initialState;
    }
    switch (action.type) {
        case TimepickerActions.WRITE_VALUE: {
            return Object.assign({}, state$$1, { value: action.payload });
        }
        case TimepickerActions.CHANGE_HOURS: {
            if (!canChangeValue(state$$1.config, action.payload) ||
                !canChangeHours(action.payload, state$$1.controls)) {
                return state$$1;
            }
            var _newTime = changeTime(state$$1.value, { hour: action.payload.step });
            if ((state$$1.config.max || state$$1.config.min) && !isValidLimit(state$$1.config, _newTime)) {
                return state$$1;
            }
            return Object.assign({}, state$$1, { value: _newTime });
        }
        case TimepickerActions.CHANGE_MINUTES: {
            if (!canChangeValue(state$$1.config, action.payload) ||
                !canChangeMinutes(action.payload, state$$1.controls)) {
                return state$$1;
            }
            var _newTime = changeTime(state$$1.value, { minute: action.payload.step });
            if ((state$$1.config.max || state$$1.config.min) && !isValidLimit(state$$1.config, _newTime)) {
                return state$$1;
            }
            return Object.assign({}, state$$1, { value: _newTime });
        }
        case TimepickerActions.CHANGE_SECONDS: {
            if (!canChangeValue(state$$1.config, action.payload) ||
                !canChangeSeconds(action.payload, state$$1.controls)) {
                return state$$1;
            }
            var _newTime = changeTime(state$$1.value, {
                seconds: action.payload.step
            });
            if ((state$$1.config.max || state$$1.config.min) && !isValidLimit(state$$1.config, _newTime)) {
                return state$$1;
            }
            return Object.assign({}, state$$1, { value: _newTime });
        }
        case TimepickerActions.SET_TIME_UNIT: {
            if (!canChangeValue(state$$1.config)) {
                return state$$1;
            }
            var _newTime = setTime(state$$1.value, action.payload);
            return Object.assign({}, state$$1, { value: _newTime });
        }
        case TimepickerActions.UPDATE_CONTROLS: {
            var _newControlsState = timepickerControls(state$$1.value, action.payload);
            var _newState = {
                value: state$$1.value,
                config: action.payload,
                controls: _newControlsState
            };
            if (state$$1.config.showMeridian !== _newState.config.showMeridian) {
                if (state$$1.value) {
                    _newState.value = new Date(state$$1.value);
                }
            }
            return Object.assign({}, state$$1, _newState);
        }
        default:
            return state$$1;
    }
}
var __extends$14 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @copyright ngrx
 */
var MiniStore = (function (_super) {
    __extends$14(MiniStore, _super);
    function MiniStore(_dispatcher, _reducer, state$) {
        var _this = _super.call(this) || this;
        _this._dispatcher = _dispatcher;
        _this._reducer = _reducer;
        _this.source = state$;
        return _this;
    }
    MiniStore.prototype.select = function (pathOrMapFn) {
        var mapped$ = map.map.call(this, pathOrMapFn);
        return distinctUntilChanged.distinctUntilChanged.call(mapped$);
    };
    MiniStore.prototype.lift = function (operator) {
        var store = new MiniStore(this._dispatcher, this._reducer, this);
        store.operator = operator;
        return store;
    };
    MiniStore.prototype.dispatch = function (action) {
        this._dispatcher.next(action);
    };
    MiniStore.prototype.next = function (action) {
        this._dispatcher.next(action);
    };
    MiniStore.prototype.error = function (err) {
        this._dispatcher.error(err);
    };
    MiniStore.prototype.complete = function () {
        /*noop*/
    };
    return MiniStore;
}(Observable.Observable));
var __extends$16 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends$16(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state$$1, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state$$1, delay);
        }
        this.delay = delay;
        this.state = state$$1;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state$$1, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state$$1, delay) :
            this._execute(state$$1, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
var QueueAction_2 = QueueAction;
var QueueAction_1 = {
    QueueAction: QueueAction_2
};
var __extends$17 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QueueScheduler = (function (_super) {
    __extends$17(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
var QueueScheduler_2 = QueueScheduler;
var QueueScheduler_1 = {
    QueueScheduler: QueueScheduler_2
};
/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
var queue_1 = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
var __extends$15 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @copyright ngrx
 */
var MiniState = (function (_super) {
    __extends$15(MiniState, _super);
    function MiniState(_initialState, actionsDispatcher$, reducer) {
        var _this = _super.call(this, _initialState) || this;
        var actionInQueue$ = observeOn.observeOn.call(actionsDispatcher$, queue_1);
        var state$ = scan.scan.call(actionInQueue$, function (state$$1, action) {
            if (!action) {
                return state$$1;
            }
            return reducer(state$$1, action);
        }, _initialState);
        state$.subscribe(function (value) { return _this.next(value); });
        return _this;
    }
    return MiniState;
}(BehaviorSubject.BehaviorSubject));
var __extends$13 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TimepickerStore = (function (_super) {
    __extends$13(TimepickerStore, _super);
    function TimepickerStore() {
        var _this = this;
        var _dispatcher = new BehaviorSubject.BehaviorSubject({
            type: '[mini-ngrx] dispatcher init'
        });
        var state$$1 = new MiniState(initialState, _dispatcher, timepickerReducer);
        _this = _super.call(this, _dispatcher, timepickerReducer, state$$1) || this;
        return _this;
    }
    TimepickerStore.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TimepickerStore.ctorParameters = function () { return []; };
    return TimepickerStore;
}(MiniStore));
/* tslint:disable:no-forward-ref max-file-line-count */
var TIMEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: core.forwardRef(function () { return TimepickerComponent; }),
    multi: true
};
var TimepickerComponent = (function () {
    function TimepickerComponent(_config, _cd, _store, _timepickerActions) {
        var _this = this;
        this._store = _store;
        this._timepickerActions = _timepickerActions;
        /** emits true if value is a valid date */
        this.isValid = new core.EventEmitter();
        // min\max validation for input fields
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
        // control value accessor methods
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        Object.assign(this, _config);
        this.timepickerSub = _store.select(function (state$$1) { return state$$1.value; }).subscribe(function (value) {
            // update UI values if date changed
            _this._renderTime(value);
            _this.onChange(value);
            _this._store.dispatch(_this._timepickerActions.updateControls(getControlsValue(_this)));
        });
        _store.select(function (state$$1) { return state$$1.controls; }).subscribe(function (controlsState) {
            _this.isValid.emit(isInputValid(_this.hours, _this.minutes, _this.seconds, _this.isPM()));
            Object.assign(_this, controlsState);
            _cd.markForCheck();
        });
    }
    Object.defineProperty(TimepickerComponent.prototype, "isSpinnersVisible", {
        /** @deprecated - please use `isEditable` instead */
        get: function () {
            return this.showSpinners && !this.readonlyInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerComponent.prototype, "isEditable", {
        get: function () {
            return !(this.readonlyInput || this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    TimepickerComponent.prototype.resetValidation = function () {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    };
    TimepickerComponent.prototype.isPM = function () {
        return this.showMeridian && this.meridian === this.meridians[1];
    };
    TimepickerComponent.prototype.prevDef = function ($event) {
        $event.preventDefault();
    };
    TimepickerComponent.prototype.wheelSign = function ($event) {
        return Math.sign($event.deltaY) * -1;
    };
    TimepickerComponent.prototype.ngOnChanges = function (changes) {
        this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
    };
    TimepickerComponent.prototype.changeHours = function (step, source) {
        if (source === void 0) {
            source = '';
        }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeHours({ step: step, source: source }));
    };
    TimepickerComponent.prototype.changeMinutes = function (step, source) {
        if (source === void 0) {
            source = '';
        }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeMinutes({ step: step, source: source }));
    };
    TimepickerComponent.prototype.changeSeconds = function (step, source) {
        if (source === void 0) {
            source = '';
        }
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeSeconds({ step: step, source: source }));
    };
    TimepickerComponent.prototype.updateHours = function (hours) {
        this.resetValidation();
        this.hours = hours;
        var isValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
        if (!isValid) {
            this.invalidHours = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    TimepickerComponent.prototype.updateMinutes = function (minutes) {
        this.resetValidation();
        this.minutes = minutes;
        var isValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
        if (!isValid) {
            this.invalidMinutes = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    TimepickerComponent.prototype.updateSeconds = function (seconds) {
        this.resetValidation();
        this.seconds = seconds;
        var isValid = isSecondInputValid(this.seconds) && this.isValidLimit();
        if (!isValid) {
            this.invalidSeconds = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    };
    TimepickerComponent.prototype.isValidLimit = function () {
        return isInputLimitValid({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }, this.max, this.min);
    };
    TimepickerComponent.prototype._updateTime = function () {
        var _seconds = this.showSeconds ? this.seconds : void 0;
        var _minutes = this.showMinutes ? this.minutes : void 0;
        if (!isInputValid(this.hours, _minutes, _seconds, this.isPM())) {
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._store.dispatch(this._timepickerActions.setTime({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }));
    };
    TimepickerComponent.prototype.toggleMeridian = function () {
        if (!this.showMeridian || !this.isEditable) {
            return;
        }
        var _hoursPerDayHalf = 12;
        this._store.dispatch(this._timepickerActions.changeHours({
            step: _hoursPerDayHalf,
            source: ''
        }));
    };
    /**
     * Write a new value to the element.
     */
    TimepickerComponent.prototype.writeValue = function (obj) {
        if (isValidDate(obj)) {
            this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
        }
        else if (obj == null) {
            this._store.dispatch(this._timepickerActions.writeValue(null));
        }
    };
    /**
     * Set the function to be called when the control receives a change event.
     */
    TimepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * Set the function to be called when the control receives a touch event.
     */
    TimepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    TimepickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    TimepickerComponent.prototype.ngOnDestroy = function () {
        this.timepickerSub.unsubscribe();
    };
    TimepickerComponent.prototype._renderTime = function (value) {
        if (!isValidDate(value)) {
            this.hours = '';
            this.minutes = '';
            this.seconds = '';
            this.meridian = this.meridians[0];
            return;
        }
        var _value = parseTime(value);
        var _hoursPerDayHalf = 12;
        var _hours = _value.getHours();
        if (this.showMeridian) {
            this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
            _hours = _hours % _hoursPerDayHalf;
            // should be 12 PM, not 00 PM
            if (_hours === 0) {
                _hours = _hoursPerDayHalf;
            }
        }
        this.hours = padNumber(_hours);
        this.minutes = padNumber(_value.getMinutes());
        this.seconds = padNumber(_value.getUTCSeconds());
    };
    TimepickerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'timepicker',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore],
                    template: "<table> <tbody> <tr class=\"text-center\" [class.hidden]=\"!showSpinners\"> <!-- increment hours button--> <td> <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\" (click)=\"changeHours(hourStep)\" ><span class=\"bs-chevron bs-chevron-up\"></span></a> </td> <!-- divider --> <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td> <!-- increment minutes button --> <td *ngIf=\"showMinutes\"> <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\" (click)=\"changeMinutes(minuteStep)\" ><span class=\"bs-chevron bs-chevron-up\"></span></a> </td> <!-- divider --> <td *ngIf=\"showSeconds\">&nbsp;</td> <!-- increment seconds button --> <td *ngIf=\"showSeconds\"> <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\" (click)=\"changeSeconds(secondsStep)\"> <span class=\"bs-chevron bs-chevron-up\"></span> </a> </td> <!-- space between --> <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td> <!-- meridian placeholder--> <td *ngIf=\"showMeridian\"></td> </tr> <tr> <!-- hours --> <td class=\"form-group\" [class.has-error]=\"invalidHours\"> <input type=\"text\" [class.is-invalid]=\"invalidHours\" class=\"form-control text-center bs-timepicker-field\" placeholder=\"HH\" maxlength=\"2\" [readonly]=\"readonlyInput\" [disabled]=\"disabled\" [value]=\"hours\" (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\" (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\" (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\" (change)=\"updateHours($event.target.value)\"></td> <!-- divider --> <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td> <!-- minutes --> <td class=\"form-group\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\"> <input type=\"text\" [class.is-invalid]=\"invalidMinutes\" class=\"form-control text-center bs-timepicker-field\" placeholder=\"MM\" maxlength=\"2\" [readonly]=\"readonlyInput\" [disabled]=\"disabled\" [value]=\"minutes\" (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\" (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\" (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\" (change)=\"updateMinutes($event.target.value)\"> </td> <!-- divider --> <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td> <!-- seconds --> <td class=\"form-group\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\"> <input type=\"text\" [class.is-invalid]=\"invalidSeconds\" class=\"form-control text-center bs-timepicker-field\" placeholder=\"SS\" maxlength=\"2\" [readonly]=\"readonlyInput\" [disabled]=\"disabled\" [value]=\"seconds\" (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\" (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\" (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\" (change)=\"updateSeconds($event.target.value)\"> </td> <!-- space between --> <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td> <!-- meridian --> <td *ngIf=\"showMeridian\"> <button type=\"button\" class=\"btn btn-default text-center\" [disabled]=\"!isEditable || !canToggleMeridian\" [class.disabled]=\"!isEditable || !canToggleMeridian\" (click)=\"toggleMeridian()\" >{{ meridian }} </button> </td> </tr> <tr class=\"text-center\" [class.hidden]=\"!showSpinners\"> <!-- decrement hours button--> <td> <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\" (click)=\"changeHours(-hourStep)\"> <span class=\"bs-chevron bs-chevron-down\"></span> </a> </td> <!-- divider --> <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td> <!-- decrement minutes button--> <td *ngIf=\"showMinutes\"> <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\" (click)=\"changeMinutes(-minuteStep)\"> <span class=\"bs-chevron bs-chevron-down\"></span> </a> </td> <!-- divider --> <td *ngIf=\"showSeconds\">&nbsp;</td> <!-- decrement seconds button--> <td *ngIf=\"showSeconds\"> <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\" (click)=\"changeSeconds(-secondsStep)\"> <span class=\"bs-chevron bs-chevron-down\"></span> </a> </td> <!-- space between --> <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td> <!-- meridian placeholder--> <td *ngIf=\"showMeridian\"></td> </tr> </tbody> </table> ",
                    styles: ["\n    .bs-chevron{\n      border-style: solid;\n      display: block;\n      width: 9px;\n      height: 9px;\n      position: relative;\n      border-width: 3px 0px 0 3px;\n    }\n    .bs-chevron-up{\n      -webkit-transform: rotate(45deg);\n      transform: rotate(45deg);\n      top: 2px;\n    }\n    .bs-chevron-down{\n      -webkit-transform: rotate(-135deg);\n      transform: rotate(-135deg);\n      top: -2px;\n    }\n    .bs-timepicker-field{\n      width: 50px;\n    }\n  "],
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    TimepickerComponent.ctorParameters = function () {
        return [
            { type: TimepickerConfig, },
            { type: core.ChangeDetectorRef, },
            { type: TimepickerStore, },
            { type: TimepickerActions, },
        ];
    };
    TimepickerComponent.propDecorators = {
        'hourStep': [{ type: core.Input },],
        'minuteStep': [{ type: core.Input },],
        'secondsStep': [{ type: core.Input },],
        'readonlyInput': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
        'mousewheel': [{ type: core.Input },],
        'arrowkeys': [{ type: core.Input },],
        'showSpinners': [{ type: core.Input },],
        'showMeridian': [{ type: core.Input },],
        'showMinutes': [{ type: core.Input },],
        'showSeconds': [{ type: core.Input },],
        'meridians': [{ type: core.Input },],
        'min': [{ type: core.Input },],
        'max': [{ type: core.Input },],
        'isValid': [{ type: core.Output },],
    };
    return TimepickerComponent;
}());
var TimepickerModule = (function () {
    function TimepickerModule() {
    }
    TimepickerModule.forRoot = function () {
        return {
            ngModule: TimepickerModule,
            providers: [TimepickerConfig, TimepickerActions, TimepickerStore]
        };
    };
    TimepickerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [TimepickerComponent],
                    exports: [TimepickerComponent]
                },] },
    ];
    /** @nocollapse */
    TimepickerModule.ctorParameters = function () { return []; };
    return TimepickerModule;
}());
// tslint:disable:no-use-before-declare
// TODO: config: activeClass - Class to apply to the checked buttons
var CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return ButtonCheckboxDirective; }),
    multi: true
};
/**
 * Add checkbox functionality to any element
 */
var ButtonCheckboxDirective = (function () {
    function ButtonCheckboxDirective() {
        /** Truthy value, will be set to ngModel */
        this.btnCheckboxTrue = true;
        /** Falsy value, will be set to ngModel */
        this.btnCheckboxFalse = false;
        this.state = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    // view -> model
    ButtonCheckboxDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this.toggle(!this.state);
        this.onChange(this.value);
    };
    ButtonCheckboxDirective.prototype.ngOnInit = function () {
        this.toggle(this.trueValue === this.value);
    };
    Object.defineProperty(ButtonCheckboxDirective.prototype, "trueValue", {
        get: function () {
            return typeof this.btnCheckboxTrue !== 'undefined'
                ? this.btnCheckboxTrue
                : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonCheckboxDirective.prototype, "falseValue", {
        get: function () {
            return typeof this.btnCheckboxFalse !== 'undefined'
                ? this.btnCheckboxFalse
                : false;
        },
        enumerable: true,
        configurable: true
    });
    ButtonCheckboxDirective.prototype.toggle = function (state$$1) {
        this.state = state$$1;
        this.value = this.state ? this.trueValue : this.falseValue;
    };
    // ControlValueAccessor
    // model -> view
    ButtonCheckboxDirective.prototype.writeValue = function (value) {
        this.state = this.trueValue === value;
        this.value = value ? this.trueValue : this.falseValue;
    };
    ButtonCheckboxDirective.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    ButtonCheckboxDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonCheckboxDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonCheckboxDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[btnCheckbox]',
                    providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ButtonCheckboxDirective.ctorParameters = function () { return []; };
    ButtonCheckboxDirective.propDecorators = {
        'btnCheckboxTrue': [{ type: core.Input },],
        'btnCheckboxFalse': [{ type: core.Input },],
        'state': [{ type: core.HostBinding, args: ['class.active',] },],
        'onClick': [{ type: core.HostListener, args: ['click',] },],
    };
    return ButtonCheckboxDirective;
}());
// tslint:disable:no-use-before-declare
var RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return ButtonRadioGroupDirective; }),
    multi: true
};
/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
var ButtonRadioGroupDirective = (function () {
    function ButtonRadioGroupDirective(el, cdr) {
        this.el = el;
        this.cdr = cdr;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(ButtonRadioGroupDirective.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    ButtonRadioGroupDirective.prototype.writeValue = function (value) {
        this._value = value;
        this.cdr.markForCheck();
    };
    ButtonRadioGroupDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadioGroupDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadioGroupDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[btnRadioGroup]',
                    providers: [RADIO_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ButtonRadioGroupDirective.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: core.ChangeDetectorRef, },
        ];
    };
    return ButtonRadioGroupDirective;
}());
// tslint:disable:no-use-before-declare
var RADIO_CONTROL_VALUE_ACCESSOR$1 = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return ButtonRadioDirective; }),
    multi: true
};
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
var ButtonRadioDirective = (function () {
    function ButtonRadioDirective(el, cdr, group, renderer) {
        this.el = el;
        this.cdr = cdr;
        this.group = group;
        this.renderer = renderer;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(ButtonRadioDirective.prototype, "value", {
        /** Current value of radio component or group */
        get: function () {
            return this.group ? this.group.value : this._value;
        },
        set: function (value) {
            if (this.group) {
                this.group.value = value;
                return;
            }
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonRadioDirective.prototype, "disabled", {
        /** If `true` — radio button is disabled */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = disabled;
            this.setDisabledState(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonRadioDirective.prototype, "isActive", {
        get: function () {
            return this.btnRadio === this.value;
        },
        enumerable: true,
        configurable: true
    });
    ButtonRadioDirective.prototype.onClick = function () {
        if (this.el.nativeElement.attributes.disabled || !this.uncheckable && this.btnRadio === this.value) {
            return;
        }
        this.value = this.uncheckable && this.btnRadio === this.value ? undefined : this.btnRadio;
        this._onChange(this.value);
    };
    ButtonRadioDirective.prototype.ngOnInit = function () {
        this.uncheckable = typeof this.uncheckable !== 'undefined';
    };
    ButtonRadioDirective.prototype.onBlur = function () {
        this.onTouched();
    };
    ButtonRadioDirective.prototype._onChange = function (value) {
        if (this.group) {
            this.group.onTouched();
            this.group.onChange(value);
            return;
        }
        this.onTouched();
        this.onChange(value);
    };
    // ControlValueAccessor
    // model -> view
    ButtonRadioDirective.prototype.writeValue = function (value) {
        this.value = value;
        this.cdr.markForCheck();
    };
    ButtonRadioDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadioDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadioDirective.prototype.setDisabledState = function (disabled) {
        if (disabled) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');
            return;
        }
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    };
    ButtonRadioDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[btnRadio]',
                    providers: [RADIO_CONTROL_VALUE_ACCESSOR$1]
                },] },
    ];
    /** @nocollapse */
    ButtonRadioDirective.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: core.ChangeDetectorRef, },
            { type: ButtonRadioGroupDirective, decorators: [{ type: core.Optional },] },
            { type: core.Renderer2, },
        ];
    };
    ButtonRadioDirective.propDecorators = {
        'btnRadio': [{ type: core.Input },],
        'uncheckable': [{ type: core.Input },],
        'value': [{ type: core.Input },],
        'disabled': [{ type: core.Input },],
        'isActive': [{ type: core.HostBinding, args: ['class.active',] },],
        'onClick': [{ type: core.HostListener, args: ['click',] },],
    };
    return ButtonRadioDirective;
}());
var ButtonsModule = (function () {
    function ButtonsModule() {
    }
    ButtonsModule.forRoot = function () {
        return { ngModule: ButtonsModule, providers: [] };
    };
    ButtonsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective],
                    exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective]
                },] },
    ];
    /** @nocollapse */
    ButtonsModule.ctorParameters = function () { return []; };
    return ButtonsModule;
}());
/**
 * Convert a single dimension array to a double dimension array
 * @template T
 * @param {?} items the single dimension array to convert
 * @param {?} columns the number of items each array should have
 * @return {?}
 */
function gridify(items, columns) {
    var /** @type {?} */ grid = [];
    while (items.length) {
        grid.push(items.splice(0, columns));
    }
    return grid;
}
/**
 * Create an array of numbers between two limits
 * @param {?} start the lower limit
 * @param {?} end the upper limit
 * @return {?}
 */
function range(start, end) {
    var /** @type {?} */ list = [];
    for (var /** @type {?} */ idx = start; idx <= end; idx++) {
        list.push(idx);
    }
    return list;
}
/**
 * Create an array of dates between two points
 * @param {?} start the date to start the array
 * @param {?} end the date to end the array
 * @return {?}
 */
function dateRange(start, end) {
    var /** @type {?} */ dates = [];
    // loop through all the days between the date range
    while (start <= end) {
        // add the date to the array
        dates.push(new Date(start));
        // move to the next day
        start.setDate(start.getDate() + 1);
    }
    return dates;
}
/**
 * Compare two dates to see if they are on the same day
 * @param {?} day1 the first date to compare
 * @param {?} day2 the second date to compare
 * @return {?}
 */
function compareDays(day1, day2) {
    return day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear();
}
/**
 * Export an array of all the available months
 */
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthsShort = months.map(function (month) { return month.substring(0, 3); });
/**
 * Export an array of all the available days of the week
 */
var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var weekdaysShort = weekdays.map(function (weekday) { return weekday.substring(0, 3); });
/**
 * Add a config service to allow an application
 * to customize the date time picker default settings
 * across the entire application
 */
var DateTimePickerConfig = (function () {
    function DateTimePickerConfig() {
        this.showDate = true;
        this.showTime = true;
        this.showTimezone = true;
        this.showSeconds = false;
        this.showMeridian = true;
        this.showSpinners = true;
        this.weekdays = weekdaysShort;
        this.nowBtnText = 'Today';
        this.timezones = [
            { name: 'GMT-11', offset: -660 },
            { name: 'GMT-10', offset: -600 },
            { name: 'GMT-9', offset: -540 },
            { name: 'GMT-8', offset: -480 },
            { name: 'GMT-7', offset: -420 },
            { name: 'GMT-6', offset: -360 },
            { name: 'GMT-5', offset: -300 },
            { name: 'GMT-4', offset: -240 },
            { name: 'GMT-3', offset: -180 },
            { name: 'GMT-2', offset: -12 },
            { name: 'GMT-1', offset: -60 },
            { name: 'GMT', offset: 0 },
            { name: 'GMT+1', offset: 60 },
            { name: 'GMT+2', offset: 120 },
            { name: 'GMT+3', offset: 180 },
            { name: 'GMT+4', offset: 240 },
            { name: 'GMT+5', offset: 300 },
            { name: 'GMT+6', offset: 360 },
            { name: 'GMT+7', offset: 420 },
            { name: 'GMT+8', offset: 480 },
            { name: 'GMT+9', offset: 540 },
            { name: 'GMT+10', offset: 600 },
            { name: 'GMT+11', offset: 660 },
            { name: 'GMT+12', offset: 720 }
        ];
    }
    return DateTimePickerConfig;
}());
DateTimePickerConfig.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DateTimePickerConfig.ctorParameters = function () { return []; };
var DateTimePickerService = (function () {
    function DateTimePickerService() {
        var _this = this;
        this.date = new BehaviorSubject.BehaviorSubject(new Date());
        this.activeDate = new BehaviorSubject.BehaviorSubject(new Date());
        this.mode = new BehaviorSubject.BehaviorSubject(DatePickerMode.Day);
        this.month = new BehaviorSubject.BehaviorSubject(new Date().getMonth());
        this.year = new BehaviorSubject.BehaviorSubject(new Date().getFullYear());
        // when the date changes update the current month and year
        this.date.distinctUntilChanged(function (previous, current) { return previous.getTime() === current.getTime(); }).subscribe(function (date) {
            _this.month.next(date.getMonth());
            _this.year.next(date.getFullYear());
        });
    }
    return DateTimePickerService;
}());
DateTimePickerService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DateTimePickerService.ctorParameters = function () { return []; };
var DateTimePickerComponent = (function () {
    /**
     * @param {?} _config
     * @param {?} dateTimePickerService
     */
    function DateTimePickerComponent(_config, dateTimePickerService) {
        this._config = _config;
        this.dateTimePickerService = dateTimePickerService;
        this.showDate = this._config.showDate;
        this.showTime = this._config.showTime;
        this.showTimezone = this._config.showTimezone;
        this.showSeconds = this._config.showSeconds;
        this.showMeridian = this._config.showMeridian;
        this.showSpinners = this._config.showSpinners;
        this.weekdays = this._config.weekdays;
        this.nowBtnText = this._config.nowBtnText;
        this.timezones = this._config.timezones;
        this.dateChange = new core.EventEmitter();
        this.timezoneChange = new core.EventEmitter();
        // expose enum to view
        this.DatePickerMode = DatePickerMode;
    }
    Object.defineProperty(DateTimePickerComponent.prototype, "date", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dateTimePickerService.date.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.dateTimePickerService.date.next(new Date(value));
            // set the active date to the new date
            this.dateTimePickerService.activeDate.next(new Date(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "timezone", {
        /**
         * @return {?}
         */
        get: function () {
            return this._timezone;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ timezone = this.timezones.find(function (zone) { return zone.offset === value.offset; });
            // only update if the timezone is valid
            if (timezone) {
                this._timezone = timezone;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This will emit the newly selected date
     * @return {?}
     */
    DateTimePickerComponent.prototype.commit = function () {
        this.dateChange.emit(this.dateTimePickerService.activeDate.getValue());
    };
    /**
     * Change the date to the current date and time
     * @return {?}
     */
    DateTimePickerComponent.prototype.setToNow = function () {
        // set the date to the current moment
        this.date = new Date();
        // reset the timezone to the default
        if (this.timePickerComponent) {
            this.timePickerComponent.setDefaultTimezone();
        }
        // emit the changes
        this.commit();
    };
    return DateTimePickerComponent;
}());
DateTimePickerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker',
                template: "\n    <div class=\"calendar-container\">\n\n      <ng-container *ngIf=\"showDate\" [ngSwitch]=\"dateTimePickerService.mode | async\">\n\n        <!-- Display days in the current month -->\n        <ux-date-time-picker-day-view *ngSwitchCase=\"DatePickerMode.Day\" [weekdays]=\"weekdays\" (dateChange)=\"commit()\"></ux-date-time-picker-day-view>\n  \n        <!-- Display the months in the current year -->\n        <ux-date-time-picker-month-view *ngSwitchCase=\"DatePickerMode.Month\"></ux-date-time-picker-month-view>\n  \n        <!-- Display a decade -->\n        <ux-date-time-picker-year-view *ngSwitchCase=\"DatePickerMode.Year\"></ux-date-time-picker-year-view>\n  \n      </ng-container>\n\n      <!-- Display a Time Picker -->\n      <ux-date-time-picker-time-view *ngIf=\"showTime\" #timePicker (dateChange)=\"commit()\" [showSpinners]=\"showSpinners\" [showTimezone]=\"showTimezone\" [showSeconds]=\"showSeconds\" [showMeridian]=\"showMeridian\" (dateChange)=\"commit()\" [timezone]=\"timezone\" (timezoneChange)=\"timezoneChange.emit($event)\" [timezones]=\"timezones\"></ux-date-time-picker-time-view>\n\n    </div>\n\n    <button class=\"now-button\" (click)=\"setToNow()\">{{ nowBtnText }}</button>\n  ",
                providers: [DateTimePickerService]
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerComponent.ctorParameters = function () { return [
    { type: DateTimePickerConfig, },
    { type: DateTimePickerService, },
]; };
DateTimePickerComponent.propDecorators = {
    'timePickerComponent': [{ type: core.ViewChild, args: ['timePicker',] },],
    'showDate': [{ type: core.Input },],
    'showTime': [{ type: core.Input },],
    'showTimezone': [{ type: core.Input },],
    'showSeconds': [{ type: core.Input },],
    'showMeridian': [{ type: core.Input },],
    'showSpinners': [{ type: core.Input },],
    'weekdays': [{ type: core.Input },],
    'nowBtnText': [{ type: core.Input },],
    'timezones': [{ type: core.Input },],
    'dateChange': [{ type: core.Output },],
    'timezoneChange': [{ type: core.Output },],
    'date': [{ type: core.Input },],
    'timezone': [{ type: core.Input },],
};
var DatePickerMode = {};
DatePickerMode.Day = 0;
DatePickerMode.Month = 1;
DatePickerMode.Year = 2;
DatePickerMode[DatePickerMode.Day] = "Day";
DatePickerMode[DatePickerMode.Month] = "Month";
DatePickerMode[DatePickerMode.Year] = "Year";
var DateTimePickerDayViewComponent = (function () {
    /**
     * @param {?} dateTimePickerService
     */
    function DateTimePickerDayViewComponent(dateTimePickerService) {
        this.dateTimePickerService = dateTimePickerService;
        this.days = [];
        this.weekdays = weekdaysShort;
        this.dateChange = new core.EventEmitter();
    }
    Object.defineProperty(DateTimePickerDayViewComponent.prototype, "date", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dateTimePickerService.activeDate.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.dateTimePickerService.activeDate.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerDayViewComponent.prototype, "month", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dateTimePickerService.month.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.dateTimePickerService.month.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerDayViewComponent.prototype, "year", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dateTimePickerService.year.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.dateTimePickerService.year.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // update the grid only when the value of the active date, month or year has changed
        this._subscription = Observable.Observable.merge(this.dateTimePickerService.activeDate.distinctUntilChanged(), this.dateTimePickerService.month.distinctUntilChanged(), this.dateTimePickerService.year.distinctUntilChanged())
            .subscribe(function () { return _this.update(); });
    };
    /**
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.ngOnDestroy = function () {
        // remove all subscriptions
        this._subscription.unsubscribe();
    };
    /**
     * Navigate to the previous page of dates
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.previous = function () {
        // update the month
        this.month--;
        // if the month is now the previous year take that into account
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }
        // update the grid
        this.update();
    };
    /**
     * Navigate to the next page of dates
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.next = function () {
        // update the month
        this.month++;
        // if the month is now the previous year take that into account
        if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
        // update the grid
        this.update();
    };
    /**
     * Updates the grid of all the days in the month
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.update = function () {
        var _this = this;
        // find the lower and upper boundaries
        var /** @type {?} */ start = new Date(this.year, this.month, 1);
        var /** @type {?} */ end = new Date(this.year, this.month + 1, 0);
        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());
        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));
        // create an array of all the days to display
        var /** @type {?} */ dates = dateRange(start, end);
        // update the page header
        this.header = months[this.month] + " " + this.year;
        // turn the dates into a grid
        this.days = gridify(dates, 7).map(function (week) { return week.map(function (date) { return ({
            date: date,
            today: _this.isToday(date),
            active: _this.isActive(date),
            currentMonth: _this.isCurrentMonth(date)
        }); }); });
    };
    /**
     * Select a particular date
     * @param {?} date the date to select
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.select = function (date) {
        // update the current date object
        this.date = new Date(date);
        // emit the new date
        this.dateChange.emit();
    };
    /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.isToday = function (date) {
        return compareDays(new Date(), date);
    };
    /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.isActive = function (date) {
        return compareDays(this.date, date);
    };
    /**
     * Determine whether or not a date is within the current month
     * or is it part of another month being show to fill the grid
     * @param {?} date The date in question
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.isCurrentMonth = function (date) {
        return date.getMonth() === this.month;
    };
    /**
     * Update the date picker view to show the month picker
     * @return {?}
     */
    DateTimePickerDayViewComponent.prototype.showMonthPicker = function () {
        this.dateTimePickerService.mode.next(DatePickerMode.Month);
    };
    return DateTimePickerDayViewComponent;
}());
DateTimePickerDayViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker-day-view',
                template: "\n    <ux-date-time-picker-header [header]=\"header\" (previous)=\"previous()\" (next)=\"next()\" (ascend)=\"showMonthPicker()\"></ux-date-time-picker-header>\n\n    <table class=\"calendar\">\n      <thead>\n        <tr>\n          <th *ngFor=\"let day of weekdays\" class=\"weekday\">{{ day }}</th>\n        </tr>\n      </thead>\n\n      <tbody>\n        <tr *ngFor=\"let row of days\">\n          <td *ngFor=\"let day of row\" class=\"date-cell\" [class.current]=\"day.today\" \n            [class.active]=\"day.active\" [class.preview]=\"!day.currentMonth\" \n            (mousedown)=\"select(day.date)\" (keyup.enter)=\"select(day.date)\" \n            tabindex=\"0\">{{ day.date.getDate() }}</td>\n        </tr>\n      </tbody>\n    </table>\n  "
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerDayViewComponent.ctorParameters = function () { return [
    { type: DateTimePickerService, },
]; };
DateTimePickerDayViewComponent.propDecorators = {
    'weekdays': [{ type: core.Input },],
    'dateChange': [{ type: core.Output },],
};
var DateTimePickerMonthViewComponent = (function () {
    /**
     * @param {?} _dateTimePickerService
     */
    function DateTimePickerMonthViewComponent(_dateTimePickerService) {
        this._dateTimePickerService = _dateTimePickerService;
        this.months = gridify(range(0, 11), 4);
        this.currentDate = new Date();
    }
    Object.defineProperty(DateTimePickerMonthViewComponent.prototype, "date", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dateTimePickerService.activeDate.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerMonthViewComponent.prototype, "month", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dateTimePickerService.month.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dateTimePickerService.month.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerMonthViewComponent.prototype, "year", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dateTimePickerService.year.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dateTimePickerService.year.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Go to the previous year and emit the change
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.previous = function () {
        this.year--;
    };
    /**
     * Go to the next year and emit the change
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.next = function () {
        this.year++;
    };
    /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.select = function (month) {
        this.month = month;
        // show the day picker
        this.showDayPicker();
    };
    /**
     * Get the name of a month
     * @param {?} month the month in question
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.getMonthName = function (month) {
        return monthsShort[month];
    };
    /**
     * Show the daye picker view
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.showDayPicker = function () {
        this._dateTimePickerService.mode.next(DatePickerMode.Day);
    };
    /**
     * Show the year picker view
     * @return {?}
     */
    DateTimePickerMonthViewComponent.prototype.showYearPicker = function () {
        this._dateTimePickerService.mode.next(DatePickerMode.Year);
    };
    return DateTimePickerMonthViewComponent;
}());
DateTimePickerMonthViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker-month-view',
                template: "\n    <ux-date-time-picker-header [header]=\"year\" (previous)=\"previous()\" (next)=\"next()\" (ascend)=\"showYearPicker()\"></ux-date-time-picker-header>\n\n    <div class=\"calendar\">\n      <div class=\"calendar-row\" *ngFor=\"let row of months\">\n        <div class=\"calendar-item\" *ngFor=\"let item of row\" [class.active]=\"item === date.getMonth() && year === date.getFullYear()\"\n          [class.current]=\"item === currentDate.getMonth() && year === currentDate.getFullYear()\" (mousedown)=\"select(item)\" (keyup.enter)=\"select(item)\" tabindex=\"0\">{{ getMonthName(item) }}</div>\n      </div>\n    </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerMonthViewComponent.ctorParameters = function () { return [
    { type: DateTimePickerService, },
]; };
var DateTimePickerYearViewComponent = (function () {
    /**
     * @param {?} _dateTimePickerService
     */
    function DateTimePickerYearViewComponent(_dateTimePickerService) {
        this._dateTimePickerService = _dateTimePickerService;
        this._page = 0;
        this.years = [];
        this.currentYear = new Date().getFullYear();
    }
    /**
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.ngOnInit = function () {
        this.update();
    };
    Object.defineProperty(DateTimePickerYearViewComponent.prototype, "year", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dateTimePickerService.year.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dateTimePickerService.year.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} year
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.select = function (year) {
        this.year = year;
        // show the month picker
        this.showMonthPicker();
    };
    /**
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.previous = function () {
        this._page--;
        this.update();
    };
    /**
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.next = function () {
        this._page++;
        this.update();
    };
    /**
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.update = function () {
        // get the years to display
        var /** @type {?} */ decade = this.getDecade();
        // update the header
        this.header = decade.start + " - " + decade.end;
        // create the grid
        this.years = gridify(decade.range, 4);
    };
    /**
     * Get the years in the current decade to display
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.getDecade = function () {
        // the number of years to display
        var /** @type {?} */ yearCount = 10;
        // figure the start and end points
        var /** @type {?} */ start = (this.year - (this.year % yearCount)) + (this._page * yearCount);
        var /** @type {?} */ end = start + yearCount - 1;
        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    };
    /**
     * Show the month picker view
     * @return {?}
     */
    DateTimePickerYearViewComponent.prototype.showMonthPicker = function () {
        this._dateTimePickerService.mode.next(DatePickerMode.Month);
    };
    return DateTimePickerYearViewComponent;
}());
DateTimePickerYearViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker-year-view',
                template: "\n    <ux-date-time-picker-header [header]=\"header\" [canAscend]=\"false\" (previous)=\"previous()\" (next)=\"next()\"></ux-date-time-picker-header>\n\n    <div class=\"calendar\">\n      <div class=\"calendar-row\" *ngFor=\"let row of years\">\n        <div *ngFor=\"let item of row\" class=\"calendar-item\" [class.current]=\"item === currentYear\" [class.active]=\"item === year\"\n        (mousedown)=\"select(item)\" (keyup.enter)=\"select(item)\" tabindex=\"0\">{{ item }}</div>\n      </div>\n    </div>\n  "
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerYearViewComponent.ctorParameters = function () { return [
    { type: DateTimePickerService, },
]; };
var DateTimePickerHeaderComponent = (function () {
    function DateTimePickerHeaderComponent() {
        this.canAscend = true;
        this.next = new core.EventEmitter();
        this.previous = new core.EventEmitter();
        this.ascend = new core.EventEmitter();
    }
    return DateTimePickerHeaderComponent;
}());
DateTimePickerHeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker-header',
                template: "\n      <header class=\"header\">\n\n        <div class=\"header-navigation\" (click)=\"previous.emit(); $event.stopPropagation()\" (keyup.enter)=\"previous.emit()\" tabindex=\"0\">\n          <i class=\"hpe-icon hpe-previous\"></i>\n        </div>\n\n        <div class=\"header-title\" [class.active]=\"canAscend\" (click)=\"ascend.emit(); $event.stopPropagation()\" (keyup.enter)=\"ascend.emit()\" tabindex=\"0\">{{ header }}</div>\n\n        <div class=\"header-navigation\" (click)=\"next.emit(); $event.stopPropagation()\" (keyup.enter)=\"next.emit()\" tabindex=\"0\">\n          <i class=\"hpe-icon hpe-next\"></i>\n        </div>\n      </header>\n    "
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerHeaderComponent.ctorParameters = function () { return []; };
DateTimePickerHeaderComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'canAscend': [{ type: core.Input },],
    'next': [{ type: core.Output },],
    'previous': [{ type: core.Output },],
    'ascend': [{ type: core.Output },],
};
var DateTimePickerTimeViewComponent = (function () {
    function DateTimePickerTimeViewComponent() {
        this.date = new Date();
        this.showSeconds = false;
        this.showSpinners = true;
        this.showTimezone = true;
        this.showMeridian = true;
        this.dateChange = new core.EventEmitter();
        this.timezoneChange = new core.EventEmitter();
        this.meridian = DatePickerMeridian.AM;
        // Expose enum to view
        this.DatePickerMeridian = DatePickerMeridian;
    }
    Object.defineProperty(DateTimePickerTimeViewComponent.prototype, "timezone", {
        /**
         * @return {?}
         */
        get: function () {
            return this._timezone;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== this._timezone) {
                this._timezone = value;
                this.timezoneChange.emit(this._timezone);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // if the user did not specify a timezone - choose a default one
        if (!this.timezone) {
            setTimeout(function () { return _this.setDefaultTimezone(); });
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.setDefaultTimezone = function () {
        // determine the user default timezone
        var /** @type {?} */ offset = new Date().getTimezoneOffset();
        // find the closest timezone
        this.timezone = this.timezones.find(function (zone) { return zone.offset === offset; });
        // if not match was found then set to GMT
        if (!this.timezone) {
            this.timezone = this.timezones.find(function (zone) { return zone.offset === 0; });
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.update = function (date) {
        // if the date is invalid then stop here
        if (!date) {
            return;
        }
        // update the meridian
        this.meridian = date.getHours() < 12 ? DatePickerMeridian.AM : DatePickerMeridian.PM;
        // if the date has not changed then don't emit
        if (date.getTime() !== this.date.getTime()) {
            this.date = date;
            this.dateChange.emit(date);
        }
    };
    /**
     * @param {?} meridian
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.setMeridian = function (meridian) {
        // get the current hours
        var /** @type {?} */ hours = this.date.getHours();
        // if we are transitioning to AM and time is currently PM
        if (meridian === DatePickerMeridian.AM && hours >= 12) {
            this.date.setHours(hours - 12);
            this.dateChange.emit(this.date);
        }
        // if we are transitioning to PM and time is currently AM
        if (meridian === DatePickerMeridian.PM && hours < 12) {
            this.date.setHours(hours + 12);
            this.dateChange.emit(this.date);
        }
    };
    /**
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.previousTimezone = function () {
        var _this = this;
        // get the current zone
        var /** @type {?} */ currentZone = this.timezones.findIndex(function (zone) { return zone.name === _this.timezone.name && zone.offset === _this.timezone.offset; });
        // try to get the previous zone
        this.timezone = this.timezones[currentZone - 1] ? this.timezones[currentZone - 1] : this.timezones[currentZone];
    };
    /**
     * @return {?}
     */
    DateTimePickerTimeViewComponent.prototype.nextTimezone = function () {
        var _this = this;
        // get the current zone
        var /** @type {?} */ currentZone = this.timezones.findIndex(function (zone) { return zone.name === _this.timezone.name && zone.offset === _this.timezone.offset; });
        // try to get the next zone
        this.timezone = this.timezones[currentZone + 1] ? this.timezones[currentZone + 1] : this.timezones[currentZone];
    };
    return DateTimePickerTimeViewComponent;
}());
DateTimePickerTimeViewComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-date-time-picker-time-view',
                template: "\n      <div class=\"time-input-container\">\n        <timepicker [ngModel]=\"date\" (ngModelChange)=\"update($event)\" [minuteStep]=\"1\" [hourStep]=\"1\" [secondsStep]=\"1\" [showSeconds]=\"showSeconds\"\n          [showSpinners]=\"showSpinners\" [showMeridian]=\"showMeridian\"></timepicker>\n\n        <div class=\"btn-group meridian-picker\" *ngIf=\"showMeridian\">\n          <button type=\"button\" class=\"btn button-toggle-accent\" [(ngModel)]=\"meridian\" (ngModelChange)=\"setMeridian($event)\" [btnRadio]=\"DatePickerMeridian.AM\">AM</button>\n          <button type=\"button\" class=\"btn button-toggle-accent\" [(ngModel)]=\"meridian\" (ngModelChange)=\"setMeridian($event)\" [btnRadio]=\"DatePickerMeridian.PM\">PM</button>\n        </div>\n\n        <table class=\"time-zone-picker-container\" *ngIf=\"showTimezone && showSpinners\">\n          <tbody>\n            <tr>\n              <td class=\"text-center\">\n                <a class=\"btn btn-link\" (click)=\"nextTimezone()\">\n                  <span class=\"hpe-icon hpe-up\"></span>\n                </a>\n              </td>\n            </tr>\n            <tr>\n              <td class=\"form-group\">\n                <div class=\"form-control time-zone-picker\">\n                  <span class=\"time-zone\">{{ timezone?.name }}</span>\n                </div>\n              </td>\n            </tr>\n            <tr>\n              <td class=\"text-center\">\n                <a class=\"btn btn-link\" (click)=\"previousTimezone()\">\n                  <span class=\"hpe-icon hpe-down\"></span>\n                </a>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n        <div *ngIf=\"showTimezone && !showSpinners\">\n          <select class=\"form-control time-zone-picker-select\" [(ngModel)]=\"timezone\">\n            <option *ngFor=\"let zone of timezones\" [ngValue]=\"zone\">{{ zone?.name }}</option>\n          </select>\n        </div>\n\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerTimeViewComponent.ctorParameters = function () { return []; };
DateTimePickerTimeViewComponent.propDecorators = {
    'date': [{ type: core.Input },],
    'showSeconds': [{ type: core.Input },],
    'showSpinners': [{ type: core.Input },],
    'showTimezone': [{ type: core.Input },],
    'showMeridian': [{ type: core.Input },],
    'timezones': [{ type: core.Input },],
    'dateChange': [{ type: core.Output },],
    'timezoneChange': [{ type: core.Output },],
    'timezone': [{ type: core.Input },],
};
var DatePickerMeridian = {};
DatePickerMeridian.AM = 0;
DatePickerMeridian.PM = 1;
DatePickerMeridian[DatePickerMeridian.AM] = "AM";
DatePickerMeridian[DatePickerMeridian.PM] = "PM";
var DECLARATIONS$1 = [
    DateTimePickerComponent,
    DateTimePickerDayViewComponent,
    DateTimePickerMonthViewComponent,
    DateTimePickerYearViewComponent,
    DateTimePickerTimeViewComponent,
    DateTimePickerHeaderComponent
];
var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    return DateTimePickerModule;
}());
DateTimePickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    TimepickerModule.forRoot(),
                    ButtonsModule.forRoot()
                ],
                exports: DECLARATIONS$1,
                declarations: DECLARATIONS$1,
                providers: [
                    DateTimePickerConfig
                ]
            },] },
];
/**
 * @nocollapse
 */
DateTimePickerModule.ctorParameters = function () { return []; };
var EboxComponent = (function () {
    function EboxComponent() {
    }
    return EboxComponent;
}());
EboxComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-ebox',
                template: "\n      <div class=\"ux-ebox-header\">\n          <ng-content select=\"ux-ebox-header\"></ng-content>\n      </div>\n\n      <div class=\"ux-ebox-content\">\n          <ng-content select=\"ux-ebox-content\"></ng-content>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
EboxComponent.ctorParameters = function () { return []; };
var EboxHeaderDirective = (function () {
    function EboxHeaderDirective() {
    }
    return EboxHeaderDirective;
}());
EboxHeaderDirective.decorators = [
    { type: core.Directive, args: [{
                selector: 'ux-ebox-header'
            },] },
];
/**
 * @nocollapse
 */
EboxHeaderDirective.ctorParameters = function () { return []; };
var EboxContentDirective = (function () {
    function EboxContentDirective() {
    }
    return EboxContentDirective;
}());
EboxContentDirective.decorators = [
    { type: core.Directive, args: [{
                selector: 'ux-ebox-content'
            },] },
];
/**
 * @nocollapse
 */
EboxContentDirective.ctorParameters = function () { return []; };
var EboxModule = (function () {
    function EboxModule() {
    }
    return EboxModule;
}());
EboxModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
                declarations: [EboxComponent, EboxContentDirective, EboxHeaderDirective]
            },] },
];
/**
 * @nocollapse
 */
EboxModule.ctorParameters = function () { return []; };
/** Default values provider for tooltip */
var TooltipConfig = (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'top';
        /** array of event names which triggers tooltip opening */
        this.triggers = 'hover focus';
    }
    TooltipConfig.decorators = [
        { type: core.Injectable },
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
var win = (typeof window !== 'undefined' && window) || {};
var document$1 = win.document;
var location = win.location;
var gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
var performance = win['performance'] ? win['performance'] : null;
var Event = win['Event'];
var MouseEvent$1 = win['MouseEvent'];
var KeyboardEvent = win['KeyboardEvent'];
var EventTarget = win['EventTarget'];
var History = win['History'];
var Location = win['Location'];
var EventListener = win['EventListener'];
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
        this.classMap["tooltip-" + this.placement] = true;
        this.classMap.in = true;
        if (this.animation) {
            this.classMap.fade = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    };
    TooltipContainerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'bs-tooltip-container',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip'
                    },
                    styles: [
                        "\n    :host.tooltip {\n      display: block;\n    }\n    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {\n      left: 50%;\n    }\n    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {\n      top: 50%;\n    }\n  "
                    ],
                    template: "\n    <div class=\"tooltip-arrow arrow\"></div>\n    <div class=\"tooltip-inner\"><ng-content></ng-content></div>\n    "
                },] },
    ];
    /** @nocollapse */
    TooltipContainerComponent.ctorParameters = function () {
        return [
            { type: TooltipConfig, },
        ];
    };
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
    Trigger.prototype.isManual = function () {
        return this.open === 'manual' || this.close === 'manual';
    };
    return Trigger;
}());
var DEFAULT_ALIASES = {
    hover: ['mouseover', 'mouseout'],
    focus: ['focusin', 'focusout']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) {
        aliases = DEFAULT_ALIASES;
    }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers
        .split(/\s+/)
        .map(function (trigger$$1) { return trigger$$1.split(':'); })
        .map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers.filter(function (triggerPair) {
        return triggerPair.isManual();
    });
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
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
    parsedTriggers.forEach(function (trigger$$1) {
        var useToggle = trigger$$1.open === trigger$$1.close;
        var showFn = useToggle ? options.toggle : options.show;
        if (!useToggle) {
            _registerHide.push(function () {
                return renderer.listen(target, trigger$$1.close, options.hide);
            });
        }
        listeners.push(renderer.listen(target, trigger$$1.open, function () { return showFn(registerHide); }));
    });
    return function () {
        listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); });
    };
}
function registerOutsideClick(renderer, options) {
    if (!options.outsideClick) {
        return Function.prototype;
    }
    return renderer.listen('document', 'click', function (event) {
        if (options.target && options.target.contains(event.target)) {
            return;
        }
        if (options.targets &&
            options.targets.some(function (target) { return target.contains(event.target); })) {
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
// tslint:disable:max-file-line-count
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
        this.onBeforeShow = new core.EventEmitter();
        this.onShown = new core.EventEmitter();
        this.onBeforeHide = new core.EventEmitter();
        this.onHidden = new core.EventEmitter();
        this._providers = [];
        this._isHiding = false;
        this._listenOpts = {};
        this._globalListener = Function.prototype;
    }
    Object.defineProperty(ComponentLoader.prototype, "isShown", {
        get: function () {
            if (this._isHiding) {
                return false;
            }
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
        if (opts === void 0) {
            opts = {};
        }
        this._subscribePositioning();
        this._innerComponent = null;
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
            var injector = core.ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
            this._applicationRef.attachView(this._componentRef.hostView);
            // this._componentRef = this._viewContainerRef
            //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container instanceof core.ElementRef) {
                this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
            }
            if (this.container === 'body' && typeof document !== 'undefined') {
                document
                    .querySelector(this.container)
                    .appendChild(this._componentRef.location.nativeElement);
            }
            if (!this.container &&
                this._elementRef &&
                this._elementRef.nativeElement.parentElement) {
                this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
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
        if (this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
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
        var hide = (this._listenOpts.hide = function () {
            return listenOpts.hide ? listenOpts.hide() : void _this.hide();
        });
        var show = (this._listenOpts.show = function (registerHide) {
            listenOpts.show ? listenOpts.show(registerHide) : _this.show(registerHide);
            registerHide();
        });
        var toggle = function (registerHide) {
            _this.isShown ? hide() : show(registerHide);
        };
        this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
            target: listenOpts.target,
            triggers: listenOpts.triggers,
            show: show,
            hide: hide,
            toggle: toggle
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
        this._zoneSubscription = this._ngZone.onStable.subscribe(function () {
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
    ComponentLoader.prototype._getContentRef = function (content, context, initialState) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof core.TemplateRef) {
            if (this._viewContainerRef) {
                var _viewRef = this._viewContainerRef
                    .createEmbeddedView(content, context);
                _viewRef.markForCheck();
                return new ContentRef([_viewRef.rootNodes], _viewRef);
            }
            var viewRef = content.createEmbeddedView({});
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'function') {
            var contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
            var modalContentInjector = core.ReflectiveInjector.resolveAndCreate(this._providers.slice(), this._injector);
            var componentRef = contentCmptFactory.create(modalContentInjector);
            Object.assign(componentRef.instance, initialState);
            this._applicationRef.attachView(componentRef.hostView);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        return new ContentRef([[this._renderer.createText("" + content)]]);
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
        if (round === void 0) {
            round = true;
        }
        var elPosition;
        var parentOffset = {
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
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
        if (round === void 0) {
            round = true;
        }
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
        var hostElPosition = appendToBody
            ? this.offset(hostElement, false)
            : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left +
                hostElPosition.width / 2 -
                targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top +
                hostElPosition.height / 2 -
                targetElement.offsetHeight / 2,
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
        if (placementPrimary === 'auto') {
            var newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement, placementSecondary);
            if (!newPlacementPrimary)
                newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement);
            if (newPlacementPrimary)
                placementPrimary = newPlacementPrimary;
            targetElement.classList.add(placementPrimary);
        }
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top =
                    hostElPosition.top -
                        (targetElement.offsetHeight +
                            parseFloat(targetElStyles.marginBottom));
                targetElPosition.bottom +=
                    hostElPosition.top - targetElement.offsetHeight;
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
                targetElPosition.left =
                    hostElPosition.left -
                        (targetElement.offsetWidth + parseFloat(targetElStyles.marginRight));
                targetElPosition.right +=
                    hostElPosition.left - targetElement.offsetWidth;
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
        if ((!preferredPosition || preferredPosition === 'right') &&
            targetElPosition.left + hostElPosition.left - targetElement.offsetWidth <
                0) {
            return 'right';
        }
        else if ((!preferredPosition || preferredPosition === 'top') &&
            targetElPosition.bottom +
                hostElPosition.bottom +
                targetElement.offsetHeight >
                window.innerHeight) {
            return 'top';
        }
        else if ((!preferredPosition || preferredPosition === 'bottom') &&
            targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0) {
            return 'bottom';
        }
        else if ((!preferredPosition || preferredPosition === 'left') &&
            targetElPosition.right +
                hostElPosition.right +
                targetElement.offsetWidth >
                window.innerWidth) {
            return 'left';
        }
        return null;
    };
    Positioning.prototype.getAllStyles = function (element) {
        return window.getComputedStyle(element);
    };
    Positioning.prototype.getStyle = function (element, prop) {
        return this.getAllStyles(element)[prop];
    };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl &&
            offsetParentEl !== document.documentElement &&
            this.isStaticPositioned(offsetParentEl)) {
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
        positionElements(_getHtmlElement(target), _getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return []; };
    return PositioningService;
}());
function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof core.ElementRef) {
        return element.nativeElement;
    }
    return element;
}
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
        { type: core.Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () {
        return [
            { type: core.ComponentFactoryResolver, },
            { type: core.NgZone, },
            { type: core.Injector, },
            { type: PositioningService, },
            { type: core.ApplicationRef, },
        ];
    };
    return ComponentLoaderFactory;
}());
/*tslint:disable:no-invalid-this */
function OnChange(defaultValue) {
    var sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        var _key = " __" + propertyKey + "Value";
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[_key];
            },
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
var _hideMsg = typeof console === 'undefined' || !('warn' in console);
function warnOnce(msg) {
    if (!core.isDevMode() || _hideMsg || msg in _messagesHash) {
        return;
    }
    _messagesHash[msg] = true;
    /*tslint:disable-next-line*/
    console.warn(msg);
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
// tslint:disable:deprecation
var TooltipDirective = (function () {
    function TooltipDirective(_viewContainerRef, _renderer, _elementRef, cis, config) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** Fired when tooltip content changes */
        this.tooltipChange = new core.EventEmitter();
        /**
         * Css class for tooltip container
         */
        this.containerClass = '';
        /** @deprecated - removed, will be added to configuration */
        this._animation = true;
        /** @deprecated */
        this._fadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new core.EventEmitter();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: TooltipConfig, useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    Object.defineProperty(TooltipDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the tooltip is currently being shown
         */
        get: function () {
            return this._tooltip.isShown;
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
    Object.defineProperty(TooltipDirective.prototype, "htmlContent", {
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
            return this.isDisabled;
        },
        /** @deprecated - please use `isDisabled` instead */
        set: function (value) {
            warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
            this.isDisabled = value;
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
    Object.defineProperty(TooltipDirective.prototype, "_tooltipPopupDelay", {
        /** @deprecated */
        set: function (value) {
            warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
            this.delay = value;
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
        if (this.isOpen ||
            this.isDisabled ||
            this._delayTimeoutId ||
            !this.tooltip) {
            return;
        }
        var showTooltip = function () {
            if (_this._delayTimeoutId) {
                _this._delayTimeoutId = undefined;
            }
            _this._tooltip
                .attach(TooltipContainerComponent)
                .to(_this.container)
                .position({ attachment: _this.placement })
                .show({
                content: _this.tooltip,
                placement: _this.placement,
                containerClass: _this.containerClass
            });
        };
        var cancelDelayedTooltipShowing = function () {
            if (_this._tooltipCancelShowFn) {
                _this._tooltipCancelShowFn();
            }
        };
        if (this.delay) {
            var timer_1 = Observable.Observable.timer(this.delay).subscribe(function () {
                showTooltip();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                var triggers = parseTriggers(this.triggers);
                this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, triggers[0].close, function () {
                    timer_1.unsubscribe();
                    cancelDelayedTooltipShowing();
                });
            }
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
        { type: core.Directive, args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () {
        return [
            { type: core.ViewContainerRef, },
            { type: core.Renderer2, },
            { type: core.ElementRef, },
            { type: ComponentLoaderFactory, },
            { type: TooltipConfig, },
        ];
    };
    TooltipDirective.propDecorators = {
        'tooltip': [{ type: core.Input },],
        'tooltipChange': [{ type: core.Output },],
        'placement': [{ type: core.Input },],
        'triggers': [{ type: core.Input },],
        'container': [{ type: core.Input },],
        'isOpen': [{ type: core.Input },],
        'isDisabled': [{ type: core.Input },],
        'containerClass': [{ type: core.Input },],
        'delay': [{ type: core.Input },],
        'onShown': [{ type: core.Output },],
        'onHidden': [{ type: core.Output },],
        'htmlContent': [{ type: core.Input, args: ['tooltipHtml',] },],
        '_placement': [{ type: core.Input, args: ['tooltipPlacement',] },],
        '_isOpen': [{ type: core.Input, args: ['tooltipIsOpen',] },],
        '_enable': [{ type: core.Input, args: ['tooltipEnable',] },],
        '_appendToBody': [{ type: core.Input, args: ['tooltipAppendToBody',] },],
        '_animation': [{ type: core.Input, args: ['tooltipAnimation',] },],
        '_popupClass': [{ type: core.Input, args: ['tooltipClass',] },],
        '_tooltipContext': [{ type: core.Input, args: ['tooltipContext',] },],
        '_tooltipPopupDelay': [{ type: core.Input, args: ['tooltipPopupDelay',] },],
        '_fadeDuration': [{ type: core.Input, args: ['tooltipFadeDuration',] },],
        '_tooltipTrigger': [{ type: core.Input, args: ['tooltipTrigger',] },],
        'tooltipStateChanged': [{ type: core.Output },],
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
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [TooltipDirective, TooltipContainerComponent],
                    exports: [TooltipDirective],
                    entryComponents: [TooltipContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());
/* tslint:disable */
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
        if (value === void 0) {
            value = item;
        }
        if (header === void 0) {
            header = false;
        }
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
    if (wordRegexDelimiters === void 0) {
        wordRegexDelimiters = ' ';
    }
    if (phraseRegexDelimiters === void 0) {
        phraseRegexDelimiters = '';
    }
    /* tslint:enable */
    var regexStr = "(?:[" + phraseRegexDelimiters + "])([^" + phraseRegexDelimiters + "]+)" +
        ("(?:[" + phraseRegexDelimiters + "])|([^" + wordRegexDelimiters + "]+)");
    var preTokenized = str.split(new RegExp(regexStr, 'g'));
    var result = [];
    var preTokenizedLength = preTokenized.length;
    var token;
    var replacePhraseDelimiters = new RegExp("[" + phraseRegexDelimiters + "]+", 'g');
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
    var properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    var propertiesArray = properties.split('.');
    for (var _i = 0, propertiesArray_1 = propertiesArray; _i < propertiesArray_1.length; _i++) {
        var property = propertiesArray_1[_i];
        if (property in object) {
            // tslint:disable-next-line
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}
var Utils = (function () {
    function Utils() {
    }
    Utils.reflow = function (element) {
        (function (bs) { return bs; })(element.offsetHeight);
    };
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    Utils.getStyles = function (elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = win;
        }
        return view.getComputedStyle(elem);
    };
    return Utils;
}());
var TypeaheadContainerComponent = (function () {
    function TypeaheadContainerComponent(element, renderer) {
        this.renderer = renderer;
        this.isFocused = false;
        this._matches = [];
        this.isScrolledIntoView = function (elem) {
            var containerViewTop = this.ulElement.nativeElement.scrollTop;
            var containerViewBottom = containerViewTop + this.ulElement.nativeElement.offsetHeight;
            var elemTop = elem.offsetTop;
            var elemBottom = elemTop + elem.offsetHeight;
            return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
        };
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
            var _this = this;
            this._matches = value;
            this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
            if (this.typeaheadScrollable) {
                setTimeout(function () {
                    _this.setScrollableMode();
                });
            }
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
    Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadScrollable", {
        get: function () {
            return this.parent ? this.parent.typeaheadScrollable : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "typeaheadOptionsInScrollableView", {
        get: function () {
            return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
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
        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    };
    TypeaheadContainerComponent.prototype.selectActive = function (value) {
        this.isFocused = true;
        this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function (match, query$$1) {
        var itemStr = match.value;
        var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        var startIdx;
        var tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query$$1 === 'object') {
            var queryLen = query$$1.length;
            for (var i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query$$1[i]);
                tokenLen = query$$1[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                            ("" + itemStr.substring(startIdx + tokenLen));
                    itemStrHelper =
                        itemStrHelper.substring(0, startIdx) + "        " + ' '.repeat(tokenLen) + "         " +
                            ("" + itemStrHelper.substring(startIdx + tokenLen));
                }
            }
        }
        else if (query$$1) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query$$1);
            tokenLen = query$$1.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    itemStr.substring(0, startIdx) + "<strong>" + itemStr.substring(startIdx, startIdx + tokenLen) + "</strong>" +
                        ("" + itemStr.substring(startIdx + tokenLen));
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
        if (e === void 0) {
            e = void 0;
        }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(function () { return _this.parent.typeaheadOnSelect.emit(value); }, 0);
        return false;
    };
    TypeaheadContainerComponent.prototype.setScrollableMode = function () {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements.first) {
            var ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            var liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            var ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '').replace('px', ''));
            var ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0').replace('px', ''));
            var optionHeight = parseFloat((liStyles['height'] ? liStyles['height'] : '0').replace('px', ''));
            var height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = height + ulPaddingTop + ulPaddingBottom + "px";
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    };
    TypeaheadContainerComponent.prototype.scrollPrevious = function (index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements) {
            var liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    };
    TypeaheadContainerComponent.prototype.scrollNext = function (index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements) {
            var liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        this.ulElement.nativeElement.offsetHeight +
                        liElement.nativeElement.offsetHeight;
            }
        }
    };
    TypeaheadContainerComponent.prototype.scrollToBottom = function () {
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    };
    TypeaheadContainerComponent.prototype.scrollToTop = function () {
        this.ulElement.nativeElement.scrollTop = 0;
    };
    TypeaheadContainerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'typeahead-container',
                    // tslint:disable-next-line
                    template: "<!-- inject options list template --> <ng-template [ngTemplateOutlet]=\"optionsListTemplate || (isBs4 ? bs4Template : bs3Template)\" [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template> <!-- default options item template --> <ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span> </ng-template> <!-- Bootstrap 3 options list template --> <ng-template #bs3Template> <ul class=\"dropdown-menu\" #ulElement [style.overflow-y]=\"needScrollbar ? 'scroll': 'auto'\" [style.height]=\"needScrollbar ? guiHeight: 'auto'\"> <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\"> <li #liElements *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</li> <li #liElements *ngIf=\"!match.isHeader()\" [class.active]=\"isActive(match)\" (mouseenter)=\"selectActive(match)\"> <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\"> <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\" [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template> </a> </li> </ng-template> </ul> </ng-template> <!-- Bootstrap 4 options list template --> <ng-template #bs4Template> <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\"> <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6> <ng-template [ngIf]=\"!match.isHeader()\"> <button #liElements class=\"dropdown-item\" (click)=\"selectMatch(match, $event)\" (mouseenter)=\"selectActive(match)\" [class.active]=\"isActive(match)\"> <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\" [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template> </button> </ng-template> </ng-template> </ng-template> ",
                    host: {
                        class: 'dropdown open',
                        '[class.dropdown-menu]': 'isBs4',
                        '[style.overflow-y]': "isBs4 && needScrollbar ? 'scroll': 'visible'",
                        '[style.height]': "isBs4 && needScrollbar ? guiHeight: 'auto'",
                        '[style.visibility]': "typeaheadScrollable ? 'hidden' : 'visible'",
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;'
                    }
                },] },
    ];
    /** @nocollapse */
    TypeaheadContainerComponent.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: core.Renderer2, },
        ];
    };
    TypeaheadContainerComponent.propDecorators = {
        'ulElement': [{ type: core.ViewChild, args: ['ulElement',] },],
        'liElements': [{ type: core.ViewChildren, args: ['liElements',] },],
        'focusLost': [{ type: core.HostListener, args: ['mouseleave',] }, { type: core.HostListener, args: ['blur',] },],
    };
    return TypeaheadContainerComponent;
}());
/* tslint:disable:max-file-line-count */
var TypeaheadDirective = (function () {
    function TypeaheadDirective(ngControl, element, viewContainerRef, renderer, cis, changeDetection) {
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        this.changeDetection = changeDetection;
        /** minimal no of characters that needs to be entered before
         * typeahead kicks-in. When set to 0, typeahead shows on focus with full
         * list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = void 0;
        /** should be used only in case of typeahead attribute is array.
         * If true - loading of options will be async, otherwise - sync.
         * true make sense if options array is large.
         */
        this.typeaheadAsync = void 0;
        /** match latin symbols.
         * If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /** Can be use to search words by inserting a single white space between each characters
         *  for example 'C a l i f o r n i a' will match 'California'.
         */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to match exact phrase.
         * Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /** specifies if typeahead is scrollable  */
        this.typeaheadScrollable = false;
        /** specifies number of options to show in scroll view  */
        this.typeaheadOptionsInScrollableView = 5;
        /** fired when 'busy' state of this component was changed,
         * fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new core.EventEmitter();
        /** fired on every key event and returns true
         * in case of matches are not detected
         */
        this.typeaheadNoResults = new core.EventEmitter();
        /** fired when option was selected, return object with data of this option */
        this.typeaheadOnSelect = new core.EventEmitter();
        /** fired when blur event occurres. returns the active item */
        this.typeaheadOnBlur = new core.EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
        this.isTypeaheadOptionsListActive = false;
        this.keyUpEventEmitter = new core.EventEmitter();
        this.placement = 'bottom-left';
        this._subscriptions = [];
        this._typeahead = cis.createLoader(element, viewContainerRef, renderer);
    }
    TypeaheadDirective.prototype.ngOnInit = function () {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength =
            this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined &&
            !(this.typeahead instanceof Observable.Observable)) {
            this.typeaheadAsync = false;
        }
        if (this.typeahead instanceof Observable.Observable) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
    };
    TypeaheadDirective.prototype.onInput = function (e) {
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
            // enter, tab
            if (e.keyCode === 13) {
                this._container.selectActiveMatch();
                return;
            }
        }
    };
    TypeaheadDirective.prototype.onFocus = function () {
        if (this.typeaheadMinLength === 0) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
        }
    };
    TypeaheadDirective.prototype.onBlur = function () {
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
        }
    };
    TypeaheadDirective.prototype.onKeydown = function (e) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        // if an item is visible - prevent form submission
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
        // if an item is visible - don't change focus
        if (e.keyCode === 9) {
            e.preventDefault();
            this._container.selectActiveMatch();
            return;
        }
    };
    TypeaheadDirective.prototype.changeModel = function (match) {
        var valueStr = match.value;
        this.ngControl.viewToModelUpdate(valueStr);
        (this.ngControl.control).setValue(valueStr);
        this.changeDetection.markForCheck();
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
        var _this = this;
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
        this._outsideClickListener = this.renderer.listen('document', 'click', function (e) {
            if (_this.typeaheadMinLength === 0 && _this.element.nativeElement.contains(e.target)) {
                return;
            }
            _this.onOutsideClick();
        });
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        var normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value)
            .toString()
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
            this._outsideClickListener();
            this._container = null;
        }
    };
    TypeaheadDirective.prototype.onOutsideClick = function () {
        if (this._container && !this._container.isFocused) {
            this.hide();
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
            .switchMap(function () { return _this.typeahead; })
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }));
    };
    TypeaheadDirective.prototype.syncActions = function () {
        var _this = this;
        this._subscriptions.push(this.keyUpEventEmitter
            .debounceTime(this.typeaheadWaitMs)
            .mergeMap(function (value) {
            var normalizedQuery = _this.normalizeQuery(value);
            return Observable.Observable.from(_this.typeahead)
                .filter(function (option) {
                return (option &&
                    _this.testMatch(_this.normalizeOption(option), normalizedQuery));
            })
                .toArray();
        })
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
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
        var normalizedQuery = (this.typeaheadLatinize
            ? latinize(value)
            : value)
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
        return match.indexOf(test) >= 0;
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
                : this.ngControl.control.value)
                .toString()
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
                .map(function (option) {
                return getValueFromObject(option, _this.typeaheadGroupField);
            })
                .filter(function (v, i, a) { return a.indexOf(v) === i; });
            groups.forEach(function (group) {
                // add group header to array of matches
                matches_1.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches_1 = matches_1.concat(limited
                    .filter(function (option) {
                    return getValueFromObject(option, _this.typeaheadGroupField) === group;
                })
                    .map(function (option) {
                    return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField));
                }));
            });
            this._matches = matches_1;
        }
        else {
            this._matches = limited.map(function (option) {
                return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField));
            });
        }
    };
    TypeaheadDirective.prototype.hasMatches = function () {
        return this._matches.length > 0;
    };
    TypeaheadDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[typeahead]', exportAs: 'bs-typeahead' },] },
    ];
    /** @nocollapse */
    TypeaheadDirective.ctorParameters = function () {
        return [
            { type: forms.NgControl, },
            { type: core.ElementRef, },
            { type: core.ViewContainerRef, },
            { type: core.Renderer2, },
            { type: ComponentLoaderFactory, },
            { type: core.ChangeDetectorRef, },
        ];
    };
    TypeaheadDirective.propDecorators = {
        'typeahead': [{ type: core.Input },],
        'typeaheadMinLength': [{ type: core.Input },],
        'typeaheadWaitMs': [{ type: core.Input },],
        'typeaheadOptionsLimit': [{ type: core.Input },],
        'typeaheadOptionField': [{ type: core.Input },],
        'typeaheadGroupField': [{ type: core.Input },],
        'typeaheadAsync': [{ type: core.Input },],
        'typeaheadLatinize': [{ type: core.Input },],
        'typeaheadSingleWords': [{ type: core.Input },],
        'typeaheadWordDelimiters': [{ type: core.Input },],
        'typeaheadPhraseDelimiters': [{ type: core.Input },],
        'typeaheadItemTemplate': [{ type: core.Input },],
        'optionsListTemplate': [{ type: core.Input },],
        'typeaheadScrollable': [{ type: core.Input },],
        'typeaheadOptionsInScrollableView': [{ type: core.Input },],
        'typeaheadLoading': [{ type: core.Output },],
        'typeaheadNoResults': [{ type: core.Output },],
        'typeaheadOnSelect': [{ type: core.Output },],
        'typeaheadOnBlur': [{ type: core.Output },],
        'container': [{ type: core.Input },],
        'dropup': [{ type: core.Input },],
        'onInput': [{ type: core.HostListener, args: ['input', ['$event'],] },],
        'onChange': [{ type: core.HostListener, args: ['keyup', ['$event'],] },],
        'onFocus': [{ type: core.HostListener, args: ['click',] }, { type: core.HostListener, args: ['focus',] },],
        'onBlur': [{ type: core.HostListener, args: ['blur',] },],
        'onKeydown': [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
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
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                    exports: [TypeaheadContainerComponent, TypeaheadDirective],
                    entryComponents: [TypeaheadContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TypeaheadModule.ctorParameters = function () { return []; };
    return TypeaheadModule;
}());
var FacetSelect = (function () {
    /**
     * @param {?} facet
     */
    function FacetSelect(facet) {
        this.facet = facet;
    }
    return FacetSelect;
}());
var FacetDeselect = (function () {
    /**
     * @param {?} facet
     */
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
var FacetContainerComponent = (function () {
    function FacetContainerComponent() {
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsChange = new core.EventEmitter();
        this.events = new core.EventEmitter();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.selectFacet = function (facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectFacet = function (facet) {
        // find the index of the item in the selected array
        var /** @type {?} */ idx = this.facets.findIndex(function (selectedFacet) { return facet === selectedFacet; });
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
    };
    /**
     * @return {?}
     */
    FacetContainerComponent.prototype.deselectAllFacets = function () {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetContainerComponent.prototype.triggerEvent = function (event) {
        this.events.next(event);
    };
    return FacetContainerComponent;
}());
FacetContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-facet-container',
                template: "\n      <!-- Display Any Selected Facets -->\n      <div class=\"facets-selected-container\">\n\n          <!-- Display Title an Clear Button -->\n          <div class=\"facets-selected-header-container\">\n\n              <!-- Show The Selected Text -->\n              <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n              <!-- Add a Clear Button -->\n              <div class=\"facets-selected-clear-button\" tabindex=\"0\" [tooltip]=\"clearTooltip\" placement=\"left\" container=\"body\" (click)=\"deselectAllFacets()\"\n                  (keyup.enter)=\"deselectAllFacets()\" *ngIf=\"facets.length > 0\">\n\n                  <svg class=\"facets-selected-clear-graphic\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                      <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                      <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                      <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                      <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                      <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n                  </svg>\n              </div>\n\n          </div>\n\n          <!-- Display Tags For Selected Items -->\n          <div class=\"facets-selected-list\">\n\n              <!-- Show Selected Tags -->\n              <div class=\"facet-selected-tag\" tabindex=\"0\" *ngFor=\"let facet of facets\" (mousedown)=\"$event.preventDefault()\" (click)=\"deselectFacet(facet)\" (keyup.enter)=\"deselectFacet(facet)\">\n\n                  <!-- Display Label -->\n                  <span class=\"facet-selected-tag-label\">{{ facet.title }}</span>\n\n                  <!-- Display Remove Icon -->\n                  <span class=\"hpe-icon hpe-close\"></span>\n              </div>\n\n          </div>\n\n          <!-- Show Message Here if No Facets Selected -->\n          <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n      </div>\n\n      <!-- Any Facet Elements Should be Added Here By User -->\n      <div class=\"facets-region\">\n          <ng-content></ng-content>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
FacetContainerComponent.ctorParameters = function () { return []; };
FacetContainerComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'clearTooltip': [{ type: core.Input },],
    'emptyText': [{ type: core.Input },],
    'facets': [{ type: core.Input },],
    'facetsChange': [{ type: core.Output },],
    'events': [{ type: core.Output },],
};
var FacetBaseComponent = (function () {
    /**
     * @param {?} facetContainer
     * @param {?} _elementRef
     */
    function FacetBaseComponent(facetContainer, _elementRef) {
        var _this = this;
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new core.EventEmitter();
        this.events = new Subject.Subject();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.filter(function (event) { return event instanceof FacetDeselect; })
                .filter(function (event) { return !!_this.selected.find(function (facet) { return facet === event.facet; }); })
                .subscribe(function (event) { return _this.deselectFacet(event.facet); });
            // subscribe to any deselect all events from facet container
            facetContainer.events.filter(function (event) { return event instanceof FacetDeselectAll; }).subscribe(function (_) { return _this.deselectAll(); });
        }
    }
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(function (facet) { return _this.facetContainer.selectFacet(facet); });
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
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
        this.triggerEvent(new FacetSelect(facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectFacet = function (facet) {
        // find facet to remove
        var /** @type {?} */ index = this.selected.findIndex(function (selectedFacet) { return selectedFacet === facet; });
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
    };
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectAll = function () {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.toggleFacetSelection = function (facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.isFacetSelected = function (facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(function (selectedFacet) { return selectedFacet === facet; });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetBaseComponent.prototype.triggerEvent = function (event) {
        this.events.next(event);
    };
    return FacetBaseComponent;
}());
FacetBaseComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-facet-base',
                template: '',
            },] },
];
/**
 * @nocollapse
 */
FacetBaseComponent.ctorParameters = function () { return [
    { type: FacetContainerComponent, decorators: [{ type: core.Host },] },
    { type: core.ElementRef, },
]; };
FacetBaseComponent.propDecorators = {
    'selected': [{ type: core.Input },],
    'selectedChange': [{ type: core.Output },],
    'events': [{ type: core.Output },],
};
var FacetHeaderComponent = (function () {
    function FacetHeaderComponent() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    FacetHeaderComponent.prototype.toggleExpand = function () {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    return FacetHeaderComponent;
}());
FacetHeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-facet-header',
                template: "\n      <span class=\"facet-header-title\">{{ header }}</span>\n      <span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>\n    ",
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
FacetHeaderComponent.ctorParameters = function () { return []; };
FacetHeaderComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'canExpand': [{ type: core.Input },],
    'expanded': [{ type: core.Input },],
    'expandedChange': [{ type: core.Output },],
};
var FacetCheckListComponent = (function (_super) {
    __extends(FacetCheckListComponent, _super);
    function FacetCheckListComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.facets = [];
        _this.scrollbar = true;
        _this.expanded = true;
        return _this;
    }
    return FacetCheckListComponent;
}(FacetBaseComponent));
FacetCheckListComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-facet-check-list',
                template: "\n      <ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n      <!-- Create a container which will show when section is expanded -->\n      <div class=\"facet-check-list-container\" [class.facet-check-list-scrollbar]=\"scrollbar\" *ngIf=\"expanded\">\n\n          <!-- Iterate through each possible facet -->\n          <div class=\"facet-check-list-item\" *ngFor=\"let facet of facets\" [class.facet-active]=\"isFacetSelected(facet)\" tabindex=\"0\"\n              (click)=\"toggleFacetSelection(facet)\" (keyup.enter)=\"toggleFacetSelection(facet)\" [class.disabled]=\"facet.disabled\">\n\n              <!-- Show check icon to indicate the state -->\n              <span class=\"facet-check-list-item-check\">\n                  <span class=\"hpe-icon hpe-active\"></span>\n              </span>\n\n              <!-- Display the title -->\n              <span class=\"facet-check-list-item-title\">{{ facet.title }}</span>\n\n              <!-- Display the count if specified -->\n              <span class=\"facet-check-list-item-count\" *ngIf=\"facet.count !== undefined\">({{ facet.count }})</span>\n          </div>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
FacetCheckListComponent.ctorParameters = function () { return []; };
FacetCheckListComponent.propDecorators = {
    'facets': [{ type: core.Input },],
    'header': [{ type: core.Input },],
    'scrollbar': [{ type: core.Input },],
    'expanded': [{ type: core.Input },],
};
var FacetTypeaheadListComponent = (function (_super) {
    __extends(FacetTypeaheadListComponent, _super);
    function FacetTypeaheadListComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.expanded = true;
        _this.typeaheadConfig = {};
        _this.suggestions = [];
        _this.simplified = true;
        _this._nativeElement = (_this._elementRef.nativeElement);
        _this._defaultTypeaheadConfig = {
            placeholder: '',
            maxResults: 50,
            minCharacters: 1
        };
        return _this;
    }
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // wrap the observable and filter out any already selected items or any disabled items
        if (this.facets instanceof Observable.Observable) {
            // handle an observable of data
            this.typeaheadOptions = Observable.Observable.from(this.facets).map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            });
        }
        else {
            // handle an array of data
            this.typeaheadOptions = Observable.Observable.of(this.facets).map(function (facets) {
                // remove disabled facets, selected facets and facets that dont match search term
                return facets.filter(function (facet) { return !facet.disabled; })
                    .filter(function (facet) { return !_this.selected.find(function (selectedFacet) { return selectedFacet === facet; }); })
                    .filter(function (facet) { return facet.title.toUpperCase().includes(_this.searchQuery.toUpperCase()); });
            });
        }
        // provide default values for typeahead config
        for (var /** @type {?} */ prop in this._defaultTypeaheadConfig) {
            // check if prop has been defined in the users typeahead config - if not set default value
            if (this.typeaheadConfig.hasOwnProperty(prop) === false) {
                this.typeaheadConfig[prop] = this._defaultTypeaheadConfig[prop];
            }
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    FacetTypeaheadListComponent.prototype.scrollToFocused = function () {
        var /** @type {?} */ dropdown = this._nativeElement.querySelector('.dropdown-menu');
        // delay to allow the typeahead ui to update
        setTimeout(function () {
            // find the currently active element if there is one
            var /** @type {?} */ activeElement = dropdown.querySelector('.dropdown-menu > li.active');
            if (activeElement) {
                // check if element is not in view
                var /** @type {?} */ elementBounds = activeElement.getBoundingClientRect();
                var /** @type {?} */ dropdownBounds = dropdown.getBoundingClientRect();
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
}(FacetBaseComponent));
FacetTypeaheadListComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-facet-typeahead-list',
                template: "\n      <ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n      <div class=\"facet-typeahead-list-container\" *ngIf=\"expanded\">\n\n          <div class=\"facet-typeahead-list-selected-container\" *ngIf=\"suggestions?.length > 0\">\n\n              <div class=\"facet-typeahead-list-selected-option\" tabindex=\"0\" *ngFor=\"let facet of suggestions\" (click)=\"toggleFacetSelection(facet)\"\n                  (keyup.enter)=\"toggleFacetSelection(facet)\">\n\n                  <ux-checkbox [clickable]=\"false\" [value]=\"isFacetSelected(facet)\" [simplified]=\"simplified\">\n                      <span class=\"facet-typeahead-list-selected-option-title\">{{ facet.title }}</span>\n                      <span class=\"facet-typeahead-list-selected-option-count\">({{ facet.count }})</span>\n                  </ux-checkbox>\n\n              </div>\n\n          </div>\n\n          <div class=\"facet-typeahead-list-control\">\n\n              <!-- Create Typeahead Control -->\n              <input type=\"text\" class=\"form-control\" [placeholder]=\"typeaheadConfig?.placeholder\" [typeahead]=\"typeaheadOptions\" [(ngModel)]=\"searchQuery\"\n                  [typeaheadMinLength]=\"typeaheadConfig?.minCharacters\" [typeaheadOptionsLimit]=\"typeaheadConfig?.maxResults\" [typeaheadWaitMs]=\"typeaheadConfig?.delay\"\n                  (typeaheadOnSelect)=\"selectOption($event)\" [typeaheadItemTemplate]=\"facetOptionTemplate\" (keyup.ArrowUp)=\"scrollToFocused()\" (keyup.ArrowDown)=\"scrollToFocused()\">\n\n          </div>\n\n      </div>\n\n      <ng-template #facetOptionTemplate let-model=\"item\" let-index=\"index\">\n          <p class=\"facet-typeahead-list-option\"><span [innerHTML]=\"model.title | facetTypeaheadHighlight: searchQuery\"></span> <span class=\"facet-typeahead-list-option-count\"\n                  *ngIf=\"model.count\">({{ model.count }})</span></p>\n      </ng-template>\n    "
            },] },
];
/**
 * @nocollapse
 */
FacetTypeaheadListComponent.ctorParameters = function () { return []; };
FacetTypeaheadListComponent.propDecorators = {
    'facets': [{ type: core.Input },],
    'header': [{ type: core.Input },],
    'expanded': [{ type: core.Input },],
    'typeaheadConfig': [{ type: core.Input },],
    'suggestions': [{ type: core.Input },],
    'simplified': [{ type: core.Input },],
};
var FacetTypeaheadHighlight = (function () {
    function FacetTypeaheadHighlight() {
    }
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    FacetTypeaheadHighlight.prototype.transform = function (value, searchQuery) {
        var /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"facet-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    return FacetTypeaheadHighlight;
}());
FacetTypeaheadHighlight.decorators = [
    { type: core.Pipe, args: [{
                name: 'facetTypeaheadHighlight'
            },] },
];
/**
 * @nocollapse
 */
FacetTypeaheadHighlight.ctorParameters = function () { return []; };
var DECLARATIONS$2 = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];
var FacetsModule = (function () {
    function FacetsModule() {
    }
    return FacetsModule;
}());
FacetsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    CheckboxModule,
                    TooltipModule.forRoot(),
                    TypeaheadModule.forRoot()
                ],
                exports: DECLARATIONS$2,
                declarations: DECLARATIONS$2
            },] },
];
/**
 * @nocollapse
 */
FacetsModule.ctorParameters = function () { return []; };
var Facet = (function () {
    /**
     * @param {?} title
     * @param {?=} data
     * @param {?=} count
     * @param {?=} disabled
     * @param {?=} id
     */
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
/** Default dropdown configuration */
var BsDropdownConfig = (function () {
    function BsDropdownConfig() {
        /** default dropdown auto closing behavior */
        this.autoClose = true;
    }
    BsDropdownConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    BsDropdownConfig.ctorParameters = function () { return []; };
    return BsDropdownConfig;
}());
var BsDropdownState = (function () {
    function BsDropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new core.EventEmitter();
        this.isDisabledChange = new core.EventEmitter();
        this.toggleClick = new core.EventEmitter();
        this.dropdownMenu = new Promise(function (resolve) {
            _this.resolveDropdownMenu = resolve;
        });
    }
    BsDropdownState.decorators = [
        { type: core.Injectable },
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
            if (dropdown && !isBs3()) {
                _this._renderer.addClass(dropdown, 'show');
                if (dropdown.classList.contains('dropdown-menu-right')) {
                    _this._renderer.setStyle(dropdown, 'left', 'auto');
                    _this._renderer.setStyle(dropdown, 'right', '0');
                }
                if (_this.direction === 'up') {
                    _this._renderer.setStyle(dropdown, 'top', 'auto');
                    _this._renderer.setStyle(dropdown, 'transform', 'translateY(-101%)');
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
        { type: core.Component, args: [{
                    selector: 'bs-dropdown-container',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    host: {
                        style: 'display:block;position: absolute;'
                    },
                    template: "\n    <div [class.dropup]=\"direction === 'up'\"\n         [class.dropdown]=\"direction === 'down'\"\n         [class.show]=\"isOpen\"\n         [class.open]=\"isOpen\"><ng-content></ng-content></div>\n  "
                },] },
    ];
    /** @nocollapse */
    BsDropdownContainerComponent.ctorParameters = function () {
        return [
            { type: BsDropdownState, },
            { type: core.ChangeDetectorRef, },
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ];
    };
    return BsDropdownContainerComponent;
}());
// tslint:disable:max-file-line-count
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
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: BsDropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
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
            this._state.autoClose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BsDropdownDirective.prototype, "isDisabled", {
        get: function () {
            return this._isDisabled;
        },
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
            // because of dropdown inline mode
            outsideClick: false,
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state.toggleClick.subscribe(function (value) { return _this.toggle(value); }));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state.isDisabledChange
            .filter(function (value) { return value; })
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
                this._state.dropdownMenu.then(function (dropdownMenu) {
                    _this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
                    _this._inlinedMenu = _this._dropdown._inlineViewRef;
                    _this.addBs4Polyfills();
                })
                    .catch();
            }
            this.addBs4Polyfills();
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu.then(function (dropdownMenu) {
            // check direction in which dropdown should be opened
            var _dropup = _this.dropup ||
                (typeof _this.dropup !== 'undefined' && _this.dropup);
            _this._state.direction = _dropup ? 'up' : 'down';
            var _placement = _this.placement || (_dropup ? 'top left' : 'bottom left');
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
        })
            .catch();
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
            this.removeDropupStyles();
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
        if (this.isOpen || !value) {
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
            this.addDropupStyles();
        }
    };
    BsDropdownDirective.prototype.addShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.addClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    };
    BsDropdownDirective.prototype.removeShowClass = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeClass(this._inlinedMenu.rootNodes[0], 'show');
        }
    };
    BsDropdownDirective.prototype.checkRightAlignment = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            var isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-right');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'left', isRightAligned ? 'auto' : '0');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'right', isRightAligned ? '0' : 'auto');
        }
    };
    BsDropdownDirective.prototype.addDropupStyles = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            // a little hack to not break support of bootstrap 4 beta
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'top', this.dropup ? 'auto' : '100%');
            this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'transform', this.dropup ? 'translateY(-101%)' : 'translateY(0)');
        }
    };
    BsDropdownDirective.prototype.removeDropupStyles = function () {
        if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'top');
            this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'transform');
        }
    };
    BsDropdownDirective.decorators = [
        { type: core.Directive, args: [{
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
    BsDropdownDirective.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: core.Renderer2, },
            { type: core.ViewContainerRef, },
            { type: ComponentLoaderFactory, },
            { type: BsDropdownConfig, },
            { type: BsDropdownState, },
        ];
    };
    BsDropdownDirective.propDecorators = {
        'placement': [{ type: core.Input },],
        'triggers': [{ type: core.Input },],
        'container': [{ type: core.Input },],
        'dropup': [{ type: core.Input },],
        'autoClose': [{ type: core.Input },],
        'isDisabled': [{ type: core.Input },],
        'isOpen': [{ type: core.Input },],
        'isOpenChange': [{ type: core.Output },],
        'onShown': [{ type: core.Output },],
        'onHidden': [{ type: core.Output },],
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
        { type: core.Directive, args: [{
                    selector: '[bsDropdownMenu],[dropdownMenu]',
                    exportAs: 'bs-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    BsDropdownMenuDirective.ctorParameters = function () {
        return [
            { type: BsDropdownState, },
            { type: core.ViewContainerRef, },
            { type: core.TemplateRef, },
        ];
    };
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
        this._subscriptions.push(this._state.isOpenChange.subscribe(function (value) { return (_this.isOpen = value); }));
        // populate disabled state
        this._subscriptions.push(this._state.isDisabledChange.subscribe(function (value) { return (_this.isDisabled = value || null); }));
    }
    BsDropdownToggleDirective.prototype.onClick = function () {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit(true);
    };
    BsDropdownToggleDirective.prototype.onDocumentClick = function (event) {
        if (this._state.autoClose &&
            event.button !== 2 &&
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
        { type: core.Directive, args: [{
                    selector: '[bsDropdownToggle],[dropdownToggle]',
                    exportAs: 'bs-dropdown-toggle',
                    host: {
                        '[attr.aria-haspopup]': 'true'
                    }
                },] },
    ];
    /** @nocollapse */
    BsDropdownToggleDirective.ctorParameters = function () {
        return [
            { type: BsDropdownState, },
            { type: core.ElementRef, },
        ];
    };
    BsDropdownToggleDirective.propDecorators = {
        'isDisabled': [{ type: core.HostBinding, args: ['attr.disabled',] },],
        'isOpen': [{ type: core.HostBinding, args: ['attr.aria-expanded',] },],
        'onClick': [{ type: core.HostListener, args: ['click', [],] },],
        'onDocumentClick': [{ type: core.HostListener, args: ['document:click', ['$event'],] },],
        'onEsc': [{ type: core.HostListener, args: ['keyup.esc',] },],
    };
    return BsDropdownToggleDirective;
}());
var BsDropdownModule = (function () {
    function BsDropdownModule() {
    }
    BsDropdownModule.forRoot = function (config) {
        return {
            ngModule: BsDropdownModule,
            providers: [
                ComponentLoaderFactory,
                PositioningService,
                BsDropdownState,
                {
                    provide: BsDropdownConfig,
                    useValue: config ? config : { autoClose: true }
                }
            ]
        };
    };
    BsDropdownModule.decorators = [
        { type: core.NgModule, args: [{
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
var FilterContainerComponent = (function () {
    function FilterContainerComponent() {
        this.filters = [];
        this.filtersChange = new core.EventEmitter();
        this.events = new core.EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.addFilter = function (filter$$1) {
        this.filters.push(filter$$1);
        this.events.next(new FilterAddEvent(filter$$1));
        this.filtersChange.emit(this.filters);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.removeFilter = function (filter$$1) {
        var /** @type {?} */ idx = this.filters.findIndex(function (filters) { return filters === filter$$1; });
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter$$1));
            this.filtersChange.emit(this.filters);
        }
    };
    /**
     * @return {?}
     */
    FilterContainerComponent.prototype.removeAll = function () {
        this.events.next(new FilterRemoveAllEvent());
    };
    return FilterContainerComponent;
}());
FilterContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-filter-container',
                template: "\n      <ng-content></ng-content>\n\n      <!-- Add a Clear Button -->\n      <div class=\"filter-selected-clear-button\" *ngIf=\"filters.length > 0\" [tooltip]=\"clearTooltip || 'Clear All'\" (click)=\"removeAll()\">\n    \n          <svg class=\"filter-selected-clear-graphic\" width=\"19\" height=\"12\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n              <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n              <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n              <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n              <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n              <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n          </svg>\n\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
FilterContainerComponent.ctorParameters = function () { return []; };
FilterContainerComponent.propDecorators = {
    'filters': [{ type: core.Input },],
    'clearTooltip': [{ type: core.Input },],
    'filtersChange': [{ type: core.Output },],
    'events': [{ type: core.Output },],
};
var FilterAddEvent = (function () {
    /**
     * @param {?} filter
     */
    function FilterAddEvent(filter$$1) {
        this.filter = filter$$1;
    }
    return FilterAddEvent;
}());
var FilterRemoveEvent = (function () {
    /**
     * @param {?} filter
     */
    function FilterRemoveEvent(filter$$1) {
        this.filter = filter$$1;
    }
    return FilterRemoveEvent;
}());
var FilterRemoveAllEvent = (function () {
    function FilterRemoveAllEvent() {
    }
    return FilterRemoveAllEvent;
}());
var FilterBaseComponent = (function () {
    /**
     * @param {?} filtersContainer
     */
    function FilterBaseComponent(filtersContainer) {
        this.filtersContainer = filtersContainer;
        filtersContainer.events.filter(function (event) { return event instanceof FilterRemoveAllEvent; }).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterBaseComponent.prototype.addFilter = function (filter$$1) {
        if (!filter$$1.initial) {
            this.filtersContainer.addFilter(filter$$1);
        }
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterBaseComponent.prototype.removeFilter = function (filter$$1) {
        if (!filter$$1) {
            return;
        }
        this.filtersContainer.removeFilter(filter$$1);
    };
    return FilterBaseComponent;
}());
FilterBaseComponent.decorators = [
    { type: core.Directive, args: [{
                selector: 'ux-filter-base'
            },] },
];
/**
 * @nocollapse
 */
FilterBaseComponent.ctorParameters = function () { return [
    { type: FilterContainerComponent, decorators: [{ type: core.Host },] },
]; };
FilterBaseComponent.propDecorators = {
    'filters': [{ type: core.Input },],
};
var FilterDynamicComponent = (function (_super) {
    __extends(FilterDynamicComponent, _super);
    function FilterDynamicComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.defaultOptions = {
            placeholder: '',
            minCharacters: 3
        };
        _this.showTypeahead = true;
        _this.typeaheadItems = [];
        return _this;
    }
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.getItems = function () {
        var _this = this;
        return this.filters.filter(function (item) { return item !== _this.initial; }).map(function (item) { return item.name; });
    };
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.ngOnInit = function () {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    };
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectOption = function (typeaheadOption) {
        this.removeFilter();
        var /** @type {?} */ idx = this.filters.findIndex(function (filter$$1) { return filter$$1.name === typeaheadOption.value; });
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.searchQuery = '';
        this.dropdown.hide();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FilterDynamicComponent.prototype.clickOff = function (event) {
        var /** @type {?} */ target = (event.target);
        var /** @type {?} */ hideDropdown = true;
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
    /**
     * @return {?}
     */
    FilterDynamicComponent.prototype.removeFilter = function () {
        if (this.selected !== this.initial) {
            _super.prototype.removeFilter.call(this, this.selected);
            this.selected = this.initial;
        }
        this.searchQuery = '';
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterDynamicComponent.prototype.selectFilter = function (filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    };
    return FilterDynamicComponent;
}(FilterBaseComponent));
FilterDynamicComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-filter-dynamic',
                template: "\n      <div class=\"btn-group ux-dynamic-filter\" dropdown #dynamicDropdown=\"bs-dropdown\">\n          <button (click)=\"dynamicDropdown.show()\" type=\"button\" [class.active]=\"selected !== initial\" class=\"filter-dropdown btn dropdown-toggle\">{{ selected?.title }} \n              <span class=\"hpe-icon hpe-down\"></span>\n          </button>\n          <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n              <li class=\"dropdown-list-item\" *ngIf=\"showTypeahead\" role=\"menuitem\">\n                  <a class=\"dropdown-item\" (click)=\"removeFilter(); dynamicDropdown.hide();\">\n                      <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                      <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n                  </a>\n              </li>\n\n              <li class=\"dropdown-list-item\" *ngIf=\"selected !== initial && showTypeahead\" role=\"menuitem\">\n                  <a class=\"dropdown-item\">\n                      <i class=\"hpe-icon hpe-checkmark\"></i>\n                      <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n                  </a>\n              </li>\n\n              <hr>\n\n              <li *ngIf=\"showTypeahead\" class=\"typeahead-box\">\n                  <input [(ngModel)]=\"searchQuery\" [typeahead]=\"typeaheadItems\" class=\"form-control\" \n                  (typeaheadOnSelect)=\"selectOption($event)\" \n                  [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n                  [typeaheadMinLength]=\"options?.minCharacters || defaultOptions.minCharacters\"\n                  [typeaheadOptionsLimit]=\"options?.maxResults\">\n              </li>\n\n              <span *ngIf=\"!showTypeahead\">\n                  <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n                      <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                          <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                          <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                      </a>\n                  </li>\n              </span>\n\n          </ul>\n      </div>\n    ",
                host: {
                    '(document:click)': 'clickOff($event)',
                }
            },] },
];
/**
 * @nocollapse
 */
FilterDynamicComponent.ctorParameters = function () { return []; };
FilterDynamicComponent.propDecorators = {
    'filters': [{ type: core.Input },],
    'initial': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'dropdown': [{ type: core.ViewChild, args: [BsDropdownDirective,] },],
};
var FilterDropdownComponent = (function (_super) {
    __extends(FilterDropdownComponent, _super);
    function FilterDropdownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.removeFilter = function () {
        _super.prototype.removeFilter.call(this, this.selected);
        this.selected = this.initial;
    };
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.ngOnInit = function () {
        this.selected = this.initial;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterDropdownComponent.prototype.selectFilter = function (filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    };
    return FilterDropdownComponent;
}(FilterBaseComponent));
FilterDropdownComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-filter-dropdown',
                template: "\n      <div class=\"btn-group\" dropdown>\n          <button dropdownToggle type=\"button\" class=\"filter-dropdown btn dropdown-toggle\" [class.active]=\"selected !== initial\">{{ selected?.title }} \n              <span class=\"hpe-icon hpe-down\"></span>\n          </button>\n          <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n              <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n                  <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                      <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                      <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                  </a>\n              </li>\n          </ul>\n      </div>\n    ",
            },] },
];
/**
 * @nocollapse
 */
FilterDropdownComponent.ctorParameters = function () { return []; };
FilterDropdownComponent.propDecorators = {
    'initial': [{ type: core.Input },],
};
var DECLARATIONS$3 = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent
];
var FilterModule = (function () {
    function FilterModule() {
    }
    return FilterModule;
}());
FilterModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    BsDropdownModule.forRoot(),
                    TypeaheadModule.forRoot(),
                    TooltipModule.forRoot(),
                    forms.FormsModule,
                    common.CommonModule
                ],
                exports: DECLARATIONS$3,
                declarations: DECLARATIONS$3
            },] },
];
/**
 * @nocollapse
 */
FilterModule.ctorParameters = function () { return []; };
var FlippableCardComponent = (function () {
    function FlippableCardComponent() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new core.EventEmitter();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    FlippableCardComponent.prototype.setFlipped = function (state$$1) {
        this.flipped = state$$1;
        this.flippedChange.emit(this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.toggleFlipped = function () {
        this.setFlipped(!this.flipped);
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.clickTrigger = function () {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverEnter = function () {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    };
    /**
     * @return {?}
     */
    FlippableCardComponent.prototype.hoverExit = function () {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    };
    return FlippableCardComponent;
}());
FlippableCardComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-flippable-card',
                template: "\n      <div class=\"ux-flipper\" [class.ux-flip-card]=\"flipped\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n\n          <div class=\"ux-flippable-card-front\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n              <ng-content select=\"ux-flippable-card-front\"></ng-content>\n          </div>\n\n          <div class=\"ux-flippable-card-back\" [style.width.px]=\"width\" [style.height.px]=\"height\">\n              <ng-content select=\"ux-flippable-card-back\"></ng-content>\n          </div>\n      </div>\n    ",
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
FlippableCardComponent.ctorParameters = function () { return []; };
FlippableCardComponent.propDecorators = {
    'direction': [{ type: core.Input },],
    'trigger': [{ type: core.Input },],
    'width': [{ type: core.Input },],
    'height': [{ type: core.Input },],
    'flipped': [{ type: core.Input },],
    'flippedChange': [{ type: core.Output },],
    'clickTrigger': [{ type: core.HostListener, args: ['click',] },],
    'hoverEnter': [{ type: core.HostListener, args: ['mouseenter',] },],
    'hoverExit': [{ type: core.HostListener, args: ['mouseleave',] },],
};
var FlippableCardFrontDirective = (function () {
    function FlippableCardFrontDirective() {
    }
    return FlippableCardFrontDirective;
}());
FlippableCardFrontDirective.decorators = [
    { type: core.Directive, args: [{
                selector: 'ux-flippable-card-front'
            },] },
];
/**
 * @nocollapse
 */
FlippableCardFrontDirective.ctorParameters = function () { return []; };
var FlippableCardBackDirective = (function () {
    function FlippableCardBackDirective() {
    }
    return FlippableCardBackDirective;
}());
FlippableCardBackDirective.decorators = [
    { type: core.Directive, args: [{
                selector: 'ux-flippable-card-back'
            },] },
];
/**
 * @nocollapse
 */
FlippableCardBackDirective.ctorParameters = function () { return []; };
var FlippableCardModule = (function () {
    function FlippableCardModule() {
    }
    return FlippableCardModule;
}());
FlippableCardModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
                declarations: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective]
            },] },
];
/**
 * @nocollapse
 */
FlippableCardModule.ctorParameters = function () { return []; };
var FloatingActionButtonsService = (function () {
    function FloatingActionButtonsService() {
        this.open$ = new BehaviorSubject.BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.open = function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.toggle = function () {
        this.open$.next(!this.open$.getValue());
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.close = function () {
        this.open$.next(false);
    };
    return FloatingActionButtonsService;
}());
FloatingActionButtonsService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
FloatingActionButtonsService.ctorParameters = function () { return []; };
var FloatingActionButtonsComponent = (function () {
    /**
     * @param {?} fab
     * @param {?} _elementRef
     */
    function FloatingActionButtonsComponent(fab, _elementRef) {
        this.fab = fab;
        this._elementRef = _elementRef;
        this.direction = 'top';
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._subscription = this.fab.open$.pipe(filter_2(function (open) { return open === false; }))
            .subscribe(function () { return _this.tooltips.forEach(function (tooltip) { return tooltip.hide(); }); });
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    /**
     * @param {?} target
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.close = function (target) {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    };
    return FloatingActionButtonsComponent;
}());
FloatingActionButtonsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-floating-action-buttons',
                template: "\n      <ng-content select=\"[fab-primary]\"></ng-content>\n\n      <div class=\"floating-action-button-list\" [@fabAnimation]=\"fab.open$ | async\" [ngClass]=\"direction\" *ngIf=\"fab.open$ | async\">\n          <ng-content></ng-content>\n      </div>\n    ",
                providers: [FloatingActionButtonsService],
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                animations: [
                    animations.trigger('fabAnimation', [
                        animations.transition('void => true', [
                            animations.query('ux-floating-action-button', animations.style({ opacity: 0 })),
                            animations.query('ux-floating-action-button', animations.stagger(50, animations.animate(250, animations.style({ opacity: 1 }))))
                        ]),
                        animations.transition('true => void', [
                            animations.query('ux-floating-action-button', animations.stagger(-50, animations.animate(250, animations.style({ opacity: 0 }))))
                        ])
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
FloatingActionButtonsComponent.ctorParameters = function () { return [
    { type: FloatingActionButtonsService, },
    { type: core.ElementRef, },
]; };
FloatingActionButtonsComponent.propDecorators = {
    'direction': [{ type: core.Input },],
    'tooltips': [{ type: core.ContentChildren, args: [TooltipDirective,] },],
    'close': [{ type: core.HostListener, args: ['document:click', ['$event.target'],] },],
};
var FloatingActionButtonComponent = (function () {
    /**
     * @param {?} primary
     * @param {?} fab
     */
    function FloatingActionButtonComponent(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
    return FloatingActionButtonComponent;
}());
FloatingActionButtonComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-floating-action-button',
                template: "\n      <button class=\"btn floating-action-button\" \n              [class.button-primary]=\"primary\" \n              [class.button-secondary]=\"!primary\" \n              (click)=\"primary ? fab.open() : fab.close()\">\n\n          <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n          <ng-content *ngIf=\"!icon\"></ng-content>\n\n      </button>\n    ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            },] },
];
/**
 * @nocollapse
 */
FloatingActionButtonComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Attribute, args: ['fab-primary',] },] },
    { type: FloatingActionButtonsService, },
]; };
FloatingActionButtonComponent.propDecorators = {
    'icon': [{ type: core.Input },],
    'tabindex': [{ type: core.HostBinding },],
};
var FloatingActionButtonsModule = (function () {
    function FloatingActionButtonsModule() {
    }
    return FloatingActionButtonsModule;
}());
FloatingActionButtonsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [
                    FloatingActionButtonsComponent,
                    FloatingActionButtonComponent
                ],
                declarations: [
                    FloatingActionButtonsComponent,
                    FloatingActionButtonComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
FloatingActionButtonsModule.ctorParameters = function () { return []; };
var ItemDisplayPanelContentDirective = (function () {
    function ItemDisplayPanelContentDirective() {
    }
    return ItemDisplayPanelContentDirective;
}());
ItemDisplayPanelContentDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxItemDisplayPanelContent]'
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelContentDirective.ctorParameters = function () { return []; };
var ItemDisplayPanelFooterDirective = (function () {
    function ItemDisplayPanelFooterDirective() {
    }
    return ItemDisplayPanelFooterDirective;
}());
ItemDisplayPanelFooterDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelFooterDirective.ctorParameters = function () { return []; };
var ItemDisplayPanelComponent = (function () {
    function ItemDisplayPanelComponent() {
        this.boxShadow = true;
        this.closeVisible = true;
        this.preventClose = false;
        this.inline = false;
        this.animate = false;
        this.shadow = false;
        this.visibleChange = new core.EventEmitter();
        this._visible = false;
    }
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "title", {
        /**
         * @return {?}
         */
        get: function () {
            return this.header;
        },
        /**
         * @deprecated
         * Title used for adding tooltips and shouldn't be used as an input
         * instead header will be used. This is here to support backward compatibility only
         * this property should not be used.
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.header = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemDisplayPanelComponent.prototype, "visible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._visible;
        },
        /**
         * @param {?} visible
         * @return {?}
         */
        set: function (visible) {
            this._visible = visible;
            // invoke change event
            this.visibleChange.emit(this._visible);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ItemDisplayPanelComponent.prototype.clickOff = function (event) {
        // dont close
        if (this.preventClose) {
            return;
        }
        // dont do anything if the panel is hidden
        if (this._visible) {
            var /** @type {?} */ target = (event.target);
            // if the target node is the HTML tag, then this was triggered by scrolling and we should not close the panel
            if (target.nodeName === 'HTML') {
                return;
            }
            var /** @type {?} */ hidePanel = true;
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
ItemDisplayPanelComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-item-display-panel',
                template: "\n      <div class=\"ux-item-display-panel\" [class.box-shadow]=\"boxShadow\" [class.inline]=\"inline\" [class.animate]=\"animate\" [class.item-display-panel-hide]=\"!visible\" [style.width]=\"width\" [style.top.px]=\"top\" [style.height]='\"calc(100% - \" + top + \"px)\"'>\n\n          <div class=\"item-display-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n              <div class=\"heading-flex-box\">\n                  <h3>{{ header }}</h3>\n                  <span *ngIf=\"closeVisible\" class=\"heading-close-button\" tabindex=\"0\" (click)=\"visible = false\" (keydown.enter)=\"visible = false\">\n                      <i class=\"hpe-icon hpe-close\"></i>\n                  </span>\n              </div>\n          </div>\n\n          <div class=\"item-display-panel-content\">\n              <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n          </div>\n\n          <div class=\"item-display-panel-footer\" *ngIf=\"footer\">\n              <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n          </div>\n\n      </div>\n    ",
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
ItemDisplayPanelComponent.ctorParameters = function () { return []; };
ItemDisplayPanelComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'top': [{ type: core.Input },],
    'boxShadow': [{ type: core.Input },],
    'closeVisible': [{ type: core.Input },],
    'preventClose': [{ type: core.Input },],
    'inline': [{ type: core.Input },],
    'animate': [{ type: core.Input },],
    'shadow': [{ type: core.Input },],
    'width': [{ type: core.Input },],
    'footer': [{ type: core.ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
    'visibleChange': [{ type: core.Output },],
    'title': [{ type: core.Input },],
    'visible': [{ type: core.Input },],
};
var DECLARATIONS$4 = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];
var ItemDisplayPanelModule = (function () {
    function ItemDisplayPanelModule() {
    }
    return ItemDisplayPanelModule;
}());
ItemDisplayPanelModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: DECLARATIONS$4,
                declarations: DECLARATIONS$4
            },] },
];
/**
 * @nocollapse
 */
ItemDisplayPanelModule.ctorParameters = function () { return []; };
var WizardStepComponent = (function () {
    function WizardStepComponent() {
        this.valid = true;
        this.visitedChange = new core.EventEmitter();
        this._active = false;
        this._visited = false;
    }
    Object.defineProperty(WizardStepComponent.prototype, "visited", {
        /**
         * @return {?}
         */
        get: function () {
            return this._visited;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._visited = value;
            this.visitedChange.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepComponent.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            return this._active;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            // store the active state of the step
            this._active = value;
            // if the value is true then the step should also be marked as visited
            if (value === true) {
                this.visited = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    return WizardStepComponent;
}());
WizardStepComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-wizard-step',
                template: "\n      <ng-container *ngIf=\"active\">\n          <ng-content></ng-content>\n      </ng-container>\n    "
            },] },
];
/**
 * @nocollapse
 */
WizardStepComponent.ctorParameters = function () { return []; };
WizardStepComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'valid': [{ type: core.Input },],
    'visitedChange': [{ type: core.Input },],
    'visited': [{ type: core.Input },],
};
var WizardComponent = (function () {
    function WizardComponent() {
        this._step = 0;
        this.steps = new core.QueryList();
        this.orientation = 'horizontal';
        this.nextText = 'Next';
        this.previousText = 'Previous';
        this.cancelText = 'Cancel';
        this.finishText = 'Finish';
        this.nextTooltip = 'Go to the next step';
        this.previousTooltip = 'Go to the previous step';
        this.cancelTooltip = 'Cancel the wizard';
        this.finishTooltip = 'Finish the wizard';
        this.nextDisabled = false;
        this.previousDisabled = false;
        this.cancelDisabled = false;
        this.finishDisabled = false;
        this.nextVisible = true;
        this.previousVisible = true;
        this.cancelVisible = true;
        this.finishVisible = true;
        this.cancelAlwaysVisible = false;
        this.finishAlwaysVisible = false;
        this.onNext = new core.EventEmitter();
        this.onPrevious = new core.EventEmitter();
        this.onCancel = new core.EventEmitter();
        this.onFinishing = new core.EventEmitter();
        this.onFinish = new core.EventEmitter();
        this.stepChanging = new core.EventEmitter();
        this.stepChange = new core.EventEmitter();
        this.invalidIndicator = false;
    }
    Object.defineProperty(WizardComponent.prototype, "step", {
        /**
         * @return {?}
         */
        get: function () {
            return this._step;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            // only accept numbers as valid options
            if (typeof value === 'number') {
                // store the active step
                this._step = value;
                // update which steps should be active
                this.update();
                // emit the change event
                this.stepChange.next(this.step);
                // reset the invalid state
                this.invalidIndicator = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardComponent.prototype.ngAfterViewInit = function () {
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
    };
    /**
     * Navigate to the next step
     * @return {?}
     */
    WizardComponent.prototype.next = function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step + 1));
        // check if current step is invalid
        if (!this.getCurrentStep().valid) {
            this.invalidIndicator = true;
            return;
        }
        // check if we are currently on the last step
        if ((this.step + 1) < this.steps.length) {
            this.step++;
            // emit the current step
            this.onNext.next(this.step);
        }
    };
    /**
     * Navigate to the previous step
     * @return {?}
     */
    WizardComponent.prototype.previous = function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step - 1));
        // check if we are currently on the last step
        if (this.step > 0) {
            this.step--;
            // emit the current step
            this.onPrevious.next(this.step);
        }
    };
    /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    WizardComponent.prototype.finish = function () {
        var _this = this;
        // fires when the finish button is clicked always
        this.onFinishing.next();
        /**
         * This is required because we need to ensure change detection has run
         * to determine whether or not we have the latest value for the 'valid' input
         * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
         * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
         */
        return new Promise(function (resolve) {
            setTimeout(function () {
                // only fires when the finish button is clicked and the step is valid
                if (_this.getCurrentStep().valid) {
                    _this.onFinish.next();
                }
                resolve();
            });
        });
    };
    /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    WizardComponent.prototype.cancel = function () {
        this.onCancel.next();
    };
    /**
     * Update the active state of each step
     * @return {?}
     */
    WizardComponent.prototype.update = function () {
        var _this = this;
        // update which steps should be active
        this.steps.forEach(function (step, idx) { return step.active = idx === _this.step; });
    };
    /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    WizardComponent.prototype.gotoStep = function (step) {
        if (step.visited) {
            var /** @type {?} */ stepIndex = this.steps.toArray().findIndex(function (stp) { return stp === step; });
            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));
            this.step = stepIndex;
        }
    };
    /**
     * Determine if the current step is the last step
     * @return {?}
     */
    WizardComponent.prototype.isLastStep = function () {
        return this.step === (this.steps.length - 1);
    };
    /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    WizardComponent.prototype.reset = function () {
        // mark all steps as not visited
        this.steps.forEach(function (step) { return step.visited = false; });
        // go to the first step
        this.step = 0;
    };
    /**
     * Get the step at the current index
     * @return {?}
     */
    WizardComponent.prototype.getCurrentStep = function () {
        return this.getStepAtIndex(this.step);
    };
    /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    WizardComponent.prototype.getStepAtIndex = function (index) {
        return this.steps.toArray()[index];
    };
    return WizardComponent;
}());
WizardComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-wizard',
                template: "\n      <div class=\"wizard-body\">\n\n          <div class=\"wizard-steps\">\n    \n              <div class=\"wizard-step\" [class.active]=\"stp.active\" [class.visited]=\"stp.visited\" [class.invalid]=\"stp.active && !stp.valid && invalidIndicator\" (click)=\"gotoStep(stp)\" *ngFor=\"let stp of steps\">\n                  {{ stp.header }}\n              </div>\n    \n          </div>\n    \n          <div class=\"wizard-content\">\n              <ng-content></ng-content>\n          </div>\n    \n      </div>\n\n      <div class=\"wizard-footer\">\n          <button #tip=\"bs-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [tooltip]=\"previousTooltip\" container=\"body\" [disabled]=\"previousDisabled || step === 0\"\n              (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n          <button #tip=\"bs-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [tooltip]=\"nextTooltip\" container=\"body\" [disabled]=\"nextDisabled\"\n              (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n          <button #tip=\"bs-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [tooltip]=\"finishTooltip\"\n              container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n          <button #tip=\"bs-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [tooltip]=\"cancelTooltip\"\n              container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n      </div>\n    ",
                host: {
                    '[class]': 'orientation'
                }
            },] },
];
/**
 * @nocollapse
 */
WizardComponent.ctorParameters = function () { return []; };
WizardComponent.propDecorators = {
    'steps': [{ type: core.ContentChildren, args: [WizardStepComponent,] },],
    'orientation': [{ type: core.Input },],
    'nextText': [{ type: core.Input },],
    'previousText': [{ type: core.Input },],
    'cancelText': [{ type: core.Input },],
    'finishText': [{ type: core.Input },],
    'nextTooltip': [{ type: core.Input },],
    'previousTooltip': [{ type: core.Input },],
    'cancelTooltip': [{ type: core.Input },],
    'finishTooltip': [{ type: core.Input },],
    'nextDisabled': [{ type: core.Input },],
    'previousDisabled': [{ type: core.Input },],
    'cancelDisabled': [{ type: core.Input },],
    'finishDisabled': [{ type: core.Input },],
    'nextVisible': [{ type: core.Input },],
    'previousVisible': [{ type: core.Input },],
    'cancelVisible': [{ type: core.Input },],
    'finishVisible': [{ type: core.Input },],
    'cancelAlwaysVisible': [{ type: core.Input },],
    'finishAlwaysVisible': [{ type: core.Input },],
    'onNext': [{ type: core.Output },],
    'onPrevious': [{ type: core.Output },],
    'onCancel': [{ type: core.Output },],
    'onFinishing': [{ type: core.Output },],
    'onFinish': [{ type: core.Output },],
    'stepChanging': [{ type: core.Output },],
    'stepChange': [{ type: core.Output },],
    'step': [{ type: core.Input },],
};
var StepChangingEvent = (function () {
    /**
     * @param {?} from
     * @param {?} to
     */
    function StepChangingEvent(from$$1, to) {
        this.from = from$$1;
        this.to = to;
    }
    return StepChangingEvent;
}());
var DECLARATIONS$5 = [
    WizardComponent,
    WizardStepComponent
];
var WizardModule = (function () {
    function WizardModule() {
    }
    return WizardModule;
}());
WizardModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    TooltipModule.forRoot()
                ],
                exports: DECLARATIONS$5,
                declarations: DECLARATIONS$5
            },] },
];
/**
 * @nocollapse
 */
WizardModule.ctorParameters = function () { return []; };
/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
var MarqueeWizardService = (function () {
    function MarqueeWizardService() {
        this.valid$ = new Subject.Subject();
    }
    return MarqueeWizardService;
}());
MarqueeWizardService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
MarqueeWizardService.ctorParameters = function () { return []; };
var MarqueeWizardStepComponent = (function (_super) {
    __extends(MarqueeWizardStepComponent, _super);
    /**
     * @param {?} _marqueeWizardService
     */
    function MarqueeWizardStepComponent(_marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this._marqueeWizardService = _marqueeWizardService;
        _this.completed = false;
        _this.completedChange = new core.EventEmitter();
        _this._valid = true;
        return _this;
    }
    Object.defineProperty(MarqueeWizardStepComponent.prototype, "valid", {
        /**
         * @return {?}
         */
        get: function () {
            return this._valid;
        },
        /**
         * @param {?} valid
         * @return {?}
         */
        set: function (valid) {
            this._valid = valid;
            if (this._marqueeWizardService) {
                this._marqueeWizardService.valid$.next({ step: this, valid: valid });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update the completed state and emit the latest value
     * @param {?} completed whether or not the step is completed
     * @return {?}
     */
    MarqueeWizardStepComponent.prototype.setCompleted = function (completed) {
        this.completed = completed;
        this.completedChange.emit(completed);
    };
    return MarqueeWizardStepComponent;
}(WizardStepComponent));
MarqueeWizardStepComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-marquee-wizard-step',
                template: "\n      <ng-container *ngIf=\"active\">\n          <ng-content></ng-content>\n      </ng-container>\n    "
            },] },
];
/**
 * @nocollapse
 */
MarqueeWizardStepComponent.ctorParameters = function () { return [
    { type: MarqueeWizardService, },
]; };
MarqueeWizardStepComponent.propDecorators = {
    'icon': [{ type: core.Input },],
    'completed': [{ type: core.Input },],
    'completedChange': [{ type: core.Output },],
};
var MarqueeWizardComponent = (function (_super) {
    __extends(MarqueeWizardComponent, _super);
    /**
     * @param {?} marqueeWizardService
     */
    function MarqueeWizardComponent(marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this.steps = new core.QueryList();
        marqueeWizardService.valid$.pipe(filter_2(function (event) { return !event.valid; })).subscribe(_this.validChange.bind(_this));
        return _this;
    }
    Object.defineProperty(MarqueeWizardComponent.prototype, "isTemplate", {
        /**
         * @return {?}
         */
        get: function () {
            return this.description && this.description instanceof core.TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    MarqueeWizardComponent.prototype.next = function () {
        // get the current step
        var /** @type {?} */ step = (this.getCurrentStep());
        if (step.valid) {
            _super.prototype.next.call(this);
            // mark this step as completed
            step.setCompleted(true);
        }
    };
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    MarqueeWizardComponent.prototype.finish = function () {
        // get the current step
        var /** @type {?} */ step = (this.getCurrentStep());
        // call the original finish function
        return _super.prototype.finish.call(this).then(function () {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    };
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    MarqueeWizardComponent.prototype.validChange = function (state$$1) {
        var /** @type {?} */ steps = this.steps.toArray();
        var /** @type {?} */ current = steps.findIndex(function (step) { return step === state$$1.step; });
        var /** @type {?} */ affected = steps.slice(current);
        affected.forEach(function (step) {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state$$1.step) {
                step.visited = false;
            }
        });
    };
    return MarqueeWizardComponent;
}(WizardComponent));
MarqueeWizardComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-marquee-wizard',
                template: "\n      <div class=\"marquee-wizard-side-panel\">\n\n          <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n              <!-- If a template was provided display it -->\n              <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n              <!-- Otherwise wimply display the string -->\n              <ng-container *ngIf=\"!isTemplate\">\n                  <p>{{ description }}</p>\n              </ng-container>\n          </div>\n\n          <ul class=\"marquee-wizard-steps\">\n\n              <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n                  <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n                  <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n                  <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n              </li>\n\n          </ul>\n      </div>\n\n      <div class=\"marquee-wizard-content-panel\">\n          <div class=\"marquee-wizard-content\">\n              <ng-content></ng-content>\n          </div>\n\n          <div class=\"modal-footer\">\n\n              <button #tip=\"bs-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [tooltip]=\"previousTooltip\" container=\"body\"\n                  [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n              <button #tip=\"bs-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [tooltip]=\"nextTooltip\" container=\"body\"\n                  [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n              <button #tip=\"bs-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [tooltip]=\"finishTooltip\"\n                  container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n              <button #tip=\"bs-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [tooltip]=\"cancelTooltip\"\n                  container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n          </div>\n      </div>\n    ",
                providers: [MarqueeWizardService]
            },] },
];
/**
 * @nocollapse
 */
MarqueeWizardComponent.ctorParameters = function () { return [
    { type: MarqueeWizardService, },
]; };
MarqueeWizardComponent.propDecorators = {
    'description': [{ type: core.Input },],
    'steps': [{ type: core.ContentChildren, args: [MarqueeWizardStepComponent,] },],
};
var MarqueeWizardModule = (function () {
    function MarqueeWizardModule() {
    }
    return MarqueeWizardModule;
}());
MarqueeWizardModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    WizardModule,
                    TooltipModule.forRoot()
                ],
                exports: [
                    MarqueeWizardComponent,
                    MarqueeWizardStepComponent
                ],
                declarations: [
                    MarqueeWizardComponent,
                    MarqueeWizardStepComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
MarqueeWizardModule.ctorParameters = function () { return []; };
var NavigationComponent = (function () {
    function NavigationComponent() {
    }
    return NavigationComponent;
}());
NavigationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-navigation',
                template: "\n      <nav class=\"tree\" role=\"navigation\">\n          <ol class=\"nav\">\n              <ng-content></ng-content>\n          </ol>\n      </nav>\n    "
            },] },
];
/**
 * @nocollapse
 */
NavigationComponent.ctorParameters = function () { return []; };
var NavigationItemComponent = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _parent
     * @param {?} _router
     * @param {?} _activatedRoute
     */
    function NavigationItemComponent(_elementRef, _renderer, _parent, _router, _activatedRoute) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter_2(function (event) { return event instanceof router.NavigationEnd; }))
            .subscribe(function () { return _this.expanded = _this.hasActiveLink(_this.link); });
    }
    Object.defineProperty(NavigationItemComponent.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.link) {
                return this._router.isActive(this.link, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationItemComponent.prototype, "children", {
        /**
         * @return {?}
         */
        get: function () {
            var _this = this;
            return this._children.filter(function (item) { return item !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterViewInit = function () {
        // Add classes to parent for styling
        var /** @type {?} */ parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            var /** @type {?} */ levelClass = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();
        // Update 'indentWithoutArrow' in response to changes to children
        this._childrenChanges = this._children.changes.subscribe(function () { return _this.setIndentWithoutArrow(); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.ngOnDestroy = function () {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    };
    /**
     * @param {?} link
     * @return {?}
     */
    NavigationItemComponent.prototype.hasActiveLink = function (link) {
        var /** @type {?} */ tree = this._router.createUrlTree([link], {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });
        if (link && this._router.isActive(tree, true)) {
            return true;
        }
        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some(function (item) { return item.hasActiveLink(item.link); });
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.getLevelClass = function () {
        switch (this.level) {
            case 2:
                return 'nav-second-level';
            case 3:
                return 'nav-third-level';
            case 4:
                return 'nav-fourth-level';
            case 5:
                return 'nav-fifth-level';
        }
        return '';
    };
    /**
     * @return {?}
     */
    NavigationItemComponent.prototype.setIndentWithoutArrow = function () {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        }
        else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every(function (item) { return item.children.length === 0; });
        }
        else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    };
    return NavigationItemComponent;
}());
NavigationItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: '[ux-navigation-item]',
                template: "\n      <a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\n          <span>{{header}}</span>\n      </a>\n      <a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\n          <span>{{header}}</span>\n      </a>\n      <ng-content></ng-content>\n    ",
            },] },
];
/**
 * @nocollapse
 */
NavigationItemComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: NavigationItemComponent, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
    { type: router.Router, },
    { type: router.ActivatedRoute, },
]; };
NavigationItemComponent.propDecorators = {
    'header': [{ type: core.Input },],
    'icon': [{ type: core.Input },],
    'link': [{ type: core.Input },],
    'expanded': [{ type: core.Input }, { type: core.HostBinding, args: ['class.selected',] },],
    'active': [{ type: core.HostBinding, args: ['class.active',] },],
    '_children': [{ type: core.ContentChildren, args: [NavigationItemComponent, { descendants: true },] },],
};
var NavigationModule = (function () {
    function NavigationModule() {
    }
    return NavigationModule;
}());
NavigationModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    router.RouterModule
                ],
                exports: [
                    NavigationComponent,
                    NavigationItemComponent
                ],
                declarations: [
                    NavigationComponent,
                    NavigationItemComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
NavigationModule.ctorParameters = function () { return []; };
var ColorService = (function () {
    /**
     * @param {?} document
     */
    function ColorService(document) {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    ColorService.prototype.setColors = function () {
        this._html = '';
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValueByHex = function (color) {
        var /** @type {?} */ hex = color.replace('#', '');
        var /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        var /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        var /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValue = function (color) {
        var /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        var /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        var /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColor = function (color) {
        var /** @type {?} */ themeColor = this._colors[color.toLowerCase()];
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    };
    /**
     * @return {?}
     */
    ColorService.prototype.getColorSet = function () {
        return this._colorSet;
    };
    /**
     * @param {?} colorSet
     * @return {?}
     */
    ColorService.prototype.setColorSet = function (colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorService.prototype.resolve = function (value) {
        if (!value) {
            return;
        }
        var /** @type {?} */ colorName = this.resolveColorName(value);
        for (var /** @type {?} */ color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }
        return value;
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    ColorService.prototype.resolveColorName = function (value) {
        if (value === void 0) { value = ''; }
        return value.replace(/\s+/g, '-').toLowerCase();
    };
    return ColorService;
}());
ColorService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ColorService.ctorParameters = function () { return [
    { type: Document, decorators: [{ type: core.Inject, args: [platformBrowser.DOCUMENT,] },] },
]; };
var ThemeColor = (function () {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    function ThemeColor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ThemeColor.parse = function (value) {
        var /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        var /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        var /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
        var /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        var /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        var /** @type {?} */ longHexMatch = value.match(longHexPattern);
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
            throw new Error("Cannot parse color - " + value + " is not a valid color.");
        }
        return new ThemeColor(r, g, b, a);
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toHex = function () {
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
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgb = function () {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgba = function () {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getRed = function () {
        return this._r;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getGreen = function () {
        return this._g;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getBlue = function () {
        return this._b;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getAlpha = function () {
        return this._a;
    };
    /**
     * @param {?} red
     * @return {?}
     */
    ThemeColor.prototype.setRed = function (red) {
        this._r = red;
        return this;
    };
    /**
     * @param {?} green
     * @return {?}
     */
    ThemeColor.prototype.setGreen = function (green) {
        this._g = green;
        return this;
    };
    /**
     * @param {?} blue
     * @return {?}
     */
    ThemeColor.prototype.setBlue = function (blue) {
        this._b = blue;
        return this;
    };
    /**
     * @param {?} alpha
     * @return {?}
     */
    ThemeColor.prototype.setAlpha = function (alpha) {
        this._a = alpha.toString();
        return this;
    };
    return ThemeColor;
}());
var colorSets = {
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
var ColorServiceModule = (function () {
    function ColorServiceModule() {
    }
    return ColorServiceModule;
}());
ColorServiceModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [ColorService],
            },] },
];
/**
 * @nocollapse
 */
ColorServiceModule.ctorParameters = function () { return []; };
var NotificationService = (function () {
    /**
     * @param {?} _colorService
     */
    function NotificationService(_colorService) {
        this._colorService = _colorService;
        // provide default options
        this.options = {
            duration: 4,
            height: 100,
            spacing: 10,
            backgroundColor: this._colorService.getColor('accent').toHex(),
            iconColor: this._colorService.getColor('accent').toHex()
        };
        this.direction = 'above';
        this.notifications$ = new BehaviorSubject.BehaviorSubject([]);
    }
    /**
     * @param {?} templateRef
     * @param {?=} options
     * @return {?}
     */
    NotificationService.prototype.show = function (templateRef, options) {
        var _this = this;
        if (options === void 0) { options = this.options; }
        options = Object.assign({}, this.options, options);
        var /** @type {?} */ notificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor
        };
        var /** @type {?} */ notifications = this.notifications$.getValue();
        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        }
        else {
            notifications.push(notificationRef);
        }
        this.notifications$.next(notifications);
        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(function () { return _this.dismiss(notificationRef); }, options.duration * 1000);
        }
        return notificationRef;
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.getHistory = function () {
        return this.notifications$.getValue();
    };
    /**
     * @param {?} notificationRef
     * @return {?}
     */
    NotificationService.prototype.dismiss = function (notificationRef) {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    };
    /**
     * @return {?}
     */
    NotificationService.prototype.dismissAll = function () {
        this.notifications$.getValue().forEach(function (notificationRef) { return notificationRef.visible = false; });
        this.notifications$.next(this.notifications$.getValue());
    };
    return NotificationService;
}());
NotificationService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
NotificationService.ctorParameters = function () { return [
    { type: ColorService, },
]; };
var NotificationListComponent = (function () {
    /**
     * @param {?} _notificationService
     */
    function NotificationListComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.position = 'top-right';
        this.notifications$ = this._notificationService.notifications$.pipe(map_2(function (notificationRefs) { return notificationRefs.filter(function (notificationRef) { return notificationRef.visible; }); }));
    }
    Object.defineProperty(NotificationListComponent.prototype, "direction", {
        /**
         * @param {?} direction
         * @return {?}
         */
        set: function (direction) {
            this._notificationService.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    return NotificationListComponent;
}());
NotificationListComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-notification-list',
                template: "\n      <div class=\"notification\" *ngFor=\"let notificationRef of notifications$ | async; let idx = index\" \n          [style.top.px]=\"(notificationRef.height + notificationRef.spacing) * idx\"\n          [style.height.px]=\"notificationRef.height\"\n          [style.background-color]=\"notificationRef.backgroundColor\"\n          [@notificationState]>\n          <ng-container *ngTemplateOutlet=\"notificationRef.templateRef; context: { $implicit: notificationRef }\"></ng-container>\n      </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                animations: [
                    animations.trigger('notificationState', [
                        animations.state('in', animations.style({ transform: 'translateY(0)', opacity: 0.9 })),
                        animations.transition(':enter', [
                            animations.style({ transform: 'translateY(-50px)', opacity: 0 }),
                            animations.animate(500)
                        ]),
                        animations.transition(':leave', [
                            animations.animate(500, animations.style({ transform: 'translateY(50px)', opacity: 0 }))
                        ])
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
NotificationListComponent.ctorParameters = function () { return [
    { type: NotificationService, },
]; };
NotificationListComponent.propDecorators = {
    'direction': [{ type: core.Input },],
    'position': [{ type: core.Input }, { type: core.HostBinding, args: ['class',] },],
};
var NotificationModule = (function () {
    function NotificationModule() {
    }
    return NotificationModule;
}());
NotificationModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    ColorServiceModule
                ],
                exports: [
                    NotificationListComponent
                ],
                declarations: [
                    NotificationListComponent
                ],
                providers: [
                    NotificationService
                ]
            },] },
];
/**
 * @nocollapse
 */
NotificationModule.ctorParameters = function () { return []; };
var NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return NumberPickerComponent; }),
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
        this.valueChange = new core.EventEmitter();
    }
    Object.defineProperty(NumberPickerComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this._propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "min", {
        /**
         * @return {?}
         */
        get: function () {
            return this._min;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._min = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "max", {
        /**
         * @return {?}
         */
        get: function () {
            return this._max;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._max = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "step", {
        /**
         * @return {?}
         */
        get: function () {
            return this._step;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._step = typeof value === 'string' ? parseFloat(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberPickerComponent.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.increment = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.decrement = function (event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    };
    /**
     * @return {?}
     */
    NumberPickerComponent.prototype.isValid = function () {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NumberPickerComponent.prototype.onScroll = function (event) {
        var /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NumberPickerComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnChange = function (fn) {
        this._propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NumberPickerComponent.prototype.registerOnTouched = function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NumberPickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return NumberPickerComponent;
}());
NumberPickerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-number-picker',
                template: "\n      <input type=\"number\" class=\"form-control number-picker-input\" [(ngModel)]=\"value\" [min]=\"min\" [max]=\"max\" (keydown.ArrowDown)=\"decrement($event)\"\n          (keydown.ArrowUp)=\"increment($event)\" (wheel)=\"onScroll($event)\" step=\"any\" [disabled]=\"disabled\">\n\n      <div class=\"number-picker-controls\">\n\n          <div class=\"number-picker-control-up\" (click)=\"increment($event)\" [class.disabled]=\"disabled || value >= max\">\n              <span class=\"hpe-icon hpe-up\"></span>\n          </div>\n\n          <div class=\"number-picker-control-down\" (click)=\"decrement($event)\" [class.disabled]=\"disabled || value <= min\">\n              <span class=\"hpe-icon hpe-down\"></span>\n          </div>\n\n      </div>\n    ",
                providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                host: {
                    '[class.has-error]': '!isValid()'
                }
            },] },
];
/**
 * @nocollapse
 */
NumberPickerComponent.ctorParameters = function () { return []; };
NumberPickerComponent.propDecorators = {
    'valid': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'value': [{ type: core.Input, args: ['value',] },],
    'min': [{ type: core.Input },],
    'max': [{ type: core.Input },],
    'step': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
};
var NumberPickerModule = (function () {
    function NumberPickerModule() {
    }
    return NumberPickerModule;
}());
NumberPickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                exports: [NumberPickerComponent],
                declarations: [NumberPickerComponent]
            },] },
];
/**
 * @nocollapse
 */
NumberPickerModule.ctorParameters = function () { return []; };
var PageHeaderCustomMenuDirective = (function () {
    function PageHeaderCustomMenuDirective() {
    }
    return PageHeaderCustomMenuDirective;
}());
PageHeaderCustomMenuDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxPageHeaderCustomMenu]'
            },] },
];
/**
 * @nocollapse
 */
PageHeaderCustomMenuDirective.ctorParameters = function () { return []; };
var PageHeaderComponent = (function () {
    /**
     * @param {?} _colorService
     */
    function PageHeaderComponent(_colorService) {
        this._colorService = _colorService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.backClick = new core.EventEmitter();
    }
    Object.defineProperty(PageHeaderComponent.prototype, "familyBackground", {
        /**
         * @return {?}
         */
        get: function () {
            return this._familyBackground;
        },
        /**
         * @param {?} color
         * @return {?}
         */
        set: function (color) {
            this._familyBackground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageHeaderComponent.prototype, "familyForeground", {
        /**
         * @return {?}
         */
        get: function () {
            return this._familyForeground;
        },
        /**
         * @param {?} color
         * @return {?}
         */
        set: function (color) {
            this._familyForeground = this._colorService.resolve(color);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.goBack = function () {
        this.backClick.emit();
    };
    /**
     * @return {?}
     */
    PageHeaderComponent.prototype.getCondensedBreadcrumbs = function () {
        if (this.crumbs) {
            var /** @type {?} */ crumbs = this.crumbs.slice();
            crumbs.push({ title: this.header });
            return crumbs;
        }
        return [{ title: this.header }];
    };
    return PageHeaderComponent;
}());
PageHeaderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-page-header',
                exportAs: 'ux-page-header',
                template: "\n      <!-- Display Upper Section when not condensed -->\n      <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n          <div class=\"page-header-logo-container\" [hidden]=\"!logo\">\n              <img [attr.src]=\"logo\" class=\"page-header-logo\">\n          </div>\n\n          <div class=\"page-header-navigation\" [ngClass]=\"alignment\">\n\n              <!-- The Top Navigation Options -->\n              <ux-page-header-horizontal-navigation [items]=\"items\"></ux-page-header-horizontal-navigation>\n          </div>\n\n          <div class=\"page-header-icon-menus\">\n              <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n              <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n          </div>\n      </div>\n\n      <!-- Display Lower Section When Not Condensed -->\n      <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n          <div class=\"page-header-state-container\">\n\n              <div *ngIf=\"backVisible == true\" class=\"page-header-back-button\" (click)=\"goBack()\">\n                  <span class=\"hpe-icon hpe-previous text-primary\"></span>\n              </div>\n\n              <div class=\"page-header-title-container\">\n\n                  <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                  <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n              </div>\n\n          </div>\n\n      </div>\n\n      <!-- Display This Section Optimized for Condensed Mode -->\n      <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n          <div class=\"page-header-breadcrumbs\">\n              <ux-breadcrumbs [crumbs]=\"getCondensedBreadcrumbs()\"></ux-breadcrumbs>\n          </div>\n\n          <div class=\"page-header-navigation\" [ngClass]=\"alignment\">\n\n              <!-- The Top Navigation Options -->\n              <ux-page-header-horizontal-navigation [items]=\"items\"></ux-page-header-horizontal-navigation>\n          </div>\n\n          <div class=\"page-header-icon-menus\">\n              <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n              <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n          </div>\n\n      </div>\n    ",
                host: {
                    '[class.page-header-condensed]': 'condensed'
                }
            },] },
];
/**
 * @nocollapse
 */
PageHeaderComponent.ctorParameters = function () { return [
    { type: ColorService, },
]; };
PageHeaderComponent.propDecorators = {
    'logo': [{ type: core.Input },],
    'items': [{ type: core.Input },],
    'crumbs': [{ type: core.Input },],
    'header': [{ type: core.Input },],
    'alignment': [{ type: core.Input },],
    'condensed': [{ type: core.Input },],
    'iconMenus': [{ type: core.Input },],
    'backVisible': [{ type: core.Input },],
    'familyBackground': [{ type: core.Input },],
    'familyForeground': [{ type: core.Input },],
    'backClick': [{ type: core.Output },],
    'customMenus': [{ type: core.ContentChildren, args: [PageHeaderCustomMenuDirective, { read: core.TemplateRef },] },],
};
var PageHeaderIconMenuComponent = (function () {
    function PageHeaderIconMenuComponent() {
    }
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderIconMenuComponent.prototype.select = function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
    };
    return PageHeaderIconMenuComponent;
}());
PageHeaderIconMenuComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-page-header-icon-menu',
                template: "\n      <div class=\"page-header-icon-menu\" dropdown dropdownToggle placement=\"bottom right\">\n\n          <a class=\"page-header-icon-menu-button\" (click)=\"select(menu)\">\n              <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n              <span class=\"label label-primary\" *ngIf=\"menu?.badge\">{{ menu.badge }}</span>\n          </a>\n\n          <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n\n              <li role=\"menuitem\" *ngFor=\"let dropdown of menu?.dropdown\" [class.dropdown-header]=\"dropdown.header\" [class.dropdown-divider]=\"dropdown.divider\">\n\n                  <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n                  <a class=\"dropdown-item\" *ngIf=\"!dropdown.header\" (click)=\"select(dropdown)\">\n                      <i class=\"hpe-icon hp-fw text-muted\" [ngClass]=\"dropdown.icon\"></i>\n                      {{ dropdown.title }}\n                      <span class=\"pull-right text-muted small\" *ngIf=\"dropdown.subtitle\">{{ dropdown.subtitle }}</span>\n                  </a>\n              </li>\n\n          </ul>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
PageHeaderIconMenuComponent.ctorParameters = function () { return []; };
PageHeaderIconMenuComponent.propDecorators = {
    'menu': [{ type: core.Input },],
};
var PageHeaderNavigationDropdownItemComponent = (function () {
    function PageHeaderNavigationDropdownItemComponent() {
        var _this = this;
        this.onSelect = new core.EventEmitter();
        this.dropdownOpen = false;
        this._dropdownEvents = new Subject.Subject();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._dropdownEvents.debounceTime(1).subscribe(function (visible) { return _this.dropdownOpen = visible; });
    }
    /**
     * @param {?} item
     * @param {?=} parentItem
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverStart = function () {
        this._dropdownEvents.next(true);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.hoverLeave = function () {
        this._dropdownEvents.next(false);
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationDropdownItemComponent.prototype.close = function () {
        this.dropdownOpen = false;
    };
    return PageHeaderNavigationDropdownItemComponent;
}());
PageHeaderNavigationDropdownItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                template: "\n      <div role=\"menu-item\" dropdown [isOpen]=\"dropdownOpen\" container=\"body\" placement=\"right\" [isDisabled]=\"!item.children\" (mouseenter)=\"hoverStart()\"\n          (mouseleave)=\"hoverLeave()\" #subMenu=\"bs-dropdown\">\n\n          <!-- Show the menu item and the arrow if there are children -->\n          <a class=\"dropdown-item\" tabindex=\"0\" [class.selected]=\"item.selected\" (keyup.enter)=\"selectItem(item); subMenu.toggle()\" (click)=\"selectItem(item)\">\n              <span class=\"dropdown-item-title\">{{ item.title }}</span>\n              <span class=\"dropdown-item-icon hpe-icon hpe-next\" *ngIf=\"item.children\"></span>\n          </a>\n\n          <!-- Allow another level of menu items -->\n          <ul *dropdownMenu class=\"dropdown-menu horizontal-navigation-dropdown-submenu\" role=\"menu\" (mouseenter)=\"hoverStart()\" (mouseleave)=\"hoverLeave()\">\n\n              <li role=\"menuitem\" *ngFor=\"let subItem of item.children\" (click)=\"selectItem(subItem, item)\" (keyup.enter)=\"selectItem(subItem, item)\">\n                  <a class=\"dropdown-item\" tabindex=\"0\" [class.selected]=\"subItem.selected\">\n                      <span class=\"dropdown-item-title\">{{ subItem.title }}</span>\n                  </a>\n              </li>\n          </ul>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationDropdownItemComponent.ctorParameters = function () { return []; };
PageHeaderNavigationDropdownItemComponent.propDecorators = {
    'item': [{ type: core.Input },],
    'onSelect': [{ type: core.Output },],
};
var PageHeaderNavigationItemComponent = (function () {
    /**
     * @param {?} elementRef
     */
    function PageHeaderNavigationItemComponent(elementRef) {
        this.elementRef = elementRef;
        this.onSelect = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.onHidden.subscribe(function () { return _this.dropdownComponents.forEach(function (dropdown) { return dropdown.close(); }); });
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.selectItem = function () {
        // if the item has children then do nothing at this stage 
        if (this.item.children) {
            return;
        }
        // otherwise select the current item
        this.onItemSelect(this.item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationItemComponent.prototype.onItemSelect = function (item) {
        this.onSelect.emit(item);
        // select the current item
        this.item.selected = true;
    };
    return PageHeaderNavigationItemComponent;
}());
PageHeaderNavigationItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-item',
                template: "\n      <div class=\"horizontal-navigation-button\" dropdown dropdownToggle placement=\"bottom left\" [isDisabled]=\"!item?.children\" tabindex=\"0\" container=\"body\"\n          #menu=\"bs-dropdown\" (keyup.enter)=\"menu.toggle()\" [class.selected]=\"item?.selected\" (click)=\"selectItem()\">\n\n          <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n          <span class=\"navigation-item-label\">{{ item?.title }}</span>\n          <span class=\"hpe-icon hpe-down\" *ngIf=\"item?.children\"></span>\n\n          <div *dropdownMenu class=\"dropdown-menu horizontal-navigation-dropdown-menu\" role=\"menu\">\n              <ux-page-header-horizontal-navigation-dropdown-item *ngFor=\"let item of item?.children\" [item]=\"item\" (onSelect)=\"onItemSelect($event)\"></ux-page-header-horizontal-navigation-dropdown-item>\n          </div>\n\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationItemComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
PageHeaderNavigationItemComponent.propDecorators = {
    'menu': [{ type: core.ViewChild, args: ['menu',] },],
    'dropdownComponents': [{ type: core.ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] },],
    'item': [{ type: core.Input },],
    'onSelect': [{ type: core.Output },],
};
var PageHeaderNavigationComponent = (function () {
    /**
     * @param {?} elementRef
     * @param {?} resizeService
     */
    function PageHeaderNavigationComponent(elementRef, resizeService) {
        this.items = [];
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this));
    }
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.ngAfterViewInit = function () {
        this.updateSelectedIndicator();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.onSelect = function (item) {
        if (item.select) {
            item.select.call(item, item);
        }
        // deselect all items in all menus
        this.deselectAll();
        // update the selected indicator
        this.updateSelectedIndicator();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.deselectAll = function () {
        var _this = this;
        this.items.forEach(function (item) { return _this.deselect(item); });
    };
    /**
     * @param {?} navItem
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.deselect = function (navItem) {
        var _this = this;
        // deselect the current item
        navItem.selected = false;
        // iterate any children and deselect them
        if (navItem.children) {
            navItem.children.forEach(function (item) { return _this.deselect(item); });
        }
        // update the selected indicator
        this.updateSelectedIndicator();
    };
    /**
     * @return {?}
     */
    PageHeaderNavigationComponent.prototype.updateSelectedIndicator = function () {
        var _this = this;
        setTimeout(function () {
            // find the selected item
            var /** @type {?} */ selectedItem = _this.menuItems.find(function (item) { return item.item.selected; });
            // determine whether or not to show the indicator
            _this.indicatorVisible = !!selectedItem;
            // set the width of the indicator to match the width of the navigation item
            if (selectedItem) {
                var /** @type {?} */ styles = getComputedStyle(selectedItem.elementRef.nativeElement);
                _this.indicatorX = selectedItem.elementRef.nativeElement.offsetLeft;
                _this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    };
    return PageHeaderNavigationComponent;
}());
PageHeaderNavigationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-page-header-horizontal-navigation',
                template: "\n      <ux-page-header-horizontal-navigation-item *ngFor=\"let item of items\" [item]=\"item\" (onSelect)=\"onSelect($event)\"></ux-page-header-horizontal-navigation-item>\n      <div class=\"selected-indicator\" [style.opacity]=\"indicatorVisible ? 1 : 0\" [style.margin-left.px]=\"indicatorX\" [style.width.px]=\"indicatorWidth\"></div>\n    "
            },] },
];
/**
 * @nocollapse
 */
PageHeaderNavigationComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ResizeService, },
]; };
PageHeaderNavigationComponent.propDecorators = {
    'menuItems': [{ type: core.ViewChildren, args: [PageHeaderNavigationItemComponent,] },],
    'items': [{ type: core.Input },],
};
var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    return PageHeaderModule;
}());
PageHeaderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    BreadcrumbsModule,
                    ColorServiceModule,
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
PageHeaderModule.ctorParameters = function () { return []; };
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.value = 0;
        this.max = 100;
    }
    return ProgressBarComponent;
}());
ProgressBarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-progress-bar',
                template: "\n      <div class=\"progressbar-track\" [style.width.%]=\"(value / max) * 100\" [style.backgroundColor]=\"barColor\">\n          <ng-content></ng-content>\n      </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
ProgressBarComponent.ctorParameters = function () { return []; };
ProgressBarComponent.propDecorators = {
    'value': [{ type: core.Input },],
    'max': [{ type: core.Input },],
    'trackColor': [{ type: core.Input },],
    'barColor': [{ type: core.Input },],
};
var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    return ProgressBarModule;
}());
ProgressBarModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [ProgressBarComponent],
                declarations: [ProgressBarComponent]
            },] },
];
/**
 * @nocollapse
 */
ProgressBarModule.ctorParameters = function () { return []; };
var RADIOBUTTON_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return RadioButtonComponent; }),
    multi: true
};
var RadioButtonComponent = (function () {
    function RadioButtonComponent() {
        this.simplified = false;
        this.disabled = false;
        this.name = '';
        this.clickable = true;
        this.valueChange = new core.EventEmitter();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(RadioButtonComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
    /**
     * @return {?}
     */
    RadioButtonComponent.prototype.checkItem = function () {
        if (this.disabled === true || this.clickable === false) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    RadioButtonComponent.prototype.keyDown = function (event) {
        // then toggle the checkbox
        this.checkItem();
        // prevent default browser behavior
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RadioButtonComponent.prototype.writeValue = function (value) {
        if (value !== this._value) {
            this._value = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioButtonComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RadioButtonComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return RadioButtonComponent;
}());
RadioButtonComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-radio-button',
                template: "\n      <div class=\"ux-radio-button\" tabindex=\"0\"\n          [class.ux-checked]=\"value === option\"\n          [class.ux-simplified]=\"simplified === true\"\n          [class.ux-disabled]=\"disabled === true\"\n          (keydown.space)=\"keyDown($event)\">\n\n          <input type=\"radio\" role=\"radio\" tabindex=\"-1\"\n              [name]=\"name\" \n              [checked]=\"value === option\" \n              [disabled]=\"disabled\"\n              [value]=\"option\"\n              [id]=\"id\" />\n        \n      </div>\n\n      <div class=\"ux-radio-button-content\">\n          <ng-content></ng-content>\n      </div>\n    ",
                providers: [RADIOBUTTON_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
RadioButtonComponent.ctorParameters = function () { return []; };
RadioButtonComponent.propDecorators = {
    'id': [{ type: core.Input },],
    'simplified': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'name': [{ type: core.Input },],
    'clickable': [{ type: core.Input },],
    'option': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'value': [{ type: core.Input },],
    'checkItem': [{ type: core.HostListener, args: ['click',] },],
};
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [forms.FormsModule],
                exports: [RadioButtonComponent],
                declarations: [RadioButtonComponent]
            },] },
];
/**
 * @nocollapse
 */
RadioButtonModule.ctorParameters = function () { return []; };
var SearchBuilderService = (function () {
    function SearchBuilderService() {
        this.query = {};
        this.queryChange = new Subject.Subject();
        this.validationChange = new BehaviorSubject.BehaviorSubject(true);
        this._componentId = 0;
        this._components = [];
        this._validation = {};
    }
    /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponent = function (component) {
        // ensure there are no components with a matching name
        if (this._components.find(function (cmp) { return cmp.name === component.name; })) {
            throw new Error("Search builder components must have a unique name. The name " + component.name + " has already been used.");
        }
        // if unique then add the component to the list
        this._components.push(component);
    };
    /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    SearchBuilderService.prototype.registerComponents = function (components) {
        var _this = this;
        components.forEach(function (component) { return _this.registerComponent(component); });
    };
    /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    SearchBuilderService.prototype.getComponent = function (name) {
        // find the component
        var /** @type {?} */ component = this._components.find(function (cmp) { return cmp.name === name; });
        // if there is no match throw an exception
        if (!component) {
            throw new Error("No search build component with the name " + name + " exists");
        }
        // ensure config is defined - at least to an empty object
        component.config = component.config || {};
        return component;
    };
    /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    SearchBuilderService.prototype.setQuery = function (query$$1) {
        this.query = Object.assign({}, query$$1);
    };
    /**
     * Return the current query state
     * @return {?}
     */
    SearchBuilderService.prototype.getQuery = function () {
        return this.query;
    };
    /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    SearchBuilderService.prototype.queryHasChanged = function () {
        this.queryChange.next(this.query);
    };
    /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    SearchBuilderService.prototype.setValid = function (id, valid) {
        var _this = this;
        // store the state for this specific component
        this._validation[id] = valid;
        // evaluate the entire validation state
        this.validationChange.next(!Object.keys(this._validation).some(function (key) { return !_this._validation[key]; }));
    };
    /**
     * Generate a unique id for each component
     * @return {?}
     */
    SearchBuilderService.prototype.generateComponentId = function () {
        return this._componentId++;
    };
    return SearchBuilderService;
}());
SearchBuilderService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
SearchBuilderService.ctorParameters = function () { return []; };
var SearchBuilderGroupService = (function () {
    /**
     * @param {?} _searchBuilderService
     */
    function SearchBuilderGroupService(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    SearchBuilderGroupService.prototype.init = function (id) {
        var _this = this;
        // store the name of the group
        this._id = id;
        // create the entry in the query object if it doesn't exist
        if (!this._searchBuilderService.query[this._id]) {
            // create the section
            this._searchBuilderService.query[this._id] = [];
            // emit the changes after the initial setup
            setTimeout(function () { return _this._searchBuilderService.queryHasChanged(); });
        }
    };
    /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupService.prototype.remove = function (field) {
        // get the query for this group
        var /** @type {?} */ query$$1 = this.getQuery();
        // remove the field from the array
        query$$1.splice(query$$1.indexOf(field), 1);
    };
    /**
     * Get the query for this specific search group
     * @return {?}
     */
    SearchBuilderGroupService.prototype.getQuery = function () {
        return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
    };
    return SearchBuilderGroupService;
}());
SearchBuilderGroupService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
SearchBuilderGroupService.ctorParameters = function () { return [
    { type: SearchBuilderService, },
]; };
var SearchBuilderGroupComponent = (function () {
    /**
     * @param {?} searchBuilderGroupService
     * @param {?} _searchBuilderService
     */
    function SearchBuilderGroupComponent(searchBuilderGroupService, _searchBuilderService) {
        this.searchBuilderGroupService = searchBuilderGroupService;
        this._searchBuilderService = _searchBuilderService;
        this.operator = 'and';
        this.addText = 'Add a field';
        this.showPlaceholder = false;
        this.add = new core.EventEmitter();
        this.remove = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.ngOnInit = function () {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have a name attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    SearchBuilderGroupComponent.prototype.removeField = function (field) {
        this.searchBuilderGroupService.remove(field);
        this.remove.emit(field);
    };
    return SearchBuilderGroupComponent;
}());
SearchBuilderGroupComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-builder-group',
                template: "\n    <h4 class=\"search-group-title\">{{ header }}</h4>\n\n    <main class=\"search-group-content\">\n\n      <section class=\"search-group-operator search-group-operator-{{ operator }}\" [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</section>\n\n      <section class=\"search-group-items\">\n\n        <div class=\"search-group-item-container\" *ngFor=\"let field of searchBuilderGroupService.getQuery()\">\n\n          <div class=\"search-group-item\">\n            <ng-container *uxSearchBuilderOutlet=\"field.type; context: field\"></ng-container>\n          </div>\n\n          <div class=\"search-group-item-remove\" (click)=\"removeField(field)\">\n            <span class=\"hpe-icon hpe-close\"></span>\n          </div>\n        </div>\n\n        <!-- Placeholder Item -->\n        <ng-container *ngIf=\"showPlaceholder\">\n\n          <!-- The Default Placeholder -->\n          <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n        \n            <div class=\"search-group-item\">\n              <label class=\"form-label\">New field</label>\n              <div class=\"form-control\"></div>\n            </div>\n  \n          </div>\n\n          <!-- Allow a custom placeholder -->\n        <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n        </ng-container>\n\n      </section>\n\n      <section class=\"search-builder-group-add-field\" (click)=\"add.emit($event)\">\n\n        <button type=\"button\" class=\"btn btn-icon btn-circular button-accent\" aria-label=\"Add Field\">\n          <span class=\"hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n        </button>\n\n        <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n\n      </section>\n\n    </main>\n\n    <hr class=\"search-builder-group-divider\">\n  ",
                providers: [SearchBuilderGroupService]
            },] },
];
/**
 * @nocollapse
 */
SearchBuilderGroupComponent.ctorParameters = function () { return [
    { type: SearchBuilderGroupService, },
    { type: SearchBuilderService, },
]; };
SearchBuilderGroupComponent.propDecorators = {
    'id': [{ type: core.Input },],
    'header': [{ type: core.Input },],
    'operator': [{ type: core.Input },],
    'addText': [{ type: core.Input },],
    'placeholder': [{ type: core.Input },],
    'showPlaceholder': [{ type: core.Input },],
    'add': [{ type: core.Output },],
    'remove': [{ type: core.Output },],
};
var SearchBuilderOutletDirective = (function () {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _componentFactoryResolver
     * @param {?} _searchBuilderService
     */
    function SearchBuilderOutletDirective(_viewContainerRef, _componentFactoryResolver, _searchBuilderService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * @return {?}
     */
    SearchBuilderOutletDirective.prototype.ngOnInit = function () {
        // get the class from the type
        var /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.uxSearchBuilderOutlet);
        // create the component factory
        var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        var /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.uxSearchBuilderOutletContext.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.uxSearchBuilderOutletContext;
        this._componentRef.instance.config = config;
    };
    return SearchBuilderOutletDirective;
}());
SearchBuilderOutletDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxSearchBuilderOutlet]'
            },] },
];
/**
 * @nocollapse
 */
SearchBuilderOutletDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.ComponentFactoryResolver, },
    { type: SearchBuilderService, },
]; };
SearchBuilderOutletDirective.propDecorators = {
    'uxSearchBuilderOutlet': [{ type: core.Input },],
    'uxSearchBuilderOutletContext': [{ type: core.Input },],
};
var BaseSearchComponent = (function () {
    /**
     * @param {?} _searchBuilderService
     * @param {?} _searchBuilderGroupService
     */
    function BaseSearchComponent(_searchBuilderService, _searchBuilderGroupService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderGroupService = _searchBuilderGroupService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    Object.defineProperty(BaseSearchComponent.prototype, "value", {
        /**
         * Get the current value of the component
         * @return {?}
         */
        get: function () {
            return this.context.value;
        },
        /**
         * Set the current value of the component
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.context.value = value;
            this._searchBuilderService.queryHasChanged();
            // if value has been set perform validation
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSearchComponent.prototype, "valid", {
        /**
         * @return {?}
         */
        get: function () {
            return this._valid;
        },
        /**
         * @param {?} valid
         * @return {?}
         */
        set: function (valid) {
            this._valid = valid;
            this._searchBuilderService.setValid(this._id, valid);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    BaseSearchComponent.prototype.ngOnDestroy = function () {
        this.valid = true;
    };
    /**
     * Perform any required validation on the value
     * @return {?}
     */
    BaseSearchComponent.prototype.validate = function () {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    };
    return BaseSearchComponent;
}());
BaseSearchComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-base-search',
                template: ''
            },] },
];
/**
 * @nocollapse
 */
BaseSearchComponent.ctorParameters = function () { return [
    { type: SearchBuilderService, },
    { type: SearchBuilderGroupService, },
]; };
var SearchTextComponent = (function (_super) {
    __extends(SearchTextComponent, _super);
    function SearchTextComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.type = 'text';
        return _this;
    }
    Object.defineProperty(SearchTextComponent.prototype, "label", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchTextComponent.prototype, "placeholder", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.placeholder || 'Enter text';
        },
        enumerable: true,
        configurable: true
    });
    return SearchTextComponent;
}(BaseSearchComponent));
SearchTextComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-text',
                template: "\n    <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n    <input [placeholder]=\"placeholder\" [(ngModel)]=\"value\" class=\"form-control\">\n  "
            },] },
];
/**
 * @nocollapse
 */
SearchTextComponent.ctorParameters = function () { return []; };
var SearchDateComponent = (function (_super) {
    __extends(SearchDateComponent, _super);
    function SearchDateComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.type = 'date';
        return _this;
    }
    Object.defineProperty(SearchDateComponent.prototype, "label", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateComponent.prototype, "placeholder", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.placeholder || 'Enter date';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SearchDateComponent.prototype.ngOnInit = function () {
        // by default set to the current date if not specified
        if (!this.value) {
            this.value = new Date();
        }
    };
    return SearchDateComponent;
}(BaseSearchComponent));
SearchDateComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-date',
                template: "\n    <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n    <div class=\"input-group date m-nil\">\n        <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n            <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n        </span>\n        <input type=\"text\" #popover=\"bs-popover\" [ngModel]=\"value | date:'dd MMMM yyyy'\" [popover]=\"popoverTemplate\"\n            placement=\"bottom\" [outsideClick]=\"true\" containerClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"placeholder\">\n    </div>\n\n    <ng-template #popoverTemplate>\n        <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n    </ng-template>\n  "
            },] },
];
/**
 * @nocollapse
 */
SearchDateComponent.ctorParameters = function () { return []; };
var SearchDateRangeComponent = (function (_super) {
    __extends(SearchDateRangeComponent, _super);
    function SearchDateRangeComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.type = 'date-range';
        return _this;
    }
    Object.defineProperty(SearchDateRangeComponent.prototype, "label", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "from", {
        /**
         * @return {?}
         */
        get: function () {
            // if value does not exist the set it
            if (!this.value || !this.value.from) {
                this.from = new Date();
            }
            // ensure that the from value is a date object
            if (this.value.from instanceof Date === false) {
                this.value.from = new Date(this.value.from);
            }
            return this.value.from;
        },
        /**
         * @param {?} fromValue
         * @return {?}
         */
        set: function (fromValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the from value is a date
            if (fromValue instanceof Date === false) {
                fromValue = new Date(fromValue);
            }
            // set the latest value
            value.from = fromValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "to", {
        /**
         * @return {?}
         */
        get: function () {
            // if value does not exist the set it
            if (!this.value || !this.value.to) {
                this.to = new Date();
            }
            // ensure that the to value is a date object
            if (this.value.to instanceof Date === false) {
                this.value.to = new Date(this.value.to);
            }
            return this.value.to;
        },
        /**
         * @param {?} toValue
         * @return {?}
         */
        set: function (toValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the to value is a date
            if (toValue instanceof Date === false) {
                toValue = new Date(toValue);
            }
            // set the latest value
            value.to = toValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromLabel", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.fromLabel || 'From';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toLabel", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.toLabel || 'To';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromPlaceholder", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.fromPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toPlaceholder", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.toPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override the default validation
     * @return {?}
     */
    SearchDateRangeComponent.prototype.validate = function () {
        // check if there is a config validation function
        if (this.config.validation) {
            return _super.prototype.validate.call(this);
        }
        // create copies of the dates so we can modify time value (to ignore it)
        var /** @type {?} */ from$$1 = new Date(this.value.from);
        var /** @type {?} */ to = new Date(this.value.to);
        // set the time to the same so we dont compare it
        from$$1.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // valid if the from date is less than or equal to the to date
        this.valid = from$$1 <= to;
    };
    return SearchDateRangeComponent;
}(BaseSearchComponent));
SearchDateRangeComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-date-range',
                template: "\n      <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n      <div class=\"row\">\n          <div class=\"col-sm-12\">\n              <div class=\"form-inline\" [class.has-error]=\"!valid\">\n\n                  <div class=\"form-group p-r-md\">\n                      <label class=\"form-label m-r-xs\">{{ fromLabel }}</label>\n\n                      <div class=\"input-group date m-nil\">\n                          <span class=\"input-group-addon p-r-xs\" tabindex=\"1\" (click)=\"fromPopover.show()\">\n                              <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                          </span>\n                          <input type=\"text\" #fromPopover=\"bs-popover\" [ngModel]=\"from | date:'dd MMMM yyyy'\" [popover]=\"fromPopoverTemplate\" placement=\"bottom\"\n                              [outsideClick]=\"true\" containerClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"fromPlaceholder\">\n                      </div>\n                  </div>\n\n                  <div class=\"form-group p-r-xs\">\n                      <label class=\"form-label m-r-xs\">{{ toLabel }}</label>\n\n                      <div class=\"input-group date m-nil\">\n                          <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"toPopover.show()\">\n                              <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                          </span>\n                          <input type=\"text\" #toPopover=\"bs-popover\" [ngModel]=\"to | date:'dd MMMM yyyy'\" [popover]=\"toPopoverTemplate\" placement=\"bottom\"\n                              [outsideClick]=\"true\" containerClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"toPlaceholder\">\n                      </div>\n                  </div>\n\n              </div>\n          </div>\n      </div>\n\n      <ng-template #fromPopoverTemplate>\n          <ux-date-time-picker [(date)]=\"from\" [showTime]=\"false\"></ux-date-time-picker>\n      </ng-template>\n\n      <ng-template #toPopoverTemplate>\n          <ux-date-time-picker [(date)]=\"to\" [showTime]=\"false\"></ux-date-time-picker>\n      </ng-template>\n    "
            },] },
];
/**
 * @nocollapse
 */
SearchDateRangeComponent.ctorParameters = function () { return []; };
var SearchSelectComponent = (function (_super) {
    __extends(SearchSelectComponent, _super);
    function SearchSelectComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.type = 'select';
        return _this;
    }
    Object.defineProperty(SearchSelectComponent.prototype, "label", {
        /**
         * Provide defaults for undefined properties
         * @return {?}
         */
        get: function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "options", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.options || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "multiple", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.multiple || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "placeholder", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.placeholder || 'Select item';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "dropDirection", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.dropDirection || 'down';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "allowNull", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.allowNull || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.disabled || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "maxHeight", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.maxHeight || '250px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchSelectComponent.prototype, "pageSize", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.pageSize || 20;
        },
        enumerable: true,
        configurable: true
    });
    return SearchSelectComponent;
}(BaseSearchComponent));
SearchSelectComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-select',
                template: "\n    <label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n    <ux-select [(value)]=\"value\" \n               [options]=\"options\" \n               [multiple]=\"multiple\" \n               [placeholder]=\"placeholder\" \n               [dropDirection]=\"dropDirection\"\n               [pageSize]=\"pageSize\"\n               [allowNull]=\"allowNull\"\n               [disabled]=\"disabled\"\n               [maxHeight]=\"maxHeight\"\n               [key]=\"config.key\"\n               [display]=\"config.display\"\n               [loadingTemplate]=\"config.loadingTemplate\"\n               [optionTemplate]=\"config.optionTemplate\"\n               [noOptionsTemplate]=\"config.noOptionsTemplate\">\n    </ux-select>\n  "
            },] },
];
/**
 * @nocollapse
 */
SearchSelectComponent.ctorParameters = function () { return []; };
var SearchBuilderComponent = (function () {
    /**
     * Register the default search builder components
     * @param {?} _searchBuilderService
     */
    function SearchBuilderComponent(_searchBuilderService) {
        var _this = this;
        this._searchBuilderService = _searchBuilderService;
        this.queryChange = new core.EventEmitter();
        this.valid = new core.EventEmitter(true);
        // watch for any query changes
        this._querySubscription = _searchBuilderService.queryChange.subscribe(function (query$$1) { return _this.queryChange.emit(query$$1); });
        // watch for any changes to the validation
        this._validSubscription = _searchBuilderService.validationChange.distinctUntilChanged().subscribe(function (valid) { return _this.valid.emit(valid); });
    }
    Object.defineProperty(SearchBuilderComponent.prototype, "components", {
        /**
         * @param {?} components
         * @return {?}
         */
        set: function (components) {
            this._searchBuilderService.registerComponents(components);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBuilderComponent.prototype, "query", {
        /**
         * @return {?}
         */
        get: function () {
            return this._searchBuilderService.getQuery();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._searchBuilderService.setQuery(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    SearchBuilderComponent.prototype.ngOnDestroy = function () {
        this._querySubscription.unsubscribe();
        this._validSubscription.unsubscribe();
    };
    return SearchBuilderComponent;
}());
SearchBuilderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-search-builder',
                template: "\n    <ng-content></ng-content>\n  ",
                providers: [SearchBuilderService]
            },] },
];
/**
 * @nocollapse
 */
SearchBuilderComponent.ctorParameters = function () { return [
    { type: SearchBuilderService, },
]; };
SearchBuilderComponent.propDecorators = {
    'components': [{ type: core.Input },],
    'query': [{ type: core.Input },],
    'queryChange': [{ type: core.Output },],
    'valid': [{ type: core.Output },],
};
/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
var PopoverConfig = (function () {
    function PopoverConfig() {
        /**
         * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        this.outsideClick = false;
    }
    PopoverConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    PopoverConfig.ctorParameters = function () { return []; };
    return PopoverConfig;
}());
var PopoverContainerComponent = (function () {
    function PopoverContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(PopoverContainerComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    PopoverContainerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'popover-container',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    },
                    styles: [
                        "\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n    }\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n    }\n  "
                    ],
                    template: "<div class=\"popover-arrow arrow\"></div> <h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3> <div class=\"popover-content popover-body\"> <ng-content></ng-content> </div> "
                },] },
    ];
    /** @nocollapse */
    PopoverContainerComponent.ctorParameters = function () {
        return [
            { type: PopoverConfig, },
        ];
    };
    PopoverContainerComponent.propDecorators = {
        'placement': [{ type: core.Input },],
        'title': [{ type: core.Input },],
    };
    return PopoverContainerComponent;
}());
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var PopoverDirective = (function () {
    function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        /**
         * Close popover on outside click
         */
        this.outsideClick = false;
        /**
         * Css class for popover container
         */
        this.containerClass = '';
        this._isInited = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        // fix: no focus on button on Mac OS #1795
        if (typeof window !== 'undefined') {
            _elementRef.nativeElement.addEventListener('click', function () {
                try {
                    _elementRef.nativeElement.focus();
                }
                catch (err) {
                    return;
                }
            });
        }
    }
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the popover is currently being shown
         */
        get: function () {
            return this._popover.isShown;
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
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.show = function () {
        if (this._popover.isShown || !this.popover) {
            return;
        }
        this._popover
            .attach(PopoverContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.popover,
            context: this.popoverContext,
            placement: this.placement,
            title: this.popoverTitle,
            containerClass: this.containerClass
        });
        this.isOpen = true;
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.hide = function () {
        if (this.isOpen) {
            this._popover.hide();
            this.isOpen = false;
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.toggle = function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    PopoverDirective.prototype.ngOnInit = function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: function () { return _this.show(); }
        });
    };
    PopoverDirective.prototype.ngOnDestroy = function () {
        this._popover.dispose();
    };
    PopoverDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[popover]', exportAs: 'bs-popover' },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () {
        return [
            { type: core.ElementRef, },
            { type: core.Renderer2, },
            { type: core.ViewContainerRef, },
            { type: PopoverConfig, },
            { type: ComponentLoaderFactory, },
        ];
    };
    PopoverDirective.propDecorators = {
        'popover': [{ type: core.Input },],
        'popoverContext': [{ type: core.Input },],
        'popoverTitle': [{ type: core.Input },],
        'placement': [{ type: core.Input },],
        'outsideClick': [{ type: core.Input },],
        'triggers': [{ type: core.Input },],
        'container': [{ type: core.Input },],
        'containerClass': [{ type: core.Input },],
        'isOpen': [{ type: core.Input },],
        'onShown': [{ type: core.Output },],
        'onHidden': [{ type: core.Output },],
    };
    return PopoverDirective;
}());
var PopoverModule = (function () {
    function PopoverModule() {
    }
    PopoverModule.forRoot = function () {
        return {
            ngModule: PopoverModule,
            providers: [PopoverConfig, ComponentLoaderFactory, PositioningService]
        };
    };
    PopoverModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [PopoverDirective, PopoverContainerComponent],
                    exports: [PopoverDirective],
                    entryComponents: [PopoverContainerComponent]
                },] },
    ];
    /** @nocollapse */
    PopoverModule.ctorParameters = function () { return []; };
    return PopoverModule;
}());
var TypeaheadOptionEvent = (function () {
    /**
     * @param {?} option
     */
    function TypeaheadOptionEvent(option) {
        this.option = option;
    }
    return TypeaheadOptionEvent;
}());
var TypeaheadKeyService = (function () {
    function TypeaheadKeyService() {
    }
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
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
TypeaheadKeyService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
TypeaheadKeyService.ctorParameters = function () { return []; };
var TypeaheadComponent = (function () {
    /**
     * @param {?} typeaheadElement
     * @param {?} cdRef
     */
    function TypeaheadComponent(typeaheadElement, cdRef) {
        var _this = this;
        this.typeaheadElement = typeaheadElement;
        this.cdRef = cdRef;
        this._open = false;
        this.openChange = new core.EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.optionSelected = new core.EventEmitter();
        this._highlighted = new BehaviorSubject.BehaviorSubject(null);
        this.visibleOptions = [];
        this.loading = false;
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = function (pageNum, pageSize, filter$$1) {
            if (typeof _this.options === 'function') {
                return _this.options(pageNum, pageSize, filter$$1);
            }
            return null;
        };
    }
    Object.defineProperty(TypeaheadComponent.prototype, "open", {
        /**
         * @return {?}
         */
        get: function () {
            return this._open;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ originalValue = this._open;
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
        /**
         * @return {?}
         */
        get: function () {
            return this._highlighted.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TypeaheadComponent.prototype.ngAfterViewInit = function () {
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
        this.cdRef.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    TypeaheadComponent.prototype.optionMousedownHandler = function (event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.optionClickHandler = function (event, option) {
        this.select(option);
    };
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getKey = function (option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[(this.key)];
        }
        return this.getDisplay(option);
    };
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplay = function (option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[(this.display)];
        }
        return option;
    };
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.getDisplayHtml = function (option) {
        var /** @type {?} */ displayText;
        if (typeof option === 'string') {
            displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        else {
            displayText = this.getDisplay(option.name).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        var /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            var /** @type {?} */ length = this.filter.length;
            var /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = "<span class=\"ux-filter-match\">" + displayText.substr(matchIndex, length) + "</span>";
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    };
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    TypeaheadComponent.prototype.isInfiniteScroll = function () {
        return typeof this.options === 'function';
    };
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.select = function (option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option));
            this._highlighted.next(null);
            this.open = false;
        }
    };
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.isDisabled = function (option) {
        var _this = this;
        if (this.disabledOptions) {
            var /** @type {?} */ optionKey_1 = this.getKey(option);
            var /** @type {?} */ result = this.disabledOptions.find(function (selectedOption) {
                return _this.getKey(selectedOption) === optionKey_1;
            });
            return result !== undefined;
        }
        return false;
    };
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.highlight = function (option) {
        if (!this.isDisabled(option)) {
            this._highlighted.next(option);
        }
    };
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TypeaheadComponent.prototype.moveHighlight = function (d) {
        var /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        var /** @type {?} */ newIndex = highlightIndex;
        var /** @type {?} */ disabled = true;
        var /** @type {?} */ inBounds = true;
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
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.isHighlighted = function (option) {
        return this.getKey(option) === this.getKey(this.highlighted);
    };
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
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
     * @return {?}
     */
    TypeaheadComponent.prototype.updateOptions = function () {
        var _this = this;
        if (typeof this.options === 'object') {
            var /** @type {?} */ normalisedInput_1 = (this.filter || '').toLowerCase();
            this.visibleOptions = this.options.filter(function (option) {
                return _this.getDisplay(option).toLowerCase().indexOf(normalisedInput_1) >= 0;
            });
        }
        this.initOptions();
    };
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    TypeaheadComponent.prototype.indexOfVisibleOption = function (option) {
        var _this = this;
        if (option) {
            var /** @type {?} */ optionKey_2 = this.getKey(option);
            return this.visibleOptions.findIndex(function (el) {
                return _this.getKey(el) === optionKey_2;
            });
        }
        return -1;
    };
    return TypeaheadComponent;
}());
TypeaheadComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-typeahead',
                template: "\n      <div class=\"ux-typeahead-options\"\n          [uxInfiniteScroll]=\"loadOptionsCallback\"\n          [(collection)]=\"visibleOptions\"\n          [enabled]=\"isInfiniteScroll()\"\n          [filter]=\"filter\"\n          [loadOnScroll]=\"true\"\n          [pageSize]=\"pageSize\"\n          [scrollElement]=\"typeaheadElement\"\n          (loading)=\"loading = true\"\n          (loaded)=\"loading = false\">\n\n          <ol *ngIf=\"visibleOptions.length > 0\">\n              <li *ngFor=\"let option of visibleOptions; let i = index\"\n                  [class.disabled]=\"isDisabled(option)\"\n                  [class.highlighted]=\"isHighlighted(option)\"\n                  [uxScrollIntoViewIf]=\"isHighlighted(option)\"\n                  [scrollParent]=\"typeaheadElement.nativeElement\"\n                  (mousedown)=\"optionMousedownHandler($event)\"\n                  (click)=\"optionClickHandler($event, option)\"\n                  (mouseover)=\"highlight(option)\">\n\n                  <ng-container [ngTemplateOutlet]=\"optionTemplate\"\n                      [ngTemplateOutletContext]=\"{option: option, api: optionApi}\">\n                  </ng-container>\n\n              </li>\n          </ol>\n\n          <div *uxInfiniteScrollLoading>\n              <ng-container [ngTemplateOutlet]=\"loadingTemplate\">\n              </ng-container>\n          </div>\n\n      </div>\n      <div *ngIf=\"visibleOptions.length === 0 && !loading\">\n          <ng-container [ngTemplateOutlet]=\"noOptionsTemplate\">\n          </ng-container>\n      </div>\n\n      <ng-template #defaultLoadingTemplate>\n          <div class=\"ux-typeahead-loading\">\n              <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n              <div>Loading...</div>\n          </div>\n      </ng-template>\n\n      <ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n          <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n      </ng-template>\n\n      <ng-template #defaultNoOptionsTemplate>\n          <span class=\"ux-typeahead-no-options\">No results</span>\n      </ng-template>\n    ",
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
TypeaheadComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.ChangeDetectorRef, },
]; };
TypeaheadComponent.propDecorators = {
    'options': [{ type: core.Input },],
    'filter': [{ type: core.Input },],
    'open': [{ type: core.Input, args: ['open',] },],
    'openChange': [{ type: core.Output },],
    'display': [{ type: core.Input },],
    'key': [{ type: core.Input },],
    'disabledOptions': [{ type: core.Input },],
    'dropDirection': [{ type: core.Input },],
    'maxHeight': [{ type: core.Input },],
    'openOnFilterChange': [{ type: core.Input },],
    'pageSize': [{ type: core.Input },],
    'selectFirst': [{ type: core.Input },],
    'loadingTemplate': [{ type: core.Input },],
    'optionTemplate': [{ type: core.Input },],
    'noOptionsTemplate': [{ type: core.Input },],
    'optionSelected': [{ type: core.Output },],
    'highlighted': [{ type: core.Output },],
    '_defaultLoadingTemplate': [{ type: core.ViewChild, args: ['defaultLoadingTemplate',] },],
    '_defaultOptionTemplate': [{ type: core.ViewChild, args: ['defaultOptionTemplate',] },],
    '_defaultNoOptionsTemplate': [{ type: core.ViewChild, args: ['defaultNoOptionsTemplate',] },],
};
var InfiniteScrollLoadButtonDirective = (function () {
    /**
     * @param {?} _element
     * @param {?} _template
     * @param {?} _viewContainer
     * @param {?} _renderer
     */
    function InfiniteScrollLoadButtonDirective(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject.Subject();
        this.load = this._load.asObservable();
    }
    Object.defineProperty(InfiniteScrollLoadButtonDirective.prototype, "visible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._visible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._template);
                    // Template content follows the elementRef, which is a comment.
                    var /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
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
    /**
     * @param {?} event
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.onClick = function (event) {
        this._load.next(event);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.getNextElementSibling = function (element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    };
    return InfiniteScrollLoadButtonDirective;
}());
InfiniteScrollLoadButtonDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxInfiniteScrollLoadButton]'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollLoadButtonDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: core.Renderer2, },
]; };
InfiniteScrollLoadButtonDirective.propDecorators = {
    'visible': [{ type: core.Input, args: ['uxInfiniteScrollLoadButton',] },],
    'load': [{ type: core.Output },],
};
var InfiniteScrollLoadingDirective = (function () {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainer
     */
    function InfiniteScrollLoadingDirective(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    Object.defineProperty(InfiniteScrollLoadingDirective.prototype, "visible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._visible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
InfiniteScrollLoadingDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxInfiniteScrollLoading]'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollLoadingDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
InfiniteScrollLoadingDirective.propDecorators = {
    'visible': [{ type: core.Input, args: ['uxInfiniteScrollLoading',] },],
};
var InfiniteScrollDirective = (function () {
    /**
     * @param {?} _element
     */
    function InfiniteScrollDirective(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new core.EventEmitter();
        this.loadingEvent = new core.EventEmitter();
        this.loadedEvent = new core.EventEmitter();
        this.loadErrorEvent = new core.EventEmitter();
        this._nextPageNum = 0;
        this._updateRequests = new Subject.Subject();
        this._isLoading = new BehaviorSubject.BehaviorSubject(false);
        this._isExhausted = new BehaviorSubject.BehaviorSubject(false);
        this._loadButtonEnabled = new BehaviorSubject.BehaviorSubject(false);
        this._subscriptions = [];
        this._loadButtonSubscriptions = [];
        this._canLoadManually = this._isLoading.combineLatest(this._isExhausted, this._loadButtonEnabled, function (isLoading, isExhausted, loadButtonEnabled) {
            return !isLoading && !isExhausted && loadButtonEnabled;
        });
    }
    Object.defineProperty(InfiniteScrollDirective.prototype, "collection", {
        /**
         * @return {?}
         */
        get: function () {
            return this._collection;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.collectionChange.emit(value);
            this._collection = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = function () {
        if (!this.scrollElement) {
            this.scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        var /** @type {?} */ requests = this._updateRequests.partition(function (r) { return r.check; });
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
        this._loadButtonQuery.changes.subscribe(function (query$$1) {
            _this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnChanges = function (changes) {
        var /** @type {?} */ check = true;
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
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = function () {
        this.detachEventHandlers();
    };
    /**
     * Request an additional page of data.
     * @return {?}
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
     * @return {?}
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
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reset = function () {
        if (!this.enabled) {
            return;
        }
        // Reset the page counter.
        this._nextPageNum = 0;
        this._pages = [];
        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }
        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
        // Cancel any pending requests
        if (this._subscriptions) {
            this._subscriptions.forEach(function (request) { return request.unsubscribe(); });
        }
    };
    /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reload = function () {
        var _this = this;
        this._pages.forEach(function (page, i) { return _this.reloadPage(i); });
    };
    /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    InfiniteScrollDirective.prototype.reloadPage = function (pageNum) {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: pageNum,
            pageSize: this.pageSize,
            filter: this.filter,
            reload: true
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    InfiniteScrollDirective.prototype.onScroll = function (event) {
        this.check();
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.onDomChange = function () {
        this.check();
    };
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    InfiniteScrollDirective.prototype.attachEventHandlers = function () {
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = Observable.Observable.fromEvent(this.scrollElement.nativeElement, 'scroll').subscribe(this.onScroll.bind(this));
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
     * @return {?}
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
     * @return {?}
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
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.doRequest = function (request) {
        var _this = this;
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            var /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            var /** @type {?} */ observable_4 = Array.isArray(loadResult)
                ? of$1.of(loadResult)
                : from$1.from(loadResult);
            var /** @type {?} */ subscription_1 = observable_4.first().subscribe(function (items) {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === _this.filter && request.pageSize === _this.pageSize) {
                    if (items && items.length) {
                        _this.setPageItems(request.pageNumber, items);
                    }
                    // Emit the loaded event
                    _this.endLoading(request, items);
                }
            }, function (reason) {
                // Emit the loadError event
                _this.endLoadingWithError(request, reason);
            }, function () {
                // remove this request from the list
                _this._subscriptions = _this._subscriptions.filter(function (s) { return s !== subscription_1; });
            });
            // add the subscription to the list of requests
            this._subscriptions.push(subscription_1);
        }
    };
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
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
            var /** @type {?} */ element = (this.scrollElement.nativeElement);
            var /** @type {?} */ remainingScroll = element.scrollHeight -
                (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    };
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    InfiniteScrollDirective.prototype.beginLoading = function (request) {
        var /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    };
    /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    InfiniteScrollDirective.prototype.setPageItems = function (pageNum, items) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce(function (previous, current) { return previous.concat(current); }, []);
    };
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoading = function (request, data) {
        this._isLoading.next(false);
        var /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        if (!request.reload) {
            this._nextPageNum += 1;
        }
    };
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    InfiniteScrollDirective.prototype.endLoadingWithError = function (request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    };
    return InfiniteScrollDirective;
}());
InfiniteScrollDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxInfiniteScroll]',
                exportAs: 'uxInfiniteScroll'
            },] },
];
/**
 * @nocollapse
 */
InfiniteScrollDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
InfiniteScrollDirective.propDecorators = {
    'load': [{ type: core.Input, args: ['uxInfiniteScroll',] },],
    '_collection': [{ type: core.Input, args: ['collection',] },],
    'enabled': [{ type: core.Input },],
    'filter': [{ type: core.Input },],
    'loadOnInit': [{ type: core.Input },],
    'loadOnScroll': [{ type: core.Input },],
    'pageSize': [{ type: core.Input },],
    'scrollElement': [{ type: core.Input },],
    'collectionChange': [{ type: core.Output },],
    'loadingEvent': [{ type: core.Output, args: ['loading',] },],
    'loadedEvent': [{ type: core.Output, args: ['loaded',] },],
    'loadErrorEvent': [{ type: core.Output, args: ['loadError',] },],
    '_loadButtonQuery': [{ type: core.ContentChildren, args: [InfiniteScrollLoadButtonDirective,] },],
    '_loadingIndicatorQuery': [{ type: core.ContentChildren, args: [InfiniteScrollLoadingDirective,] },],
};
/**
 * Event raised before the `loading` function is called.
 */
var InfiniteScrollLoadingEvent = (function () {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     */
    function InfiniteScrollLoadingEvent(pageNumber, pageSize, filter$$1) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.preventDefault = function () {
        this._defaultPrevented = true;
    };
    /**
     * @return {?}
     */
    InfiniteScrollLoadingEvent.prototype.defaultPrevented = function () {
        return this._defaultPrevented;
    };
    return InfiniteScrollLoadingEvent;
}());
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
var InfiniteScrollLoadedEvent = (function () {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} data
     * @param {?} exhausted
     */
    function InfiniteScrollLoadedEvent(pageNumber, pageSize, filter$$1, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.data = data;
        this.exhausted = exhausted;
    }
    return InfiniteScrollLoadedEvent;
}());
/**
 * Event raised if the loading function returns a rejected promise.
 */
var InfiniteScrollLoadErrorEvent = (function () {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} error
     */
    function InfiniteScrollLoadErrorEvent(pageNumber, pageSize, filter$$1, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.error = error;
    }
    return InfiniteScrollLoadErrorEvent;
}());
var InfiniteScrollModule = (function () {
    function InfiniteScrollModule() {
    }
    return InfiniteScrollModule;
}());
InfiniteScrollModule.decorators = [
    { type: core.NgModule, args: [{
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
InfiniteScrollModule.ctorParameters = function () { return []; };
var ScrollIntoViewService = (function () {
    function ScrollIntoViewService() {
    }
    /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    ScrollIntoViewService.prototype.scrollIntoView = function (elem, scrollParent) {
        var /** @type {?} */ offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            var /** @type {?} */ offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    };
    return ScrollIntoViewService;
}());
ScrollIntoViewService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ScrollIntoViewService.ctorParameters = function () { return []; };
var ScrollIntoViewIfDirective = (function () {
    /**
     * @param {?} element
     * @param {?} scrollIntoViewService
     */
    function ScrollIntoViewIfDirective(element, scrollIntoViewService) {
        this.element = element;
        this.scrollIntoViewService = scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
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
ScrollIntoViewIfDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[uxScrollIntoViewIf]' },] },
];
/**
 * @nocollapse
 */
ScrollIntoViewIfDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ScrollIntoViewService, },
]; };
ScrollIntoViewIfDirective.propDecorators = {
    'condition': [{ type: core.Input, args: ['uxScrollIntoViewIf',] },],
    'scrollParent': [{ type: core.Input },],
};
var ScrollIntoViewIfModule = (function () {
    function ScrollIntoViewIfModule() {
    }
    return ScrollIntoViewIfModule;
}());
ScrollIntoViewIfModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [],
                exports: [ScrollIntoViewIfDirective],
                declarations: [ScrollIntoViewIfDirective],
                providers: [ScrollIntoViewService],
            },] },
];
/**
 * @nocollapse
 */
ScrollIntoViewIfModule.ctorParameters = function () { return []; };
var TypeaheadModule$1 = (function () {
    function TypeaheadModule$1() {
    }
    return TypeaheadModule$1;
}());
TypeaheadModule$1.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
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
TypeaheadModule$1.ctorParameters = function () { return []; };
var SELECT_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return SelectComponent; }),
    multi: true
};
var SelectComponent = (function () {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    function SelectComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.valueChange = new core.EventEmitter();
        this._input = new BehaviorSubject.BehaviorSubject('');
        this.inputChange = new core.EventEmitter();
        this._dropdownOpen = false;
        this.dropdownOpenChange = new core.EventEmitter();
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._value = value;
            this.valueChange.emit(value);
            this.propagateChange(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "input", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input.getValue();
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._input.next(value);
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "dropdownOpen", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dropdownOpen;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dropdownOpen = value;
            this.dropdownOpenChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
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
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.value) {
            if (!this.multiple && changes.value.currentValue !== null) {
                this.input = this.getDisplay(changes.value.currentValue);
            }
        }
        if (changes.multiple && !changes.multiple.firstChange && changes.multiple.currentValue !== changes.multiple.previousValue) {
            this.input = '';
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    SelectComponent.prototype.writeValue = function (obj) {
        if (obj !== undefined) {
            this._value = obj;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = function (fn) { };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.inputClickHandler = function (event) {
        this.selectInputText();
        this.dropdownOpen = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
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
     * @param {?} event
     * @return {?}
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
    /**
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.singleOptionSelected = function (event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    };
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    SelectComponent.prototype.getDisplay = function (option) {
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
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.selectInputText = function () {
        this.singleInput.nativeElement.select();
    };
    return SelectComponent;
}());
SelectComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-select',
                template: "\n      <ux-tag-input *ngIf=\"multiple\"\n          [(tags)]=\"value\"\n          [(input)]=\"input\"\n          [addOnPaste]=\"false\"\n          [disabled]=\"disabled\"\n          [display]=\"display\"\n          [freeInput]=\"false\"\n          [placeholder]=\"placeholder\"\n          [showTypeaheadOnClick]=\"true\">\n\n          <ux-typeahead #multipleTypeahead\n              [options]=\"options\"\n              [filter]=\"filter | async\"\n              [(open)]=\"dropdownOpen\"\n              [display]=\"display\"\n              [key]=\"key\"\n              [disabledOptions]=\"value\"\n              [dropDirection]=\"dropDirection\"\n              [maxHeight]=\"maxHeight\"\n              [pageSize]=\"pageSize\"\n              [selectFirst]=\"true\"\n              [loadingTemplate]=\"loadingTemplate\"\n              [optionTemplate]=\"optionTemplate\"\n              [noOptionsTemplate]=\"noOptionsTemplate\">\n          </ux-typeahead>\n\n      </ux-tag-input>\n\n      <div *ngIf=\"!multiple\" class=\"inner-addon right-addon\" [class.disabled]=\"disabled\">\n\n          <i class=\"hpe-icon\"\n              [class.hpe-down]=\"dropDirection === 'down'\"\n              [class.hpe-up]=\"dropDirection === 'up'\"></i>\n\n          <input #singleInput type=\"text\" class=\"form-control\"\n              [(ngModel)]=\"input\"\n              [placeholder]=\"placeholder\"\n              [disabled]=\"disabled\"\n              (click)=\"inputClickHandler($event)\"\n              (blur)=\"inputBlurHandler($event)\"\n              (keydown)=\"inputKeyHandler($event)\">\n\n          <ux-typeahead #singleTypeahead\n              [options]=\"options\"\n              [filter]=\"filter | async\"\n              [(open)]=\"dropdownOpen\"\n              [display]=\"display\"\n              [key]=\"key\"\n              [dropDirection]=\"dropDirection\"\n              [maxHeight]=\"maxHeight\"\n              [openOnFilterChange]=\"false\"\n              [pageSize]=\"pageSize\"\n              [selectFirst]=\"true\"\n              [loadingTemplate]=\"loadingTemplate\"\n              [optionTemplate]=\"optionTemplate\"\n              [noOptionsTemplate]=\"noOptionsTemplate\"\n              (optionSelected)=\"singleOptionSelected($event)\" >\n          </ux-typeahead>\n\n      </div>\n    ",
                providers: [SELECT_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
SelectComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: Document, decorators: [{ type: core.Inject, args: [platformBrowser.DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
]; };
SelectComponent.propDecorators = {
    'value': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'input': [{ type: core.Input },],
    'inputChange': [{ type: core.Output },],
    'dropdownOpen': [{ type: core.Input },],
    'dropdownOpenChange': [{ type: core.Output },],
    'options': [{ type: core.Input },],
    'display': [{ type: core.Input },],
    'key': [{ type: core.Input },],
    'allowNull': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'dropDirection': [{ type: core.Input },],
    'maxHeight': [{ type: core.Input },],
    'multiple': [{ type: core.Input },],
    'pageSize': [{ type: core.Input },],
    'placeholder': [{ type: core.Input },],
    'loadingTemplate': [{ type: core.Input },],
    'noOptionsTemplate': [{ type: core.Input },],
    'optionTemplate': [{ type: core.Input },],
    'singleInput': [{ type: core.ViewChild, args: ['singleInput',] },],
    'multipleTypeahead': [{ type: core.ViewChild, args: ['multipleTypeahead',] },],
    'singleTypeahead': [{ type: core.ViewChild, args: ['singleTypeahead',] },],
};
var TagInputEvent = (function () {
    /**
     * @param {?} tag
     */
    function TagInputEvent(tag) {
        this.tag = tag;
        this._defaultPrevented = false;
    }
    /**
     * @return {?}
     */
    TagInputEvent.prototype.preventDefault = function () {
        this._defaultPrevented = true;
    };
    /**
     * @return {?}
     */
    TagInputEvent.prototype.defaultPrevented = function () {
        return this._defaultPrevented;
    };
    return TagInputEvent;
}());
var TAGINPUT_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TAGINPUT_VALIDATOR = {
    provide: forms.NG_VALIDATORS,
    useExisting: core.forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = (function () {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    function TagInputComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this._tags = [];
        this.tagsChange = new core.EventEmitter();
        this._input = '';
        this.inputChange = new core.EventEmitter();
        this.addOnPaste = true;
        this.disabled = false;
        this.enforceTagLimits = false;
        this.freeInput = true;
        this.maxTags = Number.MAX_VALUE;
        this.minTags = 0;
        this.placeholder = '';
        this.showTypeaheadOnClick = false;
        this.tagDelimiters = '';
        this.tagClass = function () { return undefined; };
        this.validationErrors = {};
        this.tagAdding = new core.EventEmitter();
        this.tagAdded = new core.EventEmitter();
        this.tagInvalidated = new core.EventEmitter();
        this.tagRemoving = new core.EventEmitter();
        this.tagRemoved = new core.EventEmitter();
        this.tagClick = new core.EventEmitter();
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
        /**
         * @return {?}
         */
        get: function () {
            if (!this._tags) {
                this._tags = [];
            }
            return this._tags;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._tags = value;
            this.onChangeHandler(this._tags);
            this.tagsChange.emit(this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "input", {
        /**
         * @return {?}
         */
        get: function () {
            return this._input;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._input = value;
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngOnInit = function () {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe(function (query$$1) {
            _this.connectTypeahead(query$$1.first);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
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
    /**
     * @param {?} value
     * @return {?}
     */
    TagInputComponent.prototype.writeValue = function (value) {
        if (value) {
            this.tags = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeHandler = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedHandler = fn;
    };
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    TagInputComponent.prototype.validate = function () {
        this.valid = true;
        var /** @type {?} */ tagRangeError = null;
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
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.keyHandler = function (event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        var /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        var /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        var /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        var /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        var /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        var /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
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
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.tagClickHandler = function (event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        var /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputClickHandler = function () {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputFocusHandler = function () {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.inputPasteHandler = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            var /** @type {?} */ input = null;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.typeaheadOptionSelectedHandler = function (event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    };
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    TagInputComponent.prototype.commitInput = function () {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.commitTypeahead = function (tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.commit = function (input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            var /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            var /** @type {?} */ allValid = true;
            for (var _c = 0, newTags_1 = newTags; _c < newTags_1.length; _c++) {
                var newTag = newTags_1[_c];
                var /** @type {?} */ valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }
            // Add the tags if all are valid
            if (allValid) {
                for (var _d = 0, newTags_2 = newTags; _d < newTags_2.length; _d++) {
                    var newTag = newTags_2[_d];
                    this.addTag(this.createTag(newTag));
                }
                return true;
            }
        }
        return false;
    };
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
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
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
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
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.getTagDisplay = function (tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[(this.display)];
        }
        return tag;
    };
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isSelected = function (index) {
        return index === this.selectedIndex;
    };
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
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
     * @return {?}
     */
    TagInputComponent.prototype.selectInput = function () {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    };
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.removeTagAt = function (tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            var /** @type {?} */ tag = this.tags[tagIndex];
            var /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
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
    };
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.canRemoveTagAt = function (tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    TagInputComponent.prototype.isInputVisible = function () {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    TagInputComponent.prototype.hasFocus = function () {
        return this.isValidSelectIndex(this.selectedIndex);
    };
    /**
     * @param {?} typeahead
     * @return {?}
     */
    TagInputComponent.prototype.connectTypeahead = function (typeahead) {
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
        }
    };
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.validateTag = function (tagValue) {
        var /** @type {?} */ inputPattern = null;
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
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.createTag = function (tagValue) {
        var /** @type {?} */ tag = null;
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
    };
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.addTag = function (tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            var /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                var /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
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
    };
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.isValidTagIndex = function (tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    };
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isValidSelectIndex = function (index) {
        return index >= 0 && index <= this.tags.length;
    };
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
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
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.splitTagInput = function (input) {
        var /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            var /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var /** @type {?} */ delimiterRegex = new RegExp("[" + escapedDelimiters + "]", 'g');
            tagValues = input.split(delimiterRegex).filter(function (s) { return s.length > 0; });
        }
        return tagValues;
    };
    return TagInputComponent;
}());
TagInputComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-tag-input',
                template: "\n      <ol>\n          <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n              [class.disabled]=\"disabled\"\n              [ngClass]=\"tagClass(tag, i, isSelected(i))\"\n              [attr.tabindex]=\"disabled ? null : i\"\n              [focusIf]=\"isSelected(i)\"\n              (click)=\"tagClickHandler($event, tag, i)\"\n              (focus)=\"selectTagAt(i)\">\n        \n              <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n                  [ngTemplateOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n              </ng-container>\n\n          </li>\n          <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\">\n              <input #tagInput type=\"text\" class=\"ux-tag-input\"\n                  [(ngModel)]=\"input\"\n                  [class.invalid]=\"!inputValid\"\n                  [placeholder]=\"disabled ? '' : (placeholder || '')\"\n                  [disabled]=\"disabled\"\n                  [focusIf]=\"isSelected(tags.length)\"\n                  (click)=\"inputClickHandler()\"\n                  (focus)=\"inputFocusHandler()\"\n                  (paste)=\"inputPasteHandler($event)\">\n          </li>\n      </ol>\n\n      <ng-content #typeahead></ng-content>\n\n      <ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n          <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n          <button *ngIf=\"api.canRemoveTagAt(index)\" type=\"button\" class=\"ux-tag-remove\" [disabled]=\"disabled\" (click)=\"api.removeTagAt(index); $event.stopPropagation();\"><i class=\"hpe-icon hpe-close\"></i></button>\n      </ng-template>\n    ",
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
TagInputComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: Document, decorators: [{ type: core.Inject, args: [platformBrowser.DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
]; };
TagInputComponent.propDecorators = {
    'tags': [{ type: core.Input, args: ['tags',] },],
    'tagsChange': [{ type: core.Output },],
    'input': [{ type: core.Input, args: ['input',] },],
    'inputChange': [{ type: core.Output },],
    'display': [{ type: core.Input },],
    'addOnPaste': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'enforceTagLimits': [{ type: core.Input },],
    'freeInput': [{ type: core.Input },],
    'maxTags': [{ type: core.Input },],
    'minTags': [{ type: core.Input },],
    'placeholder': [{ type: core.Input },],
    'showTypeaheadOnClick': [{ type: core.Input },],
    'tagDelimiters': [{ type: core.Input },],
    'tagPattern': [{ type: core.Input },],
    'tagTemplate': [{ type: core.Input },],
    'tagClass': [{ type: core.Input },],
    'validationErrors': [{ type: core.Input },],
    'createTagHandler': [{ type: core.Input, args: ['createTag',] },],
    'tagAdding': [{ type: core.Output },],
    'tagAdded': [{ type: core.Output },],
    'tagInvalidated': [{ type: core.Output },],
    'tagRemoving': [{ type: core.Output },],
    'tagRemoved': [{ type: core.Output },],
    'tagClick': [{ type: core.Output },],
    'typeaheadQuery': [{ type: core.ContentChildren, args: [TypeaheadComponent,] },],
    'tagInput': [{ type: core.ViewChild, args: ['tagInput',] },],
    '_defaultTagTemplate': [{ type: core.ViewChild, args: ['defaultTagTemplate',] },],
    'keyHandler': [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
    'focusOutHandler': [{ type: core.HostListener, args: ['focusout', ['$event'],] },],
};
var FocusIfDirective = (function () {
    /**
     * @param {?} _elementRef
     */
    function FocusIfDirective(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(FocusIfDirective.prototype, "focusIf", {
        /**
         * @param {?} focus
         * @return {?}
         */
        set: function (focus) {
            if (focus) {
                this._elementRef.nativeElement.focus();
            }
        },
        enumerable: true,
        configurable: true
    });
    return FocusIfDirective;
}());
FocusIfDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[focusIf]'
            },] },
];
/**
 * @nocollapse
 */
FocusIfDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
FocusIfDirective.propDecorators = {
    'focusIf': [{ type: core.Input },],
};
var FocusIfModule = (function () {
    function FocusIfModule() {
    }
    return FocusIfModule;
}());
FocusIfModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [FocusIfDirective],
                declarations: [FocusIfDirective]
            },] },
];
/**
 * @nocollapse
 */
FocusIfModule.ctorParameters = function () { return []; };
var TagInputModule = (function () {
    function TagInputModule() {
    }
    return TagInputModule;
}());
TagInputModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
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
TagInputModule.ctorParameters = function () { return []; };
var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
SelectModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
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
SelectModule.ctorParameters = function () { return []; };
var SearchBuilderModule = (function () {
    function SearchBuilderModule() {
    }
    return SearchBuilderModule;
}());
SearchBuilderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    DateTimePickerModule,
                    PopoverModule.forRoot(),
                    SelectModule
                ],
                exports: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    BaseSearchComponent
                ],
                declarations: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchBuilderOutletDirective,
                    SearchSelectComponent,
                    BaseSearchComponent
                ],
                entryComponents: [
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchSelectComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
SearchBuilderModule.ctorParameters = function () { return []; };
var SliderComponent = (function () {
    /**
     * @param {?} colorService
     * @param {?} _changeDetectorRef
     */
    function SliderComponent(colorService, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.value = 0;
        this.valueChange = new core.EventEmitter();
        // expose enums to Angular view
        this.sliderType = SliderType;
        this.sliderStyle = SliderStyle;
        this.sliderSize = SliderSize;
        this.sliderThumb = SliderThumb;
        this.sliderTickType = SliderTickType;
        this.sliderThumbEvent = SliderThumbEvent;
        this.sliderCalloutTrigger = SliderCalloutTrigger;
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
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngOnInit = function () {
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
        // emit the initial value
        this.valueChange.next(this.clone(this.value));
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngDoCheck = function () {
        if (this.detectValueChange(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(function () {
            _this.updateTooltipPosition(SliderThumb.Lower);
            _this.updateTooltipPosition(SliderThumb.Upper);
            // mark as dirty
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getFormattedValue = function (thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getThumbState = function (thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    };
    /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
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
    /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.thumbEvent = function (thumb, event) {
        // get the current thumb state
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        // update based upon event
        switch (event) {
            case SliderThumbEvent.DragStart:
                state$$1.drag = true;
                break;
            case SliderThumbEvent.DragEnd:
                state$$1.drag = false;
                break;
            case SliderThumbEvent.MouseOver:
                state$$1.hover = true;
                break;
            case SliderThumbEvent.MouseLeave:
                state$$1.hover = false;
                break;
            case SliderThumbEvent.None:
                state$$1.drag = false;
                state$$1.hover = false;
                break;
        }
        // update the thumb state
        this.setThumbState(thumb, state$$1.hover, state$$1.drag);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltips = function (thumb) {
        var /** @type {?} */ visible = false;
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        switch (this.options.handles.callout.trigger) {
            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;
            case SliderCalloutTrigger.Drag:
                visible = state$$1.drag;
                break;
            case SliderCalloutTrigger.Hover:
                visible = state$$1.hover || state$$1.drag;
                break;
            case SliderCalloutTrigger.Dynamic:
                visible = true;
                break;
        }
        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;
        // update the tooltip text
        this.updateTooltipText(thumb);
        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipText = function (thumb) {
        // get the thumb value
        var /** @type {?} */ state$$1 = this.getThumbState(thumb);
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltipElement = function (thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltip = function (thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipPosition = function (thumb) {
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        var /** @type {?} */ tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        var /** @type {?} */ thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        var /** @type {?} */ tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        var /** @type {?} */ tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
        if (this.options.type === SliderType.Range && this.options.handles.callout.trigger === SliderCalloutTrigger.Dynamic) {
            this.preventTooltipOverlap(tooltip);
        }
    };
    /**
     * @param {?} tooltip
     * @return {?}
     */
    SliderComponent.prototype.preventTooltipOverlap = function (tooltip) {
        var /** @type {?} */ trackWidth = this.track.nativeElement.offsetWidth;
        var /** @type {?} */ lower = (trackWidth / 100) * this.thumbs.lower.position;
        var /** @type {?} */ upper = (trackWidth / 100) * this.thumbs.upper.position;
        var /** @type {?} */ lowerWidth = this.lowerTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ upperWidth = this.upperTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ diff = (lower + lowerWidth) - (upper - upperWidth);
        // if the tooltips are closer than 16px then adjust so the dont move any close
        if (diff > 0) {
            if (tooltip === this.tooltips.lower && this.thumbs.lower.drag === false) {
                tooltip.position -= (diff / 2);
            }
            else if (tooltip === this.tooltips.upper && this.thumbs.upper.drag === false) {
                tooltip.position += (diff / 2);
            }
        }
    };
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    SliderComponent.prototype.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateThumbPosition = function (event, thumb) {
        // get event position - either mouse or touch
        var /** @type {?} */ eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        var /** @type {?} */ mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        var /** @type {?} */ trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        var /** @type {?} */ position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        var /** @type {?} */ fraction = (position / trackBounds.width);
        // convert to value within the range
        var /** @type {?} */ value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
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
        // update the position of all visible tooltips
        this.updateTooltipPosition(SliderThumb.Lower);
        this.updateTooltipPosition(SliderThumb.Upper);
        // mark as dirty for change detection
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateOrder = function (thumb) {
        var /** @type {?} */ lower = thumb === SliderThumb.Lower ? 101 : 100;
        var /** @type {?} */ upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    };
    /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.snapToTick = function (value, thumb) {
        // get the snap target
        var /** @type {?} */ snapTarget = this.options.track.ticks.snap;
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return value;
        }
        // get filtered ticks
        var /** @type {?} */ ticks;
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
        var /** @type {?} */ lowerLimit = this.options.track.min;
        var /** @type {?} */ upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        var /** @type {?} */ range = ticks.filter(function (tick) { return tick.value >= lowerLimit && tick.value <= upperLimit; });
        // If there are no close ticks in the valid range then dont snap
        if (range.length === 0) {
            return value;
        }
        // Find the closest tick
        var /** @type {?} */ closest = range.reduceRight(function (previous, current) {
            var /** @type {?} */ previousDistance = Math.max(previous.value, value) - Math.min(previous.value, value);
            var /** @type {?} */ currentDistance = Math.max(current.value, value) - Math.min(current.value, value);
            return previousDistance < currentDistance ? previous : current;
        });
        return closest.value;
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.validateValue = function (thumb, value) {
        // if slider is not a range value is always valid providing it is within the chart min and max values
        if (this.options.type === SliderType.Value) {
            return Math.max(Math.min(value, this.options.track.max), this.options.track.min);
        }
        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return thumb === SliderThumb.Lower ? Math.min(this.options.track.max, this.thumbs.upper.value) : this.options.track.max;
        }
        if (value < this.options.track.min) {
            return thumb === SliderThumb.Upper ? Math.max(this.options.track.min, this.thumbs.lower.value) : this.options.track.min;
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
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateOptions = function () {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateValues = function () {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        var /** @type {?} */ lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        var /** @type {?} */ upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, Number(lowerValue.toFixed(4)));
        upperValue = this.validateValue(SliderThumb.Upper, Number(upperValue.toFixed(4)));
        // calculate the positions as percentages
        var /** @type {?} */ lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        var /** @type {?} */ upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
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
    /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    SliderComponent.prototype.setValue = function (low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        var /** @type {?} */ previousValue = this.clone(this._value);
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.detectValueChange(this.value, previousValue)) {
            this.valueChange.emit(this.clone(this.value));
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
        else {
            this.valueChange.emit(this.clone(this.value));
        }
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.setThumbValue = function (thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTicks = function () {
        // get tick options
        var /** @type {?} */ majorOptions = this.options.track.ticks.major;
        var /** @type {?} */ minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor - only get the ones to be shown
        var /** @type {?} */ majorTicks = this.getTicks(majorOptions, SliderTickType.Major).filter(function (tick) { return tick.showTicks; });
        var /** @type {?} */ minorTicks = this.getTicks(minorOptions, SliderTickType.Minor).filter(function (tick) { return tick.showTicks; });
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTrackColors = function () {
        // get colors for each part of the track
        var /** @type {?} */ lower = this.options.track.colors.lower;
        var /** @type {?} */ range = this.options.track.colors.range;
        var /** @type {?} */ higher = this.options.track.colors.higher;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : "linear-gradient(to right, " + lower.join(', ') + ")";
        this.tracks.middle.color = typeof range === 'string' ? range : "linear-gradient(to right, " + range.join(', ') + ")";
        this.tracks.upper.color = typeof higher === 'string' ? higher : "linear-gradient(to right, " + higher.join(', ') + ")";
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    SliderComponent.prototype.getSteps = function (steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        var /** @type {?} */ output = [];
        // otherwise calculate the steps
        for (var /** @type {?} */ idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    };
    /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    SliderComponent.prototype.getTicks = function (options, type) {
        // create an array to store the ticks and step points
        var /** @type {?} */ steps = this.getSteps(options.steps);
        // get some chart options
        var /** @type {?} */ min = this.options.track.min;
        var /** @type {?} */ max = this.options.track.max;
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
    /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    SliderComponent.prototype.unionTicks = function (majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter(function (tick, index, array) { return tick.type === SliderTickType.Major || !array.find(function (tk) { return tk.type === SliderTickType.Major && tk.position === tick.position; }); })
            .sort(function (t1, t2) { return t1.value - t2.value; });
    };
    /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    SliderComponent.prototype.deepMerge = function (destination, source) {
        // loop though all of the properties in the source object
        for (var /** @type {?} */ prop in source) {
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
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    SliderComponent.prototype.detectValueChange = function (value1, value2) {
        // compare two slider values
        if (this.isSliderValue(value1) && this.isSliderValue(value2)) {
            // references to the objects in the correct types
            var /** @type {?} */ obj1 = (value1);
            var /** @type {?} */ obj2 = (value2);
            return obj1.low !== obj2.low || obj1.high !== obj2.high;
        }
        // if not a slider value - should be number of nullable type - compare normally
        return value1 !== value2;
    };
    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    SliderComponent.prototype.isSliderValue = function (value) {
        // check if is an object
        if (typeof value !== 'object') {
            return false;
        }
        // next check if it contains the necessary properties
        return 'low' in value && 'high' in value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.clone = function (value) {
        // if it is not an object simply return the value
        if (typeof value !== 'object') {
            return value;
        }
        // create a new object from the existing one
        var /** @type {?} */ instance = Object.assign({}, value);
        // delete remove the value from the old object
        value = undefined;
        // return the new instance of the object
        return instance;
    };
    return SliderComponent;
}());
SliderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-slider',
                template: "\n      <div class=\"track\" #track [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\" [class.range]=\"options.type === sliderType.Range\">\n\n          <!-- Section Beneath Lower Thumb -->\n          <div class=\"track-section track-lower\" [style.flex-grow]=\"tracks.lower.size\" [style.background]=\"tracks.lower.color\"></div>\n\n          <!-- Lower Thumb Button / Line -->\n          <div class=\"thumb lower\" uxDrag\n              [style.left.%]=\"thumbs.lower.position\" \n              [class.active]=\"thumbs.lower.drag\" \n              [style.z-index]=\"thumbs.lower.order\" \n              [class.button]=\"options.handles.style === sliderStyle.Button\"\n              [class.line]=\"options.handles.style === sliderStyle.Line\" \n              [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n              [class.wide]=\"options.track.height === sliderSize.Wide\" \n              (dragstart)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart)\"\n              (drag)=\"updateThumbPosition($event, sliderThumb.Lower)\"\n              (dragend)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragEnd)\"\n              (mouseenter)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n              (mouseleave)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\">\n\n              <!-- Lower Thumb Callout -->\n              <div class=\"tooltip top tooltip-lower\" #lowerTooltip \n                  [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.lower.drag === false\"\n                  [style.opacity]=\"tooltips.lower.visible ? 1 : 0\" \n                  [style.left.px]=\"tooltips.lower.position\">\n\n                  <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n                  <div class=\"tooltip-inner\" \n                      [style.background-color]=\"options.handles.callout.background\" \n                      [style.color]=\"options.handles.callout.color\">\n                      {{ tooltips.lower.label }}\n                  </div>\n              </div>\n\n          </div>\n\n          <!-- Section of Track Between Lower and Upper Thumbs -->\n          <div class=\"track-section track-range\" *ngIf=\"options.type === sliderType.Range\" [style.flex-grow]=\"tracks.middle.size\" [style.background]=\"tracks.middle.color\">\n          </div>\n\n          <!-- Upper Thumb Button / Line -->\n          <div class=\"thumb upper\" uxDrag\n              [hidden]=\"options.type !== sliderType.Range\" \n              [class.active]=\"thumbs.upper.drag\" \n              [style.left.%]=\"thumbs.upper.position\" \n              [style.z-index]=\"thumbs.upper.order\"\n              [class.button]=\"options.handles.style === sliderStyle.Button\" \n              [class.line]=\"options.handles.style === sliderStyle.Line\"\n              [class.narrow]=\"options.track.height === sliderSize.Narrow\" \n              [class.wide]=\"options.track.height === sliderSize.Wide\" \n              (dragstart)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart)\"\n              (drag)=\"updateThumbPosition($event, sliderThumb.Upper)\"\n              (dragend)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragEnd)\"\n              (mouseenter)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n              (mouseleave)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\">\n\n              <!-- Upper Thumb Callout -->\n              <div class=\"tooltip top tooltip-upper\" #upperTooltip \n                  [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.upper.drag === false\"\n                  [style.opacity]=\"tooltips.upper.visible ? 1 : 0\" \n                  [style.left.px]=\"tooltips.upper.position\">\n\n                  <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n                  <div class=\"tooltip-inner\" \n                      *ngIf=\"options.type === sliderType.Range\" \n                      [style.background-color]=\"options.handles.callout.background\"\n                      [style.color]=\"options.handles.callout.color\">\n                      {{ tooltips.upper.label }}\n                  </div>\n              </div>\n          </div>\n\n          <!-- Section of Track Abover Upper Thumb -->\n          <div class=\"track-section track-higher\" [style.flex-grow]=\"tracks.upper.size\" [style.background]=\"tracks.upper.color\"></div>\n\n      </div>\n\n      <!-- Chart Ticks and Tick Labels -->\n      <div class=\"tick-container\" \n          *ngIf=\"(options.track.ticks.major.show || options.track.ticks.minor.show) && options.handles.callout.trigger !== sliderCalloutTrigger.Dynamic\" \n          [class.show-labels]=\"options.track.ticks.major.labels || options.track.ticks.minor.labels\">\n\n          <div class=\"tick\" *ngFor=\"let tick of ticks\" [class.major]=\"tick.type === sliderTickType.Major\" [class.minor]=\"tick.type === sliderTickType.Minor\"\n              [style.left.%]=\"tick.position\" [hidden]=\"!tick.showTicks\">\n              <div class=\"tick-indicator\"></div>\n              <div class=\"tick-label\" [hidden]=\"!tick.showLabels\">{{ tick.label }}</div>\n          </div>\n      </div>\n    ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
SliderComponent.ctorParameters = function () { return [
    { type: ColorService, },
    { type: core.ChangeDetectorRef, },
]; };
SliderComponent.propDecorators = {
    'value': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'lowerTooltip': [{ type: core.ViewChild, args: ['lowerTooltip',] },],
    'upperTooltip': [{ type: core.ViewChild, args: ['upperTooltip',] },],
    'track': [{ type: core.ViewChild, args: ['track',] },],
};
var SliderType = {};
SliderType.Value = 0;
SliderType.Range = 1;
SliderType[SliderType.Value] = "Value";
SliderType[SliderType.Range] = "Range";
var SliderStyle = {};
SliderStyle.Button = 0;
SliderStyle.Line = 1;
SliderStyle[SliderStyle.Button] = "Button";
SliderStyle[SliderStyle.Line] = "Line";
var SliderSize = {};
SliderSize.Narrow = 0;
SliderSize.Wide = 1;
SliderSize[SliderSize.Narrow] = "Narrow";
SliderSize[SliderSize.Wide] = "Wide";
var SliderCalloutTrigger = {};
SliderCalloutTrigger.None = 0;
SliderCalloutTrigger.Hover = 1;
SliderCalloutTrigger.Drag = 2;
SliderCalloutTrigger.Persistent = 3;
SliderCalloutTrigger.Dynamic = 4;
SliderCalloutTrigger[SliderCalloutTrigger.None] = "None";
SliderCalloutTrigger[SliderCalloutTrigger.Hover] = "Hover";
SliderCalloutTrigger[SliderCalloutTrigger.Drag] = "Drag";
SliderCalloutTrigger[SliderCalloutTrigger.Persistent] = "Persistent";
SliderCalloutTrigger[SliderCalloutTrigger.Dynamic] = "Dynamic";
var SliderSnap = {};
SliderSnap.None = 0;
SliderSnap.Minor = 1;
SliderSnap.Major = 2;
SliderSnap.All = 3;
SliderSnap[SliderSnap.None] = "None";
SliderSnap[SliderSnap.Minor] = "Minor";
SliderSnap[SliderSnap.Major] = "Major";
SliderSnap[SliderSnap.All] = "All";
var SliderTickType = {};
SliderTickType.Minor = 0;
SliderTickType.Major = 1;
SliderTickType[SliderTickType.Minor] = "Minor";
SliderTickType[SliderTickType.Major] = "Major";
var SliderThumbEvent = {};
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
var SliderThumb = {};
SliderThumb.Lower = 0;
SliderThumb.Upper = 1;
SliderThumb[SliderThumb.Lower] = "Lower";
SliderThumb[SliderThumb.Upper] = "Upper";
var SliderModule = (function () {
    function SliderModule() {
    }
    return SliderModule;
}());
SliderModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    ColorServiceModule,
                    DragModule
                ],
                exports: [SliderComponent],
                declarations: [SliderComponent]
            },] },
];
/**
 * @nocollapse
 */
SliderModule.ctorParameters = function () { return []; };
var SparkComponent = (function () {
    /**
     * @param {?} _colorService
     */
    function SparkComponent(_colorService) {
        this._colorService = _colorService;
        this.values = [];
        this.barHeight = 10;
        this._theme = 'primary';
        this._barColor = [];
    }
    Object.defineProperty(SparkComponent.prototype, "theme", {
        /**
         * @return {?}
         */
        get: function () {
            return this._theme;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._theme = this._colorService.resolveColorName(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "trackColor", {
        /**
         * @return {?}
         */
        get: function () {
            return this._trackColor;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._trackColor = this._colorService.resolve(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "barColor", {
        /**
         * @return {?}
         */
        get: function () {
            return this._barColor;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            if (Array.isArray(value)) {
                this._barColor = value.map(function (color) { return _this._colorService.resolve(color); });
            }
            else {
                this._barColor = [this._colorService.resolve(value)];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SparkComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this.values;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            // ensure 'value' is an array at this point
            var /** @type {?} */ values = Array.isArray(value) ? value : [value];
            // get the total value of all lines
            var /** @type {?} */ total = Math.max(values.reduce(function (previous, current) { return previous + current; }, 0), 100);
            // figure out the percentages for each spark line
            this.values = values.map(function (val) { return (val / total) * 100; });
        },
        enumerable: true,
        configurable: true
    });
    return SparkComponent;
}());
SparkComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-spark',
                template: "\n      <!-- Inline Spark Chart -->\n      <div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n          <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n          <div class=\"ux-spark-line\">\n\n              <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n                  <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n                  <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n              </div>\n\n              <div class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [tooltip]=\"tooltip\">\n                  <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n              </div>\n\n              <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n                  <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n                  <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n              </div>\n\n          </div>\n      </div>\n\n      <!-- End Inline Spark Chart -->\n\n\n      <!-- Non Inline Spark Chart -->\n      <div *ngIf=\"!inlineLabel\">\n\n          <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n              <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n              <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n          </div>\n\n          <div class=\"ux-spark ux-spark-theme-{{theme}}\" [class.ux-spark-multi-value]=\"values.length > 1\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\"\n              [tooltip]=\"tooltip\">\n              <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n          </div>\n\n          <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n              <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n              <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n          </div>\n      </div>\n\n      <!-- End Non Inline Spark Chart -->\n    ",
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
SparkComponent.ctorParameters = function () { return [
    { type: ColorService, },
]; };
SparkComponent.propDecorators = {
    'barHeight': [{ type: core.Input },],
    'inlineLabel': [{ type: core.Input },],
    'topLeftLabel': [{ type: core.Input },],
    'topRightLabel': [{ type: core.Input },],
    'bottomLeftLabel': [{ type: core.Input },],
    'bottomRightLabel': [{ type: core.Input },],
    'tooltip': [{ type: core.Input },],
    'theme': [{ type: core.Input },],
    'trackColor': [{ type: core.Input },],
    'barColor': [{ type: core.Input },],
    'value': [{ type: core.Input },],
};
var SparkModule = (function () {
    function SparkModule() {
    }
    return SparkModule;
}());
SparkModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
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
SparkModule.ctorParameters = function () { return []; };
var TimelineComponent = (function () {
    function TimelineComponent() {
    }
    return TimelineComponent;
}());
TimelineComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-timeline',
                template: "\n      <div class=\"timeline\">\n          <ng-content></ng-content>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
TimelineComponent.ctorParameters = function () { return []; };
var TimelineEventComponent = (function () {
    function TimelineEventComponent() {
    }
    return TimelineEventComponent;
}());
TimelineEventComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-timeline-event',
                template: "\n      <div class=\"timeline-badge\" [ngClass]=\"badgeColor\">\n          <span>{{badgeTitle}}</span>\n      </div>\n      <div class=\"timeline-panel\">\n          <ng-content></ng-content>\n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
TimelineEventComponent.ctorParameters = function () { return []; };
TimelineEventComponent.propDecorators = {
    'badgeColor': [{ type: core.Input },],
    'badgeTitle': [{ type: core.Input },],
};
var TimelineModule = (function () {
    function TimelineModule() {
    }
    return TimelineModule;
}());
TimelineModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [
                    TimelineComponent,
                    TimelineEventComponent
                ],
                declarations: [
                    TimelineComponent,
                    TimelineEventComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
TimelineModule.ctorParameters = function () { return []; };
var TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return ToggleSwitchComponent; }),
    multi: true
};
var ToggleSwitchComponent = (function () {
    function ToggleSwitchComponent() {
        this.name = '';
        this.disabled = false;
        this.clickable = true;
        this.valueChange = new core.EventEmitter();
        this._value = false;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(ToggleSwitchComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
    /**
     * @return {?}
     */
    ToggleSwitchComponent.prototype.toggleChecked = function () {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToggleSwitchComponent.prototype.keydown = function (event) {
        // if spacebar is pressed toggle state
        if (event.keyCode === 32) {
            this.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ToggleSwitchComponent.prototype.writeValue = function (value) {
        this.value = !!value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ToggleSwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return ToggleSwitchComponent;
}());
ToggleSwitchComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-toggleswitch',
                template: "\n      <div class=\"ux-toggleswitch\" \n        tabindex=\"0\"\n        (keydown)=\"keydown($event)\"\n        [class.checked]=\"value === true\"\n        [class.disabled]=\"disabled === true\">\n\n        <span class=\"ux-toggleswitch-bg\"></span>\n  \n        <span class=\"ux-toggleswitch-nub\"></span>\n\n        <input type=\"checkbox\" \n          role=\"checkbox\"\n          [name]=\"name\" \n          [checked]=\"value === true\"\n          [disabled]=\"disabled === true\"\n          tabindex=\"-1\" />\n      </div>\n\n      <div class=\"ux-toggleswitch-content\">\n        <ng-content></ng-content>\n      </div>\n    ",
                providers: [TOGGLESWITCH_VALUE_ACCESSOR],
                host: {
                    '(click)': 'toggleChecked()'
                }
            },] },
];
/**
 * @nocollapse
 */
ToggleSwitchComponent.ctorParameters = function () { return []; };
ToggleSwitchComponent.propDecorators = {
    'name': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'clickable': [{ type: core.Input },],
    'valueChange': [{ type: core.Output },],
    'value': [{ type: core.Input },],
};
var ToggleSwitchModule = (function () {
    function ToggleSwitchModule() {
    }
    return ToggleSwitchModule;
}());
ToggleSwitchModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [forms.FormsModule],
                exports: [ToggleSwitchComponent],
                declarations: [ToggleSwitchComponent]
            },] },
];
/**
 * @nocollapse
 */
ToggleSwitchModule.ctorParameters = function () { return []; };
var FrameExtractionService = (function () {
    function FrameExtractionService() {
    }
    /**
     * @param {?} source
     * @return {?}
     */
    FrameExtractionService.prototype.createVideoPlayer = function (source) {
        var /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    FrameExtractionService.prototype.createCanvas = function (width, height) {
        var /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.goToFrame = function (videoPlayer, time) {
        videoPlayer.currentTime = time;
        return Observable.Observable.fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    };
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    FrameExtractionService.prototype.getThumbnail = function (videoPlayer, canvas, time, width, height) {
        var _this = this;
        if (width === void 0) { width = 160; }
        if (height === void 0) { height = 90; }
        return Observable.Observable.create(function (observer) {
            // go to specified frame
            var /** @type {?} */ subscription = _this.goToFrame(videoPlayer, time).subscribe(function (event) {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnail = function (source, width, height, time) {
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        var /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished        
        frameSubscription.subscribe(null, null, function () {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    };
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    FrameExtractionService.prototype.getFrameThumbnails = function (source, width, height, start, end, skip) {
        var _this = this;
        if (skip === void 0) { skip = 5; }
        // create required elements
        var /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        var /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable.Observable.create(function (observer) {
            Observable.Observable.fromEvent(videoPlayer, 'loadedmetadata').subscribe(function () {
                // calculate the frames required
                var /** @type {?} */ frames = [];
                for (var /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(_this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                Observable.Observable.concat.apply(Observable.Observable, frames).subscribe(function (frame) { return observer.next(frame); }, null, function () {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    };
    return FrameExtractionService;
}());
FrameExtractionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
FrameExtractionService.ctorParameters = function () { return []; };
var FrameExtractionModule = (function () {
    function FrameExtractionModule() {
    }
    return FrameExtractionModule;
}());
FrameExtractionModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [FrameExtractionService],
            },] },
];
/**
 * @nocollapse
 */
FrameExtractionModule.ctorParameters = function () { return []; };
var MediaPlayerService = (function () {
    /**
     * @param {?} _frameExtractionService
     */
    function MediaPlayerService(_frameExtractionService) {
        var _this = this;
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
            Create observables for media player events
        */
        this.playing = new BehaviorSubject.BehaviorSubject(false);
        this.initEvent = new BehaviorSubject.BehaviorSubject(false);
        this.abortEvent = new Subject.Subject();
        this.canPlayEvent = new BehaviorSubject.BehaviorSubject(false);
        this.canPlayThroughEvent = new BehaviorSubject.BehaviorSubject(false);
        this.durationChangeEvent = new Subject.Subject();
        this.endedEvent = new Subject.Subject();
        this.errorEvent = new Subject.Subject();
        this.loadedDataEvent = new Subject.Subject();
        this.loadedMetadataEvent = new Subject.Subject();
        this.loadStartEvent = new Subject.Subject();
        this.pauseEvent = new Subject.Subject();
        this.playEvent = new Subject.Subject();
        this.playingEvent = new Subject.Subject();
        this.rateChangeEvent = new Subject.Subject();
        this.seekedEvent = new Subject.Subject();
        this.seekingEvent = new Subject.Subject();
        this.stalledEvent = new Subject.Subject();
        this.suspendEvent = new Subject.Subject();
        this.timeUpdateEvent = new Subject.Subject();
        this.volumeChangeEvent = new Subject.Subject();
        this.waitingEvent = new Subject.Subject();
        this.mediaClickEvent = new Subject.Subject();
        this.fullscreenEvent = new BehaviorSubject.BehaviorSubject(false);
        this.quietModeEvent = new BehaviorSubject.BehaviorSubject(false);
        this.progressEvent = Observable.Observable.create(function (observer) {
            // repeat until the whole video has fully loaded
            var /** @type {?} */ interval = setInterval(function () {
                var /** @type {?} */ buffered = (_this._mediaPlayer.buffered);
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
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "quietMode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._quietMode;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerHeight", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "audioTracks", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "autoplay", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.autoplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "buffered", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "crossOrigin", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.crossOrigin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentSrc", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentTime", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.currentTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultMuted", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.defaultMuted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultPlaybackRate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.defaultPlaybackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "duration", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "ended", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.ended : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "loop", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.loop : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "muted", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.muted : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.muted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "networkState", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer.networkState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "paused", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.paused : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "playbackRate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.playbackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "played", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "preload", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.preload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "readyState", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seekable", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seeking", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "src", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.src : '';
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "textTracks", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "videoTracks", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "volume", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._mediaPlayer.volume : 1;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._mediaPlayer.volume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "fullscreen", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mediaPlayer ? this._fullscreen : false;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._fullscreen = value;
            this.fullscreenEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    MediaPlayerService.prototype.setMediaPlayer = function (hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    };
    /**
     * Toggle playing state
     * @return {?}
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
     * @return {?}
     */
    MediaPlayerService.prototype.play = function () {
        this._mediaPlayer.play();
    };
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    MediaPlayerService.prototype.pause = function () {
        this._mediaPlayer.pause();
    };
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    MediaPlayerService.prototype.load = function () {
        this._mediaPlayer.load();
    };
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    MediaPlayerService.prototype.canPlayType = function (type) {
        return this._mediaPlayer.canPlayType(type);
    };
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    MediaPlayerService.prototype.addTextTrack = function (kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    };
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    MediaPlayerService.prototype.requestFullscreen = function () {
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
    };
    /**
     * Exit full screen mode
     * @return {?}
     */
    MediaPlayerService.prototype.exitFullscreen = function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerService.prototype.fullscreenChange = function (event) {
        this.fullscreen = ((document)).fullscreen || document.webkitIsFullScreen || ((document)).mozFullScreen || ((document)).msFullscreenElement !== null && ((document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    };
    /**
     * Toggle Fullscreen State
     * @return {?}
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
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    MediaPlayerService.prototype.getFrames = function (width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return Observable.Observable.from([]);
    };
    return MediaPlayerService;
}());
MediaPlayerService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
MediaPlayerService.ctorParameters = function () { return [
    { type: FrameExtractionService, },
]; };
var AudioService = (function () {
    /**
     * @param {?} _http
     */
    function AudioService(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    AudioService.prototype.getAudioFileMetadata = function (mediaElement) {
        var _this = this;
        return Observable.Observable.create(function (observer) {
            _this._http.request(mediaElement.src, { responseType: http.ResponseContentType.Blob }).subscribe(function (response) {
                var /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                var /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                var /** @type {?} */ blob = response.blob();
                var /** @type {?} */ description;
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
    /**
     * @param {?} url
     * @return {?}
     */
    AudioService.prototype.getWaveformFromUrl = function (url) {
        var _this = this;
        // if audio context is not support return a stream of empty data
        if (!((window)).AudioContext) {
            return Observable.Observable.of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable.Observable.create(function (observer) {
            // load the media from the URL provided
            _this._http.request(url, { responseType: http.ResponseContentType.ArrayBuffer }).subscribe(function (response) {
                _this.getAudioBuffer(response.arrayBuffer()).subscribe(function (audioBuffer) {
                    // create the buffer source
                    _this.createBufferSource(audioBuffer);
                    var /** @type {?} */ dataPoints = [];
                    var /** @type {?} */ channels = _this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (var /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
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
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    AudioService.prototype.getWaveformPoints = function (channels, skip) {
        if (channels === void 0) { channels = []; }
        if (skip === void 0) { skip = 1000; }
        var /** @type {?} */ waveform = [];
        var /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        var _loop_5 = function (idx) {
            // get all the channel data for a specific point
            var /** @type {?} */ points = channels.map(function (channel) { return channel[idx]; });
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce(function (previous, current) { return current < previous ? current : previous; }),
                max: points.reduce(function (previous, current) { return current > previous ? current : previous; })
            });
        };
        // convert each channel data to a series of waveform points
        for (var /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            _loop_5(/** @type {?} */ idx);
        }
        return waveform;
    };
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    AudioService.prototype.getAudioBuffer = function (arrayBuffer) {
        var _this = this;
        return Observable.Observable.create(function (observer) {
            _this.getOfflineAudioContext().decodeAudioData(arrayBuffer, function (audioBuffer) {
                observer.next(audioBuffer);
                observer.complete();
            }, function (error) { return observer.error(error); });
        });
    };
    /**
     * @return {?}
     */
    AudioService.prototype.getOfflineAudioContext = function () {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    };
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    AudioService.prototype.createBufferSource = function (audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createVolumeNode = function () {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createAnalyserNode = function () {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.disconnectSource = function () {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    };
    return AudioService;
}());
AudioService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
AudioService.ctorParameters = function () { return [
    { type: http.Http, },
]; };
var AudioServiceModule = (function () {
    function AudioServiceModule() {
    }
    return AudioServiceModule;
}());
AudioServiceModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [http.HttpModule],
                providers: [AudioService]
            },] },
];
/**
 * @nocollapse
 */
AudioServiceModule.ctorParameters = function () { return []; };
var MediaPlayerComponent = (function () {
    /**
     * @param {?} mediaPlayerService
     * @param {?} _audioService
     * @param {?} _elementRef
     */
    function MediaPlayerComponent(mediaPlayerService, _audioService, _elementRef) {
        var _this = this;
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        // show controls when hovering and in quiet mode
        this._hover$ = Observable.Observable.fromEvent(this._elementRef.nativeElement, 'mousemove').switchMap(function (event) {
            _this.hovering = true;
            return Observable.Observable.of(event);
        }).debounceTime(2000).subscribe(function () { return _this.hovering = false; });
    }
    Object.defineProperty(MediaPlayerComponent.prototype, "source", {
        /**
         * @return {?}
         */
        get: function () {
            return this.mediaPlayerService.source;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.mediaPlayerService.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "type", {
        /**
         * @return {?}
         */
        get: function () {
            return this.mediaPlayerService.type;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.mediaPlayerService.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "quietMode", {
        /**
         * @return {?}
         */
        get: function () {
            return this.mediaPlayerService.quietMode;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.mediaPlayerService.quietMode = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this._playing$ = this.mediaPlayerService.playingEvent.subscribe(function (event) { return _this.mediaPlayerService.playing.next(true); });
        this._paused$ = this.mediaPlayerService.pauseEvent.subscribe(function (event) { return _this.mediaPlayerService.playing.next(false); });
        this._clicked$ = this.mediaPlayerService.mediaClickEvent.subscribe(function () { return _this.mediaPlayerService.togglePlay(); });
        this._loading$ = this.mediaPlayerService.loadedMetadataEvent.subscribe(function () { return _this.mediaPlayerService.loaded = true; });
    };
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngOnDestroy = function () {
        this._hover$.unsubscribe();
        this._playing$.unsubscribe();
        this._paused$.unsubscribe();
        this._clicked$.unsubscribe();
        this._loading$.unsubscribe();
    };
    return MediaPlayerComponent;
}());
MediaPlayerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-media-player',
                template: "\n      <div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n          <video class=\"video-player\" #player [src]=\"source\" (abort)=\"mediaPlayerService.abortEvent.next()\" (canplay)=\"mediaPlayerService.canPlayEvent.next()\"\n              (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next()\" (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\" (ended)=\"mediaPlayerService.endedEvent.next()\"\n              (error)=\"mediaPlayerService.errorEvent.next($event)\" (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\" (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n              (loadstart)=\"mediaPlayerService.loadStartEvent.next()\" (pause)=\"mediaPlayerService.pauseEvent.next()\" (play)=\"mediaPlayerService.playEvent.next()\" (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n              (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\" (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\" (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n              (stalled)=\"mediaPlayerService.stalledEvent.next()\" (suspend)=\"mediaPlayerService.suspendEvent.next()\" (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n              (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\" (waiting)=\"mediaPlayerService.waitingEvent.next()\" (click)=\"mediaPlayerService.mediaClickEvent.next($event)\"></video>\n\n          <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n              <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n                  <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n                  <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n              </svg>\n          </div>\n\n      </div>\n\n\n      <div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n          <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n              <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                  <g transform=\"translate(-98.000000, -458.000000)\">\n                      <g transform=\"translate(98.000000, 458.000000)\">\n                          <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                          <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                          <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                          <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                              stroke=\"#60798D\"></path>\n                          <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                          <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                      </g>\n                  </g>\n              </g>\n          </svg>\n\n          <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n          <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n          <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n          <audio #player [src]=\"source\" (abort)=\"mediaPlayerService.abortEvent.next()\" (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n              (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\" (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\" (ended)=\"mediaPlayerService.endedEvent.next()\"\n              (error)=\"mediaPlayerService.errorEvent.next($event)\" (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\" (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n              (loadstart)=\"mediaPlayerService.loadStartEvent.next()\" (pause)=\"mediaPlayerService.pauseEvent.next()\" (play)=\"mediaPlayerService.playEvent.next()\" (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n              (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\" (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\" (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n              (stalled)=\"mediaPlayerService.stalledEvent.next()\" (suspend)=\"mediaPlayerService.suspendEvent.next()\" (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n              (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\" (waiting)=\"mediaPlayerService.waitingEvent.next()\" (click)=\"mediaPlayerService.mediaClickEvent.next($event)\"></audio>\n      </div>\n\n      <div class=\"control-bar\">\n          <ux-media-player-timeline></ux-media-player-timeline>\n          <ux-media-player-controls></ux-media-player-controls>\n      </div>\n    ",
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
MediaPlayerComponent.ctorParameters = function () { return [
    { type: MediaPlayerService, },
    { type: AudioService, },
    { type: core.ElementRef, },
]; };
MediaPlayerComponent.propDecorators = {
    '_playerRef': [{ type: core.ViewChild, args: ['player',] },],
    '_trackBarRef': [{ type: core.ViewChild, args: ['trackBar',] },],
    'source': [{ type: core.Input },],
    'type': [{ type: core.Input },],
    'quietMode': [{ type: core.Input },],
};
var MediaPlayerBaseExtensionDirective = (function () {
    /**
     * @param {?} mediaPlayerService
     */
    function MediaPlayerBaseExtensionDirective(mediaPlayerService) {
        this.mediaPlayerService = mediaPlayerService;
    }
    return MediaPlayerBaseExtensionDirective;
}());
MediaPlayerBaseExtensionDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[mediaPlayerBaseExtension]'
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerBaseExtensionDirective.ctorParameters = function () { return [
    { type: MediaPlayerService, },
]; };
var MediaPlayerTimelineExtensionComponent = (function (_super) {
    __extends(MediaPlayerTimelineExtensionComponent, _super);
    function MediaPlayerTimelineExtensionComponent() {
        var _this = _super.apply(this, arguments) || this;
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
    /**
     * @return {?}
     */
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
            for (var /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                _this.buffered.push({ start: (buffered.start(idx) / _this.duration) * 100, end: (buffered.end(idx) / _this.duration) * 100 });
            }
        });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ mousedown$ = Observable.Observable.fromEvent(this.thumb.nativeElement, 'mousedown');
        var /** @type {?} */ mousemove$ = Observable.Observable.fromEvent(document, 'mousemove');
        var /** @type {?} */ mouseup$ = Observable.Observable.fromEvent(document, 'mouseup');
        this._mouseEventSubscription = mousedown$.switchMap(function (event) { return mousemove$.takeUntil(mouseup$); }).subscribe(function (event) {
            _this.scrub.visible = false;
        });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngOnDestroy = function () {
        this._mouseEventSubscription.unsubscribe();
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.updateScrub = function (event) {
        var /** @type {?} */ target = (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        var /** @type {?} */ timeline = (this.timelineRef.nativeElement);
        var /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    };
    return MediaPlayerTimelineExtensionComponent;
}(MediaPlayerBaseExtensionDirective));
MediaPlayerTimelineExtensionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-media-player-timeline',
                template: "\n      <p class=\"current-time\">{{ current | duration }}</p>\n\n      <div #timeline class=\"timeline-bar\" (mouseenter)=\"scrub.visible = true; pop.show()\" (mouseleave)=\"scrub.visible = false; pop.hide()\"\n          (mousemove)=\"updateScrub($event)\" (mouseup)=\"updateScrub($event)\" (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n          <div class=\"buffered-bar\" *ngFor=\"let buffer of buffered\" [style.left.%]=\"buffer.start\" [style.width.%]=\"buffer.end - buffer.start\"></div>\n\n          <div class=\"media-progress-bar\" [style.width.%]=\"position\">\n              <div #progressThumb class=\"media-progress-bar-thumb\" (mouseenter)=\"scrub.visible = false; pop.hide(); $event.stopPropagation()\"\n                  (mouseleave)=\"scrub.visible = true; pop.show(); $event.stopPropagation()\"></div>\n          </div>\n\n          <div class=\"scrub-handle\" [class.scrub-handle-hidden]=\"!scrub.visible\" [style.left.px]=\"scrub.position\" [tooltip]=\"popTemplate\" placement=\"top\" triggers=\"\" #pop=\"bs-tooltip\"\n              container=\"body\" tooltipPopupDelay=\"100\" [isDisabled]=\"duration === 0\"></div>\n      </div>\n\n      <p class=\"duration-time\">{{ duration | duration }}</p>\n\n      <ng-template #popTemplate>\n          <span>{{ scrub.time | duration }}</span>\n      </ng-template>\n    ",
                host: {
                    '(document:mouseup)': 'mouseDown = false',
                    '[class.quiet]': 'quietMode || fullscreen'
                }
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerTimelineExtensionComponent.ctorParameters = function () { return []; };
MediaPlayerTimelineExtensionComponent.propDecorators = {
    'thumb': [{ type: core.ViewChild, args: ['progressThumb',] },],
    'timelineRef': [{ type: core.ViewChild, args: ['timeline',] },],
};
var MediaPlayerControlsExtensionComponent = (function (_super) {
    __extends(MediaPlayerControlsExtensionComponent, _super);
    function MediaPlayerControlsExtensionComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.fullscreen = false;
        _this.volumeActive = false;
        _this.volumeDragging = false;
        _this._volume = 50;
        _this._previousVolume = 50;
        return _this;
    }
    Object.defineProperty(MediaPlayerControlsExtensionComponent.prototype, "volume", {
        /**
         * @return {?}
         */
        get: function () {
            return this._volume;
        },
        /**
         * @param {?} value
         * @return {?}
         */
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
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mediaPlayerService.playEvent.subscribe(function (_) { return _this.playing = true; });
        this.mediaPlayerService.pauseEvent.subscribe(function (_) { return _this.playing = false; });
        this.mediaPlayerService.quietModeEvent.subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.volumeChangeEvent.subscribe(function (volume) { return _this.volume = volume * 100; });
        this.mediaPlayerService.initEvent.debounceTime(1).filter(function (init) { return init === true; }).subscribe(function () { return _this.volume = _this.mediaPlayerService.volume * 100; });
        this.mediaPlayerService.fullscreenEvent.subscribe(function (fullscreen) { return _this.fullscreen = fullscreen; });
        var /** @type {?} */ mouseenter$ = Observable.Observable.fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseenterContainer$ = Observable.Observable.fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseleaveContainer$ = Observable.Observable.fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.subscribe(function () { return _this.volumeActive = true; });
        mouseleaveContainer$.switchMap(function () { return Observable.Observable.timer(1500).takeUntil(mouseenterContainer$); }).subscribe(function () { return _this.volumeActive = false; });
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.toggleMute = function () {
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.togglePlay = function () {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.setFullscreen = function () {
        this.mediaPlayerService.toggleFullscreen();
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToStart = function () {
        this.mediaPlayerService.currentTime = 0;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToEnd = function () {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragStart = function (event) {
        event.preventDefault();
        this.volumeDragging = true;
        var /** @type {?} */ thumb = (event.target);
        thumb.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragMove = function (event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        var /** @type {?} */ slider = (this.volumeSlider.nativeElement);
        var /** @type {?} */ bounds = slider.getBoundingClientRect();
        var /** @type {?} */ x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragEnd = function () {
        this.volumeDragging = false;
    };
    return MediaPlayerControlsExtensionComponent;
}(MediaPlayerBaseExtensionDirective));
MediaPlayerControlsExtensionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-media-player-controls',
                template: "\n      <div class=\"volume-container\">\n\n          <div class=\"volume-slider-container\" #volumeContainer [class.active]=\"volumeActive\">\n              <div class=\"volume-slider-icon\" #volumeIcon>\n                  <span class=\"hpe-icon\" [class.hpe-volume-mute]=\"volume === 0\" [class.hpe-volume-low]=\"volume > 0 && volume <= 70\" [class.hpe-volume]=\"volume > 70\" [tooltip]=\"muteTooltip\" (click)=\"toggleMute()\"></span>\n              </div>\n        \n              <div class=\"volume-slider-node\">\n                  <div class=\"volume-slider\" #volumeSlider>\n                      <div class=\"volume-track-lower\" [style.width.%]=\"volume\"></div>\n                      <div class=\"volume-slider-thumb\" (mousedown)=\"dragStart($event)\" [style.left.%]=\"volume\" tabindex=\"0\" (keydown.ArrowRight)=\"volume = volume + 10\" (keydown.ArrowLeft)=\"volume = volume - 10\"></div>\n                  </div>\n              </div>\n          </div>\n      </div>\n\n      <div class=\"spacer\"></div>\n\n      <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToStart()\">\n          <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n          <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n      </svg>\n\n      <svg viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" class=\"control-button\" *ngIf=\"!playing\" (click)=\"togglePlay()\">\n          <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n      </svg>\n\n      <svg viewBox=\"0 0 43 56.9\" class=\"control-button\" width=\"20\" height=\"29\" *ngIf=\"playing\" (click)=\"togglePlay()\">\n          <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n          <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n      </svg>\n\n      <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToEnd()\">\n          <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n          <polygon points=\"0,64 0,0 44.1,32 \" />\n      </svg>\n\n      <div class=\"spacer\"></div>\n\n      <span class=\"hpe-icon\" *ngIf=\"mediaPlayerService.type !== 'audio'\" [class.hpe-expand]=\"!mediaPlayerService.fullscreen\" [class.hpe-contract]=\"mediaPlayerService.fullscreen\"\n          (click)=\"setFullscreen()\"></span>\n\n      <ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>\n    ",
                host: {
                    '[class.quiet]': 'quietMode || fullscreen'
                }
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerControlsExtensionComponent.ctorParameters = function () { return []; };
MediaPlayerControlsExtensionComponent.propDecorators = {
    'volumeIcon': [{ type: core.ViewChild, args: ['volumeIcon',] },],
    'volumeSlider': [{ type: core.ViewChild, args: ['volumeSlider',] },],
    'volumeContainer': [{ type: core.ViewChild, args: ['volumeContainer',] },],
    'dragMove': [{ type: core.HostListener, args: ['document:mousemove', ['$event'],] },],
    'dragEnd': [{ type: core.HostListener, args: ['document:mouseup',] },],
};
var DurationPipe = (function () {
    function DurationPipe() {
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    DurationPipe.prototype.transform = function (seconds) {
        var /** @type {?} */ minutes = Math.floor(seconds / 60);
        var /** @type {?} */ hours = Math.floor(minutes / 60);
        var /** @type {?} */ days = Math.floor(hours / 24);
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
    /**
     * @param {?} value
     * @return {?}
     */
    DurationPipe.prototype.pad = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        return value.toString();
    };
    return DurationPipe;
}());
DurationPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'duration'
            },] },
];
/**
 * @nocollapse
 */
DurationPipe.ctorParameters = function () { return []; };
var DurationPipeModule = (function () {
    function DurationPipeModule() {
    }
    return DurationPipeModule;
}());
DurationPipeModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [DurationPipe],
                declarations: [DurationPipe]
            },] },
];
/**
 * @nocollapse
 */
DurationPipeModule.ctorParameters = function () { return []; };
var FileSizePipe = (function () {
    function FileSizePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FileSizePipe.prototype.transform = function (value) {
        // allow for async values
        if (!value) {
            return value;
        }
        var /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        var /** @type {?} */ idx = Math.floor(Math.log(value) / Math.log(1024));
        var /** @type {?} */ formattedValue = value / Math.pow(1024, idx);
        return formattedValue.toFixed(2) + " " + units[idx];
    };
    return FileSizePipe;
}());
FileSizePipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'fileSize'
            },] },
];
/**
 * @nocollapse
 */
FileSizePipe.ctorParameters = function () { return []; };
var FileSizePipeModule = (function () {
    function FileSizePipeModule() {
    }
    return FileSizePipeModule;
}());
FileSizePipeModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [FileSizePipe],
                declarations: [FileSizePipe]
            },] },
];
/**
 * @nocollapse
 */
FileSizePipeModule.ctorParameters = function () { return []; };
var DECLARATIONS$6 = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent
];
var MediaPlayerModule = (function () {
    function MediaPlayerModule() {
    }
    return MediaPlayerModule;
}());
MediaPlayerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    FrameExtractionModule,
                    TooltipModule.forRoot(),
                    AudioServiceModule,
                    DurationPipeModule,
                    FileSizePipeModule
                ],
                exports: DECLARATIONS$6,
                declarations: DECLARATIONS$6,
                providers: [MediaPlayerService]
            },] },
];
/**
 * @nocollapse
 */
MediaPlayerModule.ctorParameters = function () { return []; };
var VirtualScrollLoadingDirective = (function () {
    function VirtualScrollLoadingDirective() {
    }
    return VirtualScrollLoadingDirective;
}());
VirtualScrollLoadingDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxVirtualScrollLoading]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollLoadingDirective.ctorParameters = function () { return []; };
var VirtualScrollLoadButtonDirective = (function () {
    function VirtualScrollLoadButtonDirective() {
    }
    return VirtualScrollLoadButtonDirective;
}());
VirtualScrollLoadButtonDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxVirtualScrollLoadButton]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollLoadButtonDirective.ctorParameters = function () { return []; };
var VirtualScrollCellDirective = (function () {
    function VirtualScrollCellDirective() {
    }
    return VirtualScrollCellDirective;
}());
VirtualScrollCellDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxVirtualScrollCell]'
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollCellDirective.ctorParameters = function () { return []; };
var VirtualScrollComponent = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     */
    function VirtualScrollComponent(_elementRef, resizeService) {
        var _this = this;
        this._elementRef = _elementRef;
        this.collection = Observable.Observable.create();
        this.loadOnScroll = true;
        this.loading = new core.EventEmitter();
        this.cells = new BehaviorSubject.BehaviorSubject([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) { return _this._height = event.height; });
    }
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = function () {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngAfterContentInit = function () {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnChanges = function (changes) {
        if (changes.collection && changes.collection.currentValue !== changes.collection.previousValue && !changes.collection.isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.setupObservable = function () {
        var _this = this;
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(function (collection) {
            (_c = _this.data).push.apply(_c, collection);
            _this.renderCells();
            _this.isLoading = false;
            var _c;
        }, null, function () {
            _this.loadingComplete = true;
        });
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.renderCells = function () {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            var /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getVisibleCells = function () {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        var /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        var /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        var /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getTotalHeight = function () {
        return this.cellHeight * this.data.length;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.loadNextPage = function () {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    };
    /**
     * @return {?}
     */
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
VirtualScrollComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ux-virtual-scroll',
                template: "\n      <div class=\"virtual-scroll-content-height\" [style.height.px]=\"getTotalHeight()\"></div>\n      <div class=\"virtual-scroll-content\" [style.transform]=\"'translateY(' + scrollTop + 'px)'\">\n\n          <!-- Virtually Render Cells -->\n          <ng-container *ngFor=\"let cell of cells | async\">\n              <ng-container *ngTemplateOutlet=\"cellTemplate; context: { cell: cell }\"></ng-container>\n          </ng-container>\n\n          <!-- Loading Indicator -->\n          <ng-container *ngIf=\"loadingIndicatorTemplate && isLoading\" [ngTemplateOutlet]=\"loadingIndicatorTemplate\"></ng-container>\n\n          <!-- Loading Button -->\n          <div class=\"virtual-scroll-load-button\" *ngIf=\"loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading\" (click)=\"loadNextPage()\">\n              <ng-container *ngTemplateOutlet=\"loadButtonTemplate\"></ng-container>\n          </div>\n    \n      </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ResizeService, },
]; };
VirtualScrollComponent.propDecorators = {
    'collection': [{ type: core.Input },],
    'cellHeight': [{ type: core.Input },],
    'loadOnScroll': [{ type: core.Input },],
    'loading': [{ type: core.Output },],
    'cellTemplate': [{ type: core.ContentChild, args: [VirtualScrollCellDirective, { read: core.TemplateRef },] },],
    'loadingIndicatorTemplate': [{ type: core.ContentChild, args: [VirtualScrollLoadingDirective, { read: core.TemplateRef },] },],
    'loadButtonTemplate': [{ type: core.ContentChild, args: [VirtualScrollLoadButtonDirective, { read: core.TemplateRef },] },],
    'renderCells': [{ type: core.HostListener, args: ['scroll',] },],
};
var DECLARATIONS$7 = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];
var VirtualScrollModule = (function () {
    function VirtualScrollModule() {
    }
    return VirtualScrollModule;
}());
VirtualScrollModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    ResizeModule
                ],
                exports: DECLARATIONS$7,
                declarations: DECLARATIONS$7
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollModule.ctorParameters = function () { return []; };
var FixedHeaderTableDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    function FixedHeaderTableDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.tablePaging = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.ngOnInit = function () {
        // add class to the table
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');
        // locate the important elements
        this._tableHead = this._elementRef.nativeElement.querySelector('thead');
        this._tableBody = this._elementRef.nativeElement.querySelector('tbody');
        // bind to scroll events on the table body
        this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));
        // resize the table header to account for scrollbar
        this.setLayout();
        // trigger the loading of the first page
        this.tablePaging.emit();
    };
    /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.getTable = function () {
        return this._elementRef.nativeElement;
    };
    /**
     * Handle scroll events
     * @param {?} event
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.onScroll = function (event) {
        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
            this.tablePaging.emit();
        }
    };
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.setLayout = function () {
        // calculate the size of the scrollbar
        var /** @type {?} */ scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;
        // add padding to the header to account for this
        this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');
        // set the desired height of the table body
        this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? this.tableHeight + "px" : this.tableHeight);
    };
    return FixedHeaderTableDirective;
}());
FixedHeaderTableDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxFixedHeaderTable]'
            },] },
];
/**
 * @nocollapse
 */
FixedHeaderTableDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
FixedHeaderTableDirective.propDecorators = {
    'tableHeight': [{ type: core.Input },],
    'tablePaging': [{ type: core.Output },],
};
var FixedHeaderTableModule = (function () {
    function FixedHeaderTableModule() {
    }
    return FixedHeaderTableModule;
}());
FixedHeaderTableModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [FixedHeaderTableDirective],
                declarations: [FixedHeaderTableDirective]
            },] },
];
/**
 * @nocollapse
 */
FixedHeaderTableModule.ctorParameters = function () { return []; };
var HelpCenterService = (function () {
    function HelpCenterService() {
        this.items = new BehaviorSubject.BehaviorSubject([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.registerItem = function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    HelpCenterService.prototype.unregisterItem = function (item) {
        // get the current items
        var /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(function (itm) { return itm !== item; });
        // update the observable
        this.items.next(items);
    };
    return HelpCenterService;
}());
HelpCenterService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
HelpCenterService.ctorParameters = function () { return []; };
var HelpCenterItemDirective = (function () {
    /**
     * @param {?} _helpCenterService
     */
    function HelpCenterItemDirective(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    /**
     * @return {?}
     */
    HelpCenterItemDirective.prototype.ngOnInit = function () {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    };
    /**
     * @return {?}
     */
    HelpCenterItemDirective.prototype.ngOnDestroy = function () {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    };
    return HelpCenterItemDirective;
}());
HelpCenterItemDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[uxHelpCenterItem]' },] },
];
/**
 * @nocollapse
 */
HelpCenterItemDirective.ctorParameters = function () { return [
    { type: HelpCenterService, },
]; };
HelpCenterItemDirective.propDecorators = {
    'uxHelpCenterItem': [{ type: core.Input },],
};
var HelpCenterModule = (function () {
    function HelpCenterModule() {
    }
    return HelpCenterModule;
}());
HelpCenterModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [],
                exports: [HelpCenterItemDirective],
                declarations: [HelpCenterItemDirective],
                providers: [HelpCenterService],
            },] },
];
/**
 * @nocollapse
 */
HelpCenterModule.ctorParameters = function () { return []; };
var HoverActionService = (function () {
    function HoverActionService() {
        this.active = new BehaviorSubject.BehaviorSubject(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.register = function (action) {
        this._actions.push(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.unregister = function (action) {
        this._actions = this._actions.filter(function (actn) { return actn !== action; });
    };
    /**
     * @param {?} container
     * @return {?}
     */
    HoverActionService.prototype.setContainer = function (container) {
        this._container = container;
    };
    /**
     * @param {?} focus
     * @return {?}
     */
    HoverActionService.prototype.setFocusState = function (focus) {
        this._focused = focus;
        this.updateVisibility();
    };
    /**
     * @param {?} hover
     * @return {?}
     */
    HoverActionService.prototype.setHoverState = function (hover) {
        this._hovered = hover;
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.next = function () {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.previous = function () {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.updateVisibility = function () {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    };
    /**
     * @param {?} index
     * @return {?}
     */
    HoverActionService.prototype.focusActionAtIndex = function (index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedActionIndex = function () {
        var _this = this;
        return this._actions.findIndex(function (action) { return action === _this.getFocusedAction(); });
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.containerHasFocus = function () {
        return this._focused;
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.actionHasFocus = function () {
        return !!this.getFocusedAction();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedAction = function () {
        return this._actions.find(function (action) { return action.focused; });
    };
    return HoverActionService;
}());
HoverActionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
HoverActionService.ctorParameters = function () { return []; };
var HoverActionContainerDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
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
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.ngOnDestroy = function () {
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onFocus = function () {
        this._hoverActionService.setFocusState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onBlur = function () {
        this._hoverActionService.setFocusState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onHover = function () {
        this._hoverActionService.setHoverState(true);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.onLeave = function () {
        this._hoverActionService.setHoverState(false);
    };
    /**
     * @return {?}
     */
    HoverActionContainerDirective.prototype.next = function () {
        this._hoverActionService.next();
    };
    return HoverActionContainerDirective;
}());
HoverActionContainerDirective.decorators = [
    { type: core.Directive, args: [{
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
HoverActionContainerDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: HoverActionService, },
]; };
HoverActionContainerDirective.propDecorators = {
    'tabindex': [{ type: core.Input },],
    'focus': [{ type: core.HostListener, args: ['click',] },],
    'onFocus': [{ type: core.HostListener, args: ['focus',] },],
    'onBlur': [{ type: core.HostListener, args: ['blur',] },],
    'onHover': [{ type: core.HostListener, args: ['mouseenter',] },],
    'onLeave': [{ type: core.HostListener, args: ['mouseleave',] },],
    'next': [{ type: core.HostListener, args: ['keydown.arrowright',] },],
};
var HoverActionDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
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
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.ngOnDestroy = function () {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.focus = function () {
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onFocus = function () {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionDirective.prototype.onBlur = function () {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.previous = function (event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HoverActionDirective.prototype.next = function (event) {
        event.stopPropagation();
        this._hoverActionService.next();
    };
    return HoverActionDirective;
}());
HoverActionDirective.decorators = [
    { type: core.Directive, args: [{
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
HoverActionDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: HoverActionService, },
]; };
HoverActionDirective.propDecorators = {
    'tabindex': [{ type: core.Input },],
    'onFocus': [{ type: core.HostListener, args: ['focus',] },],
    'onBlur': [{ type: core.HostListener, args: ['blur',] },],
    'previous': [{ type: core.HostListener, args: ['keydown.arrowleft', ['$event'],] },],
    'next': [{ type: core.HostListener, args: ['keydown.arrowright', ['$event'],] },],
};
var DECLARATIONS$8 = [
    HoverActionDirective,
    HoverActionContainerDirective
];
var HoverActionModule = (function () {
    function HoverActionModule() {
    }
    return HoverActionModule;
}());
HoverActionModule.decorators = [
    { type: core.NgModule, args: [{
                exports: DECLARATIONS$8,
                declarations: DECLARATIONS$8
            },] },
];
/**
 * @nocollapse
 */
HoverActionModule.ctorParameters = function () { return []; };
var LayoutSwitcherItemDirective = (function () {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainerRef
     */
    function LayoutSwitcherItemDirective(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.getLayout = function () {
        return this._templateRef;
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.getConfig = function () {
        return this._config;
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.activate = function () {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    };
    /**
     * @return {?}
     */
    LayoutSwitcherItemDirective.prototype.deactivate = function () {
        var /** @type {?} */ index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    };
    return LayoutSwitcherItemDirective;
}());
LayoutSwitcherItemDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxLayoutSwitcherItem]'
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherItemDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
LayoutSwitcherItemDirective.propDecorators = {
    '_config': [{ type: core.Input, args: ['uxLayoutSwitcherItem',] },],
};
var LayoutSwitcherDirective = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     * @param {?} _viewContainerRef
     */
    function LayoutSwitcherDirective(_elementRef, resizeService, _viewContainerRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(function (event) {
            _this._width = event.width;
            // render the appropriate layout
            _this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngOnChanges = function (changes) {
        // if the active group has changed then render the appropriate layout
        if (changes.group.currentValue !== changes.group.previousValue) {
            this.updateActiveLayout();
        }
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.getActiveLayout = function () {
        var _this = this;
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(function (layout) { return _this.group === layout.getConfig().group; }).find(function (layout) {
            var /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            var /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return _this._width >= minWidth && _this._width < maxWidth;
        });
    };
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.updateActiveLayout = function () {
        // get the layout that should be shown
        var /** @type {?} */ layout = this.getActiveLayout();
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
    /**
     * @return {?}
     */
    LayoutSwitcherDirective.prototype.ngAfterContentInit = function () {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    };
    return LayoutSwitcherDirective;
}());
LayoutSwitcherDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[uxLayoutSwitcher]'
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ResizeService, },
    { type: core.ViewContainerRef, },
]; };
LayoutSwitcherDirective.propDecorators = {
    'group': [{ type: core.Input },],
    '_layouts': [{ type: core.ContentChildren, args: [LayoutSwitcherItemDirective,] },],
};
var DECLARATIONS$9 = [
    LayoutSwitcherDirective,
    LayoutSwitcherItemDirective
];
var LayoutSwitcherModule = (function () {
    function LayoutSwitcherModule() {
    }
    return LayoutSwitcherModule;
}());
LayoutSwitcherModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    ResizeModule
                ],
                exports: DECLARATIONS$9,
                declarations: DECLARATIONS$9,
                providers: [],
            },] },
];
/**
 * @nocollapse
 */
LayoutSwitcherModule.ctorParameters = function () { return []; };
var StringFilterPipe = (function () {
    function StringFilterPipe() {
    }
    /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    StringFilterPipe.prototype.transform = function (items, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it.toLowerCase().indexOf(value.toLowerCase()) >= 0; });
    };
    return StringFilterPipe;
}());
StringFilterPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'stringFilter'
            },] },
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
StringFilterPipe.ctorParameters = function () { return []; };
var StringFilterModule = (function () {
    function StringFilterModule() {
    }
    return StringFilterModule;
}());
StringFilterModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [StringFilterPipe],
                declarations: [StringFilterPipe]
            },] },
];
/**
 * @nocollapse
 */
StringFilterModule.ctorParameters = function () { return []; };
var CookieAdapter = (function () {
    function CookieAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.getItem = function (key) {
        if (document.cookie) {
            // get all the cookies for this site
            var /** @type {?} */ cookies = document.cookie.split(';');
            // process the cookies into a from we can easily manage
            var /** @type {?} */ match = cookies
                .map(function (cookie) { return ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }); })
                .find(function (cookie) { return cookie.key === key; });
            return match ? match.value : null;
        }
        return null;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    CookieAdapter.prototype.setItem = function (key, value) {
        document.cookie = key + "=" + value + "; path=/";
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.removeItem = function (key) {
        document.cookie.split(';').forEach(function (cookie) {
            var /** @type {?} */ eqPos = cookie.indexOf('=');
            var /** @type {?} */ name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.clear = function () {
        var _this = this;
        // call remove item on each cookie
        document.cookie.split(';').map(function (cookie) { return cookie.split('=')[0].trim(); })
            .forEach(function (cookie) { return _this.removeItem(cookie); });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.getSupported = function () {
        // cookies are supported in all browsers
        return this;
    };
    return CookieAdapter;
}());
var LocalStorageAdapter = (function () {
    function LocalStorageAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageAdapter.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    LocalStorageAdapter.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorageAdapter.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    /**
     * @return {?}
     */
    LocalStorageAdapter.prototype.clear = function () {
        localStorage.clear();
    };
    /**
     * @return {?}
     */
    LocalStorageAdapter.prototype.getSupported = function () {
        // if local storage variable does not exist fall back to cookies
        if (!localStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            localStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            localStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (err) {
            return new CookieAdapter();
        }
    };
    return LocalStorageAdapter;
}());
var SessionStorageAdapter = (function () {
    function SessionStorageAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    SessionStorageAdapter.prototype.getItem = function (key) {
        return sessionStorage.getItem(key);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    SessionStorageAdapter.prototype.setItem = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SessionStorageAdapter.prototype.removeItem = function (key) {
        sessionStorage.removeItem(key);
    };
    /**
     * @return {?}
     */
    SessionStorageAdapter.prototype.clear = function () {
        sessionStorage.clear();
    };
    /**
     * @return {?}
     */
    SessionStorageAdapter.prototype.getSupported = function () {
        // if local storage variable does not exist fall back to cookies
        if (!sessionStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            sessionStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            sessionStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (err) {
            return new CookieAdapter();
        }
    };
    return SessionStorageAdapter;
}());
var PersistentDataService = (function () {
    function PersistentDataService() {
    }
    /**
     * Save the item in some form of persistent storage
     * @param {?} key
     * @param {?} value
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.setItem = function (key, value, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).setItem(key, value);
    };
    /**
     * Get a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.getItem = function (key, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        return this.getAdapter(type).getItem(key);
    };
    /**
     * Remove a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.removeItem = function (key, type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).removeItem(key);
    };
    /**
     * Remove a stored value from persistent storage
     * @param {?=} type
     * @return {?}
     */
    PersistentDataService.prototype.clear = function (type) {
        if (type === void 0) { type = PersistentDataStorageType.LocalStorage; }
        this.getAdapter(type).clear();
    };
    /**
     * Return the appropriate adapter based on the type requested
     * @param {?} type
     * @return {?}
     */
    PersistentDataService.prototype.getAdapter = function (type) {
        switch (type) {
            case PersistentDataStorageType.Cookie:
                return new CookieAdapter();
            case PersistentDataStorageType.LocalStorage:
                var /** @type {?} */ localStorageAdapter = new LocalStorageAdapter();
                return localStorageAdapter.getSupported();
            case PersistentDataStorageType.SessionStorage:
                var /** @type {?} */ sessionStorageAdapter = new SessionStorageAdapter();
                return sessionStorageAdapter.getSupported();
        }
    };
    return PersistentDataService;
}());
PersistentDataService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
PersistentDataService.ctorParameters = function () { return []; };
var PersistentDataStorageType = {};
PersistentDataStorageType.LocalStorage = 0;
PersistentDataStorageType.Cookie = 1;
PersistentDataStorageType.SessionStorage = 2;
PersistentDataStorageType[PersistentDataStorageType.LocalStorage] = "LocalStorage";
PersistentDataStorageType[PersistentDataStorageType.Cookie] = "Cookie";
PersistentDataStorageType[PersistentDataStorageType.SessionStorage] = "SessionStorage";
var PersistentDataModule = (function () {
    function PersistentDataModule() {
    }
    return PersistentDataModule;
}());
PersistentDataModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [PersistentDataService],
            },] },
];
/**
 * @nocollapse
 */
PersistentDataModule.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var StorageAdapter = (function () {
    function StorageAdapter() {
    }
    /**
     * @abstract
     * @param {?} key
     * @return {?}
     */
    StorageAdapter.prototype.getItem = function (key) { };
    /**
     * @abstract
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    StorageAdapter.prototype.setItem = function (key, value) { };
    /**
     * @abstract
     * @param {?} key
     * @return {?}
     */
    StorageAdapter.prototype.removeItem = function (key) { };
    /**
     * @abstract
     * @return {?}
     */
    StorageAdapter.prototype.clear = function () { };
    /**
     * @abstract
     * @return {?}
     */
    StorageAdapter.prototype.getSupported = function () { };
    return StorageAdapter;
}());
var ContactsNg1Component = (function (_super) {
    __extends(ContactsNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function ContactsNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'contactGroup', elementRef, injector) || this;
        _this.overflowClick = new core.EventEmitter();
        return _this;
    }
    return ContactsNg1Component;
}(_static.UpgradeComponent));
ContactsNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'contact-group'
            },] },
];
/**
 * @nocollapse
 */
ContactsNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
ContactsNg1Component.propDecorators = {
    'contacts': [{ type: core.Input },],
    'organization': [{ type: core.Input },],
    'size': [{ type: core.Input },],
    'colors': [{ type: core.Input },],
    'maxContacts': [{ type: core.Input },],
    'overflowClick': [{ type: core.Output },],
};
var ExpandInputNg1Component = (function (_super) {
    __extends(ExpandInputNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function ExpandInputNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'expandInput', elementRef, injector) || this;
        _this.focus = new core.EventEmitter();
        return _this;
    }
    return ExpandInputNg1Component;
}(_static.UpgradeComponent));
ExpandInputNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'expand-input'
            },] },
];
/**
 * @nocollapse
 */
ExpandInputNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
ExpandInputNg1Component.propDecorators = {
    'elname': [{ type: core.Input },],
    'placeHolder': [{ type: core.Input },],
    'className': [{ type: core.Input },],
    'clearTextIcon': [{ type: core.Input },],
    'closeSearch': [{ type: core.Input },],
    'expandAlways': [{ type: core.Input },],
    'onEnter': [{ type: core.Input },],
    'focus': [{ type: core.Output },],
};
var FloatingActionButtonNg1Component = (function (_super) {
    __extends(FloatingActionButtonNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function FloatingActionButtonNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'floatingActionButton', elementRef, injector) || this;
        _this.items = [];
        return _this;
    }
    return FloatingActionButtonNg1Component;
}(_static.UpgradeComponent));
FloatingActionButtonNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'floating-action-button'
            },] },
];
/**
 * @nocollapse
 */
FloatingActionButtonNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
FloatingActionButtonNg1Component.propDecorators = {
    'items': [{ type: core.Input },],
    'primary': [{ type: core.Input },],
    'direction': [{ type: core.Input },],
    'fabTooltip': [{ type: core.Input },],
    'fabTooltipPlacement': [{ type: core.Input },],
};
var FlotNg1Component = (function (_super) {
    __extends(FlotNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function FlotNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'uxFlotNg1', elementRef, injector) || this;
        _this.onPlotClick = new core.EventEmitter();
        _this.onPlotHover = new core.EventEmitter();
        return _this;
    }
    return FlotNg1Component;
}(_static.UpgradeComponent));
FlotNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'flot'
            },] },
];
/**
 * @nocollapse
 */
FlotNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
FlotNg1Component.propDecorators = {
    'dataset': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'callback': [{ type: core.Input },],
    'donutLabels': [{ type: core.Input },],
    'onPlotClick': [{ type: core.Output },],
    'onPlotHover': [{ type: core.Output },],
};
var GridNg1Component = (function (_super) {
    __extends(GridNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function GridNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'grid', elementRef, injector) || this;
        _this.source = [];
        _this.columns = [];
        return _this;
    }
    return GridNg1Component;
}(_static.UpgradeComponent));
GridNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'grid'
            },] },
];
/**
 * @nocollapse
 */
GridNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
GridNg1Component.propDecorators = {
    'source': [{ type: core.Input },],
    'columns': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'events': [{ type: core.Input },],
    'plugins': [{ type: core.Input },],
};
var HierarchyBarNg1Component = (function (_super) {
    __extends(HierarchyBarNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function HierarchyBarNg1Component(elementRef, injector) {
        return _super.call(this, 'hierarchyBar', elementRef, injector) || this;
    }
    return HierarchyBarNg1Component;
}(_static.UpgradeComponent));
HierarchyBarNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'hierarchy-bar'
            },] },
];
/**
 * @nocollapse
 */
HierarchyBarNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
HierarchyBarNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'selectNode': [{ type: core.Input },],
    'containerClass': [{ type: core.Input },],
};
var MarqueeWizardNg1Component = (function (_super) {
    __extends(MarqueeWizardNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function MarqueeWizardNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'marqueeWizard', elementRef, injector) || this;
        _this.wizardStepsChange = new core.EventEmitter();
        return _this;
    }
    return MarqueeWizardNg1Component;
}(_static.UpgradeComponent));
MarqueeWizardNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'marquee-wizard'
            },] },
];
/**
 * @nocollapse
 */
MarqueeWizardNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
MarqueeWizardNg1Component.propDecorators = {
    'wizardIcon': [{ type: core.Input },],
    'wizardSteps': [{ type: core.Input },],
    'buttonOptions': [{ type: core.Input },],
    'onChanging': [{ type: core.Input },],
    'onFinished': [{ type: core.Input },],
    'onFinishing': [{ type: core.Input },],
    'onCanceled': [{ type: core.Input },],
    'isVisited': [{ type: core.Input },],
    'sideInfo': [{ type: core.Input },],
    'wizardStepsChange': [{ type: core.Output },],
};
var NestedDonutNg1Component = (function (_super) {
    __extends(NestedDonutNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function NestedDonutNg1Component(elementRef, injector) {
        return _super.call(this, 'uxNestedDonutNg1', elementRef, injector) || this;
    }
    return NestedDonutNg1Component;
}(_static.UpgradeComponent));
NestedDonutNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'nested-donut'
            },] },
];
/**
 * @nocollapse
 */
NestedDonutNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
NestedDonutNg1Component.propDecorators = {
    'dataset': [{ type: core.Input },],
    'options': [{ type: core.Input },],
};
var OrganizationChartNg1Component = (function (_super) {
    __extends(OrganizationChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function OrganizationChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'uxOrganizationChartNg1', elementRef, injector) || this;
        _this.dataChange = new core.EventEmitter();
        _this.optionsChange = new core.EventEmitter();
        return _this;
    }
    return OrganizationChartNg1Component;
}(_static.UpgradeComponent));
OrganizationChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'organization-chart'
            },] },
];
/**
 * @nocollapse
 */
OrganizationChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
OrganizationChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'dataChange': [{ type: core.Output },],
    'optionsChange': [{ type: core.Output },],
};
var PartitionMapNg1Component = (function (_super) {
    __extends(PartitionMapNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function PartitionMapNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPartitionMapNg1', elementRef, injector) || this;
    }
    return PartitionMapNg1Component;
}(_static.UpgradeComponent));
PartitionMapNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'partition-map'
            },] },
];
/**
 * @nocollapse
 */
PartitionMapNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
PartitionMapNg1Component.propDecorators = {
    'chartData': [{ type: core.Input },],
    'chartOptions': [{ type: core.Input },],
    'chartLoading': [{ type: core.Input },],
};
var PeityBarChartNg1Component = (function (_super) {
    __extends(PeityBarChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function PeityBarChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityBarChartNg1', elementRef, injector) || this;
    }
    return PeityBarChartNg1Component;
}(_static.UpgradeComponent));
PeityBarChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'bar-chart'
            },] },
];
/**
 * @nocollapse
 */
PeityBarChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
PeityBarChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
};
var PeityLineChartNg1Component = (function (_super) {
    __extends(PeityLineChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function PeityLineChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityLineChartNg1', elementRef, injector) || this;
    }
    return PeityLineChartNg1Component;
}(_static.UpgradeComponent));
PeityLineChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'line-chart'
            },] },
];
/**
 * @nocollapse
 */
PeityLineChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
PeityLineChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
};
var PeityPieChartNg1Component = (function (_super) {
    __extends(PeityPieChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function PeityPieChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityPieChartNg1', elementRef, injector) || this;
    }
    return PeityPieChartNg1Component;
}(_static.UpgradeComponent));
PeityPieChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'pie-chart'
            },] },
];
/**
 * @nocollapse
 */
PeityPieChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
PeityPieChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
};
var PeityUpdatingLineChartNg1Component = (function (_super) {
    __extends(PeityUpdatingLineChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function PeityUpdatingLineChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxPeityUpdatingLineChartNg1', elementRef, injector) || this;
    }
    return PeityUpdatingLineChartNg1Component;
}(_static.UpgradeComponent));
PeityUpdatingLineChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'updating-line-chart'
            },] },
];
/**
 * @nocollapse
 */
PeityUpdatingLineChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
PeityUpdatingLineChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'method': [{ type: core.Input },],
    'updateinterval': [{ type: core.Input },],
};
var SankeyNg1Component = (function (_super) {
    __extends(SankeyNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SankeyNg1Component(elementRef, injector) {
        return _super.call(this, 'uxSankeyNg1', elementRef, injector) || this;
    }
    return SankeyNg1Component;
}(_static.UpgradeComponent));
SankeyNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'sankey'
            },] },
];
/**
 * @nocollapse
 */
SankeyNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SankeyNg1Component.propDecorators = {
    'chartSize': [{ type: core.Input },],
    'chartData': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'click': [{ type: core.Input },],
};
var SearchToolbarNg1Component = (function (_super) {
    __extends(SearchToolbarNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SearchToolbarNg1Component(elementRef, injector) {
        return _super.call(this, 'searchToolbar', elementRef, injector) || this;
    }
    return SearchToolbarNg1Component;
}(_static.UpgradeComponent));
SearchToolbarNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'search-toolbar'
            },] },
];
/**
 * @nocollapse
 */
SearchToolbarNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SearchToolbarNg1Component.propDecorators = {
    'searchTypeahead': [{ type: core.Input },],
    'placeHolder': [{ type: core.Input },],
    'closeSearch': [{ type: core.Input },],
    'onSearch': [{ type: core.Input },],
    'onFocus': [{ type: core.Input },],
};
var SelectTableNg1Component = (function (_super) {
    __extends(SelectTableNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SelectTableNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'selectTable', elementRef, injector) || this;
        _this.selectedChange = new core.EventEmitter();
        return _this;
    }
    return SelectTableNg1Component;
}(_static.UpgradeComponent));
SelectTableNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'select-table'
            },] },
];
/**
 * @nocollapse
 */
SelectTableNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SelectTableNg1Component.propDecorators = {
    'values': [{ type: core.Input },],
    'multipleSelect': [{ type: core.Input },],
    'selectKey': [{ type: core.Input },],
    'selected': [{ type: core.Input },],
    'searchText': [{ type: core.Input },],
    'tableHeight': [{ type: core.Input },],
    'selectHiddenItems': [{ type: core.Input },],
    'selectedChange': [{ type: core.Output },],
};
var SLIDER_CHART_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return SliderChartNg1Component; }),
    multi: true
};
var SliderChartNg1Component = (function (_super) {
    __extends(SliderChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SliderChartNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'sliderChart', elementRef, injector) || this;
        _this.ngModelChange = new core.EventEmitter();
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    SliderChartNg1Component.prototype.writeValue = function (obj) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnChange = function (fn) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    SliderChartNg1Component.prototype.registerOnTouched = function (fn) { };
    return SliderChartNg1Component;
}(_static.UpgradeComponent));
SliderChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'slider-chart',
                providers: [SLIDER_CHART_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
SliderChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SliderChartNg1Component.propDecorators = {
    'sliderOptions': [{ type: core.Input },],
    'ngModel': [{ type: core.Input },],
    'chartOptions': [{ type: core.Input },],
    'chartData': [{ type: core.Input },],
    'ngModelChange': [{ type: core.Output },],
};
var SocialChartNg1Component = (function (_super) {
    __extends(SocialChartNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SocialChartNg1Component(elementRef, injector) {
        return _super.call(this, 'uxSocialChartNg1', elementRef, injector) || this;
    }
    return SocialChartNg1Component;
}(_static.UpgradeComponent));
SocialChartNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'social-chart'
            },] },
];
/**
 * @nocollapse
 */
SocialChartNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SocialChartNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'width': [{ type: core.Input },],
    'height': [{ type: core.Input },],
    'api': [{ type: core.Input },],
    'communities': [{ type: core.Input },],
    'detailStyle': [{ type: core.Input },],
    'popoverStyle': [{ type: core.Input },],
    'nodeDetail': [{ type: core.Input },],
    'edgeDetail': [{ type: core.Input },],
    'nodePopover': [{ type: core.Input },],
    'edgePopover': [{ type: core.Input },],
    'forceAtlasDuration': [{ type: core.Input },],
    'nodeSizeAttribute': [{ type: core.Input },],
    'startMaximized': [{ type: core.Input },],
    'startMaximised': [{ type: core.Input },],
    'showMaximizeControl': [{ type: core.Input },],
    'showMaximiseControl': [{ type: core.Input },],
    'socialChartContainer': [{ type: core.Input },],
    'fullscreenButtonPosition': [{ type: core.Input },],
    'localStrings': [{ type: core.Input },],
    'chartTitle': [{ type: core.Input },],
    'titleDisplayTime': [{ type: core.Input },],
    'edgeWeightInfluence': [{ type: core.Input },],
    'minLabels': [{ type: core.Input },],
};
var SortDirectionToggleNg1Component = (function (_super) {
    __extends(SortDirectionToggleNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function SortDirectionToggleNg1Component(elementRef, injector) {
        return _super.call(this, 'sortDirectionToggle', elementRef, injector) || this;
    }
    return SortDirectionToggleNg1Component;
}(_static.UpgradeComponent));
SortDirectionToggleNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'sort-direction-toggle'
            },] },
];
/**
 * @nocollapse
 */
SortDirectionToggleNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
SortDirectionToggleNg1Component.propDecorators = {
    'label': [{ type: core.Input },],
    'sorters': [{ type: core.Input },],
    'descend': [{ type: core.Input },],
};
var TreeGridNg1Component = (function (_super) {
    __extends(TreeGridNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function TreeGridNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'treegrid', elementRef, injector) || this;
        _this.optionsChange = new core.EventEmitter();
        _this.selectedChange = new core.EventEmitter();
        _this.currentRowChange = new core.EventEmitter();
        _this.treeDataChange = new core.EventEmitter();
        return _this;
    }
    return TreeGridNg1Component;
}(_static.UpgradeComponent));
TreeGridNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'treegrid'
            },] },
];
/**
 * @nocollapse
 */
TreeGridNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
TreeGridNg1Component.propDecorators = {
    'data': [{ type: core.Input },],
    'columns': [{ type: core.Input },],
    'treeData': [{ type: core.Input },],
    'selected': [{ type: core.Input },],
    'currentRow': [{ type: core.Input },],
    'options': [{ type: core.Input },],
    'optionsChange': [{ type: core.Output },],
    'selectedChange': [{ type: core.Output },],
    'currentRowChange': [{ type: core.Output },],
    'treeDataChange': [{ type: core.Output },],
};
var ThumbnailNg1Component = (function (_super) {
    __extends(ThumbnailNg1Component, _super);
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    function ThumbnailNg1Component(elementRef, injector) {
        return _super.call(this, 'thumbnail', elementRef, injector) || this;
    }
    return ThumbnailNg1Component;
}(_static.UpgradeComponent));
ThumbnailNg1Component.decorators = [
    { type: core.Directive, args: [{
                selector: 'thumbnail'
            },] },
];
/**
 * @nocollapse
 */
ThumbnailNg1Component.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
]; };
ThumbnailNg1Component.propDecorators = {
    'url': [{ type: core.Input },],
    'show': [{ type: core.Input },],
    'width': [{ type: core.Input },],
    'height': [{ type: core.Input },],
};
var NavigationMenuService = (function () {
    /**
     * @param {?} _navigationMenuService
     */
    function NavigationMenuService(_navigationMenuService) {
        this._navigationMenuService = _navigationMenuService;
    }
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.show = function () {
        this._navigationMenuService.show();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.hide = function () {
        this._navigationMenuService.hide();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.visible = function () {
        return this._navigationMenuService.visible();
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.collapseAtWidth = function () {
        return this._navigationMenuService.collapseAtWidth();
    };
    /**
     * @param {?} width
     * @return {?}
     */
    NavigationMenuService.prototype.setCollapseAtWidth = function (width) {
        this._navigationMenuService.setCollapseAtWidth(width);
    };
    /**
     * @return {?}
     */
    NavigationMenuService.prototype.setDefaultCollapseAtWidth = function () {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    };
    return NavigationMenuService;
}());
NavigationMenuService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
NavigationMenuService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: ['$navigationMenu',] },] },
]; };
/**
 * @param {?} injector
 * @return {?}
 */
function navigationMenuServiceFactory(injector) {
    return injector.get('$navigationMenu');
}
var navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};
var PdfService = (function () {
    /**
     * @param {?} _pdfService
     */
    function PdfService(_pdfService) {
        this._pdfService = _pdfService;
    }
    /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    PdfService.prototype.createTable = function (columns, rows, options) {
        if (options === void 0) { options = {}; }
        return this._pdfService.createTable(columns, rows, options);
    };
    return PdfService;
}());
PdfService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
PdfService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: ['$pdf',] },] },
]; };
/**
 * @param {?} injector
 * @return {?}
 */
function pdfServiceFactory(injector) {
    return injector.get('$pdf');
}
var pdfServiceProvider = {
    provide: '$pdf',
    useFactory: pdfServiceFactory,
    deps: ['$injector']
};
var TimeAgoService = (function () {
    /**
     * @param {?} _timeAgoService
     */
    function TimeAgoService(_timeAgoService) {
        this._timeAgoService = _timeAgoService;
    }
    /**
     * @param {?} strings
     * @return {?}
     */
    TimeAgoService.prototype.setStrings = function (strings) {
        this._timeAgoService.setStrings(strings);
    };
    /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    TimeAgoService.prototype.timeSince = function (past, present) {
        return this._timeAgoService.timeSince(past, present);
    };
    /**
     * @param {?} moment
     * @return {?}
     */
    TimeAgoService.prototype.timeSinceNow = function (moment) {
        return this._timeAgoService.timeSinceNow(moment);
    };
    return TimeAgoService;
}());
TimeAgoService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
TimeAgoService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: ['timeAgoService',] },] },
]; };
/**
 * @param {?} injector
 * @return {?}
 */
function timeAgoServiceFactory(injector) {
    return injector.get('timeAgoService');
}
var timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};
var declarations = [
    ContactsNg1Component,
    ExpandInputNg1Component,
    FloatingActionButtonNg1Component,
    FlotNg1Component,
    GridNg1Component,
    HierarchyBarNg1Component,
    MarqueeWizardNg1Component,
    NestedDonutNg1Component,
    OrganizationChartNg1Component,
    PartitionMapNg1Component,
    PeityBarChartNg1Component,
    PeityLineChartNg1Component,
    PeityPieChartNg1Component,
    PeityUpdatingLineChartNg1Component,
    SankeyNg1Component,
    SearchToolbarNg1Component,
    SelectTableNg1Component,
    SliderChartNg1Component,
    SocialChartNg1Component,
    SortDirectionToggleNg1Component,
    TreeGridNg1Component,
    ThumbnailNg1Component,
];
var HybridModule = (function () {
    function HybridModule() {
    }
    return HybridModule;
}());
HybridModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [],
                exports: declarations,
                declarations: declarations,
                providers: [
                    navigationMenuServiceProvider,
                    pdfServiceProvider,
                    timeAgoServiceProvider,
                    TimeAgoService,
                    PdfService,
                    NavigationMenuService,
                ],
            },] },
];
/**
 * @nocollapse
 */
HybridModule.ctorParameters = function () { return []; };

exports.BreadcrumbsComponent = BreadcrumbsComponent;
exports.BreadcrumbsModule = BreadcrumbsModule;
exports.CheckboxModule = CheckboxModule;
exports.CHECKBOX_VALUE_ACCESSOR = CHECKBOX_VALUE_ACCESSOR;
exports.CheckboxComponent = CheckboxComponent;
exports.ColumnSortingModule = ColumnSortingModule;
exports.ColumnSortingComponent = ColumnSortingComponent;
exports.ColumnSortingState = ColumnSortingState;
exports.ColumnSortingDirective = ColumnSortingDirective;
exports.DashboardModule = DashboardModule;
exports.DashboardComponent = DashboardComponent;
exports.DashboardService = DashboardService;
exports.defaultOptions = defaultOptions;
exports.ActionDirection = ActionDirection;
exports.Rounding = Rounding;
exports.DashboardDragHandleDirective = DashboardDragHandleDirective;
exports.DashboardWidgetComponent = DashboardWidgetComponent;
exports.DateTimePickerModule = DateTimePickerModule;
exports.DateTimePickerComponent = DateTimePickerComponent;
exports.DatePickerMode = DatePickerMode;
exports.DateTimePickerDayViewComponent = DateTimePickerDayViewComponent;
exports.DateTimePickerMonthViewComponent = DateTimePickerMonthViewComponent;
exports.DateTimePickerYearViewComponent = DateTimePickerYearViewComponent;
exports.DateTimePickerTimeViewComponent = DateTimePickerTimeViewComponent;
exports.DatePickerMeridian = DatePickerMeridian;
exports.DateTimePickerHeaderComponent = DateTimePickerHeaderComponent;
exports.DateTimePickerConfig = DateTimePickerConfig;
exports.EboxModule = EboxModule;
exports.EboxComponent = EboxComponent;
exports.EboxHeaderDirective = EboxHeaderDirective;
exports.EboxContentDirective = EboxContentDirective;
exports.FacetsModule = FacetsModule;
exports.FacetContainerComponent = FacetContainerComponent;
exports.FacetSelect = FacetSelect;
exports.FacetDeselect = FacetDeselect;
exports.FacetDeselectAll = FacetDeselectAll;
exports.FacetHeaderComponent = FacetHeaderComponent;
exports.FacetBaseComponent = FacetBaseComponent;
exports.FacetCheckListComponent = FacetCheckListComponent;
exports.FacetTypeaheadListComponent = FacetTypeaheadListComponent;
exports.FacetTypeaheadHighlight = FacetTypeaheadHighlight;
exports.Facet = Facet;
exports.FilterModule = FilterModule;
exports.FilterContainerComponent = FilterContainerComponent;
exports.FilterAddEvent = FilterAddEvent;
exports.FilterRemoveEvent = FilterRemoveEvent;
exports.FilterRemoveAllEvent = FilterRemoveAllEvent;
exports.FilterBaseComponent = FilterBaseComponent;
exports.FilterDropdownComponent = FilterDropdownComponent;
exports.FilterDynamicComponent = FilterDynamicComponent;
exports.FlippableCardModule = FlippableCardModule;
exports.FlippableCardComponent = FlippableCardComponent;
exports.FlippableCardFrontDirective = FlippableCardFrontDirective;
exports.FlippableCardBackDirective = FlippableCardBackDirective;
exports.FloatingActionButtonsModule = FloatingActionButtonsModule;
exports.FloatingActionButtonsComponent = FloatingActionButtonsComponent;
exports.FloatingActionButtonComponent = FloatingActionButtonComponent;
exports.ItemDisplayPanelModule = ItemDisplayPanelModule;
exports.ItemDisplayPanelContentDirective = ItemDisplayPanelContentDirective;
exports.ItemDisplayPanelFooterDirective = ItemDisplayPanelFooterDirective;
exports.ItemDisplayPanelComponent = ItemDisplayPanelComponent;
exports.MarqueeWizardModule = MarqueeWizardModule;
exports.MarqueeWizardComponent = MarqueeWizardComponent;
exports.NavigationModule = NavigationModule;
exports.NavigationComponent = NavigationComponent;
exports.NavigationItemComponent = NavigationItemComponent;
exports.NotificationModule = NotificationModule;
exports.NotificationService = NotificationService;
exports.NotificationListComponent = NotificationListComponent;
exports.NumberPickerModule = NumberPickerModule;
exports.NUMBER_PICKER_VALUE_ACCESSOR = NUMBER_PICKER_VALUE_ACCESSOR;
exports.NumberPickerComponent = NumberPickerComponent;
exports.PageHeaderModule = PageHeaderModule;
exports.PageHeaderComponent = PageHeaderComponent;
exports.PageHeaderNavigationComponent = PageHeaderNavigationComponent;
exports.PageHeaderIconMenuComponent = PageHeaderIconMenuComponent;
exports.PageHeaderCustomMenuDirective = PageHeaderCustomMenuDirective;
exports.ProgressBarModule = ProgressBarModule;
exports.ProgressBarComponent = ProgressBarComponent;
exports.RadioButtonModule = RadioButtonModule;
exports.RADIOBUTTON_VALUE_ACCESSOR = RADIOBUTTON_VALUE_ACCESSOR;
exports.RadioButtonComponent = RadioButtonComponent;
exports.SearchBuilderGroupComponent = SearchBuilderGroupComponent;
exports.SearchBuilderGroupService = SearchBuilderGroupService;
exports.SearchBuilderOutletDirective = SearchBuilderOutletDirective;
exports.BaseSearchComponent = BaseSearchComponent;
exports.SearchTextComponent = SearchTextComponent;
exports.SearchDateComponent = SearchDateComponent;
exports.SearchDateRangeComponent = SearchDateRangeComponent;
exports.SearchSelectComponent = SearchSelectComponent;
exports.SearchBuilderComponent = SearchBuilderComponent;
exports.SearchBuilderService = SearchBuilderService;
exports.SearchBuilderModule = SearchBuilderModule;
exports.SELECT_VALUE_ACCESSOR = SELECT_VALUE_ACCESSOR;
exports.SelectComponent = SelectComponent;
exports.SelectModule = SelectModule;
exports.SliderModule = SliderModule;
exports.SliderComponent = SliderComponent;
exports.SliderType = SliderType;
exports.SliderStyle = SliderStyle;
exports.SliderSize = SliderSize;
exports.SliderCalloutTrigger = SliderCalloutTrigger;
exports.SliderSnap = SliderSnap;
exports.SliderTickType = SliderTickType;
exports.SliderThumbEvent = SliderThumbEvent;
exports.SliderThumb = SliderThumb;
exports.SparkModule = SparkModule;
exports.SparkComponent = SparkComponent;
exports.TagInputEvent = TagInputEvent;
exports.TagInputComponent = TagInputComponent;
exports.TagInputModule = TagInputModule;
exports.TimelineModule = TimelineModule;
exports.TimelineComponent = TimelineComponent;
exports.TimelineEventComponent = TimelineEventComponent;
exports.ToggleSwitchModule = ToggleSwitchModule;
exports.ToggleSwitchComponent = ToggleSwitchComponent;
exports.TypeaheadOptionEvent = TypeaheadOptionEvent;
exports.TypeaheadKeyService = TypeaheadKeyService;
exports.TypeaheadComponent = TypeaheadComponent;
exports.TypeaheadModule = TypeaheadModule$1;
exports.MediaPlayerModule = MediaPlayerModule;
exports.MediaPlayerComponent = MediaPlayerComponent;
exports.MediaPlayerBaseExtensionDirective = MediaPlayerBaseExtensionDirective;
exports.MediaPlayerControlsExtensionComponent = MediaPlayerControlsExtensionComponent;
exports.MediaPlayerTimelineExtensionComponent = MediaPlayerTimelineExtensionComponent;
exports.VirtualScrollModule = VirtualScrollModule;
exports.VirtualScrollComponent = VirtualScrollComponent;
exports.VirtualScrollLoadingDirective = VirtualScrollLoadingDirective;
exports.VirtualScrollLoadButtonDirective = VirtualScrollLoadButtonDirective;
exports.VirtualScrollCellDirective = VirtualScrollCellDirective;
exports.WizardModule = WizardModule;
exports.WizardComponent = WizardComponent;
exports.StepChangingEvent = StepChangingEvent;
exports.WizardStepComponent = WizardStepComponent;
exports.DragModule = DragModule;
exports.DragDirective = DragDirective;
exports.FixedHeaderTableModule = FixedHeaderTableModule;
exports.FixedHeaderTableDirective = FixedHeaderTableDirective;
exports.FocusIfDirective = FocusIfDirective;
exports.FocusIfModule = FocusIfModule;
exports.HelpCenterModule = HelpCenterModule;
exports.HelpCenterService = HelpCenterService;
exports.HelpCenterItemDirective = HelpCenterItemDirective;
exports.HoverActionModule = HoverActionModule;
exports.HoverActionContainerDirective = HoverActionContainerDirective;
exports.HoverActionDirective = HoverActionDirective;
exports.InfiniteScrollDirective = InfiniteScrollDirective;
exports.InfiniteScrollLoadingEvent = InfiniteScrollLoadingEvent;
exports.InfiniteScrollLoadedEvent = InfiniteScrollLoadedEvent;
exports.InfiniteScrollLoadErrorEvent = InfiniteScrollLoadErrorEvent;
exports.InfiniteScrollLoadButtonDirective = InfiniteScrollLoadButtonDirective;
exports.InfiniteScrollLoadingDirective = InfiniteScrollLoadingDirective;
exports.InfiniteScrollModule = InfiniteScrollModule;
exports.LayoutSwitcherModule = LayoutSwitcherModule;
exports.LayoutSwitcherDirective = LayoutSwitcherDirective;
exports.LayoutSwitcherItemDirective = LayoutSwitcherItemDirective;
exports.ResizeService = ResizeService;
exports.ResizeDirective = ResizeDirective;
exports.ResizeModule = ResizeModule;
exports.ScrollIntoViewIfDirective = ScrollIntoViewIfDirective;
exports.ScrollIntoViewService = ScrollIntoViewService;
exports.ScrollIntoViewIfModule = ScrollIntoViewIfModule;
exports.DurationPipeModule = DurationPipeModule;
exports.DurationPipe = DurationPipe;
exports.FileSizePipeModule = FileSizePipeModule;
exports.FileSizePipe = FileSizePipe;
exports.StringFilterPipe = StringFilterPipe;
exports.StringFilterModule = StringFilterModule;
exports.AudioServiceModule = AudioServiceModule;
exports.AudioService = AudioService;
exports.ColorServiceModule = ColorServiceModule;
exports.ColorService = ColorService;
exports.ThemeColor = ThemeColor;
exports.colorSets = colorSets;
exports.FrameExtractionModule = FrameExtractionModule;
exports.FrameExtractionService = FrameExtractionService;
exports.PersistentDataModule = PersistentDataModule;
exports.PersistentDataService = PersistentDataService;
exports.PersistentDataStorageType = PersistentDataStorageType;
exports.StorageAdapter = StorageAdapter;
exports.CookieAdapter = CookieAdapter;
exports.LocalStorageAdapter = LocalStorageAdapter;
exports.SessionStorageAdapter = SessionStorageAdapter;
exports.ContactsNg1Component = ContactsNg1Component;
exports.ExpandInputNg1Component = ExpandInputNg1Component;
exports.FloatingActionButtonNg1Component = FloatingActionButtonNg1Component;
exports.FlotNg1Component = FlotNg1Component;
exports.GridNg1Component = GridNg1Component;
exports.HierarchyBarNg1Component = HierarchyBarNg1Component;
exports.MarqueeWizardNg1Component = MarqueeWizardNg1Component;
exports.NestedDonutNg1Component = NestedDonutNg1Component;
exports.OrganizationChartNg1Component = OrganizationChartNg1Component;
exports.PartitionMapNg1Component = PartitionMapNg1Component;
exports.PeityBarChartNg1Component = PeityBarChartNg1Component;
exports.PeityLineChartNg1Component = PeityLineChartNg1Component;
exports.PeityPieChartNg1Component = PeityPieChartNg1Component;
exports.PeityUpdatingLineChartNg1Component = PeityUpdatingLineChartNg1Component;
exports.SankeyNg1Component = SankeyNg1Component;
exports.SearchToolbarNg1Component = SearchToolbarNg1Component;
exports.SelectTableNg1Component = SelectTableNg1Component;
exports.SLIDER_CHART_VALUE_ACCESSOR = SLIDER_CHART_VALUE_ACCESSOR;
exports.SliderChartNg1Component = SliderChartNg1Component;
exports.SocialChartNg1Component = SocialChartNg1Component;
exports.SortDirectionToggleNg1Component = SortDirectionToggleNg1Component;
exports.TreeGridNg1Component = TreeGridNg1Component;
exports.ThumbnailNg1Component = ThumbnailNg1Component;
exports.NavigationMenuService = NavigationMenuService;
exports.navigationMenuServiceFactory = navigationMenuServiceFactory;
exports.navigationMenuServiceProvider = navigationMenuServiceProvider;
exports.PdfService = PdfService;
exports.pdfServiceFactory = pdfServiceFactory;
exports.pdfServiceProvider = pdfServiceProvider;
exports.TimeAgoService = TimeAgoService;
exports.timeAgoServiceFactory = timeAgoServiceFactory;
exports.timeAgoServiceProvider = timeAgoServiceProvider;
exports.HybridModule = HybridModule;
exports.ɵc = DateTimePickerService;
exports.ɵd = FloatingActionButtonsService;
exports.ɵf = MarqueeWizardStepComponent;
exports.ɵe = MarqueeWizardService;
exports.ɵi = MediaPlayerService;
exports.ɵh = PageHeaderNavigationDropdownItemComponent;
exports.ɵg = PageHeaderNavigationItemComponent;
exports.ɵj = HoverActionService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ux-aspects.umd.js.map
