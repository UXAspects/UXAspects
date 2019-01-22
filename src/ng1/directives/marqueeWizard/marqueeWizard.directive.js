export function marqueeWizard() {
    return {
        restrict: 'E',
        template: require('./marqueeWizard.html'),
        controller: 'MarqueeWizardCtrl',
        controllerAs: 'mc',
        bindToController: true,
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
        link: function (scope, element, attrs, ctrl) {

            //get button elements
            const previousBtn = element.find('.marquee-previous-btn');
            const nextBtn = element.find('.marquee-next-btn');
            const finishBtn = element.find('.marquee-finish-btn');

            //when buttonOptions changes then update tooltips accordingly
            scope.$watch('buttonOptions', (nv, ov) => {
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
                if (ctrl.buttonOptions.previousTooltip !== null) {
                    previousBtn.tooltip({
                        title: ctrl.buttonOptions.previousTooltip
                    });
                }


                //add new tootlips if required to next btn
                if (ctrl.buttonOptions.nextTooltip !== null) {
                    nextBtn.tooltip({
                        title: ctrl.buttonOptions.nextTooltip
                    });
                }


                //add new tootlips if required to finish btn
                if (ctrl.buttonOptions.finishTooltip !== null) {
                    finishBtn.tooltip({
                        title: ctrl.buttonOptions.finishTooltip
                    });
                }
            }
        }
    };
}