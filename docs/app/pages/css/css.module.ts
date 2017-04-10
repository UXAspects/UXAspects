import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UxAspectsModule } from '../../../../src/index';
import { DocumentationDirectivesModule } from '../../directives/directives.module';
import { DocumentationComponentsModule } from '../../components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { upgradeAdapter } from '../../app.module';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';

import { CssCardsComponent } from './sections/tables/cards/cards.component';
import { CssTablesComponent } from './sections/tables/tables/tables.component';
import { CssMiniActivityIndicatorComponent } from './sections/progress/mini-activity-indicator/mini-activity-indicator.component';
import { CssActivityIndicatorAlternativeComponent } from './sections/progress/activity-indicator-alternative/activity-indicator-alternative.component';
import { CssActivityIndicatorComponent } from './sections/progress/activity-indicator/activity-indicator.component';
import { CssEboxPanelComponent } from './sections/panels/ebox-panel/ebox-panel.component';
import { CssBasicPanelComponent } from './sections/panels/basic-panel/basic-panel.component';
import { CssSegmentedAddonsComponent } from './sections/text-inputs/segmented-addons/segmented-addons.component';
import { CssInputsHelpTextComponent } from './sections/text-inputs/inputs-help-text/inputs-help-text.component';
import { CssDropdownAddonsComponent } from './sections/text-inputs/dropdown-addons/dropdown-addons.component';
import { CssButtonAddonsComponent } from './sections/text-inputs/button-addons/button-addons.component';
import { CssFloatLabelsComponent } from './sections/text-inputs/float-labels/float-labels.component';
import { CssInputGroupsComponent } from './sections/text-inputs/input-groups/input-groups.component';
import { CssInputWidthComponent } from './sections/text-inputs/input-width/input-width.component';
import { CssInputHeightComponent } from './sections/text-inputs/input-height/input-height.component';
import { CssInputRequiredComponent } from './sections/text-inputs/input-required/input-required.component';
import { CssInputErrorComponent } from './sections/text-inputs/input-error/input-error.component';
import { CssDisabledAreaComponent } from './sections/text-inputs/disabled-inputs/disabled-inputs.component';
import { CssTextAreaComponent } from './sections/text-inputs/text-area/text-area.component';
import { CssTextInputsComponent } from './sections/text-inputs/text-inputs/text-inputs.component';
import { CssStaticTextComponent } from './sections/labels/static-text/static-text.component';
import { CssLabelsComponent } from './sections/labels/labels/labels.component';
import { CssIconColorsComponent } from './sections/icons/icon-colors/icon-colors.component';
import { CssIconButtonsComponent } from './sections/icons/icon-buttons/icon-buttons.component';
import { CssRotateFlipIconsComponent } from './sections/icons/rotate-flip-icons/rotate-flip-icons.component';
import { CssFixedWidthComponent } from './sections/icons/fixed-width/fixed-width.component';
import { CssIconSizeComponent } from './sections/icons/icon-size/icon-size.component';
import { CssBasicUsageComponent } from './sections/icons/basic-usage/basic-usage.component';
import { CssUxIconsComponent } from './sections/icons/ux-icons/ux-icons.component';
import { CssFormValidationOnSubmitComponent } from './sections/forms/form-validation-on-submit/form-validation-on-submit.component';
import { CssFormValidationFieldByFieldComponent } from './sections/forms/form-validation-field-by-field/form-validation-field-by-field.component';
import { CssInlineFormComponent } from './sections/forms/inline-form/inline-form.component';
import { CssHorizontalFormComponent } from './sections/forms/horizontal-form/horizontal-form.component';
import { CssBasicFormComponent } from './sections/forms/basic-form/basic-form.component';
import { CssCaseUsageGuidelinesComponent } from './sections/typography/case-usage-guidelines/case-usage-guidelines.component';
import { CssWellsComponent } from './sections/typography/wells/wells.component';
import { CssBlockquotesComponent } from './sections/typography/blockquotes/blockquotes.component';
import { CssEmphasisClassesComponent } from './sections/typography/emphasis-classes/emphasis-classes.component';
import { CssOrderedListComponent } from './sections/typography/ordered-list/ordered-list.component';
import { CssUnorderedListComponent } from './sections/typography/unordered-list/unordered-list.component';
import { CssUnstyledListComponent } from './sections/typography/unstyled-list/unstyled-list.component';
import { CssParagraphTextComponent } from './sections/typography/paragraph-text/paragraph-text.component';
import { CssHeadingsComponent } from './sections/typography/headings/headings.component';
import { CssPageHeaderExampleComponent } from './sections/page-header/page-header-example/page-header-example.component';
import { CssColoredButtonsComponent } from './sections/buttons/colored-buttons/colored-buttons.component';
import { CssLinkButtonsComponent } from './sections/buttons/link-buttons/link-buttons.component';
import { CssButtonsSizeVariationsComponent } from './sections/buttons/size-variations/size-variations.component';
import { CssCircularIconButtonsComponent } from './sections/buttons/circular-icon-buttons/circular-icon-buttons.component';
import { CssHyperlinksComponent } from './sections/buttons/hyperlinks/hyperlinks.component';
import { CssButtonDropdownsComponent } from './sections/buttons/button-dropdowns/button-dropdowns.component';
import { CssSplitButtonDropdownsComponent } from './sections/buttons/split-button-dropdowns/split-button-dropdowns.component';
import { CssColorPaletteComponent } from './sections/color-palette/color-palette/color-palette.component';
import { CssHtmlHeadComponent } from './sections/structure/html-head/html-head.component';
import { CssHtmlBodyComponent } from './sections/structure/html-body/html-body.component';
import { CssScrollToTopButtonComponent } from './sections/structure/scroll-to-top-button/scroll-to-top-button.component';
import { CssResponsiveDesignComponent } from './sections/responsive-design/responsive-design/responsive-design.component';
import { CssStackedToHorizontalComponent } from './sections/responsive-design/stacked-to-horizontal/stacked-to-horizontal.component';
import { CssMobileDesktopComponent } from './sections/responsive-design/mobile-desktop/mobile-desktop.component';
import { CssMobileTabletDesktopComponent } from './sections/responsive-design/mobile-tablet-desktop/mobile-tablet-desktop.component';
import { CssResponsiveColumnResetsComponent } from './sections/responsive-design/responsive-column-resets/responsive-column-resets.component';
import { CssOffsettingColumnsComponent } from './sections/responsive-design/offsetting-columns/offsetting-columns.component';
import { CssNestingColumnsComponent } from './sections/responsive-design/nesting-columns/nesting-columns.component';
import { CssColumnOrderingComponent } from './sections/responsive-design/column-ordering/column-ordering.component';
import { CssPageTitleComponent } from './sections/page-title/page-title/page-title.component';
import { CssNavigationComponent } from './sections/side-navigation/navigation/navigation.component';
import { CssAppNavigatorComponent } from './sections/side-navigation/app-navigator/app-navigator.component';
import { CssNavigationHeaderComponent } from './sections/page-header/navigation-header/navigation-header.component';
import { CssMenuButtonComponent } from './sections/page-header/menu-button/menu-button.component';
import { CssBreadcrumbComponent } from './sections/page-header/breadcrumb/breadcrumb.component';
import { CssBreadcrumbFromStatesComponent } from './sections/page-header/breadcrumb-from-states/breadcrumb-from-states.component';
import { CssBreadcrumbWithTabStateComponent } from './sections/page-header/breadcrumb-with-tab-state/breadcrumb-with-tab-state.component';
import { CssCondensedHeaderComponent } from './sections/page-header/condensed-header/condensed-header.component';
import { CssCondensedHeaderToolbarComponent } from './sections/page-header/condensed-header-toolbar/condensed-header-toolbar.component';
import { CssStandardHeaderComponent } from './sections/page-header/standard-header/standard-header.component';
import { CssProductNameLogoComponent } from './sections/page-header/product-name-logo/product-name-logo.component';
import { CssBackButtonComponent } from './sections/page-header/back-button/back-button.component';
import { CssHeaderContentPanelComponent } from './sections/page-header/header-content-panel/header-content-panel.component';
import { CssDynamicNameCalloutComponent } from './sections/page-header/dynamic-name-callout/dynamic-name-callout.component';
import { CssStandardHeaderToolbarComponent } from './sections/page-header/standard-header-toolbar/standard-header-toolbar.component';
import { CssHeaderNavTabToolbarComponent } from './sections/page-header/header-nav-tab-toolbar/header-nav-tab-toolbar.component';
import { DocumentationCategoryComponent } from '../../components/documentation-category/documentation-category.component';

