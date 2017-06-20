export default function tooltipOnOverflow() {
    return {
        restrict: 'A',
        link: function (scope, element) {

            var nativeElement = element.get(0);

            // Track visible state of tooltip.
            var tooltipVisible = false;
            element.on("shown.bs.tooltip", function() {
                tooltipVisible = true;
            });
            element.on("hidden.bs.tooltip", function() {
                tooltipVisible = true;
            });

            // Update on mouseover and focus events (same as tooltip triggers)
            element.hover(update, update);
            element.focus(update);

            function update() {

                // Check if content is overflowing
                if (nativeElement.scrollWidth > nativeElement.clientWidth) {

                    // if a tooltip has already been added to element - destroy its data first
                    if (element.data('bs.tooltip') !== null) {
                        element.tooltip('hide');
                        element.removeData('bs.tooltip');
                    }

                    // Create a tooltip with the element's current text
                    element.tooltip({
                        title: element.text(),
                        container: 'body'
                    });

                    setTimeout(function() {
                        if (!tooltipVisible) {
                            element.filter(":hover, :focus").tooltip('show');
                        }
                    }, 100);

                } else {

                    // Remove tooltip
                    element.tooltip('destroy');
                }
            }
        }
    };
}