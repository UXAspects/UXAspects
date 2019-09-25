describe('spark charts', function () {
  var $compile, $rootScope, $scope, $sce;
  var vm = {};
  var element, element2, multiValueSpark;

  beforeEach(module('ux-aspects.colorService'));
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
      vm.redColor = "#f00";
      vm.barColors = ["#1aac60", "#fcdb1f", "#e5004c"];
      vm.topLabel = $sce.trustAsHtml("Multi-value");
      vm.tooltips = ["To Do", "In Progress", "Done"];

      var html = '<spark type="vm.type" inline-label="vm.label8" value="vm.percentComplete" fillheight="vm.fillheight" top-left-label="vm.label"></spark>';

      var html2 = '<spark type="vm.type2" value="30" fillheight="10" bottom-left-label="vm.label10" top-right-label="vm.label5" bottom-right-label="vm.label6"';
      html2 += 'track-color="vm.redColor" class="col-md-5 col-sm-5 col-xs-5"></spark>';

      var multiValueSparkHtml = '<spark bar-color="vm.barColors" value="[70, 20, 10]" fillheight="5" top-left-label="vm.topLabel" spark-tooltips="vm.tooltips" segment-click="vm.multiValueClicked(index)" class="col-md-5 col-sm-5 col-xs-5"></spark>';

      vm.multiValueClicked = function (index) {};
      spyOn(vm, 'multiValueClicked').and.callThrough();

      element = $compile(html)($scope);
      element2 = $compile(html2)($scope);
      multiValueSpark = $compile(multiValueSparkHtml)($scope);
      $scope.$digest();
    });

    describe("when the type property is set", function (){
      it("should properly be added as a class name", function() {
        expect(element.find('.spark').attr('class')).toContain(vm.type);
        expect(element2.find('.spark').attr('class')).toContain(vm.type2);
      });
    });

    describe("when the value property is set", function (){
      it("should properly set the percentage", function() {
        expect(element.find('.spark-primary > div.progress-bar').css('width')).toBe(vm.percentComplete + "%");
      });

      it("should properly set the aria-valuenow attribute", function () {
        expect(element.find('.spark-primary > div.progress-bar').attr("aria-valuenow")).toBe('35');
        expect(element2.find('.spark-secondary3 > div.progress-bar').attr("aria-valuenow")).toBe('30');
      });
    });

    describe("when all labels are informed", function (){
      it("should properly display the top left", function() {
        expect(element.find('.spark-label')[1].textContent).toBe("21.7 MB  Items  (35%)");
      });

      it("should properly display the top right", function() {
        expect(element2.find('.align-right .spark-label')[0].textContent).toBe('75.0M');
      });

      it("should properly display the bottom left", function() {
        expect(element2.find('.spark-label')[1].textContent).toBe("ITEMS ON HOLD");
      });

      it("should properly display the bottom right", function() {
        expect(element2.find('.align-right .spark-label')[1].textContent).toBe('TOTAL');
      });

      it("should properly display the inline label", function () {
        expect(element.find('.spark-label-left')[0].textContent.trim()).toBe('60%');
      });
    });

    describe("when the fillheight property is set", function (){
      it("should properly set the spark height", function () {
        expect(element.find('.spark-primary').css('height')).toBe('5px');
      });
    });

    describe("when all the colors are set", function (){
      it("should properly set the bar colors for each segment", function() {
        expect(multiValueSpark.find(".spark .progress-bar").eq(0).css("background-color")).toBe("rgb(26, 172, 96)");
        expect(multiValueSpark.find(".spark .progress-bar").eq(1).css("background-color")).toBe("rgb(252, 219, 31)");
        expect(multiValueSpark.find(".spark .progress-bar").eq(2).css("background-color")).toBe("rgb(229, 0, 76)");
      });

      it("should properly set the track color", function() {
        expect(element2.find("." + vm.type2).css("background-color")).toBe("rgb(255, 0, 0)");
      });
    });

    describe("when tooltips are set in a multi-value spark", function (){
      it("should properly set the bar tooltips for each segment", function() {
        expect(multiValueSpark.find(".spark .progress-bar").eq(0).attr("tooltip")).toBe(vm.tooltips[0]);
        expect(multiValueSpark.find(".spark .progress-bar").eq(1).attr("tooltip")).toBe(vm.tooltips[1]);
        expect(multiValueSpark.find(".spark .progress-bar").eq(2).attr("tooltip")).toBe(vm.tooltips[2]);
      });
    });

    describe("when segment click is set and clicked in a multi-value spark", function (){
      beforeEach(function () {
        multiValueSpark.find(".spark .progress-bar").eq(0).triggerHandler("click");
      });

      it("should be called when the segment is clicked", function() {
        expect(vm.multiValueClicked).toHaveBeenCalledWith({ index: 0 });
      });
    });
  });

});