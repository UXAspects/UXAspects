import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService, DocumentationPage } from '../../../../services/resolver/resolver.service';
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
            category: ResolverService.resolveCategoryData(DocumentationPage.Css, 'Typography')
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
})
export class CssTypographyModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver, SECTIONS);
    }
}
