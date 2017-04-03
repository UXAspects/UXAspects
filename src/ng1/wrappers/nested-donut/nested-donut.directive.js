export function NestedDonutDirective() {
    return {
        restrict: 'E',
        scope: {
            dataset: '=',
            options: '=?'
        },
        template: `<nested-donut dataset="dataset" options="options"></nested-donut>`
    };
}