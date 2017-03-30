export default function ThumbnailCtrl() {
    var vm = this;

    // set the default values if none were given
    vm.show = vm.show !== undefined ? vm.show : true;
    vm.height = vm.height !== undefined ? vm.height : '120px';
    vm.width = vm.width !== undefined ? vm.width : '220px';
    vm.url = vm.url !== undefined ? vm.url : "";
}