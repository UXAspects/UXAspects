import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlippableCardModule, IconModule, MenuModule, PageHeaderModule, PartitionMapModule, SelectModule, TypeaheadModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { TestPageComponent } from './test.component';

const routes: Routes = [
    {
        path: '',
        component: TestPageComponent
    }
];

@NgModule({
    declarations: [
        TestPageComponent
    ],
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        FlippableCardModule,
        PartitionMapModule,
        SelectModule,
        FormsModule,
        PageHeaderModule,
        MenuModule,
        TypeaheadModule,
        IconModule,
        RouterModule.forChild(routes),
    ]
})
export class TestPageModule { }