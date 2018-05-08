import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HierarchyBarModule } from '../../../../dist';
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
