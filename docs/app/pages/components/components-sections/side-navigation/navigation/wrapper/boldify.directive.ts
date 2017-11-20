angular.module('app').directive('boldifyMenuItem', boldifyMenuItem);

function boldifyMenuItem() {
    return {
        restrict: 'A',
        link: function (scope: angular.IScope, element: JQuery) {
            element.click(function () {

                // deboldify all other menu items        
                angular.element('.selected-side-menu-item').removeClass('selected-side-menu-item');

                // boldify the clicked item
                element.addClass('selected-side-menu-item');

                // apply bold style to parents
                element.parents('li.selected').each(function (idx, ele) {
                    angular.element(ele).find('a').first().addClass('selected-side-menu-item');
                });

            });
        }
    };
}