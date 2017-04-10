angular.module("app").controller("SparkChartCtrl", SparkChartCtrl);

function SparkChartCtrl() {
    var vm = this;

    vm.percentComplete = 35;
    vm.type = "spark-chart1";
    vm.label = "<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>"
                + " MB  Items  (" + vm.percentComplete + "%)</span></span>";
    vm.fillheight = 10;

    vm.percentComplete1 = 55;
    vm.type1 = "spark-chart2";
    vm.label1 = "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>"
                   + " GB Disk Space  (" + vm.percentComplete1 + "%)</span></span>";

    vm.type2 = "spark-chart3";
    vm.type3 = "spark-chart4";
    vm.type4 = "spark-chart5";
    vm.label5= "<span class='spark-label hidden-spark'><span class='medium light'>75.0M</span></span>";
    vm.label6= "<span class='spark-label hidden-xxs'><span class='medium light'>TOTAL</span></span>";
    vm.label7 = "<span class='spark-label-1 hidden-xxs'>STORAGE ON HOLD</span>";
    vm.label8 = "<span class='spark-label hidden-spark'><span class='x-large'>30%</span></span>";
    vm.label9 = "<span class='spark-label hidden-xxxs'><span class='medium light'>INDEX COVERAGE</span></span>";
    vm.label10 = "<span class='spark-label hidden-xxxs'><span class='medium light'>ITEMS ON HOLD</span></span>";

    vm.tooltip = "Spark Line indicator - 2.17MB of 8.2GB occupied (35%)";
}