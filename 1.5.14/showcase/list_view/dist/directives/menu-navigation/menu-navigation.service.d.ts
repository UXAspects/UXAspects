import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
export declare class MenuNavigationService {
    active$: BehaviorSubject<MenuNavigationItemDirective>;
}
