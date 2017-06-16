import { IDocumentationPage } from './../../interfaces/IDocumentationPage';
import { VersionService } from './../../services/version/version.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'uxd-components',
    templateUrl: './components.component.html'
})
export class ComponentsPageComponent {

    navigation: IDocumentationPage;
    fullNavigation: IDocumentationPage;

    versionRadioValue: string = 'Angular';

    version: string;

    constructor(private versionService: VersionService) {

        // get version
        this.versionService.versionChange.subscribe((value: string) => this.filterNavigation(value));

        // load in the navigation json for this page
        this.fullNavigation = require('../../data/components-page.json');

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