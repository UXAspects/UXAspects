import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssHeadingsComponent } from './headings/headings.component';
import { CssParagraphTextComponent } from './paragraph-text/paragraph-text.component';
import { CssUnstyledListComponent } from './unstyled-list/unstyled-list.component';
import { CssUnorderedListComponent } from './unordered-list/unordered-list.component';
import { CssOrderedListComponent } from './ordered-list/ordered-list.component';
import { CssEmphasisClassesComponent } from './emphasis-classes/emphasis-classes.component';
import { CssBlockquotesComponent } from './blockquotes/blockquotes.component';
import { CssWellsComponent } from './wells/wells.component';
import { CssCaseUsageGuidelinesComponent } from './case-usage-guidelines/case-usage-guidelines.component';

const SECTIONS = [
    CssHeadingsComponent,
    CssParagraphTextComponent,
    CssUnstyledListComponent,
    CssUnorderedListComponent,
    CssOrderedListComponent,
    CssEmphasisClassesComponent,
    CssBlockquotesComponent,
    CssWellsComponent,
    CssCaseUsageGuidelinesComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Typography',
                link: 'typography',
                sections: [
                    {
                        title: 'Headings',
                        component: 'CssHeadingsComponent'
                    },
                    {
                        title: 'Paragraph Text',
                        component: 'CssParagraphTextComponent'
                    },
                    {
                        title: 'Unstyled List',
                        component: 'CssUnstyledListComponent'
                    },
                    {
                        title: 'Unordered List',
                        component: 'CssUnorderedListComponent'
                    },
                    {
                        title: 'Ordered List',
                        component: 'CssOrderedListComponent'
                    },
                    {
                        title: 'Emphasis Classes',
                        component: 'CssEmphasisClassesComponent'
                    },
                    {
                        title: 'Blockquotes',
                        component: 'CssBlockquotesComponent'
                    },
                    {
                        title: 'Wells',
                        component: 'CssWellsComponent'
                    },
                    {
                        title: 'Case Usage Guidelines',
                        component: 'CssCaseUsageGuidelinesComponent'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssTypographyModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}