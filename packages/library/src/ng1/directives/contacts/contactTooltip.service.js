contactTooltipService.$inject = ['$compile', '$document'];

export default function contactTooltipService($compile, $document) {

    function getTooltip(scope, element, organization) {

        var tooltipHtml, tooltipPosition;

        if (organization === false) {
            tooltipHtml = scope.contact.customTooltip.template;
            tooltipPosition = scope.contact.customTooltip.tooltipPosition = angular.isDefined(scope.contact.customTooltip.tooltipPosition) ? scope.contact.customTooltip.tooltipPosition.toLocaleLowerCase() : "bottom";

        } else {
            tooltipHtml = scope.organization.customTooltip.template;
            tooltipPosition = scope.organization.customTooltip.tooltipPosition = angular.isDefined(scope.organization.customTooltip.tooltipPosition) ? scope.organization.customTooltip.tooltipPosition.toLocaleLowerCase() : "bottom";
        }

        var templateHtml = "<ng-include src=\"'" + tooltipHtml + "'\"></ng-include>";
        var div = angular.element('<div></div>');
        var popoverTemplate = div.html(templateHtml);

        //compile the element before adding it to the popover
        var compiledTemplate = $compile(popoverTemplate)(scope);

        //add popover
        element.popover({
            template: '<div class="popover contacts-popover" role="tooltip"><div class="arrow contacts-popover-arrow"></div><div class="popover-content"></div></div>',
            content: compiledTemplate,
            trigger: 'manual',
            placement: tooltipPosition,
            html: true
        });

        configureTooltip(scope, element, tooltipPosition, organization);
    }

    function configureTooltip(scope, element, tooltipPosition, organization) {

        var timer, tooltipElement;

        //Open popover on hover if not already opened
        if (organization === false) {
            tooltipElement = element.children('.contact');
        } else {
            tooltipElement = element;
        }

        tooltipElement.mouseenter(function () {

            timer = setTimeout(function () {

                //check if there are other popovers
                var otherPopovers = angular.element(".popover").not(element.parent().children('.popover'));
                if (otherPopovers.length > 0) {

                    //close them
                    angular.forEach(otherPopovers, function (popover) {
                        var popoverElement = angular.element(popover).prev();
                        popoverElement.popover('hide');

                    });
                }

                //show popover if it is not already open
                if (element.parent().children('.popover').length === 0) {
                    element.popover('show');
                }

            }, 600);


        }).mouseleave(function () {
            clearTimeout(timer);
        });


        var contactsHoverBind = function (event) {

            //If popover is already closed or if the click is on the contact where popover is already opened, then return
            if (element.parent().children('.popover').length === 0 || element.has(event.target).length > 0) return;

            var xp = [],
                yp = [];
            var popover = element.parent().children('.popover');
            if (popover.length === 0) return;

            if (tooltipPosition === "bottom") {

                if (organization === false) {
                    xp.push(element.offset().left);
                    yp.push(element.offset().top);
                    xp.push(element.offset().left + element.children('div.contact')[0].clientWidth);
                    yp.push(element.offset().top);
                } else {
                    //position tooltip for organization element
                    xp.push(element.offset().left);
                    yp.push(element.offset().top);
                    xp.push(element.offset().left + element[0].clientWidth);
                    yp.push(element.offset().top);

                }

                //popover top right co-ordinates
                xp.push(popover.offset().left + popover[0].clientWidth);
                yp.push(popover.offset().top);

                //popover top left co-ordinates
                xp.push(popover.offset().left);
                yp.push(popover.offset().top);
            } else {

                //tooltip position is at top

                if (organization === false) {
                    xp.push(element.offset().left);
                    yp.push(element.offset().top + element.children('div.contact')[0].clientHeight);
                    xp.push(element.offset().left + element.children('div.contact')[0].clientWidth);
                    yp.push(element.offset().top + element.children('div.contact')[0].clientHeight);
                } else {
                    //position tooltip for organization element
                    xp.push(element.offset().left);
                    yp.push(element.offset().top + element[0].clientHeight);
                    xp.push(element.offset().left + element[0].clientWidth);
                    yp.push(element.offset().top + element[0].clientHeight);
                }

                //popover bottom right co-ordinates
                xp.push(popover.offset().left + popover[0].clientWidth);
                yp.push(popover.offset().top + popover[0].clientHeight);

                //popover bottom left co-ordinates
                xp.push(popover.offset().left);
                yp.push(popover.offset().top + popover[0].clientHeight);


            }
            /*The math used in the function is to determine if a point lies on the interior of a polygon
             This is based on the principle that the point will be inside if a horizontal line drawn through the point
             has an odd number of intersections with sides of the polygon (Ray casting algorithm)
             Hence, the value of c will be true if it toggles odd number of times and the function returns true when point
             is inside and false when point is outside the polygon
             */
            function checkIfPointIsInside(xp, yp, x, y) {
                var i, j, c = 0;
                for (i = 0, j = xp.length - 1; i < xp.length; j = i++) {
                    if ((((yp[i] <= y) && (y < yp[j])) ||
                            ((yp[j] <= y) && (y < yp[i]))) &&
                        (x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i]))
                        c = !c;
                }
                return c;
            }
            var result = checkIfPointIsInside(xp, yp, event.pageX, event.pageY);

            //no need to hide the popover if mouse pointer is within the allowed region
            if (result === true) return;

            var e = angular.element(event.target);

            //Check for hover outside the popover, if yes then hide popover
            if (angular.element('body').has(event.target) && e.hasClass('popover') === false && e.parents('.popover').length === 0) {
                element.popover("hide");
            }
        };

        $document.bind('mousemove', contactsHoverBind);

        scope.$on('$destroy', function () {
            $document.unbind('mousemove', contactsHoverBind);
        });


    }

    var service = {
        getTooltip: getTooltip
    };
    return service;
}