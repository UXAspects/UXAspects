export default function SparkCtrl() {
    var vm = this;

    vm.inline = vm.label !== undefined;

    vm.setPosition = {
        'height': vm.fillheight + 'px',
        'margin-top': (vm.top !== undefined) ? vm.top : 0 + 'px'
    };
}