angular.module('app').controller('OrganizationChartDemoCtrl', OrganizationChartDemoCtrl);

function OrganizationChartDemoCtrl() {
    var vm = this;

    var adminIcon = 'https://uxaspects.github.io/UXAspects/assets/img/IconManagerColorized.png';
    var userIcon = 'https://uxaspects.github.io/UXAspects/assets/img/IconCustodianColorized.png';

    var internationManager = {
        name: chance.name(),
        position: 'International Manager',
        phone: chance.phone(),
        email: 'inat_manager@company.com',
        image: adminIcon
    };

    var chiefTechnicalOfficer = {
        name: chance.name(),
        position: 'Chief Technical Officer',
        phone: chance.phone(),
        email: 'cto@company.com',
        image: adminIcon
    };

    vm.options = {
        hierarchyBar: {
            image: function (data) {
                return data.image;
            }
        },
        nodes: {
            template: 'chart-node.html'
        },
        reveal: function () {

            if (vm.data.name === internationManager.name) {

                // add a new root node
                chiefTechnicalOfficer.children = [vm.data];
                vm.data = chiefTechnicalOfficer;

                // hide the button now
                return false;

            } else {

                // add a new root node                    
                internationManager.children = [vm.data];
                vm.data = internationManager;
            }
        },
        search: {
            enabled: true,
            placeholder: 'Enter name or job title',
            template: 'search-item.html',
            query: function (query, node) {
                // return true if the name or title contains the search query
                return node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                    node.position.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            }
        }
    };

    vm.data = {
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
                email: 'accounting@company.com',
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
}