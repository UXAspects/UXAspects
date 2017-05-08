contact.$inject = ['$compile', '$document', 'contactTooltipService'];

export default function contact($compile, $document, contactTooltipService) {
    return {
        restrict: 'E',
        scope: {
            contact: "=",
            size: "=",
            order: "=?",
            colors: "=",
            showStatus: "="
        },
        template: require('./contact.html'),
        link: contactLink
    };

    function contactLink(scope, element) {
        updateContact(scope, element);
        updateStatus(scope, element);
        renderTooltip(scope, element);
        scope.$watch(function () {
                return scope.contact.status;
            },
            function (nV, oV) {
                if (!angular.equals(nV, oV)) {
                    updateStatus(scope, element);
                }
            });
    }

    function updateContact(scope, element) {
        var contactStyles = {
            backgroundColor: scope.colors.primary,
            color: scope.colors.secondary,
            marginLeft: scope.order === 0 ? "0px" : "1px"
        };

        angular.extend(element.find(".contact")[0].style, contactStyles);
    }

    function renderTooltip(scope, element) {

        if (scope.contact.customTooltip === undefined || scope.contact.customTooltip.template === undefined) return;
        contactTooltipService.getTooltip(scope, element, false);

    }

    function updateStatus(scope, element) {
        var status = {
            active: scope.colors.active || "#01a982",
            passive: scope.colors.passive || "#ccc"
        };

        if (scope.contact) {
            var statusStyles = {
                backgroundColor: status[scope.contact.status] || null,
                marginLeft: scope.order === 0 ? "0px" : "1px"
            };

            angular.extend(element.find(".status")[0].style, statusStyles);
        }
    }
}   