partitionMap.$inject = ['d3PartitionMap'];

export default function partitionMap(d3PartitionMap) {
  return {
    restrict: "E",
    scope: {
      chartData: '=',
      chartOptions: '=?',
      chartLoading: '=?'
    },
    template: require('./partitionMap.html'),
    link: function(scope, element) {
      
      var vm = scope;

      //find chrt container element
      var chartContainer = element.find('div.partition-map');

      //remove any graphics previously drawn in container
      chartContainer.find('svg').remove();

      //if no options are set instantiate an empty object
      var options = vm.chartOptions ? vm.chartOptions : {};

      //initialise chart
      vm.chart = d3PartitionMap.getChart(chartContainer, scope)
        .init(options);

      //if should show loading overlay do it now
      if (vm.chartLoading) {
        vm.chart.setLoading(vm.chartLoading);
      }

      //if we have some data then draw
      if (vm.chartData) {
        vm.chart.draw(angular.copy(vm.chartData));
      }

      //when data source changes update the chart to reflect the new data
      scope.$watch('chartData', function(newData, oldData) {
        if(newData !== oldData) {
          vm.chart.updateData(newData);
        }
      });

      //when loading state changes update the chart to show or hide loading overlay
      scope.$watch('chartLoading', function(newData, oldData) {
        if(newData !== oldData) {
          vm.chart.setLoading(newData);
        }
      });

      //on destroy we should cleanup
      scope.$on("$destroy", function() {
        vm.chart.destroy();
      });
    }

  };
}