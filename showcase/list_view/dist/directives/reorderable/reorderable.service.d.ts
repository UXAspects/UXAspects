import { EventEmitter } from '@angular/core';
export declare class ReorderableService {
    private _groups;
    private _uniqueGroupId;
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     */
    getUniqueGroupName(): string;
    /**
     * Adds the container to the named group.
     */
    register(groupName: string, container: ReorderableContainer): ReorderableGroup;
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     */
    unregister(groupName: string, container: ReorderableContainer): void;
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    initialize(groupName: string): ReorderableGroup;
    /**
     * Returns the group object for the given name.
     */
    getGroup(group: string): ReorderableGroup;
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
export declare class ReorderableGroup {
    drag: EventEmitter<ReorderableDragEvent>;
    dragEnd: EventEmitter<ReorderableDragEndEvent>;
    drop: EventEmitter<ReorderableDropEvent>;
    cancel: EventEmitter<ReorderableCancelEvent>;
    cloned: EventEmitter<ReorderableClonedEvent>;
    private _instance;
    private _containers;
    private _config;
    /**
     * Returns true if there are no containers registered with the group.
     */
    isEmpty(): boolean;
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     */
    getModelForElement(element: Element): any;
    /**
     * Adds the container to the group.
     */
    register(container: ReorderableContainer): void;
    /**
     * Removes the container from the group.
     */
    unregister(container: ReorderableContainer): void;
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     */
    initialize(): void;
    /**
     * Destroys the dragula instance.
     */
    destroy(): void;
    /**
     * Finds the container for the containerElement and returns the results of canMove.
     */
    private canMove(element, containerElement, handle);
}
