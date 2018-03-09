export default function sliderChart() {
    return {
        restrict: 'E',
        template: require('./sliderChart.html'),
        scope: {
            sliderOptions: '=',
            ngModel: '=',
            chartOptions: '=',
            chartData: '='
        },
        controller: 'SliderChartCtrl as vm',
        bindToController: true
    };
}