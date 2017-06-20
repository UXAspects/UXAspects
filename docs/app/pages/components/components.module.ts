import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';

import { ComponentsPageComponent } from './components.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ComponentsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'buttons' },
            { path: 'buttons', loadChildren: './sections/buttons/buttons.module#ComponentsButtonsModule' },
            { path: 'component-list', loadChildren: './sections/component-list/component-list.module#ComponentsListModule' },
            { path: 'contacts', loadChildren: './sections/contacts/contacts.module#ComponentsContactsModule' },
            { path: 'dashboard', loadChildren: './sections/dashboard/dashboard.module#ComponentsDashboardModule' },
            { path: 'date-time-picker', loadChildren: './sections/date-time-picker/date-time-picker.module#ComponentsDateTimePickerModule' },
            { path: 'draggable-cards', loadChildren: './sections/draggable-cards/draggable-cards.module#ComponentsDraggableCardsModule' },
            { path: 'draggable-panels', loadChildren: './sections/draggable-panels/draggable-panels.module#ComponentsDraggablePanelsModule' },
            { path: 'facets', loadChildren: './sections/facets/facets.module#ComponentsFacetsModule' },
            { path: 'file-upload', loadChildren: './sections/file-upload/file-upload.module#ComponentsFileUploadModule' },
            { path: 'flippable-cards', loadChildren: './sections/flippable-cards/flippable-cards.module#ComponentsFlippableCardsModule' },
            { path: 'grid', loadChildren: './sections/grid/grid.module#ComponentsGridModule' },
            { path: 'help-center', loadChildren: './sections/help-center/help-center.module#ComponentsHelpCenterModule' },
            { path: 'hierarchy-bar', loadChildren: './sections/hierarchy-bar/hierarchy-bar.module#ComponentsHierarchyBarModule' },
            { path: 'input-controls', loadChildren: './sections/input-controls/input-controls.module#ComponentsInputControlsModule' },
            { path: 'keyboard', loadChildren: './sections/keyboard/keyboard.module#ComponentsKeyboardModule' },
            { path: 'modals', loadChildren: './sections/modals/modals.module#ComponentsModalsModule' },
            { path: 'notifications', loadChildren: './sections/notifications/notifications.module#ComponentsNotificationsModule' },
            { path: 'page-header', loadChildren: './sections/page-header/page-header.module.ts#ComponentsPageHeaderModule' },
            { path: 'panels', loadChildren: './sections/panels/panels.module#ComponentsPanelsModule' },
            { path: 'popover', loadChildren: './sections/popover/popover.module#ComponentsPopoverModule' },
            { path: 'progress', loadChildren: './sections/progress/progress.module#ComponentsProgressModule' },
            { path: 'scrollbar', loadChildren: './sections/scrollbar/scrollbar.module#ComponentsScrollbarModule' },
            { path: 'search', loadChildren: './sections/search/search.module#ComponentsSearchModule' },
            { path: 'select', loadChildren: './sections/select/select.module#ComponentsSelectModule' },
            { path: 'side-navigation', loadChildren: './sections/side-navigation/side-navigation.module#ComponentsSideNavigationModule' },
            { path: 'splitter', loadChildren: './sections/splitter/splitter.module#ComponentsSplitterModule' },
            { path: 'tables', loadChildren: './sections/tables/tables.module#ComponentsTablesModule' },
            { path: 'tabs', loadChildren: './sections/tabs/tabs.module#ComponentsTabsModule' },
            { path: 'timeline', loadChildren: './sections/timeline/timeline.module#ComponentsTimelineModule' },
            { path: 'tooltips', loadChildren: './sections/tooltips/tooltips.module#ComponentsTooltipsModule' },
            { path: 'tree-view', loadChildren: './sections/tree-view/tree-view.module#ComponentsTreeViewModule' },
            { path: 'ui-router', loadChildren: './sections/ui-router/router.module#ComponentsRouterModule' },
            { path: 'utilities', loadChildren: './sections/utilities/utilities.module#ComponentsUtilitiesModule' },
            { path: 'wizard', loadChildren: './sections/wizard/wizard.module#ComponentsWizardModule' }
        ],
    },
    {
        path: '**',
        redirectTo: '/buttons'
    }
];

@NgModule({
    imports: [
        DocumentationComponentsModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [ComponentsPageComponent],
    declarations: [ComponentsPageComponent]
})
export class ComponentsPageModule {
}