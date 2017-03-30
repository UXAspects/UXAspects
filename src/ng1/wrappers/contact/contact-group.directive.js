export function ContactGroupDirective() {
    return {
        restrict: 'E',
        scope: {
            contacts: "=",
            organization: "=",
            size: "=?",
            colors: "=",
            maxContacts: "@",
            overflowClick: "&"
        },
        template: `<contact-group contacts="contacts" organization="organization" order="order" size="size" colors="colors" overflow-click="overflowClickFn()"></contact-group>`,
        link: function(scope, element) {
            
            if (scope.maxContacts) {
                element.attr('max-contacts', scope.maxContacts);
            }

            // add a function to handle overflow clicks
            scope.overflowClickFn = function() {
                if (scope.overflowClick) {
                    scope.overflowClick();
                }
            };
        }
    };
}