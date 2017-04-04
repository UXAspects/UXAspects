import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-charts-spark-chart-ng1',
    templateUrl: './spark-chart-ng1.component.html'
})
@DocumentationSectionComponent('ChartsSparkChartNg1Component')
export class ChartsSparkChartNg1Component {

    private charts: ISparkChart[];

    constructor() {

        this.charts = [
            {
                type: 'spark-chart1',
                value: 35,
                fillHeight: 10,
                topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
                tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'
            },
            {
                type: 'spark-chart3',
                value: 30,
                fillHeight: 5,
                inlineLabel: '30%'
            },
            {
                type: 'spark-chart1',
                value: 35,
                fillHeight: 10,
                topLeftLabel: `<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(35%)</span></span>`,
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">INDEX COVERAGE</span></span>',
                tooltip: 'Spark Line indicator - 2.17MB of 8.2GB occupied (35%)'                
            },
            {
                type: 'spark-chart3',
                value: 55,
                fillHeight: 5,
                inlineLabel: '<span class="spark-label hidden-spark"><span class="x-large">30%</span></span>',
                topLeftLabel: '<span class="spark-label-1 hidden-xxs">STORAGE ON HOLD</span>'
            },
            {
                type: 'spark-chart2',
                value: 55,
                fillHeight: 10,
                topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
            },
            {
                type: 'spark-chart3',
                value: 30,
                fillHeight: 10,
                topLeftLabel: '30%',
                topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
                bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
            },
            {
                type: 'spark-chart4',
                value: 55,
                fillHeight: 10,
                topLeftLabel: "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(55%)</span></span>"
            },
            {
                type: 'spark-chart5',
                value: 30,
                fillHeight: 10,
                topLeftLabel: '30%',
                bottomLeftLabel: '<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>',
                topRightLabel: '<span class="spark-label hidden-spark"><span class="medium light">75.0M</span></span>',
                bottomRightLabel: '<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>'
            }
        ];

    }


    // vm.percentComplete = 35;
    // vm.type = "spark-chart1";
    // vm.label = "<span class='spark-label hidden-xxxs'><span class='large'>21.7</span><span class='medium light'>" +
    //   "&nbsp;MB&nbsp;&nbsp;Items&nbsp;&nbsp;(" + vm.percentComplete + "%)</span></span>";
    // vm.fillheight = 10;

    // vm.percentComplete1 = 55;
    // vm.type1 = "spark-chart2";
    // vm.label1 = "<span class='spark-label hidden-xxs'><span class='large'>8.6</span><span class='medium light'>" +
    //   "&nbsp;GB&nbsp;Disk Space&nbsp;&nbsp;(" + vm.percentComplete1 + "%)</span></span>";

    // vm.type2 = "spark-chart3";
    // vm.type3 = "spark-chart4";
    // vm.type4 = "spark-chart5";

    // vm.label_c1 = "<span class='hidden-spark'>35%</span>";
    // vm.label_c2 = "<span class='hidden-spark'>55%</span>";
    // vm.label_c3 = "<span class='hidden-spark'>8%</span>";

    // vm.label_c4 = "<span class='spark-label'><span class='medium'>22%</span></span>";
    // vm.label_c5 = "<span class='spark-label'><span class='medium'>85%</span></span>";
    // vm.label_c6 = "<span class='spark-label'><span class='medium'>5%</span></span>";
    // vm.label_c7 = "<span class='hidden-spark'>100%</span>";

    // vm.label2 = "<span class='spark-label'><span class='medium light'>" + vm.percentComplete + "%</span></span>";

    // vm.label3 = "<span class='spark-label'><span class='medium light'>" + vm.percentComplete1 + "%</span></span>";

    // vm.label4 = "<span class='spark-label'><span class='medium light'>80%</span></span>";

    // vm.label5 = "<span class='spark-label hidden-spark'><span class='medium light'>75.0M</span></span>";
    // vm.label6 = "<span class='spark-label hidden-xxs'><span class='medium light'>TOTAL</span></span>";
    // vm.label7 = "<span class='spark-label-1 hidden-xxs'>STORAGE ON HOLD</span>";
    // vm.label8 = "<span class='spark-label hidden-spark'><span class='x-large'>30%</span></span>";
    // vm.label9 = "<span class='spark-label hidden-xxxs'><span class='medium light'>INDEX COVERAGE</span></span>";
    // vm.label10 = "<span class='spark-label hidden-xxxs'><span class='medium light'>ITEMS ON HOLD</span></span>";



    // vm.tooltip = "Spark Line indicator - 2.17MB of 8.2GB occupied (35%)";

}

interface ISparkChart {
    type: string;
    value: number;
    fillHeight?: number;
    topLeftLabel?: string;
    topRightLabel?: string;
    bottomLeftLabel?: string;
    bottomRightLabel?: string;
    inlineLabel?: string;
    tooltip?: string;
}