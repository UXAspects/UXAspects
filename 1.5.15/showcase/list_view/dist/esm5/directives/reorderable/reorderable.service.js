/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { dragula } from './dragula';
var ReorderableService = (function () {
    function ReorderableService() {
        this._groups = {};
        this._uniqueGroupId = 0;
    }
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     */
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    ReorderableService.prototype.getUniqueGroupName = /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    function () {
        return '_uxReorderable_' + this._uniqueGroupId++;
    };
    /**
     * Adds the container to the named group.
     */
    /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    ReorderableService.prototype.register = /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    function (groupName, container) {
        if (!this._groups[groupName]) {
            this._groups[groupName] = new ReorderableGroup();
        }
        this._groups[groupName].register(container);
        return this._groups[groupName];
    };
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     */
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    ReorderableService.prototype.unregister = /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    function (groupName, container) {
        var /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.unregister(container);
            if (group.isEmpty()) {
                group.destroy();
                delete this._groups[groupName];
            }
        }
    };
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    ReorderableService.prototype.initialize = /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    function (groupName) {
        var /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.initialize();
        }
        return group;
    };
    /**
     * Returns the group object for the given name.
     */
    /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    ReorderableService.prototype.getGroup = /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return this._groups[group];
    };
    ReorderableService.decorators = [
        { type: Injectable },
    ];
    return ReorderableService;
}());
export { ReorderableService };
function ReorderableService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReorderableService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReorderableService.ctorParameters;
    /** @type {?} */
    ReorderableService.prototype._groups;
    /** @type {?} */
    ReorderableService.prototype._uniqueGroupId;
}
/**
 * @record
 */
export function ReorderableContainer() { }
function ReorderableContainer_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableContainer.prototype.element;
    /** @type {?} */
    ReorderableContainer.prototype.getModelFromElement;
    /** @type {?} */
    ReorderableContainer.prototype.canMove;
}
/**
 * @record
 */
export function ReorderableDragEvent() { }
function ReorderableDragEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableDragEvent.prototype.model;
    /** @type {?} */
    ReorderableDragEvent.prototype.element;
    /** @type {?} */
    ReorderableDragEvent.prototype.source;
}
/**
 * @record
 */
export function ReorderableDragEndEvent() { }
function ReorderableDragEndEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableDragEndEvent.prototype.model;
    /** @type {?} */
    ReorderableDragEndEvent.prototype.element;
}
/**
 * @record
 */
export function ReorderableDropEvent() { }
function ReorderableDropEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableDropEvent.prototype.model;
    /** @type {?} */
    ReorderableDropEvent.prototype.element;
    /** @type {?} */
    ReorderableDropEvent.prototype.target;
    /** @type {?} */
    ReorderableDropEvent.prototype.source;
    /** @type {?} */
    ReorderableDropEvent.prototype.sibling;
}
/**
 * @record
 */
export function ReorderableCancelEvent() { }
function ReorderableCancelEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableCancelEvent.prototype.model;
    /** @type {?} */
    ReorderableCancelEvent.prototype.element;
}
/**
 * @record
 */
