import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreeGridNg1TestPageComponent } from './tree-grid-ng1.testpage.component';
import { TreeGridComponent } from './wrapper/tree-grid-wrapper.directive';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TreeGridNg1TestPageComponent
            }
        ])
    ],
    declarations: [
        TreeGridNg1TestPageComponent,
        TreeGridComponent
    ]
})
export class TreeGridNg1TestPageModule { }
