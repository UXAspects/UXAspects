import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { NavigationService } from '../../services/navigation/navigation.service';

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

    @ViewChild('container', { static: true }) container: ElementRef;

    top: number;
    height: number;
    width: number;

    private _onDestroy = new Subject<void>();

    constructor(@Inject(DOCUMENT) private _document: Document,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _navigationService: NavigationService) { }

    ngOnInit(): void {

        // Set up fragment IDs
        for (let category of this.navigation.categories) {
            this._navigationService.setSectionIds(category.sections);
        }

        // Fix nav position on navigate
        this._router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._onDestroy)).subscribe(() => {
            setTimeout(this.updatePosition.bind(this), 100);
        });
    }

    ngAfterViewInit(): void {
        // Delay to allow the document to render in order to get the correct initial height
        setTimeout(this.updatePosition.bind(this), 100);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    isActive(section: string): boolean {
        return section === this._activatedRoute.snapshot.fragment;
    }

    goToSection(section: string): void {
        if (this._navigationService.isFragmentActive(section)) {
            this._navigationService.scrollToFragment(section);
        } else {
            this._router.navigate([], { fragment: section });
        }
    }

    setPaneWidth(width: number): void {
        this.width = width;
    }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.updatePosition();
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        this.updatePosition();
    }

    private updatePosition(): void {

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
