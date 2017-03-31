declare var angular: angular.IAngularStatic;

let app = angular.module('app', ['ux-aspects']);

import { IDocumentationPage } from './interfaces/IDocumentationPage';

import { NgModule, forwardRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeAdapter } from '@angular/upgrade';

// import bootstrap modules
import { TabsModule } from 'ng2-bootstrap/tabs';

// Import UX Aspects
import { UxAspectsModule } from '../../src/index';

// Import Child Modules
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';

// Import Root Component
import { AppComponent } from './app.component';

// Import Pages
import { LandingPageComponent } from './pages/landing/landing.component';
import { OverviewPageComponent } from './pages/overview/overview.component';
import { FeaturesPageComponent } from './pages/features/features.component';
import { GettingStartedPageComponent } from './pages/getting-started/getting-started.component';
import { ShowcasePageComponent } from './pages/showcase/showcase.component';
import { ComponentsPageComponent } from './pages/components/components.component';
import { CssPageComponent } from './pages/css/css.component';
import { ChartsPageComponent } from './pages/charts/charts.component';
import { CustomizePageComponent } from './pages/customize/customize.component';
import { TeamPageComponent } from './pages/team/team.component';
import { BlogPageComponent } from './pages/blog/blog.component';
import { DocumentationCategoryComponent } from './components/documentation-category/documentation-category.component';
import { LicensesPageComponent } from './pages/licenses/licenses.component';

import { documentationSections } from './decorators/documentation-section-component';

