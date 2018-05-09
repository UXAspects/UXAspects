angular.module('app').directive('uxdDraggablePanelsViewsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./draggable-panels-views-wrapper.directive.html'),
        controller: function () {
            var vm = this;

            // store reference to the container element for better performance
            var listContainer: any;

            function getContainer() {
                // if container has already been found then return it
                if (listContainer) { return listContainer; }

                // otherwise find the element
                listContainer = angular.element(document.getElementsByClassName('draggable-panel-list-container')[0]);

                // return found element
                return listContainer;
            }

            vm.onDragStart = function (panel: any) {
                if (panel.toElement && panel.toElement.className === 'drag-handle') {
                    panel.toElement.parentElement.classList.add('panel-dragging');
                } else if (panel.toElement) {
                    panel.toElement.classList.add('panel-dragging');
                }

                getContainer().addClass('draggable-panel-highlight');
            };

            vm.onDragEnd = function (panel: any) {
                if (panel.toElement && panel.toElement.className === 'drag-handle') {
                    panel.toElement.parentElement.classList.remove('panel-dragging');
                } else if (panel.toElement) {
                    panel.toElement.classList.remove('panel-dragging');
                }

                getContainer().removeClass('draggable-panel-highlight');
            };
        },
        controllerAs: 'vm'
    };
});
