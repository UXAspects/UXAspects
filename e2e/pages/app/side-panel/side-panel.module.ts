import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, IconModule, RadioButtonModule, SidePanelModule } from '@ux-aspects/ux-aspects';
import { SidePanelTestPageComponent } from './side-panel.testpage.component';


@NgModule({
    imports: [
        FormsModule,
        IconModule,
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
