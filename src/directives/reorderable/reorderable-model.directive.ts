import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { ReorderableDirective } from './reorderable.directive';

@Directive({
    selector: '[uxReorderableModel]',
    host: {
        '[class.ux-reorderable-moving]': '_dragRef.isDragging()'
    }
})
export class ReorderableModelDirective<T> extends CdkDrag implements OnInit, OnDestroy {

    // allow the user to specify a model for the item - allows use with ngFor
    @Input() set uxReorderableModel(model: T) {
        this.data = model;
    };

    ngOnInit(): void {
        // cast the drop container as we have replaced it with our directive
        const dropContainer = this.dropContainer as ReorderableDirective<T>;

        this.started.subscribe(() => {
            dropContainer.reorderStart.emit({ element: this.element.nativeElement, model: this.data });
        });

        this.dropped.subscribe((event: CdkDragDrop<T>) => {
            if (event.container === event.previousContainer && event.currentIndex === event.previousIndex) {
                dropContainer.reorderCancel.emit({ element: this.element.nativeElement, model: this.data });
            } else {
                dropContainer.reorderEnd.emit({ element: this.element.nativeElement, model: this.data });
            }
        });
    }

    ngOnDestroy(): void {
        this.started.unsubscribe();
        this.ended.unsubscribe();
    }


}