export function ReorderableClonedEvent() { }
function ReorderableClonedEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableClonedEvent.prototype.clone;
    /** @type {?} */
    ReorderableClonedEvent.prototype.element;
    /** @type {?} */
    ReorderableClonedEvent.prototype.type;
}
/**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
var /**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
ReorderableGroup = (function () {
    function ReorderableGroup() {
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.drop = new EventEmitter();
        this.cancel = new EventEmitter();
        this.cloned = new EventEmitter();
        this._containers = [];
        this._config = {
            moves: this.canMove.bind(this)
        };
    }
    /**
     * Returns true if there are no containers registered with the group.
     */
    /**
     * Returns true if there are no containers registered with the group.
     * @return {?}
     */
    ReorderableGroup.prototype.isEmpty = /**
     * Returns true if there are no containers registered with the group.
     * @return {?}
     */
    function () {
        return this._containers.length === 0;
    };
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     */
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    ReorderableGroup.prototype.getModelForElement = /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        try {
            for (var _a = tslib_1.__values(this._containers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var container = _b.value;
                var /** @type {?} */ model = container.getModelFromElement(element);
                if (model) {
                    return model;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
        var e_1, _c;
    };
    /**
     * Adds the container to the group.
     */
    /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    ReorderableGroup.prototype.register = /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    function (container) {
        this._containers.push(container);
        if (this._instance) {
            this._instance.containers = this._containers.map(function (c) { return c.element; });
        }
        if (!this._config.mirrorContainer) {
            this._config.mirrorContainer = container.element;
        }
    };
    /**
     * Removes the container from the group.
     */
    /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    ReorderableGroup.prototype.unregister = /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    function (container) {
        var /** @type {?} */ index = this._containers.indexOf(container);
        if (index >= 0) {
            this._containers.splice(index, 1);
            if (this._instance) {
                this._instance.containers = this._containers.map(function (c) { return c.element; });
            }
        }
    };
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    ReorderableGroup.prototype.initialize = /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._instance) {
            return;
        }
        this._instance = dragula(this._containers.map(function (c) { return c.element; }), this._config);
        this._instance.on('drag', function (element, source) {
            _this.drag.emit({
                model: _this.getModelForElement(element),
                element: element,
                source: source
            });
        });
        this._instance.on('dragend', function (element) {
            _this.dragEnd.emit({
                model: _this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('drop', function (element, target, source, sibling) {
            _this.drop.emit({
                model: _this.getModelForElement(element),
                element: element,
                target: target,
                source: source,
                sibling: sibling
            });
        });
        this._instance.on('cancel', function (element) {
            _this.cancel.emit({
                model: _this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('cloned', function (clone, element, type) {
            _this.cloned.emit({
                clone: clone,
                element: element,
                type: type
            });
        });
    };
    /**
     * Destroys the dragula instance.
     */
    /**
     * Destroys the dragula instance.
     * @return {?}
     */
    ReorderableGroup.prototype.destroy = /**
     * Destroys the dragula instance.
     * @return {?}
     */
    function () {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    };
    /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    ReorderableGroup.prototype.canMove = /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    function (element, containerElement, handle) {
        try {
            for (var _a = tslib_1.__values(this._containers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var container = _b.value;
                if (container.element.isSameNode(containerElement)) {
                    return container.canMove(element, containerElement, handle);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _c;
    };
    return ReorderableGroup;
}());
/**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
export { ReorderableGroup };
function ReorderableGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    ReorderableGroup.prototype.drag;
    /** @type {?} */
    ReorderableGroup.prototype.dragEnd;
    /** @type {?} */
    ReorderableGroup.prototype.drop;
    /** @type {?} */
    ReorderableGroup.prototype.cancel;
    /** @type {?} */
    ReorderableGroup.prototype.cloned;
    /** @type {?} */
    ReorderableGroup.prototype._instance;
    /** @type {?} */
    ReorderableGroup.prototype._containers;
    /** @type {?} */
    ReorderableGroup.prototype._config;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7dUJBS3FCLEVBQUU7OEJBQzlCLENBQUM7O0lBRTFCOztPQUVHOzs7OztJQUNILCtDQUFrQjs7OztJQUFsQjtRQUNJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDcEQ7SUFFRDs7T0FFRzs7Ozs7OztJQUNILHFDQUFROzs7Ozs7SUFBUixVQUFTLFNBQWlCLEVBQUUsU0FBK0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx1Q0FBVTs7Ozs7O0lBQVYsVUFBVyxTQUFpQixFQUFFLFNBQStCO1FBRXpELHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMs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QU87Ozs7Ozs7Y0FBQyxPQUFnQixFQUFFLGdCQUF5QixFQUFFLE1BQWU7O1lBQ3hFLEdBQUcsQ0FBQyxDQUFrQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQSxnQkFBQTtnQkFBakMsSUFBSSxTQUFTLFdBQUE7Z0JBQ2QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDL0Q7YUFDSjs7Ozs7Ozs7Ozs7MkJBaFBUO0lBa1BDLENBQUE7Ozs7QUFwSUQsNEJBb0lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFrZSwgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICdkcmFndWxhJztcbmltcG9ydCB7IGRyYWd1bGEgfSBmcm9tICcuL2RyYWd1bGEnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2dyb3VwczogeyBbazogc3RyaW5nXTogUmVvcmRlcmFibGVHcm91cCB9ID0ge307XG4gICAgcHJpdmF0ZSBfdW5pcXVlR3JvdXBJZCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdW5pcXVlIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBhcyBhIGdyb3VwIG5hbWUgaWYgb25lIHdhcyBub3QgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBnZXRVbmlxdWVHcm91cE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdfdXhSZW9yZGVyYWJsZV8nICsgdGhpcy5fdW5pcXVlR3JvdXBJZCsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvbnRhaW5lciB0byB0aGUgbmFtZWQgZ3JvdXAuXG4gICAgICovXG4gICAgcmVnaXN0ZXIoZ3JvdXBOYW1lOiBzdHJpbmcsIGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2dyb3Vwc1tncm91cE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXSA9IG5ldyBSZW9yZGVyYWJsZUdyb3VwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXS5yZWdpc3Rlcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBjb250YWluZXIgZnJvbSB0aGUgbmFtZWQgZ3JvdXAuIElmIGl0IHdhcyB0aGUgbGFzdCBjb250YWluZXIgaW4gdGhlIGdyb3VwLCBkZXN0cm95cyB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgdW5yZWdpc3Rlcihncm91cE5hbWU6IHN0cmluZywgY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC51bnJlZ2lzdGVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGlmIChncm91cC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBncm91cC5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkcmFndWxhIGluc3RhbmNlIHdpdGggdGhlIGN1cnJlbnQgY29uZmlnIGFuZCBhdHRhY2hlcyB0aGUgZXZlbnRzLCBpZiBub3QgYWxyZWFkeSBjcmVhdGVkLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoZ3JvdXBOYW1lOiBzdHJpbmcpOiBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuXG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdyb3VwIG9iamVjdCBmb3IgdGhlIGdpdmVuIG5hbWUuXG4gICAgICovXG4gICAgZ2V0R3JvdXAoZ3JvdXA6IHN0cmluZyk6IFJlb3JkZXJhYmxlR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBzW2dyb3VwXTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVDb250YWluZXIge1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgZ2V0TW9kZWxGcm9tRWxlbWVudDogKGVsZW1lbnQ6IEVsZW1lbnQpID0+IGFueTtcbiAgICBjYW5Nb3ZlOiAoZWxlbWVudDogRWxlbWVudCwgY29udGFpbmVyOiBFbGVtZW50LCBoYW5kbGU6IEVsZW1lbnQpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVEcmFnRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBzb3VyY2U6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyb3BFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHRhcmdldDogRWxlbWVudDtcbiAgICBzb3VyY2U6IEVsZW1lbnQ7XG4gICAgc2libGluZzogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVDbG9uZWRFdmVudCB7XG4gICAgY2xvbmU6IEVsZW1lbnQ7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgZHJhZy1hbmQtZHJvcCBjb250YWluZXJzICh1eFJlb3JkZXJhYmxlKSB0aGF0IGl0ZW1zIGNhbiBiZSBkcmFnZ2VkIGJldHdlZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJhZ0V2ZW50PigpO1xuICAgIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJhZ0VuZEV2ZW50PigpO1xuICAgIGRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJvcEV2ZW50PigpO1xuICAgIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVDYW5jZWxFdmVudD4oKTtcbiAgICBjbG9uZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlQ2xvbmVkRXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIF9pbnN0YW5jZTogRHJha2U7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVyczogUmVvcmRlcmFibGVDb250YWluZXJbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBEcmFndWxhT3B0aW9ucyA9IHtcbiAgICAgICAgbW92ZXM6IHRoaXMuY2FuTW92ZS5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gY29udGFpbmVycyByZWdpc3RlcmVkIHdpdGggdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXJzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtb2RlbCBvYmplY3QgKHV4UmVvcmRlcmFibGVNb2RlbCkgZm9yIGFuIGVsZW1lbnRzIGluIG9uZSBvZiB0aGUgY29udGFpbmVycyBpbiB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBhbnkge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiB0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IGNvbnRhaW5lci5nZXRNb2RlbEZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29udGFpbmVyIHRvIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcnMucHVzaChjb250YWluZXIpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuY29udGFpbmVycyA9IHRoaXMuX2NvbnRhaW5lcnMubWFwKChjKSA9PiBjLmVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcubWlycm9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcubWlycm9yQ29udGFpbmVyID0gY29udGFpbmVyLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBjb250YWluZXIgZnJvbSB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgdW5yZWdpc3Rlcihjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY29udGFpbmVycy5pbmRleE9mKGNvbnRhaW5lcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5jb250YWluZXJzID0gdGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkcmFndWxhIGluc3RhbmNlIHdpdGggdGhlIGN1cnJlbnQgY29uZmlnIGFuZCBhdHRhY2hlcyB0aGUgZXZlbnRzLCBpZiBub3QgYWxyZWFkeSBjcmVhdGVkLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IGRyYWd1bGEodGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCksIHRoaXMuX2NvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2RyYWcnLCAoZWxlbWVudDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWcuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdkcm9wJywgKGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50LCBzaWJsaW5nOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgc2libGluZzogc2libGluZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignY2FuY2VsJywgKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdjbG9uZWQnLCAoY2xvbmU6IEVsZW1lbnQsIGVsZW1lbnQ6IEVsZW1lbnQsIHR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9uZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgY2xvbmU6IGNsb25lLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3lzIHRoZSBkcmFndWxhIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGNvbnRhaW5lciBmb3IgdGhlIGNvbnRhaW5lckVsZW1lbnQgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgb2YgY2FuTW92ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbk1vdmUoZWxlbWVudDogRWxlbWVudCwgY29udGFpbmVyRWxlbWVudDogRWxlbWVudCwgaGFuZGxlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lciBvZiB0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmVsZW1lbnQuaXNTYW1lTm9kZShjb250YWluZXJFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuY2FuTW92ZShlbGVtZW50LCBjb250YWluZXJFbGVtZW50LCBoYW5kbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19