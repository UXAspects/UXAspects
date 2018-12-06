import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ColorService } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
  selector: 'uxd-charts-multiple-axis-line-chart-ng1',
  templateUrl: './multiple-axis-line-chart-ng1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ChartsMultipleAxisLineChartNg1Component')
export class ChartsMultipleAxisLineChartNg1Component extends BaseDocumentationSection implements ICodePenProvider {

  data: any[];
  options: any;

  codepen: ICodePen = {
    html: this.snippets.raw.chartHtml,
    htmlAttributes: {
      'ng-controller': 'MultipleAxisLineChartCtrl as lc'
    },
    js: [this.snippets.raw.chartJs]
  };

  constructor(colorService: ColorService, @Inject('flotDataService') flotDataService: any) {
    super(require.context('./snippets/', false, /(html|css|js|ts)$/));

    let flotChartColors = {
      chart1Color: colorService.getColor('chart1').toRgb(),
      chart2Color: colorService.getColor('chart2').toRgb(),
      gridColor: colorService.getColor('grey4').toHex(),
      tickColor: colorService.getColor('grey6').toHex(),
      borderColor: colorService.getColor('grey2').setAlpha(0.5).toRgba()
    };

    let oilprices = flotDataService.getOilPrices();

    let exchangerates = flotDataService.getExchangeRates();

    this.data = [{
      data: oilprices,
      label: 'Oil price ($)',
      lines: {
        show: true,
        fill: true,
        lineWidth: 1,
        fillColor: {
          colors: [{
            opacity: 0.1
          }, {
            opacity: 0.1
          }]
        }
      },
      shadowSize: 0,
      highlightColor: [flotChartColors.chart1Color]
    }, {
      data: exchangerates,
      label: 'USD/EUR exchange rate',
      yaxis: 2,
      lines: {
        show: true,
        fill: true,
        lineWidth: 1,
        fillColor: {
          colors: [{
            opacity: 0.2
          }, {
            opacity: 0.2
          }]
        }
      },
      shadowSize: 0,
      highlightColor: [flotChartColors.chart2Color]
    }];

    this.options = {
      xaxes: [{
        mode: 'time'
      }],
      yaxes: [{
        min: 0
      }, {
        // align if we are to the right
        position: 'right',
        alignTicksWithAxis: 1,
        tickFormatter: this.euroFormatter
      }],
      legend: {
        position: 'sw'
      },
      colors: [flotChartColors.chart1Color, flotChartColors.chart2Color],
      grid: {
        color: [flotChartColors.gridColor],
        clickable: true,
        tickColor: [flotChartColors.tickColor],
        borderWidth: {
          'bottom': 1,
          'left': 1,
          'top': 0,
          'right': 0
        },
        borderColor: {
          'bottom': [flotChartColors.borderColor],
          'left': [flotChartColors.borderColor]
        },
        hoverable: true // IMPORTANT! this is needed for tooltip to work,
      },
      tooltip: {
        show: true,
        shifts: {
          x: 0,
          y: -35
        },
        content: '%s for %x was %y',
        xDateFormat: '%y-%0m-%0d'
      }
    };
  }

  euroFormatter(v: number, axis: any) {
    return v.toFixed(axis.tickDecimals) + '€';
  }

}