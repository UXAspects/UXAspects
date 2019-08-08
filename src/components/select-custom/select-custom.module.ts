import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectCustomComponent } from './select-custom.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  imports: [CommonModule, FormsModule, IconModule, MenuModule],
  declarations: [
    SelectCustomComponent
  ],
  exports: [
    SelectCustomComponent
  ]
})
export class SelectCustomModule { }
