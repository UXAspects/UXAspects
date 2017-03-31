import { Component, Input, OnInit, HostListener, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { NavigationService } from '../../services/navigation/navigation.service';

const BANNER_OFFSET = 172;
const FOOTER_OFFSET = 162;

@Component({
    selector: 'uxd-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.less'],
    host: {
        '[style.top.px]': 'top',
        '[style.height.px]': 'height'
    }
})
export class SideNavigationComponent implements OnInit, AfterViewInit {
    @Input() navigation: IDocumentationPage;

    private top: number;
    private height: number;
    private scrollApi: any = {};

    constructor( @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService) { }

    ngOnInit() {
        for (let category of this.navigation.categories) {
            this.navigationService.setSectionIds(category.sections);
        }
    }

    ngAfterViewInit() {
        // Delay to allow the document to render in order to get the correct initial height
        setTimeout(() => {
            this.updatePosition();
        });
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

        // TODO: jscrollpane support
        // if (this.scrollApi && this.scrollApi.reinitialize) {
        //     this.scrollApi.reinitialize();
        // }
    }
}
