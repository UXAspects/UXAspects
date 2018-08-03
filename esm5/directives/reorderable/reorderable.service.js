/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { dragula } from './dragula';
var ReorderableService = /** @class */ (function () {
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
        { type: Injectable }
    ];
    return ReorderableService;
}());
export { ReorderableService };
function ReorderableService_tsickle_Closure_declarations() {
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
ReorderableGroup = /** @class */ (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7dUJBS3FCLEVBQUU7OEJBQzlCLENBQUM7O0lBRTFCOztPQUVHOzs7OztJQUNILCtDQUFrQjs7OztJQUFsQjtRQUNJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDcEQ7SUFFRDs7T0FFRzs7Ozs7OztJQUNILHFDQUFROzs7Ozs7SUFBUixVQUFTLFNBQWlCLEVBQUUsU0FBK0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCx1Q0FBVTs7Ozs7O0lBQVYsVUFBVyxTQUFpQixFQUFFLFNBQStCO1FBRXpELHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMs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OztjQUFDLE9BQWdCLEVBQUUsZ0JBQXlCLEVBQUUsTUFBZTs7WUFDeEUsR0FBRyxDQUFDLENBQWtCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsV0FBVyxDQUFBLGdCQUFBO2dCQUFqQyxJQUFJLFNBQVMsV0FBQTtnQkFDZCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMvRDthQUNKOzs7Ozs7Ozs7OzsyQkFoUFQ7SUFrUEMsQ0FBQTs7OztBQXBJRCw0QkFvSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWtlLCBEcmFndWxhT3B0aW9ucyB9IGZyb20gJ2RyYWd1bGEnO1xuaW1wb3J0IHsgZHJhZ3VsYSB9IGZyb20gJy4vZHJhZ3VsYSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBSZW9yZGVyYWJsZUdyb3VwIH0gPSB7fTtcbiAgICBwcml2YXRlIF91bmlxdWVHcm91cElkID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB1bmlxdWUgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGFzIGEgZ3JvdXAgbmFtZSBpZiBvbmUgd2FzIG5vdCBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIGdldFVuaXF1ZUdyb3VwTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ191eFJlb3JkZXJhYmxlXycgKyB0aGlzLl91bmlxdWVHcm91cElkKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29udGFpbmVyIHRvIHRoZSBuYW1lZCBncm91cC5cbiAgICAgKi9cbiAgICByZWdpc3Rlcihncm91cE5hbWU6IHN0cmluZywgY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgICAgIGlmICghdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdID0gbmV3IFJlb3JkZXJhYmxlR3JvdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdLnJlZ2lzdGVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGNvbnRhaW5lciBmcm9tIHRoZSBuYW1lZCBncm91cC4gSWYgaXQgd2FzIHRoZSBsYXN0IGNvbnRhaW5lciBpbiB0aGUgZ3JvdXAsIGRlc3Ryb3lzIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKGdyb3VwTmFtZTogc3RyaW5nLCBjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcblxuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGdyb3VwLnVucmVnaXN0ZXIoY29udGFpbmVyKTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugd2l0aCB0aGUgY3VycmVudCBjb25maWcgYW5kIGF0dGFjaGVzIHRoZSBldmVudHMsIGlmIG5vdCBhbHJlYWR5IGNyZWF0ZWQuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZShncm91cE5hbWU6IHN0cmluZyk6IFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ3JvdXAgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbmFtZS5cbiAgICAgKi9cbiAgICBnZXRHcm91cChncm91cDogc3RyaW5nKTogUmVvcmRlcmFibGVHcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHNbZ3JvdXBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNvbnRhaW5lciB7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBnZXRNb2RlbEZyb21FbGVtZW50OiAoZWxlbWVudDogRWxlbWVudCkgPT4gYW55O1xuICAgIGNhbk1vdmU6IChlbGVtZW50OiBFbGVtZW50LCBjb250YWluZXI6IEVsZW1lbnQsIGhhbmRsZTogRWxlbWVudCkgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyYWdFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHNvdXJjZTogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyYWdFbmRFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlRHJvcEV2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBFbGVtZW50O1xuICAgIHNvdXJjZTogRWxlbWVudDtcbiAgICBzaWJsaW5nOiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlQ2FuY2VsRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNsb25lZEV2ZW50IHtcbiAgICBjbG9uZTogRWxlbWVudDtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBkcmFnLWFuZC1kcm9wIGNvbnRhaW5lcnMgKHV4UmVvcmRlcmFibGUpIHRoYXQgaXRlbXMgY2FuIGJlIGRyYWdnZWQgYmV0d2Vlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcmFnRXZlbnQ+KCk7XG4gICAgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcmFnRW5kRXZlbnQ+KCk7XG4gICAgZHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcm9wRXZlbnQ+KCk7XG4gICAgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZUNhbmNlbEV2ZW50PigpO1xuICAgIGNsb25lZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVDbG9uZWRFdmVudD4oKTtcblxuICAgIHByaXZhdGUgX2luc3RhbmNlOiBEcmFrZTtcbiAgICBwcml2YXRlIF9jb250YWluZXJzOiBSZW9yZGVyYWJsZUNvbnRhaW5lcltdID0gW107XG5cbiAgICBwcml2YXRlIF9jb25maWc6IERyYWd1bGFPcHRpb25zID0ge1xuICAgICAgICBtb3ZlczogdGhpcy5jYW5Nb3ZlLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBjb250YWluZXJzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcnMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1vZGVsIG9iamVjdCAodXhSZW9yZGVyYWJsZU1vZGVsKSBmb3IgYW4gZWxlbWVudHMgaW4gb25lIG9mIHRoZSBjb250YWluZXJzIGluIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICBnZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3QgY29udGFpbmVyIG9mIHRoaXMuX2NvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gY29udGFpbmVyLmdldE1vZGVsRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb250YWluZXIgdG8gdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5jb250YWluZXJzID0gdGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5taXJyb3JDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5taXJyb3JDb250YWluZXIgPSBjb250YWluZXIuZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGNvbnRhaW5lciBmcm9tIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jb250YWluZXJzLmluZGV4T2YoY29udGFpbmVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmNvbnRhaW5lcnMgPSB0aGlzLl9jb250YWluZXJzLm1hcCgoYykgPT4gYy5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugd2l0aCB0aGUgY3VycmVudCBjb25maWcgYW5kIGF0dGFjaGVzIHRoZSBldmVudHMsIGlmIG5vdCBhbHJlYWR5IGNyZWF0ZWQuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gZHJhZ3VsYSh0aGlzLl9jb250YWluZXJzLm1hcCgoYykgPT4gYy5lbGVtZW50KSwgdGhpcy5fY29uZmlnKTtcblxuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignZHJhZycsIChlbGVtZW50OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZy5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignZHJhZ2VuZCcsIChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmQuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2Ryb3AnLCAoZWxlbWVudDogRWxlbWVudCwgdGFyZ2V0OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQsIHNpYmxpbmc6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBzaWJsaW5nOiBzaWJsaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdjYW5jZWwnLCAoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2Nsb25lZCcsIChjbG9uZTogRWxlbWVudCwgZWxlbWVudDogRWxlbWVudCwgdHlwZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb25lZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBjbG9uZTogY2xvbmUsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveXMgdGhlIGRyYWd1bGEgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgY29udGFpbmVyIGZvciB0aGUgY29udGFpbmVyRWxlbWVudCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBvZiBjYW5Nb3ZlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuTW92ZShlbGVtZW50OiBFbGVtZW50LCBjb250YWluZXJFbGVtZW50OiBFbGVtZW50LCBoYW5kbGU6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVyIG9mIHRoaXMuX2NvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuZWxlbWVudC5pc1NhbWVOb2RlKGNvbnRhaW5lckVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5jYW5Nb3ZlKGVsZW1lbnQsIGNvbnRhaW5lckVsZW1lbnQsIGhhbmRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=