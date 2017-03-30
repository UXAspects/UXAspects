export default function radiobutton() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./radiobutton.html'),
        controller: 'RadiobuttonCtrl as vm',
        bindToController: true,
        replace: true,
        scope: {
            ngModel: '=',
            ngValue: '=',
            ngDisabled: '=?',
            simplified: '=?',
            name: '@?',
            id: '@?',
            clickable: '=?'
        },
        compile: function(element, attrs) {

            // check if we have a name attribute
            if (attrs.name !== undefined) {

                // replace the name attribute with a for attribute
                element.removeAttr('name').attr('for', attrs.name);
            }
        }
    };
}