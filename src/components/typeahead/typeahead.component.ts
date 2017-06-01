import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ElementRef, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'ux-typeahead',
    templateUrl: 'typeahead.component.html',
    host: {
        '[class.open]': 'open'
    }
})
export class TypeaheadComponent implements OnInit, OnChanges {

    @Input('input') private _input: string;
    get input() {
        return this._input;
    }
    set input(value: string) {
        this._input = value;
        this.inputChange.emit(value);
    }

    @Output() inputChange = new EventEmitter<string>();

    @Input() options: any[] | TypeaheadPagingFunction;
    @Input() selectedOptions: any[];
    @Input() optionTemplate: TemplateRef<any>;
    @Input() display: (option: any) => string | string;
    @Input() key: (option: any) => string | string;
    @Input() pageSize: number = 20;
    @Input() parent: ElementRef;
    @Input() dropDirection: 'up' | 'down' = 'down';

    @ViewChild('defaultOptionTemplate') defaultOptionTemplate: TemplateRef<any>;

    open: boolean = false;

    visibleOptions: any[];

    optionApi: TypeaheadOptionApi = {
        getKey: this.getKey.bind(this),
        getDisplay: this.getDisplay.bind(this),
        getDisplayHtml: this.getDisplayHtml.bind(this)
    };
    
    constructor() { }

    ngOnInit() {
        if (!this.optionTemplate) {
            this.optionTemplate = this.defaultOptionTemplate;
        }
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes._input) {
            if (changes._input.currentValue) {
                this.open = true;
            }
        }
        
        this.updateOptions();
    }

    getKey(option: any): string {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string') {
            return option[<string>this.key];
        }
        return this.getDisplay(option);
    }

    getDisplay(option: any): string {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string') {
            return option[<string>this.display];
        }
        return option;
    }

    getDisplayHtml(option: any) {
        const displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let displayHtml = displayText;
        if (this.input) {
            const length = this.input.length;
            const matchIndex = displayText.toLowerCase().indexOf(this.input.toLowerCase());
            if (matchIndex >= 0) {
                var highlight = `<u>${displayText.substr(matchIndex, length)}</u>`;
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    }

    isSelected(option: any): boolean {
        const optionKey = this.getKey(option);
        const result = this.selectedOptions.find((selectedOption) => {
            return this.getKey(selectedOption) === optionKey;
        });
        return result !== undefined;
    }

    private updateOptions() {
        if (typeof this.options === 'object') {
            const normalisedInput = (this.input || '').toLowerCase();
            this.visibleOptions = this.options.filter((option) => {
                return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
            });
            console.log('updateOptions: ' + JSON.stringify(this.visibleOptions));
        }
    }
}

export type TypeaheadPagingFunction = (pageNumber: number, pageSize: number, filter: string) => any[];

export interface TypeaheadOptionApi {
    getKey(option: any): string;
    getDisplay(option: any): string;
    getDisplayHtml(option: any): string;
}