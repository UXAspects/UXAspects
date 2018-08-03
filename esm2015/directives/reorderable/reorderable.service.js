/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { dragula } from './dragula';
export class ReorderableService {
    constructor() {
        this._groups = {};
        this._uniqueGroupId = 0;
    }
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    getUniqueGroupName() {
        return '_uxReorderable_' + this._uniqueGroupId++;
    }
    /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    register(groupName, container) {
        if (!this._groups[groupName]) {
            this._groups[groupName] = new ReorderableGroup();
        }
        this._groups[groupName].register(container);
        return this._groups[groupName];
    }
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    unregister(groupName, container) {
        const /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.unregister(container);
            if (group.isEmpty()) {
                group.destroy();
                delete this._groups[groupName];
            }
        }
    }
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    initialize(groupName) {
        const /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.initialize();
        }
        return group;
    }
    /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    getGroup(group) {
        return this._groups[group];
    }
}
ReorderableService.decorators = [
    { type: Injectable }
];
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
export class ReorderableGroup {
    constructor() {
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
     * @return {?}
     */
    isEmpty() {
        return this._containers.length === 0;
    }
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    getModelForElement(element) {
        for (const /** @type {?} */ container of this._containers) {
            const /** @type {?} */ model = container.getModelFromElement(element);
            if (model) {
                return model;
            }
        }
        return null;
    }
    /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    register(container) {
        this._containers.push(container);
        if (this._instance) {
            this._instance.containers = this._containers.map((c) => c.element);
        }
        if (!this._config.mirrorContainer) {
            this._config.mirrorContainer = container.element;
        }
    }
    /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    unregister(container) {
        const /** @type {?} */ index = this._containers.indexOf(container);
        if (index >= 0) {
            this._containers.splice(index, 1);
            if (this._instance) {
                this._instance.containers = this._containers.map((c) => c.element);
            }
        }
    }
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    initialize() {
        if (this._instance) {
            return;
        }
        this._instance = dragula(this._containers.map((c) => c.element), this._config);
        this._instance.on('drag', (element, source) => {
            this.drag.emit({
                model: this.getModelForElement(element),
                element: element,
                source: source
            });
        });
        this._instance.on('dragend', (element) => {
            this.dragEnd.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('drop', (element, target, source, sibling) => {
            this.drop.emit({
                model: this.getModelForElement(element),
                element: element,
                target: target,
                source: source,
                sibling: sibling
            });
        });
        this._instance.on('cancel', (element) => {
            this.cancel.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('cloned', (clone, element, type) => {
            this.cloned.emit({
                clone: clone,
                element: element,
                type: type
            });
        });
    }
    /**
     * Destroys the dragula instance.
     * @return {?}
     */
    destroy() {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    }
    /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    canMove(element, containerElement, handle) {
        for (let /** @type {?} */ container of this._containers) {
            if (container.element.isSameNode(containerElement)) {
                return container.canMove(element, containerElement, handle);
            }
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHcEMsTUFBTTs7dUJBRW1ELEVBQUU7OEJBQzlCLENBQUM7Ozs7OztJQUsxQixrQkFBa0I7UUFDZCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3BEOzs7Ozs7O0lBS0QsUUFBUSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7O0lBS0QsVUFBVSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFekQsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFD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U0FDSjs7Q0FFUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJha2UsIERyYWd1bGFPcHRpb25zIH0gZnJvbSAnZHJhZ3VsYSc7XG5pbXBvcnQgeyBkcmFndWxhIH0gZnJvbSAnLi9kcmFndWxhJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9ncm91cHM6IHsgW2s6IHN0cmluZ106IFJlb3JkZXJhYmxlR3JvdXAgfSA9IHt9O1xuICAgIHByaXZhdGUgX3VuaXF1ZUdyb3VwSWQgPSAwO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHVuaXF1ZSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgYXMgYSBncm91cCBuYW1lIGlmIG9uZSB3YXMgbm90IGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgZ2V0VW5pcXVlR3JvdXBOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnX3V4UmVvcmRlcmFibGVfJyArIHRoaXMuX3VuaXF1ZUdyb3VwSWQrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb250YWluZXIgdG8gdGhlIG5hbWVkIGdyb3VwLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGdyb3VwTmFtZTogc3RyaW5nLCBjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogUmVvcmRlcmFibGVHcm91cCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV0gPSBuZXcgUmVvcmRlcmFibGVHcm91cCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV0ucmVnaXN0ZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgY29udGFpbmVyIGZyb20gdGhlIG5hbWVkIGdyb3VwLiBJZiBpdCB3YXMgdGhlIGxhc3QgY29udGFpbmVyIGluIHRoZSBncm91cCwgZGVzdHJveXMgdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIoZ3JvdXBOYW1lOiBzdHJpbmcsIGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuXG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAudW5yZWdpc3Rlcihjb250YWluZXIpO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXAuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgZHJhZ3VsYSBpbnN0YW5jZSB3aXRoIHRoZSBjdXJyZW50IGNvbmZpZyBhbmQgYXR0YWNoZXMgdGhlIGV2ZW50cywgaWYgbm90IGFscmVhZHkgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKGdyb3VwTmFtZTogc3RyaW5nKTogUmVvcmRlcmFibGVHcm91cCB7XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcblxuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGdyb3VwLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBncm91cCBvYmplY3QgZm9yIHRoZSBnaXZlbiBuYW1lLlxuICAgICAqL1xuICAgIGdldEdyb3VwKGdyb3VwOiBzdHJpbmcpOiBSZW9yZGVyYWJsZUdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3Vwc1tncm91cF07XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlQ29udGFpbmVyIHtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIGdldE1vZGVsRnJvbUVsZW1lbnQ6IChlbGVtZW50OiBFbGVtZW50KSA9PiBhbnk7XG4gICAgY2FuTW92ZTogKGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRhaW5lcjogRWxlbWVudCwgaGFuZGxlOiBFbGVtZW50KSA9PiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlRHJhZ0V2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgc291cmNlOiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlRHJhZ0VuZEV2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVEcm9wRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICB0YXJnZXQ6IEVsZW1lbnQ7XG4gICAgc291cmNlOiBFbGVtZW50O1xuICAgIHNpYmxpbmc6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVDYW5jZWxFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlQ2xvbmVkRXZlbnQge1xuICAgIGNsb25lOiBFbGVtZW50O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIGRyYWctYW5kLWRyb3AgY29udGFpbmVycyAodXhSZW9yZGVyYWJsZSkgdGhhdCBpdGVtcyBjYW4gYmUgZHJhZ2dlZCBiZXR3ZWVuLlxuICovXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVHcm91cCB7XG5cbiAgICBkcmFnID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZURyYWdFdmVudD4oKTtcbiAgICBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZURyYWdFbmRFdmVudD4oKTtcbiAgICBkcm9wID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZURyb3BFdmVudD4oKTtcbiAgICBjYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlQ2FuY2VsRXZlbnQ+KCk7XG4gICAgY2xvbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZUNsb25lZEV2ZW50PigpO1xuXG4gICAgcHJpdmF0ZSBfaW5zdGFuY2U6IERyYWtlO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lcnM6IFJlb3JkZXJhYmxlQ29udGFpbmVyW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2NvbmZpZzogRHJhZ3VsYU9wdGlvbnMgPSB7XG4gICAgICAgIG1vdmVzOiB0aGlzLmNhbk1vdmUuYmluZCh0aGlzKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIGNvbnRhaW5lcnMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVycy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbW9kZWwgb2JqZWN0ICh1eFJlb3JkZXJhYmxlTW9kZWwpIGZvciBhbiBlbGVtZW50cyBpbiBvbmUgb2YgdGhlIGNvbnRhaW5lcnMgaW4gdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIGdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogYW55IHtcbiAgICAgICAgZm9yIChjb25zdCBjb250YWluZXIgb2YgdGhpcy5fY29udGFpbmVycykge1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBjb250YWluZXIuZ2V0TW9kZWxGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvbnRhaW5lciB0byB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgcmVnaXN0ZXIoY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb250YWluZXJzLnB1c2goY29udGFpbmVyKTtcblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmNvbnRhaW5lcnMgPSB0aGlzLl9jb250YWluZXJzLm1hcCgoYykgPT4gYy5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnLm1pcnJvckNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnLm1pcnJvckNvbnRhaW5lciA9IGNvbnRhaW5lci5lbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgY29udGFpbmVyIGZyb20gdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIoY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbnRhaW5lcnMuaW5kZXhPZihjb250YWluZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuY29udGFpbmVycyA9IHRoaXMuX2NvbnRhaW5lcnMubWFwKChjKSA9PiBjLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgZHJhZ3VsYSBpbnN0YW5jZSB3aXRoIHRoZSBjdXJyZW50IGNvbmZpZyBhbmQgYXR0YWNoZXMgdGhlIGV2ZW50cywgaWYgbm90IGFscmVhZHkgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBkcmFndWxhKHRoaXMuX2NvbnRhaW5lcnMubWFwKChjKSA9PiBjLmVsZW1lbnQpLCB0aGlzLl9jb25maWcpO1xuXG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdkcmFnJywgKGVsZW1lbnQ6IEVsZW1lbnQsIHNvdXJjZTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdkcmFnZW5kJywgKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignZHJvcCcsIChlbGVtZW50OiBFbGVtZW50LCB0YXJnZXQ6IEVsZW1lbnQsIHNvdXJjZTogRWxlbWVudCwgc2libGluZzogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcm9wLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgIHNpYmxpbmc6IHNpYmxpbmdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2NhbmNlbCcsIChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbC5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignY2xvbmVkJywgKGNsb25lOiBFbGVtZW50LCBlbGVtZW50OiBFbGVtZW50LCB0eXBlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvbmVkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGNsb25lOiBjbG9uZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95cyB0aGUgZHJhZ3VsYSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBjb250YWluZXIgZm9yIHRoZSBjb250YWluZXJFbGVtZW50IGFuZCByZXR1cm5zIHRoZSByZXN1bHRzIG9mIGNhbk1vdmUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5Nb3ZlKGVsZW1lbnQ6IEVsZW1lbnQsIGNvbnRhaW5lckVsZW1lbnQ6IEVsZW1lbnQsIGhhbmRsZTogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBjb250YWluZXIgb2YgdGhpcy5fY29udGFpbmVycykge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5lbGVtZW50LmlzU2FtZU5vZGUoY29udGFpbmVyRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyLmNhbk1vdmUoZWxlbWVudCwgY29udGFpbmVyRWxlbWVudCwgaGFuZGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==