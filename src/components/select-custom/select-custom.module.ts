import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectCustomComponent } from './select-custom.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [CommonModule, FormsModule, BsDropdownModule.forRoot(), IconModule],
  declarations: [
    SelectCustomComponent
  ],
  exports: [
    SelectCustomComponent
  ]
})
export class SelectCustomModule { }
