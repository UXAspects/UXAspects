import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
    selector: 'uxd-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.less'],
    host: {
        '[style.top.px]': 'top'
    }
})
export class SideNavigationComponent implements OnInit {
    @Input() navigation: IDocumentationPage;

    private top: number;

    constructor(@Inject(DOCUMENT) private document: Document,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService) {}

    ngOnInit() {
        this.updatePosition();
    }

    goToSection(category: string, section: string) {
        if (section === this.activatedRoute.snapshot.fragment) {
            this.navigationService.scrollToSection(section);
        } else {
            this.router.navigate([], { fragment: section });
        }
    }

    @HostListener('window:scroll')
    private updatePosition() {
        const offset = 185 - this.document.body.scrollTop;
        if (offset >= 50) {
            this.top = offset;
        } else {
            this.top = 50;
        }
    }
}
