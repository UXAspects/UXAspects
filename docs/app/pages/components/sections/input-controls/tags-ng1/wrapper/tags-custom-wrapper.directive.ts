angular.module('app').directive('uxdTagsCustomWrapper', () => {
    return {
        restrict: 'E',
        controller: 'TagsCustomCtrl as vm',
        template: require('./tags-custom-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('TagsCustomCtrl', TagsCustomCtrl);

function TagsCustomCtrl() {
    var vm = this;

    let chance = require('chance').Chance();

    vm.tags3 = [];

    vm.people = [];
    vm.posts = ['Labs', 'Finance', 'Auditing', 'Technical', 'Investor Relations', 'Operations'];
    for (var i = 0; i < 20; i++) {
        var names = chance.name();
        var email = names.toLowerCase().replace(' ', '.');

        vm.people.push({
            name: names,
            email: email + '@business.com',
            position: vm.posts[Math.floor(Math.random() * vm.posts.length)]
        });
    }

    vm.demoOptions3 = {
        placeholder: 'Add tag',
        format: {
            display: 'name',
            key: 'name'
        },
        autocomplete: {
            addFromAutocompleteOnly: true,
            template: 'directives/tagInput/customAutocompleteTemplate.html',
            minLength: 1,
            source: function ($query: any) {
                return vm.people.filter(function (person: any) {
                    return person.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                });
            }
        }
    };
}