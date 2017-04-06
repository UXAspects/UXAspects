import { Component } from '@angular/core';
import { ILink } from '../../interfaces/ILink';

@Component({
    selector: 'uxd-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent {

    private brand: ILink;
    private links: ILink[];
    private social: ILink[];
    private expanded: boolean = false;

    constructor() {

        // load the data from the json file
        let navigation = require('../../data/top-navigation.json');

        // store the relevant parts of the navigation file
        this.brand = navigation.brand;
        this.links = navigation.links;
        this.social = navigation.social;
    }
}