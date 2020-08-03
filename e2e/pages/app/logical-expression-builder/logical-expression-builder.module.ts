import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityModule, LogicalExpressionBuilderModule } from '@ux-aspects/ux-aspects';
import { RouterModule } from '@angular/router';
import { LogicalExpressionBuilderTestpageComponent } from './logical-expression-builder.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        LogicalExpressionBuilderModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: LogicalExpressionBuilderTestpageComponent
            }
        ])
    ],
    declarations: [LogicalExpressionBuilderTestpageComponent]
})
export class LogicalExpressionBuilderTestPageModule { }
