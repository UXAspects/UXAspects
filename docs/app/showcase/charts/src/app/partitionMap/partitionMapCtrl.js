(function() {
  angular.module("app").controller("PartitionMapCtrl", PartitionMapCtrl);

  function PartitionMapCtrl() {
    var vm = this;

    vm.options = {
      edit: {
        text: 'Edit',
        image: 'img/pencil.png',
        click: function() {
          //perform action when the edit option is clicked
        },
        editor: {
          enabled: true,
          finishText: 'Done',
          noGroupsText: 'No groups available',
          availableGroups: ['Custodian', 'Language', 'Data Source'],
          maxRows: 3,
          minRows: 1,
          onFinish: function() {
          }
        }
      },
      select: function() {
        //perform action when a segment has been clicked
      },
      maximize: {
      	disableScrolling: false,
      	buttonVisible: false,
      	isMaximized: true,
        fillScreen: true,
        sidePanelWidth: 235,
        shouldResize: true,
        onToggle: function(action) {

          //the following changes are to allow documentation to draw correctly

          //resize containing element
          var containingElement = document.getElementsByClassName('partition-map-box')[0];
          containingElement.style.height = action ? 'auto' : '600px';

          //reposition the details div
          var details = document.getElementById('partition-details');
          if (details) {
            details.style.position = action ? 'relative' : '';
            details.style.top = action ? '-93px' : '';
          }
        }
      },
      popoverTemplate: 'app/views/partitionMap/template/popoverTemplate.html',
      popoverEnabled: true,
      valueFormatter: function(value) {
        return value;
      },
      noDataLabel: 'No data to display',
      loadingLabel: 'Loading...',
      popoverDelay: 650
    };

    vm.isLoading = false;

    vm.chartData = [{
      label: 'Home',
      image: 'img/home.png',
      groupName: 'Hard Drives',
      children: [{
        label: chance.name(),
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
        label: chance.name(),
        groupName: 'Custodian',
        children: [{
          label: 'English',
          groupName: 'Language',
          children: [
            {
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
        }]
      }]
    }];

  }
})();
