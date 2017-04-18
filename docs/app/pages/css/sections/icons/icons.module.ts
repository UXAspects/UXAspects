import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../../../components/components.module';
import { ResolverService } from '../../../../services/resolver/resolver.service';
import { DocumentationCategoryComponent } from '../../../../components/documentation-category/documentation-category.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CssIconColorsComponent } from './icon-colors/icon-colors.component';
import { CssIconButtonsComponent } from './icon-buttons/icon-buttons.component';
import { CssRotateFlipIconsComponent } from './rotate-flip-icons/rotate-flip-icons.component';
import { CssFixedWidthComponent } from './fixed-width/fixed-width.component';
import { CssIconSizeComponent } from './icon-size/icon-size.component';
import { CssBasicUsageComponent } from './basic-usage/basic-usage.component';
import { CssUxIconsComponent } from './ux-icons/ux-icons.component';

const SECTIONS = [
    CssUxIconsComponent,
    CssBasicUsageComponent,
    CssIconSizeComponent,
    CssFixedWidthComponent,
    CssRotateFlipIconsComponent,
    CssIconButtonsComponent,
    CssIconColorsComponent
];

const ROUTES = [
    {
        path: '**',
        component: DocumentationCategoryComponent,
        data: {
            category: {
                title: 'Icons',
                link: 'icons',
                sections: [
                    {
                        title: 'UX Aspects Icons',
                        component: 'CssUxIconsComponent'
                    },
                    {
                        title: 'Basic Usage',
                        component: 'CssBasicUsageComponent'
                    },
                    {
                        title: 'Icon Size',
                        component: 'CssIconSizeComponent'
                    },
                    {
                        title: 'Fixed Width',
                        component: 'CssFixedWidthComponent'
                    },
                    {
                        title: 'Rotate & Flip Icons',
                        component: 'CssRotateFlipIconsComponent'
                    },
                    {
                        title: 'Icon Buttons',
                        component: 'CssIconButtonsComponent'
                    },
                    {
                        title: 'Icon Colors',
                        component: 'CssIconColorsComponent'
                    }
                ]
            }
        }
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: SECTIONS,
    declarations: SECTIONS,
    entryComponents: SECTIONS
})
export class CssIconsModule {

    constructor(componentFactoryResolver: ComponentFactoryResolver, resolverService: ResolverService) {
        resolverService.registerResolver(componentFactoryResolver);
    }
}