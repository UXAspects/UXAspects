import { Component, Input, ContentChildren, QueryList } from '@angular/core';

import { LandingPageFeatureComponent } from '../landing-page-feature/landing-page-feature.component';

@Component({
    selector: 'uxd-landing-page-feature-list',
    template: '<ng-content></ng-content>',
    styles: [':host { display: block; }'],
    host: {
        'class': 'row'
    }
})
export class LandingPageFeatureListComponent { 

    @Input() columns = 4;
    @ContentChildren(LandingPageFeatureComponent) features: QueryList<LandingPageFeatureComponent>;

    ngAfterContentInit() {

        // iterate each feature and set the correct column classes
        this.features.forEach(this.applyColumns.bind(this));
    }

    applyColumns(feature: LandingPageFeatureComponent) {

        if (this.columns == 3) {
            feature.columns = 'col-md-4 col-sm-4';
        }

        if (this.columns == 4) {
            feature.columns = 'col-md-3 col-sm-6';
        }
    }

}