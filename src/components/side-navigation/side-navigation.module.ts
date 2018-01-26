import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationComponent } from './side-navigation.component';
import { SideNavigationItemComponent } from './side-navigation-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SideNavigationComponent,
    SideNavigationItemComponent
  ],
  declarations: [
    SideNavigationComponent,
    SideNavigationItemComponent
  ]
})
export class SideNavigationModule { }
