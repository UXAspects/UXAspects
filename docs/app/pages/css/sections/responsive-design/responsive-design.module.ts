import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssResponsiveDesignComponent } from './responsive-design/responsive-design.component';
import { CssStackedToHorizontalComponent } from './stacked-to-horizontal/stacked-to-horizontal.component';
import { CssMobileDesktopComponent } from './mobile-desktop/mobile-desktop.component';
import { CssMobileTabletDesktopComponent } from './mobile-tablet-desktop/mobile-tablet-desktop.component';
import { CssResponsiveColumnResetsComponent } from './responsive-column-resets/responsive-column-resets.component';
import { CssOffsettingColumnsComponent } from './offsetting-columns/offsetting-columns.component';
import { CssNestingColumnsComponent } from './nesting-columns/nesting-columns.component';
import { CssColumnOrderingComponent } from './column-ordering/column-ordering.component';

const SECTIONS = [
    CssResponsiveDesignComponent,
    CssStackedToHorizontalComponent,
    CssMobileDesktopComponent,
    CssMobileTabletDesktopComponent,
    CssResponsiveColumnResetsComponent,
    CssOffsettingColumnsComponent,
    CssNestingColumnsComponent,
    CssColumnOrderingComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Responsive Design',
                link: 'responsive-design',
                sections: [
                    {
                        title: 'Responsive Design',
                        component: 'CssResponsiveDesignComponent'
                    },
                    {
                        title: 'Stacked To Horizontal',
                        component: 'CssStackedToHorizontalComponent'
                    },
                    {
                        title: 'Mobile and Desktop',
                        component: 'CssMobileDesktopComponent'
                    },
                    {
                        title: 'Mobile, Tablet and Desktop',
                        component: 'CssMobileTabletDesktopComponent'
                    },
                    {
                        title: 'Responsive Column Resets',
                        component: 'CssResponsiveColumnResetsComponent'
                    },
                    {
                        title: 'Offsetting Columns',
                        component: 'CssOffsettingColumnsComponent'
                    },
                    {
                        title: 'Nesting Columns',
                        component: 'CssNestingColumnsComponent'
                    },
                    {
                        title: 'Column Ordering',
                        component: 'CssColumnOrderingComponent'
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
export class CssResponsiveDesignModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}