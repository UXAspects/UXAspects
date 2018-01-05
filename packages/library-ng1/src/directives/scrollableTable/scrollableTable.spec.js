describe('scrollable table',function(){
  var $compile, $rootScope, $scope, $timeout;
  var element;

  beforeEach(module("scrollable-table"));
  beforeEach(module("ux-aspects.safeAnimationFrame"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
  }));

  describe("scrollable table directive", function() {
    beforeEach(function() {
      
      $scope.sampleTableData = [{
          id: 1,
          User: "Natasha"
      }, {
          id: 2,
          User: "Emma"
      }, {
          id: 3,
          User: "Peter"
      }, {
          id: 4,
          User: "Mark"
      }, {
          id: 5,
          User: "Bruce"
      }, {
          id: 6,
          User: "Rodney"
      }, {
          id: 7,
          User: "Ann"
      }];

      var html = '<div>' +
                  '<scrollable-table watch="sampleTableData" container-height="200" header-height="35">' +
                    '<table class="table table-hover">' +
                        '<thead>' +
                        '<tr>' +
                            '<th>id</th>' +
                            '<th>User</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr ng-repeat="value in sampleTableData">' +
                            '<td>{{value.id}}</td>' +
                            '<td>{{value.User}}</td>' +
                        '</tr>' +
                        '</tbody>' +
                    '</table>' +
                  '</scrollable-table>' +
                '</div>';

      var uncompiledElement = angular.element(html);

      uncompiledElement.css('display', 'none'); 
      uncompiledElement.css('width', '0px');       

      element = $compile(uncompiledElement)($scope);
      $scope.$digest();
    });

    it('should affix the header', function(done) {

      element.css('display', '');
      element.css('width', '');

      setTimeout(function() {
        $scope.$digest();
        expect(element.find(".th-inner").length).toBe(2);
        done();
      }, 100);

    });

    it('should not affix header if width is 0px', function(done) {

      element.css('display', '');

      setTimeout(function() {
        $scope.$digest();
        expect(element.find(".th-inner").length).toBe(0);
        done();
      }, 100);

    });

    it('should not affix header when element is hidden', function(done) {

      element.css('width', '');

      setTimeout(function() {
        $scope.$digest();
        expect(element.find(".th-inner").length).toBe(0);
        done();
      }, 100);

    });

  });

});
