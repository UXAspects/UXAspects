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
            { path: 'buttons', loadChildren: './css-sections/buttons/buttons.module#CssButtonsModule' },
            { path: 'color-palette', loadChildren: './css-sections/color-palette/color-palette.module#CssColorPaletteModule' },
            { path: 'forms', loadChildren: './css-sections/forms/forms.module#CssFormsModule' },
            { path: 'icons', loadChildren: './css-sections/icons/icons.module#CssIconsModule' },
            { path: 'labels', loadChildren: './css-sections/labels/labels.module#CssLabelsModule' },
            { path: 'page-header', loadChildren: './css-sections/page-header/page-header.module#CssPageHeaderModule' },
            { path: 'page-title', loadChildren: './css-sections/page-title/page-title.module#CssPageTitleModule' },
            { path: 'panels', loadChildren: './css-sections/panels/panels.module#CssPanelsModule' },
            { path: 'progress', loadChildren: './css-sections/progress/progress.module#CssProgressModule' },
            { path: 'responsive-design', loadChildren: './css-sections/responsive-design/responsive-design.module#CssResponsiveDesignModule' },
            { path: 'structure', loadChildren: './css-sections/structure/structure.module#CssStructureModule' },
            { path: 'tables', loadChildren: './css-sections/tables/tables.module#CssTablesModule' },
            { path: 'text-inputs', loadChildren: './css-sections/text-inputs/text-inputs.module#CssTextInputsModule' },
            { path: 'typography', loadChildren: './css-sections/typography/typography.module#CssTypographyModule' },
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
