import { Directive, ElementRef, QueryList, ContentChildren, Input, AfterContentInit, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { ResizeService } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';

@Directive({
    selector: '[uxLayoutSwitcher]'
})
export class LayoutSwitcherDirective implements AfterContentInit, OnChanges {

    @Input() group: string;
    @ContentChildren(LayoutSwitcherItemDirective) private _layouts: QueryList<LayoutSwitcherItemDirective>;
    
    private _width: number;
    private _activeLayout: LayoutSwitcherItemDirective;

    constructor(private _elementRef: ElementRef, resizeService: ResizeService,
        private _viewContainerRef: ViewContainerRef) {

        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(event => {
            this._width = event.width;

            // render the appropriate layout
            this.updateActiveLayout();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {

        // if the active group has changed then render the appropriate layout
        if (changes.group.currentValue !== changes.group.previousValue) {
            this.updateActiveLayout();
        }
    }

    getActiveLayout(): LayoutSwitcherItemDirective | null {

        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }

        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(layout => this.group === layout.getConfig().group).find(layout => {

            let minWidth = layout.getConfig().minWidth || 0;
            let maxWidth = layout.getConfig().maxWidth || Infinity;

            return this._width >= minWidth && this._width < maxWidth;
        });
    }

    updateActiveLayout(): void {

        // get the layout that should be shown
        let layout = this.getActiveLayout();

        // check if we are currently showing the layout
        if (this._activeLayout === layout) {
            return;
        }

        // remove the current layout
        if (this._activeLayout) {
            this._activeLayout.deactivate();
        }

        // store the new active layout
        this._activeLayout = layout;

        // if there is an active layout then activate
        if (this._activeLayout) {
            this._activeLayout.activate();
        }
    }

    ngAfterContentInit(): void {

        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;

        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    }
}