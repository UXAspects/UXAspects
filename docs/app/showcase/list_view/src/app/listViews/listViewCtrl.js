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