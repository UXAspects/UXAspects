import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AudioService } from './audio.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [AudioService]
})
export class AudioServiceModule { }
