describe('preview pane directive', function () {
  var $compile, $controller, $scope, controller, provider, windowCommunicationService, $window, windowMock;

  beforeEach(module("ux-aspects.previewPanes"));
  beforeEach(module('ux-aspects.windowCommunicationService'));

  beforeEach(function () {
    windowMock = jasmine.createSpyObj('$window', ['open', 'close']);

    module(function ($provide) {
      $provide.value("$window", windowMock);
    });
  });

  beforeEach(inject(function (_$compile_, _$controller_, _$rootScope_, _previewPaneProvider_, _windowCommunicationService_, _$window_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    provider = _previewPaneProvider_;
    windowCommunicationService = _windowCommunicationService_;
    $window = _$window_;
  }));

  describe('previewPaneController', function () {
    beforeEach(function () {
      controller = $controller("PreviewPaneCtrl as pp", {
        $scope: $scope,
        provider: provider
      });
    });

    it('should set the state of preview', function () {
      var val = true;
      controller.updatePreviewOn(val);
      expect(controller.previewOn).toBe(true);
    });
    it('should set the status of Preview File', function () {
      var val = "assets/files/file1";
      controller.updateHasPreviewFile(val);
      expect($scope.previewFile).toBe(val);
      expect(controller.provider.preview.previewFile).toBe(val);
    });

    it('should not open a window when no preview file has been selected', function () {
      controller.openInNewWindow();
      expect(windowMock.open).not.toHaveBeenCalled();
    });

    it('should open a window when the openInNewWindow is called (from button click)', function () {
      $scope.previewFile = "assest/files/file1";
      controller.openInNewWindow();
      expect(windowMock.open).toHaveBeenCalled();
    });

    it('should call the updateContent method in windowCommunicationService when the previewFile changes', function () {
      spyOn(windowCommunicationService, 'updateContent');
      controller.previewpane.previewFile = "original";
      controller.previewWindow = {};
      $scope.$digest();
      controller.previewpane.previewFile = "changed";
      $scope.$digest();
      expect(windowCommunicationService.updateContent).toHaveBeenCalled();
    });

    it('shouldnt open a window if the window is already open', function () {
      spyOn(windowCommunicationService, 'createWindow');
      controller.previewWindow = {};
      controller.openInNewWindow();
      expect(windowCommunicationService.createWindow).not.toHaveBeenCalled();
    });

  });
});