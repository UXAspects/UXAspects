import { Component } from '@angular/core';

@Component({
    selector: 'uxd-landing-page-feature-list',
    template: '<ng-content></ng-content>',
    styles: [':host { display: flex; justify-content: center; }'],
    host: {
        'class': 'row'
    }
})
export class LandingPageFeatureListComponent {}