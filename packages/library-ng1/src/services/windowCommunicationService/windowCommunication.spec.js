describe('window communication service', function() {
	var windowCommunicationService, $scope, $window, windowCommServiceMock;

	beforeEach(module("ux-aspects.windowCommunicationService"));

	beforeEach(function() {
		inject(function(_windowCommunicationService_, _$rootScope_, _$window_) {
			windowCommunicationService = _windowCommunicationService_;
			$scope = _$rootScope_.$new();
			$window = _$window_;
		});
	});

	beforeEach(function() {
		windowCommServiceMock = jasmine.createSpyObj('windowCommunicationService', ['createWindow', 'updateContent']);
		
		windowCommServiceMock.createWindow = function() {
			return { 
				closed: false,
				close: function(){
					this.closed = true;
				}
			};
		};
	});

	describe('createWindow function', function() {
		var newWindow;

		beforeEach(function() {
			newWindow = windowCommServiceMock.createWindow();
		});

		it('should return an object when the function is called', function() {
			expect(newWindow).not.toBe(null);
		});

		it('should open a new window when the function is called', function() {
			expect(newWindow.closed).toBe(false);
		});

		it('should close when window.close() is called', function() {
			newWindow.close();
			expect(newWindow.closed).toBe(true);
		});

	});

	describe('updateContent function', function() {
		var newWindow;

		beforeEach(function() {
			newWindow = windowCommServiceMock.createWindow();
			windowCommunicationService.childScope = $scope.$new();
		});

		it('should keep the current window open when the function is called', function() {
			windowCommunicationService.updateContent($scope, "test2.html");
			expect(newWindow.closed).toBe(false);
		});

		it('should keep the same window object when the function is called', function() {
			var oldWindow = newWindow;
			windowCommunicationService.updateContent($scope, "test2.html");
			expect(oldWindow).toBe(newWindow);
		});

	});

});