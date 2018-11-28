import { Component } from '@angular/core';

@Component({
    selector: 'spark-app',
    templateUrl: './spark.testpage.component.html',
})
export class SparkTestPageComponent {
    multiValueChart = {
        value: [70, 20, 10],
        barColor: ['#1aac60', '#fcdb1f', '#e5004c'],
        barHeight: 6,
        topLeftLabel: `<span class='spark-label'>Multi-value</span>`,
        ariaLabels: ['Segment One', 'Segment Two', 'Segment Three']
    };

    singleValueChart = {
        theme: 'vibrant2',
        value: 30,
        barHeight: 8,
        topLeftLabel: '30%',
        bottomLeftLabel: `<span class="spark-label hidden-xxxs"><span class="medium light">ITEMS ON HOLD</span></span>`,
        topRightLabel: `<span class="spark-label hidden-spark"><span class="medium light">75.0 MB</span></span>`,
        bottomRightLabel: `<span class="spark-label hidden-xxs"><span class="medium light">TOTAL</span></span>`,
        ariaLabel: 'Spark Chart Aria'
    };
}
