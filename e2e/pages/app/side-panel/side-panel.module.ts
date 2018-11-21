import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidePanelModule, RadioButtonModule, CheckboxModule } from '@ux-aspects/ux-aspects';

import { SidePanelTestPageComponent } from './side-panel.testpage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SidePanelTestPageComponent
            }
        ]),
        CheckboxModule,
        RadioButtonModule,
        SidePanelModule
    ],
    declarations: [SidePanelTestPageComponent]
})
export class SidePanelTestPageModule { }
