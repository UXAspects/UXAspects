import { Component, Input } from '@angular/core';

@Component({
    selector: 'ux-breadcrumbs',
    templateUrl: 'breadcrumbs.component.html'
})

export class BreadcrumbsComponent {

    @Input() crumbs: Breadcrumb[];

    clickCrumb(event: MouseEvent, crumb: Breadcrumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    }
}

export interface Breadcrumb {
    title: string;
    routerLink?: string;
    fragment?: string;
    queryParams?: any;
    onClick?: (event: MouseEvent) => void;
}