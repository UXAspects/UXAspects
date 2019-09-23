import { HierarchyBarNode } from './hierarchy-bar-node.interface';

export interface HierarchyBarNodeChildren {
    loading: boolean;
    children: HierarchyBarNode[];
}