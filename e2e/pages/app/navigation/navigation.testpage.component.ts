import { Component } from '@angular/core';
import { NavigationItem } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.testpage.component.html',
    styleUrls: ['./navigation.testpage.component.css']
})
export class NavigationTestPageComponent {

    items: NavigationItem[] = [
        {
            title: 'Dashboard',
            icon: 'hpe-dashboard',
            routerLink: '/navigation/dashboard'
        },
        {
            title: 'Products',
            icon: 'hpe-service-business',
            children: [
                {
                    title: 'Add Product',
                    routerLink: '/navigation/products/add'
                },
                {
                    title: 'Remove Product',
                    routerLink: '/navigation/products/remove',
                    routerOptions: {
                        ignoreQueryParams: true
                    }
                }
            ]
        },
        {
            title: 'Accounts',
            icon: 'hpe-user',
            routerLink: '/navigation/accounts',
            children: [
                {
                    title: 'Add Account',
                    routerLink: '/navigation/accounts/add'
                },
                {
                    title: 'Remove Account',
                    routerLink: '/navigation/accounts/remove'
                }
            ]
        },
    ];

    tree: boolean = false;
    autoCollapse: boolean = false;

    disableExact(): void {
        this.items.forEach((item: NavigationItem) => {
            item.routerOptions = { ...item.routerOptions, exact: false };

            if (item.children) {
                item.children.forEach((child: NavigationItem) => child.routerOptions = { ...child.routerOptions, exact: false });
            }
        });
    }
}
