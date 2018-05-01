import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ResizeModule } from '../../directives/resize/index';
import { HierarchyBarComponent } from './hierarchy-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ResizeModule,
    PopoverModule.forRoot()
  ],
  exports: [HierarchyBarComponent],
  declarations: [HierarchyBarComponent],
})
export class HierarchyBarModule { }
