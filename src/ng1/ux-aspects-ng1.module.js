// import external libraries
import './external/angular-breadcrumb/angular-breadcrumb';
import './external/angular-file-upload/angular-file-upload';
import './external/angular-flot/angular-flot';
import './external/angular-peity/angular-peity';
import './external/angular-sanitize/angular-sanitize.min';
import './external/angular-scrollable-table/angular-scrollable-table';
import './external/angular-scrollPane/angular-jscrollpane';
import './external/angular-timeline/angular-timeline';
import './external/angular-ui-router/angular-ui-router';
import './external/angular-ui-tree/angular-ui-tree';
import './plugins/d3/d3';
import './external/d3/_module';
import './external/d3/d3.directive';
import './external/ng-tags-input/ng-tags-input';
import './external/sigma/_module';
import './external/sigma/sigma.directive';
import './external/ui-bootstrap/ui-bootstrap-tpls';

// import UX Aspects directives
import './directives/affixElement/affixElement.module';
import './directives/applicationSwitcher/applicationSwitcher.module';
import './directives/backButton/backButton.module';
import './directives/backButtonHeader/backButtonHeader.module';
import './directives/cardTabs/cardTabs.module';
import './directives/checkbox/checkbox.module';
import './directives/componentList/componentList.module';
import './directives/condensedHeader/condensedHeader.module';
import './directives/contacts/contacts.module';
import './directives/dateTimePicker/dateTimePicker.module';
import './directives/displayPanels/displayPanels.module';
import './directives/draggableCards/draggableCards.module';
import './directives/draggablePanels/draggablePanels.module';
import './directives/dynamicSelect/dynamicSelect.module';
import './directives/elementReady/elementReady.module';
import './directives/eventHandlers/event-handlers.module';
import './directives/expandingTextarea/expandingTextarea.module';
import './directives/expandInputs/expandInput.module';
import './directives/expandSearch/expandSearch.module';
import './directives/extendedCheckboxHit/extendedCheckboxHit.module';
import './directives/facets/facets.module';
import './directives/filters/filters.module';
import './directives/fixedHeaderTable/fixed-header-table.module';
import './directives/flippableCard/flippableCard.module';
import './directives/floatingActionButton/floatingActionButton.module';
import './directives/floatLabel/floatLabel.module';
import './directives/focusIf/focusIf.module';
import './directives/focusOnShow/focusOnShow.module';
import './directives/forceFocus/forceFocus.module';
import './directives/grid/grid.module';
import './directives/groupedButtons/groupedButtons.module';
import './directives/helpCenter/helpCenter.module';
import './directives/hierarchyBar/hierarchyBar.module';
import './directives/hotkey/hotkey.module';
import './directives/hoverActions/hoverActions.module';
import './directives/index/index.module';
import './directives/infiniteScroll/infiniteScroll.module';
import './directives/inputMask/inputMask.module';
import './directives/keyboardNavigableTable/keyboardNavigableTable.module';
import './directives/layoutSwitcher/layoutSwitcher.module';
import './directives/listHoverActions/listHoverActions.module';
import './directives/listItemFilter/listItemFilter.module';
import './directives/marqueeWizard/marqueeWizard.module';
import './directives/menuTab/menuTab.module';
import './directives/minimizeMenu/minimizeMenu.module';
import './directives/modalInsetPanel/modalInsetPanel.module';
import './directives/multipleListSelect/multipleListSelect.module';
import './directives/multipleRowSelect/multipleRowSelect.module';
import './directives/nestedDonut/nestedDonut.module';
import './directives/numberPicker/numberPicker.module';
import './directives/organizationChart/organizationChart.module';
import './directives/overflowTooltip/overflowTooltip.module';
import './directives/pageTitle/pageTitle.module';
import './directives/partitionMap/partitionMap.module';
import './directives/peityChart/peityChart.module';
import './directives/previewPanes/previewPane.module';
import './directives/radiobutton/radiobutton.module';
import './directives/reorderableTable/reorderableTable.module';
import './directives/sankey/sankey.module';
import './directives/scrollIntoViewIf/scrollIntoViewIf.module';
import './directives/scrollTop/scrollTop.module';
import './directives/searchBuilder/searchBuilder.module';
import './directives/searchCategories/searchCategories.module';
import './directives/searchToolbar/searchToolbar.module';
import './directives/selectTable/selectTable.module';
import './directives/sideInset/sideInset.module';
import './directives/sideModal/sideModal.module';
import './directives/sideNavigation/sideNavigation.module';
import './directives/slider/slider.module';
import './directives/sliderChart/sliderChart.module';
import './directives/socialChart/socialChart.module';
import './directives/sorters/sorters.module';
import './directives/spark/spark.module';
import './directives/splitter/splitter.module';
import './directives/staticTooltip/staticTooltip.module';
import './directives/tagInput/tagInput.module';
import './directives/templateOutlet/template-outlet.module';
import './directives/thumbnail/thumbnail.module';
import './directives/timeAgo/timeAgo.module';
import './directives/toggleswitch/toggleswitch.module';
import './directives/tooltipOnOverflow/tooltipOnOverflow.module';
import './directives/treegrid/treegrid.module';
import './directives/treeView/treeView.module';
import './directives/wizard/wizard.module';

