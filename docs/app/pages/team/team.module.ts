import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlippableCardModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { TeamPageComponent } from './team.component';

const routes: Routes = [
    {
        path: '',
        component: TeamPageComponent
    }
];

@NgModule({
    declarations: [
        TeamPageComponent
    ],
    imports: [
        CommonModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes),
        FlippableCardModule
    ]
})
export class TeamPageModule {}