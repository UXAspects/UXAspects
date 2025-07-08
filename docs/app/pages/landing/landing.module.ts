import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { LandingPageComponent } from './landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    DocumentationComponentsModule,
    RouterModule.forChild(routes),
    LandingPageComponent,
  ],
})
export class LandingPageModule {}
