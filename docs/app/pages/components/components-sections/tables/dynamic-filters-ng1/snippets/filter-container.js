angular.module("app").controller("TestCtrl", TestCtrl);

function TestCtrl() {
    var vm = this;

    var getMyItems = function (data) {
        return data.name === "Hazel Mclaughlin";
    };

    var getAll = function () {
        return true;
    };

    //Sample configuration
    vm.filterConfig = {
        minCharacters: 3,
        maxIndividualItems: 1,
        maxDisplayableItems: 10
    };

    TestCtrl.prototype.longListCallback = function (textInput, optionList) {
        return optionList;
    };

    vm.dropdownFilters = [];

    vm.dropdownFilters.push({
        title: "AUTHOR",
        options: [{
            name: "AUTHOR",
            filtername: getAll,
            deselect: [getMyItems],
            default: true
        }]
    });

    TestCtrl.prototype.generateFilters = function () {
        var vm = this;

        vm.dropdownFilters.forEach(function (filter) {
            filter.options.forEach(function (option) {
                option.select = function () {
                    //Implement logic to filter using the selected filter
                    console.log("Filter selected");
                };
            });
        });
    };

    var names = [
        "Hazel Mclaughlin",
        "Joyce Stokes",
        "Jeffery Smith",
        "Dwayne Rodgers",
        "Dean Henry",
        "Dexter Greer"
    ].sort();

    //create name filters
    for (var i = 0; i < names.length; i++) {
        var fn = createFilterFunction(names[i]);
        vm.dropdownFilters[0].options.push({
            name: names[i],
            filtername: fn,
            deselect: [fn],
            default: false
        });
    }

    function createFilterFunction(str) {
        return function (data) {
            return data.name === str;
        }
    }

    vm.generateFilters();
}