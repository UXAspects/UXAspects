singleLineOverflowTooltip.$inject = ['safeTimeout', '$window', '$resize'];

export default function singleLineOverflowTooltip(safeTimeout, $window, $resize) {
    return {
        restrict: "A",
        link: function (scope, element) {

            var nativeElement = element.get(0);
            var tooltipReady = false;
            var tooltipDestroyed = false;

            var safeTimeoutInstance = safeTimeout.create(scope);

            //apply next cycle so bound elements will have been processed - updated to use scope safe timeout
            safeTimeoutInstance.timeout(function () {
                //ensure element has correct styling
                applyStyles();

                //initially create a tooltip
                createTooltip();

                //recheck for overflow after any binding have updated
                updateTooltip();
            });

            // watch for changes to the element size
            $resize.bind(nativeElement, updateTooltip.bind(this));

            //watch for changes to the content
            var observer = new MutationObserver(function () {
                updateTooltip();
            });

            // pass in the target node, as well as the observer options
            observer.observe(element.get(0), {
                characterData: true,
                subtree: true
            });

            //watch for changes to window size
            $window.addEventListener('resize', updateTooltipFn);

            element.on('$destroy', destroy);
            scope.$on('$destroy', destroy);

            function updateTooltipFn() {
                updateTooltip();
            }

            function applyStyles() {

                //this will not work on inline elements - needs to change to inline block
                var style = $window.getComputedStyle(nativeElement);

                if (style.display === 'inline') {
                    nativeElement.style.display = 'inline-block';
                }

                nativeElement.style.overflow = 'hidden';
                nativeElement.style.textOverflow = 'ellipsis';
                nativeElement.style.whiteSpace = 'nowrap';
            }

            function createTooltip() {
                var text = element.text();

                element.tooltip({
                    title: text,
                    container: 'body'
                });

                tooltipReady = true;
            }

            function updateTooltip() {

                if (!tooltipReady) return;

                // http://stackoverflow.com/questions/7738117/html-text-overflow-ellipsis-detection
                var hidden = element.clone()
                    .css({display: 'inline', width: 'auto', visibility: 'hidden'})
                    .appendTo(element.parent());

                if (hidden.width() >= element.width()) {
                    var elementText = element.text();
                    var previousText = nativeElement.getAttribute('data-original-title');

                    if (elementText !== previousText) {
                        nativeElement.setAttribute('data-original-title', elementText);
                    }

                    element.tooltip('enable');
                } else {
                    element.tooltip('disable');
                }

                hidden.remove();
            }

            function destroy() {

                // if it is already destroyed then stop here
                if (tooltipDestroyed) {
                    return;
                }

                tooltipDestroyed = true;

                element.tooltip('destroy');
                $window.removeEventListener('resize', updateTooltipFn);
                $resize.unbind(nativeElement, updateTooltip.bind(this));
            }

        }
    };
}