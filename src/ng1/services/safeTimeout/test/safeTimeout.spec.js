describe('safeTimeout service', function() {
  var $rootScope, $timeout, $scope, safeTimeout, safeTimeoutInstance;

  beforeEach(module("ux-aspects.safeTimeout"));

  beforeEach(inject(function(_$rootScope_, _$timeout_, _safeTimeout_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
    safeTimeout = _safeTimeout_;
  }));

  describe("constructor", function() {
    beforeEach(function() {
      safeTimeoutInstance = safeTimeout.create($scope);
    });

    afterEach(function() {
      safeTimeoutInstance = null;
    });

    it('should return a new instance', function() {
      expect(safeTimeoutInstance.cancel).toBeDefined();
      expect(safeTimeoutInstance.timeout).toBeDefined();
      expect(Object.keys(safeTimeoutInstance).length).toBe(2);
    });

  });

  describe("timeout", function() {

    beforeEach(function() {
      safeTimeoutInstance = safeTimeout.create($scope);
    });

    afterEach(function() {
      safeTimeoutInstance = null;
    });

    it('should delay the execution of a function by the specified duration', function() {
      var testFunction = jasmine.createSpy("function should execute");
      safeTimeoutInstance.timeout(function() {
        testFunction();
      }, 1234);
      expect(testFunction).not.toHaveBeenCalled();
      $timeout.flush(1233);
      expect(testFunction).not.toHaveBeenCalled();
      $timeout.flush(1);
      expect(testFunction).toHaveBeenCalled();
    });

    it('should return a timer object', function() {
      var timer = safeTimeoutInstance.timeout(function() {});
      expect(timer).toBeDefined();
      expect(timer.$$state).toBeDefined();
      expect(timer.$$timeoutId).toBeDefined();
      expect(Object.keys(timer).length).toBe(2);
    });

    it('should only have access to its own timers in the same scope', function() {
      var testFunction1 = jasmine.createSpy();
      var timer1 = safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeTimeout.create($scope);
      var timer2 = secondInstance.timeout(function() {
        testFunction2();
      }, 10);

      //Attempt to cancel each others timers
      safeTimeoutInstance.cancel(timer2);
      secondInstance.cancel(timer1);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

      $timeout.flush(10);

      expect(testFunction1).toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();
    });

    it('should only have access to its own timers in any scope', function() {
      var $scope2 = $rootScope.$new();

      var testFunction1 = jasmine.createSpy();
      var timer1 = safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeTimeout.create($scope2);
      var timer2 = secondInstance.timeout(function() {
        testFunction2();
      }, 10);

      //Attempt to cancel each others timers
      safeTimeoutInstance.cancel(timer2);
      secondInstance.cancel(timer1);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

      $timeout.flush(10);

      expect(testFunction1).toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();
    });

    it('should cancel its timers when the $scope is destroyed', function() {
      var testFunction = jasmine.createSpy();
      safeTimeoutInstance.timeout(function() {
        testFunction();
      }, 10);

      expect(testFunction).not.toHaveBeenCalled();
      $scope.$destroy();

      $timeout.flush(10);
      expect(testFunction).not.toHaveBeenCalled();

    });

    it('should cancel other timers on the same $scope when the $scope is destroyed', function() {
      var testFunction1 = jasmine.createSpy();
      
      safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 10);

      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeTimeout.create($scope);
      
      secondInstance.timeout(function() {
        testFunction2();
      }, 10);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      $scope.$destroy();

      $timeout.flush(10);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();

    });

    it('should not cancel other timers on a different $scope when the current $scope is destroyed', function() {
      var testFunction1 = jasmine.createSpy();
      
      safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 10);

      var $scope2 = $rootScope.$new();
      var testFunction2 = jasmine.createSpy();
      var secondInstance = safeTimeout.create($scope2);
      
      secondInstance.timeout(function() {
        testFunction2();
      }, 10);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      $scope.$destroy();

      $timeout.flush(10);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();

    });

  });

  describe("cancel", function() {

    beforeEach(function() {
      safeTimeoutInstance = safeTimeout.create($scope);
    });

    afterEach(function() {
      safeTimeoutInstance = null;
    });

    it('should cancel a pending timer', function() {
      var testFunction1 = jasmine.createSpy();
      var timer1 = safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      safeTimeoutInstance.cancel(timer1);
      $timeout.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();

    });

    it('should not cancel other pending timers', function() {
      var testFunction1 = jasmine.createSpy();
      var timer1 = safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 57);

      var testFunction2 = jasmine.createSpy();
      
      safeTimeoutInstance.timeout(function() {
        testFunction2();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).not.toHaveBeenCalled();
      safeTimeoutInstance.cancel(timer1);
      $timeout.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();
      expect(testFunction2).toHaveBeenCalled();

    });

    it('should be idempotent (safe)', function() {
      var testFunction1 = jasmine.createSpy();
      var timer1 = safeTimeoutInstance.timeout(function() {
        testFunction1();
      }, 57);

      expect(testFunction1).not.toHaveBeenCalled();
      safeTimeoutInstance.cancel(timer1);
      expect(function(){
        safeTimeoutInstance.cancel(timer1);
      }).not.toThrow();
      $timeout.flush(57);
      expect(testFunction1).not.toHaveBeenCalled();
    });


  });

});