// Import CSS Page Sections
import { CssColoredButtonsComponent } from './pages/css/sections/buttons/colored-buttons/colored-buttons.component';
import { CssLinkButtonsComponent } from './pages/css/sections/buttons/link-buttons/link-buttons.component';
import { CssButtonsSizeVariationsComponent } from './pages/css/sections/buttons/size-variations/size-variations.component';
import { CssCircularIconButtonsComponent } from './pages/css/sections/buttons/circular-icon-buttons/circular-icon-buttons.component';
import { CssHyperlinksComponent } from './pages/css/sections/buttons/hyperlinks/hyperlinks.component';
import { CssButtonDropdownsComponent } from './pages/css/sections/buttons/button-dropdowns/button-dropdowns.component';
import { CssSplitButtonDropdownsComponent } from './pages/css/sections/buttons/split-button-dropdowns/split-button-dropdowns.component';
import { CssColorPaletteComponent } from './pages/css/sections/color-palette/color-palette/color-palette.component';
import { CssHtmlHeadComponent } from './pages/css/sections/structure/html-head/html-head.component';
import { CssHtmlBodyComponent } from './pages/css/sections/structure/html-body/html-body.component';
import { CssScrollToTopButtonComponent } from './pages/css/sections/structure/scroll-to-top-button/scroll-to-top-button.component';
import { CssResponsiveDesignComponent } from './pages/css/sections/responsive-design/responsive-design/responsive-design.component';
import { CssStackedToHorizontalComponent } from './pages/css/sections/responsive-design/stacked-to-horizontal/stacked-to-horizontal.component';
import { CssMobileDesktopComponent } from './pages/css/sections/responsive-design/mobile-desktop/mobile-desktop.component';
import { CssMobileTabletDesktopComponent } from './pages/css/sections/responsive-design/mobile-tablet-desktop/mobile-tablet-desktop.component';
import { CssResponsiveColumnResetsComponent } from './pages/css/sections/responsive-design/responsive-column-resets/responsive-column-resets.component';
import { CssOffsettingColumnsComponent } from './pages/css/sections/responsive-design/offsetting-columns/offsetting-columns.component';
import { CssNestingColumnsComponent } from './pages/css/sections/responsive-design/nesting-columns/nesting-columns.component';
import { CssColumnOrderingComponent } from './pages/css/sections/responsive-design/column-ordering/column-ordering.component';
import { CssPageTitleComponent } from './pages/css/sections/page-title/page-title/page-title.component';
import { CssNavigationComponent } from './pages/css/sections/side-navigation/navigation/navigation.component';
import { CssAppNavigatorComponent } from './pages/css/sections/side-navigation/app-navigator/app-navigator.component';
import { CssNavigationHeaderComponent } from './pages/css/sections/page-header/navigation-header/navigation-header.component';
import { CssMenuButtonComponent } from './pages/css/sections/page-header/menu-button/menu-button.component';
import { CssBreadcrumbComponent } from './pages/css/sections/page-header/breadcrumb/breadcrumb.component';
import { CssBreadcrumbFromStatesComponent } from './pages/css/sections/page-header/breadcrumb-from-states/breadcrumb-from-states.component';
import { CssBreadcrumbWithTabStateComponent } from './pages/css/sections/page-header/breadcrumb-with-tab-state/breadcrumb-with-tab-state.component';
import { CssCondensedHeaderComponent } from './pages/css/sections/page-header/condensed-header/condensed-header.component';
import { CssCondensedHeaderToolbarComponent } from './pages/css/sections/page-header/condensed-header-toolbar/condensed-header-toolbar.component';
import { CssStandardHeaderComponent } from './pages/css/sections/page-header/standard-header/standard-header.component';
import { CssProductNameLogoComponent } from './pages/css/sections/page-header/product-name-logo/product-name-logo.component';
import { CssHeaderContentPanelComponent } from './pages/css/sections/page-header/header-content-panel/header-content-panel.component';
import { CssBackButtonComponent } from './pages/css/sections/page-header/back-button/back-button.component';
import { CssDynamicNameCalloutComponent } from './pages/css/sections/page-header/dynamic-name-callout/dynamic-name-callout.component';
import { CssStandardHeaderToolbarComponent } from './pages/css/sections/page-header/standard-header-toolbar/standard-header-toolbar.component';
import { CssHeaderNavTabToolbarComponent } from './pages/css/sections/page-header/header-nav-tab-toolbar/header-nav-tab-toolbar.component';
import { CssPageHeaderExampleComponent } from './pages/css/sections/page-header/page-header-example/page-header-example.component';
import { CssHeadingsComponent } from './pages/css/sections/typography/headings/headings.component';
import { CssParagraphTextComponent } from './pages/css/sections/typography/paragraph-text/paragraph-text.component';
import { CssUnstyledListComponent } from './pages/css/sections/typography/unstyled-list/unstyled-list.component';
import { CssUnorderedListComponent } from './pages/css/sections/typography/unordered-list/unordered-list.component';
import { CssOrderedListComponent } from './pages/css/sections/typography/ordered-list/ordered-list.component';
import { CssEmphasisClassesComponent } from './pages/css/sections/typography/emphasis-classes/emphasis-classes.component';
import { CssBlockquotesComponent } from './pages/css/sections/typography/blockquotes/blockquotes.component';
import { CssWellsComponent } from './pages/css/sections/typography/wells/wells.component';
import { CssCaseUsageGuidelinesComponent } from './pages/css/sections/typography/case-usage-guidelines/case-usage-guidelines.component';
import { CssBasicFormComponent } from './pages/css/sections/forms/basic-form/basic-form.component';
import { CssHorizontalFormComponent } from './pages/css/sections/forms/horizontal-form/horizontal-form.component';
import { CssInlineFormComponent } from './pages/css/sections/forms/inline-form/inline-form.component';
import { CssFormValidationFieldByFieldComponent } from './pages/css/sections/forms/form-validation-field-by-field/form-validation-field-by-field.component';
import { CssFormValidationOnSubmitComponent } from './pages/css/sections/forms/form-validation-on-submit/form-validation-on-submit.component';
import { CssUxIconsComponent } from './pages/css/sections/icons/ux-icons/ux-icons.component';
import { CssBasicUsageComponent } from './pages/css/sections/icons/basic-usage/basic-usage.component';
import { CssIconSizeComponent } from './pages/css/sections/icons/icon-size/icon-size.component';
import { CssFixedWidthComponent } from './pages/css/sections/icons/fixed-width/fixed-width.component';
import { CssRotateFlipIconsComponent } from './pages/css/sections/icons/rotate-flip-icons/rotate-flip-icons.component';
import { CssIconButtonsComponent } from './pages/css/sections/icons/icon-buttons/icon-buttons.component';
import { CssIconColorsComponent } from './pages/css/sections/icons/icon-colors/icon-colors.component';
import { CssLabelsComponent } from './pages/css/sections/labels/labels/labels.component';
import { CssStaticTextComponent } from './pages/css/sections/labels/static-text/static-text.component';
import { CssTextInputsComponent } from './pages/css/sections/text-inputs/text-inputs/text-inputs.component';
import { CssTextAreaComponent } from './pages/css/sections/text-inputs/text-area/text-area.component';
import { CssDisabledAreaComponent } from './pages/css/sections/text-inputs/disabled-inputs/disabled-inputs.component';
import { CssInputErrorComponent } from './pages/css/sections/text-inputs/input-error/input-error.component';
import { CssInputRequiredComponent } from './pages/css/sections/text-inputs/input-required/input-required.component';
import { CssInputHeightComponent } from './pages/css/sections/text-inputs/input-height/input-height.component';
import { CssInputWidthComponent } from './pages/css/sections/text-inputs/input-width/input-width.component';
import { CssInputGroupsComponent } from './pages/css/sections/text-inputs/input-groups/input-groups.component';
import { CssFloatLabelsComponent } from './pages/css/sections/text-inputs/float-labels/float-labels.component';
import { CssButtonAddonsComponent } from './pages/css/sections/text-inputs/button-addons/button-addons.component';
import { CssInputsHelpTextComponent } from './pages/css/sections/text-inputs/inputs-help-text/inputs-help-text.component';
import { CssDropdownAddonsComponent } from './pages/css/sections/text-inputs/dropdown-addons/dropdown-addons.component';
import { CssSegmentedAddonsComponent } from './pages/css/sections/text-inputs/segmented-addons/segmented-addons.component';
import { CssBasicPanelComponent } from './pages/css/sections/panels/basic-panel/basic-panel.component';
import { CssEboxPanelComponent } from './pages/css/sections/panels/ebox-panel/ebox-panel.component';
import { CssActivityIndicatorComponent } from './pages/css/sections/progress/activity-indicator/activity-indicator.component';
import { CssActivityIndicatorAlternativeComponent } from './pages/css/sections/progress/activity-indicator-alternative/activity-indicator-alternative.component';
import { CssMiniActivityIndicatorComponent } from './pages/css/sections/progress/mini-activity-indicator/mini-activity-indicator.component';
import { CssTablesComponent } from './pages/css/sections/tables/tables/tables.component';
import { CssCardsComponent } from './pages/css/sections/tables/cards/cards.component';

