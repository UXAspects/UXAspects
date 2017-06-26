import 'chance';
import {
    BaseDocumentationSection
} from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk, MAPPINGS } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const chance = new Chance();

const DEPARTMENTS = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

@Component({
    selector: 'uxd-components-infinite-scroll',
    templateUrl: 'infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.less']
})
@DocumentationSectionComponent('ComponentsInfiniteScrollComponent')
export class ComponentsInfiniteScrollComponent extends BaseDocumentationSection implements IPlunkProvider {

    filterText = new BehaviorSubject<string>('');
    debouncedFilterText = this.filterText.debounceTime(500);

    allEmployees: any[] = [];
    loadedEmployees: any[] = [];

    loadCallback = this.load.bind(this);

    private _pageSize = 20;
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value: any) {
        const numValue = Number(value);
        this._pageSize = (numValue >= 1) ? numValue : 1;
    }

    loadOnScroll: boolean = true;

    loading: boolean = false;
    exhausted: boolean = false;

    load(pageNum: number, pageSize: number, filter: any): Promise<any[]> {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const pageStart = pageNum * pageSize;
                const newItems = this.allEmployees
                    .filter((e) => this.isFilterMatch(e))
                    .slice(pageStart, pageStart + pageSize);
                resolve(newItems);
            }, 2000);
        });

        return promise;
    }

    isFilterMatch(e: any): boolean {
        const normalisedFilter = this.filterText.getValue().toLowerCase();
        return (e.name.toLowerCase().indexOf(normalisedFilter) >= 0);
    }

    public plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['InfiniteScrollModule', 'CheckboxModule', 'NumberPickerModule'],
            library: 'ux-aspects'
        }, {
            library: 'ngx-bootstrap',
            imports: ['AccordionModule'],
            providers: ['AccordionModule.forRoot()']
        }],
        mappings: [MAPPINGS.NgxBootstrap]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let i = 0; i < 111; i += 1) {
            const name = chance.name();
            this.allEmployees.push({
                id: i,
                name: name,
                department: chance.pickone(DEPARTMENTS),
                email: name.toLowerCase().replace(' ', '.') + '@business.com'
            });
        }
    }
}