import { INavigationMenuService } from './navigation-menu.interface';
export declare class NavigationMenuService implements INavigationMenuService {
    private _navigationMenuService;
    constructor(_navigationMenuService: INavigationMenuService);
    show(): void;
    hide(): void;
    visible(): boolean;
    collapseAtWidth(): number;
    setCollapseAtWidth(width: number): void;
    setDefaultCollapseAtWidth(): void;
}
