import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsetModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { GettingStartedPageComponent } from './getting-started.component';

const routes: Routes = [
    {
        path: '',
        component: GettingStartedPageComponent
    }
];

@NgModule({
    declarations: [
        GettingStartedPageComponent
    ],
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes),
        TabsetModule
    ]
})
export class GettingStartedPageModule {}