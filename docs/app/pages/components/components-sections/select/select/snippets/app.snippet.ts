import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
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
  recentOptions: ReadonlyArray<string>;
  recentOptionsMaxCount: number = 5;

  private _pageSize = 20;
  private readonly _onDestroy = new Subject<void>();

  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value: number) {
    const numValue = Number(value);
    this._pageSize = numValue >= 1 ? numValue : 1;
  }

  // Customize settings
  pagingEnabled = new BehaviorSubject<boolean>(false);
  dataSet = new BehaviorSubject<string>('strings');
  loadOptionsCallback = this.loadOptions.bind(this);

  dataSets: { strings?: any[]; objects?: any[] } = {};

  constructor() {
    // Reset select when "multiple" checkbox changes.
    this.multiple.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(value => {
      this.selected = null;
      this.dropdownOpen = false;
    });

    // Reset and switch options between array and function when paging checkbox changes.
    this.pagingEnabled.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(value => {
      this.selected = null;
      this.dropdownOpen = false;
      this.options = this.pagingEnabled.getValue()
        ? this.loadOptionsCallback
        : this.selectedDataSet();
    });

    // Reset and reassign options when the dataset changes. Also set display and key properties.
    this.dataSet.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(value => {
      if (this.multiple.getValue() === true) {
        this.pagingEnabled.next(false);
      }

      this.selected = null;
      this.dropdownOpen = false;
      this.options = this.pagingEnabled.getValue()
        ? this.loadOptionsCallback
        : this.selectedDataSet();
      this.display = value === 'objects' ? 'name' : null;
      this.key = value === 'objects' ? 'id' : null;
    });

    // "strings" data set
    this.dataSets.strings = ['United States', 'United Kingdom'];

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
    const promise = new Promise<any[]>(resolve => {
      setTimeout(() => {
        const pageStart = pageNum * pageSize;
        const newItems = this.selectedDataSet()
          .filter(option => this.isFilterMatch(option, filter))
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
