import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-tabbable-list',
    templateUrl: './tabbable-list.component.html',
    styleUrls: ['./tabbable-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTabbableListComponent')
export class ComponentsTabbableListComponent extends BaseDocumentationSection implements IPlunkProvider {

    posts: Post[] = [
        {
            title: 'Getting Started with UX Aspects',
            date: chance.date({ year: 2018 }) as Date,
            content: 'UX Aspects is the only open source user interface framework for building modern, responsive, mobile big data applications on the web.'
        },
        {
            title: 'Ivy: A look at the New Render Engine for Angular',
            date: chance.date({ year: 2018 }) as Date,
            content: 'Ivy is the next generation of Angular Renderer. It is third in line after the original compiler (for Angular 2) and Renderer2 (for Angular 4 and above).'
        },
        {
            title: 'Angular Console — The UI for the Angular CLI',
            date: chance.date({ year: 2018 }) as Date,
            content: 'Angular CLI transformed the Angular ecosystem. We no longer have to spend time maintaining our webpack configurations, figuring out how to make tests run, fixing source maps — the CLI does this for us.'
        },
        {
            title: 'Angular Ngrx DevTools',
            date: chance.date({ year: 2018 }) as Date,
            content: 'This post is a step-by-step guide for setting up your Ngrx Development environment, namely the Ngrx DevTools, but not only: we will also talk about some best practices for developing Ngrx applications in general.'
        }
    ];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['AccessibilityModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                library: 'chance'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}

export interface Post {
    title: string;
    date: Date;
    content: string;
}