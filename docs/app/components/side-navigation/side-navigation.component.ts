import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
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

    private routeSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        public versionService: VersionService) {

        // Subscribe to version changes in order to re-filter the sections.
        this.versionService.version.subscribe((value: Version) => this.versionChanged(value));
    }

    ngOnInit() {

        // Set up fragment IDs
        for (let category of this.navigation.categories) {
            this.navigationService.setSectionIds(category.sections);
        }

        // Get initial filtered content
        this.versionChanged(this.versionService.version.getValue());

        // Fix nav position on navigate
        this.routeSubscription = this.router.events.subscribe((event) => {
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
        this.routeSubscription.unsubscribe();
    }

    isActive(section: string) {
        return (section === this.activatedRoute.snapshot.fragment);
    }

    goToSection(category: string, section: string) {
        if (this.navigationService.isFragmentActive(section)) {
            this.navigationService.scrollToFragment(section);
        } else {
            this.router.navigate([], { fragment: section });
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
        const topOffset = BANNER_OFFSET - this.document.body.scrollTop;
        if (topOffset >= this.navigationService.getTopOffset()) {
            this.top = topOffset;
        } else {
            this.top = this.navigationService.getTopOffset();
        }
        // Find the offset for the footer
        const scrollBottom = this.document.body.scrollTop + this.document.body.clientHeight;
        let bottomOffset = FOOTER_OFFSET - (this.document.body.scrollHeight - scrollBottom);
        if (bottomOffset < 0) {
            bottomOffset = 0;
        }
        this.height = this.document.documentElement.clientHeight - this.top - bottomOffset;

        this.width = this.container.nativeElement.offsetWidth;

        // TODO: jscrollpane support
        // if (this.scrollApi && this.scrollApi.reinitialize) {
        //     this.scrollApi.reinitialize();
        // }
    }
}
