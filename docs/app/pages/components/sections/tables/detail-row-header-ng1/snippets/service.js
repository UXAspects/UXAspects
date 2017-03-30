//the sorting and filtering on the table must be handled in a service, below is an example of how this can be achieved.
angular.module("app").service("exampleDataService", exampleDataService);

exampleDataService.$inject = ["$rootScope", "$colorService"];

function exampleDataService($rootScope, $colorService) {
    var detailRowTable = [{
        id: 1,
        rowType: 'hpe-mail',
        address: 'jessica.hardacre@business.com',
        contacts: [{
            text: "Jessica  Hardacre",
        }],
        organization: {
            text: "Trading",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        percent: 39,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.39</span>",
        subject: 're: hi, This is a test email.',
        detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, nunc sit amet faucibus' +
            'dapibus, est purus luctus magna, ut tempus orci quam vitae diam. Aenean congue ultricies leo, ut aliquam nibh.' +
            'Integer facilisis tortor id ligula mollis, eget pretium sapien tempor.' +
            ' Suspendisse quis tempus ante. Curabitur vulputate, felis non blandit dapibus.'

    }, {
        id: 2,
        rowType: 'hpe-mail',
        address: 'oliver.hudson@business.com',
        contacts: [{
            text: "Oliver Hudson",
        }],
        organization: {
            text: "Trading",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 're: hi, Attention! This email is high priority.',
        percent: 55,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.55</span>",
        detail: 'Aenean congue ultricies leo, ut aliquam nibh. Integer facilisis tortor id ligula mollis, eget pretium sapien tempor.' +
            ' Suspendisse quis tempus ante. Curabitur vulputate, felis non blandit dapibus. Duis volutpat nunc vel volutpat nunc vel metus ultrices.'
    }, {
        id: 3,
        rowType: 'hpe-mail',
        address: 'adam.parker@business.com',
        contacts: [{
            text: "Adam Parker",
        }],
        organization: {
            text: "HR",
        },
        colorsPrimary: {
            primary: $colorService.getColor('accent').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 're: hi, There is something related.',
        percent: 44,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.44</span>",
        detail: 'Duis volutpat nunc vel metus ultrices, vel cursus nisl scelerisque. Nulla facilisis ipsum ligula, nec' +
            'blandit dolor aliquam a. Aenean posuere enim ligula, eu convallis mauris pulvinar nec.' +
            'Praesent risus massa, rhoncus pretium massa non, blandit gravida risus. Duis ut orci dolor. Sed congue' +
            'fermentum ante, a pellentesque quam gravida vel.'
    }, {
        id: 4,
        rowType: 'hpe-mail',
        address: 'adam.jackson@business.com',
        contacts: [{
            text: "Adam Jackson",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 're: hi, This is an example.',
        percent: 67,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.67</span>",
        detail: 'Praesent risus massa, rhoncus pretium massa non, blandit gravida risus. Duis ut orci dolor. Sed congue' +
            'fermentum ante, a pellentesque quam gravida vel. Praesent risus massa, rhoncus pretium massa non.'
    }, {
        id: 5,
        rowType: 'hpe-mail',
        address: 'arthur.curry@business.com',
        contacts: [{
            text: "Arthur Curry",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'UX Aspects',
        percent: 98,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.98</span>",
        detail: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }, {
        id: 6,
        rowType: 'hpe-mail',
        address: 'arthur.curry@business.com',
        contacts: [{
            text: "Arthur Curry",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 're: UX Aspects',
        percent: 92,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.92</span>",
        detail: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
    }, {
        id: 7,
        rowType: 'hpe-mail',
        address: 'andrew.robinson@business.com',
        contacts: [{
            text: "Andrew Robinson",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'Software',
        percent: 43,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.43</span>",
        detail: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil ' +
            'molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }, {
        id: 8,
        rowType: 'hpe-mail',
        address: 'john.munn@business.com',
        contacts: [{
            text: "John Munn",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'CAF',
        percent: 13,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.13</span>",
        detail: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,' +
            'omnis voluptas assumenda est, omnis dolor repellendus'
    }, {
        id: 9,
        rowType: 'hpe-mail',
        address: 'lauren.thompson@business.com',
        contacts: [{
            text: "Lauren Thompson",
        }],
        organization: {
            text: "HR",
        },
        colorsPrimary: {
            primary: $colorService.getColor('accent').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'News',
        percent: 83,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.83</span>",
        detail: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores' +
            'et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est' +
            'laborum et dolorum fuga.'
    }, {
        id: 10,
        rowType: 'hpe-mail',
        address: 'bruce.grant@business.com',
        contacts: [{
            text: "Bruce Grant",
        }],
        organization: {
            text: "HR",
        },
        colorsPrimary: {
            primary: $colorService.getColor('accent').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'News',
        percent: 87,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.87</span>",
        detail: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus,' +
            'omnis voluptas assumenda est, omnis dolor repellendus'
    }, {
        id: 11,
        rowType: 'hpe-mail',
        address: 'bruce.grant@business.com',
        contacts: [{
            text: "Bruce Grant",
        }],
        organization: {
            text: "HR",
        },
        colorsPrimary: {
            primary: $colorService.getColor('accent').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 'News',
        percent: 17,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.17</span>",
        detail: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores' +
            'et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est' +
            'laborum et dolorum fuga.'
    }, {
        id: 12,
        rowType: 'hpe-mail',
        address: 'thomas.baker@business.com',
        contacts: [{
            text: "Thomas Baker",
        }],
        organization: {
            text: "Investing",
        },
        colorsPrimary: {
            primary: $colorService.getColor('primary').toHex(),
            secondary: "#ffffff"
        },
        medium: 'small',
        subject: 're: UX Aspects',
        percent: 38,
        type: "spark-primary",
        sparklabel: "<span class=\'hidden-spark\'>0.38</span>",
        detail: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
    }];

    var detailRowOriginal = detailRowTable;

    return {
        getDetailRowTable: getDetailRowTable,
        getFilterList: getFilterList,
        applyFilters: applyFilters
    }

    function detailRowSortByKey(array, key, ascending) {
        return array.sort(function (a, b) {

            var ascend0 = 1;
            var ascend1 = 2;
            var ascend2 = 4;

            if (ascending[0] === true) ascend0 = 0;
            if (ascending[1] === true) ascend1 = 0;
            if (ascending[2] === true) ascend2 = 0;

            var sortCase = ascend0 + ascend1 + ascend2;
            var x0 = a[key[0]];
            var y0 = b[key[0]];
            var x1 = a[key[1]];
            var y1 = b[key[1]];
            var x2 = a[key[2]];
            var y2 = b[key[2]];
            
            switch (sortCase) {
                case 0:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 1:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 2:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 3:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 4:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 5:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 6:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a['id'] < b['id']) ? -1 : 1)))))));
                case 7:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a['id'] < b['id']) ? -1 : 1)))))));
            }
        });
    }

    function applyFilters(filters) {
        detailRowTable = [];
        if (filters.length !== 0) {
            for (var i = 0; i < detailRowOriginal.length; i++) {
                for (var j = 0; j < filters.length; j++) {
                    if (detailRowOriginal[i].address === filters[j]) {
                        detailRowTable.push(detailRowOriginal[i]);
                    }
                }
            }
        } else
            detailRowTable = detailRowOriginal;
        $rootScope.$broadcast('detailRowTableUpdated');
    }

    function getFilterList() {
        var filterList = [];
        for (var i = 0; i < detailRowOriginal.length; i++) {
            if (filterList.indexOf(detailRowOriginal[i].address) < 0) {
                filterList.push(detailRowOriginal[i].address);
            }
        }
        return filterList;
    }


    function getDetailRowTable(sorter, ascending) {
        detailRowSortByKey(detailRowTable, sorter, ascending);
        return detailRowTable;
    }

}