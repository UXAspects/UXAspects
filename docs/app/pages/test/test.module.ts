import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlippableCardModule, IconModule, PartitionMapModule } from '@ux-aspects/ux-aspects';
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
        IconModule,
        RouterModule.forChild(routes),
    ]
})
export class TestPageModule { }