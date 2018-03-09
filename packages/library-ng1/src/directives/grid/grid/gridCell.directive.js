gridCell.$inject = ['$compile', '$templateRequest'];

export default function gridCell($compile, $templateRequest) {
    return {
        restrict: 'A',
        require: '^^grid',
        link: function (scope, element) {

            var rowScope = scope.$new();

            loadTemplate(renderTemplate);

            scope.$watch('data', updateScope, true);
            scope.$watch('column', updateScope, true);

            function loadTemplate(callback) {
                if (scope.column.template) {
                    callback.call(null, scope.column.template);
                } else {
                    $templateRequest(scope.column.templateUrl).then(callback);
                }
            }

            function renderTemplate(template) {
                updateScope();
                element.append($compile(template)(rowScope));
            }

            function updateScope() {

                // add data to scope
                for (var prop in scope.data) {
                    rowScope[prop] = scope.data[prop];
                }
            }
        }
    };
}