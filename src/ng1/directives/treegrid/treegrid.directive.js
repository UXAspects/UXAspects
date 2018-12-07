export function TreegridDirective() {
    return {
        restrict: 'E',
        template: require('./treegrid.html'),
        controller: 'TreegridCtrl as vm',
        bindToController: true,
        scope: {
            data: '=',
            columns: '=',
            treeData: '=?',
            selected: '=?',
            currentRow: '=?',
            options: '=?',
            selectionManager: '&?'
        }
    };
}