export default function scrollTop() {
    return {
        restrict: "E",
        template: require("./scrollTop.html"),
        scope: {
            direction: '@?',
            distance: '@?'
        },
        link: function(scope, element) {

            var scrollButton = element[0].getElementsByClassName('scroll-top')[0];

            //if we are already scrolling dont do it again
            var isScrolling = false;
            var pageOffset = window.pageYOffset;

            //if a distance was set then take that into account
            if (scope.distance) {
                scrollButton.style.bottom = scope.distance + 'px';
            }

            var onScroll = function() {

                //if button should only appear when scrolling up
                if (scope.direction && scope.direction === 'up') {
                    var newOffset = window.pageYOffset;

                    //on scroll up
                    if (newOffset < pageOffset && newOffset > 50) {
                        showButton();
                    } else {
                        hideButton();
                    }

                    //store new page position
                    pageOffset = newOffset;

                } else {
                    //if button should appear when any scrolling takes place
                    pageOffset = window.pageYOffset;

                    if (pageOffset > 50) showButton();
                    else hideButton();
                }

            };

            function scrollToTop() {

                //if we are currently scrolling then dont do it again
                if (isScrolling) return;

                //set the fact we are currently scrolling
                isScrolling = true;

                //stop scrolling if user takes over
                $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(evt) {

                    //if triggered by a jscrollpane then ignore it
                    if (angular.element(evt.target).hasClass('jspScrollable')) return;

                    //stop automatic scrolling
                    $("html, body").stop();
                    isScrolling = false;
                });

                //perform scrolling
                $("html,body").animate({
                        scrollTop: 0
                    }, 1000, "easeInOutQuart",
                    function() {
                        //unbind
                        $("html, body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");

                        //hide our scroll button now we are at the top
                        hideButton();

                        //allow button to be clicked again
                        isScrolling = false;
                    });

            }

            function showButton() {
                scrollButton.style.right = '0px';
            }

            function hideButton() {
                scrollButton.style.right = -scrollButton.offsetWidth + 'px';
            }

            //need to unbind on destroy
            element[0].addEventListener("click", scrollToTop);
            window.addEventListener("scroll", onScroll);
        }
    };
}