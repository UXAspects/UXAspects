export default function updatingLinechart() {
    return {
        restrict: 'E',
        scope: {
            data: "=",
            options: "=",
            method: "=",
            updateinterval: "="
        },
        link: function(scope, element, attrs) {

            var options = {};
            var chartType = "line";
            if (scope.options) {
                options = scope.options;
            }

            scope.span = document.createElement('span');
            var span = scope.span;
            scope.chartType = chartType;
            span.textContent = scope.data.join();

            if (!attrs.class) {
                span.className = "";
            } else {
                span.className = attrs.class;
            }

            if (element[0].nodeType === 8) {
                element.replaceWith(span);
            } else {
                element[0].appendChild(span);
            }

            scope.updatingChart = jQuery(span).peity(chartType, options);
            setInterval(function() {
                scope.data = scope.method(scope.data);
                scope.span.textContent = [scope.data.join(",")];
                scope.updatingChart.change();
            }, scope.updateinterval);
        }

    };

}