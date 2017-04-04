import { ContactGroupDirective } from './contact/contact-group.directive';
import { ScrollPaneDirective } from './scroll-pane/scroll-pane.directive';
import { FlotDirective } from './flot/flot.directive';

import { PeityLineChartDirective } from './peity/peity-line-chart.directive';
import { PeityBarChartDirective } from './peity/peity-bar-chart.directive';
import { PeityPieChartDirective } from './peity/peity-pie-chart.directive';
import { PeityUpdatingLineChartDirective } from './peity/peity-updating-line-chart.directive';
import { NestedDonutDirective } from './nested-donut/nested-donut.directive';
import { OrganizationChartDirective } from './organization-chart/organization-chart.directive';
import { SparkDirective } from './spark/spark.directive';
import { PartitionMapDirective } from './partition-map/partition-map.directive'; 

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'ux-aspects.contacts',
    'angular-flot',
    'angular-peity',
    'ux-aspects.d3',
    'ux-aspects.nestedDonut',
    'ux-aspects.spark'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);
wrapperModule.directive('uxScrollPaneNg1', ScrollPaneDirective);
wrapperModule.directive('uxFlotNg1', FlotDirective);
wrapperModule.directive('uxPeityLineChartNg1', PeityLineChartDirective);
wrapperModule.directive('uxPeityBarChartNg1', PeityBarChartDirective);
wrapperModule.directive('uxPeityPieChartNg1', PeityPieChartDirective);
wrapperModule.directive('uxPeityUpdatingLineChartNg1', PeityUpdatingLineChartDirective);
wrapperModule.directive('uxNestedDonutNg1', NestedDonutDirective);
wrapperModule.directive('uxOrganizationChartNg1', OrganizationChartDirective);
wrapperModule.directive('uxSparkNg1', SparkDirective);
wrapperModule.directive('uxPartitionMapNg1', PartitionMapDirective);
