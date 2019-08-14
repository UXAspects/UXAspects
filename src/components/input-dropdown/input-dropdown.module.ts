import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputDrowdownComponent } from './input-drowdown.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  imports: [CommonModule, FormsModule, IconModule, MenuModule],
  declarations: [
    InputDrowdownComponent
  ],
  exports: [
    InputDrowdownComponent
  ]
})
export class InputDropdownModule { }
