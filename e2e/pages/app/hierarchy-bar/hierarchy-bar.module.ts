import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HierarchyBarModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { HierarchyBarTestPageComponent } from './hierarchy-bar.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        HierarchyBarModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: HierarchyBarTestPageComponent
            }
        ])
    ],
    declarations: [HierarchyBarTestPageComponent]
})
export class HierarchyBarTestPageModule { }
