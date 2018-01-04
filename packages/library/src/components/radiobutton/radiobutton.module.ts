import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { RadioButtonComponent } from './radiobutton.component';

@NgModule({
    imports: [FormsModule],
    exports: [RadioButtonComponent],
    declarations: [RadioButtonComponent]
})
export class RadioButtonModule { }
