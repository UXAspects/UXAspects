contactGroup.$inject = ['contactTooltipService'];

export default function contactGroup(contactTooltipService) {
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
    template: require('./contactGroup.html'),
    link: contactGroupLink
  };

  function contactGroupLink(scope, element, attrs) {
    
    if (!Array.isArray(scope.contacts)) {
      scope.contacts = [
        scope.contacts
      ];
    }

    if (scope.organization && scope.organization.label) {
      updateOrganizationLabel(scope.organization.label, scope);
    }
    scope.$watch(function () {
      return scope.organization.label;
    }, function (nV, oV) {
      if (!angular.equals(nV, oV)) {
        updateOrganizationLabel(scope.organization.label, scope);
      }
    });

    scope.size = angular.isDefined(scope.size) ? scope.size.toLocaleLowerCase() : "medium";

    scope.maxContacts = angular.isDefined(scope.maxContacts) ? scope.maxContacts : Infinity;

    scope.overflowCount = function (total, max) {
      return total - max;
    };

    scope.overflowClickable = angular.isDefined(attrs.overflowClick);

    scope.showStatus = angular.isDefined(scope.contacts[0]) ? scope.contacts.some(function (elem) {
      return !!elem.status;
    }) : false;

    var styles = {
      backgroundColor: scope.colors.secondary,
      color: scope.colors.primary,
    };

    angular.extend(element.find(".organization")[0].style, styles);

    //render popover tooltip for organization
    if (angular.isDefined(scope.organization.customTooltip) && angular.isDefined(scope.organization.customTooltip.template)) {
      contactTooltipService.getTooltip(scope, element.find(".organization"), true);
    }
  }

  function updateOrganizationLabel(organizationLabel, scope) {
    switch (organizationLabel.toLocaleLowerCase()) {
      case "external":
        scope.label = "external";
        break;
      case "risk":
        scope.label = "risk";
        break;
      default:
        scope.label = undefined;
    }
  }
}