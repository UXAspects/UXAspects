import { ContactGroupDirective } from './contact/contact-group.directive';
import { ScrollPaneDirective } from './scroll-pane/scroll-pane.directive';
import { FlotDirective } from './flot/flot.directive';

import { PeityLineChartDirective } from './peity/peity-line-chart.directive';
import { PeityBarChartDirective } from './peity/peity-bar-chart.directive';
import { PeityPieChartDirective } from './peity/peity-pie-chart.directive';
import { PeityUpdatingLineChartDirective } from './peity/peity-updating-line-chart.directive';

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'ux-aspects.contacts',
    'angular-flot',
    'angular-peity'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);
wrapperModule.directive('uxScrollPaneNg1', ScrollPaneDirective);
wrapperModule.directive('uxFlotNg1', FlotDirective);
wrapperModule.directive('uxPeityLineChartNg1', PeityLineChartDirective);
wrapperModule.directive('uxPeityBarChartNg1', PeityBarChartDirective);
wrapperModule.directive('uxPeityPieChartNg1', PeityPieChartDirective);
wrapperModule.directive('uxPeityUpdatingLineChartNg1', PeityUpdatingLineChartDirective);
