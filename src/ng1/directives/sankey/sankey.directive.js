sankey.$inject = ['d3Sankey', '$timeout', '$compile', '$window'];

export default function sankey(d3Sankey, $timeout, $compile, $window) {
    return {
        restrict: "E",
        scope: {
            chartSize: '=?',
            chartData: '=',
            options: '=',
            click: '=?'
        },
        template: require("./sankey.html"),
        link: function(scope, element) {
            var vm = scope;
            var initialRender = true;
            var isDestroyed = false;

            var chartContainer = element.find('div.sankey');

            //record original width and height so we know if if changes
            var width = chartContainer[0].offsetWidth;
            var height = chartContainer[0].offsetHeight;

            //prepare event to be fired every time repaint occurs
            $window.requestAnimFrame = (function() {
                return $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame ||
                    function(callback) {
                        $window.setTimeout(callback, 1000 / 60);
                    };
            })();

            $timeout(function() {
                $compile(chartContainer)(vm);
            });

            if (!vm.chartSize) {
                vm.chartSize = {};
            }

            scope.$watch('chartSize', function(newVal, oldVal) {

                if (!vm.chart || !angular.equals(newVal, oldVal)) {
                    chartContainer.height(vm.chartSize.height);
                    chartContainer.width(vm.chartSize.width);

                    reloadChart();
                }
            }, true);

            scope.$watch('chartData', function(newVal, oldVal) {
                if (!angular.equals(newVal, oldVal)) {
                    reloadChart();

                }
            }, true);

            //when destroyed we need to stop the resize loop
            scope.$on('$destroy', function() {
                isDestroyed = true;
            });


            //start out resize checks
            checkForResize();

            function checkForResize() {
                //if width or height changed then redraw
                if (width !== chartContainer[0].offsetWidth || height !== chartContainer[0].offsetHeight) {

                    //store new size values
                    width = chartContainer[0].offsetWidth;
                    height = chartContainer[0].offsetHeight;

                    //reload and redraw
                    reloadChart();
                }
                //continue looping until control has been destroyed
                if (!isDestroyed) {
                    $window.requestAnimFrame(checkForResize);
                }
            }

            function reloadChart() {

                var createSankey = function() {
                    chartContainer.find('svg').remove();
                    chartContainer.find('div').remove();

                    if (!vm.chartData) {
                        return;
                    }

                    var options = vm.options ? vm.options : {};
                    vm.chart = d3Sankey.getChart(chartContainer)
                        .init(options, vm.click)
                        .draw(angular.copy(vm.chartData));

                    $timeout(function() {
                        $compile(chartContainer)(vm);
                    });
                };

                //on the first render we need a delay to ensure fonts have loaded so truncation can be correctly calculated
                if (initialRender) {

                    //delay before drawing
                    $timeout(createSankey);

                    //set initial render state
                    initialRender = false;
                } else {
                    createSankey();
                }
            }
        }
    };
}