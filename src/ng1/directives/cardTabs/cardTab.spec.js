describe('card tab', function() {
  var $compile, $rootScope, $scope, element, $timeout;
  var vm = {};

  beforeEach(module("ux-aspects.cardTabs"));
  beforeEach(module("ux-aspects.safeTimeout"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
  }));

  describe("card tab directive", function() {

    beforeEach(function() {

      vm.cardTabs = [{
          title: 'Archive Totals',
          image: 'img1',
          value: '637 <small>GB</small>',
          subtitle: '63% licensed storage used',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus volutpat eros, in varius nibh ultrices a.'
      }, {
          title: 'Data Processed',
          image: 'img2',
          value: '1.3 <small>GB</small>',
          subtitle: 'processed this month',
          content: 'Vestibulum faucibus porttitor ligula, vitae sollicitudin tellus efficitur quis. Duis sit amet sollicitudin dui.'
      }];

      $scope.vm = vm;

      var html =  '<div>'+
                    '<cardset content-position="top">'+
                      '<card ng-repeat="tab in vm.cardTabs">'+
                        '<div class="cardTab">'+
                          '<p class="cardTitle" ng-bind="tab.title"></p>'+
                          '<div class="cardImg" ng-class="tab.image"></div>'+
                          '<p class="cardValue" ng-bind-html="tab.value"></p>'+
                          '<p class="cardSubtitle" ng-bind="tab.subtitle"></p>'+
                        '</div>'+
                        '<tab-content>'+
                          '<h4 ng-bind="tab.title"></h4>'+
                          '<p ng-bind-html="tab.content"></p>'+
                        '</tab-content>'+
                      '</card>'+
                    '</cardset>' +
                  '</div>';

      element = $compile(html)($scope);
      $scope.$digest();
      $timeout.flush();
    });

    it('should display all the card tabs', function() {
      var tabs = element.find(".cardTab");
      expect(tabs.length).toBe(2);
    });

    it('should set the first tab active', function() {
      expect(element.find("li")[0].classList.contains("active")).toBe(true);
      expect(element.find("li")[1].classList.contains("active")).toBe(false);
    });

    it('should set the active class on click', function() {
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      element.find("li")[1].dispatchEvent(e);
      $scope.$digest();
      expect(element.find("li")[0].classList.contains("active")).toBe(false);
      expect(element.find("li")[1].classList.contains("active")).toBe(true);
    });

    it('should set tab content correctly', function() {
      expect(element.find('.tab-content-container h4')[0].textContent).toBe('Archive Totals');
      var e = document.createEvent('MouseEvents');
      e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      element.find("li")[1].dispatchEvent(e);
      $scope.$digest();
      expect(element.find('.tab-content-container h4')[0].textContent).toBe('Data Processed');
    });

    it('should display the content to the top of the tabs', function() {
      expect(element.find('.tab-content-container.top')[0].childElementCount).toBe(2);
      expect(element.find('.tab-content-container.bottom')[0].childElementCount).toBe(0);
    });

    it('should display the content to the bottom of the tabs', function() {
      var html =  '<div>'+
                    '<cardset content-position="bottom">'+
                      '<card ng-repeat="tab in vm.cardTabs">'+
                        '<div class="cardTab">'+
                          '<p class="cardTitle" ng-bind="tab.title"></p>'+
                          '<div class="cardImg" ng-class="tab.image"></div>'+
                          '<p class="cardValue" ng-bind-html="tab.value"></p>'+
                          '<p class="cardSubtitle" ng-bind="tab.subtitle"></p>'+
                        '</div>'+
                        '<tab-content>'+
                          '<h4 ng-bind="tab.title"></h4>'+
                          '<p ng-bind-html="tab.content"></p>'+
                        '</tab-content>'+
                      '</card>'+
                    '</cardset>'+
                  '</div>';

      element = $compile(html)($scope);
      $scope.$digest();
      $timeout.flush();
      expect(element.find('.tab-content-container.top')[0].childElementCount).toBe(0);
      expect(element.find('.tab-content-container.bottom')[0].childElementCount).toBe(2);
    });

  });
});
