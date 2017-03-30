export default function HierarchyBarCtrl() {
    var vm = this;

    vm.hierarchyBarOverflow = false;
    vm.hiddenHierarchyBar = [];

    var states = [];

    var defaultOptions = {
        enabled: true,
        overview: null,
        image: null,
        valueFormatter: function(data) {
            return data.name ? data.name : '';
        }
    };

    vm.options = $.extend(true, defaultOptions, vm.options);

    if (vm.options.action) {
        vm.popoverTrigger = "outsideClick";
    } else {
        vm.popoverTrigger = "insideHover";
    }

    vm.action = function(crumb) {

        if (!vm.options.action || !vm.options.action.event || vm.isLoading(crumb)) {
            return;
        }

        // call function and check for a promise being returned
        let promise = vm.options.action.event(crumb);

        if (!promise) {
            // if there is no promise then indicate that it isn't loading
            vm.setLoading(crumb, false);
        } else {
            // otherwise indicate loading is occuring
            vm.setLoading(crumb, true);

            // wait for promise to resolve
            promise.then(() => {
                vm.setLoading(crumb, false);
            });
        }
    };

    vm.getHierarchyBarChildren = function(crumb) {
        return crumb.children ? crumb.children : crumb._children;
    };

    vm.getHierarchyBarName = function(data) {
        return vm.options.valueFormatter(data);
    };

    vm.selectNodeCallback = function(crumb) {

        // ensure it has been specified before calling
        if (this.selectNode) {
            this.selectNode()(crumb);
        }
    };

    vm.setLoading = function(crumb, state) {
        let matches = states.filter(state => state.crumb === crumb);

        if (matches.length > 0) {
            matches[0].loading = state;
        } else {
            states.push({
                crumb: crumb,
                loading: state
            });
        }
    };

    vm.isLoading = function(crumb) {
        let matches = states.filter(state => state.crumb === crumb);
        return matches[0] ? matches[0].loading : false;
    };

}