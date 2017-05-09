webpackJsonp([50],{1644:function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var a,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var d=t.length-1;d>=0;d--)(a=t[d])&&(i=(r<3?a(i):r>3?a(e,n,i):a(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},r=this&&this.__param||function(t,e){return function(n,o){e(n,o,t)}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),d=n(259),s=n(141),l=function(){function t(t,e){var o=this;this.lineDataService=t,this.htmlCode=n(2329),this.jsCode=n(2330),this.serviceJs=n(2332),this.rescaleJs=n(2331),this.codepen={html:this.htmlCode,htmlAttributes:{"ng-controller":"TimelineChartCtrl as tc"},js:[this.jsCode]};var a={chartColor:e.getColor("chart1").toRgb(),chartFill:e.getColor("chart1").setAlpha(.2).toRgba(),gridColor:e.getColor("grey4").toHex(),tickColor:e.getColor("grey6").toHex(),borderColor:e.getColor("grey2").setAlpha(.5).toRgba(),transparent:"rgba(0, 0, 0, 0)"},r=this.randomTimelineData();this.timelineData=[{data:r,lines:{show:!0,fill:!0,lineWidth:1,fillColor:{colors:[{opacity:0},{opacity:.3}]}},shadowSize:0}],this.timelineOptions={xaxes:[{mode:"time"}],yaxes:[{min:0,max:200,show:!1}],colors:[a.chartColor],grid:{color:[a.gridColor],tickColor:[a.transparent]},tooltip:!1,timeline:{color:a.chartFill,start:12057084e5,end:1217628e6,zoom:{enabled:!0,minimumRange:6048e5},keyboardNavigation:!0,dragHandles:{width:5,color:a.chartColor,tooltips:{enabled:!0,onHover:!0,onDrag:!0,onDragEnd:!1},tooltipFormatter:function(t){var e=new Date(t),n=["January","February","March","April","May","June","July","August","September","October","November","December"];return e.getDate()+" "+n[e.getMonth()]+" "+e.getFullYear()}},enabled:!0,callback:function(t){o.detailedOptions.xaxes[0].min=t.start,o.detailedOptions.xaxes[0].max=t.end}}},this.detailedData=[{data:r,lines:{show:!0,fill:!0,lineWidth:1,fillColor:{colors:[{opacity:.1},{opacity:.1}]}},shadowSize:0}],this.detailedOptions={xaxes:[{mode:"time",min:12057084e5,max:1217628e6,tickColor:[a.transparent]}],yaxes:[{min:0,max:201}],legend:{show:!1},colors:[a.chartColor],grid:{color:[a.gridColor],tickColor:[a.tickColor],borderWidth:{bottom:1,left:1,top:0,right:0},borderColor:{bottom:[a.borderColor],left:[a.borderColor]},hoverable:!0},tooltip:{show:!0,shifts:{x:0,y:-48},content:"<strong>%x</strong><br/>%y,000 items added"}}}return t.prototype.randomTimelineData=function(){for(var t=[],e=11676924e5;e<=12209112e5;e+=3456e5)e>120445771e4&&e<1207142075e3||(t.push(e),t.push(Math.floor(70*Math.random()+80)));return t=this.lineDataService.addZeroPoints(t,2592e5)},t}();l=o([i.Component({selector:"uxd-charts-timeline-chart-ng1",template:n(1998),changeDetection:i.ChangeDetectionStrategy.OnPush}),d.DocumentationSectionComponent("ChartsTimelineChartNg1Component"),r(0,i.Inject("lineDataService")),a("design:paramtypes",[Object,s.ColorService])],l),e.ChartsTimelineChartNg1Component=l},1645:function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var a,r=arguments.length,i=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var d=t.length-1;d>=0;d--)(a=t[d])&&(i=(r<3?a(i):r>3?a(e,n,i):a(e,n))||i);return r>3&&i&&Object.defineProperty(e,n,i),i},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(1644),d=n(140),s=n(18),l=n(260),h=n(263),c=n(261),u=n(262),p=[i.ChartsTimelineChartNg1Component],b=[{path:"**",component:c.DocumentationCategoryComponent,data:{category:d.ResolverService.resolveCategoryData(d.DocumentationPage.Charts,"Timeline Chart")}}],f=function(){function t(t,e){e.registerResolver(t)}return t}();f=o([r.NgModule({imports:[u.TabsModule,h.WrappersModule,l.DocumentationComponentsModule,s.RouterModule.forChild(b)],exports:p,declarations:p,entryComponents:p}),a("design:paramtypes",[r.ComponentFactoryResolver,d.ResolverService])],f),e.ChartsTimelineChartModule=f},1998:function(t,e){t.exports='<div class="flot-chart-timeline">\n  <ux-flot-ng1 [dataset]="timelineData" [options]="timelineOptions"></ux-flot-ng1>\n</div>\n\n<div class="flot-chart">\n  <ux-flot-ng1 [dataset]="detailedData" [options]="detailedOptions"></ux-flot-ng1>\n</div>\n\n<hr>\n\n<p>Timeline Charts are defined by the <code>flot</code> directive. The dataset and options attributes define the chart data\n  and options respectively. Dataset and Options are defined within the TimelineChartCtrl.</p>\n\n<tabset>\n  <tab heading="HTML">\n    <uxd-snippet language="html" [code]="htmlCode"></uxd-snippet>\n  </tab>\n\n  <tab heading="Javascript">\n    <uxd-snippet language="javascript" [code]="jsCode"></uxd-snippet>\n  </tab>\n</tabset>\n\n<p>The <code>lineDataService</code> can be used to add zero-points to the data. This makes the y coordinates as zero when there\n  is no data within a specified offset and the graph will lie at the x-axis within this interval.</p>\n\n<p>The <code>lineDataService</code> contains the method <code>addZeroPoints</code> which should be called to add the zero points\n  to the data. This method accepts two parameters:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">datapoints</td>\n        <td>number or array</td>\n        <td>Returns data points with the zero points added. The returned data is an array of coordinates.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">offset</td>\n        <td>number</td>\n        <td>The zero points are added if there is an interval between the coordinates greater than the offset value passed. The\n          default offset value is 1.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>An example of how the <code>lineDataService</code> can be used in the controller is shown below:</p>\n\n<uxd-snippet language="javascript" [code]="serviceJs"></uxd-snippet>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">data</td>\n        <td>number or array</td>\n        <td>It is an array of coordinates in Timeline Chart. E.g. [ [x1, y1], [x2, y2], ... ]</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">lines</td>\n        <td>object</td>\n        <td>Defines the parameters of the axis line.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>lines.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">show</td>\n        <td>boolean</td>\n        <td>If set to true displays the chart.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">fill</td>\n        <td>boolean or number</td>\n        <td>If set to true fills the chart with colors in the fillColors property. A number between 0 and 1 defines the opacity\n          of the fill.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">fillColor</td>\n        <td>array(colors)</td>\n        <td>Specifies the colors of the fill. If more than one color is specified this will produce a gradient.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">lineWidth</td>\n        <td>number</td>\n        <td>Defines the thickness of the line or outline in pixels.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">shadowSize</td>\n        <td>number</td>\n        <td>Default size of shadows in pixels. Set it to 0 to remove shadows.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">xaxes</td>\n        <td>array</td>\n        <td>Defines if more than one x-axis is used.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">yaxes</td>\n        <td>array</td>\n        <td>Defines if more than one y-axis is used.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">timeline</td>\n        <td>array</td>\n        <td>Helps configure the selection area on the chart.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>xaxes.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">mode</td>\n        <td>null or time</td>\n        <td>Defines how data is represented on the x-axes.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">min</td>\n        <td>number</td>\n        <td>Defines the minimum value of the x-axis.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">max</td>\n        <td>number</td>\n        <td>Defines the maximum value of the x-axis.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">tickColor</td>\n        <td>null or string(color)</td>\n        <td>Specifies the colors of the ticks in the x-axis.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>yaxes.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">show</td>\n        <td>boolean</td>\n        <td>If set to true displays the axis.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">min</td>\n        <td>number</td>\n        <td>Defines the minimum value of the y-axis.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">max</td>\n        <td>number</td>\n        <td>Defines the maximum value of the y-axis.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>timeline.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">color</td>\n        <td>string</td>\n        <td>Specifies the color of the selected area.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">start</td>\n        <td>number</td>\n        <td>Defines the position on the x axis that the selection should initially start.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">end</td>\n        <td>number</td>\n        <td>Defines the position on the x axis that the selection should initially end.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">keyboardNavigation</td>\n        <td>boolean</td>\n        <td>Defines if arrow keys are allowed to move selected area.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">enabled</td>\n        <td>boolean</td>\n        <td>If set to true this will enable selection on the grid.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">zoom</td>\n        <td>array</td>\n        <td>Helps configure chart zooming.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">dragHandles</td>\n        <td>array</td>\n        <td>This helps configure the handles on either end of the selection that the user can drag.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">callback</td>\n        <td>functional</td>\n        <td>This will be called whenever the selected range changes. It should accept one argument that will be an object containing\n          two values.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>zoom.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">enabled</td>\n        <td>boolean</td>\n        <td>Defines if chart should zoom when the range is changed.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">minimumRange</td>\n        <td>number</td>\n        <td>Defines the smallest range the chart will allow to be selected.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>dragHandles.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">width</td>\n        <td>number</td>\n        <td>Defines the width of the handles.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">color</td>\n        <td>string</td>\n        <td>Defines the color of the handles.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">tooltips</td>\n        <td>array</td>\n        <td>Helps configure tooltips on the selection region.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">tooltipFormatter</td>\n        <td>function</td>\n        <td>Use this function to define the tooltip text. It should accept one parameter which will be the value on the x axis\n          and should return a string.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>tooltips.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">enabled</td>\n        <td>boolean</td>\n        <td>If set to true shows the tooltip on the selection region based on the onHover, onDrag and onDrag options.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">onHover</td>\n        <td>boolean</td>\n        <td>If set to true the tooltip will show when the cursor is over the selection region.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">onDrag</td>\n        <td>boolean</td>\n        <td>If set to true the tooltip will show when the selection region is being dragged/resized.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">onDragEnd</td>\n        <td>boolean</td>\n        <td>If set to true the tooltip will show when the chart has finished being dragged/resized but the mouse is still pressed.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes should be defined within <code>callback.</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">start</td>\n        <td>number</td>\n        <td>The position on the x-axis where the selected area starts.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">end</td>\n        <td>number</td>\n        <td>The position on the x-axis where the selected area ends.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<blockquote>\n  <p><strong>Note</strong>: Refer to the <a routerLink="/charts/flot-options">Flot Options</a> page for details of chart options.</p>\n</blockquote>\n\n<p>It may be desirable to rescale the Y axis on the detailed chart to show a more appropriate scale based on the new range of\n  data being displayed. The following function has been designed to work with the above sample code and the function should\n  be called after the chart range has been changed.</p>\n\n<uxd-snippet language="javascript" [code]="rescaleJs"></uxd-snippet>\n\n<blockquote>\n  <p><strong>Note</strong>: Refer to the <a routerLink="/components/facets">Facets</a> page to see an example of Y axis rescaling.\n    This is seen in the Line Chart Example with Facet Panel.</p>\n</blockquote>\n\n<blockquote>\n    <p><strong>Note</strong>: To upgrade this component to use in an Angular 4 application use: <code>upgradeAdapter.upgradeNg1Component(\'uxFlotNg1\')</code></p>\n</blockquote>'},2329:function(t,e){t.exports='<div class="flot-chart-timeline">\n  <flot dataset="tc.timelineChart.data" options="tc.timelineChart.options"></flot>\n</div>\n\n\x3c!-- You can put a different chart below to show more details about the selected range --\x3e\n<div class="flot-chart">\n   <flot dataset="tc.detailedChart.data" options="tc.detailedChart.options"></flot>\n</div>'},2330:function(t,e){t.exports='angular.module("app").controller("TimelineChartCtrl", TimelineChartCtrl);\n\nTimelineChartCtrl.$inject = [\'$scope\', \'lineDataService\', \'$colorService\'];\n\nfunction TimelineChartCtrl($scope, lineDataService, $colorService) {\n\n    var tc = this;\n\n    var flotChartColors = {\n        chartColor: $colorService.getColor(\'chart1\').toRgb(),\n        chartFill: $colorService.getColor(\'chart1\').setAlpha(0.2).toRgba(),\n        gridColor: $colorService.getColor(\'grey4\').toHex(),\n        tickColor: $colorService.getColor(\'grey6\').toHex(),\n        borderColor: $colorService.getColor(\'grey2\').setAlpha(0.5).toRgba(),\n        transparent: "rgba(0, 0, 0, 0)",\n    };\n\n    function randomTimelineData() {\n        var min = 1167692400000; //represents 1 January 2007\n        var max = 1220911200000; //represents 8 September 2008\n        var step = 345600000; // represents 4 days\n\n        var dataPoints = [];\n\n        //for every 4 days between specified dates create a random number between 80 & 150\n        for (var i = min; i <= max; i += step) {\n            //Make March 2 2008 to april 2 2008 zero\n            if (!(i > 1204457710000 && i < 1207142075000)) {\n                dataPoints.push(i);\n                dataPoints.push(Math.floor(Math.random() * (150 - 80) + 80));\n            }\n\n        }\n\n        var offset = 259200000; // 3 days\n        dataPoints = lineDataService.addZeroPoints(dataPoints, offset);\n        return dataPoints;\n    }\n\n    //The preselected range on the timeline\n    var rangeStart = 1205708400000;\n    var rangeEnd = 1217628000000;\n\n    //store so we can share between the two timeline charts\n    var timelineData = randomTimelineData();\n\n    //Timeline Chart\n    tc.timelineChart = {\n        data: [{\n            data: timelineData,\n            lines: {\n                show: true,\n                fill: true,\n                lineWidth: 1,\n                fillColor: {\n                    colors: [{\n                        opacity: 0.0\n                    }, {\n                        opacity: 0.3\n                    }]\n                }\n            },\n            shadowSize: 0\n        }],\n        options: {\n            xaxes: [{\n                mode: \'time\'\n            }],\n            yaxes: [{\n                min: 0,\n                max: 200,\n                show: false\n            }],\n            colors: [flotChartColors.chartColor],\n            grid: {\n                color: [flotChartColors.gridColor],\n                tickColor: [flotChartColors.transparent]\n            },\n            tooltip: false,\n            timeline: {\n                color: flotChartColors.chartFill,\n                start: rangeStart,\n                end: rangeEnd,\n                zoom: {\n                    enabled: true,\n                    minimumRange: 604800000\n                },\n                keyboardNavigation: true,\n                dragHandles: {\n                    width: 5,\n                    color: flotChartColors.chartColor,\n                    tooltips: {\n                        enabled: true,\n                        onHover: true,\n                        onDrag: true,\n                        onDragEnd: false\n                    },\n                    tooltipFormatter: function (value) {\n                        var date = new Date(value);\n                        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];\n                        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();\n                    }\n                },\n                enabled: true,\n                callback: function (position) {\n                    //set new values for the min and max of the detailed chart\n                    tc.detailedChart.options.xaxes[0].min = position.start;\n                    tc.detailedChart.options.xaxes[0].max = position.end;\n\n                    //ensure the chart updates\n                    $scope.$digest();\n                }\n            }\n        }\n    };\n\n    tc.detailedChart = {\n        data: [{\n            data: timelineData,\n            lines: {\n                show: true,\n                fill: true,\n                lineWidth: 1,\n                fillColor: {\n                    colors: [{\n                        opacity: 0.1\n                    }, {\n                        opacity: 0.1\n                    }]\n                }\n            },\n            shadowSize: 0\n        }],\n        options: {\n            xaxes: [{\n                mode: \'time\',\n                min: rangeStart,\n                max: rangeEnd,\n                tickColor: [flotChartColors.transparent]\n            }],\n            yaxes: [{\n                min: 0,\n                max: 201\n            }],\n            legend: {\n                show: false\n            },\n            colors: [flotChartColors.chartColor],\n            grid: {\n                color: [flotChartColors.gridColor],\n                tickColor: [flotChartColors.tickColor],\n                borderWidth: {\n                    "bottom": 1,\n                    "left": 1,\n                    "top": 0,\n                    "right": 0\n                },\n                borderColor: {\n                    "bottom": [flotChartColors.borderColor],\n                    "left": [flotChartColors.borderColor]\n                },\n                hoverable: true\n            },\n            tooltip: {\n                show: true,\n                shifts: {\n                    x: 0,\n                    y: -48\n                },\n                content: "<strong>%x</strong><br/>%y,000 items added"\n            }\n        }\n    };\n}'},2331:function(t,e){t.exports="function updateChartYAxis() {\n    var start = tc.detailedChart.options.xaxes[0].min;\n    var end = tc.detailedChart.options.xaxes[0].max;\n\n    var max = 0;\n\n    for (var i = 0; i < timelineData.length; i++) {\n        var x = timelineData[i][0];\n        var y = timelineData[i][1];\n\n        if (x >= start && x <= end) {\n            if (!max || y > max) max = y;\n        }\n    }\n\n    //add some extra space above\n    max += 20;\n\n    //update the chart\n    tc.detailedChart.options.yaxes[0].max = max;\n}"},2332:function(t,e){t.exports="angular.module('elements').controller('TimelineChartCtrl', ['lineDataService', TimelineChartCtrl]);\n\nfunction TimelineChartCtrl(lineDataService) {\n    ...\n\n    function randomTimelineData() {\n\n        var min = 1167692400000; //represents 1 January 2007\n        var max = 1220911200000; //represents 8 September 2008\n        var step = 345600000; // represents 4 days\n\n        var dataPoints = [];\n\n        //for every 4 days between specified dates create a random number between 80 & 150\n        for (var i = min; i <= max; i += step) {\n\n            //Make March 2 2008 to april 2 2008 zero\n            if (!(i > 1204457710000 && i < 1207142075000)) {\n                dataPoints.push([i, Math.floor(Math.random() * (150 - 80) + 80)]);\n            }\n        }\n\n        var offset = 259200000; // 3 days\n        dataPoints = lineDataService.addZeroPoints(dataPoints, offset);\n        return dataPoints;\n    }\n}"}});