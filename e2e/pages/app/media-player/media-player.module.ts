import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaPlayerTestPageComponent } from './media-player.testpage.component';
import { RadioButtonModule, MediaPlayerModule, AccordionModule } from '@ux-aspects/ux-aspects';

@NgModule({
    imports: [
        CommonModule,
        RadioButtonModule, MediaPlayerModule, AccordionModule,
        RouterModule.forChild([
            {
                path: '',
                component: MediaPlayerTestPageComponent,
            },
        ]),
    ],
    declarations: [MediaPlayerTestPageComponent],
})
export class MediaPlayerTestPageModule { }
