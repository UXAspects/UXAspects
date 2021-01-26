import { CdkDragDrop, CdkDropList, CDK_DROP_LIST, CDK_DROP_LIST_GROUP, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


class ReorderableGroups {
    static groups = new BehaviorSubject<Record<string, string[]>>({});
}

@Directive({
    selector: '[uxReorderable]',
    providers: [
        { provide: CDK_DROP_LIST_GROUP, useValue: undefined},
        { provide: CDK_DROP_LIST, useExisting: ReorderableDirective },
    ],
})
export class ReorderableDirective<T> extends CdkDropList<T> {

    /**
     * This property can be used to provide the `uxReorderable` directive with a dataset that represents the items that can be reordered.
     * This can used as a two way binding which will ensure the dataset always reflects the current order of items in the list.
     * Each list item should have a `uxReorderableModel` directive applied, with a value indicating which item in the dataset it represents.
     *
     * If the list is generated using `ngFor` this property should be bound to the same dataset.
     * If there is no dataset representing the items then this property is not required.
     */
    @Input() reorderableModel: Array<T>;

    /**
     * The name of the reorderable group which this container belongs to `uxReorderable` elements which belong to
     * the same group can have items dragged between them. Only required if multiple drop containers are being created.
     */
    @Input() set reorderableGroup(group: string) {
        const groups = ReorderableGroups.groups.value;
        this._reorderableGroup = group;

        ReorderableGroups.groups.next({
            ...groups,
            [group]: [
                ...(groups[group] ?? []),
                this.id
            ]
        });
    }

    get reorderableGroup(): string {
        return this._reorderableGroup;
    }

    private _reorderableGroup: string;

    /** Determines if reordering is disabled. */
    @Input() set reorderingDisabled(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /**
     * This event will be triggered when the order changes and will contain an updated dataset containing the items
     * in their current order. This should be used when the list of items is generated using ngFor to ensure the
     * data remains in the same order for both the `uxReorderable` and `ngFor` directives.
     */
    @Output() reorderableModelChange = new EventEmitter<Array<T>>();

    /** This event is triggered when a user begins dragging an item. The event will contain the element being moved. */
    @Output() reorderStart = new EventEmitter<ReorderEvent<T>>();

    /** This event is triggered when the item being dragged is returned to the same location as it began. The event will contain the element that was being moved. */
    @Output() reorderCancel = new EventEmitter<ReorderEvent<T>>();

    /** This event is triggered when a user has relocated an item. The event will contain the element that was moved. */
    @Output() reorderEnd = new EventEmitter<ReorderEvent<T>>();

    ngOnInit(): void {
        this.dropped.subscribe((event: CdkDragDrop<T>) => {

            if (event.previousContainer === event.container) {
                moveItemInArray(this.reorderableModel, event.previousIndex, event.currentIndex);
            } else {
                const previousContainer: any = event.previousContainer;
                const currentContainer: any = event.container;
                transferArrayItem(previousContainer.reorderableModel, currentContainer.reorderableModel, event.previousIndex, event.currentIndex);
            }

            this.reorderableModelChange.emit(this.reorderableModel);
        });

        ReorderableGroups.groups.subscribe(groups => {
            this.connectedTo = (groups[this.reorderableGroup] ?? []).filter(group => group !== this.id);
        });

    }
}

export interface ReorderEvent<T = unknown> {
    element: Element;
    model: T;
}
