GridCtrl.$inject = ['$scope', 'gridPlugins'];

export default function GridCtrl($scope, gridPlugins) {
    var vm = this;

    vm.data = [];

    // expose functions to UI
    vm.triggerEvent = triggerEvent;
    vm.bindEvent = bindEvent;

    // first intialise all plugins
    setupEvents();
    initialisePlugins();

    $scope.$watchCollection('vm.source', function(newValue, oldValue) {
        if(newValue !== oldValue) {
            loadGridData();
        }
    });

    // trigger event on the parent scope
    function triggerEvent(event, data) {
        $scope.$parent.$broadcast(event, data);
    }

    function bindEvent(event, callback) {
        $scope.$parent.$on(event, callback);
    }


    function initialisePlugins() {

        if (vm.plugins === undefined) {
            vm.plugins = {};
        }

        // merge internal plugins
        vm.plugins.keyboardNavigation = gridPlugins.keyboardNavigation($scope);

        for (var pluginName in vm.plugins) {

            // get the current plugin
            var plugin = vm.plugins[pluginName];

            // make state observable
            observeState(plugin);

            if (plugin.init) {
                plugin.init.call(plugin, plugin.state, vm.options);
            }
        }

        pluginsReady();
    }

    function observeState(plugin) {

        $scope.$watch(function () {
            return plugin.state;
        }, function (newValue, oldValue) {
            if (plugin.update && !angular.equals(newValue, oldValue)) {
                plugin.update.call(plugin, plugin.state);
            }
        }, true);
    }

    function pluginsReady() {

        triggerEvent('$pluginsReady');

        // load initial data
        triggerEvent('$gridReload');
    }

    function resetPlugins() {

        for (var pluginName in vm.plugins) {

            var plugin = vm.plugins[pluginName];

            if (plugin.reset) {
                plugin.reset.call(plugin, plugin.state);
            }
        }
    }

    function updatePlugins() {

        for (var pluginName in vm.plugins) {

            var plugin = vm.plugins[pluginName];

            if (plugin.update) {
                plugin.update.call(plugin, plugin.state);
            }
        }
    }

    function destroyPlugins() {

        for (var pluginName in vm.plugins) {

            var plugin = vm.plugins[pluginName];

            if (plugin.destroy) {
                plugin.destroy.call(plugin, plugin.state);
            }
        }
    }

    function getRequestData() {

        // create request object from plugins
        var request = {};

        // iterate the plugins
        for (var pluginName in vm.plugins) {

            var plugin = vm.plugins[pluginName];

            if (plugin.request) {
                request[pluginName] = plugin.request.call(plugin, plugin.state);
            }
        }

        return request;
    }

    function processPlugins(data) {

        // iterate each plugin
        for (var pluginName in vm.plugins) {

            var plugin = vm.plugins[pluginName];

            if (plugin.process) {
                var processedData = plugin.process.call(plugin, plugin.state, data);

                if (processedData !== undefined) {
                    data = processedData;
                }
            }
        }

        return data;
    }

    function loadGridData() {

        // generate request from plugins
        var request = getRequestData();

        var data;

        // if the source is a function then call it
        if(typeof vm.source === 'function') {
            // call the source function with the request object
            data = vm.source.call(null, request);
        } else {
            data = vm.source.slice(0);
        }

        // if the return data is an array
        if (Array.isArray(data)) {

            // get plugins to process the data
            vm.data = processPlugins(data);
        }
    }

    function setupEvents() {

        bindEvent('$gridReload', loadGridData);

        // watch for element being destroyed
        bindEvent('$destroy', function () {

            // destroy plugins
            destroyPlugins();

            // emit table destroyed event
            triggerEvent('$gridDestroyed');
        });

        // watch for plugins being reset
        bindEvent('$pluginsReset', function () {
            resetPlugins();

            triggerEvent('$gridReload');
        });

        bindEvent('$pluginsUpdate', function () {
            updatePlugins();
        });
    }
}
