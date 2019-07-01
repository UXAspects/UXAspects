import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SankeyNodeLink } from './interfaces/node-link.interface';

@Injectable()
export class SankeyFocusManager<T> implements OnDestroy {

    /** Store the node that can currently be tabbed to */
    active$ = new BehaviorSubject<SankeyNodeLink<T>>(null);

    /** Emit whenever an item should receive focus */
    focused$ = new Subject<SankeyNodeLink<T>>();

    /** Store the nodes  */
    private _nodes: ReadonlyArray<SankeyNodeLink<T>> = [];

    /** Get the current active item */
    private get _active(): SankeyNodeLink<T> {
        return this.active$.value;
    }

    ngOnDestroy(): void {
        this.active$.complete();
        this.focused$.complete();
    }

    /** Update the list of possible nodes */
    setNodes(nodes: ReadonlyArray<SankeyNodeLink<T>>): void {
        this._nodes = nodes;

        // check if there is currently a tabbable node, if not we should make the first node tabbable
        if (!this.hasActiveNode()) {
            this.setActiveItem(this._nodes[0]);
        }
    }

    /** Set the current active item */
    setActiveItem(node: SankeyNodeLink<T>): void {
        this.active$.next(node);
    }

    /** Handle keyboard input from nodes */
    onKeydown(event: KeyboardEvent): void {

        switch (event.which) {
            case UP_ARROW:
                this.shiftFocusVertically(-1);
                event.preventDefault();
                break;

            case DOWN_ARROW:
                this.shiftFocusVertically(1);
                event.preventDefault();
                break;

            case LEFT_ARROW:
                this.shiftFocusHorizontally(-1);
                event.preventDefault();
                break;

            case RIGHT_ARROW:
                this.shiftFocusHorizontally(1);
                event.preventDefault();
                break;
        }
    }

    private setFocusedItem(item: SankeyNodeLink<T>): void {
        this.setActiveItem(item);
        this.focused$.next(item);
    }

    private shiftFocusVertically(delta: number): void {
        const nodes = this.getNodesInColumn(this._active.column);

        // get the node below or above the active node
        const target = nodes[nodes.findIndex(node => node.node.id === this._active.node.id) + delta];

        if (target) {
            this.setFocusedItem(target);
        }
    }

    /** Shift the focus to a node in a sibling column */
    private shiftFocusHorizontally(delta: number): void {

        // get nodes in the sibling column in the desired direction
        const nodes = this.getNodesInColumn(this._active.column + delta);

        // if there are no nodes then do nothing as we cannot reduce an empty array
        if (nodes.length === 0) {
            return;
        }

        // get the node with the most similar y position
        const target = nodes.reduce((closest, node) => {
            const closestDiff = Math.max(closest.y, this._active.y) - Math.min(closest.y, this._active.y);
            const currentDiff = Math.max(node.y, this._active.y) - Math.min(node.y, this._active.y);
            return closestDiff < currentDiff ? closest : node;
        });

        if (target) {
            this.setFocusedItem(target);
        }
    }

    /** Get a list of nodes that are in a given column */
    private getNodesInColumn(column: number): ReadonlyArray<SankeyNodeLink<T>> {
        return this.getNodesInOrder(this._nodes.filter(node => node.column === column));
    }

    /** Sort the nodes based on the Y position */
    private getNodesInOrder(nodes: ReadonlyArray<SankeyNodeLink<T>>): ReadonlyArray<SankeyNodeLink<T>> {
        return [...nodes].sort((nodeOne, nodeTwo) => nodeOne.y - nodeTwo.y);
    }

    /** Determine whether or not there is a not that is tabbable */
    private hasActiveNode(): boolean {
        return !!this.active$.value && !!this._nodes.find(node => node.node.id === this.active$.value.node.id);
    }

}
