marqueeWizardStep.$inject = ['$templateRequest', '$compile', '$rootScope', '$parse'];

export default function marqueeWizardStep($templateRequest, $compile, $rootScope, $parse) {
    return {
        require: '?^^form',
        restrict: 'E',
        replace: true,
        scope: false,
        link: function (scope, element, attr, formCtrl) {

            var template = $parse(attr.template)(scope);

            $templateRequest(template).then(function (result) {

                var target_scope = $rootScope.$new(false, scope);

                // make form accesible to the new scope
                target_scope.form = formCtrl;

                element.append(angular.element(result));

                // compile the element
                $compile(element.children().first())(target_scope);
            });

        }
    };
}