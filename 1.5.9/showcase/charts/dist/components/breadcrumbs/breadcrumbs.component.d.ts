export declare class BreadcrumbsComponent {
    crumbs: Breadcrumb[];
    clickCrumb(event: MouseEvent, crumb: Breadcrumb): void;
}
export interface Breadcrumb {
    title: string;
    routerLink?: string;
    fragment?: string;
    queryParams?: any;
    onClick?: (event: MouseEvent) => void;
}
