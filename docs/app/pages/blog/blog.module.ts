import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EboxModule } from '@ux-aspects/ux-aspects';
import { DocumentationComponentsModule } from '../../components/components.module';
import { BlogPageComponent } from './blog.component';

const routes: Routes = [
    {
        path: '',
        component: BlogPageComponent
    }
];

@NgModule({
    declarations: [
        BlogPageComponent
    ],
    imports: [
        CommonModule,
        EboxModule,
        DocumentationComponentsModule,
        RouterModule.forChild(routes)
    ]
})
export class BlogPageModule {}