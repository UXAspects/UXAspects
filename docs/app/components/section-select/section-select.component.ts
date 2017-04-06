import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'uxd-section-select',
    templateUrl: './section-select.component.html'
})
export class SectionSelectComponent implements OnInit, OnDestroy {

    @Input() navigation: IDocumentationPage;

    private section: any;
    private path: string;
    private routeSubscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {

                // store the base path of the active url
                this.activatedRoute.url.subscribe(urlSegment => {
                    this.path = urlSegment[0].path;
                });

                this.activatedRoute.firstChild.url.subscribe(urlSegment => {
                    this.section = this.navigation.categories.find(category => category.link === urlSegment[0].path);
                });
            }
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    navigateToSection(event: any) {
        this.router.navigateByUrl(`${this.path}/${this.section.link}`);
    }
}