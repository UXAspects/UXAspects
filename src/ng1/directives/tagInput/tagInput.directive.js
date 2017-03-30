tagInput.$inject = ['safeTimeout'];

export default function tagInput(safeTimeout) {
    return {
        restrict: "E",
        template: require("./tagInput.html"),
        controller: "TagInputCtrl as ti",
        scope: {
            tags: "=",
            fullTagSet: "=?",
            api: "=?",
            options: "=?",
            text: "=?",
            ngDisabled: "=?"
        },
        link: function(scope, element, attrs, controller) {

            var safeTimeoutInstance = safeTimeout.create(scope);

            safeTimeoutInstance.timeout(function() {
                var input = element.find('input');

                input.on('input', function() {
                    controller.updateMessage(input.val());
                });
            });
        }
    };
}