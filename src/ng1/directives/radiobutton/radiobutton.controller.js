export default function RadiobuttonCtrl() {
    var vm = this;

    vm.toggleChecked = function() {

        if (vm.clickable !== false) {
            vm.clickable = true;
        }

        // if disabled then do nothing
        if (vm.ngDisabled === true || !vm.clickable) {
            return;
        }

        vm.ngModel = vm.ngValue;
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