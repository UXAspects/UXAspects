export interface INavigationMenuService {
    show(): void;
    hide(): void;
    visible(): boolean;
    collapseAtWidth(): number;
    setCollapseAtWidth(width: number): void;
    setDefaultCollapseAtWidth(): void;
}
