import { Component, HostListener, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { ISearchResult } from '../../interfaces/ISearch';
import { ICategory } from '../../interfaces/ICategory';
import { ISection } from '../../interfaces/ISection';
import { NavigationService } from '../../services/navigation/navigation.service';
import { VersionService, Version } from '../../services/version/version.service';

@Component({
    selector: 'uxd-navigation-bar-search',
    templateUrl: './navigation-bar-search.component.html',
    styleUrls: ['./navigation-bar-search.component.less'],
    host: {
        '[class.active]': 'searching'
    }
})
export class NavigationBarSearchComponent {

    @ViewChildren('searchInput') searchInput: QueryList<ElementRef>;

    private searching: boolean;
    private query: string;
    private results: ISearchResult[];
    private activeIdx: number;

    private data: ISearchResult[];

    private angular = true;

    private ngVersions = Version;

    constructor(private router: Router, private navigation: NavigationService, private versionService: VersionService) {

        // get version
        this.versionService.version.subscribe((value: Version) => {
            this.angular = value === this.ngVersions.Angular;
            this.data = [];
            this.data = this.data.concat(this.getSearchResults(componentsData));
            this.data = this.data.concat(this.getSearchResults(cssData));
            this.data = this.data.concat(this.getSearchResults(chartsData));
        });

        this.searching = false;
        this.query = '';
        this.data = [];
        this.results = [];
        this.activeIdx = 0;

        let componentsData: IDocumentationPage = require('../../data/components-page.json');
        let cssData: IDocumentationPage = require('../../data/css-page.json');
        let chartsData: IDocumentationPage = require('../../data/charts-page.json');

        this.data = this.data.concat(this.getSearchResults(componentsData));
        this.data = this.data.concat(this.getSearchResults(cssData));
        this.data = this.data.concat(this.getSearchResults(chartsData));
    }

    getSearchResults(page: IDocumentationPage): ISearchResult[] {
        if (!page) {
            return; 
        }
        var results: ISearchResult[] = [];
        page.categories.forEach((category: ICategory) => {

            let showCategory = !!category.sections.find((section, idx) => this.angular && !category.sections[idx].deprecated || !this.angular && category.sections[idx].version === 'AngularJS');
            
            if (showCategory) {
                results.push({
                    section: page.title,
                    link: {
                        title: category.title,
                        link: category.link
                    }
                });
            }
            
            if (category.sections) {
                this.navigation.setSectionIds(category.sections);
                category.sections.forEach((section: ISection) => {
                    if (this.angular && !section.deprecated || !this.angular && section.version === 'AngularJS') {
                        results.push({
                            section: page.title,
                            link: {
                                title: section.title,
                                link: category.link,
                                fragment: section.id
                            }
                        });
                    }
                });
            }
        });

        return results;
    }

    ngAfterViewInit() {

        // when the input is shown focus it
        this.searchInput.changes.subscribe((searchInputs: QueryList<ElementRef>) => {
            if (searchInputs.length > 0) {
                searchInputs.first.nativeElement.focus();
            }
        });
    }

    @HostListener('click')
    toggleSearch() {
        this.searching = !this.searching;
    }

    hideSearch() {
        this.searching = false;
    }

    escapeKey() {
        this.searching = false;
    }

    upKey(event: KeyboardEvent) {
        
        this.activeIdx--;

        if (this.activeIdx < 0) {
            this.activeIdx = 0;
        }

        event.preventDefault();
    }

    downKey(event: KeyboardEvent) {
        
        this.activeIdx++;

        if (this.activeIdx >= this.results.length - 1) {
            this.activeIdx = this.results.length > 0 ? this.results.length - 1 : 0;
        }

        event.preventDefault();
    }

    enterKey() {       

        if (this.results.length > 0) {

            // get the selected item
            let item = this.results[this.activeIdx];

            this.navigate(item);
        }
    }

    search(value: string) {

        // if search query changes reset the active index
        this.activeIdx = 0;

        // store the current search query
        this.query = value;

        // if the search query is empty or less than 3 characters show no results
        if (this.query === null || this.query === '' || this.query.length < 3) {
            this.results = [];
            return;
        }

        // get the latest results
        this.results = this.data.filter((item: ISearchResult) => {
            return item.link.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
        });
    }

    navigate(item: ISearchResult) {

        // hide the search once selected
        this.hideSearch();

        // navigate to a selected item
        this.router.navigate([item.section.toLowerCase(), item.link.link], { fragment: item.link.fragment });
    }

    /*
        Determine if there are multiple search items displayed with the same title
    */
    isDuplicate(item: ISearchResult) {
        return this.results.filter((result: ISearchResult) => result.link.title === item.link.title).length > 1;
    }
}