import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
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

    /** Apply the dragula preview class to avoid backwards compatibility issues */
    previewClass = 'gu-mirror';

    /** Preserve the column widths */
    private readonly _widths = new Map<number, string>();

    /** Unsubscribe on destroy */
    private readonly _destroy$ = new Subject<void>();

    ngOnInit(): void {
        // cast the drop container as we have replaced it with our directive
        const dropContainer = this.dropContainer as ReorderableDirective<T>;

        this._dragRef.beforeStarted.pipe(takeUntil(this._destroy$)).subscribe(() => this.captureTableCellStyles());

        this.started.pipe(takeUntil(this._destroy$)).subscribe(() => {
            dropContainer.reorderStart.emit({ element: this.element.nativeElement, model: this.data });
            this.setTableCellWidths();
        });

        this.dropped.pipe(takeUntil(this._destroy$)).subscribe((dragEvent: CdkDragDrop<T>) => {
            if (
                dragEvent.container === dragEvent.previousContainer &&
                dragEvent.currentIndex === dragEvent.previousIndex
            ) {
                dropContainer.reorderCancel.emit({ element: this.element.nativeElement, model: this.data });
            } else {
                dropContainer.reorderEnd.emit({ element: this.element.nativeElement, model: this.data });
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._destroy$.next();
        this._destroy$.complete();
    }

    /**
     * When table elements are being dragged they are hoisted to the document level
     * when dragged they lose the sizing and spacing provided when they are used inside a table.
     *
     * This function will capture the styles so we can inline them to preseve the styling.
     */
    private captureTableCellStyles(): void {
        // if it is not a table row then skip this
        if (this.element.nativeElement.tagName !== 'TR') {
            return;
        }

        // iterate each cell and store the styles and enforce the width by using a minWidth
        Array.from(this.element.nativeElement.children).forEach((cell, index) => {
            this._widths.set(index, getComputedStyle(cell).getPropertyValue('width'));
        });
    }

    private setTableCellWidths(): void {
        // if it is not a table row then skip this
        if (this.element.nativeElement.tagName !== 'TR') {
            return;
        }

        // access the preview element, this is private but there is no public way to access
        // it and the UI is incorrect when draggingtable rows without this.
        const previewElement = (this._dragRef as any)._preview as HTMLElement;

        // re-apply all the stored styles
        Array.from(previewElement.children).forEach(
            (cell: HTMLElement, index) => (cell.style.minWidth = this._widths.get(index))
        );
    }
}
