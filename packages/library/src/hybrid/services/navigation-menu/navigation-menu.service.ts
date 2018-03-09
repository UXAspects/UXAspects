import { Injectable, Inject, Injector } from '@angular/core';
import { INavigationMenuService } from './navigation-menu.interface';

@Injectable()
export class NavigationMenuService implements INavigationMenuService {

    constructor( @Inject('$navigationMenu') private _navigationMenuService: INavigationMenuService) { }

    show(): void {
        this._navigationMenuService.show();
    }

    hide(): void {
        this._navigationMenuService.hide();
    }

    visible(): boolean {
        return this._navigationMenuService.visible();
    }

    collapseAtWidth(): number {
        return this._navigationMenuService.collapseAtWidth();
    }

    setCollapseAtWidth(width: number): void {
        this._navigationMenuService.setCollapseAtWidth(width);
    }

    setDefaultCollapseAtWidth(): void {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    }

}

export function navigationMenuServiceFactory(injector: Injector) {
    return injector.get('$navigationMenu');
}

export const navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};