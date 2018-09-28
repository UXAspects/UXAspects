import { TreeGridState } from './tree-grid-state.class';
export interface TreeGridItem {
    children?: TreeGridItem[];
    expanded?: boolean;
    state?: TreeGridState;
}
