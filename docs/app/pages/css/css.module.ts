import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentationComponentsModule } from '../../components/components.module';

import { CssPageComponent } from './css.component';


const ROUTES: Routes = [
    {
        path: '',
        component: CssPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'buttons' },
            { path: 'buttons', loadChildren: './sections/buttons/buttons.module#CssButtonsModule' },
            { path: 'color-palette', loadChildren: './sections/color-palette/color-palette.module#CssColorPaletteModule' },
            { path: 'forms', loadChildren: './sections/forms/forms.module#CssFormsModule' },
            { path: 'icons', loadChildren: './sections/icons/icons.module#CssIconsModule' },
            { path: 'labels', loadChildren: './sections/labels/labels.module#CssLabelsModule' },
            { path: 'page-header', loadChildren: './sections/page-header/page-header.module#CssPageHeaderModule' },
            { path: 'page-title', loadChildren: './sections/page-title/page-title.module#CssPageTitleModule' },
            { path: 'panels', loadChildren: './sections/panels/panels.module#CssPanelsModule' },
            { path: 'progress', loadChildren: './sections/progress/progress.module#CssProgressModule' },
            { path: 'responsive-design', loadChildren: './sections/responsive-design/responsive-design.module#CssResponsiveDesignModule' },
            { path: 'structure', loadChildren: './sections/structure/structure.module#CssStructureModule' },
            { path: 'tables', loadChildren: './sections/tables/tables.module#CssTablesModule' },
            { path: 'text-inputs', loadChildren: './sections/text-inputs/text-inputs.module#CssTextInputsModule' },
            { path: 'typography', loadChildren: './sections/typography/typography.module#CssTypographyModule' },
        ],
    },
    {
        path: '**',
        redirectTo: '/buttons'
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [CssPageComponent],
    declarations: [CssPageComponent]
})
export class CssPageModule {
}
