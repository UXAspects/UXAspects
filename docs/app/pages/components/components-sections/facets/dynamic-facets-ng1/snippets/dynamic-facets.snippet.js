angular.module("app").controller("TestCtrl", ["exampleDataService", TestCtrl]);

function TestCtrl(exampleDataService) {
    var vm = this;

    vm.service = exampleDataService;

    //Example configuration
    vm.facetLongListConfig = {
        minCharacters: 3,
        minIndividualItems: 0,
        maxIndividualItems: 10,
        maxDisplayableItems: 10,
        showZero: false
    };

    vm.facetOptions = {
        title: "Author",
        options: vm.service.users.sort().map(function (user) {
            //Logic to filter the matching names
            return {
                name: user,
                count: parseInt(Math.random() * 30),
                filter: function (data) {
                    return data.name === user;
                }
            };
        })
    };

    vm.facetOptions.options.forEach(function (option) {
        option.select = function () {
            console.log("Facet Selected");
            //Implement logic when facet is selected
        };

        option.deselect = function () {
            console.log("Facet Deselected");
            //Implement logic when facet is deselected
        };
    });

    vm.facetOptionTypeahead = "option.name + ' - ' + option.count + ' books'";

    vm.longListCallback = function (textInput, optionList) {
        return optionList;
    };
}