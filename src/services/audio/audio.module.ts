import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AudioService } from './audio.service';

@NgModule({ imports: [], providers: [AudioService, provideHttpClient(withInterceptorsFromDi())] })
export class AudioServiceModule {}
