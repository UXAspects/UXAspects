import { OnInit } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
export declare class SearchTextComponent extends BaseSearchComponent implements OnInit {
    value: string;
    type: string;
    label: string;
    placeholder: string;
    ngOnInit(): void;
}
