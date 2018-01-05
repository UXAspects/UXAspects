detailRowHeaderPopover.$inject = ['$templateRequest', '$compile', '$rootScope', '$document'];

export default function detailRowHeaderPopover($templateRequest, $compile, $rootScope, $document) {
    return {
        restrict: "A",
        scope: true,
        link: function(scope, element, attrs) {

            var templateUrl = scope.$eval(attrs.detailRowHeaderPopover);

            // load template
            var promise = $templateRequest(templateUrl);

            var popoverOpen = false;

            var popoverScope;

            // wait until promise is resolved
            promise.then(function(html) {

                // create scope with function to close popover
                popoverScope = $rootScope.$new(true);

                // add function to close popover to scope
                popoverScope.closePopover = closePopover;

                // add function to toggle filter icon to scope
                popoverScope.setFilterActive = setFilterActive;

                // compile template
                var template = $compile(html)(popoverScope);

                element.popover({
                    html: true,
                    template: '<div class="popover detail-row-header-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                    content: template,
                    placement: 'bottom',
                    container: 'body',
                    animation: false
                });

            });

            element.on("shown.bs.popover", function() {
                popoverOpen = true;
                popoverScope.$broadcast("detailRowHeaderPopoverOpened");
            });

            element.on("hidden.bs.popover", function(e) {
                popoverOpen = false;
                angular.element(e.target).data("bs.popover").inState = { click: false };
                popoverScope.$broadcast("detailRowHeaderPopoverClosed");
            });

            // Handler for clicks outside the popover, to close it
            $document.on("click.detailRowHeaderPopover", popoverDocumentClick);

            // watch for window resize events - we should dismiss to avoid popover misplacement
            window.addEventListener('resize', closePopover.bind(this));

            scope.$on("$destroy", function() {
                element.off("shown.bs.popover hidden.bs.popover");
                $document.off("click.detailRowHeaderPopover", popoverDocumentClick);
            });

            function closePopover() {
                element.popover('hide');
            }

            function setFilterActive(active) {
                var nativeElement = element[0];
                if (active) {
                    nativeElement.classList.remove("hpe-caret-down");
                    nativeElement.classList.add("hpe-caret-down-filled");
                } else {
                    nativeElement.classList.add("hpe-caret-down");
                    nativeElement.classList.remove("hpe-caret-down-filled");
                }
            }

            function popoverDocumentClick(event) {
                if (popoverOpen) {
                    var target = angular.element(event.target);
                    // Close unless target is the popover toggle or popover itself.
                    if (!element.is(target) && element.has(target).length === 0 &&
                        !target.hasClass("popover") && target.parents(".popover").length === 0) {
                        closePopover();
                    }
                }
            }
        }
    };
}