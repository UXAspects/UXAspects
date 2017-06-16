import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { VersionService } from '../../services/version/version.service';

@Component({
    selector: 'uxd-charts',
    templateUrl: './charts.component.html'
})
export class ChartsPageComponent {

    navigation: IDocumentationPage;
    fullNavigation: IDocumentationPage;

    versionRadioValue: string = 'Angular';

    version: string;

    constructor(private versionService: VersionService) {

        // get version
        this.versionService.versionChange.subscribe((value: string) => this.filterNavigation(value));

        // load in the navigation json for this page
        this.fullNavigation = require('../../data/charts-page.json');

        this.filterNavigation('Angular');

    }

    filterNavigation(version: string) {

        let categories = this.fullNavigation.categories.map(category => {
            return {
                link: category.link,
                title: category.title,
                sections: category.sections.filter(section => {
                    return version === 'Angular' ? !section.deprecated : section.version === version;
                })
            };
        });

        this.navigation = {
            title: this.fullNavigation.title,
            categories: categories
        };
    }

    radioToggled(version: string) {
        this.versionService.toggle(version);
    }

}