export default function ToggleSwitchCtrl() {
    var vm = this;

    vm.toggleChecked = function() {

        if (vm.clickable !== false) {
            vm.clickable = true;
        }

        // if disabled then do nothing
        if (vm.ngDisabled === true || !vm.clickable) {
            return;
        }

        vm.ngModel = !vm.ngModel;
    };

    vm.keydown = function(event) {

        // if spacebar is pressed toggle state
        if (event.keyCode === 32) {
            vm.toggleChecked();
            event.stopPropagation();
            event.preventDefault();
        }
    };
}