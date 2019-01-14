import { EventEmitter, TemplateRef } from '@angular/core';
import { OverlayTrigger } from '../../tooltip/index';
import { HierarchyBarNode } from './hierarchy-bar-node.interface';
/**
 * This is an interface to ensure that there are
 * no breaking changes to the existing public API
 * of the hierachy bar component
 */
export interface IHierachyBarComponent {
    mode: HierarchyBarMode;
    root: HierarchyBarNode;
    selected: HierarchyBarNode;
    loadingIndicator: TemplateRef<any>;
    selectedChange: EventEmitter<HierarchyBarNode>;
    popoverShowTriggers: OverlayTrigger[];
    popoverHideTriggers: OverlayTrigger[];
}

export type HierarchyBarMode = 'standard' | 'collapsed';