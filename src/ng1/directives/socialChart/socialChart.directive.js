socialChart.$inject = ["$timeout", "$interval", "$colorService"];

export default function socialChart($timeout, $interval, $colorService) {
    return {
        restrict: "E",
        scope: {
            data: "=",
            options: "=?",
            width: "@",
            height: "@",
            api: "=",
            communities: "=?",
            detailStyle: "=?",
            popoverStyle: "=?",
            nodeDetail: "@?",
            edgeDetail: "@?",
            nodePopover: "@?",
            edgePopover: "@?",
            forceAtlasDuration: "=?",
            nodeSizeAttribute: "=?",
            startMaximized: "=?",
            startMaximised: "=?",
            showMaximizeControl: "=?",
            showMaximiseControl: "=?",
            socialChartContainer: "@?",
            fullscreenButtonPosition: "=?",
            localStrings: "=?",
            chartTitle: "=?",
            titleDisplayTime: "=?",
            edgeWeightInfluence: "=?",
            minLabels: "=?"
        },
        controller: "SocialChartCtrl as sc",
        template: require("./socialChart.html"),
        link: function(scope, element) {

            var config = {
                'defaultNodeColor': $colorService.getColor("social-chart-node").toRgba(),
                'defaultEdgeColor': $colorService.getColor("social-chart-edge").toRgba(),
                'defaultLabelColor': 'rgba(255,255,255,0.6)',
                'labelSizeRatio': 2,
                'enableEdgeHovering': true,
                'nodesPowRatio': 0.75,
                'edgesPowRatio': 0,
                'minEdgeSize': 0.5,
                'selectedShadowColorTransparent': 'rgba(69, 148, 219, 0)',
                'selectedEdgeShadowColor': 'rgba(60,148,191,0.1)',
                'selectedShadowColor': '#4594db',
                'edgeHoverColor': 'default',
                'defaultEdgeHoverColor': '#2AD2C9',
                'hoverShadowColor': '#bbb',
                'edgeHoverShadowColor': 'rgba(153,153,153,0.1)',
                'edgeColor': 'default',
                'stageColor': '#2A2A2A',
                'hiddenNodeColor': '#324342',
                'hiddenEdgeColor': '#324342',
                'zoomMax': '1',
                'zoomDelay': 1.7,
                'batchEdgesDrawing': true,
                'hideEdgesOnMove': true,
                'minNodeSize': 2,
                'maxNodeSize': 9,
                'labelThreshold': 7,
                'adjustCameraCenter': true,
                'cameraCenterOffset': 80,
                'skipErrors': true,
                'edgeHoverPrecision': 2,
                'neighborViewOnSelect': true
            };

            scope.sc.id = scope.id;
            scope.sc.getContainer = function() {
                return element;
            };

            //Record the mouse position over the chart for events that require real co-ordinates
            element[0].addEventListener("mousemove", function(event) {
                    var width = sigma.utils.getWidth(event);
                    scope.sc.mousePosition = {
                        'clientX': event.clientX,
                        'clientY': event.clientY,
                        'movementX': event.movementX,
                        'movementY': event.movementY,
                        'stageX': sigma.utils.getX(event) - width / 2,
                        'stageY': sigma.utils.getY(event) - sigma.utils.getHeight(event) / 2
                    };
                    if (width > 550) {
                        scope.sc.startHoverTimeout(scope.sc.mousePosition);
                    }

                }.bind(scope.sc),
                false,
                false);

            //Record the mouse leaving
            element[0].addEventListener("mouseleave", function(event) {
                    //Kill any events and hover items
                    if (!event.toElement || !~event.toElement.className.indexOf("tooltip")) {
                        scope.sc.cancelPopover();
                        scope.sc.sigmaInstance.refresh();
                    }
                }.bind(scope.sc),
                false,
                false);

            var settings = {
                font: 'Source Sans Pro',
                singleHover: true
            };

            angular.extend(settings, config, (function() {
                return scope.options || {};
            })());

            $timeout(function() {
                var s = new sigma({
                    renderer: {
                        container: element.find(".sigma-wrapper #sigma-container")[0],
                        type: 'canvas'
                    },
                    settings: settings
                });

                scope.sc.initialise(s);

                var wrapper = angular.element(".sigma-wrapper")[0];
                var positionWatch;
                if (!positionWatch) {
                    //There are relatively positioned elements which should be updated when the container moves
                    //A $watch is not sufficient here as a $digest is not triggered by non-angular DOM manipulation.
                    var top = 0;
                    var left = 0;

                    positionWatch = $interval(function() {
                        var wrapperRect = wrapper.getBoundingClientRect();
                        top = wrapperRect.top + angular.element(window).scrollTop();
                        left = wrapperRect.left + angular.element(window).scrollLeft();
                        scope.sc.setMenuDisplacement({
                            'offsetTop': top,
                            'offsetLeft': left
                        });
                        scope.sc.updateChartHeight();
                    }, 500);
                }

                scope.$on('$destroy', function() {
                    //Cancel the displacement watch
                    $interval.cancel(positionWatch);
                    positionWatch = undefined;

                    //Stop the layout algorithm
                    s.stopForceAtlas2();

                    //Teardown the chart
                    s.kill();

                    //Cancel any remaining promises
                    for (var timer in scope.sc.timers) {
                        $timeout.cancel(scope.sc.timers[timer]);
                    }
                });

            });
        }
    };
}