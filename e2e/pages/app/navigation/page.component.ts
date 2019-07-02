import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navigation-page',
    template: `<p id="page-content">{{ title }}</p>`,
    styles: [``]
})
export class NavigationPageComponent implements OnInit, OnDestroy {

    title: string;

    private _subscription: Subscription;

    constructor(public route: ActivatedRoute) { }

    ngOnInit(): void {
        this._subscription = this.route.data.subscribe(data => this.title = data['title']);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
