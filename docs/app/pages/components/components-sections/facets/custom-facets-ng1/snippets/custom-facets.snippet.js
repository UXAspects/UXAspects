angular.module("app").controller("TestCtrl", TestCtrl);

function TestCtrl() {
    var vm = this;

    vm.date = "";
    vm.dateFacetOpened = false;

    vm.dateFacetOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.dateFacetOpened = true;
        vm.prevdate = vm.date;
    };

    vm.change = function () {
        var customdate = new Date(vm.date);
        if (isNaN(customdate)) {
            vm.date = new Date();
        } else if (vm.date !== vm.prevdate) {
            vm.date = new Date(vm.date);
            vm.prevdate = vm.date;
        }
    };

    var selectedDateFilter = function (data) {
        if (vm.compareDate === "") return true;
        return data.date.getDate().toString() + data.date.getMonth().toString() + data.date.getFullYear().toString() === vm.compareDate;
    };

    var customFilters = [];
    var currentDate = "";

    var applyCustomFilter = function () {
        //Pushing the filter to the set of selected filters
        vm.filters.push(customFilters);

        //Updating counts and loading page with selected filter
        vm.updateCounts();
        vm.updateSelectCounts();
        vm.loadPage();
    };

    vm.dateFacetDeselect = function () {
        //Store the current date, and select with this date.
        currentDate = vm.date;

        //make this empty to clear the date field
        vm.date = "";

        customFilters.splice(0, 1);
        vm.filters.push(customFilters);
        applyCustomFilter();
    };

    vm.dateFacetSelect = function () {

        if (vm.date !== "")
            vm.compareDate = vm.date.getDate().toString() + vm.date.getMonth().toString() + vm.date.getFullYear().toString();
        else vm.compareDate = ""; //Returns all the values

        customFilters.push(selectedDateFilter);
        applyCustomFilter();
    };

    vm.dateFacetDisplayFn = function () {
        vm.date = currentDate;

        if (vm.date !== "")
            return vm.date.getDate().toString() + " - " + (vm.date.getMonth() + 1).toString() + " - " + vm.date.getFullYear().toString();
    };

}