export default function checkbox() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./checkbox.html'),
        controller: 'CheckboxCtrl as vm',
        bindToController: true,
        replace: true,
        scope: {
            ngModel: '=',
            ngDisabled: '=?',
            indeterminateValue: '=?', 
            simplified: '=?',
            name: '@?',
            clickable: '=?'
        },
        compile: function(element, attrs) {

            // check if we have a name attribute
            if(attrs.name !== undefined) {
                
                // replace the name attribute with a for attribute
                element.removeAttr('name').attr('for', attrs.name);
            }

        }
    };
}