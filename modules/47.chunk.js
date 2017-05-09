webpackJsonp([47],{1884:function(t,e,n){"use strict";var s=this&&this.__decorate||function(t,e,n,s){var a,d=arguments.length,c=d<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,s);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(c=(d<3?a(c):d>3?a(e,n,c):a(e,n))||c);return d>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),d=n(259),c=function(){function t(){this.htmlCode=n(2825),this.codepen={html:this.htmlCode}}return t}();c=s([a.Component({selector:"uxd-css-tables-cards",template:n(2207)}),d.DocumentationSectionComponent("CssCardsComponent")],c),e.CssCardsComponent=c},1885:function(t,e,n){"use strict";var s=this&&this.__decorate||function(t,e,n,s){var a,d=arguments.length,c=d<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,s);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(c=(d<3?a(c):d>3?a(e,n,c):a(e,n))||c);return d>3&&c&&Object.defineProperty(e,n,c),c},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var d=n(0),c=n(18),o=n(260),l=n(140),i=n(261),r=n(1886),h=n(1884),p=[r.CssTablesComponent,h.CssCardsComponent],v=[{path:"**",component:i.DocumentationCategoryComponent,data:{category:l.ResolverService.resolveCategoryData(l.DocumentationPage.Css,"Tables")}}],u=function(){function t(t,e){e.registerResolver(t)}return t}();u=s([d.NgModule({imports:[o.DocumentationComponentsModule,c.RouterModule.forChild(v)],exports:p,declarations:p,entryComponents:p}),a("design:paramtypes",[d.ComponentFactoryResolver,l.ResolverService])],u),e.CssTablesModule=u},1886:function(t,e,n){"use strict";var s=this&&this.__decorate||function(t,e,n,s){var a,d=arguments.length,c=d<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,s);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(c=(d<3?a(c):d>3?a(e,n,c):a(e,n))||c);return d>3&&c&&Object.defineProperty(e,n,c),c};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),d=n(259),c=function(){function t(){this.htmlCode=n(2826),this.codepen={html:this.htmlCode}}return t}();c=s([a.Component({selector:"uxd-css-tables-tables",template:n(2208)}),d.DocumentationSectionComponent("CssTablesComponent")],c),e.CssTablesComponent=c},2207:function(t,e){t.exports='<div class="card-view-demo">\n  <ul class="card-view card-hover">\n    <li class="card callout bottom outline">\n      <div class="container-fluid">\n        <div class="row">\n          <div class="col-xs-8">\n            <strong>UX Aspects</strong>\n            <p class="m-b-nil">John</p>\n            <small>Jul 14, 2013</small>\n          </div>\n          <div class="col-xs-4 text-right">\n            <p class="m-b-nil chart-alternate1"><i class="hpe-icon hpe-ascend"></i> 40%</p>\n          </div>\n        </div>\n      </div>\n    </li>\n    <li class="card">\n      <div class="container-fluid">\n        <div class="row">\n          <div class="col-xs-8">\n            <strong>Hardware</strong>\n            <p class="m-b-nil">Nicole</p>\n            <small>Jul 16, 2013</small>\n          </div>\n          <div class="col-xs-4 text-right">\n            <p class="m-b-nil"><i class="hpe-icon hpe-descend"></i> -20%</p>\n          </div>\n        </div>\n      </div>\n    </li>\n    <li class="card">\n      <div class="container-fluid">\n        <div class="row">\n          <div class="col-xs-8">\n            <strong>Cloud</strong>\n            <p class="m-b-nil">James</p>\n            <small>Jul 18, 2013</small>\n          </div>\n          <div class="col-xs-4 text-right">\n            <p class="m-b-nil chart-alternate1"><i class="hpe-icon hpe-ascend"></i> 26%</p>\n          </div>\n        </div>\n      </div>\n    </li>\n  </ul>\n</div>\n\n<hr>\n\n<p>We provide an alternatative way to present a list of information in the form of a card view. Use the <code>.card-view</code> and <code>.card-hover</code> classes on the <code>ul</code> element and apply the <code>.card</code> class to all child <code>li</code> nodes to create the card view above.</p>\n<p>Cards can have a callout added to one of the sides by adding the <code>callout</code> class to the card element. You also need to specify which side of the card the callout should appear on by adding one of the following classes: <code>top</code>, <code>right</code>, <code>bottom</code> or <code>left</code>. If the list has the <code>card-hover</code> class applied to it, cards with a callout will get a green outline when hovered. This outline can be added to a card regardless of hover state by adding the <code>outline</code> class.</p>\n<p>We also provide a way of displaying cards vertically stacked which can be applied by adding the <code>.stacked</code> class to the <code>ul</code>.</p>\n<p>Multiple selection actions will also work for card views the same way they do for tables.</p>\n\n<uxd-snippet [code]="htmlCode"></uxd-snippet>'},2208:function(t,e){t.exports='<table class="table table-hover">\n  <thead>\n    <tr>\n      <th>#</th>\n      <th>Data</th>\n      <th>User</th>\n      <th>Value</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>1</td>\n      <td>156</td>\n      <td>Felicity</td>\n      <td class="chart-alternate1">\n        <i class="hpe-icon hpe-ascend"></i>\n        40%</td>\n    </tr>\n    <tr>\n      <td>2</td>\n      <td>226</td>\n      <td>Jacob</td>\n      <td>\n        <i class="hpe-icon hpe-descend"></i>\n        -20%</td>\n    </tr>\n    <tr>\n      <td>3</td>\n      <td>52</td>\n      <td>David</td>\n      <td class="chart-alternate1">\n        <i class="hpe-icon hpe-ascend"></i>\n        26%</td>\n    </tr>\n    <tr>\n      <td>4</td>\n      <td>461</td>\n      <td>Richard</td>\n      <td>\n        <i class="hpe-icon hpe-descend"></i>\n        -23%</td>\n    </tr>\n    <tr>\n      <td>5</td>\n      <td>119</td>\n      <td>Victoria</td>\n      <td class="chart-alternate1">\n        <i class="hpe-icon hpe-ascend"></i>\n        16%</td>\n    </tr>\n  </tbody>\n</table>\n\n<hr>\n\n<p>Use the <code>.table</code> and <code>.table-hover</code> classes on the <code>table</code> element to create the above table.</p>\n\n<uxd-snippet [code]="htmlCode"></uxd-snippet>'},2825:function(t,e){t.exports='<div class="card-view-demo">\n    <ul class="card-view card-hover">\n        <li class="card callout bottom outline">\n            <div class="container-fluid">\n                <div class="row">\n                    <div class="col-xs-8">\n                        <strong>UX Aspects</strong>\n                        <p class="m-b-nil">John</p>\n                        <small>Jul 14, 2013</small>\n                    </div>\n                    <div class="col-xs-4 text-right">\n                        <p class="m-b-nil chart-alternate1"><i class="hpe-icon hpe-ascend"></i> 40%</p>\n                    </div>\n                </div>\n            </div>\n        </li>\n        <li class="card">\n            <div class="container-fluid">\n                <div class="row">\n                    <div class="col-xs-8">\n                        <strong>Hardware</strong>\n                        <p class="m-b-nil">Nicole</p>\n                        <small>Jul 16, 2013</small>\n                    </div>\n                    <div class="col-xs-4 text-right">\n                        <p class="m-b-nil"><i class="hpe-icon hpe-descend"></i> -20%</p>\n                    </div>\n                </div>\n            </div>\n        </li>\n        <li class="card">\n            <div class="container-fluid">\n                <div class="row">\n                    <div class="col-xs-8">\n                        <strong>Cloud</strong>\n                        <p class="m-b-nil">James</p>\n                        <small>Jul 18, 2013</small>\n                    </div>\n                    <div class="col-xs-4 text-right">\n                        <p class="m-b-nil chart-alternate1"><i class="hpe-icon hpe-ascend"></i> 26%</p>\n                    </div>\n                </div>\n            </div>\n        </li>\n    </ul>\n</div>'},2826:function(t,e){t.exports='<table class="table table-hover">\n    <thead>\n        <tr>\n            <th>#</th>\n            <th>Data</th>\n            <th>User</th>\n            <th>Value</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>1</td>\n            <td>156</td>\n            <td>Felicity</td>\n            <td class="chart-alternate1">\n            <i class="hpe-icon hpe-ascend"></i>\n            40%</td>\n        </tr>\n        <tr>\n            <td>2</td>\n            <td>226</td>\n            <td>Jacob</td>\n            <td>\n            <i class="hpe-icon hpe-descend"></i>\n            -20%</td>\n        </tr>\n        <tr>\n            <td>3</td>\n            <td>52</td>\n            <td>David</td>\n            <td class="chart-alternate1">\n            <i class="hpe-icon hpe-ascend"></i>\n            26%</td>\n        </tr>\n        <tr>\n            <td>4</td>\n            <td>461</td>\n            <td>Richard</td>\n            <td>\n            <i class="hpe-icon hpe-descend"></i>\n            -23%</td>\n        </tr>\n        <tr>\n            <td>5</td>\n            <td>119</td>\n            <td>Victoria</td>\n            <td class="chart-alternate1">\n            <i class="hpe-icon hpe-ascend"></i>\n            16%</td>\n        </tr>\n    </tbody>\n</table>'}});