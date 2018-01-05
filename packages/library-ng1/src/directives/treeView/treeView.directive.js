export default function treeView() {
    return {
        restrict: "E",
        controller: "TreeViewCtrl as tv",
        scope: {
            data: '=',
            filterFunction: '=?filter',
            selected: '=?',
            addItem: '=?',
            icons: '=?',
            deleteFn: '=?delete',
            readOnly: '@?',
            treeOptions: '=?options'
        },
        template: require('./treeView.html'),
        link: function(scope, element) {

            var treeElement = element.find('.angular-ui-tree');
            //If a height is provided to prevent initial flicker during load, set the style
            //(removed from controller after load)
            if (scope.treeOptions.loadHeight !== undefined && scope.treeOptions.loadHeight !== "") {

                var loadHeight = scope.treeOptions.loadHeight + "px";
                treeElement.css('max-height', loadHeight);
            }

            //Hide tree before loading ( made visible after load from controller)
            treeElement.css('visibility', 'hidden');

        }
    };
}