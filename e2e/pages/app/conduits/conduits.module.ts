import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from '../../../../dist';
import { ConduitTestPageComponent } from './conduit.component';
import { ZoneOneComponent } from './zones/zone-one/zone-one.component';
import { ZoneThreeComponent } from './zones/zone-three/zone-three.component';
import { ZoneTwoComponent } from './zones/zone-two/zone-two.component';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ConduitTestPageComponent
            }
        ])
    ],
    declarations: [
        ConduitTestPageComponent,
        ZoneOneComponent,
        ZoneTwoComponent,
        ZoneThreeComponent
    ]
})
export class ConduitsTestPageModule { }
