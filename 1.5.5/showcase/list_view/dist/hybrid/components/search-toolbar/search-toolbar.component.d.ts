import { ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class SearchToolbarNg1Component extends UpgradeComponent {
    searchTypeahead: any[];
    placeHolder: string;
    closeSearch: string;
    onSearch: Function;
    onFocus: Function;
    constructor(elementRef: ElementRef, injector: Injector);
}
