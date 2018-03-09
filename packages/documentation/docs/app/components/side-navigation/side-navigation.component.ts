import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Version, VersionService } from '../../services/version/version.service';

const BANNER_OFFSET = 186;
const FOOTER_OFFSET = 162;

@Component({
    selector: 'uxd-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.less']
})
export class SideNavigationComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() navigation: IDocumentationPage;
    @Input() angularJsButtonClass: string = 'button-toggle-primary';
    @Input() angularButtonClass: string = 'button-toggle-accent';

    @ViewChild('container') container: ElementRef;

    top: number;
    height: number;
    width: number;
    filteredNavigation: IDocumentationPage;

    Version = Version;

    private _document: Document;
    private _routeSubscription: Subscription;

    constructor(
        @Inject(DOCUMENT) document: any,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _navigationService: NavigationService,
        public versionService: VersionService
    ) {
        this._document = <Document>document;

        // Subscribe to version changes in order to re-filter the sections.
        this.versionService.version.subscribe((value: Version) => this.versionChanged(value));
    }

    ngOnInit() {

        // Set up fragment IDs
        for (let category of this.navigation.categories) {
            this._navigationService.setSectionIds(category.sections);
        }

        // Get initial filtered content
        this.versionChanged(this.versionService.version.getValue());

        // Fix nav position on navigate
        this._routeSubscription = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(this.updatePosition.bind(this), 100);
            }
        });
    }

    ngAfterViewInit() {
        // Delay to allow the document to render in order to get the correct initial height
        setTimeout(this.updatePosition.bind(this), 100);
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }

    isActive(section: string) {
        return (section === this._activatedRoute.snapshot.fragment);
    }

    goToSection(category: string, section: string) {
        if (this._navigationService.isFragmentActive(section)) {
            this._navigationService.scrollToFragment(section);
        } else {
            this._router.navigate([], { fragment: section });
        }
    }

    setPaneWidth(width: number) {
        this.width = width;
    }

    private versionChanged(version: Version) {
        if (this.navigation) {
            let categories = this.navigation.categories
                .map(category => {
                    return {
                        link: category.link,
                        title: category.title,
                        sections: category.sections.filter(section => this.versionService.isSectionVersionMatch(section))
                    };
                })
                .filter((category) => category.sections.length > 0);

            this.filteredNavigation = {
                title: this.navigation.title,
                categories: categories
            };
        }
    }

    @HostListener('window:scroll')
    private onWindowScroll() {
        this.updatePosition();
    }

    @HostListener('window:resize')
    private onWindowResize() {
        this.updatePosition();
    }

    private updatePosition() {

        // Adjust the top position to stick to the banner until it disappears under the header.
        const topOffset = BANNER_OFFSET - window.pageYOffset;
        if (topOffset >= this._navigationService.getTopOffset()) {
            this.top = topOffset;
        } else {
            this.top = this._navigationService.getTopOffset();
        }
        // Find the offset for the footer
        const scrollBottom = window.pageYOffset + window.innerHeight;
        let bottomOffset = FOOTER_OFFSET - (this._document.body.offsetHeight - scrollBottom);
        if (bottomOffset < 0) {
            bottomOffset = 0;
        }

        this.height = window.innerHeight - this.top - bottomOffset;
        this.width = this.container.nativeElement.offsetWidth;

    }
}
