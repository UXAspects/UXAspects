angular.module('app').directive('uxdContactsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./contacts-wrapper.directive.html'),
        controller: ['$templateCache', '$colorService', function ($templateCache, $colorService) {
            $templateCache.put('contacts-popover.html', require('../snippets/contacts-popover.html'));

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
                primary: $colorService.getColor('accent').toHex(),
                secondary: $colorService.getColor('secondary').toHex(),
                active: $colorService.getColor('alternate1').toHex(),
                passive: $colorService.getColor('grey5').toHex()
            };

            vm.colorsAlt = {
                primary: $colorService.getColor('alternate2').toHex(),
                secondary: $colorService.getColor('secondary').toHex(),
                active: $colorService.getColor('alternate1').toHex(),
                passive: $colorService.getColor('grey5').toHex()
            };
        }],
        controllerAs: 'vm'
    };
});
