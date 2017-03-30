export default function dropZone() {
  return {
    restrict: 'EA',
    controller: 'FileUploadCtrl as vm',
    link: function (scope, element) {
      element.dropzone({
        maxFilesize: 100,
        paramName: "uploadfile",
        maxThumbnailFilesize: 5,
        init: function () {
          this.on('error', function (file, msg) {
            if (msg.length > 0) {
              this.removeAllFiles();
            }
          });
        }
      });
    }
  };
}