import { NavigationItem } from './navigation-item.inferface';
export declare class NavigationService {
    items: NavigationItem[];
    autoCollapse: boolean;
    setExpanded(source: NavigationItem, expanded: boolean): void;
    private collapseSiblings(source);
    private collapseAll(item);
    private getParent(target, item);
}
