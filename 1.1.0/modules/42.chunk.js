webpackJsonp([42],{1631:function(t,e,n){"use strict";var i=this&&this.__decorate||function(t,e,n,i){var a,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var d=t.length-1;d>=0;d--)(a=t[d])&&(r=(o<3?a(r):o>3?a(e,n,r):a(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n(259),d=n(9).Chance(),s=function(){function t(){this.htmlCode=n(2293),this.jsCode=n(2294),this.cssCode=n(2292),this.popoverHtml=n(2295),this.popoverJs=n(2296),this.codepen={html:this.htmlCode,htmlAttributes:{"ng-controller":"PartitionMapCtrl as vm"},htmlTemplates:[{id:"templateId.html",content:this.popoverHtml}],js:[this.jsCode,this.popoverJs],css:[this.cssCode]},this.options={edit:{text:"Edit",image:n(1967),click:function(){},editor:{enabled:!0,finishText:"Done",noGroupsText:"No groups available",availableGroups:["Custodian","Language","Data Source"],maxRows:3,minRows:1,onFinish:function(){}}},select:function(){},maximize:{disableScrolling:!1,buttonVisible:!0,isMaximized:!1,fillScreen:!0,sidePanelWidth:235,shouldResize:!0,onToggle:function(){}},popoverTemplate:n(1959),popoverEnabled:!0,valueFormatter:function(t){return t.toLocaleString()},noDataLabel:"No data to display",loadingLabel:"Loading...",popoverDelay:650},this.isLoading=!1,this.data=[{label:"Home",image:n(1965),groupName:"Hard Drives",children:[{label:d.name(),groupName:"Custodian",children:[{label:"English",groupName:"Language",children:[{label:"Email",groupName:"Data Source",value:40},{label:"Microsoft Word",groupName:"Data Source",value:10}]},{label:"German",groupName:"Language",children:[{label:"Email",groupName:"Data Source",value:10},{label:"Microsoft Word",groupName:"Data Source",value:5}]}]},{label:d.name(),groupName:"Custodian",children:[{label:"English",groupName:"Language",children:[{label:"Email",groupName:"Data Source",value:15},{label:"Microsoft Word",groupName:"Data Source",value:5}]},{label:"German",groupName:"Language",children:[{label:"Email",groupName:"Data Source",value:10},{label:"Microsoft Word",groupName:"Data Source",value:5}]}]}]}]}return t}();s=i([o.Component({selector:"uxd-charts-partition-map-ng1",template:n(1991),changeDetection:o.ChangeDetectionStrategy.OnPush}),r.DocumentationSectionComponent("ChartsPartitionMapNg1Component"),a("design:paramtypes",[])],s),e.ChartsPartitionMapNg1Component=s},1632:function(t,e,n){"use strict";var i=this&&this.__decorate||function(t,e,n,i){var a,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var d=t.length-1;d>=0;d--)(a=t[d])&&(r=(o<3?a(r):o>3?a(e,n,r):a(e,n))||r);return o>3&&r&&Object.defineProperty(e,n,r),r},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n(18),d=n(1631),s=n(140),l=n(262),h=n(263),p=n(260),c=n(261),u=[d.ChartsPartitionMapNg1Component],m=[{path:"**",component:c.DocumentationCategoryComponent,data:{category:s.ResolverService.resolveCategoryData(s.DocumentationPage.Charts,"Partition Map")}}],b=function(){function t(t,e){e.registerResolver(t)}return t}();b=i([o.NgModule({imports:[l.TabsModule,h.WrappersModule,p.DocumentationComponentsModule,r.RouterModule.forChild(m)],exports:u,declarations:u,entryComponents:u}),a("design:paramtypes",[o.ComponentFactoryResolver,s.ResolverService])],b),e.ChartsPartitionMapModule=b},1959:function(t,e,n){t.exports=n.p+"docs/app/pages/charts/sections/partition-map/partition-map-ng1/snippets/popover.html"},1965:function(t,e,n){t.exports=n.p+"assets/home.png"},1967:function(t,e,n){t.exports=n.p+"assets/pencil.png"},1991:function(t,e){t.exports='<div class="partition-map-box">\n  <ux-partition-map-ng1 [chartData]="data" [chartOptions]="options" [chartLoading]="isLoading"></ux-partition-map-ng1>\n</div>\n<hr>\n\n<p>There are several attributes that you can supply for the chart:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">chart-data</td>\n        <td>array</td>\n        <td>This should contain the data to be displayed on the chart.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">chart-options</td>\n        <td>array</td>\n        <td>This should contain options to describe the presentation of the chart and any event functions.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">chart-loading</td>\n        <td>array</td>\n        <td>This will state whether or not to show the loading overlay.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p><br> Each segment can have the following data:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">groupName</td>\n        <td>string</td>\n        <td>This defines the group a segment is part of. This is used for editing the partition map.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">label</td>\n        <td>string</td>\n        <td>This defines the text to be displayed on the segment.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">value</td>\n        <td>number</td>\n        <td>This defines the size of each segment. A value must be defined if the segment has no children. If it has children\n          a value should not be specified, as the value will be calculated from the values of its children.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">children</td>\n        <td>array</td>\n        <td>This defines the child segments.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">image</td>\n        <td>string</td>\n        <td>This defines an image to appear above the text in the segment.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">color</td>\n        <td>color</td>\n        <td>This defines the color of the segment. If no color is specified, one will be selected automatically.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>Segments can also have custom data that may be useful. These additional properties will have no effect on how the chart is\n  displayed, however this data can be used to display more information in the popover or help identify which item has been\n  clicked, for example by adding an id. Any items that have a value of zero will be grouped together in a single segment\n  and placed to the right side under its parent segment.</p>\n\n<p>The Partition Map is defined by the <code>partition-map</code> directive.</p>\n\n<tabset>\n  <tab heading="HTML">\n    <uxd-snippet language="html" [code]="this.htmlCode"></uxd-snippet>\n  </tab>\n  <tab heading="Javascript">\n    <uxd-snippet language="javascript" [code]="this.jsCode"></uxd-snippet>\n  </tab>\n</tabset>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">edit</td>\n        <td>object</td>\n        <td>Allows a clickable edit region on the root node.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">select</td>\n        <td>function</td>\n        <td>Defines a function to be called when a segment is clicked. It should accept two arguments which will contain the\n          data of the selected segment and the element of the selected segment.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">maximize</td>\n        <td>object</td>\n        <td>Defines if the chart should be able to maximize and how it should present itself when maximized.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">popoverEnabled</td>\n        <td>boolean</td>\n        <td>Defines whether a popover should appear when a segment is hovered over. If not specified it will default to true.\n          This will only affect the hover popover and when maximized the docked popover will still be present.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">popoverTemplate</td>\n        <td>string</td>\n        <td>Defines a template file that will display in the popover alongside the list of child nodes. Note that you can also\n          create a template in a `script` tag with a unique ID in your HTML file. The popoverTemplate string can then be\n          set to this ID to use that template.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">valueFormatter</td>\n        <td>function</td>\n        <td>Defines a function to format segment values. In the popover a list of child segments are displayed alongside their\n          values. If you would like to alter how these numbers are presented use this function to do so. It accepts one argument\n          which will be the original number, and expects a string or number value to be returned.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">noDataLabel</td>\n        <td>string</td>\n        <td>Defines the text to display if the data is empty.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">loadingLabel</td>\n        <td>string</td>\n        <td>Defines the text to display on the loading overlay.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">popoverDelay</td>\n        <td>number</td>\n        <td>Defines how long (in milliseconds) a user must hover over a segment before showing the popover. The default value\n          is 650.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">buttonOffset</td>\n        <td>object</td>\n        <td>Defines the position of the maximize/minimize button.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within <code>edit</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">text</td>\n        <td>string</td>\n        <td>Defines the text to display in the edit region.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">image</td>\n        <td>string</td>\n        <td>Defines the image to display in the edit region above the text.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">click</td>\n        <td>function</td>\n        <td>Defines the function to be called when the edit region is clicked and allows you to implement editing functionality.\n          It should accept one argument which will provide data for the root segment.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">editor</td>\n        <td>object</td>\n        <td>Helps configure the default partition map editor functionality.</td>\n        <td>true</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within <code>editor</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">enabled</td>\n        <td>boolean</td>\n        <td>If true the editor will appear when the edit button is clicked.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">finishedText</td>\n        <td>string</td>\n        <td>This will set the text below the button that the user will click to finish editing. The default text is \'Done\'.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">noGroupsText</td>\n        <td>string</td>\n        <td>This will set the text in the dropdown if there are no available groups. The default text is \'No groups available\'.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">availableGroups</td>\n        <td>array(strings)</td>\n        <td>This will define all the possible groups the user can choose from the dropdown. The initial groups displayed are\n          taken from the partition map data.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">maxRows</td>\n        <td>number</td>\n        <td>The maximum number of rows the partition map can have (this does not include the root segment). The default is 3.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">minRows</td>\n        <td>number</td>\n        <td>The minimum number of rows the partition map can have (this does not include the root segment). The default is 0.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">onFinish</td>\n        <td>function</td>\n        <td>This function will be called when the user has finished editing. The function should accept one argument which will\n          contain an array of groups the user selected in order from highest to lowest. In this function the chart data should\n          be updated accordingly.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within <code>maximize</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">buttonVisible</td>\n        <td>boolean</td>\n        <td>Defines if the maximize/minimize button should be visible.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">disableScrolling</td>\n        <td>boolean</td>\n        <td>Defines if page scrolling should be disabled when the chart is maximized.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">isMaximized</td>\n        <td>boolean</td>\n        <td>Defines if the chart should present itself in the maximized state initially.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">fillScreen</td>\n        <td>boolean</td>\n        <td>Defines if the maximized chart should fill the remaining space on the screen, or fill the container element.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">sidePanelWidth</td>\n        <td>number</td>\n        <td>Defines the width of the side panel when the Partition Map is maximized. The default value is 235.</td>\n        <td>true</td>\n      </tr>\n      <tr>\n        <td class="attribute">shouldResize</td>\n        <td>boolean</td>\n        <td>Defines if the chart should resize to fill the container (or remaining screen space) when the maximize/minimize button\n          is clicked. The default value is `true.` This is useful if you wish to see the side panel without having to resize\n          the map. Note: If you set `isMaximized` to true and `shouldResize` to false, the map will load with the side panel\n          displayed.\n        </td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">onToggle</td>\n        <td>function</td>\n        <td>Defines a function to be called when the maximize/minimize button is clicked. It should accept one argument which\n          will represent the state the chart is transitioning to - `true` for maximized and `false` for minimized. To prevent\n          the default maximize/minimize behavior, make the function return `true`.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within <code>buttonOffset</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">maximize</td>\n        <td>object</td>\n        <td>Defines the offset for the button when in the maximized state.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">minimize</td>\n        <td>object</td>\n        <td>Defines the offset for the button when in the minimized state.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within the <code>maximize</code> property in <code>buttonOffset</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">x</td>\n        <td>number</td>\n        <td>Defines how many pixels left or right to offset the button from the default position when the chart is maximized.\n          A positive number indicates moving the button to the right and a negative number indicates moving the button to\n          the left.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">y</td>\n        <td>number</td>\n        <td>Defines how many pixels up or down to offset the button from the default position when the chart is maximized. A\n          positive number indicates moving the button down and a negative number indicates moving the button up.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within the <code>minimize</code> property of <code>buttonOffset</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">x</td>\n        <td>number</td>\n        <td>Defines how many pixels left or right to offset the button from the default position when the chart is minimized.\n          A positive number indicates moving the button to the right and a negative number indicates moving the button to\n          the left.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">y</td>\n        <td>number</td>\n        <td>Defines how many pixels up or down to offset the button from the default position when the chart is minimized. A\n          positive number indicates moving the button down and a negative number indicates moving the button up.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<h4 id="maximizing">Maximizing</h4>\n\n<p>To allow a partition map to be maximized a container must be specified. To identify the container apply the <code>partition-container</code>  class to the element. It is recommended that it be applied to the <code>div</code> element containing the main page content\n  (which will often have the class <code>wrapper-content</code>), this way any navigation, headers or toolbars will not be\n  obstructed. The container will be used to position and size the maximized partition map on the page. If it should fill\n  the screen there is a <code>fillScreen</code> option that can be set to true.</p>\n\n<p>The maximize/minimize button will by default toggle the presentation of the chart, however other actions can be performed\n  when the button is clicked by providing an <code>onToggle</code> function in the options. The default functionality will\n  still occur even if you have provided an <code>onToggle</code> function, however it can be prevented by ensuring the <code>onToggle</code>  function returns a value of <code>true.</code></p>\n\n<h4 id="popover">Popover</h4>\n\n<p>The partition map requires a template to be defined which will be displayed in the popover when a segment is hovered over,\n  or when the chart is maximized in the docked panel on the right side.</p>\n\n<p>The popover may have different sizes depending on where it is presented and the template should allow for this. Below are\n  details on each presentation and how to apply a style specific to them.</p>\n\n<ul>\n  <li>\n    <p>The default presentation occurs when a segment is hovered over and a popover will appear with a list of the segments\n      children on the right side.</p>\n  </li>\n  <li>\n    <p>The second presentation occurs when a segment is hovered over that has no children. The template will then fill the whole\n      popover. In this case the template will have a parent CSS class of <code>.full-width</code> which can be used to provide\n      styling specific for this presentation.</p>\n  </li>\n  <li>\n    <p>The third presentation occurs when the partition map has been maximized. The popover will then be docked to the right\n      of the chart. In this case the template will have a parent CSS class of <code>.docked</code> which can be used to provide\n      styling specific for this presentation.</p>\n  </li>\n</ul>\n\n<p>The popover template will have access to the following data about the segment selected/hovered:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">children</td>\n        <td>array</td>\n        <td>If the segment has any children this contains the data on them.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">color</td>\n        <td>string</td>\n        <td>This will contain the color of the current segment.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">data</td>\n        <td>object</td>\n        <td>This will contain the original segment data specified, including any custom data.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">depth</td>\n        <td>number</td>\n        <td>This represents the level the segment is on the chart.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">key</td>\n        <td>string</td>\n        <td>This will contain the label displayed on the segment.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">value</td>\n        <td>number</td>\n        <td>This will contain the value of the current segment.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>The following attributes are defined within <code>data</code></p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n      </tr>\n      <tr>\n        <td class="attribute">label</td>\n        <td>string</td>\n        <td>The label specified for the segment.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">image</td>\n        <td>string</td>\n        <td>The image file specified for the segment (if one was specified).</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">children</td>\n        <td>array</td>\n        <td>The child segments if any were specified.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">parents</td>\n        <td>array</td>\n        <td>The parent segments if any exist. The list is ordered starting with the immediate parent and moving up until the\n          root node is reached.</td>\n        <td>false</td>\n      </tr>\n      <tr>\n        <td class="attribute">value</td>\n        <td>number</td>\n        <td>The value of the segment if one was specified.</td>\n        <td>false</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>Any additional custom data that you specified for this segment will also be found here. In this example <code>groupName</code>  was added to each segment, and it is here this data can be accessed</p>\n\n<p>The code used for the popover template in the example above can be found below:</p>\n\n<tabset>\n  <tab heading="HTML">\n    <uxd-snippet language="html" [code]="this.popoverHtml"></uxd-snippet>\n  </tab>\n  <tab heading="Javascript">\n    <uxd-snippet language="javascript" [code]="this.popoverJs"></uxd-snippet>\n  </tab>\n  <tab heading="CSS">\n    <uxd-snippet language="css" [code]="this.cssCode"></uxd-snippet>\n  </tab>\n</tabset>\n\n<blockquote>\n    <p><strong>Note</strong>: To upgrade this component to use in an Angular 4 application use: <code>upgradeAdapter.upgradeNg1Component(\'uxPartitionMapNg1\')</code></p>\n</blockquote>'},2292:function(t,e){t.exports=".partition-map-box {\n  width: 800px;\n  height: 800px;\n}\n\n.partition-user-popover {\n    width: 100%;\n    height: 100%;\n    padding: 10px;\n    padding-bottom: 0;\n}\n\n.docked .partition-user-popover {\n    padding: 20px;\n}\n\n.partition-user-popover .group {\n    font-family: 'Source Sans Pro';\n    font-weight: 600;\n    text-transform: uppercase;\n    margin: 0;\n    font-size: 17px;\n    line-height: 17px;\n}\n\n.partition-user-popover .title {\n    color: #ffffff;\n    font-family: 'Source Sans Pro';\n    line-height: 32px;\n    margin-bottom: 0;\n    -ms-text-overflow: ellipsis;\n    -webkit-text-overflow: ellipsis;\n    -o-text-overflow: ellipsis;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    max-height: 32px;\n}\n\n.partition-user-popover .count-number {\n    color: #818484;\n    font-family: 'Source Sans Pro';\n    font-size: 20px;\n}\n\n.partition-user-popover .count-text {\n    color: #525658;\n    font-family: 'Source Sans Pro';\n    font-size: 17px;\n}\n\n.partition-popover-chart {\n    display: block;\n    height: 80px;\n    margin-left: -22px;\n    margin-right: -8px;\n}\n\n.docked .partition-popover-chart {\n    margin-left: -8px;\n    margin-right: -8px;\n}\n\n.user-content.full-width .partition-popover-chart {\n    margin-right: -24px;\n}\n\n.partition-popover-buttons {\n    position: absolute;\n    width: 100%;\n    height: 50px;\n    bottom: 0;\n    left: 0;\n}\n\n\n.docked .partition-popover-buttons {\n    position: static;\n}\n\n.partition-popover-buttons .popover-button {\n    display: inline-block;\n    width: 50%;\n    height: 50px;\n    float: left;\n    color: #fff;\n    font-family: 'Source Sans Pro';\n    text-transform: uppercase;\n    text-align: center;\n    cursor: pointer;\n    padding: 5px 0;\n}\n\n.partition-popover-buttons .popover-button:hover {\n    background-color: #222;\n}\n\n.partition-popover-buttons .popover-button .hold-icon {\n    background-image: url('https://uxaspects.github.io/UXAspects/assets/img/lock.png');\n    width: 18px;\n    height: 18px;\n    background-size: contain;\n    background-repeat: no-repeat;\n    margin: 1px auto;\n}\n\n.partition-popover-buttons .popover-button .workbook-icon {\n    background-image: url('https://uxaspects.github.io/UXAspects/assets/img/book.png');\n    width: 18px;\n    height: 18px;\n    background-size: contain;\n    background-repeat: no-repeat;\n    margin: 1px auto;\n}\n\n.partition-popover-buttons .popover-button.divider {\n    border-right: 1px solid #3e3e3e;\n}"},2293:function(t,e){t.exports='<div class="partition-container">\n    <div class="partition-map-box">\n        <partition-map chart-data="vm.chartData" chart-options="vm.options" chart-loading="vm.isLoading"></partition-map>\n    </div>\n</div>'},2294:function(t,e){t.exports="angular.module(\"app\").controller(\"PartitionMapCtrl\", PartitionMapCtrl);\n\nfunction PartitionMapCtrl() {\n    var vm = this;\n\n    vm.options = {\n        edit: {\n            text: 'Edit',\n            image: 'https://uxaspects.github.io/UXAspects/assets/img/pencil.png',\n            click: function (root) {\n                //perform action when the edit option is clicked\n            },\n            editor: {\n                enabled: true,\n                finishText: 'Done',\n                noGroupsText: 'No groups available',\n                availableGroups: ['Custodian', 'Language', 'Data Source'],\n                maxRows: 3,\n                minRows: 1,\n                onFinish: function (order) {\n\n                }\n            }\n        },\n        select: function (data) {\n            //perform action when a segment has been clicked\n        },\n        maximize: {\n            disableScrolling: false,\n            buttonVisible: true,\n            isMaximized: false,\n            fillScreen: true,\n            sidePanelWidth: 235,\n            shouldResize: true,\n            onToggle: function (action) {\n\n            }\n        },\n        popoverTemplate: \"templateId.html\",\n        popoverEnabled: true,\n        valueFormatter: function (value) {\n            return value.toLocaleString();\n        },\n        noDataLabel: 'No data to display',\n        loadingLabel: 'Loading...',\n        popoverDelay: 650,\n        buttonOffset: {\n            maximize: {\n                x: 40,\n                y: 0\n            },\n            minimize: {\n                x: 0,\n                y: 0\n            }\n        }\n    };\n\n    vm.isLoading = false;\n\n    vm.chartData = [{\n        label: 'Home',\n        image: 'https://uxaspects.github.io/UXAspects/assets/img/home.png',\n        groupName: 'Hard Drives',\n        children: [{\n            label: 'Jennifer Bailey',\n            groupName: 'Custodian',\n            children: [{\n                label: 'English',\n                groupName: 'Language',\n                children: [{\n                    label: 'Email',\n                    groupName: 'Data Source',\n                    value: 40\n                }, {\n                    label: 'Microsoft Word',\n                    groupName: 'Data Source',\n                    value: 10\n                }]\n            }, {\n                label: 'German',\n                groupName: 'Language',\n                children: [{\n                    label: 'Email',\n                    groupName: 'Data Source',\n                    value: 10\n                }, {\n                    label: 'Microsoft Word',\n                    groupName: 'Data Source',\n                    value: 5\n                }]\n            }]\n        }, {\n            label: 'Stephen Sheridan',\n            groupName: 'Custodian',\n            children: [{\n                    label: 'English',\n                    groupName: 'Language',\n                    children: [{\n                        label: 'Email',\n                        groupName: 'Data Source',\n                        value: 15\n                    }, {\n                        label: 'Microsoft Word',\n                        groupName: 'Data Source',\n                        value: 5\n                    }],\n                },\n                {\n                    label: 'German',\n                    groupName: 'Language',\n                    children: [{\n                        label: 'Email',\n                        groupName: 'Data Source',\n                        value: 10\n                    }, {\n                        label: 'Microsoft Word',\n                        groupName: 'Data Source',\n                        value: 5\n                    }]\n                }\n            ]\n        }]\n    }];\n\n}"},2295:function(t,e){t.exports='<div ng-controller="PartitionMapPopoverCtrl as popc">\n    <div class="partition-user-popover">\n        <p class="group" ng-style="{\'color\': color}" ng-bind="::data.groupName"></p>\n        <h2 class="title" ng-bind="::key"></h2>\n        <h4 class="m-t-nil">\n            <span class="count-number" ng-bind="::formattedValue"></span>\n            <span class="count-text">ITEMS</span>\n        </h4>\n    </div>\n    <div class="partition-popover-chart">\n        <flot dataset="popc.lineChart.data" options="popc.lineChart.options"></flot>\n    </div>\n    <div class="partition-popover-buttons">\n        <div class="popover-button divider">\n            <div class="hold-icon"></div>\n            <p>Hold All</p>\n        </div>\n        <div class="popover-button">\n            <div class="workbook-icon"></div>\n            <p>Workbook All</p>\n        </div>\n    </div>\n</div>'},2296:function(t,e){t.exports='angular.module("app").controller("PartitionMapPopoverCtrl", [\'$colorService\', PartitionMapPopoverCtrl]);\n\nfunction PartitionMapPopoverCtrl($colorService) {\n    var vm = this;\n\n    //get the segment color from the parent scope\n    var primaryColor = $colorService.getColor(\'chart2\').toHex();\n\n    var lineData = randomData();\n\n    vm.lineChart = {\n        data: [{\n            data: lineData,\n            lines: {\n                show: true,\n                fill: true,\n                lineWidth: 1,\n                fillColor: {\n                    colors: [{\n                        opacity: 0.0\n                    }, {\n                        opacity: 0.5\n                    }, {\n                        opacity: 0.8\n                    }]\n                }\n            },\n            shadowSize: 0\n        }],\n        options: {\n            xaxes: [{\n                show: false\n            }],\n            yaxes: [{\n                show: false\n            }],\n            colors: [primaryColor],\n            grid: {\n                borderWidth: {\n                    "bottom": 0,\n                    "left": 0,\n                    "top": 0,\n                    "right": 0\n                },\n            },\n            tooltip: false\n        }\n    };\n\n    //generate some random data for the chart\n    function randomData() {\n        var dataPoints = [];\n\n        for (var i = 0; i <= 40; i++) {\n            dataPoints.push([i, Math.floor((Math.random() * (150 - 40)) + 40)]);\n        }\n\n        return dataPoints;\n    }\n\n}'}});