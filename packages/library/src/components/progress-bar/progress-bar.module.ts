import { NgModule } from '@angular/core';

import { ProgressBarComponent } from './progress-bar.component';
import { ColorServiceModule } from '../../services/color/index';

@NgModule({
    imports: [ColorServiceModule],
    exports: [ProgressBarComponent],
    declarations: [ProgressBarComponent]
})
export class ProgressBarModule { }
