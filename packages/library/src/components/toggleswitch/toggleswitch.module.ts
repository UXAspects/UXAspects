import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToggleSwitchComponent } from './toggleswitch.component';

@NgModule({
    imports: [ FormsModule ],
    exports: [ ToggleSwitchComponent ],
    declarations: [ ToggleSwitchComponent ]
})
export class ToggleSwitchModule { }
