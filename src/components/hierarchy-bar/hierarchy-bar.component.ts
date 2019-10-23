import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayTrigger } from '../tooltip/index';
import { HierarchyBarNodeIconDirective } from './hierarchy-bar-node/hierarchy-bar-node-icon.directive';
import { HierarchyBarService } from './hierarchy-bar.service';
import { HierarchyBarIconContext } from './interfaces/hierarchy-bar-node-icon-context.interface';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';
import { HierarchyBarMode, IHierachyBarComponent } from './interfaces/hierarchy-bar.interface';

@Component({
    selector: 'ux-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [HierarchyBarService]
})
export class HierarchyBarComponent implements IHierachyBarComponent, OnDestroy {

    /** Define which presentational mode we should display */
    @Input() mode: HierarchyBarMode = 'standard';

    /** hierarchy bar as being readonly - default false */
    @Input() readonly: boolean = false;

    /** Define the root node of the hierarchy bar */
    @Input() set root(node: HierarchyBarNode) {
        this._hierarchyBar.setRootNode(node);
    }

    /** Define the selected node in the hierarchy bar */
    @Input() set selected(node: HierarchyBarNode) {
        this._hierarchyBar.selectNode(node);
    }

    /** Provide a custom loading indicator */
    @Input() set loadingIndicator(loadingIndicator: TemplateRef<any>) {
        this._hierarchyBar.loadingIndicator = loadingIndicator;
    }

    /** Provide a custom overflow template */
    @Input() set overflowTemplate(overflowTemplate: TemplateRef<any>) {
        this._hierarchyBar.overflowTemplate = overflowTemplate;
    }

    /** Define the events that show the popover when interacting with the arrows */
    @Input() set popoverShowTriggers(popoverShowTriggers: OverlayTrigger[]) {
        this._hierarchyBar.popoverShowTriggers = popoverShowTriggers;
    }

    /** Define the events that hide the popover when interacting with the arrows */
    @Input() set popoverHideTriggers(popoverHideTriggers: OverlayTrigger[]) {
        this._hierarchyBar.popoverHideTriggers = popoverHideTriggers;
    }

    /** Define the aria label for the show siblings popover button */
    @Input() set showSiblingsAriaLabel(label: string) {
        this._hierarchyBar.showSiblingsAriaLabel = label;
    }

    /** Emit when the selected node changes */
    @Output() selectedChange = new EventEmitter<HierarchyBarNode>();

    /** Allow a custom icon to be specified */
    @ContentChild(HierarchyBarNodeIconDirective, { read: TemplateRef, static: false })
    set icon(icon: TemplateRef<HierarchyBarIconContext>) {
        this._hierarchyBar.icon = icon;
    }

    /** Unsubscribe from all subscriptions when component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(private readonly _hierarchyBar: HierarchyBarService) {

        // emit the latest selection value
        _hierarchyBar.selection$.pipe(takeUntil(this._onDestroy))
            .subscribe(selection => this.selectedChange.next(selection));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}