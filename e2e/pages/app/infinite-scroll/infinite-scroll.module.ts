import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AccessibilityModule,
  AccordionModule,
  CheckboxModule,
  ColumnSortingModule,
  InfiniteScrollModule,
  NumberPickerModule,
} from '@ux-aspects/ux-aspects';
import { InfiniteScrollColumnSortingTestPageComponent } from './column-sorting/infinite-scroll-column-sorting.testpage.component';
import { InfiniteScrollFullscreenTestPageComponent } from './fullscreen/infinite-scroll-fullscreen.testpage.component';
import { InfiniteScrollImmediateTestPageComponent } from './immediate/infinite-scroll-immediate.testpage.component';
import { InfiniteScrollTestPageComponent } from './standard/infinite-scroll.testpage.component';

@NgModule({
  imports: [
    CheckboxModule,
    NumberPickerModule,
    AccessibilityModule,
    AccordionModule,
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
    ColumnSortingModule,
    RouterModule.forChild([
      {
        path: '',
        component: InfiniteScrollTestPageComponent,
      },
      {
        path: 'fullscreen',
        component: InfiniteScrollFullscreenTestPageComponent,
      },
      {
        path: 'immediate',
        component: InfiniteScrollImmediateTestPageComponent,
      },
      {
        path: 'column-sorting',
        component: InfiniteScrollColumnSortingTestPageComponent,
      },
    ]),
  ],
  declarations: [
    InfiniteScrollTestPageComponent,
    InfiniteScrollFullscreenTestPageComponent,
    InfiniteScrollImmediateTestPageComponent,
    InfiniteScrollColumnSortingTestPageComponent,
  ],
})
export class InfiniteScrollTestPageModule {}
