describe('partition map', function() {
  var $compile, $rootScope, $scope, $timeout, $interval, $templateCache;
  var vm = {};
  var suite = {};

  beforeEach(module("ux-aspects.partitionMap"));
  beforeEach(module("ux-aspects.safeInterval"));
  beforeEach(module('ux-aspects.d3'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _$interval_, _$templateCache_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $interval = _$interval_;
    $scope = $rootScope.$new();
    $templateCache = _$templateCache_;
  }));

  describe("partition map directive", function() {

    beforeEach(function() {
      vm = {};

      vm.options = {
        edit: {
          text: 'Edit',
          image: 'assets/img/pencil.png',
          click: function() {
            //perform action when the edit option is clicked
          },
          editor: {
              enabled: true,
              finishText: 'Done',
              noGroupsText: 'No groups available',
              availableGroups: ['Custodian', 'Language', 'Data Source'],
              maxRows: 3,
              minRows: 1,
              onFinish: function() {
                  //update the chart data based on the new order
              }
          }
        },
        select: function() {
          //perform action when a segment has been clicked
        },
        maximize: {
          disableScrolling: false,
          buttonVisible: true,
          isMaximized: false,
          fillScreen: true,
          sidePanelWidth: 235,
          onToggle: function() {
            return true;
          }
        },
        popoverTemplate: '',
        popoverEnabled: true,
        valueFormatter: function(value) {
          return value;
        },
        noDataLabel: 'No data to display',
        loadingLabel: 'Loading...',
        popoverDelay: 650
      };

      vm.isLoading = false;

      vm.chartData = [{
        label: 'Home',
        image: 'assets/img/home.png',
        groupName: 'Hard Drives',
        children: [{
          label: 'Jennifer Bailey',
          groupName: 'Custodian',
          children: [{
            label: 'English',
            groupName: 'Language',
            children: [{
              label: 'Email',
              groupName: 'Data Source',
              value: 40
            }, {
              label: 'Microsoft Word',
              groupName: 'Data Source',
              value: 10
            }]
          }, {
            label: 'German',
            groupName: 'Language',
            children: [{
              label: 'Email',
              groupName: 'Data Source',
              value: 10
            }, {
              label: 'Microsoft Word',
              groupName: 'Data Source',
              value: 5
            }]
          }]
        }, {
          label: 'Stephen Sheridan',
          groupName: 'Custodian',
          children: [{
            label: 'English',
            groupName: 'Language',
            children: [{
              label: 'Email',
              groupName: 'Data Source',
              value: 15
            }, {
              label: 'Microsoft Word',
              groupName: 'Data Source',
              value: 5
            }],
          }, {
            label: 'German',
            groupName: 'Language',
            children: [{
              label: 'Email',
              groupName: 'Data Source',
              value: 10
            }, {
              label: 'Microsoft Word',
              groupName: 'Data Source',
              value: 5
            }]
          }]
        }]
      }];

      $scope.vm = vm;


      var html = '<div class="partition-map-box">' +
        ' <partition-map chart-data="vm.chartData" chart-options="vm.options" chart-loading="vm.isLoading"></partition-map>' +
        '</div>';

      if (!suite.element) {

        //load all templates
        $templateCache.put('partitionMap/template/partitionMap.html', "<div class=\"partition-map-container\" id=\"partition-box\">\n" +
          "\n" +
          "  <button aria-label=\"maximize\" class=\"btn btn-icon btn-circular button-primary btn-lg partition-expand\" ng-show=\"chart.allowMaximize && !chart.noData\" ng-class=\"{ 'maximized' : chart.isMaximized }\" type=\"button\" ng-click=\"chart.toggleMaximized()\">\n" +
          "    <div ng-class=\"{ 'partition-fullscreen-icon': !chart.isMaximized, 'partition-close-icon': chart.isMaximized }\"></span>\n" +
          "  </button>\n" +
          "\n" +
          "  <partition-editing show=\"chart.editMode\" groups=\"chart.groups\" rows=\"chart.maxRows\"></partition-editing>" +
          "\n" +
          "  <div class=\"partition-map\">\n" +
          "    <h3 class=\"no-data\" ng-show=\"chart.noData\" ng-bind=\"chart.noDataLabel\"></h3>\n" +
          "    <div class=\"loading\" ng-show=\"chart.isLoading\" ng-class=\"{ 'fade-in' : chart.isLoading }\">\n" +
          "      <div class=\"contents\">\n" +
          "        <div class=\"vertically-centered\">\n" +
          "          <h3 class=\"loading-text\" ng-bind=\"chart.loadingLabel\"></h3>\n" +
          "        </div>\n" +
          "      </div>\n" +
          "    </div>\n" +
          "  </div>\n" +
          "  <partition-popover></partition-popover>\n" +
          "\n" +
          "  <div class=\"partition-docked-popover\" style=\"display: none\">\n" +
          "    <div ng-hide=\"chart.isLoading\">\n" +
          "    <div class=\"callout\"></div>\n" +
          "    <div class=\"user-content docked\" ng-show=\"chart.popoverTemplate !== null\"></div>\n" +
          "    <div class=\"data-content\">\n" +
          "      <div scroll-config=\"{ autoReinitialise: true, enableKeyboardNavigation: true, autoReinitialiseDelay: 0, verticalGutter:-2 }\" scroll-name=\"partition-popover-scrollbar\" scroll-pane>\n" +
          "        <ul class=\"child-list\">\n" +
          "          <li class=\"child-item\" ng-repeat=\"child in $parent.chart.dockedChildList\" ng-click=\"$parent.chart.selectSegment(child)\">\n" +
          "            <div class=\"color-block\" ng-style=\"{'background-color': child.color}\"></div>\n" +
          "            <p class=\"item-key\" ng-bind=\"child.key\"></p>\n" +
          "            <p class=\"item-value pull-right text-muted\" ng-bind=\"child.formattedValue\"></p>\n" +
          "          </li>\n" +
          "        </ul>\n" +
          "      </div>\n" +
          "    </div>\n" +
          "  </div>\n" +
          "  </div>\n" +
          "\n" +
          "</div>\n" +
          "");

        $templateCache.put("partitionMap/template/popoverTemplate.html",
          "<div class=\"popover bottom partition-popover\" id=\"partition-popover\" style=\"display: none\">\n" +
          "  <div class=\"arrow\"></div>\n" +
          "  <div class=\"popover-inner\">\n" +
          "    <div class=\"popover-content\">\n" +
          "      <div class=\"popover-container\">\n" +
          "        <div class=\"user-content\" ng-class=\"{ 'full-width' : $parent.chart.childList.length === 0 }\"></div>\n" +
          "        <div class=\"data-content\" ng-style=\"{'display': $parent.chart.childList.length === 0 ? 'none' : 'block'}\">\n" +
          "          <div scroll-config=\"{ autoReinitialise: true, enableKeyboardNavigation: true, autoReinitialiseDelay: 0, verticalGutter:-2 }\" scroll-name=\"partition-popover-scrollbar\" scroll-pane>\n" +
          "            <ul class=\"child-list\">\n" +
          "              <li class=\"child-item\" ng-repeat=\"child in $parent.chart.childList\" ng-click=\"$parent.chart.selectSegment(child, 0, true)\">\n" +
          "                <div class=\"color-block\" ng-style=\"{'background-color': child.color}\"></div>\n" +
          "                <p class=\"item-key\" ng-bind=\"child.key\"></p>\n" +
          "                <p class=\"item-value pull-right text-muted\" ng-bind=\"child.formattedValue\"></p>\n" +
          "              </li>\n" +
          "            </ul>\n" +
          "          </div>\n" +
          "        </div>\n" +
          "      </div>\n" +
          "    </div>\n" +
          "  </div>\n" +
          "</div>\n" +
          "");

        $templateCache.put("partitionMap/template/editTemplate.html",
          "<div class=\"edit-container\" style=\"display: none;\">" +
          "  <div class=\"root-segment\">" +
          "    <div class=\"done-btn\" ng-click=\"editing.done()\">" +
          "      <div class=\"icon\"></div>" +
          "    </div>" +
          "    <p class=\"done-text\" ng-bind=\"chart.finishText\"></p>" +
          "  </div>" +
          " <ul class=\"segment-list\">" +
          "  </ul>" +
          "</div>");

        suite.element = $compile(html)($scope);
        $timeout.flush();
        $scope.$digest();
      }
    });

    afterAll(function() {
      //destroy our new scope
      $scope.$destroy();

      //destroy our chart scope
      var chartScope = suite.element.find(".partition-map-container").scope();
      chartScope.$destroy();

      //remove element
      suite.element.remove();
      suite = null;
    });

    it('should initiate a partition map instance', function() {
      expect(vm.chartData).toBeDefined();
      expect(vm.options).toBeDefined();
      expect(vm.isLoading).toBeDefined();
    });

    it('should have svg element', function() {
      suite.container = suite.element.find('svg');
      expect(suite.container.length).toBe(1);
    });

    it('should have a the correct amount of segments', function() {
      suite.segments = suite.container.find('g');
      expect(suite.segments.length).toBe(15);
    });

    it('should have a root segment with text and icon', function() {
      suite.rootSegment = suite.segments.first();

      var label = suite.rootSegment.find('text').first().find('tspan');
      var icon = suite.rootSegment.find('image').first();

      //text should have been ellipsed
      expect(label.text()).toBe('...');

      var iconImage = icon[0].getAttribute('href');
      expect(iconImage).toBe('assets/img/home.png');
    });

    it('should have an edit button with correct icon', function() {
      suite.editButton = suite.rootSegment.find('rect')[1];
      var icon = suite.rootSegment.find('image')[1];

      var iconImage = icon.getAttribute('href');
      expect(iconImage).toBe('assets/img/pencil.png');
    });

    it('should call function when edit clicked', function() {
      //get scope
      var scope = suite.element.scope();

      //get edit click function
      var editClick = d3.select(suite.editButton).on("click");

      //spy on user defined function
      spyOn(scope.vm.options.edit, 'click');

      //call button click which should call edit function
      editClick(d3.select(suite.rootSegment[0]).data()[0]);

      //determine if user funciton was called
      expect(scope.vm.options.edit.click).toHaveBeenCalled();
    });

    it('should show popover when hovered', function(done) {
      var partitionContainer = suite.element.children().first();
      var partitionMap = partitionContainer.children().first();

      //get scope
      var scope = partitionMap.scope();

      var segment = suite.rootSegment.find('rect').first();

      //get on hover function
      var onHover = d3.select(segment[0]).on("mouseover");

      //ensure popovers are enabled
      scope.chart.popoverEnabled = true;

      //call on hover function with root segment
      onHover(d3.select(suite.rootSegment[0]).data()[0], 0);

      var container = suite.element;

      setTimeout(function() {
        var popover = container.find('#partition-popover');
        expect(popover[0].style.display).toBe('block');
        done();
      }, 651);
    });

    it('should hide popover after delay', function(done) {
      var scope = suite.element.find(".partition-map-container").scope();

      var segment = suite.rootSegment.find('rect').first();

      //get on hover function
      var onHover = d3.select(segment[0]).on("mouseover");

      //ensure popovers are enabled
      scope.chart.popoverEnabled = true;

      //call on hover function with root segment
      onHover(d3.select(suite.rootSegment[0]).data()[0], 0);

      var container = suite.element;

      setTimeout(function() {
        var popover = container.find('#partition-popover');
        expect(popover[0].style.display).toBe('block');

        //trigger mouse move event
        var mousedownEvent = document.createEvent("MouseEvent");
        mousedownEvent.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.dispatchEvent(mousedownEvent);

        setTimeout(function() {
          expect(popover[0].style.display).toBe('none');
          done();
        }, 251);
      }, 651);
    });

it('should not update popover by broadcasting update-popover if popover is disabled', function(done) {
    var scope = suite.element.find(".partition-map-container").scope();
    suite.rootSegment = angular.element(suite.segments[2]);

    var segment = suite.rootSegment.find('rect').first();
    //get on hover function
    var onHover = d3.select(segment[0]).on("mouseover");

    //ensure popovers are enabled
    scope.chart.popoverEnabled = false;
    var popover_did_update = false;

    scope.chart.rootScope.$on('popover-update', function() {
        popover_did_update = true;
    });
    //call on hover function with root segment
    onHover(d3.select(suite.rootSegment[0]).data()[0], 0);

    setTimeout(function() {
        expect(popover_did_update).toBe(false);
        done();
    }, 651);
});

it('should update popover by broadcasting update-popover if popover is enabled', function(done) {
    var scope = suite.element.find(".partition-map-container").scope();
    suite.rootSegment = angular.element(suite.segments[2]);

    var segment = suite.rootSegment.find('rect').first();
    //get on hover function
    var onHover = d3.select(segment[0]).on("mouseover");

    //ensure popovers are enabled
    scope.chart.popoverEnabled = true;
    var popover_did_update = false;
    scope.chart.rootScope.$on('popover-update', function() {
        popover_did_update = true;

    });
    //call on hover function with root segment
    onHover(d3.select(suite.rootSegment[0]).data()[0], 0);

    setTimeout(function() {
        expect(popover_did_update).toBe(true);
        done();
    }, 651);

});

    it('should show maximize button', function() {

      var maximizeButton = suite.element.find('.partition-expand');

      //we expect there to be a button
      expect(maximizeButton.length).toBe(1);

      //we also expect it to be visible
      expect(maximizeButton[0].style.display).toBe('');
    });

    it('should maximize when maximize button is clicked button', function() {

      var scope = suite.element.find(".partition-map-container").scope();
      var maximizeButton = suite.element.find('.partition-expand');

      spyOn(scope.chart.maximizeOptions, 'onToggle').and.returnValue(true);

      //click maximize button
      maximizeButton.click();

      //determine if user funciton was called
      expect(scope.chart.maximizeOptions.onToggle).toHaveBeenCalledWith(true);
    });

    it('should minimize when maximize button is clicked again', function() {

      var scope = suite.element.find(".partition-map-container").scope();
      var minimizeButton = suite.element.find('.partition-expand');

      spyOn(scope.chart.maximizeOptions, 'onToggle').and.returnValue(true);

      //click maximize button
      minimizeButton.click();

      //determine if user funciton was called
      expect(scope.chart.maximizeOptions.onToggle).toHaveBeenCalledWith(false);
    });

    it('should not allow rows to be removed under min rows', function() {
      
      
      //get scope
      var scope = suite.element.scope();

      //get edit click function
      var editClick = d3.select(suite.editButton).on("click");

      //spy on user defined function
      spyOn(scope.vm.options.edit, 'click');

      //call button click which should call edit function
      editClick(d3.select(suite.rootSegment[0]).data()[0]);

      //determine if user funciton was called
      expect(scope.vm.options.edit.click).toHaveBeenCalled();

      expect(suite.element.find(".close-box .icon").length).toBe(3);

      var event = document.createEvent('MouseEvent');
      event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      suite.element.find(".close-box .icon").get(0).dispatchEvent(event);

      $scope.$digest();

      expect(suite.element.find(".close-box .icon").length).toBe(2);

      suite.element.find(".close-box .icon").get(0).dispatchEvent(event);

      $scope.$digest();

      expect(suite.element.find(".close-box .icon").length).toBe(0);

    

    });

  });

});
