import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import 'chance';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { first } from 'rxjs/operators/first';
import { Subject } from 'rxjs/Subject';
import { SearchBuilderComponentDefinition, SearchBuilderFocusService, SearchBuilderQuery, SearchDateRangeComponent, SearchDateRangeConfig, SearchSelectComponent, SearchSelectConfig, SearchTextComponent, SearchTextConfig } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-search-builder',
    templateUrl: './search-builder.component.html',
    styleUrls: ['./search-builder.component.less']
})
@DocumentationSectionComponent('ComponentsSearchBuilderComponent')
export class ComponentsSearchBuilderComponent extends BaseDocumentationSection implements IPlunkProvider, OnDestroy {

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['ModalModule'],
                library: 'ngx-bootstrap/modal',
                forRoot: true
            },
            {
                imports: ['SearchBuilderModule', 'ItemDisplayPanelModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    query: SearchBuilderQuery = {
        keywords: [
            {
                type: 'keyword',
                value: null
            }
        ],
        any: [],
        all: [],
        none: []
    };

    preview: string = JSON.stringify(this.query, null, 2);
    valid: boolean = true;
    filter$ = new BehaviorSubject<string>('');
    modalOpen: boolean = false;
    panelOpen: boolean = false;

    placeholders = {
        any: false,
        all: false,
        none: false
    };

    components: SearchBuilderComponentDefinition[] = [
        {
            name: 'keyword',
            component: SearchTextComponent,
            config: {
                placeholder: 'Enter keywords'
            } as SearchTextConfig
        },
        {
            name: 'author',
            component: SearchTextComponent,
            config: {
                label: 'Author',
                placeholder: 'Enter an Author'
            } as SearchTextConfig
        },
        {
            name: 'custodian',
            component: SearchSelectComponent,
            config: {
                label: 'Custodian',
                placeholder: 'Select Custodians',
                options: this.getCustodians(),
                multiple: true
            } as SearchSelectConfig
        },
        {
            name: 'date-range',
            component: SearchDateRangeComponent,
            config: {
                label: 'Date range'
            } as SearchDateRangeConfig
        },
        {
            name: 'file-name',
            component: SearchTextComponent,
            config: {
                label: 'File name',
                placeholder: 'Enter a File Name'
            }
        },
        {
            name: 'file-type',
            component: SearchSelectComponent,
            config: {
                label: 'File types',
                placeholder: 'Select File Types',
                options: ['AVI', 'BMP', 'CSV', 'DOC', 'EXE', 'GIF', 'JPG', 'MOV', 'PDF', 'PNG', 'PPT',
                    'RTF', 'TXT', 'XLS', 'ZIP'],
                multiple: true
            } as SearchSelectConfig
        },
        {
            name: 'repository',
            component: SearchSelectComponent,
            config: {
                label: 'Repository',
                placeholder: 'Enter a Repository',
                options: ['Filesystem', 'Records Manager', 'Email', 'Legacy Email', 'Archives',
                    'Legacy Archives', 'Miscellaneous'],
                multiple: true
            } as SearchSelectConfig
        },
        {
            name: 'text',
            component: SearchTextComponent,
            config: {
                label: 'Text',
                placeholder: 'Enter Text'
            } as SearchTextConfig
        }
    ];

    fields: SearchBuilderField[] = [
        { title: 'Author', type: 'author', },
        { title: 'Custodian', type: 'custodian' },
        { title: 'Date Range', type: 'date-range' },
        { title: 'File Name', type: 'file-name' },
        { title: 'File Type', type: 'file-type' },
        { title: 'Repository', type: 'repository' },
        { title: 'Text', type: 'text' }
    ];

    filteredFields: SearchBuilderField[];

    @ViewChild('searchBuilderContent')
    searchBuilderContent: ElementRef<HTMLElement>;

    private _field$: Subject<SearchBuilderField> = new Subject<SearchBuilderField>();
    // private _subscription: Subscription;
    private _onDestroy = new Subject<void>();

    constructor(
        private _modalService: BsModalService,
        private _searchBuilderFocusService: SearchBuilderFocusService
    ) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // if the modal is closed by clicking on backdrop perform cancel
        this._modalService.onHide.pipe(takeUntil(this._onDestroy)).subscribe(() => this.cancel());

        // Filter the field type list
        this.filter$.pipe(takeUntil(this._onDestroy)).subscribe(value => {
            this.filteredFields = this.fields.filter(field =>
                field.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
            );
        });
    }

    ngOnDestroy(): void {
        // this._subscription.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    save(): void {
        this.preview = JSON.stringify(this.query, null, 2);
        this.modalOpen = false;
    }

    cancel(): void {
        this.query = JSON.parse(this.preview);
        this.modalOpen = false;
    }

    addKeyword(): void {
        const length = this.query.keywords.push({ type: 'keyword', value: null });

        // Set focus on the newly added field
        this._searchBuilderFocusService.setFocus('keywords', length - 1);
    }

    addField(group: string, event: MouseEvent): void {

        const button = <HTMLElement>event.currentTarget;

        // show the panel
        this.showPanel();

        // show the placeholder field
        this.placeholders[group] = true;

        // subscribe to only the next field event
        this._field$.pipe(first()).subscribe(field => {

            // remove the placeholder
            this.placeholders[group] = false;

            // if a field was selected then add it to the query
            if (field) {

                const length = this.query[group].push({ type: field.type, value: null });

                // Set focus on the newly added field
                this._searchBuilderFocusService.setFocus(group, length - 1);

            } else {

                // Nothing selected so return focus to the original button
                button.focus();
            }
        });

        event.stopPropagation();
    }

    showPanel() {
        // clear any existing filters
        this.filter$.next('');

        // show the panel
        this.panelOpen = true;
    }

    onPanelEvent(open: boolean): void {
        // if closing indication that no field was chosen
        if (!open) {
            this._field$.next(null);
        }
    }

    selectField(field: SearchBuilderField): void {
        if (field) {
            // emit the selected field
            this._field$.next(field);

            // close the panel
            this.panelOpen = false;
        }
    }

    getCustodians(): string[] {
        const custodians: string[] = [];

        for (let idx = 0; idx < 20; idx++) {
            custodians.push(chance.name());
        }

        return custodians;
    }

    modalShown(): void {
        // Set focus on the first field in the keywords group
        this._searchBuilderFocusService.setFocus('keywords', 0);
    }
}

interface SearchBuilderField {
    title: string;
    type: string;
}
