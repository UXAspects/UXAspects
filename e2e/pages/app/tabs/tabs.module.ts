import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule, RadioButtonModule, TabsetModule } from '../../../../dist';
import { TabsTestPageComponent } from './tabs.testpage.component';


@NgModule({
    imports: [
        CommonModule,
        TabsetModule,
        CheckboxModule,
        RadioButtonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TabsTestPageComponent
            }
        ])
    ],
    declarations: [TabsTestPageComponent]
})
export class TabsTestPageModule { }
