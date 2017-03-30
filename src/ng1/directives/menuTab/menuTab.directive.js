menuTab.$inject = ["safeTimeout"];

export default function menuTab(safeTimeout) {
    return {
        restrict: 'E',
        template: require('./menuTab.html'),
        replace: true,
        scope: {
            tabMenuContent: '='
        },
        link: function (scope, element) {
            var currentMenuItem = null;
            var currentMenuContent = null;

            var nativeElement = element.get(0);

            var safeTimeoutInstance = safeTimeout.create(scope);
            var dropdownMenu = nativeElement.querySelector(".dropdown-menu");

            var mousedownEvent = document.createEvent("MouseEvent");
            mousedownEvent.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

            dropdownMenu.addEventListener('click', function (event) {
                if (!event.target.classList.contains("hyperlink-hover")) {
                    event.stopPropagation();
                }
            });

            scope.resizeDropdown = function () {
                var computedStyles = window.getComputedStyle(nativeElement.parentNode, null);
                var padding = parseInt(computedStyles.paddingLeft);
                var width = parseInt(computedStyles.width);
                var tabWidth = (width - (padding * 2)) + "px";
                dropdownMenu.style.width = tabWidth;
            };

            window.addEventListener('resize', scope.resizeDropdown);

            scope.addTag = function (content) {
                var tabs = nativeElement.parentNode.children;
                //hide the previous tab
                if (currentMenuItem !== null && currentMenuContent !== content) {
                    for (var x = 0; x < tabs.length; x++) {
                        var oldTab = tabs[x];
                        if (oldTab.tagName.toLowerCase() === 'li' && oldTab.textContent !== null && oldTab.textContent.trim() === currentMenuItem) {
                            oldTab.querySelector("tab-heading").textContent = currentMenuContent;
                            oldTab.classList.add("hidden");
                        }
                    }
                }

                //show the new tab
                for (var i = 0; i < tabs.length; i++) {
                    var tab = tabs[i];
                    if (tab.tagName.toLowerCase() === 'li' && tab.classList.contains("hidden")) {
                        if (tab.textContent !== null && tab.textContent.trim() === content) {

                            tab.querySelector("tab-heading").textContent = ("..." + content);
                            //add the dots
                            currentMenuItem = "..." + content;
                            currentMenuContent = content;
                            tab.classList.remove("hidden");

                            //select the tab                
                            safeTimeoutInstance.timeout(dispatchMouseEvent.bind(tab));
                            break;
                        }
                    }
                }

                function dispatchMouseEvent() {
                    this.querySelector('a').dispatchEvent(mousedownEvent);
                }
            };
        }
    };
}