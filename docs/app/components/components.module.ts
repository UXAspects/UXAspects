import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, EboxModule, IconModule, MenuModule, PersistentDataModule, PopoverModule, ScrollModule, TooltipModule } from '@ux-aspects/ux-aspects';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ApiPropertiesComponent } from './api-properties/api-properties.component';
import { ApiPropertyComponent } from './api-property/api-property.component';
import { ComponentSectionComponent } from './component-section/component-section.component';
import { DocumentationCategoryComponent } from './documentation-category/documentation-category.component';
import { EditExampleLinkComponent } from './edit-example-link/edit-example-link.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';
import { LandingPageFeatureListComponent } from './landing-page-feature-list/landing-page-feature-list.component';
import { LandingPageFeatureComponent } from './landing-page-feature/landing-page-feature.component';
import { LandingPageHeaderComponent } from './landing-page-header/landing-page-header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavigationBarSearchComponent } from './navigation-bar-search/navigation-bar-search.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SectionSelectComponent } from './section-select/section-select.component';
import { ShowcaseCardComponent } from './showcase-card/showcase-card.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { SnippetComponent } from './snippet/snippet.component';
import { TextPageLayoutComponent } from './text-page-layout/text-page-layout.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { UsageLinkComponent } from './usage-link/usage-link.component';

const DOCUMENTATION_COMPONENTS = [
    ApiPropertiesComponent,
    ApiPropertyComponent,
    ComponentSectionComponent,
    DocumentationCategoryComponent,
    EditExampleLinkComponent,
    FullPageLayoutComponent,
    LandingPageFeatureComponent,
    LandingPageFeatureListComponent,
    LandingPageHeaderComponent,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    NavigationBarSearchComponent,
    PageFooterComponent,
    PageHeaderComponent,
    SectionSelectComponent,
    ShowcaseCardComponent,
    SideNavigationComponent,
    SnippetComponent,
    TextPageLayoutComponent,
    ThemeSelectorComponent,
    UsageLinkComponent
];

@NgModule({
    imports: [
        AccessibilityModule,
        BsDropdownModule,
        ButtonsModule,
        CommonModule,
        EboxModule,
        FormsModule,
        IconModule,
        MenuModule,
        PersistentDataModule,
        PopoverModule,
        RouterModule,
        ScrollModule,
        TooltipModule,
        TypeaheadModule,
    ],
    exports: [
        DOCUMENTATION_COMPONENTS,
        AccessibilityModule
    ],
    declarations: DOCUMENTATION_COMPONENTS
})
export class DocumentationComponentsModule { }
