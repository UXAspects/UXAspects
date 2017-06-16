import { ICategory } from '../../interfaces/ICategory';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { ISearchResult } from '../../interfaces/ISearch';
import { ISection } from '../../interfaces/ISection';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const QUERY_MIN_CHARS = 3;
const MAX_HISTORY = 5;

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

    protected searching: boolean;
    protected query: BehaviorSubject<string>;
    protected results: ISearchResult[];
    protected activeIdx: number;

    private data: ISearchResult[];
    private history: ISearchResult[] = [];

    constructor(private router: Router, private navigation: NavigationService) {
        this.searching = false;
        this.query = new BehaviorSubject<string>('');
        this.data = [];
        this.results = [];
        this.activeIdx = 0;

        let componentsData: IDocumentationPage = require('../../data/components-page.json');
        let cssData: IDocumentationPage = require('../../data/css-page.json');
        let chartsData: IDocumentationPage = require('../../data/charts-page.json');

        this.data = this.data.concat(this.getSearchResults(componentsData));
        this.data = this.data.concat(this.getSearchResults(cssData));
        this.data = this.data.concat(this.getSearchResults(chartsData));

        this.query.debounceTime(200).subscribe(this.search.bind(this));
    }

    getSearchResults(page: IDocumentationPage): ISearchResult[] {
        var results: ISearchResult[] = [];
        page.categories.forEach((category: ICategory) => {
            results.push({
                section: page.title,
                link: {
                    title: category.title,
                    link: category.link
                }
            });
            if (category.sections) {
                this.navigation.setSectionIds(category.sections);
                category.sections.forEach((section: ISection) => {
                    results.push({
                        section: page.title,
                        link: {
                            title: section.title,
                            link: category.link,
                            fragment: section.id
                        }
                    });
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

    @HostListener('window:keydown', ['$event'])
    windowKeydown(event: KeyboardEvent) {
        // Open the search dialog on alt+/
        if (event.altKey && event.key === '/') {
            this.searching = true;
            event.preventDefault();
        }
    }

    hideSearch() {
        this.searching = false;
        this.query.next('');
    }

    escapeKey() {
        this.hideSearch();
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

        if (value === null || value === '') {

            // If the query is empty, show last 5 selected results.
            this.results = this.history;

        } else if (value.length < QUERY_MIN_CHARS) {

            // Show nothing for wide searches
            this.results = [];

        } else {

            // get the latest results
            this.results = this.data.filter((item: ISearchResult) => {
                return item.link.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            });
        }
    }

    navigate(item: ISearchResult) {

        // navigate to a selected item
        this.router.navigate([item.section.toLowerCase(), item.link.link], { fragment: item.link.fragment });

        // hide the search once selected
        this.hideSearch();

        this.addToHistory(item);
    }

    /*
        Determine if there are multiple search items displayed with the same title
    */
    isDuplicate(item: ISearchResult) {
        return this.results.filter((result: ISearchResult) => result.link.title === item.link.title).length > 1;
    }

    /**
     * Add an item to the bounded history list.
     */
    private addToHistory(item: ISearchResult) {

        // Remove the item if it's already there.
        const historyIndex = this.history.indexOf(item);
        if (historyIndex >= 0) {
            this.history.splice(historyIndex, 1);
        }

        // Add to the front of the list.
        this.history.unshift(item);

        // Remove items to maintain history limit
        while (this.history.length > MAX_HISTORY) {
            this.history.pop();
        }
    }
}