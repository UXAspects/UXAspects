import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, IconModule, RadioButtonModule, SidePanelModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { SidePanelTestPageComponent } from './side-panel.testpage.component';


@NgModule({
    imports: [
        FormsModule,
        IconModule,
        AccessibilityModule,
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
