import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { CssPageComponent } from './css.component';

const ROUTES: Routes = [
  {
    path: '',
    component: CssPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'buttons' },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./css-sections/buttons/buttons.module').then(m => m.CssButtonsModule),
      },
      {
        path: 'color-palette',
        loadChildren: () =>
          import('./css-sections/color-palette/color-palette.module').then(
            m => m.CssColorPaletteModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () => import('./css-sections/icons/icons.module').then(m => m.CssIconsModule),
      },
      {
        path: 'labels',
        loadChildren: () =>
          import('./css-sections/labels/labels.module').then(m => m.CssLabelsModule),
      },
      {
        path: 'breadcrumbs',
        loadChildren: () =>
          import('./css-sections/breadcrumbs/breadcrumbs.module').then(m => m.CssBreadcrumbsModule),
      },
      {
        path: 'panels',
        loadChildren: () =>
          import('./css-sections/panels/panels.module').then(m => m.CssPanelsModule),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./css-sections/progress/progress.module').then(m => m.CssProgressModule),
      },
      {
        path: 'responsive-design',
        loadChildren: () =>
          import('./css-sections/responsive-design/responsive-design.module').then(
            m => m.CssResponsiveDesignModule
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./css-sections/tables/tables.module').then(m => m.CssTablesModule),
      },
      {
        path: 'text-inputs',
        loadChildren: () =>
          import('./css-sections/text-inputs/text-inputs.module').then(m => m.CssTextInputsModule),
      },
      {
        path: 'typography',
        loadChildren: () =>
          import('./css-sections/typography/typography.module').then(m => m.CssTypographyModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/buttons',
  },
];

@NgModule({
  imports: [DocumentationComponentsModule, RouterModule.forChild(ROUTES), CssPageComponent],
  exports: [CssPageComponent],
})
export class CssPageModule {}
