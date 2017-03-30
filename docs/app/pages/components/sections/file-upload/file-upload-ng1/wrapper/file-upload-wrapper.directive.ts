angular.module('app').directive('uxdFileUploadWrapper', () => {
    return {
        restrict: 'E',
        controller: 'FileUploadCtrl as vm',
        template: require('./file-upload-wrapper.directive.html')
    };
});

angular.module('app').controller('FileUploadCtrl', ['$scope', 'FileUploader', FileUploadCtrl]);

function FileUploadCtrl($scope: angular.IScope, fileUploader: any) {
    $scope.uploader = new fileUploader();
}