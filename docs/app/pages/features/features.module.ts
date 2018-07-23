import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { FeaturesPageComponent } from './features.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesPageComponent
    }
];

@NgModule({
    declarations: [
        FeaturesPageComponent
    ],
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes)
    ]
})
export class FeaturesPageModule {}