// import UX Aspects providers
import './directives/multipleSelect/multipleSelect.module';

// import UX Aspects services
import './services/colorService/colorService.module';
import './services/debounceService/debounce.module';
import './services/flotDataService/flotDataService.module';
import './services/keyboardService/keyboardService.module';
import './services/lineDataService/lineData.module';
import './services/navigationMenuService/navigationMenu.module';
import './services/notificationService/notification.module';
import './services/pdfService/pdf.module';
import './services/resizeService/resize.module';
import './services/safeAnimationFrame/safeAnimationFrame.module';
import './services/safeEventListener/safeEventListener.module';
import './services/safeInterval/safeInterval.module';
import './services/safeTimeout/safeTimeout.module';
import './services/throttleService/throttle.module';
import './services/timeAgoService/timeAgo.module';
import './services/windowCommunicationService/windowCommunication.module';

import './templates/angular-breadcrumb/angular-breadcrumb.html';
import './templates/ui-bootstrap/pagination/pagination.html';
import './directives/facets/facetOption/facetOptionDefault.html';

// Import Wrappers
import './wrappers/wrappers.module';

// create the UX Aspects module
let aspects = angular.module('ux-aspects', [
    'ui.router',
    'ui.bootstrap.ux-aspects',
    'ngSanitize',
    'angular-timeline',
    'angular-peity',
    'angular-flot',
    'angularFileUpload',
    'scrollable-table',
    'ncy-angular-breadcrumb',
    'ui.tree',
    'ngJScrollPane',
    'ux-aspects.wrappers',
    'ux-aspects.affixElement',
    'ux-aspects.applicationSwitcher',
    'ux-aspects.backButton',
    'ux-aspects.backButtonHeader',
    'ux-aspects.cardTabs',
    'ux-aspects.checkbox',
    'ux-aspects.componentList',
    'ux-aspects.condensedHeader',
    'ux-aspects.contacts',
    'ux-aspects.d3',
    'ux-aspects.dateTimePicker',
    'ux-aspects.displayPanels',
    'ux-aspects.draggableCards',
    'ux-aspects.draggablePanels',
    'ux-aspects.dynamicSelect',
    'ux-aspects.elementReady',
    'ux-aspects.eventHandlers',
    'ux-aspects.expandingTextarea',
    'ux-aspects.expandInput',
    'ux-aspects.expandSearch',
    'ux-aspects.extendedCheckboxHit',
    'ux-aspects.facets',
    'ux-aspects.filters',
    'ux-aspects.fixed-header-table',
    'ux-aspects.flippableCard',
    'ux-aspects.floatingActionButton',
    'ux-aspects.floatLabel',
    'ux-aspects.focusIf',
    'ux-aspects.focusOnShow',
    'ux-aspects.forceFocus',
    'ux-aspects.grid',
    'ux-aspects.groupedButtons',
    'ux-aspects.helpCenter',
    'ux-aspects.hierarchyBar',
    'ux-aspects.hotkey',
    'ux-aspects.hoverActions',
    'ux-aspects.index',
    'ux-aspects.infiniteScroll',
    'ux-aspects.inputMask',
    'ux-aspects.keyboardNavigableTable',
    'ux-aspects.layoutSwitcher',
    'ux-aspects.listHoverActions',
    'ux-aspects.listItemFilter',
    'ux-aspects.marqueeWizard',
    'ux-aspects.menuTab',
    'ux-aspects.minimizeMenu',
    'ux-aspects.modalInsetPanel',
    'ux-aspects.multipleListSelect',
    'ux-aspects.multipleRowSelect',
    'ux-aspects.nestedDonut',
    'ux-aspects.numberPicker',
    'ux-aspects.organizationChart',
    'ux-aspects.overflowTooltip',
    'ux-aspects.pageTitle',
    'ux-aspects.partitionMap',
    'ux-aspects.updatingLinechart',
    'ux-aspects.previewPanes',
    'ux-aspects.radiobutton',
    'ux-aspects.reorderableTable',
    'ux-aspects.sankey',
    'ux-aspects.scrollIntoViewIf',
    'ux-aspects.scrollTop',
    'ux-aspects.searchBuilder',
    'ux-aspects.searchCategories',
    'ux-aspects.searchToolbar',
    'ux-aspects.selectTable',
    'ux-aspects.sideInset',
    'ux-aspects.sideModal',
    'ux-aspects.sideNavigation',
    'ux-aspects.slider',
    'ux-aspects.sliderChart',
    'ux-aspects.socialChart',
    'ux-aspects.sigma',
    'ux-aspects.sorters',
    'ux-aspects.spark',
    'ux-aspects.splitter',
    'ux-aspects.staticTooltip',
    'ux-aspects.tagInput',
    'ux-aspects.thumbnail',
    'ux-aspects.timeAgo',
    'ux-aspects.toggleswitch',
    'ux-aspects.tooltipOnOverflow',
    'ux-aspects.treegrid',
    'ux-aspects.treeview',
    'ux-aspects.wizard',

    // services
    'ux-aspects.colorService',
    'ux-aspects.debounceService',
    'ux-aspects.flotDataService',
    'ux-aspects.keyboardService',
    'ux-aspects.lineDataService',
    'ux-aspects.multipleSelect',
    'ux-aspects.navigationMenuService',
    'ux-aspects.notificationService',
    'ux-aspects.pdfService',
    'ux-aspects.resizeService',
    'ux-aspects.safeAnimationFrame',
    'ux-aspects.safeEventListener',
    'ux-aspects.safeInterval',
    'ux-aspects.safeTimeout',
    'ux-aspects.throttleService',
    'ux-aspects.timeAgoService',
    'ux-aspects.windowCommunicationService'
]);

