import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EboxModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ChangeLogPageComponent } from './changelog.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeLogPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    EboxModule,
    DocumentationComponentsModule,
    RouterModule.forChild(routes),
    ChangeLogPageComponent,
  ],
})
export class ChangeLogPageModule {}
