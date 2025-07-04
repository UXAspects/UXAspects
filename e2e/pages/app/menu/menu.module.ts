import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  CheckboxModule,
  IconModule,
  MenuModule,
  RadioButtonModule,
  StringFilterModule,
  ToggleSwitchModule,
} from '@ux-aspects/ux-aspects';
import { MenuFallbackTestPageComponent } from './fallback/menu-fallback.testpage.component';
import { MenuItemCustomControlTestPageComponent } from './menu-item-custom-control/menu-item-custom-control.testpage.component';
import { MenuTestPageComponent } from './menu.testpage.component';

const ROUTES = [
  {
    path: '',
    component: MenuTestPageComponent,
  },
  {
    path: 'fallback',
    component: MenuFallbackTestPageComponent,
  },
  {
    path: 'menu-item-custom-control',
    component: MenuItemCustomControlTestPageComponent,
  },
];

@NgModule({
  imports: [
    CheckboxModule,
    ToggleSwitchModule,
    RadioButtonModule,
    AccessibilityModule,
    CommonModule,
    CheckboxModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StringFilterModule,
    MenuModule,
  ],
  declarations: [
    MenuTestPageComponent,
    MenuFallbackTestPageComponent,
    MenuItemCustomControlTestPageComponent,
  ],
})
export class MenuTestPageModule {}
