import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AudioService } from './audio.service';

@NgModule({
    imports: [ HttpModule ],
    providers: [AudioService]
})
export class AudioServiceModule { }
