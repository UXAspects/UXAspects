import { NgModule } from '@angular/core';
import { IconModule } from '@ux-aspects/ux-aspects';

@NgModule({
  imports: [
    IconModule.forRoot({
      icons: [
        { name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon', size: '14px' },
        { name: 'alert', icon: 'qtm-icon-alarm', iconset: 'qtm-font-icon', size: '16px' },
      ],
    }),
  ],
})
export class AppComponent {}
