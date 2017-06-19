import { ContactGroupDirective } from './contact/contact-group.directive';
import { FlotDirective } from './flot/flot.directive';
import { NestedDonutDirective } from './nested-donut/nested-donut.directive';
import { NumberPickerDirective } from './number-picker/number-picker.directive';
import { OrganizationChartDirective } from './organization-chart/organization-chart.directive';
import { PartitionMapDirective } from './partition-map/partition-map.directive';
import { PeityBarChartDirective } from './peity/peity-bar-chart.directive';
import { PeityLineChartDirective } from './peity/peity-line-chart.directive';
import { PeityPieChartDirective } from './peity/peity-pie-chart.directive';
import { PeityUpdatingLineChartDirective } from './peity/peity-updating-line-chart.directive';
import { SankeyDirective } from './sankey/sankey.directive';
import { ScrollPaneDirective } from './scroll-pane/scroll-pane.directive';
import { SocialChartDirective } from './social-chart/social-chart.directive';
import { SparkDirective } from './spark/spark.directive';

let wrapperModule = angular.module('ux-aspects.wrappers', [
    'angular-flot',
    'angular-peity',
    'ux-aspects.contacts',
    'ux-aspects.d3',
    'ux-aspects.nestedDonut',
    'ux-aspects.numberPicker',
    'ux-aspects.safeTimeout', 
    'ux-aspects.sankey',
    'ux-aspects.sigma',
    'ux-aspects.socialChart', 
    'ux-aspects.spark'
]);

wrapperModule.directive('uxContactGroupNg1', ContactGroupDirective);
wrapperModule.directive('uxFlotNg1', FlotDirective);
wrapperModule.directive('uxNestedDonutNg1', NestedDonutDirective);
wrapperModule.directive('uxNumberPickerNg1', NumberPickerDirective);
wrapperModule.directive('uxOrganizationChartNg1', OrganizationChartDirective);
wrapperModule.directive('uxPartitionMapNg1', PartitionMapDirective);
wrapperModule.directive('uxPeityBarChartNg1', PeityBarChartDirective);
wrapperModule.directive('uxPeityLineChartNg1', PeityLineChartDirective);
wrapperModule.directive('uxPeityPieChartNg1', PeityPieChartDirective);
wrapperModule.directive('uxPeityUpdatingLineChartNg1', PeityUpdatingLineChartDirective);
wrapperModule.directive('uxSankeyNg1', SankeyDirective);
wrapperModule.directive('uxScrollPaneNg1', ScrollPaneDirective);
wrapperModule.directive('uxSocialChartNg1', SocialChartDirective);
wrapperModule.directive('uxSparkNg1', SparkDirective);
