import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponentsModule } from '../../components/components.module';
import { ComponentsPageComponent } from './components.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ComponentsPageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'buttons' },
            { path: 'buttons', loadChildren: () => import('./components-sections/buttons/buttons.module').then(m => m.ComponentsButtonsModule) },
            { path: 'component-list', loadChildren: () => import('./components-sections/component-list/component-list.module').then(m => m.ComponentsListModule) },
            { path: 'color', loadChildren: () => import('./components-sections/color/color.module').then(m => m.ComponentsColorModule) },
            { path: 'conduits', loadChildren: () => import('./components-sections/conduits/conduits.module').then(m => m.ComponentsConduitsModule) },
            { path: 'dashboard', loadChildren: () => import('./components-sections/dashboard/dashboard.module').then(m => m.ComponentsDashboardModule) },
            { path: 'date-time-picker', loadChildren: () => import('./components-sections/date-time-picker/date-time-picker.module').then(m => m.ComponentsDateTimePickerModule) },
            { path: 'drag-and-drop', loadChildren: () => import('./components-sections/drag-and-drop/drag-and-drop.module').then(m => m.ComponentsDragAndDropModule) },
            { path: 'facets', loadChildren: () => import('./components-sections/facets/facets.module').then(m => m.ComponentsFacetsModule) },
            { path: 'file-upload', loadChildren: () => import('./components-sections/file-upload/file-upload.module').then(m => m.ComponentsFileUploadModule) },
            { path: 'flippable-cards', loadChildren: () => import('./components-sections/flippable-cards/flippable-cards.module').then(m => m.ComponentsFlippableCardsModule) },
            { path: 'help-center', loadChildren: () => import('./components-sections/help-center/help-center.module').then(m => m.ComponentsHelpCenterModule) },
            { path: 'hierarchy-bar', loadChildren: () => import('./components-sections/hierarchy-bar/hierarchy-bar.module').then(m => m.ComponentsHierarchyBarModule) },
            { path: 'icons', loadChildren: () => import('./components-sections/icon/icon.module').then(m => m.ComponentsIconModule) },
            { path: 'input-controls', loadChildren: () => import('./components-sections/input-controls/input-controls.module').then(m => m.ComponentsInputControlsModule) },
            { path: 'keyboard', loadChildren: () => import('./components-sections/keyboard/keyboard.module').then(m => m.ComponentsKeyboardModule) },
            { path: 'media-player', loadChildren: () => import('./components-sections/media-player/media-player.module').then(m => m.ComponentsMediaPlayerModule) },
            { path: 'notifications', loadChildren: () => import('./components-sections/notifications/notifications.module').then(m => m.ComponentsNotificationsModule) },
            { path: 'page-header', loadChildren: () => import('./components-sections/page-header/page-header.module').then(m => m.ComponentsPageHeaderModule) },
            { path: 'panels', loadChildren: () => import('./components-sections/panels/panels.module').then(m => m.ComponentsPanelsModule) },
            { path: 'popover', loadChildren: () => import('./components-sections/popover/popover.module').then(m => m.ComponentsPopoverModule) },
            { path: 'progress', loadChildren: () => import('./components-sections/progress/progress.module').then(m => m.ComponentsProgressModule) },
            { path: 'scrollbar', loadChildren: () => import('./components-sections/scrollbar/scrollbar.module').then(m => m.ComponentsScrollbarModule) },
            { path: 'search', loadChildren: () => import('./components-sections/search/search.module').then(m => m.ComponentsSearchModule) },
            { path: 'select', loadChildren: () => import('./components-sections/select/select.module').then(m => m.ComponentsSelectModule) },
            { path: 'splitter', loadChildren: () => import('./components-sections/splitter/splitter.module').then(m => m.ComponentsSplitterModule) },
            { path: 'tables', loadChildren: () => import('./components-sections/tables/tables.module').then(m => m.ComponentsTablesModule) },
            { path: 'tabs', loadChildren: () => import('./components-sections/tabs/tabs.module').then(m => m.ComponentsTabsModule) },
            { path: 'timeline', loadChildren: () => import('./components-sections/timeline/timeline.module').then(m => m.ComponentsTimelineModule) },
            { path: 'tooltips', loadChildren: () => import('./components-sections/tooltips/tooltips.module').then(m => m.ComponentsTooltipsModule) },
            { path: 'tree-view', loadChildren: () => import('./components-sections/tree-view/tree-view.module').then(m => m.ComponentsTreeViewModule) },
            { path: 'utilities', loadChildren: () => import('./components-sections/utilities/utilities.module').then(m => m.ComponentsUtilitiesModule) },
            { path: 'wizard', loadChildren: () => import('./components-sections/wizard/wizard.module').then(m => m.ComponentsWizardModule) }
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