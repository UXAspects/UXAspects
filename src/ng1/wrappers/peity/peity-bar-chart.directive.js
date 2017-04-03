export function PeityBarChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "="
		},
        template: `<bar-chart data="data" options="options"></bar-chart>`,
    };
}