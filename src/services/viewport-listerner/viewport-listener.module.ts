import { NgModule } from '@angular/core';
import { ViewportListenerService } from './viewport-listener.service';
import { ResizeModule } from '../../directives/resize/index';

@NgModule({
    imports: [ResizeModule],
    providers: [ViewportListenerService]
})
export class ViewportListenerServiceModule { }
