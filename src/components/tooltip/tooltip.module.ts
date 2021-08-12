import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayFallbackServiceModule } from '../../services/overlay-fallback';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipService } from './tooltip.service';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        ObserversModule,
        OverlayFallbackServiceModule
    ],
    exports: [TooltipDirective, TooltipComponent],
    declarations: [TooltipComponent, TooltipDirective],
    providers: [TooltipService],
    entryComponents: [TooltipComponent]
})
export class TooltipModule { }
