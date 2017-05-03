import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EboxModule } from '../../../src/index';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

// Import Layout Components
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';

// Import UI Components
import { EditExampleLinkComponent } from './edit-example-link/edit-example-link.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavigationBarSearchComponent } from './navigation-bar-search/navigation-bar-search.component';
import { LandingPageHeaderComponent } from './landing-page-header/landing-page-header.component';
import { LandingPageFeatureListComponent } from './landing-page-feature-list/landing-page-feature-list.component';
import { LandingPageFeatureComponent } from './landing-page-feature/landing-page-feature.component';
import { ShowcaseCardComponent } from './showcase-card/showcase-card.component';
import { ComponentSectionComponent } from './component-section/component-section.component';
import { SnippetComponent } from './snippet/snippet.component';
import { SectionSelectComponent } from './section-select/section-select.component';
import { DocumentationCategoryComponent } from './documentation-category/documentation-category.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UsageLinkComponent } from './usage-link/usage-link.component';

const DOCUMENTATION_COMPONENTS = [
    DocumentationCategoryComponent,
    EditExampleLinkComponent,
    SideNavigationComponent,
    FullPageLayoutComponent,
    PageHeaderComponent,
    PageFooterComponent,
    NavigationBarComponent,
    NavigationBarSearchComponent,
    LandingPageHeaderComponent,
    LandingPageFeatureListComponent,
    LandingPageFeatureComponent,
    ShowcaseCardComponent,
    ComponentSectionComponent,
    SnippetComponent,
    SectionSelectComponent,
    LoadingSpinnerComponent,
    UsageLinkComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        EboxModule,
        TooltipModule.forRoot(),
        PopoverModule.forRoot()
    ],
    exports: DOCUMENTATION_COMPONENTS,
    declarations: DOCUMENTATION_COMPONENTS,
    providers: [],
})
export class DocumentationComponentsModule { }
