import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeModule } from '../../directives/resize/index';
import { CardTabContentDirective } from './card-tab/card-tab-content.directive';
import { CardTabComponent } from './card-tab/card-tab.component';
import { CardTabsetComponent } from './card-tabset/card-tabset.component';

@NgModule({
  imports: [
    CommonModule,
    ResizeModule
  ],
  declarations: [CardTabsetComponent, CardTabComponent, CardTabContentDirective],
  exports: [CardTabsetComponent, CardTabComponent, CardTabContentDirective]
})
export class CardTabsModule { }
