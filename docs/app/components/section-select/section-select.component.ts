import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

@Component({
    selector: 'uxd-section-select',
    templateUrl: './section-select.component.html'
})
export class SectionSelectComponent implements OnInit, OnDestroy {

    @Input() navigation: IDocumentationPage;

    section: any;
    private _path: string;
    private _routeSubscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this._routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {

                // store the base path of the active url
                this.activatedRoute.url.subscribe(urlSegment => {
                    this._path = urlSegment && urlSegment.length > 0 ? urlSegment[0].path : undefined;
                });

                this.activatedRoute.firstChild.url.subscribe(urlSegment => {
                    this.section = this.navigation.categories.find(category => category.link === urlSegment[0].path);
                });
            }
        });
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }

    navigateToSection() {
        this.router.navigateByUrl(`${this._path}/${this.section.link}`);
    }
}