// Import Components Page Section
import { ComponentsGroupedButtonsNg1Component } from './pages/components/sections/buttons/grouped-buttons-ng1/grouped-buttons-ng1.component';
import { ComponentsToggleButtonsNg1Component } from './pages/components/sections/buttons/toggle-buttons-ng1/toggle-buttons-ng1.component';
import { ComponentsFloatingActionButtonNg1Component } from './pages/components/sections/buttons/floating-action-button-ng1/floating-action-button-ng1.component';
import { ComponentsPaginationNg1Component } from './pages/components/sections/buttons/pagination-ng1/pagination-ng1.component';
import { ComponentsSingleToggleButtonNg1Component } from './pages/components/sections/buttons/single-toggle-button-ng1/single-toggle-button-ng1.component';
import { ComponentsCheckboxButtonsNg1Component } from './pages/components/sections/buttons/checkbox-buttons-ng1/checkbox-buttons-ng1.component';
import { ComponentsRadioButtonsNg1Component } from './pages/components/sections/buttons/radio-buttons-ng1/radio-buttons-ng1.component';
import { ComponentsDropdownNg1Component } from './pages/components/sections/buttons/dropdown-ng1/dropdown-ng1.component';
import { ComponentsThumbnailNg1Component } from './pages/components/sections/buttons/thumbnail-ng1/thumbnail-ng1.component';
import { ComponentsComponentListNg1Component } from './pages/components/sections/component-list/component-list-ng1/component-list-ng1.component';
import { ComponentsContactsNg1Component } from './pages/components/sections/contacts/contacts-ng1/contacts-ng1.component';
import { ComponentsContactsOverflowNg1Component } from './pages/components/sections/contacts/contacts-overflow-ng1/contacts-overflow-ng1.component';
import { ComponentsDraggableCardsNg1Component } from './pages/components/sections/draggable-cards/draggable-cards-ng1/draggable-cards-ng1.component';
import { ComponentsDraggablePanelsNg1Component } from './pages/components/sections/draggable-panels/draggable-panels-ng1/draggable-panels-ng1.component';
import { ComponentsDraggableCardsListViewNg1Component } from './pages/components/sections/draggable-cards/draggable-cards-list-view-ng1/draggable-cards-list-view-ng1.component';
import { ComponentsDraggablePanelsViewsNg1Component } from './pages/components/sections/draggable-panels/draggable-panels-views-ng1/draggable-panels-views-ng1.component';
import { ComponentsCheckboxComponent } from './pages/components/sections/input-controls/checkbox/checkbox.component';
import { ComponentsToggleSwitchComponent } from './pages/components/sections/input-controls/toggleswitch/toggleswitch.component';
import { ComponentsEboxComponent } from './pages/components/sections/ebox/ebox.component';
import { ComponentsFacetsNg1Component } from './pages/components/sections/facets/facets-ng1/facets-ng1.components';
import { ComponentsDynamicFacetsNg1Component } from './pages/components/sections/facets/dynamic-facets-ng1/dynamic-facets-ng1.components';
import { ComponentsCustomFacetsNg1Component } from './pages/components/sections/facets/custom-facets-ng1/custom-facets-ng1.component';
import { ComponentsFacetLineChartNg1Component } from './pages/components/sections/facets/facet-line-chart-ng1/facet-line-chart-ng1.component';
import { ComponentsProgrammaticSelectionNg1Component } from './pages/components/sections/facets/programmatic-selection-ng1/programmatic-selection-ng1.component';
import { ComponentsFileUploadNg1Component } from './pages/components/sections/file-upload/file-upload-ng1/file-upload-ng1.component';
import { ComponentsFlippableCardsNg1Component } from './pages/components/sections/flippable-cards/flippable-cards-ng1/flippable-cards-ng1.component';
import { ComponentsGridNg1Component } from './pages/components/sections/grid/grid-ng1/grid-ng1.component';
import { ComponentsHelpCenterNg1Component } from './pages/components/sections/help-center/help-center-ng1/help-center-ng1.component';
import { ComponentsHierarchyBarNg1Component } from './pages/components/sections/hierarchy-bar/hierarchy-bar-ng1/hierarchy-bar-ng1.component';


