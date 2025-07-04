import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FixedHeaderTableModule,
  IconModule,
  TreeGridModule,
  VirtualScrollModule,
} from '@ux-aspects/ux-aspects';
import { TreeGridVirtualForTestPageComponent } from './treegrid-virtual-for.testpage.component';

const ROUTES = [
  {
    path: '',
    component: TreeGridVirtualForTestPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FixedHeaderTableModule,
    IconModule,
    RouterModule.forChild(ROUTES),
    TreeGridModule,
    VirtualScrollModule,
  ],
  declarations: [TreeGridVirtualForTestPageComponent],
})
export class TreeGridVirtualForTestPageModule {}
