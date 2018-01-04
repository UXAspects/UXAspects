export default function TreegridDirective() {
    return {
        restrict: 'E',
        template: require('./treegrid.html'),
        controller: 'TreegridCtrl as vm',
        bindToController: true,
        replace: true,
        scope: {
            data: '=',
            columns: '=',
            treeData: '=?',
            selected: '=?',
            currentRow: '=?',
            options: '=?'
        }
    };
}