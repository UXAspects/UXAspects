import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { FocusIndicatorOrigin, FocusIndicatorOriginService } from '../../../directives/accessibility/index';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-popover-item',
    templateUrl: './hierarchy-bar-popover-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarPopoverItemComponent implements OnDestroy {

    /** Specify the node to display */
    @Input() node: HierarchyBarNode;

    /**
     * Emit when a click or enter key press occurs.
     * Note this is an `async` EventEmitter to ensure that
     * the event handlers in the `FocusIndicatorOrigin` set
     * the origin before we emit the select event, otherwise
     * the item may not get a focus ring when the keyboard is used.
     */
    @Output() select = new EventEmitter<HierarchyBarNode>(true);

    /** Allow this to control the focus origin */
    private _focusOrigin: FocusIndicatorOrigin;

    constructor(
        focusOriginService: FocusIndicatorOriginService,
        elementRef: ElementRef,
        renderer: Renderer2,
        public readonly hierarchyBar: HierarchyBarService
    ) {
        this._focusOrigin = new FocusIndicatorOrigin(focusOriginService, elementRef, renderer);
    }

    ngOnDestroy(): void {
        this._focusOrigin.destroy();
    }

    @HostListener('click')
    @HostListener('keydown.enter')
    onSelect(): void {
        this.select.emit(this.node);
    }

}