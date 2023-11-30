import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, colorSets } from '../../services/color';
import { Breadcrumb } from '../breadcrumbs/breadcrumbs.component';
import { PageHeaderNavigationItem } from './navigation/navigation.component';
import { PageHeaderModule } from './page-header.module';

@Component({
    selector: 'app-page-header-test',
    template: `
        <ux-page-header
            header="UX"
            [backVisible]="true"
            [crumbs]="crumbs"
            [items]="items"
            (backClick)="onBackClick()"
            (logoClick)="onLogoClick()">
        </ux-page-header>
    `
})
export class PageHeaderTestComponent {

    items: PageHeaderNavigationItem[] = [
        {
            icon: 'home',
            title: 'Home',
            id: 'home'
        },
        {
            icon: 'analytics',
            title: 'Analytics',
            id: 'analytics',
            children: [
                {
                    title: 'Bar Charts',
                    id: 'bar-charts'
                },
                {
                    title: 'Pie Charts',
                    id: 'pie-charts',
                    children: [
                        {
                            title: 'Daily View',
                            id: 'daily-view'
                        },
                        {
                            title: 'Weekly View',
                            id: 'weekly-view'
                        },
                        {
                            title: 'Monthly View',
                            id: 'monthly-view'
                        }
                    ]
                }
            ]
        }
    ];

    crumbs: Breadcrumb[] = [
        {
            title: 'Home',
            routerLink: 'home'
        },
        {
            title: 'Archive',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick: () => {}
        },
        {
            title: 'Page',
            routerLink: 'page',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick: () => {}
        }
    ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onLogoClick(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBackClick(): void {}
}

describe('Page Header Component', () => {
    let component: PageHeaderTestComponent;
    let fixture: ComponentFixture<PageHeaderTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PageHeaderModule,
                RouterModule.forRoot([]),
                ColorServiceModule.forRoot(colorSets.keppel),
                NoopAnimationsModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ],
            declarations: [PageHeaderTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PageHeaderTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

        fixture.detectChanges();
    });

    /**
     * We cannot do this in the existing E2E Page Header
     * tests as in the Keppel theme the logo container
     * is not visible and therefore we cannot perform the
     * necessary click.
     */
    it ('should emit event on logo click', () => {

        // find the logo container
        const logoContainer: HTMLElement = nativeElement.querySelector('.page-header-logo-container');
        expect(logoContainer).toBeTruthy();

        // set up a spy for the onLogoClick function
        spyOn(component, 'onLogoClick');
        logoContainer.click();
        expect(component.onLogoClick).toHaveBeenCalled();

    });

    it ('should emit event on back click', () => {

        // Ensure back button is visible
        const backButton: HTMLElement = nativeElement.querySelector('.page-header-back-button');
        expect(backButton).toBeTruthy();

        // set up a spy for the onBackClick function
        spyOn(component, 'onBackClick');
        backButton.click();
        expect(component.onBackClick).toHaveBeenCalled();

    });

    it ('should have a product header of UX', () => {

        // Checks that the page header us 'UX'
        const pageHeader: HTMLElement = nativeElement.querySelector('.page-header-acronym');
        expect(pageHeader.textContent).toContain('UX');
    });

    it('should add href to breadcrumbs with a routerLink', () => {
        const homeBreadcrumb = nativeElement.querySelector('.breadcrumb a');
        expect(homeBreadcrumb.textContent.trim()).toBe('Home');
        expect(homeBreadcrumb.hasAttribute('href')).toBe(true);
    });

    it('should not add href to breadcrumbs without a routerLink', () => {
        const archiveBreadcrumb = nativeElement.querySelectorAll('.breadcrumb a')[1];
        expect(archiveBreadcrumb.textContent.trim()).toBe('Archive');
        expect(archiveBreadcrumb.hasAttribute('href')).toBe(false);
    });

    it('should only add one <a> for each breadcrumb', () => {
        const breadcrumbs = nativeElement.querySelectorAll('.breadcrumb a');
        expect(breadcrumbs.length).toBe(3);
    });

    it('should propagate ids through menu and sub menu items', async () => {
        const navigation = nativeElement.querySelector('.page-header-navigation');
        const navItems = navigation.querySelectorAll('button');

        expect(navItems[0].id).toBe('home');
        expect(navItems[1].id).toBe('analytics');

        // open and check menu items
        navItems[1].click();
        fixture.detectChanges();

        const menu = document.querySelector('.ux-menu');
        const menuItems = menu.querySelectorAll('button');

        expect(menuItems[0].id).toBe('bar-charts');
        expect(menuItems[1].id).toBe('pie-charts');

        // open and check sub menu items
        menuItems[1].dispatchEvent(new MouseEvent('mouseenter'));
        fixture.detectChanges();
        await fixture.whenStable();

        const subMenu = document.querySelector('.horizontal-navigation-dropdown-submenu');
        const subMenuItems = subMenu.querySelectorAll('button');

        expect(subMenuItems[0].id).toBe('daily-view');
        expect(subMenuItems[1].id).toBe('weekly-view');
        expect(subMenuItems[2].id).toBe('monthly-view');
    });

    it('should add the menubar role when there are items', () => {
        const menuBar = document.querySelector('ux-page-header-horizontal-navigation');
        expect(menuBar.getAttribute('role')).toContain('menubar');
    });

    it('should not add the menubar role when there are no items', () => {
        component.items = [];
        fixture.detectChanges();
        const menuBar = document.querySelector('ux-page-header-horizontal-navigation');
        expect(menuBar.getAttribute('role')).not.toBe('menubar');
    });
});

@Component({
    selector: 'app-page-header-secondary-test',
    template: `
        <ux-page-header
            [items]="items"
            [secondaryNavigation]="true"
            [secondaryNavigationAlignment]="'center'"
            [secondaryNavigationAutoselect]="true">
        </ux-page-header>
    `
})
export class PageHeaderSecondaryTestComponent {

    items: PageHeaderNavigationItem[] = [
        {
            title: 'Home',
            id: 'home'
        },
        {
            title: 'Secondary',
            id: 'secondary',
            children: [
                {
                    title: 'Secondary Menu 1',
                    id: 'secondary-menu-1'
                },
                {
                    title: 'Secondary Menu 2',
                    id: 'secondary-menu-2'
                },
                {
                    title: 'Secondary Menu 3',
                    id: 'secondary-menu-3'
                },
            ]
        }
    ];
}

describe('Page Header Secondary Component', () => {
    let component: PageHeaderSecondaryTestComponent;
    let fixture: ComponentFixture<PageHeaderSecondaryTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PageHeaderModule,
                RouterModule.forRoot([]),
                ColorServiceModule.forRoot(colorSets.keppel),
                NoopAnimationsModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ],
            declarations: [PageHeaderSecondaryTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PageHeaderSecondaryTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;

        fixture.detectChanges();
    });

    it ('should propagate ids through secondary menu items', async () => {
        const navigation = nativeElement.querySelector('.page-header-navigation');
        const navItems = navigation.querySelectorAll('button');

        expect(navItems[0].id).toBe('home');
        expect(navItems[1].id).toBe('secondary');

        // open and check menu items
        navItems[1].click();
        fixture.detectChanges();
        await fixture.whenStable();

        const navTabs = document.querySelector('.nav-tabs');
        const tabItem = navTabs.querySelectorAll('.nav-link');

        expect(tabItem[0].id).toBe('secondary-menu-1');
        expect(tabItem[1].id).toBe('secondary-menu-2');
        expect(tabItem[2].id).toBe('secondary-menu-3');
    });
});