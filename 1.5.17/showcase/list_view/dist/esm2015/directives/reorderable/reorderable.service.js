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
/** @nocollapse */
ReorderableService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlcmFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Jlb3JkZXJhYmxlL3Jlb3JkZXJhYmxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHcEMsTUFBTTs7dUJBRW1ELEVBQUU7OEJBQzlCLENBQUM7Ozs7OztJQUsxQixrQkFBa0I7UUFDZCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3BEOzs7Ozs7O0lBS0QsUUFBUSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7O0lBS0QsVUFBVSxDQUFDLFNBQWlCLEVBQUUsU0FBK0I7UUFFekQsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFD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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWtlLCBEcmFndWxhT3B0aW9ucyB9IGZyb20gJ2RyYWd1bGEnO1xuaW1wb3J0IHsgZHJhZ3VsYSB9IGZyb20gJy4vZHJhZ3VsYSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBSZW9yZGVyYWJsZUdyb3VwIH0gPSB7fTtcbiAgICBwcml2YXRlIF91bmlxdWVHcm91cElkID0gMDtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB1bmlxdWUgc3RyaW5nIHdoaWNoIGNhbiBiZSB1c2VkIGFzIGEgZ3JvdXAgbmFtZSBpZiBvbmUgd2FzIG5vdCBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIGdldFVuaXF1ZUdyb3VwTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ191eFJlb3JkZXJhYmxlXycgKyB0aGlzLl91bmlxdWVHcm91cElkKys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgY29udGFpbmVyIHRvIHRoZSBuYW1lZCBncm91cC5cbiAgICAgKi9cbiAgICByZWdpc3Rlcihncm91cE5hbWU6IHN0cmluZywgY29udGFpbmVyOiBSZW9yZGVyYWJsZUNvbnRhaW5lcik6IFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgICAgIGlmICghdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdID0gbmV3IFJlb3JkZXJhYmxlR3JvdXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdLnJlZ2lzdGVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3Vwc1tncm91cE5hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGNvbnRhaW5lciBmcm9tIHRoZSBuYW1lZCBncm91cC4gSWYgaXQgd2FzIHRoZSBsYXN0IGNvbnRhaW5lciBpbiB0aGUgZ3JvdXAsIGRlc3Ryb3lzIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKGdyb3VwTmFtZTogc3RyaW5nLCBjb250YWluZXI6IFJlb3JkZXJhYmxlQ29udGFpbmVyKTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcblxuICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgIGdyb3VwLnVucmVnaXN0ZXIoY29udGFpbmVyKTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ncm91cHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugd2l0aCB0aGUgY3VycmVudCBjb25maWcgYW5kIGF0dGFjaGVzIHRoZSBldmVudHMsIGlmIG5vdCBhbHJlYWR5IGNyZWF0ZWQuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZShncm91cE5hbWU6IHN0cmluZyk6IFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fZ3JvdXBzW2dyb3VwTmFtZV07XG5cbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZ3JvdXAgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gbmFtZS5cbiAgICAgKi9cbiAgICBnZXRHcm91cChncm91cDogc3RyaW5nKTogUmVvcmRlcmFibGVHcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHNbZ3JvdXBdO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNvbnRhaW5lciB7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbiAgICBnZXRNb2RlbEZyb21FbGVtZW50OiAoZWxlbWVudDogRWxlbWVudCkgPT4gYW55O1xuICAgIGNhbk1vdmU6IChlbGVtZW50OiBFbGVtZW50LCBjb250YWluZXI6IEVsZW1lbnQsIGhhbmRsZTogRWxlbWVudCkgPT4gYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyYWdFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHNvdXJjZTogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZURyYWdFbmRFdmVudCB7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlRHJvcEV2ZW50IHtcbiAgICBtb2RlbDogYW55O1xuICAgIGVsZW1lbnQ6IEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBFbGVtZW50O1xuICAgIHNvdXJjZTogRWxlbWVudDtcbiAgICBzaWJsaW5nOiBFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlb3JkZXJhYmxlQ2FuY2VsRXZlbnQge1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZWxlbWVudDogRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW9yZGVyYWJsZUNsb25lZEV2ZW50IHtcbiAgICBjbG9uZTogRWxlbWVudDtcbiAgICBlbGVtZW50OiBFbGVtZW50O1xuICAgIHR5cGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiBkcmFnLWFuZC1kcm9wIGNvbnRhaW5lcnMgKHV4UmVvcmRlcmFibGUpIHRoYXQgaXRlbXMgY2FuIGJlIGRyYWdnZWQgYmV0d2Vlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlR3JvdXAge1xuXG4gICAgZHJhZyA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcmFnRXZlbnQ+KCk7XG4gICAgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcmFnRW5kRXZlbnQ+KCk7XG4gICAgZHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVEcm9wRXZlbnQ+KCk7XG4gICAgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxSZW9yZGVyYWJsZUNhbmNlbEV2ZW50PigpO1xuICAgIGNsb25lZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVvcmRlcmFibGVDbG9uZWRFdmVudD4oKTtcblxuICAgIHByaXZhdGUgX2luc3RhbmNlOiBEcmFrZTtcbiAgICBwcml2YXRlIF9jb250YWluZXJzOiBSZW9yZGVyYWJsZUNvbnRhaW5lcltdID0gW107XG5cbiAgICBwcml2YXRlIF9jb25maWc6IERyYWd1bGFPcHRpb25zID0ge1xuICAgICAgICBtb3ZlczogdGhpcy5jYW5Nb3ZlLmJpbmQodGhpcylcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBjb250YWluZXJzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ3JvdXAuXG4gICAgICovXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcnMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1vZGVsIG9iamVjdCAodXhSZW9yZGVyYWJsZU1vZGVsKSBmb3IgYW4gZWxlbWVudHMgaW4gb25lIG9mIHRoZSBjb250YWluZXJzIGluIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICBnZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3QgY29udGFpbmVyIG9mIHRoaXMuX2NvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gY29udGFpbmVyLmdldE1vZGVsRnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBjb250YWluZXIgdG8gdGhlIGdyb3VwLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycy5wdXNoKGNvbnRhaW5lcik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5jb250YWluZXJzID0gdGhpcy5fY29udGFpbmVycy5tYXAoKGMpID0+IGMuZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5taXJyb3JDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5taXJyb3JDb250YWluZXIgPSBjb250YWluZXIuZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGNvbnRhaW5lciBmcm9tIHRoZSBncm91cC5cbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyKGNvbnRhaW5lcjogUmVvcmRlcmFibGVDb250YWluZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jb250YWluZXJzLmluZGV4T2YoY29udGFpbmVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmNvbnRhaW5lcnMgPSB0aGlzLl9jb250YWluZXJzLm1hcCgoYykgPT4gYy5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGRyYWd1bGEgaW5zdGFuY2Ugd2l0aCB0aGUgY3VycmVudCBjb25maWcgYW5kIGF0dGFjaGVzIHRoZSBldmVudHMsIGlmIG5vdCBhbHJlYWR5IGNyZWF0ZWQuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gZHJhZ3VsYSh0aGlzLl9jb250YWluZXJzLm1hcCgoYykgPT4gYy5lbGVtZW50KSwgdGhpcy5fY29uZmlnKTtcblxuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignZHJhZycsIChlbGVtZW50OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZy5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5vbignZHJhZ2VuZCcsIChlbGVtZW50OiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmQuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2Ryb3AnLCAoZWxlbWVudDogRWxlbWVudCwgdGFyZ2V0OiBFbGVtZW50LCBzb3VyY2U6IEVsZW1lbnQsIHNpYmxpbmc6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICBtb2RlbDogdGhpcy5nZXRNb2RlbEZvckVsZW1lbnQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBzaWJsaW5nOiBzaWJsaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLm9uKCdjYW5jZWwnLCAoZWxlbWVudDogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWwuZW1pdCh7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHRoaXMuZ2V0TW9kZWxGb3JFbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uub24oJ2Nsb25lZCcsIChjbG9uZTogRWxlbWVudCwgZWxlbWVudDogRWxlbWVudCwgdHlwZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb25lZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBjbG9uZTogY2xvbmUsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveXMgdGhlIGRyYWd1bGEgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgY29udGFpbmVyIGZvciB0aGUgY29udGFpbmVyRWxlbWVudCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0cyBvZiBjYW5Nb3ZlLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuTW92ZShlbGVtZW50OiBFbGVtZW50LCBjb250YWluZXJFbGVtZW50OiBFbGVtZW50LCBoYW5kbGU6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVyIG9mIHRoaXMuX2NvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuZWxlbWVudC5pc1NhbWVOb2RlKGNvbnRhaW5lckVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5jYW5Nb3ZlKGVsZW1lbnQsIGNvbnRhaW5lckVsZW1lbnQsIGhhbmRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=