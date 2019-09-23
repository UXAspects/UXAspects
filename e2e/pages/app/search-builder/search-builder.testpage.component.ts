import { Component } from '@angular/core';
import { SearchBuilderQuery, SearchBuilderComponentDefinition, SearchTextComponent, SearchDateRangeComponent, SearchDateRangeConfig, SearchTextConfig, SearchSelectComponent, SearchSelectConfig, SearchDateComponent, SearchDateConfig } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-search-builder',
    templateUrl: './search-builder.testpage.component.html'
})
export class SearchBuilderTestPageComponent {

    query: SearchBuilderQuery = {};
    valid: boolean = true;

    placeholders = {
        any: false,
        all: false,
        none: false
    };

    components: SearchBuilderComponentDefinition[] = [
        {
            name: 'text',
            component: SearchTextComponent,
            config: {
                placeholder: 'Enter text'
            } as SearchTextConfig
        },
        {
            name: 'date',
            component: SearchDateComponent,
            config: {
                label: 'Date',
                placeholder: 'Enter a date'
            } as SearchDateConfig
        },
        {
            name: 'date-range',
            component: SearchDateRangeComponent,
            config: {
                label: 'Date range'
            } as SearchDateRangeConfig
        },
        {
            name: 'select',
            component: SearchSelectComponent,
            config: {
                label: 'File types',
                placeholder: 'Select File Types',
                options: ['AVI', 'BMP', 'CSV', 'DOC', 'EXE', 'GIF', 'JPG', 'MOV', 'PDF', 'PNG', 'PPT', 'RTF', 'TXT', 'XLS', 'ZIP'],
                multiple: true
            } as SearchSelectConfig
        },
    ];

    addKeyword(): void {
        this.query.keywords.push({ type: 'text', value: null });
    }

    addAny(): void {
        this.query.any.push({ type: 'date', value: new Date() });
    }

    addAll(): void {
        this.query.all.push({ type: 'date-range', value: null });
    }

    addNone(): void {
        this.query.none.push({ type: 'select', value: null });
    }

    getCustodians(): string[] {
        const custodians: string[] = [];

        for (let idx = 0; idx < 20; idx++) {
            custodians.push(`User ${idx}`);
        }

        return custodians;
    }

    setQuery(): void {
        this.query = {
            keywords: [
                {
                    type: 'text',
                    value: 'Hello Protractor!'
                }
            ],
            any: [
                {
                    type: 'date',
                    value: '2017-12-06T12:27:40.565Z'
                }
            ],
            all: [
                {
                    type: 'date-range',
                    value: {
                        from: '2017-12-06T12:27:38.050Z',
                        to: '2017-12-06T12:27:38.050Z'
                    }
                }
            ],
            none: [
                {
                    type: 'select',
                    value: [
                        'EXE',
                        'JPG'
                    ]
                }
            ]
        };
    }
}