sideModalFactory.$inject = ["$modal"];

export default function sideModalFactory($modal) {
    var modalFactory = {};
    var modalOptions, modalInstance;

    modalFactory.open = function(options) {
        modalOptions = options;
        modalInstance = $modal.open({
            template: "<div></div>",
            animation: false,
            keyboard: 'true',
            windowTemplateUrl: "sideModal/sideModalWindow/sideWindowDialog.html"
        });
    };

    modalFactory.getOptions = function() {
        return modalOptions;
    };

    modalFactory.close = function() {
        if(modalInstance) {
            modalInstance.close('true');
        }
    };

    modalFactory.dismiss = function() {
        if(modalInstance) {
            modalInstance.dismiss('cancel');
        }
    };

    return modalFactory;
}