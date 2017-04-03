export function PeityPieChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "="
		},
        template: `<pie-chart data="data" options="options"></pie-chart>`
    };
}