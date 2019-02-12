import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-reorderable-table',
    templateUrl: './reorderable-table.component.html',
    styleUrls: ['./reorderable-table.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsReorderableTableComponent')
export class ComponentsReorderableTableComponent extends BaseDocumentationSection implements IPlunkProvider {

    data: ReorderableTableData[] = [];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['ReorderableModule', 'SparkModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    @ViewChildren('row') rows: QueryList<ElementRef>;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        for (let idx = 0; idx < 10; idx++) {
            this.data.push({
                document: `Document ${idx}`,
                author: chance.name(),
                date: chance.date({ year: 2018 }) as Date,
                completed: chance.integer({ min: 10, max: 100 }),
                active: chance.bool()
            });
        }
    }

    movedown(data: ReorderableTableData, index: number, event: KeyboardEvent): void {
        const target = Math.min(index + 1, this.data.length - 1);
        this.data[index] = { ...this.data[target] };
        this.data[target] = { ...data };
        event.preventDefault();

        // ngFor blurs the element when shifting - we want to retain focus
        requestAnimationFrame(() => {
            // get the row we want to focus
            const targetElement = this.rows.toArray()[target];

            // if there is a target element then focus it
            if (targetElement) {
                targetElement.nativeElement.focus();
            }
        });
    }

    moveup(data: ReorderableTableData, index: number, event: KeyboardEvent): void {
        const target = Math.max(index - 1, 0);
        this.data[index] = { ...this.data[target] };
        this.data[target] = { ...data };
        event.preventDefault();

        // ngFor blurs the element when shifting - we want to retain focus
        requestAnimationFrame(() => {
            // get the row we want to focus
            const targetElement = this.rows.toArray()[target];

            // if there is a target element then focus it
            if (targetElement) {
                targetElement.nativeElement.focus();
            }
        });
    }
}

export interface ReorderableTableData {
    document: string;
    author: string;
    date: Date;
    completed: number;
    active: boolean;
}
