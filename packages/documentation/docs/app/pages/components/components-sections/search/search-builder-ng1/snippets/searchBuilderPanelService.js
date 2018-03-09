angular.module('app').service('searchBuilderPanel', searchBuilderPanel);

searchBuilderPanel.$inject = ['$q'];

function searchBuilderPanel($q) {
    var vm = this;

    //store basic panel properties
    vm.panelOpen = false;
    vm.panelWidth = 400;
    vm.panelSide = 'right';

    //store content properties
    vm.panelHeader = '';
    vm.panelTemplate = '';

    //store a deferred object to allow returning of values
    vm.deferred = null;

    //allow the storing of some data while the panel is open
    vm.data = null;

    // allow custom on dismiss event
    vm.dismissEventHandlers = [];

    //action functions
    vm.openPanel = function (data) {
        vm.deferred = $q.defer();

        //store any new data - replace any exisiting data
        vm.data = data;

        //reset dismiss event handlers
        vm.dismissEventHandlers = [];

        //show panel
        vm.panelOpen = true;

        return vm.deferred.promise;
    };

    vm.closePanel = function (result) {
        //if deferred is not null then either resolve or reject deferred
        if (vm.deferred !== null) {
            if (result) vm.deferred.resolve(result);
            else vm.deferred.reject();
        }

        //we no longer need the deferred object - it has been resolved or rejected
        vm.deferred = null;

        //hide the panel
        vm.panelOpen = false;

        //remove any template so everything is reinstantiated correctly
        vm.setPanelHeader('');
        vm.setPanelTemplate('');
    };

    vm.onDismiss = function (eventHandler) {

        //if an argument was passed then we can assume that this is subscribing to the dismiss event
        if (eventHandler) {
            vm.dismissEventHandlers.push(eventHandler);
            return;
        }

        //allow a handler to resolve deferred
        var resolved = false;

        //otherwise call all event handlers and pass them the deferred object in case they want to resolve it
        for (var i = 0; i < vm.dismissEventHandlers.length; i++) {
            var handler = vm.dismissEventHandlers[i];

            //call function with deferred
            var didResolved = handler(vm.deferred);

            if (didResolved === true) resolved = true;
        }

        //if deferred has not yet been resolved then reject
        if (resolved === false && vm.deferred) vm.deferred.reject();

        //remove any template so everything is reinstantiated correctly
        vm.setPanelHeader('');
        vm.setPanelTemplate('');
    };

    //setters
    vm.setPanelHeader = function (header) {
        vm.panelHeader = header;
    };

    vm.setPanelTemplate = function (template) {
        vm.panelTemplate = template;
    };

    vm.setData = function (data) {
        vm.data = data;
    };

    //getters
    vm.getPanelWidth = function () {
        return vm.panelWidth;
    };

    vm.getPanelSide = function () {
        return vm.panelSide;
    };

    vm.getPanelHeader = function () {
        return vm.panelHeader;
    };

    vm.getPanelTemplate = function () {
        return vm.panelTemplate;
    };

    vm.getData = function () {
        return vm.data;
    };

    return vm;
}