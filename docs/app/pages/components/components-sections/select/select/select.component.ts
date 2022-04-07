import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-select',
    templateUrl: 'select.component.html'
})
@DocumentationSectionComponent('ComponentsSelectComponent')
export class ComponentsSelectComponent extends BaseDocumentationSection implements IPlaygroundProvider, OnInit, OnDestroy {

    // ux-select configuration properties
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
    recentOptions: ReadonlyArray<any>;
    recentOptionsMaxCount: number = 5;
    autoCloseDropdown: boolean = true;

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

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: [
                'SelectModule',
                'CheckboxModule',
                'RadioButtonModule',
                'NumberPickerModule',
                'AccordionModule'
            ],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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
            this.recentOptions = this.recentOptions ? [] : null;
            this.display = (value === 'objects') ? 'name' : null;
            this.key = (value === 'objects') ? 'id' : null;
        });

        // "strings" data set
        this.dataSets.strings = ['', 'United States', 'United Kingdom', 'Afghanistan'];

        // "objects" data set
        this.dataSets.objects = this.dataSets.strings.map((option, i) => {
            return { id: i, name: option };
        });
    }

    ngOnInit(): void {
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
}

export interface FilterOption {
    id: string;
    name: string;
}
