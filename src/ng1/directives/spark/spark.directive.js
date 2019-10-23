export default function SparkDirective() {
    return {
        restrict: "E",
        template: require("./spark.html"),
        controller: "SparkCtrl as sc",
        scope: {
            type: "=?",
            value: "=",
            fillheight: "=",
            label: "=inlineLabel",
            top: "=",
            topLeftLabel: "=",
            topRightLabel: "=",
            bottomLeftLabel: "=",
            bottomRightLabel: "=",
            sparkTooltip: "@?",
            sparkTooltips: "=?",
            barColor: '=?',
            trackColor: '=?',
            segmentClick: '&?'
        },
        bindToController: true
    };
}