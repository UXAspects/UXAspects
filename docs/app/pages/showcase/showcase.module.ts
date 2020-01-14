import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule, DashboardModule, FacetsModule, FloatLabelModule, IconModule, PageHeaderModule, SliderModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ShowcasePageComponent } from './showcase.component';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ShowcaseOverviewPageComponent } from './overview/overview.component';

const DECLARATIONS = [
    ShowcasePageComponent,
    ShowcaseOverviewPageComponent
];

const routes: Routes = [
    {
        path: '',
        component: ShowcasePageComponent,
        children: [
            { path: 'overview', component: ShowcaseOverviewPageComponent },
            { path: 'visualizations', loadChildren: () => import('./visualizations/visualizations.module').then(m => m.VisualizationsModule) },
            { path: '', pathMatch: 'full', redirectTo: 'overview' },
            { path: '**', component: ShowcaseOverviewPageComponent }
        ]
    }
];

@NgModule({
    imports: [
        ButtonsModule,
        ChartsModule,
        CheckboxModule,
        CommonModule,
        DashboardModule,
        DocumentationComponentsModule,
        FacetsModule,
        FloatLabelModule,
        FormsModule,
        IconModule,
        PageHeaderModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SliderModule,
        TooltipModule,
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
})
export class ShowcasePageModule {}