// perform some initial configuration
aspects.config(["datepickerPopupConfig",
    "datepickerConfig",
    "paginationConfig",
    "$tooltipProvider",
    "$breadcrumbProvider",
    "$compileProvider",
    function (datepickerPopupConfig, datepickerConfig, paginationConfig, $tooltipProvider, $breadcrumbProvider, $compileProvider) {
        datepickerPopupConfig.showButtonBar = true;
        datepickerPopupConfig.appendToBody = true;
        datepickerConfig.showWeeks = false;
        datepickerConfig.formatMonth = "MMM";
        datepickerConfig.yearRange = 10;

        paginationConfig.maxSize = 5;

        var tooltipOptions = {
            popupDelay: 300,
            appendToBody: true
        };

        $tooltipProvider.options(tooltipOptions);

        $breadcrumbProvider.setOptions({
            templateUrl: 'templates/angular-breadcrumb/angular-breadcrumb.html'
        });

        // AngularJS 1.6.x compatibility; remove when bindings have been migrated to $onInit
        if (typeof $compileProvider.preAssignBindingsEnabled === 'function') {
            $compileProvider.preAssignBindingsEnabled(true);
        }
    }
]);

// perform some initial setup
aspects.run(["$rootScope", function ($rootScope) {

    $rootScope.$on('$stateChangeStart',
        function () {
            if (angular.element('.customTooltip').length > 0)
                angular.element('.customTooltip').remove();
            if (angular.element('.tooltip').length > 0)
                angular.element('.tooltip').remove();
        });
}]);