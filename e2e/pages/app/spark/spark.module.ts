import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SparkModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { SparkTestPageComponent } from './spark.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        SparkModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: SparkTestPageComponent,
            },
        ]),
    ],
    declarations: [SparkTestPageComponent],
})
export class SparkTestPageModule {}
