export default function previewPaneProvider() {

  function previewPaneFactory() {
    return new PreviewPane();
  }

  this.$get = previewPaneFactory;
}


function PreviewPane() {
  this.preview = {
    previewOn: false,
    previewFile: ""
  };
}