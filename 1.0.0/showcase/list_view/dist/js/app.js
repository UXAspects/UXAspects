angular.module('app', ['ux-aspects']).run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});
angular.module('app')
  .config(["$stateProvider", "$urlRouterProvider","$breadcrumbProvider",
    function ($stateProvider, $urlRouterProvider,$breadcrumbProvider) {
      
      //allow abstract states in breadcrumb
      $breadcrumbProvider.setOptions({
        includeAbstract: true
      });
      
      $urlRouterProvider.otherwise("/listview/listview1");
      $stateProvider
        .state('listview', {
          abstract: 'true',
          url: '/listview',
          template: "<ui-view autoscroll=\"false\" />",
          ncyBreadcrumb: {
            label: 'List Views',
          }
        })
        .state('listview.listview1', {
          url: '/listview1',
          templateUrl: "app/views/listViews/listView1.html",
          controller: 'ListViewCtrl as vm',
          ncyBreadcrumb: {
            label: "List View 1"
          },
          data: {
            pageTitle: 'List View 1'
          }
        })
        .state('listview.listview2', {
          url: '/listview2',
          templateUrl: "app/views/listViews/listView2.html",
          controller: 'ListViewCtrl as vm',
          ncyBreadcrumb: {
            label: "List View 2"
          },
          data: {
            pageTitle: 'List View 2'
          }
        })
        .state('detailview', {
          url: '/detailview',
          templateUrl: "app/views/detailView/detailView.html",
          ncyBreadcrumb: {
            label: "Detail View"
          },
          data: {
            pageTitle: 'Detail View'
          }
        });
    }]);
