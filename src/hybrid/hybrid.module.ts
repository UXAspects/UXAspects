import { NgModule, Injector } from '@angular/core';

import { FloatingActionButtonComponent } from './components/floating-action-button/floating-action-button.component';
import { FlotComponent } from './components/flot/flot.component';
import { NestedDonutComponent } from './components/nested-donut/nested-donut.component';
import { OrganizationChartComponent } from './components/organization-chart/organization-chart.component';
import { PartitionMapComponent } from './components/partition-map/partition-map.component';
import { PeityBarChartComponent } from './components/peity-chart/peity-bar-chart.component';
import { PeityLineChartComponent } from './components/peity-chart/peity-line-chart.component';
import { PeityPieChartComponent } from './components/peity-chart/peity-pie-chart.component';
import { PeityUpdatingLineChartComponent } from './components/peity-chart/peity-updating-line-chart.component';
import { SankeyComponent } from './components/sankey-chart/sankey.component';
import { SocialChartComponent } from './components/social-chart/social-chart.component';
import { TimeAgoService, timeAgoServiceProvider } from './services/time-ago/time-ago.service';
import { PdfService, pdfServiceProvider } from './services/pdf/pdf.service';
import { NavigationMenuService, navigationMenuServiceProvider } from './services/navigation-menu/navigation-menu.service';
import { NotificationService, notificationServiceProvider } from './services/notification/notification.service';
import { GridComponent } from './components/grid/grid.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { HierarchyBarComponent } from './components/hierarchy-bar/hierarchy-bar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ExpandInputComponent } from './components/expand-input/expand-input.component';
import { SortDirectionToggleComponent } from './components/sort-direction-toggle/sort-direction-toggle.component';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { TreeGridComponent } from './components/tree-grid/tree-grid.component';
import { SelectTableComponent } from './components/select-table/select-table.component';
import { MarqueeWizardComponent } from './components/marquee-wizard/marquee-wizard.component';
import { SliderChartComponent } from './components/slider-chart/slider-chart.directive';

const declarations = [
    ContactsComponent,
    ExpandInputComponent,
    FloatingActionButtonComponent,
    FlotComponent,
    GridComponent,
    HierarchyBarComponent,
    MarqueeWizardComponent,
    NestedDonutComponent,
    OrganizationChartComponent,
    PartitionMapComponent,
    PeityBarChartComponent,
    PeityLineChartComponent,
    PeityPieChartComponent,
    PeityUpdatingLineChartComponent,
    SankeyComponent,
    SearchToolbarComponent,
    SelectTableComponent,
    SliderChartComponent,
    SocialChartComponent,
    SortDirectionToggleComponent,
    TreeGridComponent,
    ThumbnailComponent,
];

@NgModule({
    imports: [],
    exports: declarations,
    declarations: declarations,
    providers: [
        navigationMenuServiceProvider,
        notificationServiceProvider,
        pdfServiceProvider,
        timeAgoServiceProvider,
        TimeAgoService,
        PdfService,
        NavigationMenuService,
        NotificationService
    ],
})
export class HybridModule { }
