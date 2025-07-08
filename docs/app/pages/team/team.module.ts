import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlippableCardModule, IconModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { TeamPageComponent } from './team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    DocumentationComponentsModule,
    FlippableCardModule,
    IconModule,
    RouterModule.forChild(routes),
    TeamPageComponent,
  ],
})
export class TeamPageModule {}
