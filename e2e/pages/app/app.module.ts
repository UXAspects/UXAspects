import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CheckboxTestPageComponent }  from './checkbox/checkbox.testpage.component';
import { CheckboxModule } from '../../../dist/lib/index.js';

const ROUTES: Routes = [
  {
    path: 'checkboxes',
    component: CheckboxTestPageComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CheckboxModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent,
    CheckboxTestPageComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
