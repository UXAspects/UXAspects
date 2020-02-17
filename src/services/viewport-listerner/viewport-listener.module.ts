import { NgModule } from '@angular/core';
import { ViewportListenerService } from './viewport-listener.service';
import { ResizeModule } from '../../../dist/directives/resize';

@NgModule({
    imports: [ResizeModule],
    providers: [ViewportListenerService]
})
export class ViewportListenerServiceModule { }
