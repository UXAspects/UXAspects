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
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHcEMsTUFBTTs7dUJBRW1ELEVBQUU7OEJBQzlCLENBQUM7Ozs7OztJQUsxQixrQkFBa0I7UUFDZCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3BEOzs7Ozs7O0lBS0QsUUFBUSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7O0lBS0QsVUFBVSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFekQsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFD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QGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFrZSwgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICdkcmFndWxhJztcbmltcG9ydCB7IGRyYWd1bGEgfSBmcm9tICcuL2RyYWd1bGEnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2dyb3VwczogeyBbazogc3RyaW5nXTogUmVvcmRlcmFibGVHcm91cCB9ID0ge307XG4gICAgcHJpdmF0ZSBfdW5pcXVlR3JvdXBJZCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgdW5pcXVlIHN0cmluZyB3aGljaCBjYW4gYmUgdXNlZCBhcyBhIGdyb3VwIG5hbWUgaWYgb25lIHdhcyBub3QgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBnZXRVbmlxdWVHcm91cE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdfdXhSZW9yZGVyYWJsZV8nICsgdGhpcy5fdW5pcXVlR3JvdXBJZCsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGNvbnRhaW5lciB0byB0aGUgbmFtZWQgZ3JvdXAuXG4gICAgICovXG4gICAgcmVnaXN0ZXIoZ3JvdXBOYW1lOiBzdHJpbmcsIGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2dyb3Vwc1tncm91cE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXSA9IG5ldyBSZW9yZGVyYWJsZUdyb3VwKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXS5yZWdpc3Rlcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBjb250YWluZXIgZnJvbSB0aGUgbmFtZWQgZ3JvdXAuIElmIGl0IHdhcyB0aGUgbGFzdCBjb250YWluZXIgaW4gdGhlIGdyb3VwLCBkZXN0cm95cyB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgdW5yZWdpc3Rlcihncm91cE5hbWU6IHN0cmluZywgY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC51bnJlZ2lzdGVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGlmIChncm91cC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICBncm91cC5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkcmFndWxhIGluc3RhbmNlIHdpdGggdGhlIGN1cnJlbnQgY29uZmlnIGFuZCBhdHRhY2hlcyB0aGUgZXZlbnRzLCBpZiBub3QgYWxyZWFkeSBjcmVhdGVkLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoZ3JvdXBOYW1lOiBzdHJpbmcpOiBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuXG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdyb3VwIG9iamVjdCBmb3IgdGhlIGdpdmVuIG5hbWUuXG4gICAgICovXG4gICAgZ2V0R3JvdXAoZ3JvdXA6IHN0cmluZyk6IFJlb3JkZXJhYmxlR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBzW2dyb3VwXTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVDb250YWluZXIge1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgZ2V0TW9kZWxGcm9tRWxlbWVudDogKGVsZW1lbnQ6IEVsZW1lbnQpID0+IGFueTtcbiAgICBjYW5Nb3ZlOiAoZWxlbWVudDogRWxlbWVudCwgY29udGFpbmVyOiBFbGVtZW50LCBoYW5kbGU6IEVsZW1lbnQpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVEcmFnRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBzb3VyY2U6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVEcmFnRW5kRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyb3BFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHRhcmdldDogRWxlbWVudDtcbiAgICBzb3VyY2U6IEVsZW1lbnQ7XG4gICAgc2libGluZzogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNhbmNlbEV2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVvcmRlcmFibGVDbG9uZWRFdmVudCB7XG4gICAgY2xvbmU6IEVsZW1lbnQ7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbGxlY3Rpb24gb2YgZHJhZy1hbmQtZHJvcCBjb250YWluZXJzICh1eFJlb3JkZXJhYmxlKSB0aGF0IGl0ZW1zIGNhbiBiZSBkcmFnZ2VkIGJldHdlZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUdyb3VwIHtcblxuICAgIGRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJhZ0V2ZW50PigpO1xuICAgIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJhZ0VuZEV2ZW50PigpO1xuICAgIGRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlRHJvcEV2ZW50PigpO1xuICAgIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVDYW5jZWxFdmVudD4oKTtcbiAgICBjbG9uZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFJlb3JkZXJhYmxlQ2xvbmVkRXZlbnQ+KCk7XG5cbiAgICBwcml2YXRlIF9pbnN0YW5jZTogRHJha2U7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVyczogUmVvcmRlcmFibGVDb250YWluZXJbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfY29uZmlnOiBEcmFndWxhT3B0aW9ucyA9IHtcbiAgICAgICAgbW92ZXM6IHRoaXMuY2FuTW92ZS5iaW5kKHRoaXMpXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gY29udGFpbmVycyByZWdpc3RlcmVkIHdpdGggdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXJzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtb2RlbCBvYmplY3QgKHV4UmVvcmRlcmFibGVNb2RlbCkgZm9yIGFuIGVsZW1lbnRzIGluIG9uZSBvZiB0aGUgY29udGFpbmVycyBpbiB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBhbnkge1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiB0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IGNvbnRhaW5lci5nZXRNb2RlbEZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29udGFpbmVyIHRvIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcnMucHVzaChjb250YWluZXIpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuY29udGFpbmVycyA9IHRoaXMuX2NvbnRhaW5lcnMubWFwKChjKSA9PiBjLmVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWcubWlycm9yQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcubWlycm9yQ29udGFpbmVyID0gY29udGFpbmVyLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBjb250YWluZXIgZnJvbSB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgdW5yZWdpc3Rlcihjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY29udGFpbmVycy5pbmRleE9mKGNvbnRhaW5lcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5jb250YWluZXJzID0gdGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBkcmFndWxhIGluc3RhbmNlIHdpdGggdGhlIGN1cnJlbnQgY29uZmlnIGFuZCBhdHRhY2hlcyB0aGUgZXZlbnRzLCBpZiBub3QgYWxyZWFkeSBjcmVhdGVkLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IGRyYWd1bGEodGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCksIHRoaXMuX2NvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2RyYWcnLCAoZWxlbWVudDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWcuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2RyYWdlbmQnLCAoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnRW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdkcm9wJywgKGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50LCBzaWJsaW5nOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgc2libGluZzogc2libGluZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignY2FuY2VsJywgKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmdldE1vZGVsRm9yRWxlbWVudChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdjbG9uZWQnLCAoY2xvbmU6IEVsZW1lbnQsIGVsZW1lbnQ6IEVsZW1lbnQsIHR5cGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9uZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgY2xvbmU6IGNsb25lLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3lzIHRoZSBkcmFndWxhIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGNvbnRhaW5lciBmb3IgdGhlIGNvbnRhaW5lckVsZW1lbnQgYW5kIHJldHVybnMgdGhlIHJlc3VsdHMgb2YgY2FuTW92ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbk1vdmUoZWxlbWVudDogRWxlbWVudCwgY29udGFpbmVyRWxlbWVudDogRWxlbWVudCwgaGFuZGxlOiBFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lciBvZiB0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmVsZW1lbnQuaXNTYW1lTm9kZShjb250YWluZXJFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuY2FuTW92ZShlbGVtZW50LCBjb250YWluZXJFbGVtZW50LCBoYW5kbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19