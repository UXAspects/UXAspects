describe('safeInterval service', function() {
  var $rootScope, $interval, $scope, safeInterval, safeIntervalInstance;

  beforeEach(module("ux-aspects.safeInterval"));

  beforeEach(inject(function(_$rootScope_, _$interval_, _safeInterval_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $interval = _$interval_;
    safeInterval = _safeInterval_;
  }));

  describe("constructor", function() {
    beforeEach(function() {
      safeIntervalInstance = safeInterval.create($scope);
    });

    afterEach(function() {
      safeIntervalInstance = null;
    });

    it('should return a new instance', function() {
      expect(safeIntervalInstance.cancel).toBeDefined();
      expect(safeIntervalInstance.interval).toBeDefined();
      expect(Object.keys(safeIntervalInstance).length).toBe(2);
    });

  });

  describe("interval", function() {

    beforeEach(function() {
      safeIntervalInstance = safeInterval.create($scope);
    });

    afterEach(function() {
      safeIntervalInstance = null;
    });

    it('should delay the execution of a function by the specified duration', function() {
      var testFunction = jasmine.createSpy("function should execute");
      safeIntervalInstance.interval(function() {
        testFunction();
      }, 1234);
      expect(testFunction).not.toHaveBeenCalled();
      $interval.flush(1233);
      expect(testFunction).not.toHaveBeenCalled();
      $interval.flush(1);
      expect(testFunction).toHaveBeenCalled();
    });

    it('should return an interval object', function() {
      var interval = safeIntervalInstance.interval(function() {});
      expect(interval).toBeDefined();
      expect(interval.$$state).toBeDefined();
      expect(interval.$$intervalId).toBeDefined();
      expect(Object.keys(interval).length).toBe(2);
    });

    it('should only have access to its own intervals in the same scope', function() {
      var testFunction1 = jasmine.createSpy();
      var interval1 = safeIntervalInstance.interval(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeInterval.create($scope);
      var interval2 = secondInstance.interval(function() {
        testFunction2();
      }, 10);

      //Attempt to cancel each others interval
      safeIntervalInstance.cancel(interval2);
      secondInstance.cancel(interval1);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

      $interval.flush(10);

      expect(testFunction1).toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();
    });

    it('should only have access to its own intervals in any scope', function() {
      var $scope2 = $rootScope.$new();

      var testFunction1 = jasmine.createSpy();
      var interval1 = safeIntervalInstance.interval(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeInterval.create($scope2);
      var interval2 = secondInstance.interval(function() {
        testFunction2();
      }, 10);

      //Attempt to cancel each others interval
      safeIntervalInstance.cancel(interval2);
      secondInstance.cancel(interval1);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

      $interval.flush(10);

      expect(testFunction1).toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();
    });

    it('should cancel its intervals when the $scope is destroyed', function() {
      var testFunction = jasmine.createSpy();
      safeIntervalInstance.interval(function() {
        testFunction();
      }, 10);

      expect(testFunction).not.toHaveBeenCalled();
      $scope.$destroy();

      $interval.flush(10);
      expect(testFunction).not.toHaveBeenCalled();

    });

    it('should cancel other intervals on the same $scope when the $scope is destroyed', function() {
      var testFunction1 = jasmine.createSpy();
      safeIntervalInstance.interval(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeInterval.create($scope);
      secondInstance.interval(function() {
        testFunction2();
      }, 10);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      $scope.$destroy();

      $interval.flush(10);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

    });

    it('should not cancel other intervals on a different $scope when the current $scope is destroyed', function() {
      var testFunction1 = jasmine.createSpy();
      safeIntervalInstance.interval(function() {
        testFunction1();
      }, 10);

      var $scope2 = $rootScope.$new();
      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeInterval.create($scope2);
      
      secondInstance.interval(function() {
        testFunction2();
      }, 10);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      $scope.$destroy();

      $interval.flush(10);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();

    });

  });

  describe("cancel", function() {

    beforeEach(function() {
      safeIntervalInstance = safeInterval.create($scope);
    });

    afterEach(function() {
      safeIntervalInstance = null;
    });

    it('should cancel a pending interval', function() {
      var testFunction1 = jasmine.createSpy();
      var interval1 = safeIntervalInstance.interval(function() {
        testFunction1();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      safeIntervalInstance.cancel(interval1);
      $interval.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();

    });

    it('should not cancel other pending intervals', function() {
      var testFunction1 = jasmine.createSpy();
      var interval1 = safeIntervalInstance.interval(function() {
        testFunction1();
      }, 57);

      var testFunction2 = jasmine.createSpy();
      
      safeIntervalInstance.interval(function() {
        testFunction2();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      safeIntervalInstance.cancel(interval1);
      $interval.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();

    });

    it('should be idempotent (safe)', function() {
      var testFunction1 = jasmine.createSpy();
      var interval1 = safeIntervalInstance.interval(function() {
        testFunction1();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      safeIntervalInstance.cancel(interval1);
      expect(function(){
        safeIntervalInstance.cancel(interval1);
      }).not.toThrow();
      $interval.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();
    });


  });

});
