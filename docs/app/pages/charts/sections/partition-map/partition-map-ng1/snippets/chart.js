angular.module("app").controller("PartitionMapCtrl", PartitionMapCtrl);

function PartitionMapCtrl() {
    var vm = this;

    vm.options = {
        edit: {
            text: 'Edit',
            image: 'https://uxaspects.github.io/UXAspects/assets/img/pencil.png',
            click: function (root) {
                //perform action when the edit option is clicked
            },
            editor: {
                enabled: true,
                finishText: 'Done',
                noGroupsText: 'No groups available',
                availableGroups: ['Custodian', 'Language', 'Data Source'],
                maxRows: 3,
                minRows: 1,
                onFinish: function (order) {

                }
            }
        },
        select: function (data) {
            //perform action when a segment has been clicked
        },
        maximize: {
            disableScrolling: false,
            buttonVisible: true,
            isMaximized: false,
            fillScreen: true,
            sidePanelWidth: 235,
            shouldResize: true,
            onToggle: function (action) {

            }
        },
        popoverTemplate: "templateId.html",
        popoverEnabled: true,
        valueFormatter: function (value) {
            return value.toLocaleString();
        },
        noDataLabel: 'No data to display',
        loadingLabel: 'Loading...',
        popoverDelay: 650,
        buttonOffset: {
            maximize: {
                x: 40,
                y: 0
            },
            minimize: {
                x: 0,
                y: 0
            }
        }
    };

    vm.isLoading = false;

    vm.chartData = [{
        label: 'Home',
        image: 'https://uxaspects.github.io/UXAspects/assets/img/home.png',
        groupName: 'Hard Drives',
        children: [{
            label: 'Jennifer Bailey',
            groupName: 'Custodian',
            children: [{
                label: 'English',
                groupName: 'Language',
                children: [{
                    label: 'Email',
                    groupName: 'Data Source',
                    value: 40
                }, {
                    label: 'Microsoft Word',
                    groupName: 'Data Source',
                    value: 10
                }]
            }, {
                label: 'German',
                groupName: 'Language',
                children: [{
                    label: 'Email',
                    groupName: 'Data Source',
                    value: 10
                }, {
                    label: 'Microsoft Word',
                    groupName: 'Data Source',
                    value: 5
                }]
            }]
        }, {
            label: 'Stephen Sheridan',
            groupName: 'Custodian',
            children: [{
                    label: 'English',
                    groupName: 'Language',
                    children: [{
                        label: 'Email',
                        groupName: 'Data Source',
                        value: 15
                    }, {
                        label: 'Microsoft Word',
                        groupName: 'Data Source',
                        value: 5
                    }],
                },
                {
                    label: 'German',
                    groupName: 'Language',
                    children: [{
                        label: 'Email',
                        groupName: 'Data Source',
                        value: 10
                    }, {
                        label: 'Microsoft Word',
                        groupName: 'Data Source',
                        value: 5
                    }]
                }
            ]
        }]
    }];

}