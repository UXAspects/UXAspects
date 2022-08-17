import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PageHeaderNavigationItem } from '../../../../src';


@Component({
    selector: 'uxd-team',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.less']
})
export class TestPageComponent implements OnInit, OnDestroy {

    // // ux-select configuration properties
    options: string[] | Function;
    display: string = null;
    key: string = null;
    selected: string | string[];
    multiple = new BehaviorSubject<boolean>(false);
    allowNull = false;
    disabled = false;
    dropDirection = 'down';
    dropdownOpen: boolean;
    maxHeight: string = '250px';
    placeholder = 'Select a country';
    readonlyInput: boolean = false;
    clearButton: boolean = false;
    recentOptions: ReadonlyArray<string>;
    recentOptionsMaxCount: number = 5;

    private _pageSize = 20;
    private _onDestroy = new Subject<void>();

    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value: number) {
        const numValue = Number(value);
        this._pageSize = (numValue >= 1) ? numValue : 1;
    }

    // Customize settings
    pagingEnabled = new BehaviorSubject<boolean>(false);
    dataSet = new BehaviorSubject<string>('strings');
    loadOptionsCallback = this.loadOptions.bind(this);

    dataSets: { strings?: any[], objects?: any[] } = {};

    constructor() {

        // Reset select when "multiple" checkbox changes.
        this.multiple.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((value) => {
            this.selected = null;
            this.dropdownOpen = false;
        });

        // Reset and switch options between array and function when paging checkbox changes.
        this.pagingEnabled.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((value) => {
            this.selected = null;
            this.dropdownOpen = false;
            this.options = this.pagingEnabled.getValue() ? this.loadOptionsCallback : this.selectedDataSet();
        });

        // Reset and reassign options when the dataset changes. Also set display and key properties.
        this.dataSet.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((value) => {

            if (this.multiple.getValue() === true) {
                this.pagingEnabled.next(false);
            }

            this.selected = null;
            this.dropdownOpen = false;
            this.options = this.pagingEnabled.getValue() ? this.loadOptionsCallback : this.selectedDataSet();
            this.display = (value === 'objects') ? 'name' : null;
            this.key = (value === 'objects') ? 'id' : null;
        });

        // "strings" data set
        this.dataSets.strings = ['United States', 'United Kingdom', 'Something', 'here'];

        // "objects" data set
        this.dataSets.objects = this.dataSets.strings.map((option, i) => {
            return { id: i, name: option };
        });
    }

    ngOnInit() {
        this.options = this.selectedDataSet();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    selectedDataSet(): any[] {
        return this.dataSets[this.dataSet.getValue()];
    }

    loadOptions(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        // Return a promise using setTimeout to simulate an HTTP request.
        let promise = new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.selectedDataSet()
                    .filter((option) => this.isFilterMatch(option, filter))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 2000);
        });

        return promise;
    }

    isFilterMatch(option: string | FilterOption, filter: string): boolean {
        if (!filter) {
            return true;
        }

        if (typeof option === 'string') {
            return option.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        } else {
            return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        }
    }

    alignment: string = 'center';

    someFunction() {
        console.log('someFunction');
    }

    items: PageHeaderNavigationItem[] = [
        {
            title: 'Components',
            routerLink: '/test',
            selected: true
        },
        {
            title: 'Google',
            routerLink: './javascript:someFunction()',
        },
        {
            title: 'Google',
            disabled: true,
        },
        {
            title: 'Showcase',
            children: [
                { title: 'Dashboard' },
                { title: 'Filtering'},
                { title: 'Login 1' },
                { title: 'Login 2' }
            ]
        }
    ];

    // values: ReadonlyArray<string> = [];

    // dropdownOpen: boolean = true;
    // selectOnEnter: boolean = true;
    // dropDirection: 'auto' | 'up' | 'down' = 'down';
    // selectFirst: boolean = true;
    // recentOptions: ReadonlyArray<string>;
    // recentOptionsMaxCount: number = 5;

    // input: string = '';

    // loadOptionsFn = this.loadOptions.bind(this);

    // /** Load the options and filter the them */
    // loadOptions(pageNum: number, pageSize: number, filter: string): Promise<ReadonlyArray<string>> {

    //     // get the values for the current page based on the filter text provided
    //     const values = this.values.filter(tag => tag.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    //         .slice(pageNum * pageSize, (pageNum + 1) * pageSize);

    //     // return the values after a delay to simulate server response time
    //     return of(values).pipe(delay(1000)).toPromise();
    // }

    // constructor(public typeaheadKeyService: TypeaheadKeyService<string>) {

    //     /* Adding values to typeahead list */
    //     for (let index = 0; index < 200; index++) {
    //         this.values = [...this.values, ('john' + index)];
    //     }
    // }
}

export interface FilterOption {
    id: string;
    name: string;
}