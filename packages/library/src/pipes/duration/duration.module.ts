import { NgModule } from '@angular/core';

import { DurationPipe } from './duration.pipe';

@NgModule({
    exports: [DurationPipe],
    declarations: [DurationPipe]
})
export class DurationPipeModule { }