(function() {
  angular.module("app").controller("PageHeaderCtrl", PageHeaderCtrl);


  PageHeaderCtrl.$inject = ['$scope', '$rootScope', '$state', '$staticTooltip'];

  function PageHeaderCtrl($scope, $rootScope, $state, $staticTooltip) {
    var vm = this;

    vm.sourceUrl = document.referrer;

    vm.currentState = null;
    vm.previousState = null;
    vm.topSearchExpanded = false;
    vm.versionName = "Elements Angular Version";

    // when route changes check if we should show back button or not
    $rootScope.$on('$viewContentLoaded', function() {

      // get the name of the current state
      vm.currentState = $state.current.name;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      vm.previousState = fromState.name;
    });

    vm.expandTopSearch = function(value) {
      vm.topSearchExpanded = value;
    };

    vm.sortHelpCenter = function(prev, next) {
      if(prev.title > next.title) {
         return 1;
      } else if(prev.title < next.title ) {
        return -1;
      } else {
        return 0;
      }
    };

    vm.goBack = function() {

      if (vm.currentState === 'detailview' && vm.previousState) {
        // if current state is detail view then go back to list view
        $state.go(vm.previousState);
      } else {
        // otherwise go back to the showcase page
        window.location.href = vm.sourceUrl;
      }
    };

    vm.tooltipsVisible = false;

    vm.toggleTooltips = function() {
      //find the static tooltips, if there are none show if there are some hide 
      if(document.querySelector(".static-tooltip")){
        $staticTooltip.hideAllTooltips(); 
      } else {
        $staticTooltip.showAllTooltips();
      }  
    };

    $scope.$watch(function() {
      return $staticTooltip.tooltipsVisible();
    }, function(nv) {
      vm.tooltipsVisible = nv;
    });

  }

})();
(function() {
  angular.module("app").controller("ListViewCtrl", ListViewCtrl);
  angular.module("app").filter("min", min);

  ListViewCtrl.$inject = ["$scope", "$state", "$timeout", "exampleDataService", "$rootScope", "multipleSelectProvider", "$modal", "$pdf", "$staticTooltip"];

  function ListViewCtrl($scope, $state, $timeout, exampleDataService, $rootScope, multipleSelectProvider, $modal, $pdf, $staticTooltip) {
    var vm = this;

    /*
      Controller Properties
    */
    vm.ei = {
      skip: 3,
      offset: 0
    };

    vm.rootScope = $rootScope;
    vm.timeout = $timeout;

    vm.filterSearchExpanded = false;

    vm.service = exampleDataService;
    vm.multiprovider = multipleSelectProvider;
    vm.$state = $state;
    vm.searchTerm = '';
    vm.searchTermInput = '';
    vm.date = '';
    vm.dateFacetOpened = false;

    vm.totalItems = vm.service.getTotal();

    vm.currentPage = 1;
    vm.pageSize = 50;
    vm.filters = [];
    vm.numOfPages = 0;

    vm.activeSorter = 'date';

    vm.orderDesc = false;

    vm.previewFile = '';
    vm.previewSet = false;
    vm.previewTitle = '';
    vm.previewSubtitle = '';
    vm.previewEmptyText = 'Select an item from the list';

    vm.selectedLayout = "grid";
    vm.activeLayout = null;

    vm.cardViewWidth = null;

    vm.scrollBarConfig = {
      autoReinitialise: true,
      enableKeyboardNavigation: true,
      verticalGutter: -10,
      autoReinitialiseDelay: 50,
      isScrollableH: false
    };

    vm.filterLongListConfig = {
      minCharacters: 3,
      maxIndividualItems: 10,
      maxDisplayableItems: 10
    };

    vm.facetLongListConfig = {
      minCharacters: 3,
      minIndividualItems: 0,
      maxIndividualItems: 10,
      maxDisplayableItems: 10
    };

    vm.hoveredDiscussion = null;

    vm.groupType = "Exact match";
    vm.groupClass = "hpe-icon hpe-list";

    vm.exactMatch = function() {
      vm.groupType = "Exact match";
      vm.groupClass = "hpe-icon hpe-list";
      vm.performGrouping();
    };
    vm.groupAttachments = function() {
      vm.groupType = "Group attachments";
      vm.groupClass = "hpe-icon hpe-mail-attachment";
      vm.performGrouping();
    };
    vm.expandAttachments = function() {
      vm.groupType = "Expand attachments";
      vm.groupClass = "hpe-icon hpe-attachment";
      vm.performGrouping();
    };
    vm.expandDiscussions = function() {
      vm.groupType = "Expand discussions";
      vm.groupClass = "hpe-icon hpe-chat";
      vm.performGrouping();
    };
    vm.expandAll = function() {
      vm.groupType = "Expand all";
      vm.groupClass = "hpe-icon hpe-chat-attachment";
      vm.performGrouping();
    };

    vm.notExactMatch = function() {
      if (vm.groupType === "Exact match")
        return false;
      else
        return true;
    };

    vm.performGrouping = function() {
      var filters = filters || [];
      vm.filters.forEach(function(filterListToBeOred) {
        if (filterListToBeOred.length > 0) {
          filters.push(function(data) {
            return filterListToBeOred.some(function(filter) {
              return filter(data);
            });
          });
        }
      });

      loadPage();
      vm.updateCounts();
      vm.updateSelectCounts();
      vm.totalItems = vm.service.getTotalWithFilters(filters, vm.groupType);
    };


    // stores the column value
    var columnKeys = {
      name: 'document',
      author: 'name',
      datemodified: 'dateString',
      'workcompleted (%)': 'storage',
      status: 'active',
      documentid: 'id',
      location: 'location',
      timemodified: 'modified'
    };

    vm.downloadPdf = function() {
      // form all the required columns 
      var columns = [];
      for (var i = 0; i < vm.visibleColumns.length; i++) {
        columns.push({
          title: vm.visibleColumns[i].name,
          value: vm.visibleColumns[i].name.toLowerCase().replace(' ', ''),
          width: '*'
        });
      }

      // filter out the icon column as it shouldn't be shown
      columns = columns.filter(function(data) {
        return data.value !== 'icon';
      });
      
      var filters = filters || [];
      vm.filters.forEach(function(filterListToBeOred) {
        if (filterListToBeOred.length > 0) {
          filters.push(function(data) {
            return filterListToBeOred.some(function(filter) {
              return filter(data);
            });
          });
        }
      });

      var allItems = vm.service.getPage(0, vm.pageSize, filters, vm.activeSorter, vm.orderDesc, vm.groupType, null, true);

      // form the corresponding rows depending on the columns
      var rows = [];
      for (var j = 0; j < allItems.length; j++) {
        var item = {};
        for (var k = 0; k < columns.length; k++) {
          if (columns[k].value === 'status')
            item[columns[k].value] = allItems[j][columnKeys[columns[k].value]] ? 'Active' : 'Inactive';
          else
            item[columns[k].value] = allItems[j][columnKeys[columns[k].value]] !== undefined ? allItems[j][columnKeys[columns[k].value]] : '';
        }
        rows.push(item);
      }

      // create the pdf and download it
      var tablePdf = $pdf.createTable(columns, rows, {});
      tablePdf.download('tableData.pdf');
    };


    // get the toolbar element
    var toolbar = document.querySelector('.affix-toolbar');

    // create a mutation observer to watch for any changes to the class list
    var observer = new MutationObserver(updateTooltipPosition);
    
    // begin watching the class list
    observer.observe(toolbar, { attributes: true });
    
    // set initial position
    updateTooltipPosition();

    function updateTooltipPosition() {
      vm.tooltipPosition = toolbar.classList.contains('affix') ? 'bottom' : 'top';

      // run a digest if required
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    }

    vm.columns = [{
      sorterHeader: '',
      sortable: false,
      fixedClass: "table-col-icon",
      name: 'Icon',
      locked: true,
      visible: true,
      order: 0,
      classes: 'table-col-icon'
    }, {
      sorterHeader: 'NAME',
      sortable: true,
      sort: "document",
      fixedClass: "table-col-md",
      name: 'Name',
      locked: true,
      visible: true,
      order: 1,
      classes: 'listview-text-emphasis table-col-md'
    }, {
      sorterHeader: 'AUTHOR',
      sortable: true,
      sort: "name",
      fixedClass: "table-col-md",
      name: 'Author',
      locked: false,
      visible: true,
      order: 2,
      classes: 'table-col-md'
    }, {
      sorterHeader: 'DATE MODIFIED',
      sortable: true,
      sort: "date",
      fixedClass: "table-col-md",
      name: 'Date Modified',
      locked: false,
      visible: true,
      order: 3,
      classes: 'table-col-md'
    }, {
      sorterHeader: 'WORK COMPLETED (%)',
      sortable: false,
      name: 'Work Completed (%)',
      locked: false,
      visible: true,
      order: 4,
      classes: 'spark-chart-col-width2'
    }, {
      sorterHeader: 'STATUS',
      sortable: false,
      center: true,
      name: 'Status',
      locked: false,
      visible: true,
      order: 5,
      classes: 'text-center item-actions'
    }, {
      sorterHeader: 'DOCUMENT ID',
      sortable: false,
      name: 'Document ID',
      locked: false,
      visible: false,
      order: 6,
      classes: 'table-col-md'
    }, {
      sorterHeader: 'LOCATION',
      sortable: false,
      name: 'Location',
      locked: false,
      visible: false,
      order: 7,
      classes: 'table-col-md'
    }, {
      sorterHeader: 'TIME MODIFIED',
      sortable: false,
      name: 'Time Modified',
      locked: false,
      visible: false,
      order: 8,
      classes: 'table-col-md'
    }];

    vm.visibleColumns = getColumns();


    // properties for date selection
    var oneWeekAgo = new Date(vm.service.todayValue);
    var oneMonthAgo = new Date(vm.service.todayValue);
    var oneYearAgo = new Date(vm.service.todayValue);

    // set the dates to the correct offsets
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 28);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // functions for filters
    var lastWeekFilter = function(data) {
      return data.date >= oneWeekAgo;
    };

    var lastMonthFilter = function(data) {
      return data.date >= oneMonthAgo;
    };
    var lastYearFilter = function(data) {
      return data.date >= oneYearAgo;
    };
    var getMyItems = function(data) {
      return data.name === "Ian Raine";
    };
    var getActive = function(data) {
      return data.active === true;
    };
    var getInactive = function(data) {
      return data.active === false;
    };
    var getAll = function() {
      return true;
    };
    var getToday = function(data) {
      return data.date === vm.service.todayValue;
    };

    var selectedDateFilter = function(data) {
      if (vm.compareDate === "") return true;
      return data.date.getDate().toString() + data.date.getMonth().toString() + data.date.getFullYear().toString() === vm.compareDate;
    };

    var customFilters = [];
    var currentDate = "";

    var applyCustomFilter = function() {
      vm.filters.push(customFilters);
      vm.updateCounts();
      vm.updateSelectCounts();

      loadPage();
    };

    vm.facetContainerObject = {};

    // populate facets and filters
    vm.facets = getFacets();
    vm.dropdownFilters = getDropdownFilters();
    vm.sorters = getSorters();
    vm.gridColumnHeader = getGridColumnHeaders();

    // load initial page
    loadPage([], true);

    vm.resizeInterval = setInterval(function() {
      if (vm.selectedLayout === "card") {
        var cardContainers = document.getElementsByClassName('card-view');

        //if no container found then stop here
        if (cardContainers.length === 0) return;

        //otherwise get the container
        var container = cardContainers[0];

        //get container width
        var containerWidth = container.offsetWidth;

        //if the containe has resized then we need to recalculate the number of cards to display
        if (containerWidth !== vm.cardViewWidth) calculateCardCount();
      }
    }, 200);

    //ensure we stop the interval when it isnt needed
    $scope.$on('$destroy', function() {
      clearInterval(vm.resizeInterval);
    });

    vm.chooseColumns = function() {
      $staticTooltip.hideAllTooltips();
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'app/views/listViews/modal/columnModal.html',
        controller: 'ChooseModalCtrl',
        controllerAs: 'vm',
        keyboard: 'true',
        windowClass: 'square-modal-window column-chooser-modal',
        resolve: {
          availableColumns: function() {
            return vm.columns;
          }
        }
      });

      modalInstance.result.then(function(columns) {

        // store the new columns array
        vm.columns = columns;

        // // update the ui
        vm.visibleColumns = getColumns();
      });
    };

    vm.clearAllFn = function() {
      return 0;
    };

    vm.dateFacetOpen = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.dateFacetOpened = true;
      vm.prevdate = vm.date;
    };
    vm.dateFacetOpenKey = function($event) {
      if ($event.which === 13) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.dateFacetOpened = true;
        vm.prevdate = vm.date;
      }
    };

    vm.change = function() {
      var customdate = new Date(vm.date);
      if (isNaN(customdate)) {
        vm.date = new Date();
      } else if (vm.date !== vm.prevdate) {
        vm.date = new Date(vm.date);
        vm.prevdate = vm.date;
      }
    };

    vm.dateFacetDeselect = function() {
      //Store the current date, and select with this date.
      currentDate = vm.date;
      //make this empty to clear the date field
      vm.date = "";

      customFilters.splice(0, 1);
      vm.filters.push(customFilters);
      applyCustomFilter();
    };

    vm.dateFacetSelect = function() {

      vm.compareDate = vm.date !== "" ? vm.date.getDate().toString() + vm.date.getMonth().toString() + vm.date.getFullYear().toString() : "";

      customFilters.push(selectedDateFilter);
      applyCustomFilter();
    };

    vm.dateFacetDisplayFn = function() {

      vm.date = currentDate;

      if (vm.date !== "") {
        return vm.date.getDate().toString() + " - " + (vm.date.getMonth() + 1).toString() + " - " + vm.date.getFullYear().toString();
      }
    };

    //store on rootScope so we can come back from item detail to the same view
    if (!vm.rootScope.layout) vm.rootScope.layout = "grid";

    $scope.$watch('vm.previewSet', function(nv, ov) {
      if (nv === ov) return;

      updateCardDisplay();
    });

    $scope.$watch('vm.rootScope.layout', function(nv, ov) {
      if (nv === ov) return;

      vm.selectedLayout = nv;
      updateCardDisplay();
    });


    vm.childScope = $scope;
    vm.childScope.show = false;

    vm.service.panel.forEach(function(val) {
      val.scope = $scope;
    });

    vm.apply = function(item) {
      $scope.document = item.document;
      $scope.name = item.name;
      $scope.dateString = item.dateString;
      $scope.storage = item.storage;
    };

    //generate lots of names
    var names = getRandomNameList(80);

    //create name filters
    for (var i = 0; i < names.length; i++) {
      var fn = createFilterFunction(names[i]);
      vm.dropdownFilters[0].options.push({
        name: names[i],
        filtername: fn,
        deselect: [fn],
        default: false
      });
    }

    function createFilterFunction(str) {
      return function(data) {
        return data.name === str;
      };
    }

    generateFacetObjects();
    generateFilters();
    applyGridColumnSorter();

    function updateSparkline(item) {
      vm.sparklabel = {
        percentComplete: item.storage,
        inlineLabel: "<span class='spark-label'><span class='x-large'>" + Math.round(item.storage) + "%</span></span>",
        topLeftLabel: "<span class='spark-label-1'>Work completed (%)</span>",
        tooltip: "Spark Line Indicator - " + parseFloat((item.storage / 100) * 8.2).toFixed(2) + "GB of 8.2GB occupied (" + item.storage + "%)",
        type: "spark-chart5"
      };
    }

    function getColumns() {
      // return all visible columns sorter by order property
      return vm.columns.filter(function(column) {
        return column.visible;
      }).sort(function(column1, column2) {
        if (column1.order < column2.order) return -1;
        if (column1.order > column2.order) return 1;
        return 0;
      });
    }

    vm.loadNewPage = function() {
      loadPage([], true);
    };

    vm.primaryHoverAction = function() {};

    vm.secondaryHoverAction = function() {};

    vm.select = function() {
      vm.updateSelectCounts();
    };

    vm.deselect = function() {
      vm.updateSelectCounts();
    };

    vm.multiplePrimary = function() {};

    vm.keyFn = function(item) {
      return item.id;
    };

    vm.clearSelection = function() {
      vm.multiprovider.cancel();
    };

    vm.longListCallback = function(textInput, optionList) {
      return optionList;
    };

    // returns the dropdown filters used in all List View
    function getDropdownFilters() {
      vm.dropdownFilters = [];
      vm.dropdownFilters.push({
        title: "Author",
        options: [{
          name: "Author",
          filtername: getAll,
          deselect: [getMyItems],
          default: true
        }]
      }, {
        title: "Date modified",
        options: [{
          name: "Date modified",
          filtername: getAll,
          deselect: [getToday, lastWeekFilter, lastMonthFilter],
          default: true
        }, {
          name: "Today",
          filtername: getToday,
          deselect: [getAll, getToday, lastMonthFilter],
          default: false
        }, {
          name: "Last week",
          filtername: lastWeekFilter,
          deselect: [getAll, getToday, lastMonthFilter],
          default: false
        }, {
          name: "Last month",
          filtername: lastMonthFilter,
          deselect: [getAll, getToday, lastWeekFilter],
          default: false
        }]
      }, {
        title: "Status",
        options: [{
          name: "Status",
          filtername: getAll,
          deselect: [getActive, getInactive],
          default: true
        }, {
          name: "Active",
          filtername: getActive,
          deselect: [getAll, getInactive],
          default: false
        }, {
          name: "Inactive",
          filtername: getInactive,
          deselect: [getAll, getActive],
          default: false
        }]
      });

      return vm.dropdownFilters;
    }

    // returns the facets used in all List Views
    function getFacets() {
      vm.facets = [];
      vm.facets.push({
        title: "DATE MODIFIED",
        options: [{
            name: "Today",
            filter: function(data) {
              return data.date === vm.service.todayValue;
            }
          }, {
            name: "Last Week",
            filter: lastWeekFilter
          }, {
            name: "Last Month",
            filter: lastMonthFilter
          }, {
            name: "Last Year",
            filter: lastYearFilter
          }

        ]
      });
      var usersFacet = {
        title: "AUTHOR",
        options: vm.service.users.sort().map(function(user) {
          return {
            name: user,
            filter: function(data) {
              return data.name === user;
            }
          };
        })
      };
      var extFacet = {
        title: "FILE TYPES",
        options: vm.service.extensions.sort().map(function(ext) {
          return {
            name: ext,
            filter: function(data) {
              return data.document.indexOf(ext, data.document.length - ext.length) !== -1;
            }
          };
        })
      };

      vm.facets.push(extFacet);
      vm.facets.push(usersFacet);

      return vm.facets;
    }

    // returns the sorter used in List View 2
    function getSorters() {
      vm.sorters = [];
      vm.sorters = {
        title: "Sort by ",
        options: [{
          name: "Name",
          sort: "document",
          default: false
        }, {
          name: "Author",
          sort: "name",
          default: false
        }, {
          name: "Date modified (earliest)",
          sort: "date",
          default: true
        }, {
          name: "Date modified (latest)",
          sort: "date",
          orderDesc: true,
          default: false
        }]
      };

      return vm.sorters;
    }

    // returns grid column header for List View 1 and 3
    function getGridColumnHeaders() {
      return {
        headers: [{
            sorterHeader: "",
            sortable: false,
            fixedClass: "table-col-icon"
          }, {
            sorterHeader: "NAME",
            sortable: true,
            sort: "document",
            fixedClass: "table-col-md"
          }, {
            sorterHeader: "AUTHOR",
            sortable: true,
            sort: "name",
            fixedClass: "table-col-md"
          }, {
            sorterHeader: "DATE MODIFIED",
            sortable: true,
            sort: "date",
            fixedClass: "table-col-md"
          }, {
            sorterHeader: "WORK COMPLETED (%)",
            sortable: false
          }, {
            sorterHeader: "STATUS",
            sortable: false,
            center: true
          }

        ]
      };
    }

    // generates random names for dummy data
    function getRandomNameList(total) {

      var list = vm.service.users.sort();

      for (var i = list.length; i < total; i++) {
        list.push(chance.name());
      }

      var sorted = list.sort(function(a, b) {
        var splitA = a.split(" ");
        var splitB = b.split(" ");
        var lastA = splitA[splitA.length - 1];
        var lastB = splitB[splitB.length - 1];

        if (lastA < lastB) return -1;
        if (lastA > lastB) return 1;
        return 0;
      });

      return sorted;

    }

    // generates the facets used in all List Views
    function generateFacetObjects() {
      vm.facets.forEach(function(facet) {
        var filtersInThisType = [];
        vm.filters.push(filtersInThisType);
        facet.options.forEach(function(option) {
          option.filtersInThisType = filtersInThisType;
          option.select = function() {
            filtersInThisType.push(option.filter);
            vm.filters.push(filtersInThisType);
            vm.updateCounts();
            vm.updateSelectCounts();
            loadPage();
            calculateCardCount();
          };

          option.deselect = function() {
            filtersInThisType.splice(filtersInThisType.indexOf(option.filter), 1);
            vm.filters.push(filtersInThisType);
            vm.updateCounts();
            vm.updateSelectCounts();
            loadPage();
            calculateCardCount();
          };

          option.count = getCount(option);

        });
      });
    }

    // generates the filters used in all List Views
    function generateFilters() {
      vm.dropdownFilters.forEach(function(filter) {
        var filtersUsed = [];
        filter.options.forEach(function(option) {
          option.filtersUsed = filtersUsed;
          option.select = function() {
            var deselectFilter = [];
            option.deselect.forEach(function(val) {
              deselectFilter.push(val);
              filtersUsed.splice(filtersUsed.indexOf(deselectFilter), 1);
            });
            filtersUsed.push(option.filtername);
            vm.filters.push(filtersUsed);
            vm.updateCounts();
            vm.updateSelectCounts();
            loadPage();
            calculateCardCount();
          };
        });
      });

      var searchFilter = function(data) {
        //if there is no search term specified then everything is valid
        if (!vm.searchTerm || vm.searchTerm.trim().length === 0) return true;
        return (data.name.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1 || data.document.toLowerCase().indexOf(vm.searchTerm.toLowerCase()) !== -1);
      };

      //add search filter
      vm.filters.push([searchFilter]);
    }

    // applies the sorter
    function applyGridColumnSorter() {
      vm.sorters.options.forEach(function(option) {
        option.select = function(sorter) {
          vm.activeSorter = sorter.sort;
          vm.orderDesc = sorter.orderDesc;
          loadPage();
        };
      });

      vm.gridColumnHeader.headers.forEach(function(headers) {
        headers.select = function(activeSorter, orderDesc) {
          vm.activeSorter = activeSorter;
          vm.orderDesc = orderDesc;
          loadPage();
        };
      });

      vm.visibleColumns.forEach(function(headers) {
        headers.select = function(activeSorter, orderDesc) {
          vm.activeSorter = activeSorter;
          vm.orderDesc = orderDesc;
          loadPage();
        };
      });

    }


    // filters results based on search string, used in all List Views
    vm.textFilter = function(searchTerm) {
      vm.searchTerm = searchTerm;
      vm.searchTermInput = searchTerm;
      vm.updateCounts();
      vm.updateSelectCounts();
      loadPage();
      calculateCardCount();
    };

    vm.searchBoxKeyPress = function(e) {
      if (e.keyCode === 13) {
        vm.textFilter(vm.searchTermInput);
      }
    };

    vm.searchBoxBlur = function() {
      vm.searchTermInput = vm.searchTerm;
    };

    vm.updateCounts = function() {
      vm.facets.forEach(function(facet) {
        facet.options.forEach(function(option) {
          option.count = getCount(option);
        });
      });
    };

    function getCount(option) {
      //sort out filters
      var filters = [];
      vm.filters.forEach(function(filterListToBeOred) {
        if (filterListToBeOred.length > 0 && filterListToBeOred !== option.filtersInThisType) {
          filters.push(function(data) {
            return filterListToBeOred.some(function(filter) {
              return filter(data);
            });
          });
        }
      });
      return vm.service.getTotalWithFilters(filters.concat([option.filter]), vm.groupType);
    }

    vm.updateSelectCounts = function() {
      vm.count = 0;
      //sort out filters
      var filters = filters || [];
      vm.filters.forEach(function(filterListToBeOred) {
        if (filterListToBeOred.length > 0) {
          filters.push(function(data) {
            return filterListToBeOred.some(function(filter) {
              return filter(data);
            });
          });
        }
      });

      vm.items = vm.service.getPage(vm.currentPage - 1, vm.pageSize, filters, vm.activeSorter, vm.orderDesc, vm.groupType);

      for (var i = 0; i < vm.items.length; i++) {

        if (vm.multiprovider.isSelected(vm.items[i])) {
          vm.count = vm.count + 1;
        }

      }
      if (vm.multiprovider.state.selectAllMode === false)
        vm.multiprovider.state.count = vm.count;
    };

    // loads the appropriate page of results. Used in all List Views
    function loadPage(filters, newPage) {
      vm.count = 0;
      //sort out filters
      filters = filters || [];
      vm.filters.forEach(function(filterListToBeOred) {
        if (filterListToBeOred.length > 0) {
          filters.push(function(data) {
            return filterListToBeOred.some(function(filter) {
              return filter(data);
            });
          });
        }
      });
      if (!newPage) {
        vm.currentPage = 1;
      }
      vm.items = vm.service.getPage(vm.currentPage - 1, vm.pageSize, filters, vm.activeSorter, vm.orderDesc, vm.groupType);


      for (var i = 0; i < vm.items.length; i++) {
        if (vm.multiprovider.isSelected(vm.items[i])) {
          vm.count = vm.count + 1;
        }
      }

      if (vm.multiprovider.state.selectAllMode === false) {
        vm.multiprovider.state.count = vm.count;
      }

      vm.totalItems = vm.service.getTotalWithFilters(filters, vm.groupType);
    }

    function calculateCardCount() {
      $timeout(function() {
        var cardContainers = document.getElementsByClassName('card-view');

        //if no container found then all we can do is set it to 50
        if (cardContainers.length === 0 || vm.selectedLayout !== "card") {
          vm.pageSize = 50;
          return;
        }

        //otherwise get the container
        var container = cardContainers[0];

        //get container width
        var containerWidth = container.offsetWidth;

        //store width
        vm.cardViewWidth = containerWidth;

        //get cards from list
        var cards = container.getElementsByClassName('card');

        //if we have no cards - set to 50
        if (cards.length === 0 || vm.totalItems < 50) {
          vm.pageSize = 50;
          return;
        }

        //get a card
        var card = cards[0];

        //use jquery because its not straight forward to get the margin included in the width otherwise
        var cardWidth = $(card).outerWidth(true);

        var cardsPerRow = Math.floor(containerWidth / cardWidth);

        if (cardsPerRow <= 0) {
          vm.pageSize = 50;
          return;
        }

        //calulate number of extra cards
        var overflowCards = 50 % cardsPerRow;

        //set number of cards per page
        vm.pageSize = 50 - overflowCards;

        //load page
        vm.loadNewPage();

      });
    }

    vm.loadNewPage = function() {
      loadPage([], true);
    };

    function updateCardDisplay() {
      if (vm.previewSet && vm.selectedLayout === "grid") {
        vm.selectedLayout = "stack";
      } else if (!vm.previewSet && vm.selectedLayout === "stack") {
        vm.selectedLayout = "grid";
      } else if (vm.previewSet && vm.selectedLayout === "card") {
        vm.selectedLayout = "cardStack";
      } else if (!vm.previewSet && vm.selectedLayout === "cardStack") {
        vm.selectedLayout = "card";
      }

      if (vm.selectedLayout === "card") {
        calculateCardCount();
      } else {
        //reset page count
        vm.pageSize = 50;

        //make sure we are not on an invalid page
        if (vm.numOfPages !== 0 && vm.currentPage > 0 && ((vm.currentPage - 1) * vm.pageSize) >= vm.totalItems) vm.currentPage--;

        //ensure page is not equal to 0
        if (vm.currentPage === 0) vm.currentPage = 1;

        //ensure the correct number of items are loaded
        vm.loadNewPage();
      }
    }

    // when item i clicked go to the details page. Used in all List Views
    vm.goToDetails = function(itemIndex) {
      vm.childScope.author = vm.items[itemIndex].name;
      vm.childScope.title = vm.items[itemIndex].title;
      vm.childScope.sparklabel = updateSparkline(vm.items[itemIndex]);

      if (vm.previewSet) {

        vm.previewTitle = vm.items[itemIndex].document;
        vm.previewSubtitle = vm.items[itemIndex].dateString;

        if (vm.items[itemIndex].extension === ".html") {
          vm.previewFile = 'documents/Preview.html';
        } else if (vm.items[itemIndex].extension === ".pdf") {
          vm.previewFile = 'documents/PreviewPDF.html';
        } else if (vm.items[itemIndex].extension === ".doc") {
          vm.previewFile = 'documents/PreviewDOC.html';
        } else if (vm.items[itemIndex].extension === ".xls") {
          vm.previewFile = 'documents/PreviewXLS.html';
        } else if (vm.items[itemIndex].extension === ".ppt") {
          vm.previewFile = 'documents/PreviewPPT.html';
        }
      } else {
        vm.$state.go('detailview');
      }
    };

    vm.expandFilter = function(value) {

      vm.filterSearchExpanded = value;

      //if the filter textbox has contracted then reset the search text
      if (value === false) {
        //as this is a shared controller - we need to check which page we are on
        var inputExpandsList1 = document.getElementsByName('list-view-1-search');
        var inputExpandsList2 = document.getElementsByName('list-view-2-search');

        //ensure input expand was found - if we are on list view 1
        if (inputExpandsList1 && inputExpandsList1.length !== 0) {
          //reset the text of the found filter textbox to the search term
          inputExpandsList1[0].value = vm.searchTerm ? vm.searchTerm : '';
        } else if (inputExpandsList2 && inputExpandsList2.length !== 0) {
          //reset the text of the found filter textbox to the search term
          inputExpandsList2[0].value = vm.searchTerm ? vm.searchTerm : '';
        }
      }
    };

    // Static Tooltips
    vm.additionalActionsTooltip = {
      content: 'More actions',
      direction: 'up',
      position: 'middle',
      offsetX: 1,
      offsetY: 2,
      tooltipClass: 'custom-tooltip',
      hidden: true,
      tooltipId: 'st-additional'
    };

    vm.controlsTooltip = {
      content: 'Filter the items shown in the table',
      direction: 'up',
      position: 'middle',
      offsetX: 84,
      offsetY: 10,
      tooltipClass: 'custom-tooltip',
      hidden: true,
      tooltipId: 'st-controls'
    };

    vm.columnsTooltip = {
      content: 'Add or remove columns in the table',
      direction: 'up',
      position: 'end',
      offsetX: 3,
      offsetY: 4,
      tooltipClass: 'custom-tooltip',
      closeAll: true,
      hidden: true
    };

    vm.previewTooltip = {
      content: 'Show a preview of the selected item',
      direction: 'up',
      position: 'end',
      offsetX: 3,
      offsetY: 4,
      tooltipClass: 'custom-tooltip',
      hidden: true,
      tooltipId: 'st-preview'
    };

    vm.hideAttitionalActionsTooltip = function() {
      $staticTooltip.hideTooltip(vm.additionalActionsTooltip.tooltipId);
    };
    vm.hideControlsTooltip = function() {
      $staticTooltip.hideTooltip(vm.controlsTooltip.tooltipId);
    };
    vm.hidePreviewTooltip = function() {
      $staticTooltip.hideTooltip(vm.previewTooltip.tooltipId);
    };

  }

  function min() {
    return function(input, value) {
      return Math.min(input, value);
    };
  }

})();
(function() {

    angular.module('app').controller('ChooseModalCtrl', ChooseModalCtrl);

    ChooseModalCtrl.$inject = ['$scope', '$modalInstance', 'availableColumns'];

    function ChooseModalCtrl($scope, $modalInstance, availableColumns) {
        var vm = this;

        vm.scrollConfig = {
            autoReinitialise: true,
            enableKeyboardNavigation: true
        };

        vm.limitReached = false;

        vm.columnSearch = '';

        vm.hiddenColumns = availableColumns.filter(function(column) {
            return column.visible === false;
        }).slice(0);

        vm.visibleColumns = availableColumns.filter(function(column) {
            return column.visible === true;
        }).slice(0);

        vm.selectedColumns = [];

        vm.canAddColumns = false;
        vm.canRemoveColumns = false;

        // watch for any changes to selected rows
        $scope.$watch('vm.selectedColumns', updateButtons, true);
        $scope.$watch('vm.visibleColumns', updateButtons, true);

        vm.selectRow = function(event, column) {

            // if a drag element was clicked then ignore
            if (event.target.hasAttribute('reorder-up') ||
                event.target.hasAttribute('reorder-down') ||
                event.target.hasAttribute('reorder-drag')) {
                return;
            }

            // if column is locked then dont selected
            if (column.locked) return;

            column.selected = !column.selected;
        };

        vm.addColumns = function() {

            vm.selectedColumns.forEach(function(column) {

                // find index in visible columns array
                var index = vm.hiddenColumns.indexOf(column);

                // remove that item from the array
                var item = vm.hiddenColumns.splice(index, 1)[0];

                // add item to visible column array
                vm.visibleColumns.push(item);
            });

            // clear all selected items
            vm.selectedColumns = [];
        };

        vm.removeColumns = function() {
            // get the selected columns
            var columns = vm.visibleColumns.filter(function(column) {
                return column.selected;
            });

            // iterate and move
            for (var idx = 0; idx < columns.length; idx++) {

                var column = columns[idx];

                // get matching index
                var index = vm.visibleColumns.indexOf(column);

                // remove the item from visible list
                var item = vm.visibleColumns.splice(index, 1)[0];

                // deselect item
                item.selected = false;

                // push on to hidden list
                vm.hiddenColumns.push(item);
            }
        };

        vm.ok = function() {
            $modalInstance.close(generateColumnData());
        };

        vm.cancel = function() {
            $modalInstance.dismiss();
        };

        function generateColumnData() {
            var output = [];

            // store visible columns first
            vm.visibleColumns.forEach(function(column, index) {
                column.order = index;
                column.visible = true;

                output.push(column);
            });

            // then store hidden columns
            vm.hiddenColumns.forEach(function(column, index) {
                column.order = vm.visibleColumns.length + index;
                column.visible = false;

                output.push(column);
            });

            return output;
        }

        function updateButtons() {

            vm.canRemoveColumns = vm.visibleColumns.filter(function(column) {
                return column.selected;
            }).length > 0;

            if(vm.selectedColumns.length !== 0 && ((vm.selectedColumns.length + vm.visibleColumns.length) <= 7)) {
                vm.canAddColumns = true;
                vm.limitReached = false;
            }
            else if(vm.selectedColumns.length !== 0) {
                vm.limitReached = true;
                vm.canAddColumns = false;
            }
            else {
                vm.canAddColumns = false;
                vm.limitReached = false;
            }
        }
    }

})();
(function() {

  angular.module("app").service("exampleDataService", exampleDataService);

  exampleDataService.$inject = ['$state', '$rootScope'];

  function exampleDataService($state, $rootScope) {

    var count = 250;

    //names
    var names = [];
    for(var i = 0; i < 20; i++){
      names.push(chance.name());
    }
    names.sort();

    //creates documents/attachments and given them an icon and color
    var documents = [
      { type: "HTML document", extension: ".html", icon: "html-icon", iconColor: "#000000" },
      { type: "PDF document", extension: ".pdf", icon: "pdf-icon", iconColor: "#C01E07" },
      { type: "Word document", extension: ".doc", icon: "word-icon", iconColor: "#2B5797" },
      { type: "Excel spreadsheet", extension: ".xls", icon: "excel-icon", iconColor: "#207347" },
      { type: "Powerpoint", extension: ".ppt", icon: "powerpoint-icon", iconColor: "#D04727" }
    ];

    var extensions = [".html", ".pdf", ".doc", ".xls", ".ppt"];


    var storage = ["5.25", "15.25", "25.25", "75.25", "95.25"];

    //creates a list of discussion subjects
    var emails = [
      "The Periwinkle Foundation",
      "Jackson National Life",
      "Pooling Technial Subcomittee Meeeting",
      "New Starts documents",
      "Meeting Minutes",
      "Standard of Business Conduct",
      "Compliance with FCAP",
      "Monthly Newsletters",
      "All Employee Meeting",
      "Davis Taylor decision",
      "Requested updates",
      "Issues with blogging",
      "World Mental Health Week",
      "Announcement: HPE SW",
      "Attention all developers",
      "Maintenance down time",
      "Diversity in the work place",
      "UK works council changes",
      "The Randal Project",
      "Request for LOA",
      "Potential new client",
      "Career opportunities",
      "Deadline: need this today!",
      "Password needing reset",
      "Home login setup",
      "Your password is about to expire!",
      "Policy changes",
      "Make the most out of your career",
      "Purchase Order #23301",
      "Directors meeting",
      "New positions opened up",
      "Do you even javascript?",
      "Charity Event",
      "Fund raiser",
      "QA of outstanding tickets",
      "Useful links",
      "Monthly payslip",
      "UX updates",
      "Weekly catchup",
      "Daily standup meeting",
      "Why you should be using SCRUM",
      "UX Aspects latest features",
      "New positions opened up",
      "The Gavin Chronicles",
      "Charity football event",
      "Fundraiser for charities",
      "401k pension scheme",
      "Investors daily newspaper",
      "Application for sw dev role",
      "Review process updates",
      "Useful web links",
      "Staff dinner night!", 
      "Confirmation of order",
      "Invoices pending approval",
      "Planning of sprint #121",
      "Review documents",
      "Planning of sprint #121",
      "Suggested meeting times",
      "Issues with pushing",
      "Code review",
      "Web dev courses"
    ];

    // create a list of emails that will act as attachments
    var emailsAttached = [
      "Periwinkle questions",
      "Meeting questions",
      "SBC log",
      "Decision notes"
    ];

    //dates
    var today = new Date();
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var aweekago = new Date();
    aweekago.setDate(aweekago.getDate() - 8);
    var oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 28);
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    var dates = [today, oneWeekAgo, oneMonthAgo, oneYearAgo, aweekago];

    var d1 = {
      title: "Site Detail - UX Aspects (HTML)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d2 = {
      title: "Site Detail - UX Aspects (PDF)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: 'affix-container',
      animate: true
    };

    var d3 = {
      title: "Site Detail - UX Aspects (DOC)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d4 = {
      title: "Site Detail - UX Aspects (XLS)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var d5 = {
      title: "Site Detail - UX Aspects (PPT)",
      main: "app/views/listViews/templates/displayPanel.tmpl.html",
      footer: "app/views/listViews/templates/displayPanelButtons.tmpl.html",
      modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
      top: 122,
      reference: '.affix-container',
      animate: true
    };

    var newState = $state.current.name;
    var displayPanel = [d1, d2, d3, d4, d5];
    var data = getData(count);

    //watch for page to change and generates new data
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      newState = toState.name;
      data = getData(count);
    });

    return {
      getPage: getPage,
      getTotal: getTotal,
      getTotalWithFilters: getTotalWithFilters,
      todayValue: today,
      users: names,
      extensions: extensions,
      panel: displayPanel,
      storage: storage
    };

    //function to sort the array on specified key value. If two values are found equal, they are sorted on id.
    function sortByKey(array, key, descending) {
      if (descending === true) {
        return array.sort(function(a, b) {
          var x = a[key];
          var y = b[key];
          return ((x < y) ? 1 : ((x > y) ? -1 : ((a.id < b.id) ? -1 : 1)));
        });
      }
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : ((a.id < b.id) ? -1 : 1)));
      });
    }

    function multiSortByKey(array, key, descending) {

      return array.sort(function(a, b) {
        var desc0 = 0;
        var desc1 = 0;
        var desc2 = 0;
        if (descending[0] === true) {
          desc0 = 1;
        }
        if (descending[1] === true) {
          desc1 = 2;
        }
        if (descending[2] === true) {
          desc2 = 4;
        }
        var sortCase = desc0 + desc1 + desc2;
        var x0 = a[key[0]];
        var y0 = b[key[0]];
        var x1 = a[key[1]];
        var y1 = b[key[1]];
        var x2 = a[key[2]];
        var y2 = b[key[2]];
        switch (sortCase) {
          case 0:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 1:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 2:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 3:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
          case 4:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 5:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 6:
            return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
          case 7:
            return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
        }
      });
    }

    function getData(count) {
      var result = [];
      var obj = {};

      //leave space in results for the emails that will act as attachments (showing 2 levels)
      if (newState === "listview.listview2") count -= emailsAttached.length;

      for (var i = 0; i < count; i++) {
        obj = { id: i };

        //pick name
        var name = Math.floor(Math.random() * 20);
        obj.name = names[name];

        //pick date
        var date = i % dates.length;
        if (i % 2 === 0 && i % 3 === 0) {
          date = 0;
        }
        obj.date = dates[date];
        obj.rawDateString = $.datepicker.formatDate('d M yy', obj.date);
        obj.dateString = date === 0 ? "Today" : $.datepicker.formatDate('d M yy', obj.date);

        var rnd = Math.floor(Math.random() * 5);

        if (newState === "listview.listview2") {
          //based on random 'ext', decide wheter object should be a discussion or an attachment
          if (rnd < 4) {
            //get a random discussion
            var randomEmail = Math.floor(Math.random() * emails.length);

            // if we already have the discussion in our data list, the make it a response by appending 'RE'
            var found = false;
            for (var j = 0; j < result.length; j++) {
              if (result[j].document === emails[randomEmail]) {
                found = true;
                obj.discussionId = result[j].id;
                break;
              }
            }
            obj.document = found ? "RE: " + emails[randomEmail] : emails[randomEmail];

            obj.icon = "email-icon";
            obj.iconColor = "#ccbb00";
          }
          else {
            // make object an attachment
            var ext = Math.floor(Math.random() * 5);
            obj.document = documents[ext].type + documents[ext].extension;
            obj.extension = documents[ext].extension;
            obj.icon = documents[ext].icon;
            obj.iconColor = documents[ext].iconColor;
            obj.storage = storage[ext];
          }
        }
        //if list view 1, just create data as a list of documents
        else {
          obj.document = "Document " + (i + 1) + extensions[rnd];
          obj.extension = extensions[rnd];
          obj.panel = displayPanel[rnd];
          obj.storage = storage[rnd];
        }

        //active
        obj.active = (i % 5 === 0 && i % 3 === 0) || i % 2 === 0;

        result.push(obj);
      }

      if (newState === "listview.listview2") {
        //give attachments a random discussion as its parent
        var discussions = [];
        var attachments = result.filter(function(item) {
          if (item.extension)
            return item;
          else
            discussions.push(item);
        });
        for (var k = 0; k < attachments.length; k++) {
          attachments[k].parentId = discussions[Math.floor(Math.random() * discussions.length)].id;
        }

        var getPeriwinkle = function(item) { if (item.document === "The Periwinkle Foundation") nestedObj.parentId = item.id; };
        var getMeeting = function(item) { if (item.document === "Meeting Minutes") nestedObj.parentId = item.id; };
        var getSbc = function(item) { if (item.document === "Standard of Business Conduct") nestedObj.parentId = item.id; };
        var getDecision = function(item) { if (item.document === "Davis Taylor decision") nestedObj.parentId = item.id; };

        //giving 2 levels of grouping to show it (email with an attachment that is an email)
        for (var l = 0; l < emailsAttached.length; l++) {
          var nestedObj = {};
          nestedObj.id = result.length + l;
          nestedObj.name = names[Math.floor(Math.random() * 20)];
          nestedObj.date = dates[Math.floor(Math.random() * 4) + 1];
          nestedObj.dateString = $.datepicker.formatDate('d M yy', nestedObj.date);
          nestedObj.document = emailsAttached[l];
          nestedObj.icon = "email-icon";
          nestedObj.iconColor = "#ccbb00";

          if (nestedObj.document === "Periwinkle questions") {
            discussions.filter(getPeriwinkle);
            attachments[0].parentId = nestedObj.id;
            attachments[1].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "Meeting questions") {
            discussions.filter(getMeeting);
            attachments[2].parentId = nestedObj.id;
            attachments[3].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "SBC log") {
            discussions.filter(getSbc);
            attachments[4].parentId = nestedObj.id;
            attachments[5].parentId = nestedObj.id;
          }
          else if (nestedObj.document === "Decision notes") {
            discussions.filter(getDecision);
            attachments[6].parentId = nestedObj.id;
            attachments[7].parentId = nestedObj.id;
          }

          result.push(nestedObj);
        }

      }
      
      return result;

    }


    ///pageNumber is 0 indexed
    function getPage(pageNumber, pageSize, filters, sorter, orderDesc, groupType, multi, returnAll) {
      //smallest page is 0
      if (pageNumber < 0) {
        pageNumber = 0;
      }

      if (pageSize <= 0) {
        pageSize = 20;
      }

      //reset the values used for grouping styling
      for (var i = 0; i < data.length; i++) {
        data[i].showAttachment = false;
        data[i].showDiscussion = false;
        data[i].discussionFirst = false;
        data[i].discussionLast = false;
        data[i].level = null;
        if (data[i].parentId !== undefined)
          data[i].discussionId = null;
      }

      var arrayOfData = [];
      if (multi === true) {
        arrayOfData = multiSortByKey(data, sorter, orderDesc);
      } else {
        arrayOfData = sortByKey(data, sorter, orderDesc);
      }

      //depending on the grouping type selected, call the appropriate function
      if (groupType === "Group attachments") {
        arrayOfData = groupAttachments(arrayOfData);
      }
      else if (groupType === "Expand attachments") {
        arrayOfData = expandAttachments(arrayOfData);
      }
      else if (groupType === "Expand discussions") {
        arrayOfData = expandDiscussions(arrayOfData);
      }
      else if (groupType === "Expand all") {
        arrayOfData = expandAll(arrayOfData);
      }

      if (filters && filters.length) {
        arrayOfData = filters.reduce(function(arrayOfData, filterFunc) {
          return arrayOfData.filter(filterFunc);
        }, arrayOfData);
      }

      if (groupType === "Expand discussions" || groupType === "Expand all") {
        addDiscussionStyling(arrayOfData);
      }

      var start = pageNumber * pageSize;

      if (returnAll) 
        return arrayOfData;
      else
        return arrayOfData.slice(start, start + pageSize);
    }

    function groupAttachments(arrayOfData) {
      // filter attachments out into separate array
      var attachments = [];
      arrayOfData = arrayOfData.filter(function(data) {
        if (data.parentId === undefined)
          return data;
        else
          attachments.push(data); 
      });

      showAttachments(attachments, arrayOfData);

      return arrayOfData;
    }

    function expandAttachments(arrayOfData) {
      // filters discussions out into separate array
      var discussions = arrayOfData.filter(function(item) {
        return item.parentId === undefined;
      });

      var displayArray = [];

      //find the attachments of each discussion and nested attachments
      for (var idx = 0; idx < discussions.length; idx++) {
        var currentDiscussion = discussions[idx];
        displayArray.push(currentDiscussion);
        findAttachments(currentDiscussion, arrayOfData, displayArray);
      }

      return displayArray;
    }

    function expandDiscussions(arrayOfData) {
      return getDiscussions(arrayOfData);
    }

    function expandAll(arrayOfData) {
      var discussions = getDiscussions(arrayOfData);

      var displayArray = [];
      //find the attachments of each discussion 
      for (var idx = 0; idx < discussions.length; idx++) {
        var currentDiscussion = discussions[idx];
        displayArray.push(currentDiscussion);
        findAttachments(currentDiscussion, arrayOfData, displayArray);
      }

      return displayArray;
    }

    function findAttachments(discussion, arrayOfData, displayArray, level) {
      //set the current level
      if (level === undefined) {
        level = 1;
      }
 
      //filter attachments into separate array
      var attachments = arrayOfData.filter(function(data) { return discussion.id === data.parentId; });

      // if we have attachments iterate and call this recursively to find nested attachments
      if (attachments.length > 0) {
        discussion.showAttachment = true;
        for (var idx = 0; idx < attachments.length; idx++) {
          var attachment = attachments[idx];
          //push attachment directly below its parent
          displayArray.push(attachment);

          //give attachment its discussionId and its level for styling
          attachment.discussionId = discussion.discussionId ? discussion.discussionId : discussion.id;
          attachment.level = level;

          findAttachments(attachment, arrayOfData, displayArray, level + 1);
        }
      }
    }

    function getDiscussions(arrayOfData) {
      //filter root discussions into separate array
      var rootDiscussions = arrayOfData.filter(function(item) {
          return (item.parentId === undefined && item.discussionId === undefined);
      });

      var displayArray = [];

      var filterDiscussions = function(data) { return item.id === data.discussionId; };

      //loop through all root discussions and push their linking discussions directly below it in new array called displayArray
      for (var idx = 0; idx < rootDiscussions.length; idx++) {
        var item = rootDiscussions[idx];
        var discussions = arrayOfData.filter(filterDiscussions);

        displayArray.push(item);
        displayArray.push.apply(displayArray, discussions);
      }

      //filters attachments into separate array and shows attachment icon if discussion has attachment
      var attachments = arrayOfData.filter(function(data) { return data.parentId; });
      showAttachments(attachments, displayArray);
      return displayArray;
    }

    //show attachment icon if discussion has attachment
    function showAttachments(attachments, displayArray) {
      for (var i = 0; i < displayArray.length; i++) {
        for (var j = 0; j < attachments.length; j++) {
          if (displayArray[i].id === attachments[j].parentId) {
            displayArray[i].showAttachment = true;
            break;
          }
        }
      }
    }

    // give the styling for the discussions
    function addDiscussionStyling(arrayOfData) {
      var rootDiscussions = arrayOfData.filter(function(data) {
        return data.parentId === undefined && (data.discussionId === undefined || data.discussionId === null);
      });

      var filterDiscussions = function(data) {
        return arrayOfData[i].discussionId === data.discussionId;
      };

      var styledDiscussions = [];
      for (var i = 0; i < arrayOfData.length; i++) {
        if (styledDiscussions.indexOf(arrayOfData[i].discussionId) > -1 || arrayOfData[i].discussionId === undefined || arrayOfData[i].discussionId === null) continue;

        styledDiscussions.push(arrayOfData[i].discussionId);

        var discussion = arrayOfData.filter(filterDiscussions);

        var discussionArray = [];
        for (var j = 0; j < rootDiscussions.length; j++) {
          if (rootDiscussions[j].id === discussion[0].discussionId)
            discussionArray.push(rootDiscussions[j]);
        }

        discussionArray.push.apply(discussionArray, discussion);

        if(discussionArray.length > 1) {
          discussionArray.forEach(function(data) {
            data.showDiscussion = true;
          });
          discussionArray[0].discussionFirst = true;
          discussionArray[discussionArray.length - 1].discussionLast = true;
        } else {
          discussionArray[0].showDiscussion = false;
          discussionArray[0].discussionFirst = false;
          discussionArray[0].discussionLast = false;
        }
      }
      
    }

    function getTotal() {
      return data.length;
    }

    function getTotalWithFilters(filters, groupType) {
      if (filters && filters.length) {
        var list = getList(data, groupType);
        var filterData = filters.reduce(function(previousValue, currentValue) {
          return previousValue.filter(currentValue);
        }, list);
        return filterData.length;
      }
      return count;
    }

    // generate facet counts and total items count
    function getList(filterData, groupType) {
      // count is all those which dont have a parentId (not an attachment)
      if (groupType === "Group attachments")
        return filterData.filter(function(item) { return item.parentId === undefined; });
      // count is all items
      else if (groupType === "Expand attachments") {
        var parents = filterData.filter(function(item) {
          return item.parentId === undefined;
        });

        var list = [];
        for (var idx = 0; idx < parents.length; idx++) {
          list.push(parents[idx]);
          list = findChildren(parents[idx], filterData, list);
        }

        return list;
      }
      // return list as is
      else if (groupType === undefined || groupType === "Exact match")
        return filterData;
      // return all discussions
      else {
        var rootDiscussions = filterData.filter(function(item) { return item.parentId === undefined && item.discussionId === undefined; });
        var discussions = [];
        rootDiscussions.forEach(function(item) {   
          discussions = filterData.filter(function(data) { return item.id === data.discussionId && item.parentId === undefined; });
          rootDiscussions.push.apply(rootDiscussions, discussions);
        });

        return rootDiscussions;
      }

      // find the children for each item and add to list then return it
      function findChildren(currentParent, filterData, list) {
        var children = filterData.filter(function(data) { return currentParent.id === data.parentId; });

        if (children.length) {
          list.push.apply(list, children);
          for (var i = 0; i < children.length; i++) {
            list = findChildren(children[i], filterData, list);
          }
        }
        return list;
      }
    }

  }
})();