// Import Wrappers
import './sections/forms/form-validation-field-by-field/wrapper/form-validation-field-by-field-wrapper.directive';
import './sections/forms/form-validation-on-submit/wrapper/form-validation-on-submit-wrapper.directive';
import './sections/text-inputs/float-labels/wrapper/float-labels-wrapper.directive';
import './sections/side-navigation/navigation/wrapper/navigation-wrapper.directive';
import './sections/side-navigation/navigation/wrapper/boldify.directive';
import './sections/side-navigation/app-navigator/wrapper/app-navigator-wrapper.directive';


const CSS_SECTIONS = [
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

    upgradeAdapter.upgradeNg1Component('uxdNavigationWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationFieldByFieldWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFormValidationOnSubmitWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdFloatLabelsWrapper'),
    upgradeAdapter.upgradeNg1Component('uxdAppNavigatorWrapper'),
];

const cssRoutes = loadRoutes(require('../../data/css-page.json'));

@NgModule({
    imports: [
        TabsModule,
        UxAspectsModule,
        DocumentationComponentsModule,
        DocumentationDirectivesModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(cssRoutes)
    ],
    exports: CSS_SECTIONS,
    declarations: CSS_SECTIONS,
    entryComponents: CSS_SECTIONS,
    providers: [],
})
export class CssPageModule { }

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