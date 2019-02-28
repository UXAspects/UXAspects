import { NgModule } from '@angular/core';
import { TimelineChartPlugin } from './timeline-chart';

/**
 * Directly exporting a file that is not an Angular component, module, etc..
 * can cause build issues. We can use a module that instantiates the plugin
 * instead of directly exporting the Chart.js plugin.
 */
@NgModule({})
export class TimelineChartModule {
    constructor() {
        TimelineChartPlugin.register();
    }
}