import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { LicensesPageComponent } from './licenses.component';

const routes: Routes = [
    {
        path: '',
        component: LicensesPageComponent
    }
];

@NgModule({
    declarations: [
        LicensesPageComponent
    ],
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes)
    ]
})
export class LicensesPageModule {}