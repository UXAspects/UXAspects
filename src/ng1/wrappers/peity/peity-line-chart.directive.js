export function PeityLineChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "="
		},
        template: `<line-chart data="data" options="options"></line-chart>`,
    };
}