angular.module('app').controller('TagsCtrl', TagsCtrl);

function TagsCtrl() {
    var vm = this;

    vm.tags = ["Redundant", "Trivial", "Obsolete", "Deletion Scheduled", "SharePoint 2007 Repository"];
    vm.tags2 = [];
    vm.tags3 = [];

    vm.tagSet = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

    vm.people = [];
    vm.posts = ['Labs', 'Finance', 'Auditing', 'Technical', 'Investor Relations', 'Operations'];
    for (var i = 0; i < 20; i++) {
        var names = chance.name();
        var email = names.toLowerCase().replace(" ", ".");

        vm.people.push({
            name: names,
            email: email + '@business.com',
            position: vm.posts[Math.floor(Math.random() * vm.posts.length)]
        });
    }

    vm.demoOptions1 = {
        placeholder: "Add tag",
        maxNumberTags: 8,
        maxTagsMessage: "Maximum number of tags has been added"
    };

    vm.demoApi = {
        onTagAdding: function () {
            if (vm.tags.length >= vm.demoOptions1.maxNumberTags) {
                return false;
            }
            return true;
        },

        onTagRemoving: function () {
            return true;
        }
    };

    vm.demoOptions2 = {
        placeholder: "Add tag",
        autocomplete: {
            addFromAutocompleteOnly: true
        }
    };

    vm.demoOptions3 = {
        placeholder: "Add tag",
        format: {
            display: "name",
            key: "name"
        },
        autocomplete: {
            addFromAutocompleteOnly: true,
            template: "directives/tagInput/customAutocompleteTemplate.html",
            minLength: 1,
            source: function ($query) {
                return vm.people.filter(function (person) {
                    return person.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                });
            }
        }
    };
}