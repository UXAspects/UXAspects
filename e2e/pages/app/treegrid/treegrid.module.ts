import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'virtual-for',
                loadChildren: () => import('./virtual-for/treegrid-virtual-for.module').then(m => m.TreeGridVirtualForTestPageModule)
            }
        ])
    ],
})
export class TreeGridTestPageModule { }