// Import Components Tables Section

import { ComponentsDetailRowResponsiveNg1Component } from './pages/components/sections/tables/detail-row-responsive-ng1/detail-row-responsive-ng1.component';
import { ComponentsColumnVisibilityNg1Component } from './pages/components/sections/tables/column-visibility-ng1/column-visibility-ng1.component';
import { ComponentsCustomResponsiveTableNg1Component } from './pages/components/sections/tables/custom-responsive-table-ng1/custom-responsive-table-ng1.component';
import { ComponentsDetailRowHeaderNg1Component } from './pages/components/sections/tables/detail-row-header-ng1/detail-row-header-ng1.component';
import { ComponentsDynamicFiltersNg1Component } from './pages/components/sections/tables/dynamic-filters-ng1/dynamic-filters-ng1.component';
import { ComponentsFiltersNg1Component } from './pages/components/sections/tables/filters-ng1/filters-ng1.component';
import { ComponentsFixedHeaderTableNg1Component } from './pages/components/sections/tables/fixed-header-table-ng1/fixed-header-table-ng1.component';
import { ComponentsGroupingNg1Component } from './pages/components/sections/tables/grouping-ng1/grouping-ng1.component';
import { ComponentsHoverActionsNg1Component } from './pages/components/sections/tables/hover-actions-ng1/hover-actions-ng1.component';
import { ComponentsIndicesNg1Component } from './pages/components/sections/tables/indices-ng1/indices-ng1.component';
import { ComponentsLayoutSwitchingNg1Component } from './pages/components/sections/tables/layout-switching-ng1/layout-switching-ng1.component';
import { ComponentsListHoverActionsNg1Component } from './pages/components/sections/tables/list-hover-actions-ng1/list-hover-actions-ng1.component';
import { ComponentsMultipleColumnSortingNg1Component } from './pages/components/sections/tables/multiple-column-sorting-ng1/multiple-column-sorting-ng1.component';
import { ComponentsMultipleSelectActionsNg1Component } from './pages/components/sections/tables/multiple-select-actions-ng1/multiple-select-actions-ng1.component';
import { ComponentsMultipleSelectionRowNg1Component } from './pages/components/sections/tables/multiple-selection-row-ng1/multiple-selection-row-ng1.component';
import { ComponentsPreviewPaneNg1Component } from './pages/components/sections/tables/preview-pane-ng1/preview-pane-ng1.component';
import { ComponentsPreviewPaneWindowNg1Component } from './pages/components/sections/tables/preview-pane-window-ng1/preview-pane-window-ng1.component';
import { ComponentsReorderableTableNg1Component } from './pages/components/sections/tables/reorderable-table-ng1/reorderable-table-ng1.component';
import { ComponentsSingleColumnSortingNg1Component } from './pages/components/sections/tables/single-column-sorting-ng1/single-column-sorting-ng1.component';
import { ComponentsSortDirectionToggleNg1Component } from './pages/components/sections/tables/sort-direction-toggle-ng1/sort-direction-toggle-ng1.component';
import { ComponentsSortingNg1Component } from './pages/components/sections/tables/sorting-ng1/sorting-ng1.component';
import { ComponentsTraditionalMultipleSelectActionsNg1Component } from './pages/components/sections/tables/traditional-multiple-select-actions-ng1/traditional-multiple-select-actions-ng1.component';

