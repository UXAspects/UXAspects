import { Injectable, EventEmitter } from '@angular/core';
import { Drake, DragulaOptions } from 'dragula';
import { dragula } from './dragula';

@Injectable()
export class ReorderableService {

    private _groups: { [k: string]: ReorderableGroup } = {};
    private _uniqueGroupId = 0;

    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     */
    getUniqueGroupName(): string {
        return '_uxReorderable_' + this._uniqueGroupId++;
    }

    /**
     * Adds the container to the named group.
     */
    register(groupName: string, container: ReorderableContainer): ReorderableGroup {

        if (!this._groups[groupName]) {
            this._groups[groupName] = new ReorderableGroup();
        }

        this._groups[groupName].register(container);

        return this._groups[groupName];
    }

    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     */
    unregister(groupName: string, container: ReorderableContainer): void {

        const group = this._groups[groupName];

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
     */
    initialize(groupName: string): ReorderableGroup {

        const group = this._groups[groupName];

        if (group) {
            group.initialize();
        }

        return group;
    }

    /**
     * Returns the group object for the given name.
     */
    getGroup(group: string): ReorderableGroup {
        return this._groups[group];
    }
}

export interface ReorderableContainer {
    element: Element;
    getModelFromElement: (element: Element) => any;
    canMove: (element: Element, container: Element, handle: Element) => boolean;
}

export interface ReorderableDragEvent {
    model: any;
    element: Element;
    source: Element;
}

export interface ReorderableDragEndEvent {
    model: any;
    element: Element;
}

export interface ReorderableDropEvent {
    model: any;
    element: Element;
    target: Element;
    source: Element;
    sibling: Element;
}

export interface ReorderableCancelEvent {
    model: any;
    element: Element;
}

export interface ReorderableClonedEvent {
    clone: Element;
    element: Element;
    type: string;
}

/**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
export class ReorderableGroup {

    config: DragulaOptions = {
        moves: this.canMove.bind(this)
    };

    drag = new EventEmitter<ReorderableDragEvent>();
    dragEnd = new EventEmitter<ReorderableDragEndEvent>();
    drop = new EventEmitter<ReorderableDropEvent>();
    cancel = new EventEmitter<ReorderableCancelEvent>();
    cloned = new EventEmitter<ReorderableClonedEvent>();

    private _instance: Drake;
    private _containers: ReorderableContainer[] = [];

    /**
     * Returns true if there are no containers registered with the group.
     */
    isEmpty(): boolean {
        return this._containers.length === 0;
    }

    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     */
    getModelForElement(element: Element): any {
        for (const container of this._containers) {
            const model = container.getModelFromElement(element);
            if (model) {
                return model;
            }
        }

        return null;
    }

    /**
     * Adds the container to the group.
     */
    register(container: ReorderableContainer): void {
        this._containers.push(container);

        if (this._instance) {
            this._instance.containers = this._containers.map((c) => c.element);
        }

        if (!this.config.mirrorContainer) {
            this.config.mirrorContainer = container.element;
        }
    }

    /**
     * Removes the container from the group.
     */
    unregister(container: ReorderableContainer): void {
        const index = this._containers.indexOf(container);
        if (index >= 0) {
            this._containers.splice(index, 1);
            if (this._instance) {
                this._instance.containers = this._containers.map((c) => c.element);
            }
        }
    }

    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    initialize(): void {

        if (this._instance) {
            return;
        }

        // for performance gains lets run this outside ng zone
        // this._ngZone.runOutsideAngular(this.initDragula);

        this._instance = dragula(this._containers.map((c) => c.element), this.config);

        this._instance.on('drag', (element: Element, source: Element) => {
            this.drag.emit({
                model: this.getModelForElement(element),
                element: element,
                source: source
            });
        });
        this._instance.on('dragend', (element: Element) => {
            this.dragEnd.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('drop', (element: Element, target: Element, source: Element, sibling: Element) => {
            this.drop.emit({
                model: this.getModelForElement(element),
                element: element,
                target: target,
                source: source,
                sibling: sibling
            });
        });
        this._instance.on('cancel', (element: Element) => {
            this.cancel.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('cloned', (clone: Element, element: Element, type: string) => {
            this.cloned.emit({
                clone: clone,
                element: element,
                type: type
            });
        });
    }

    /**
     * Destroys the dragula instance.
     */
    destroy(): void {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    }

    /**
     * Finds the container for the containerElement and returns the results of canMove.
     */
    private canMove(element: Element, containerElement: Element, handle: Element): boolean {
        for (let container of this._containers) {
            if (container.element.isSameNode(containerElement)) {
                return container.canMove(element, containerElement, handle);
            }
        }
    }
}
