import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusIfModule } from '../../directives/focus-if/focus-if.module';
import { SidePanelCloseDirective } from './side-panel-close.directive';
import { SidePanelComponent } from './side-panel.component';

const EXPORTS = [
    SidePanelComponent,
    SidePanelCloseDirective
];

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        FocusIfModule
    ],
    exports: EXPORTS,
    declarations: EXPORTS
})
export class SidePanelModule { }