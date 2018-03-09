export default function grid() {
    return {
        restrict: 'E',
        scope: {
            source: '=',
            columns: '=',
            options: '=?',
            events: '=?',
            plugins: '=?'
        },
        controller: 'GridCtrl as vm',
        bindToController: true,
        template: require('./grid.html')
    };
}