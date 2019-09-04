import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputDropdownComponent } from './input-dropdown.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { MenuModule } from '../menu/menu.module';
import { AccessibilityModule } from '../../directives/accessibility/index';

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