/*
  Import Wrapper Directives
*/
import './pages/css/sections/forms/form-validation-field-by-field/wrapper/form-validation-field-by-field-wrapper.directive';
import './pages/css/sections/forms/form-validation-on-submit/wrapper/form-validation-on-submit-wrapper.directive';
import './pages/css/sections/text-inputs/float-labels/wrapper/float-labels-wrapper.directive';
import './pages/css/sections/side-navigation/navigation/wrapper/navigation-wrapper.directive';
import './pages/css/sections/side-navigation/navigation/wrapper/boldify.directive';
import './pages/css/sections/side-navigation/app-navigator/wrapper/app-navigator-wrapper.directive';
import './pages/components/sections/tables/detail-row-header-ng1/wrapper/service/detail-row-data.service';
import './pages/components/sections/tables/detail-row-header-ng1/wrapper/detail-row-header-wrapper.directive';
import './pages/components/sections/tables/detail-row-responsive-ng1/wrapper/detail-row-responsive-wrapper.directive';
import './pages/components/sections/tables/fixed-header-table-ng1/wrapper/fixed-header-table-wrapper.directive';
import './pages/components/sections/tables/hover-actions-ng1/wrapper/hover-actions-wrapper.directive';
import './pages/components/sections/tables/reorderable-table-ng1/wrapper/reorderable-table-wrapper.directive';
import './pages/components/sections/tables/sort-direction-toggle-ng1/wrapper/sort-toggle-wrapper.directive';
import './pages/components/sections/tables/single-column-sorting-ng1/wrapper/single-column-sorting-wrapper.directive';
import './pages/components/sections/tables/multiple-column-sorting-ng1/wrapper/multi-column-sorting-wrapper.directive';
import './pages/components/sections/tables/preview-pane-window-ng1/wrapper/preview-pane-window-wrapper.directive';
import './pages/components/sections/facets/facet-line-chart-ng1/wrapper/facet-line-chart-ng1-wrapper';
import './pages/components/sections/file-upload/file-upload-ng1/wrapper/file-upload-wrapper.directive';
import './pages/components/sections/flippable-cards/flippable-cards-ng1/wrapper/flippable-cards-wrapper.directive';
import './pages/components/sections/grid/grid-ng1/wrapper/grid-wrapper.directive';
import './pages/components/sections/hierarchy-bar/hierarchy-bar-ng1/wrapper/hierarchy-bar-wrapper.directive';


let upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

/*
  Configure Component Page Routes
*/
const componentRoutes = loadRoutes(require('./data/components-page.json'));

/*
  Configure CSS Page Routes
*/
const cssRoutes = loadRoutes(require('./data/css-page.json'));

