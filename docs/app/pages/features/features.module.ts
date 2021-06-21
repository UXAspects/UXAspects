import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule, TooltipModule } from '@ux-aspects/ux-aspects';
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
        IconModule,
        TooltipModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes)
    ]
})
export class FeaturesPageModule {}
