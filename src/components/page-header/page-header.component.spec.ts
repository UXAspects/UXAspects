import { ComponentFixture, TestBed} from '@angular/core/testing';
import { PageHeaderModule } from './page-header.module';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ColorServiceModule, colorSets } from '../../services/color';
import { Breadcrumb } from '../breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-page-header-test',
    template: `
        <ux-page-header
            header="UX"
            [backVisible]="true"
            [crumbs]="crumbs"
            (backClick)="onBackClick()"
            (logoClick)="onLogoClick()">
        </ux-page-header>
    `
})
export class PageHeaderTestComponent {

    crumbs: Breadcrumb[] = [
        {
            title: 'Home',
            routerLink: 'home'
        },
        {
            title: 'Archive',
            onClick: () => {}
        },
        {
            title: 'Page',
            routerLink: 'page',
            onClick: () => {}
        }
    ];

    onLogoClick(): void {}

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
                ColorServiceModule.forRoot(colorSets.keppel)
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

});
