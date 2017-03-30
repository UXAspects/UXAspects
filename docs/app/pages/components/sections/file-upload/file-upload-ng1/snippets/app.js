angular.module('app').controller('FileUploadCtrl', ['$scope', 'FileUploader', FileUploadCtrl]);

function FileUploadCtrl($scope, FileUploader) {
  $scope.uploader = new FileUploader();
}