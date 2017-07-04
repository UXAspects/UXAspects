import { NgModule } from '@angular/core';

import { AudioService } from './audio.service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [AudioService]
})
export class AudioServiceModule { }
