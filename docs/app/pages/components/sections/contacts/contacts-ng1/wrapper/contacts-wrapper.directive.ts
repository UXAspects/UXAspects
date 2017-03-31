angular.module('app').directive('uxdContactsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./contacts-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            // $templateCache.put('contacts-popover.html', require('../snippets/contacts-popover.html'));
            $templateCache.put('contacts-popover.html', `<h1>Hello, world!</h1>`);

            var vm = this;

            vm.contacts = [{
                text: 'RL',
                status: 'active',
                customTooltip: {
                    template: 'contacts-popover.html',
                    tooltipPosition: 'top',
                    data: {
                        description: 'Finance, Variable Income, Storage',
                        riskScore: 'Low (0.1)',
                        longName: 'Ryan Lawrence',
                    }
                }
            }, {
                text: 'SH',
                status: 'passive',
                customTooltip: {
                    template: 'contacts-popover.html',
                    tooltipPosition: 'top',
                    data: {
                        description: 'Trade, Fixed Income, Securities',
                        riskScore: 'Low (0.2)',
                        longName: 'Simon Hemmings'
                    }

                }
            }, {
                text: 'PMG',
                status: 'active',
                customTooltip: {
                    template: 'contacts-popover.html',
                    tooltipPosition: 'top',
                    data: {
                        description: 'Trade, Fixed Income, Securities',
                        riskScore: 'Low (0.2)',
                        longName: 'Peter McGrath'
                    }
                }
            }, {
                text: 'RM',
                status: 'active',
                customTooltip: {
                    template: 'contacts-popover.html',
                    tooltipPosition: 'top',
                    data: {
                        description: 'Trade, Fixed Income, Securities',
                        riskScore: 'Low (0.2)',
                        longName: 'Rebecca Martin'
                    }

                }
            }];

            vm.otherContacts = [{
                text: 'Claire Dowd',
                customTooltip: {
                    template: 'contacts-popover.html',
                    data: {
                        description: 'Trade, Fixed Income, Securities',
                        riskScore: 'Low (0.2)'
                    }
                }
            }, {
                text: 'David Bond',
                customTooltip: {
                    template: 'contacts-popover.html',
                    data: {
                        description: 'Trade, Fixed Income, Securities',
                        riskScore: 'Low (0.2)'
                    }
                }
            }];

            vm.organization = {
                text: 'Investing',
                label: 'risk'
            };

            vm.otherOrganization = {
                text: 'Trading',
                label: 'external'
            };

            vm.size = 'medium';

            vm.colors = {
                primary: '#7b63a3',
                secondary: '#ffffff'
            };

            vm.colorsAlt = {
                primary: '#025662',
                secondary: '#ffffff'
            };
        }],
        controllerAs: 'vm'
    };
});
