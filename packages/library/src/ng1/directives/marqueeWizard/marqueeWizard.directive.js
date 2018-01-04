export default function marqueeWizard() {
    return {
        restrict: 'E',
        template: require('./marqueeWizard.html'),
        replace: true,
        controller: 'MarqueeWizardCtrl',
        controllerAs: 'mc',
        scope: {
            wizardIcon: '=',
            wizardSteps: '=',
            buttonOptions: '=',
            onChanging: '=?',
            onFinished: '=?',
            onFinishing: '=?',
            onCanceled: '=?',
            isVisited: '=?',
            sideInfo: '=?'
        },
        link: function (scope, element) {

            //get button elements
            var previousBtn = element.find('.marquee-previous-btn');
            var nextBtn = element.find('.marquee-next-btn');
            var finishBtn = element.find('.marquee-finish-btn');

            //when buttonOptions changes then update tooltips accordingly
            scope.$watch('buttonOptions', function (nv, ov) {
                if (angular.equals(nv, ov)) updateTooltips();
            }, true);

            //initially add the tooltips
            updateTooltips();

            function updateTooltips() {
                //destory previous tooltips
                previousBtn.tooltip('destroy');
                nextBtn.tooltip('destroy');
                finishBtn.tooltip('destroy');

                //add new tootlips if required to previous btn
                if (scope.buttonOptions.previousTooltip !== null) {
                    previousBtn.tooltip({
                        title: scope.buttonOptions.previousTooltip
                    });
                }


                //add new tootlips if required to next btn
                if (scope.buttonOptions.nextTooltip !== null) {
                    nextBtn.tooltip({
                        title: scope.buttonOptions.nextTooltip
                    });
                }


                //add new tootlips if required to finish btn
                if (scope.buttonOptions.finishTooltip !== null) {
                    finishBtn.tooltip({
                        title: scope.buttonOptions.finishTooltip
                    });
                }
            }
        }
    };
}