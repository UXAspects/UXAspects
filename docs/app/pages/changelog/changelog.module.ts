import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EboxModule } from '../../../../src/components/ebox/index';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ChangeLogPageComponent } from './changelog.component';

const routes: Routes = [
    {
        path: '',
        component: ChangeLogPageComponent
    }
];

@NgModule({
    declarations: [
        ChangeLogPageComponent
    ],
    imports: [
        CommonModule,
        EboxModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes)
    ]
})
export class ChangeLogPageModule {}