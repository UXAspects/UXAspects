import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentationComponentsModule } from '../../components/components.module';

import { ChartsPageComponent } from './charts.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ChartsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'bar-charts' },
            { path: 'bar-charts', loadChildren: './sections/bar-charts/bar-charts.module#BarChartsModule' }
        ],
    },
    {
        path: '**',
        redirectTo: '/bar-charts'
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [ChartsPageComponent],
    declarations: [ChartsPageComponent],
    providers: [],
})
export class ChartsPageModule {

}
