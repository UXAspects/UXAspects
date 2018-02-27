import { NgModule, Injector } from '@angular/core';

import { FloatingActionButtonNg1Component } from './components/floating-action-button/floating-action-button.component';
import { FlotNg1Component } from './components/flot/flot.component';
import { NestedDonutNg1Component } from './components/nested-donut/nested-donut.component';
import { OrganizationChartNg1Component } from './components/organization-chart/organization-chart.component';
import { PartitionMapNg1Component } from './components/partition-map/partition-map.component';
import { PeityBarChartNg1Component } from './components/peity-chart/peity-bar-chart.component';
import { PeityLineChartNg1Component } from './components/peity-chart/peity-line-chart.component';
import { PeityPieChartNg1Component } from './components/peity-chart/peity-pie-chart.component';
import { PeityUpdatingLineChartNg1Component } from './components/peity-chart/peity-updating-line-chart.component';
import { SankeyNg1Component } from './components/sankey-chart/sankey.component';
import { SocialChartNg1Component } from './components/social-chart/social-chart.component';
import { TimeAgoService, timeAgoServiceProvider } from './services/time-ago/time-ago.service';
import { PdfService, pdfServiceProvider } from './services/pdf/pdf.service';
import { NavigationMenuService, navigationMenuServiceProvider } from './services/navigation-menu/navigation-menu.service';
import { GridNg1Component } from './components/grid/grid.component';
import { ThumbnailNg1Component } from './components/thumbnail/thumbnail.component';
import { HierarchyBarNg1Component } from './components/hierarchy-bar/hierarchy-bar.component';
import { ContactsNg1Component } from './components/contacts/contacts.component';
import { ExpandInputNg1Component } from './components/expand-input/expand-input.component';
import { SortDirectionToggleNg1Component } from './components/sort-direction-toggle/sort-direction-toggle.component';
import { SearchToolbarNg1Component } from './components/search-toolbar/search-toolbar.component';
import { TreeGridNg1Component } from './components/tree-grid/tree-grid.component';
import { SelectTableNg1Component } from './components/select-table/select-table.component';
import { MarqueeWizardNg1Component } from './components/marquee-wizard/marquee-wizard.component';
import { SliderChartNg1Component } from './components/slider-chart/slider-chart.directive';

const declarations = [
    ContactsNg1Component,
    ExpandInputNg1Component,
    FloatingActionButtonNg1Component,
    FlotNg1Component,
    GridNg1Component,
    HierarchyBarNg1Component,
    MarqueeWizardNg1Component,
    NestedDonutNg1Component,
    OrganizationChartNg1Component,
    PartitionMapNg1Component,
    PeityBarChartNg1Component,
    PeityLineChartNg1Component,
    PeityPieChartNg1Component,
    PeityUpdatingLineChartNg1Component,
    SankeyNg1Component,
    SearchToolbarNg1Component,
    SelectTableNg1Component,
    SliderChartNg1Component,
    SocialChartNg1Component,
    SortDirectionToggleNg1Component,
    TreeGridNg1Component,
    ThumbnailNg1Component,
];

@NgModule({
    imports: [],
    exports: declarations,
    declarations: declarations,
    providers: [
        navigationMenuServiceProvider,
        pdfServiceProvider,
        timeAgoServiceProvider,
        TimeAgoService,
        PdfService,
        NavigationMenuService,
    ],
})
export class HybridModule { }
