webpackJsonp([61],{1898:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var a,i=arguments.length,r=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(r=(i<3?a(r):i>3?a(t,n,r):a(t,n))||r);return i>3&&r&&Object.defineProperty(t,n,r),r};Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(299),r=function(){function e(){this.htmlCode=n(2670),this.jsCode=n(2671),this.codepen={html:this.htmlCode,htmlAttributes:{"ng-controller":"GridDemoCtrl as vm"},js:[this.jsCode]}}return e}();r=o([a.Component({selector:"uxd-components-grid-ng1",template:n(2254)}),i.DocumentationSectionComponent("ComponentsGridNg1Component")],r),t.ComponentsGridNg1Component=r},1899:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var a,i=arguments.length,r=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(r=(i<3?a(r):i>3?a(t,n,r):a(t,n))||r);return i>3&&r&&Object.defineProperty(t,n,r),r},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(20),c=n(300),d=n(158),s=n(301),l=n(1898),p=n(303),u=n(302),h=[l.ComponentsGridNg1Component],m=[{path:"**",component:s.DocumentationCategoryComponent,data:{category:d.ResolverService.resolveCategoryData(d.DocumentationPage.Components,"Grid")}}],f=function(){function e(e,t){t.registerResolver(e)}return e}();f=o([i.NgModule({imports:[p.WrappersModule,u.TabsModule,c.DocumentationComponentsModule,r.RouterModule.forChild(m)],exports:h,declarations:h,entryComponents:h}),a("design:paramtypes",[i.ComponentFactoryResolver,d.ResolverService])],f),t.ComponentsGridModule=f},2254:function(e,t){e.exports='<uxd-grid-wrapper></uxd-grid-wrapper>\n\n<hr>\n\n<p>The <code>grid</code> component can be used to create tables automatically from a dataset.\nEach available column should be configured with header text and a template.</p>\n\n<p>To add a <code>grid</code> use the following HTML and controller logic:</p>\n\n<tabset>\n    <tab heading="HTML">\n        <uxd-snippet language="html" [code]="htmlCode"></uxd-snippet>\n    </tab>\n    <tab heading="Javascript">\n        <uxd-snippet language="javascript" [code]="jsCode"></uxd-snippet>\n    </tab>\n</tabset>\n\n<br>\n\n<p>The data source can also be a function that returns an array. \nWhen using a function as the source it may be necessary to manually tell the grid to update with the latest data. \nTo do this you can broadcast the <code>$gridReload</code> event, e.g.:</p>\n\n<uxd-snippet language="javascript" code="$scope.$broadcast(\'$gridReload\');"></uxd-snippet>\n\n<p>The following properties can be set on columns to customize their appearance:</p>\n\n<div class="demo-attributes table-responsive">\n<table class="table">\n    <tbody><tr>\n        <th>Property</th>\n        <th>Type</th>\n        <th>Description</th>\n        <th>Optional</th>\n    </tr>\n    <tr>\n        <td class="attribute">title</td>\n        <td>string</td>\n        <td>This defines the title to be displayed in the column header.</td>\n        <td>false</td>\n    </tr>\n    <tr>\n        <td class="attribute">template</td>\n        <td>string</td>\n        <td>This defines the HTML to be used in the cells in this column. This property is required if the <code>templateUrl</code> property is not defined.</td>\n        <td>true</td>\n    </tr>\n    <tr>\n        <td class="attribute">templateUrl</td>\n        <td>string</td>\n        <td>This defines a path to an HTML file to be used in the cells in this column. This property is required if the <code>template</code> property is not defined.</td>\n        <td>true</td>\n    </tr>\n    <tr>\n        <td class="attribute">width</td>\n        <td>number</td>\n        <td>This defines the width of the column. If not specified the column will be automatically sized.</td>\n        <td>true</td>\n    </tr>\n</tbody></table>\n</div>'},2670:function(e,t){e.exports='<grid source="vm.source" columns="vm.columns"></grid>'},2671:function(e,t){e.exports='angular.module(\'app\').controller(\'GridDemoCtrl\', GridDemoCtrl);\n\nfunction GridDemoCtrl() {\n    var vm = this;\n\n    vm.source = [{\n        "checked": false,\n        "name": chance.name(),\n        "age": 46,\n        "city": "London",\n        "active": true\n    }, {\n        "checked": false,\n        "name": chance.name(),\n        "age": 60,\n        "city": "Berlin",\n        "active": false\n    }, {\n        "checked": false,\n        "name": chance.name(),\n        "age": 57,\n        "city": "Paris",\n        "active": false\n    }, {\n        "checked": false,\n        "name": chance.name(),\n        "age": 28,\n        "city": "California",\n        "active": false\n    }, {\n        "checked": false,\n        "name": chance.name(),\n        "age": 31,\n        "city": "Miami",\n        "active": true\n    }];\n\n    vm.columns = [{\n        title: \'\',\n        template: \'<checkbox style="margin-bottom: 0" ng-model="checked"></checkbox>\',\n        width: \'40px\'\n    }, {\n        title: \'Name\',\n        template: \'<span ng-bind="::name"></span>\',\n    }, {\n        title: \'Age\',\n        template: \'<span ng-bind="::age"></span>\',\n    }, {\n        title: \'City\',\n        template: \'<span ng-bind="::city"></span>\',\n    }, {\n        title: \'Active\',\n        template: \'<i class="hpe-icon hpe-active" ng-show="::active"></i>\',\n    }];\n}'}});