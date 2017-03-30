
describe('contacts list widget', function () {
  
  var $compile, $rootScope, $scope;

  beforeEach(module("ux-aspects.contacts"));

  var singleContactWithStatus = [{
    text: "MWP",
    status: "active"
  }];
  var singleContactWithStatusSingleObject = {
    text: "MWP",
    status: "active"
  };
  var singleContactWithTooltip = {
    text: "TT",
    tooltip: "tooltip"
  };
  var contactsWithCustomTooltip = [{
    text: "II",
    customTooltip: {
      data: {
        description: "Finance, Variable Income, Storage",
        riskScore: "Low (0.1)"
      },
      template: "app/contacts/contactPopover.html"
    }
  }, {
    text: "Alastair Payne",
    description: "Trade, Fixed Income, Securities",
    riskScore: "Low (0.2)"
  }];
  var contactsWithStatus = [{
    text: "AP",
    status: "active"
  }, {
    text: "AH",
    status: "passive"
  }];
  var contactsWithoutStatus = [{
    text: "AP"
  }, {
    text: "AH"
  }];
  var organizationWithName = {
    text: "HPE"
  };
  var organizationWithInvalidStatus = {
    text: "HPE",
    label: "random text"
  };
  var organizationWithRisk = {
    text: "HPE",
    label: "risk"
  };
  var organizationWithExternal = {
    text: "HPE",
    label: "external"
  };
  var organizationWithTooltip = {
    text: "HPE",
    tooltip: "tooltip"
  };
  var active = "rgb(59, 170, 67)";
  var passive = "rgb(204, 204, 204)";


  var tooltipTemplate = '<div class="row">' +
    '<p class="p-l-md m-b-nil" ng-bind="contact.description"></p>' +
    '<span class="p-l-md">Risk Score: </span>' +
    '<span style="color:red" ng-bind="contact.riskScore"></span>' +
    '</div>' +
    '<br/>' +
    '<div class="row">' +
    '<div class="col-md-4">' +
    "<span class='p-md'><i class='hpe-icon hpe-user-female'></i> <span>Profile</span></span>" +
    '</div>' +
    '<div class="col-md-4">' +
    "<span class='p-md'><i class='hpe-icon hpe-inherit'></i> <span>Social</span></span>" +
    '</div>' +
    '<div class="col-md-4" style="white-space: nowrap">' +
    "<span class='p-md'><i class='hpe-icon hpe-history'></i> <span>Messages</span></span>" +
    '</div>' +
    '</div>';

  function create(contacts, organization) {
    return generateElement($scope, contacts, organization).element;
  }

  function createAndReturnScope(contacts, organization) {
    return generateElement($scope, contacts, organization);
  }


  function generateElement($scope, contacts, organization) {
    $scope = $rootScope.$new();
    $scope.contacts = contacts;
    $scope.organization = organization;
    $scope.size = "medium";
    $scope.colorsPrimary = {
      primary: "#01a982",
      secondary: "#ffffff"
    };
    $scope.onOverflowClick = function () {};
    var html = '<contact-group contacts="contacts" organization="organization" size="medium" colors="colorsPrimary" max-contacts="5" overflow-click="onOverflowClick()"></contact-group>';
    var element = $compile(html)($scope);
    $scope.$digest();
    return {
      element: element,
      scope: $scope
    };
  }

  function generateContacts(count) {
    var contacts = [];
    for (var i = 0; i < count; i++) {
      contacts.push({
        text: "A" + i
      });
    }
    return contacts;
  }
  beforeEach(inject(function (_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $templateCache.put('app/contacts/contactPopover.html', tooltipTemplate);
  }));

  describe('status indicators', function () {
    it('should show status indicators if defined', function () {
      var el = create(contactsWithStatus, organizationWithName);
      expect(el.find(".status").length).toBe(2);
    });

    it('should show green for active', function () {
      var el = create(contactsWithStatus, organizationWithName);
      var activeEl = el.find("contact").first();
      expect(activeEl.scope().contact.status).toEqual("active");
      expect(activeEl.find(".status")[0].style.backgroundColor).toBe(active);
    });

    it('should show grey for passive', function () {
      var el = create(contactsWithStatus, organizationWithName);
      var passiveEl = el.find("contact").last();
      expect(passiveEl.scope().contact.status).toEqual("passive");
      expect(passiveEl.find(".status")[0].style.backgroundColor).toBe(passive);
    });

    it('should show nothing if no status was defined', function () {
      var el = create(contactsWithoutStatus, organizationWithName);
      expect(el.find(".contact").length).toBe(2);
      expect(el.find(".status")[0].style.backgroundColor).toEqual("");
      expect(el.find(".status")[1].style.backgroundColor).toEqual("");
    });
  });

  describe('group labels', function () {
    it('should show the risk indicator if defined', function () {
      var el = create(contactsWithoutStatus, organizationWithRisk);
      expect(el.find(".organization-label")[0].classList.contains("risk")).toBe(true);
    });

    it('should show the external indicator if defined', function () {
      var el = create(contactsWithStatus, organizationWithExternal);
      expect(el.find(".organization-label")[0].classList.contains("external")).toBe(true);
    });

    it('should show nothing if no label is defined', function () {
      var el = create(contactsWithStatus, organizationWithName);
      expect(el.find(".organization-label").length).toBe(0);
    });

    it('should show nothing for invalid label text', function () {
      var el = create(contactsWithStatus, organizationWithInvalidStatus);
      expect(el.find(".organization-label").length).toBe(0);
    });
  });

  describe('grouping', function () {
    it('should display a group of contacts behind a single organization', function () {
      var el = create(contactsWithStatus, organizationWithName);
      expect(el.find(".contact").length).toBe(2);
      expect(el.find(".organization").length).toBe(1);
    });

    it('should display a single contact behind an organization', function () {
      var el = create(singleContactWithStatus, organizationWithName);
      expect(el.find(".contact").length).toBe(1);
      expect(el.find(".organization").length).toBe(1);
    });

    it('should accept an array of contacts or a single contact object', function () {
      var el = create(singleContactWithStatusSingleObject, organizationWithName);
      expect(el.find(".contact").length).toBe(1);
      expect(el.find(".organization").length).toBe(1);
    });

    it('should leave a 1px gap to the left of every contact after the first', function () {
      var el = create(contactsWithStatus, organizationWithName);
      expect(el.find(".contact")[0].style.marginLeft).toEqual("0px");
      expect(el.find(".contact")[1].style.marginLeft).toEqual("1px");
    });
    it('should not overflow when contacts equal maximum', function () {
      var contacts = generateContacts(5);
      var el = create(contacts, organizationWithName);
      expect(el.find(".contact").length).toBe(5);
      expect(el.find(".contact-overflow-container").length).toBe(0);
    });
    it('should overflow when contacts exceed maximum', function () {
      var contacts = generateContacts(6);
      var el = create(contacts, organizationWithName);
      expect(el.find(".contact").length).toBe(5);
      expect(el.find(".contact-overflow-container").length).toBe(1);
      expect(el.find(".contact-overflow-label").text()).toBe("1");
    });
  });

  describe('tooltip', function () {
    it('should accept an html tooltip for contacts', function () {
      var el = create(singleContactWithTooltip, organizationWithName);
      expect(el.find(".contact").first().scope().contact.tooltip).toEqual("tooltip");
    });
    it('should accept an html tooltip for organizations', function () {
      var el = create(singleContactWithTooltip, organizationWithTooltip);
      expect(el.find(".organization").first().scope().organization.tooltip).toEqual("tooltip");
    });
  });

  describe('updates', function () {
    it('should update the contact text if the source changes', function () {
      var control = createAndReturnScope(singleContactWithTooltip, organizationWithName);
      expect(control.element.find(".contact").text()).toEqual(singleContactWithTooltip.text);
      control.scope.contacts[0].text = "New Text";
      control.element.scope().$digest();
      expect(control.element.find(".contact").text()).toEqual("New Text");
    });

    it('should add a new contact if the source changes', function () {
      var contacts = [{
        text: "one"
      }, {
        text: "two"
      }];
      var control = createAndReturnScope(contacts, organizationWithName);
      expect(control.element.find(".contact").length).toBe(2);
      control.scope.contacts.push({
        text: "three"
      });
      control.element.scope().$digest();
      expect(control.element.find(".contact").length).toBe(3);
    });

    it('should remove a new contact if the source changes', function () {
      var contacts = [{
        text: "one"
      }, {
        text: "two"
      }];
      var control = createAndReturnScope(contacts, organizationWithName);
      expect(control.element.find(".contact").length).toBe(2);
      control.scope.contacts.pop(1);
      control.element.scope().$digest();
      expect(control.element.find(".contact").length).toBe(1);
    });

    it('should update the contact status if the source changes', function () {
      var control = createAndReturnScope(singleContactWithStatus, organizationWithName);
      expect(singleContactWithStatus[0].status).toEqual("active");
      expect(control.element.find(".status")[0].style.backgroundColor).toBe(active);
      control.scope.contacts[0].status = "passive";
      control.element.scope().$digest();
      expect(control.element.find(".status")[0].style.backgroundColor).toBe(passive);
    });

    it('should update the organization text if the source changes', function () {
      var control = createAndReturnScope(singleContactWithStatus, organizationWithName);
      expect(control.element.find(".organization").text()).toEqual(organizationWithName.text);
      control.scope.organization.text = "New Text";
      control.element.scope().$digest();
      expect(control.element.find(".organization").text()).toEqual("New Text");
    });

    it('should update the organization label if the source changes', function () {
      var control = createAndReturnScope(singleContactWithStatus, organizationWithRisk);
      expect(control.element.find(".organization-label")[0].classList.contains("risk")).toBe(true);
      control.scope.organization = organizationWithExternal;
      control.element.scope().$digest();
      expect(control.element.find(".organization-label")[0].classList.contains("external")).toBe(true);
    });

    it('should overflow if the source changes to exceed the maximum', function () {
      var contacts = generateContacts(5);
      var control = createAndReturnScope(contacts, organizationWithName);
      var el = control.element;
      expect(el.find(".contact").length).toBe(5);
      expect(el.find(".contact-overflow-container").length).toBe(0);
      control.scope.contacts.push({
        text: "Overflow"
      });
      control.element.scope().$digest();
      expect(el.find(".contact").length).toBe(5);
      expect(el.find(".contact-overflow-container").length).toBe(1);
    });
  });

  describe('custom tooltips', function () {

    it('should render custom tooltip when template is provided', function (done) {
      var control = createAndReturnScope(contactsWithCustomTooltip, organizationWithName);
      spyOn($.fn, 'popover');
      angular.element(control.element.find('contact div.contact')[0]).trigger("mouseenter");
      control.scope.$digest();
      setTimeout(function () {
        expect($.fn.popover).toHaveBeenCalled();
        done();
      }, 650);

    });
    it('should not render custom tooltip if template is not provided', function (done) {
      var control = createAndReturnScope(contactsWithCustomTooltip, organizationWithName);
      spyOn($.fn, 'popover');
      angular.element(control.element.find('contact div.contact')[1]).trigger('mouseenter');
      control.scope.$digest();
      setTimeout(function () {
        expect($.fn.popover).not.toHaveBeenCalled();
        done();
      }, 651);
    });
    it('should not render custom tooltip before delay', function (done) {
      var control = createAndReturnScope(contactsWithCustomTooltip, organizationWithName);
      spyOn($.fn, 'popover');
      angular.element(control.element.find('contact div.contact')[0]).trigger("mouseenter");
      control.scope.$digest();
      setTimeout(function () {
        expect($.fn.popover).not.toHaveBeenCalled();
        done();
      }, 250);

    });
  });

  describe("events", function () {
    it("should invoke overflow-click handler on click", function () {
      var contacts = generateContacts(6);
      var control = createAndReturnScope(contacts, organizationWithName);
      spyOn(control.scope, "onOverflowClick");
      control.element.find('.contact-overflow').click();
      expect(control.scope.onOverflowClick).toHaveBeenCalled();
    });
  });
});