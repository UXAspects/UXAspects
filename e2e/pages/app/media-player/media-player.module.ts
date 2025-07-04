import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MediaPlayerModule,
  PopoverModule,
  AccessibilityModule,
  ColorServiceModule,
  IconModule,
} from '@ux-aspects/ux-aspects';
import { MediaPlayerTestPageComponent } from './media-player.testpage.component';

@NgModule({
  imports: [
    CommonModule,
    MediaPlayerModule,
    PopoverModule,
    AccessibilityModule,
    ColorServiceModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: MediaPlayerTestPageComponent,
      },
    ]),
  ],
  declarations: [MediaPlayerTestPageComponent],
})
export class MediaPlayerTestPageModule {}
