describe('spark charts', function () {
  var $compile, $rootScope, $scope, $sce;
  var vm = {};
  var element, element2;

  beforeEach(module("ux-aspects.spark"));

  beforeEach(inject(function (_$compile_, _$rootScope_, _$sce_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $sce = _$sce_;
    $scope = $rootScope.$new();
  }));

  describe("spark directive", function () {
    beforeEach(function () {
      vm = {};
      $scope.vm = vm;

      vm.percentComplete = 35;
      vm.type = "spark-primary";
      vm.label = $sce.trustAsHtml("<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>" +
        " MB  Items  (" + vm.percentComplete + "%)</span></span>");
      vm.fillheight = 5;
      vm.percentComplete1 = 55;
      vm.label1 = $sce.trustAsHtml("<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>" +
        " GB Disk Space  (" + vm.percentComplete1 + "%)</span></span>");
      vm.type2 = "spark-secondary3";
      vm.label5 = $sce.trustAsHtml("<span class='spark-label hidden-spark'><span class='medium light'>75.0M</span></span>");
      vm.label6 = $sce.trustAsHtml("<span class='spark-label hidden-xxs'><span class='medium light'>TOTAL</span></span>");
      vm.label8 = $sce.trustAsHtml("<span class='spark-label hidden-spark'><span class='x-large'>60%</span></span>");
      vm.label10 = $sce.trustAsHtml("<span class='spark-label hidden-xxxs'><span class='medium light'>ITEMS ON HOLD</span></span>");

      vm.tooltip = "Spark Line indicator - 2.17MB of 8.2GB occupied (35%)";

      var html =
        '<spark type="vm.type" inline-label="vm.label8" value="vm.percentComplete" fillheight="vm.fillheight" top-left-label="vm.label"></spark>';


      var html2 = '<spark type="vm.type2" value="30" fillheight="10" bottom-left-label="vm.label10" top-right-label="vm.label5" bottom-right-label="vm.label6"';
      html2 += 'class="col-md-5 col-sm-5 col-xs-5"></spark>';

      element = $compile(html)($scope);
      element2 = $compile(html2)($scope);
      $scope.$digest();
    });

    it('should have the progress bar filled to the correct percentage', function () {
      expect(element.find('.spark-primary > div.progress-bar').css('width')).toBe(vm.percentComplete + "%");
    });
    it('should display the spark top-left label with proper values', function () {
      expect(element.find('.spark-label')[1].textContent).toBe("21.7 MB  Items  (35%)");
    });
    it('should display the spark top-right label with proper values', function () {
      expect(element2.find('.align-right .spark-label')[0].textContent).toBe('75.0M');
    });
    it('should display the spark bottom-right label with proper values', function () {
      expect(element2.find('.align-right .spark-label')[1].textContent).toBe('TOTAL');
    });
    it('should set aria-valuenow to the value passed', function () {
      expect(element.find('.spark-primary > div.progress-bar').attr("aria-valuenow")).toBe('35');
      expect(element2.find('.spark-secondary3 > div.progress-bar').attr("aria-valuenow")).toBe('30');
    });
    it('should display the inline label properly', function () {
      expect(element.find('.spark-label-left')[0].textContent.trim()).toBe('60%');
    });
    it('should add proper height according to the value of fillheight', function () {
      expect(element.find('.spark-primary').css('height')).toBe('5px');
    });
  });

});