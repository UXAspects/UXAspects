import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';

@Injectable()
export class MenuNavigationService {

    active$ = new BehaviorSubject<MenuNavigationItemDirective>(null);
}