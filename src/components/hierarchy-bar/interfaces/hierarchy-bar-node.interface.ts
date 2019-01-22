import { Observable } from 'rxjs/Observable';

export interface HierarchyBarNode {
    icon?: string;
    title: string;
    selected?: boolean;
    parent?: HierarchyBarNode;
    children?: HierarchyBarNode[] | Observable<HierarchyBarNode[]>;
}