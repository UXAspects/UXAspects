import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { AccessibilityModule } from '../../../../dist';
import { SplitterTestPageComponent } from './splitter.testpage.component';

@NgModule({
    imports: [
        AngularSplitModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: SplitterTestPageComponent
            }
        ])
    ],
    declarations: [SplitterTestPageComponent]
})
export class SplitterTestPageModule { }
