import { NgModule, NgZone } from '@angular/core';

import { EboxModule } from './components/ebox/ebox.module';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { RadioButtonModule } from './components/radiobutton/radiobutton.module';
import { SparkModule } from './components/spark/spark.module';
import { ProgressBarModule } from './components/progressbar/progressbar.module';
import { FlippableCardModule } from './components/flippable-card/flippable-card.module';
import { ToggleSwitchModule } from './components/toggleswitch/toggleswitch.module';

import { ColorService } from './services/color/color.service';

const UX_ASPECTS_MODULES = [ 
  EboxModule, 
  CheckboxModule, 
  SparkModule, 
  ProgressBarModule, 
  RadioButtonModule, 
  FlippableCardModule,
  ToggleSwitchModule
];

@NgModule({
  imports: UX_ASPECTS_MODULES,
  exports: UX_ASPECTS_MODULES,
  providers: [
    ColorService
  ]
})
export class UxAspectsModule {
    constructor( private ngZone: NgZone) {
      // make ngzone global
      (<any>window).ngZone = ngZone;
    }
 }

export * from './components/checkbox/checkbox.component';
export * from './components/ebox/ebox.component';
export * from './components/flippable-card/flippable-card.component';
export * from './components/progressbar/progressbar.component';
export * from './components/radiobutton/radiobutton.component';
export * from './components/spark/spark.component';
export * from './components/toggleswitch/toggleswitch.component';
export * from './services/color/color.service';
