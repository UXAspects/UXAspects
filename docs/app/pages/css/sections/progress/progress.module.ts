import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';

import { CssMiniActivityIndicatorComponent } from './mini-activity-indicator/mini-activity-indicator.component';
import { CssActivityIndicatorAlternativeComponent } from './activity-indicator-alternative/activity-indicator-alternative.component';
import { CssActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';

const SECTIONS = [
    CssActivityIndicatorComponent,
    CssActivityIndicatorAlternativeComponent,
    CssMiniActivityIndicatorComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Progress',
                link: 'progress',
                sections: [
                    {
                        title: 'Activity Indicator',
                        component: 'CssActivityIndicatorComponent'
                    },
                    {
                        title: 'Activity Indicator Alternative',
                        component: 'CssActivityIndicatorAlternativeComponent'
                    },
                    {
                        title: 'Mini Activity Indicator',
                        component: 'CssMiniActivityIndicatorComponent'
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
export class CssProgressModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}