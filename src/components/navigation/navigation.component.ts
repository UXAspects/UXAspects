import { Component, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
    selector: 'ux-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent {

    @Input()
    items: NavigationItem[];

    @Input()
    tree: boolean = false;
}

export interface NavigationItem {
    title: string;
    icon?: string;
    routerLink?: string | string[];
    routerExtras?: NavigationExtras;
    click?: (_: MouseEvent) => void;
    expanded?: boolean;
    children?: NavigationItem[];
}