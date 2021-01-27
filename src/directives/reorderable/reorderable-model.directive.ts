import { CdkDrag, CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReorderableDirective } from './reorderable.directive';

@Directive({
    selector: '[uxReorderableModel]',
    host: {
        '[class.ux-reorderable-moving]': '_dragRef.isDragging()',
    },
})
export class ReorderableModelDirective<T> extends CdkDrag implements OnInit, OnDestroy {
    // allow the user to specify a model for the item - allows use with ngFor
    @Input() set uxReorderableModel(model: T) {
        this.data = model;
    }

    /** Unsubscribe on destroy */
    private readonly _onDestroy$ = new Subject<void>();

    ngOnInit(): void {
        // cast the drop container as we have replaced it with our directive
        const dropContainer = this.dropContainer as ReorderableDirective<T>;

        this.started.pipe(takeUntil(this._onDestroy$)).subscribe((event: CdkDragStart) => {
            dropContainer.reorderStart.emit({ element: this.element.nativeElement, model: this.data });
            this.setTableCellWidths(event.source.getPlaceholderElement(), event.source.element.nativeElement);
        });

        this.dropped.pipe(takeUntil(this._onDestroy$)).subscribe((event: CdkDragDrop<T>) => {
            if (event.container === event.previousContainer && event.currentIndex === event.previousIndex) {
                dropContainer.reorderCancel.emit({ element: this.element.nativeElement, model: this.data });
            } else {
                dropContainer.reorderEnd.emit({ element: this.element.nativeElement, model: this.data });
            }
        });
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    private setTableCellWidths(source: Element, target: Element): void {

        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }

        // find any immediate td children and fix their width
        const sourceCells = Array.from(source.children) as HTMLTableCellElement[];
        const targetCells = Array.from(target.children) as HTMLTableCellElement[];

        // fix the width of these cells
        sourceCells.forEach((cell, idx) => targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'));

    }
}
