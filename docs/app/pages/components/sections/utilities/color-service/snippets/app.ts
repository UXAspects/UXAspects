import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColorService, ThemeColor } from 'ux-aspects';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html',
    styleUrls: ['./src/app.component.css']
})
export class AppComponent implements OnInit {

    // ux-select configuration properties
    maxHeight: string = '250px';
 
    // Customize settings
    colorSet = new BehaviorSubject<string>('colors');
    
    private colorSets: { sales?: any[] } = {};

    selectedColorSet(): any[] {
        return this.colorSets[this.colorSet.getValue()];
    }

    // configure the directive data
    donutChartData: Chart.ChartData = [{
        data: [33, 34, 33],
        borderWidth: 0
    }];

    donutChartOptions: Chart.ChartOptions;
    donutChartColors: any;

    constructor(public colorService: ColorService) {

        // color list
        this.colorSets.colors = ['Primary', 'Accent', 'Secondary', 'Alternate1', 'Alternate2', 'Alternate3', 'Vibrant1', 'Vibrant2',
                'Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8', 'Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5',
                'Chart6', 'OK', 'Warning', 'Critical'];

        let tooltipBackgroundColor = colorService.getColor('grey2').toHex();

        this.donutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutoutPercentage: 70,
            tooltips: {
                callbacks: {
                    title: (item: Chart.ChartTooltipItem[]) => {
                        return;
                    },
                    label: (item: Chart.ChartTooltipItem, data: any) => {

                        // get the dataset
                        let dataset = data.datasets[0];

                        // calculate the total of all segment values
                        let total = dataset.data.reduce((previousValue: any, currentValue: any) => {
                            return previousValue + currentValue;
                        });

                        // get the value of the current segment
                        let segmentValue = dataset.data[item.index];

                        // calculate the percentage of the current segment compared to the total
                        let precentage = Math.round(((segmentValue / total) * 100));

                        return `${ precentage }%, Sales ${ item.index + 1 }`;
                    }
                },
                backgroundColor: tooltipBackgroundColor,
                cornerRadius: 0,
                displayColors: false
            } as any
        };

        this.donutChartColors = [
            {
                backgroundColor: [
                    colorService.getColor('chart1').toRgb(),
                    colorService.getColor('chart2').toRgb(),
                    colorService.getColor('chart3').toRgb(),
                ],
                hoverBackgroundColor: [
                    colorService.getColor('chart1').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart2').setAlpha(0.3).toRgba(),
                    colorService.getColor('chart3').setAlpha(0.3).toRgba(),
                ]
            }
        ];
    }
    
    changeSalesColor(sales: string, color: string): void {
        
          if (!sales || !color) {
              return;
              
          } else {
        
            switch (sales) {

                case 'sales1':
                    this.sales1 = color;
                    break;

                case 'sales2':
                    this.sales2 = color;
                    break;
                    
                case 'sales3':
                    this.sales3 = color;
            }
              let colorString = this.colorService.getColor(color.toLowerCase()).toHex();
              this.setColor(sales, colorString, false);
          }
      }
      
      setColor(sales: string, color: string, customized: boolean = false): void {
        
          if (!sales || !color) {
              return;
            
          } else if (customized && (color.length != 7)) {
              return;
            
          } else {
            
              let index;
            
              switch (sales) {
                
                  case 'sales1':
                    index = 0;
                    if (customized) {
                        this.sales1 = '';
                    }
                    break;
                    
                  case 'sales2':
                    index = 1;
                    if (customized) {
                        this.sales2 = '';
                    }
                    break;
                    
                  case 'sales3':
                    index = 2;
                    if (customized) {
                        this.sales3 = '';
                    }
              }
              
              let newColor = ThemeColor.parse(color);
              this.donutChartColors[0].backgroundColor[index] = color;
              this.donutChartColors[0].hoverBackgroundColor[index] = newColor.setAlpha(0.3).toRgba();
              this.donutChartColors = this.donutChartColors.slice();
          }
      }
    
    ngOnInit() {
        this.options = this.selectedColorSet();
        this.changeSalesColor('sales1', 'Chart1');
        this.changeSalesColor('sales2', 'Chart2');
        this.changeSalesColor('sales3', 'Chart3');
    }
}