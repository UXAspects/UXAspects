angular.module('app').controller('HierarchyBarDemoCtrl', HierarchyBarDemoCtrl);

HierarchyBarDemoCtrl.$inject = ["$q", "$timeout"];

function HierarchyBarDemoCtrl($q, $timeout) {
    var vm = this;

    var adminIcon = "https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/IconManagerColorized.png";
    var userIcon = "https://pages.github.hpe.com/ashley-glenn-hunter/ux-aspects/assets/img/IconCustodianColorized.png";

    vm.options = {
        image: function (data) {
            return data.image;
        },
        action: {
            title: "Loading",
            event: function (crumb) {
                if (crumb.children) {
                    return;
                }

                var defer = $q.defer();

                $timeout(function () {
                    crumb.children = [{
                        name: chance.name(),
                        position: 'Intern',
                        phone: chance.phone(),
                        email: 'intern@company.com',
                        image: adminIcon
                    }, {
                        name: chance.name(),
                        position: 'Intern',
                        phone: chance.phone(),
                        email: 'intern@company.com',
                        image: adminIcon
                    }, {
                        name: chance.name(),
                        position: 'Intern',
                        phone: chance.phone(),
                        email: 'intern@company.com',
                        image: adminIcon
                    }];

                    addNodeParentRefs(crumb);

                    defer.resolve();

                }, 2000);

                return defer.promise;
            }
        }
    };

    vm.breadcrumbs = {
        name: chance.name(),
        position: 'National Manager',
        phone: chance.phone(),
        email: 'nat_manager@company.com',
        image: adminIcon,
        children: [{
            name: chance.name(),
            position: 'Regional Manager',
            phone: chance.phone(),
            email: 'reg_manager@company.com',
            image: adminIcon,
            children: [{
                name: chance.name(),
                position: 'Assistant',
                phone: chance.phone(),
                email: 'assistant@company.com',
                image: adminIcon,
                children: [{
                    name: chance.name(),
                    position: 'Human Resources',
                    phone: chance.phone(),
                    email: 'hr@company.com',
                    image: userIcon
                }, {
                    name: chance.name(),
                    position: 'Engineer',
                    phone: chance.phone(),
                    email: 'tech@company.com',
                    image: userIcon
                }, {
                    name: chance.name(),
                    position: 'Quality Assurance',
                    phone: chance.phone(),
                    email: 'qa@company.com',
                    image: userIcon
                }]
            }, {
                name: chance.name(),
                position: 'Manager',
                phone: chance.phone(),
                email: 'manager@company.com',
                active: true,
                image: userIcon,
                children: [{
                    name: chance.name(),
                    position: 'Sales',
                    phone: chance.phone(),
                    email: 'sales1@company.com',
                    image: userIcon
                }, {
                    name: chance.name(),
                    position: 'Office Administrator',
                    phone: chance.phone(),
                    email: 'office_admin@company.com',
                    image: userIcon,
                    children: [{
                        name: chance.name(),
                        position: 'Receptionist',
                        phone: chance.phone(),
                        email: 'reception@company.com',
                        image: userIcon
                    }]
                }, {
                    name: chance.name(),
                    position: 'Sales',
                    phone: chance.phone(),
                    email: 'sales2@company.com',
                    image: userIcon
                }]
            }, {
                name: chance.name(),
                position: 'Head of Accounting',
                phone: chance.phone(),
                email: 'head_accounting@company.com',
                image: userIcon,
                children: [{
                    name: chance.name(),
                    position: 'Accountant',
                    phone: chance.phone(),
                    email: 'accountant1@company.com',
                    image: userIcon
                }, {
                    name: chance.name(),
                    position: 'Accountant',
                    phone: chance.phone(),
                    email: 'accountant2@company.com',
                    image: userIcon
                }]
            }]
        }]
    };

    // add references to parent nodes
    addNodeParentRefs();

    function addNodeParentRefs(node, parent) {

        if (!node) {
            node = vm.breadcrumbs;
        }

        // if there is a parent then add reference to it
        if (parent) {
            node.parent = parent;
        }

        // get node children
        var children = node.children || node._children;

        // check if there are children
        if (!children || children.length === 0) {
            return;
        }

        // loop through each child and get its children
        for (var idx = 0; idx < children.length; idx++) {

            var child = children[idx];

            addNodeParentRefs(child, node);
        }
    }

    vm.selectBreadcrumb = function (data) {

        // reset the breadcrumb list
        vm.breadcrumbs = [];

        // ensure a node is selected
        if (!data) {
            return;
        }

        // get the current node
        var node = data;

        // add the current node to the list
        vm.breadcrumbs.push(node);

        // add all its parents
        while (node.parent) {

            // set node to reference its parent
            node = node.parent;

            // add this node to the list
            vm.breadcrumbs.push(node);
        }

        // reverse the array to get the desired order
        vm.breadcrumbs.reverse();
    };

    vm.selectBreadcrumb(vm.breadcrumbs);

}