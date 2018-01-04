export default function timePicker() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: require('./timePicker.html'),
        require: '^dateTimePicker',
        controller: 'TmpkCtrl as tmpk'
    };
}
