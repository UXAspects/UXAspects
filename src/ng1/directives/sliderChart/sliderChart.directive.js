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
        require: 'ngModel',
        controller: 'SliderChartCtrl as vm',
        bindToController: true
    };
}