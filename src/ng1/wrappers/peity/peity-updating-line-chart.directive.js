export function PeityUpdatingLineChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "=",
            method: "=",
            updateinterval: "="
		},
        template: `<line-chart data="data" options="options" method="method" updateinterval="updateinterval"></line-chart>`,
    };
}