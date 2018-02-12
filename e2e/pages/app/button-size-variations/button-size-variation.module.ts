import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonSizeVariationsTestPageComponent } from './button-size-variations.testpage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ButtonSizeVariationsTestPageComponent
            }
        ])
    ],
    declarations: [ButtonSizeVariationsTestPageComponent]
})
export class ButtonSizeVariationsTestPageModule { }
