import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { TooltipsFallbackTestPageComponent } from './fallback/tooltips-fallback.testpage.component';
import { TooltipsTestPageComponent } from './standard/tooltips.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: TooltipsTestPageComponent
            },
            {
                path: 'fallback',
                component: TooltipsFallbackTestPageComponent
            }
    ])
    ],
    declarations: [
        TooltipsTestPageComponent,
        TooltipsFallbackTestPageComponent
    ],
})
export class TooltipsTestPageModule {

}
