import { Directive, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-search-toolbar-ng1'
})
export class SearchToolbarComponent extends UpgradeComponent {

    @Input() searchTypeahead: any[];
    @Input() placeHolder: string;
    @Input() closeSearch: string;
    @Input() onSearch: Function;
    @Input() onFocus: Function;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('searchToolbar', elementRef, injector);
    }
}