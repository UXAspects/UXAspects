export function SocialChartDirective() {
    return {
        restrict: 'E',
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
        template: `<social-chart data="data" options="options" width="{{ width }}" height="{{ height }}" api="api" 
                                 communities="communities" detail-style="detailStyle" popover-style="popoverStyle"
                                 force-atlas-duration="forceAtlasDuration" node-size-attribute="nodeSizeAttribute"
                                 start-maximized="startMaximized" start-maximised="startMaximised" show-maximize-control="showMaximizeControl"
                                 show-maximise-control="showMaximiseControl" fullscreen-button-position="fullscreenButtonPosition"
                                 local-strings="localStrings" chart-title="chartTitle" title-display-time="titleDisplayTime"
                                 edge-weight-influence="edgeWeightInfluence" min-labels="minLabels"
                                 node-detail="{{ nodeDetail }}" edge-detail="{{ edgeDetail }}" node-popover="{{ nodePopover }}" edge-popover="{{ edgePopover }}"
                                 social-chart-container="{{ socialChartContainer }}"></social-chart>`,
        controller: ['$scope', function ($scope) {

            // ensure that all optional values are either present or undefined
            $scope.options = typeof $scope.options === 'function' ? $scope.options() : $scope.options;
            $scope.communities = typeof $scope.communities === 'function' ? $scope.communities() : $scope.communities;
            $scope.detailStyle = typeof $scope.detailStyle === 'function' ? $scope.detailStyle() : $scope.detailStyle;
            $scope.popoverStyle = typeof $scope.popoverStyle === 'function' ? $scope.popoverStyle() : $scope.popoverStyle;
            $scope.forceAtlasDuration = typeof $scope.forceAtlasDuration === 'function' ? $scope.forceAtlasDuration() : $scope.forceAtlasDuration;
            $scope.nodeSizeAttribute = typeof $scope.nodeSizeAttribute === 'function' ? $scope.nodeSizeAttribute() : $scope.nodeSizeAttribute;
            $scope.startMaximized = typeof $scope.startMaximized === 'function' ? $scope.startMaximized() : $scope.startMaximized;
            $scope.startMaximised = typeof $scope.startMaximised === 'function' ? $scope.startMaximised() : $scope.startMaximised;
            $scope.showMaximizeControl = typeof $scope.showMaximizeControl === 'function' ? $scope.showMaximizeControl() : $scope.showMaximizeControl;
            $scope.showMaximiseControl = typeof $scope.showMaximiseControl === 'function' ? $scope.showMaximiseControl() : $scope.showMaximiseControl;
            $scope.fullscreenButtonPosition = typeof $scope.fullscreenButtonPosition === 'function' ? $scope.fullscreenButtonPosition() : $scope.fullscreenButtonPosition;
            $scope.localStrings = typeof $scope.localStrings === 'function' ? $scope.localStrings() : $scope.localStrings;
            $scope.chartTitle = typeof $scope.chartTitle === 'function' ? $scope.chartTitle() : $scope.chartTitle;
            $scope.titleDisplayTime = typeof $scope.titleDisplayTime === 'function' ? $scope.titleDisplayTime() : $scope.titleDisplayTime;
            $scope.edgeWeightInfluence = typeof $scope.edgeWeightInfluence === 'function' ? $scope.edgeWeightInfluence() : $scope.edgeWeightInfluence;
            $scope.minLabels = typeof $scope.minLabels === 'function' ? $scope.minLabels() : $scope.minLabels;

            this.$onDestroy = function () {
                $scope.$destroy();
            };
        }]
    };
}