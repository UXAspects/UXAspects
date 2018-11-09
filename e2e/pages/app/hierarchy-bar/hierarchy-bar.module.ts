import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HierarchyBarModule } from '@ux-aspects/ux-aspects';
import { HierarchyBarTestPageComponent } from './hierarchy-bar.testpage.component';


@NgModule({
    imports: [
        HierarchyBarModule,
        RouterModule.forChild([
            {
                path: '',
                component: HierarchyBarTestPageComponent
            }
        ])
    ],
    declarations: [HierarchyBarTestPageComponent]
})
export class HierarchyBarTestPageModule { }
