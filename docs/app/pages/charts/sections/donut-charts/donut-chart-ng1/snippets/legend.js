legend: {
  show: true,
  backgroundColor: "transparent",
  labelFormatter: function(label, series) {
    var total = 0;
    for (var i = 0; i < vm.donutChart.data.length; i++) {
      total += vm.donutChart.data[0].data;
    }
    var percent = (series.data[0][1] / total) * 100;
    if (percent < 2) label += '<span> (<2%)</span>';

    return  '<span class="legend-styling">' + label + '</span>';
  },
  labelBoxBorderColor: "transparent"
}