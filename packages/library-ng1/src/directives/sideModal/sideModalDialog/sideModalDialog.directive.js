sideModalDialog.$inject = ["sideModalFactory", "$timeout"];

export default function sideModalDialog(sideModalFactory, $timeout) {
    return {
        restrict: 'A',
        template: require("./sideModalDialog.html"),
        replace: 'true',
        link: function(scope, element) {
            scope.modalOpt = sideModalFactory.getOptions();

            scope.closeModal = function() {

                if (scope.modalOpt.animate) {

                    // remove the modal opening class
                    scope.modalOpen = false;

                    // wait for animation to finish
                    element.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', sideModalFactory.close);

                    // in case some timing issues close after ~half a second regardless
                    $timeout(sideModalFactory.close, 400);
                } else {
                    sideModalFactory.close();
                }
            };

            scope.dismissModal = function() {
                sideModalFactory.dismiss();
            };

            scope.$on('modal.closing', (event) => {

                // if we are animating the modal then lets take over control
                if (scope.modalOpt.animate && scope.modalOpen) {

                    // prevent the default closing event and handle it ourselves
                    event.defaultPrevented = true;

                    // close the modal ourselves
                    scope.closeModal();
                }
            });

            // if we are to animate then have a toggle for when to show the modal
            scope.modalOpen = false;

            if (scope.modalOpt.animate) {
                $timeout(() => {
                    scope.modalOpen = true;
                });
            }
        }
    };
}