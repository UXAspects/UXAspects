import { NavigationExtras } from '@angular/router';
export interface NavigationItem {
    title: string;
    icon?: string;
    iconUrl?: string;
    iconLabel?: string;
    routerLink?: string | any[];
    routerExtras?: NavigationExtras;
    click?: (event: Event, navigationItem: NavigationItem) => void;
    expanded?: boolean;
    children?: NavigationItem[];
}
