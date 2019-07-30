import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ICategory } from '../../interfaces/ICategory';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { ISearchResult } from '../../interfaces/ISearch';
import { ISection } from '../../interfaces/ISection';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { VersionService } from '../../services/version/version.service';


const QUERY_MIN_CHARS = 3;
const MAX_HISTORY = 5;
const SHORTCUT_KEYCODE = 191;
const LOCAL_STORAGE_KEY = 'uxd-search-history';

@Component({
    selector: 'uxd-navigation-bar-search',
    templateUrl: './navigation-bar-search.component.html',
    styleUrls: ['./navigation-bar-search.component.less'],
    host: {
        '[class.active]': 'searching'
    }
})
export class NavigationBarSearchComponent implements AfterViewInit, OnDestroy {

    @ViewChildren('searchInput') searchInput: QueryList<ElementRef>;

    searching: boolean = false;
    query = new BehaviorSubject<string>('');
    results: ISearchResult[] = [];
    activeIdx: number = 0;

    private _data: ISearchResult[] = this.createSearchData();
    private _history: ISearchResult[] = this.loadHistory();
    private _onDestroy = new Subject<void>();

    constructor(private router: Router,
        private _navigation: NavigationService,
        private _versionService: VersionService,
        private _appConfig: AppConfiguration,
        private _persistentDataService: PersistentDataService) {

        this.query.pipe(debounceTime(200), takeUntil(this._onDestroy)).subscribe(this.search.bind(this));
        this._versionService.version.pipe(takeUntil(this._onDestroy)).subscribe(() => this._data = this.createSearchData());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    getSearchResults(page: IDocumentationPage): ISearchResult[] {

        if (!page) {
            return;
        }

        const results: ISearchResult[] = [];

        page.categories.forEach((category: ICategory) => {

            category.sections = category.sections || [];

            let showCategory = !!category.sections.find(section => this._versionService.isSectionVersionMatch(section));

            this._navigation.setSectionIds(category.sections);

            category.sections.forEach((section: ISection) => {
                if (this._versionService.isSectionVersionMatch(section)) {
                    results.push({
                        id: page.id || page.title,
                        section: page.title,
                        link: {
                            title: section.title,
                            link: category.link,
                            fragment: section.id
                        }
                    });

                    // Prevent addition of a category entry with the same title as a child section.
                    if (section.title === category.title) {
                        showCategory = false;
                    }
                }
            });
            if (showCategory) {
                results.push({
                    id: page.id || page.title,
                    section: page.title,
                    link: {
                        title: category.title,
                        link: category.link
                    }
                });
            }
        });

        return results;
    }

    ngAfterViewInit() {

        // when the input is shown focus it
        this.searchInput.changes.pipe(takeUntil(this._onDestroy)).subscribe((searchInputs: QueryList<ElementRef>) => {
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
        if (event.altKey && event.which === SHORTCUT_KEYCODE) {
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
            this.results = this._history;

        } else if (value.length < QUERY_MIN_CHARS) {

            // Show nothing for wide searches
            this.results = [];

        } else {

            // get the latest results
            this.results = this._data.filter((item: ISearchResult) => {
                return item.link.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            });
        }
    }

    navigate(item: ISearchResult) {

        // navigate to a selected item
        this.router.navigate([item.id.toLowerCase(), item.link.link], { fragment: item.link.fragment });

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

    private createSearchData(): ISearchResult[] {
        return this._appConfig.documentationPages
            .map(name => this.getSearchResults(this._appConfig.getConfigurationData(name)))
            .reduce((pre, cur) => pre.concat(cur));
    }

    /**
     * Add an item to the bounded history list.
     */
    private addToHistory(item: ISearchResult) {

        // Remove the item if it's already there.
        const historyIndex = this._history.indexOf(item);
        if (historyIndex >= 0) {
            this._history.splice(historyIndex, 1);
        }

        // Add to the front of the list.
        this._history.unshift(item);

        // Remove items to maintain history limit
        while (this._history.length > MAX_HISTORY) {
            this._history.pop();
        }

        // Commit to local storage
        this.saveHistory(this._history);
    }

    private loadHistory(): ISearchResult[] {
        const json = this._persistentDataService.getItem(LOCAL_STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    }

    private saveHistory(history: ISearchResult[]) {
        this._persistentDataService.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    }
}