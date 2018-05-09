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
            { path: 'buttons', loadChildren: './components-sections/buttons/buttons.module#ComponentsButtonsModule' },
            { path: 'component-list', loadChildren: './components-sections/component-list/component-list.module#ComponentsListModule' },
            { path: 'contacts', loadChildren: './components-sections/contacts/contacts.module#ComponentsContactsModule' },
            { path: 'dashboard', loadChildren: './components-sections/dashboard/dashboard.module#ComponentsDashboardModule' },
            { path: 'date-time-picker', loadChildren: './components-sections/date-time-picker/date-time-picker.module#ComponentsDateTimePickerModule' },
            { path: 'drag-and-drop', loadChildren: './components-sections/drag-and-drop/drag-and-drop.module#ComponentsDragAndDropModule' },
            { path: 'facets', loadChildren: './components-sections/facets/facets.module#ComponentsFacetsModule' },
            { path: 'file-upload', loadChildren: './components-sections/file-upload/file-upload.module#ComponentsFileUploadModule' },
            { path: 'flippable-cards', loadChildren: './components-sections/flippable-cards/flippable-cards.module#ComponentsFlippableCardsModule' },
            { path: 'grid', loadChildren: './components-sections/grid/grid.module#ComponentsGridModule' },
            { path: 'help-center', loadChildren: './components-sections/help-center/help-center.module#ComponentsHelpCenterModule' },
            { path: 'hierarchy-bar', loadChildren: './components-sections/hierarchy-bar/hierarchy-bar.module#ComponentsHierarchyBarModule' },
            { path: 'input-controls', loadChildren: './components-sections/input-controls/input-controls.module#ComponentsInputControlsModule' },
            { path: 'keyboard', loadChildren: './components-sections/keyboard/keyboard.module#ComponentsKeyboardModule' },
            { path: 'media-player', loadChildren: './components-sections/media-player/media-player.module#ComponentsMediaPlayerModule' },
            { path: 'modals', loadChildren: './components-sections/modals/modals.module#ComponentsModalsModule' },
            { path: 'notifications', loadChildren: './components-sections/notifications/notifications.module#ComponentsNotificationsModule' },
            { path: 'page-header', loadChildren: './components-sections/page-header/page-header.module#ComponentsPageHeaderModule' },
            { path: 'panels', loadChildren: './components-sections/panels/panels.module#ComponentsPanelsModule' },
            { path: 'popover', loadChildren: './components-sections/popover/popover.module#ComponentsPopoverModule' },
            { path: 'progress', loadChildren: './components-sections/progress/progress.module#ComponentsProgressModule' },
            { path: 'scrollbar', loadChildren: './components-sections/scrollbar/scrollbar.module#ComponentsScrollbarModule' },
            { path: 'search', loadChildren: './components-sections/search/search.module#ComponentsSearchModule' },
            { path: 'select', loadChildren: './components-sections/select/select.module#ComponentsSelectModule' },
            { path: 'side-navigation', loadChildren: './components-sections/side-navigation/side-navigation.module#ComponentsSideNavigationModule' },
            { path: 'splitter', loadChildren: './components-sections/splitter/splitter.module#ComponentsSplitterModule' },
            { path: 'tables', loadChildren: './components-sections/tables/tables.module#ComponentsTablesModule' },
            { path: 'tabs', loadChildren: './components-sections/tabs/tabs.module#ComponentsTabsModule' },
            { path: 'timeline', loadChildren: './components-sections/timeline/timeline.module#ComponentsTimelineModule' },
            { path: 'tooltips', loadChildren: './components-sections/tooltips/tooltips.module#ComponentsTooltipsModule' },
            { path: 'tree-view', loadChildren: './components-sections/tree-view/tree-view.module#ComponentsTreeViewModule' },
            { path: 'ui-router', loadChildren: './components-sections/ui-router/router.module#ComponentsRouterModule' },
            { path: 'utilities', loadChildren: './components-sections/utilities/utilities.module#ComponentsUtilitiesModule' },
            { path: 'wizard', loadChildren: './components-sections/wizard/wizard.module#ComponentsWizardModule' }
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