/*
  Configure Application Routes
*/
const appRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'features', component: FeaturesPageComponent },
  { path: 'gettingstarted', component: GettingStartedPageComponent },
  { path: 'showcase', component: ShowcasePageComponent },
  { path: 'components', component: ComponentsPageComponent, children: componentRoutes },
  { path: 'css', component: CssPageComponent, children: cssRoutes },
  { path: 'charts', component: ChartsPageComponent },
  { path: 'customize', component: CustomizePageComponent },
  { path: 'team', component: TeamPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { path: 'licenses', component: LicensesPageComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [
    // Angular Modules
    BrowserModule,
    HttpModule,
    FormsModule,

    // Bootstrap Modules
    TabsModule.forRoot(),

    // Documentation Modules
    ComponentsModule,
    DirectivesModule,
    ServicesModule,

    // Library Module
    UxAspectsModule,

    // Routing Module
    RouterModule.forRoot(appRoutes, { useHash: true, initialNavigation: false })
  ],
  declarations: [
    AppComponent,

    // Page Components
    LandingPageComponent,
    OverviewPageComponent,
    FeaturesPageComponent,
    GettingStartedPageComponent,
    ShowcasePageComponent,
    ComponentsPageComponent,
    CssPageComponent,
    ChartsPageComponent,
    CustomizePageComponent,
    TeamPageComponent,
    BlogPageComponent,
    DocumentationCategoryComponent,
    LicensesPageComponent,

    // Components Page Sections
    ComponentsGroupedButtonsNg1Component,
    ComponentsToggleButtonsNg1Component,
    ComponentsFloatingActionButtonNg1Component,
    ComponentsPaginationNg1Component,
    ComponentsSingleToggleButtonNg1Component,
    ComponentsCheckboxButtonsNg1Component,
    ComponentsRadioButtonsNg1Component,
    ComponentsDropdownNg1Component,
    ComponentsThumbnailNg1Component,

    ComponentsComponentListNg1Component,

    ComponentsContactsNg1Component,
    ComponentsContactsOverflowNg1Component,

    ComponentsDraggableCardsNg1Component,
    ComponentsDraggableCardsListViewNg1Component,

    ComponentsDraggablePanelsNg1Component,
    ComponentsDraggablePanelsViewsNg1Component,

    ComponentsFacetsNg1Component,
    ComponentsCustomFacetsNg1Component,
    ComponentsDynamicFacetsNg1Component,

    ComponentsCheckboxComponent,
    ComponentsToggleSwitchComponent,
    ComponentsEboxComponent,
    ComponentsDetailRowResponsiveNg1Component,
    ComponentsColumnVisibilityNg1Component,
    ComponentsCustomResponsiveTableNg1Component,
    ComponentsDetailRowHeaderNg1Component,
    ComponentsDynamicFiltersNg1Component,
    ComponentsFiltersNg1Component,
    ComponentsFixedHeaderTableNg1Component,
    ComponentsGroupingNg1Component,
    ComponentsHoverActionsNg1Component,
    ComponentsIndicesNg1Component,
    ComponentsLayoutSwitchingNg1Component,
    ComponentsListHoverActionsNg1Component,
    ComponentsMultipleColumnSortingNg1Component,
    ComponentsMultipleSelectActionsNg1Component,
    ComponentsMultipleSelectionRowNg1Component,
    ComponentsPreviewPaneNg1Component,
    ComponentsPreviewPaneWindowNg1Component,
    ComponentsReorderableTableNg1Component,
    ComponentsSingleColumnSortingNg1Component,
    ComponentsSortDirectionToggleNg1Component,
    ComponentsSortingNg1Component,
    ComponentsTraditionalMultipleSelectActionsNg1Component,
    ComponentsFacetLineChartNg1Component,
    ComponentsProgrammaticSelectionNg1Component,
    ComponentsFileUploadNg1Component,
    ComponentsFlippableCardsNg1Component,
    ComponentsGridNg1Component,
    ComponentsHelpCenterNg1Component,
    ComponentsHierarchyBarNg1Component,

    // CSS Page Sections
    CssColoredButtonsComponent,
    CssLinkButtonsComponent,
    CssButtonsSizeVariationsComponent,
    CssCircularIconButtonsComponent,
    CssHyperlinksComponent,
    CssButtonDropdownsComponent,
    CssSplitButtonDropdownsComponent,
    CssColorPaletteComponent,
    CssHtmlHeadComponent,
    CssHtmlBodyComponent,
    CssScrollToTopButtonComponent,
    CssResponsiveDesignComponent,
    CssStackedToHorizontalComponent,
    CssMobileDesktopComponent,
    CssMobileTabletDesktopComponent,
    CssResponsiveColumnResetsComponent,
    CssOffsettingColumnsComponent,
    CssNestingColumnsComponent,
    CssColumnOrderingComponent,
    CssPageTitleComponent,
    CssNavigationComponent,
    CssAppNavigatorComponent,
    CssNavigationHeaderComponent,
    CssMenuButtonComponent,
    CssBreadcrumbComponent,
    CssBreadcrumbFromStatesComponent,
    CssBreadcrumbWithTabStateComponent,
    CssCondensedHeaderComponent,
    CssCondensedHeaderToolbarComponent,
    CssStandardHeaderComponent,
    CssProductNameLogoComponent,
    CssHeaderContentPanelComponent,
    CssBackButtonComponent,
    CssDynamicNameCalloutComponent,
    CssStandardHeaderToolbarComponent,
    CssHeaderNavTabToolbarComponent,
    CssPageHeaderExampleComponent,
    CssHeadingsComponent,
    CssParagraphTextComponent,
    CssUnstyledListComponent,
    CssUnorderedListComponent,
    CssOrderedListComponent,
    CssEmphasisClassesComponent,
    CssBlockquotesComponent,
    CssWellsComponent,
    CssCaseUsageGuidelinesComponent,
    CssBasicFormComponent,
    CssHorizontalFormComponent,
    CssInlineFormComponent,
    CssFormValidationFieldByFieldComponent,
    CssFormValidationOnSubmitComponent,
    CssUxIconsComponent,
    CssBasicUsageComponent,
    CssIconSizeComponent,
    CssFixedWidthComponent,
    CssRotateFlipIconsComponent,
    CssIconButtonsComponent,
    CssIconColorsComponent,
    CssLabelsComponent,
    CssStaticTextComponent,
    CssTextInputsComponent,
    CssTextAreaComponent,
    CssDisabledAreaComponent,
    CssInputErrorComponent,
    CssInputRequiredComponent,
    CssInputHeightComponent,
    CssInputWidthComponent,
    CssInputGroupsComponent,
    CssFloatLabelsComponent,
    CssButtonAddonsComponent,
    CssInputsHelpTextComponent,
    CssDropdownAddonsComponent,
    CssSegmentedAddonsComponent,
    CssBasicPanelComponent,
    CssEboxPanelComponent,
    CssActivityIndicatorComponent,
    CssActivityIndicatorAlternativeComponent,
    CssMiniActivityIndicatorComponent,
    CssTablesComponent,
    CssCardsComponent,

    // Angular 1 Wrapper Directives
    upgradeAdapter.upgradeNg1Component('uxdGroupedButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdToggleButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFloatingActionButtonWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPaginationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleToggleButtonWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdCheckboxButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdRadioButtonsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDropdownWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdThumbnailWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdComponentListWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdContactsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdContactsOverflowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggableCardsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggableCardsListViewWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDraggablePanelsViewsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationFieldByFieldWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationOnSubmitWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFloatLabelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdNavigationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdAppNavigatorWrapper'),
    upgradeAdapter.upgradeNg1Component('uxContactGroupNg1'),
    upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDetailRowResponsiveWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFixedHeaderTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdHoverActionsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdReorderableTableWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSortToggleWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdSingleColumnSortingWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdMultiColumnSortingWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdDetailRowHeaderWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdPreviewPaneWindowWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFacetLineChartWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFileUploadWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFlippableCardsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdGridWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdHierarchyBarWrapper')
  ],
  entryComponents: documentationSections
})
export class AppModule {
  ngDoBootstrap() { }
}

/*
  Upgrade Some Angular 1 services
*/
upgradeAdapter.upgradeNg1Provider('$rootScope');
upgradeAdapter.upgradeNg1Provider('$state');

/*
  Register Angular 1 module
*/
app.directive('uxdApp', upgradeAdapter.downgradeNg2Component(AppComponent) as angular.IDirectiveFactory);

// bootstrap the Angular 1 application here
upgradeAdapter.bootstrap(document.documentElement, ['app']);


// Function to load routes from JSON data
function loadRoutes(data: IDocumentationPage): Routes {
  let routes: Routes = [];
  for (let i = 0; i < data.categories.length; i += 1) {
    let category = data.categories[i];
    if (routes.length === 0) {
      routes.push({ path: '', redirectTo: category.link, pathMatch: 'full' });
    }
    routes.push({ path: category.link, component: DocumentationCategoryComponent, data: { category: category } });
  }
  return routes;
}
