import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';
import { InputDropdownComponent } from './input-dropdown.component';

@NgModule({
  imports: [CommonModule, FormsModule, IconModule, MenuModule, AccessibilityModule],
  declarations: [
    InputDropdownComponent
  ],
  exports: [
    InputDropdownComponent
    ]
})
export class InputDropdownModule { }
