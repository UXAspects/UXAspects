navigationMenu.$inject = ['$rootScope'];

export default function navigationMenu($rootScope) {

    var DEFAULT_COLLAPSE_AT_WIDTH = 1024;

    var visible = true;
    var collapseAtWidth = DEFAULT_COLLAPSE_AT_WIDTH;

    var $navigationMenu = {};

    $navigationMenu.show = function () {
        var navigationMenuElement = document.querySelector('.navbar-static-side-container');
        if (navigationMenuElement) {
            document.body.classList.remove("hide-navbar");
            navigationMenuElement.style.marginLeft = "0";
            visible = true;
            $rootScope.$broadcast('navigationMenu.visibilityChanged', true);
        }
    };

    $navigationMenu.hide = function () {
        var navigationMenuElement = document.querySelector('.navbar-static-side-container');
        if (navigationMenuElement) {
            document.body.classList.add("hide-navbar");
            navigationMenuElement.style.marginLeft = "-" + navigationMenuElement.offsetWidth + "px";
            visible = false;
            $rootScope.$broadcast('navigationMenu.visibilityChanged', false);
        }
    };

    $navigationMenu.visible = function () {
        return visible;
    };

    $navigationMenu.collapseAtWidth = function () {
        return collapseAtWidth;
    };

    $navigationMenu.setCollapseAtWidth = function (width) {
        collapseAtWidth = width;
    };

    $navigationMenu.setDefaultCollapseAtWidth = function () {
        collapseAtWidth = DEFAULT_COLLAPSE_AT_WIDTH;
    };

    return $navigationMenu;
}