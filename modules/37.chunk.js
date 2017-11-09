webpackJsonp([37],{1797:function(n,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=function(){function n(n){var a=this;this.snippets={compiled:{},raw:{}},n.keys().forEach(function(s){var t=s.replace("./","").replace(/\W+(\w)/g,function(n){return n[1].toUpperCase()}),e=n(s);e.snippet&&(a.snippets.compiled[t]=e.snippet),e.example&&(a.snippets.raw[t]=e.example)})}return n}();a.BaseDocumentationSection=t},1798:function(n,a,s){"use strict";s.d(a,"a",function(){return o});var t=s(0),e=s(1799),o=function(){function n(n){this.groups=[],Object.assign(this,n)}return n.prototype.closeOtherPanels=function(n){this.closeOthers&&this.groups.forEach(function(a){a!==n&&(a.isOpen=!1)})},n.prototype.addGroup=function(n){this.groups.push(n)},n.prototype.removeGroup=function(n){var a=this.groups.indexOf(n);-1!==a&&this.groups.splice(a,1)},n.decorators=[{type:t.Component,args:[{selector:"accordion",template:"<ng-content></ng-content>",host:{"[attr.aria-multiselectable]":"closeOthers",role:"tablist",class:"panel-group",style:"display: block"}}]}],n.ctorParameters=function(){return[{type:e.a}]},n.propDecorators={closeOthers:[{type:t.Input}]},n}()},1799:function(n,a,s){"use strict";s.d(a,"a",function(){return e});var t=s(0),e=function(){function n(){this.closeOthers=!1}return n.decorators=[{type:t.Injectable}],n.ctorParameters=function(){return[]},n}()},1800:function(n,a,s){"use strict";s.d(a,"a",function(){return p});var t=s(0),e=s(84),o=s(1798),p=function(){function n(n){this.accordion=n}return Object.defineProperty(n.prototype,"isOpen",{get:function(){return this._isOpen},set:function(n){this._isOpen=n,n&&this.accordion.closeOtherPanels(this)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"isBs3",{get:function(){return e.a()},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.panelClass=this.panelClass||"panel-default",this.accordion.addGroup(this)},n.prototype.ngOnDestroy=function(){this.accordion.removeGroup(this)},n.prototype.toggleOpen=function(n){this.isDisabled||(this.isOpen=!this.isOpen)},n.decorators=[{type:t.Component,args:[{selector:"accordion-group, accordion-panel",template:'\n    <div class="panel card" [ngClass]="panelClass">\n      <div class="panel-heading card-header" role="tab" (click)="toggleOpen($event)">\n        <div class="panel-title">\n          <div role="button" class="accordion-toggle" [attr.aria-expanded]="isOpen">\n            <div *ngIf="heading"[ngClass]="{\'text-muted\': isDisabled}">{{heading}}</div>\n            <ng-content select="[accordion-heading]"></ng-content>\n          </div>\n        </div>\n      </div>\n      <div class="panel-collapse collapse" role="tabpanel" [collapse]="!isOpen">\n        <div class="panel-body card-block card-body">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  ',host:{class:"panel",style:"display: block"}}]}],n.ctorParameters=function(){return[{type:o.a,decorators:[{type:t.Inject,args:[o.a]}]}]},n.propDecorators={heading:[{type:t.Input}],panelClass:[{type:t.Input}],isDisabled:[{type:t.Input}],isOpen:[{type:t.HostBinding,args:["class.panel-open"]},{type:t.Input}]},n}()},1801:function(n,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.MAPPINGS={NgxBootstrap:{alias:"ngx-bootstrap",source:"https://unpkg.com/ngx-bootstrap"},Chance:{alias:"chance",source:"npm:chance@1.0.6"},ChartJs:{alias:"chart.js",source:"https://unpkg.com/chart.js@2.5.0/dist/Chart.min.js"},Ng2Charts:{alias:"ng2-charts",source:"https://unpkg.com/ng2-charts@1.5.0/bundles/ng2-charts.umd.min.js"}}},1802:function(n,a,s){"use strict";s.d(a,"a",function(){return o});var t=s(0),e=s(1804),o=function(){function n(){}return n.forRoot=function(){return{ngModule:n,providers:[]}},n.decorators=[{type:t.NgModule,args:[{declarations:[e.a],exports:[e.a]}]}],n.ctorParameters=function(){return[]},n}()},1803:function(n,a,s){"use strict";s.d(a,"a",function(){return l});var t=s(8),e=s(0),o=s(1802),p=s(1800),c=s(1798),i=s(1799),l=function(){function n(){}return n.forRoot=function(){return{ngModule:n,providers:[i.a]}},n.decorators=[{type:e.NgModule,args:[{imports:[t.CommonModule,o.a],declarations:[c.a,p.a],exports:[c.a,p.a]}]}],n.ctorParameters=function(){return[]},n}()},1804:function(n,a,s){"use strict";s.d(a,"a",function(){return e});var t=s(0),e=function(){function n(n,a){this.collapsed=new t.EventEmitter,this.expanded=new t.EventEmitter,this.isExpanded=!0,this.isCollapsed=!1,this.isCollapse=!0,this.isCollapsing=!1,this._el=n,this._renderer=a}return Object.defineProperty(n.prototype,"collapse",{get:function(){return this.isExpanded},set:function(n){this.isExpanded=n,this.toggle()},enumerable:!0,configurable:!0}),n.prototype.toggle=function(){this.isExpanded?this.hide():this.show()},n.prototype.hide=function(){this.isCollapse=!1,this.isCollapsing=!0,this.isExpanded=!1,this.isCollapsed=!0,this.isCollapse=!0,this.isCollapsing=!1,this.display="none",this.collapsed.emit(this)},n.prototype.show=function(){this.isCollapse=!1,this.isCollapsing=!0,this.isExpanded=!0,this.isCollapsed=!1,this.display="block",this.isCollapse=!0,this.isCollapsing=!1,this._renderer.setElementStyle(this._el.nativeElement,"overflow","visible"),this._renderer.setElementStyle(this._el.nativeElement,"height","auto"),this.expanded.emit(this)},n.decorators=[{type:t.Directive,args:[{selector:"[collapse]",exportAs:"bs-collapse",host:{"[class.collapse]":"true"}}]}],n.ctorParameters=function(){return[{type:t.ElementRef},{type:t.Renderer}]},n.propDecorators={collapsed:[{type:t.Output}],expanded:[{type:t.Output}],display:[{type:t.HostBinding,args:["style.display"]}],isExpanded:[{type:t.HostBinding,args:["class.in"]},{type:t.HostBinding,args:["class.show"]},{type:t.HostBinding,args:["attr.aria-expanded"]}],isCollapsed:[{type:t.HostBinding,args:["attr.aria-hidden"]}],isCollapse:[{type:t.HostBinding,args:["class.collapse"]}],isCollapsing:[{type:t.HostBinding,args:["class.collapsing"]}],collapse:[{type:t.Input}]},n}()},1806:function(n,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=s(1800);s.d(a,"AccordionPanelComponent",function(){return t.a});var e=s(1798);s.d(a,"AccordionComponent",function(){return e.a});var o=s(1803);s.d(a,"AccordionModule",function(){return o.a});var p=s(1799);s.d(a,"AccordionConfig",function(){return p.a})},2399:function(n,a,s){"use strict";var t=this&&this.__decorate||function(n,a,s,t){var e,o=arguments.length,p=o<3?a:null===t?t=Object.getOwnPropertyDescriptor(a,s):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,a,s,t);else for(var c=n.length-1;c>=0;c--)(e=n[c])&&(p=(o<3?e(p):o>3?e(a,s,p):e(a,s))||p);return o>3&&p&&Object.defineProperty(a,s,p),p},e=this&&this.__metadata||function(n,a){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,a)};Object.defineProperty(a,"__esModule",{value:!0});var o=s(0),p=s(8),c=s(25),i=s(464),l=s(184),u=s(465),r=s(2400),d=s(466),k=s(83),m=s(1806),g=[r.ComponentsMediaPlayerComponent],v=[{path:"**",component:u.DocumentationCategoryComponent,data:{category:l.ResolverService.resolveCategoryData(l.DocumentationPage.Components,"Media Player")}}],h=function(){function n(n,a){a.registerResolver(n)}return n}();h=t([o.NgModule({imports:[d.TabsModule.forRoot(),k.MediaPlayerModule,k.RadioButtonModule,m.AccordionModule.forRoot(),i.DocumentationComponentsModule,p.CommonModule,c.RouterModule.forChild(v)],exports:g,declarations:g,entryComponents:g}),e("design:paramtypes",[o.ComponentFactoryResolver,l.ResolverService])],h),a.ComponentsMediaPlayerModule=h},2400:function(n,a,s){"use strict";var t=this&&this.__extends||function(){var n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var s in a)a.hasOwnProperty(s)&&(n[s]=a[s])};return function(a,s){function t(){this.constructor=a}n(a,s),a.prototype=null===s?Object.create(s):(t.prototype=s.prototype,new t)}}(),e=this&&this.__decorate||function(n,a,s,t){var e,o=arguments.length,p=o<3?a:null===t?t=Object.getOwnPropertyDescriptor(a,s):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,a,s,t);else for(var c=n.length-1;c>=0;c--)(e=n[c])&&(p=(o<3?e(p):o>3?e(a,s,p):e(a,s))||p);return o>3&&p&&Object.defineProperty(a,s,p),p},o=this&&this.__metadata||function(n,a){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,a)};Object.defineProperty(a,"__esModule",{value:!0});var p=s(0),c=s(463),i=s(1797),l=s(1801),u=function(n){function a(){var a=n.call(this,s(2401))||this;return a.type="video",a.mode="standard",a.videoSource=s(2405),a.audioSource=s(2406),a.plunk={files:{"app.component.ts":a.snippets.raw.appTs,"app.component.html":a.snippets.raw.appHtml,"app.component.css":a.snippets.raw.appCss},modules:[{imports:["RadioButtonModule","MediaPlayerModule"],library:"@ux-aspects/ux-aspects"},{imports:["AccordionModule"],forRoot:!0,library:"ngx-bootstrap"}],mappings:[l.MAPPINGS.NgxBootstrap]},a}return t(a,n),a}(i.BaseDocumentationSection);u=e([p.Component({selector:"uxd-components-media-player",template:s(2407),styles:[s(2408)]}),c.DocumentationSectionComponent("ComponentsMediaPlayerComponent"),o("design:paramtypes",[])],u),a.ComponentsMediaPlayerComponent=u},2401:function(n,a,s){function t(n){return s(e(n))}function e(n){var a=o[n];if(!(a+1))throw new Error("Cannot find module '"+n+"'.");return a}var o={"./app.css":2402,"./app.html":2403,"./app.ts":2404};t.keys=function(){return Object.keys(o)},t.resolve=e,n.exports=t,t.id=2401},2402:function(n,a){n.exports={snippet:'<span class="token selector">.media-player.standard.video</span> <span class="token punctuation">{</span>\n    <span class="token property">height</span><span class="token punctuation">:</span> 560px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.media-player.standard.video.quiet</span> <span class="token punctuation">{</span>\n    <span class="token property">height</span><span class="token punctuation">:</span> 490px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.media-player.standard.audio</span> <span class="token punctuation">{</span>\n    <span class="token property">width</span><span class="token punctuation">:</span> 450px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:".media-player.standard.video {\n    height: 560px;\n}\n\n.media-player.standard.video.quiet {\n    height: 490px;\n}\n\n.media-player.standard.audio {\n    width: 450px;\n}"}},2403:function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-media-player</span> <span class="token attr-name">*ngIf</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type === <span class="token punctuation">\'</span>video<span class="token punctuation">\'</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>media-player<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>video<span class="token punctuation">"</span></span> \n    <span class="token attr-name">[source]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>videoSource<span class="token punctuation">"</span></span> <span class="token attr-name">[quietMode]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>mode === <span class="token punctuation">\'</span>quiet<span class="token punctuation">\'</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-media-player</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-media-player</span> <span class="token attr-name">*ngIf</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type === <span class="token punctuation">\'</span>audio<span class="token punctuation">\'</span><span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>media-player<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>audio<span class="token punctuation">"</span></span> \n    <span class="token attr-name">[source]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>audioSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-media-player</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row uxd-customize-example<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>accordion</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>accordion-group</span> <span class="token attr-name">heading</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Customize Example...<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row uxd-customize-row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-4 col-sm-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dataSet<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Format<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-radio-button</span> <span class="token attr-name">[(value)]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type<span class="token punctuation">"</span></span> <span class="token attr-name">option</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>video<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Video<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-radio-button</span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-radio-button</span> <span class="token attr-name">[(value)]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type<span class="token punctuation">"</span></span> <span class="token attr-name">option</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>audio<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Audio<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-radio-button</span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row uxd-customize-row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-4 col-sm-12<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>dataSet<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Mode<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n                        \n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-radio-button</span> <span class="token attr-name">[(value)]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>mode<span class="token punctuation">"</span></span> <span class="token attr-name">option</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>standard<span class="token punctuation">"</span></span> \n                            <span class="token attr-name">[disabled]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type === <span class="token punctuation">\'</span>audio<span class="token punctuation">\'</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Standard<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-radio-button</span><span class="token punctuation">></span></span>\n                        \n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-radio-button</span> <span class="token attr-name">[(value)]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>mode<span class="token punctuation">"</span></span> <span class="token attr-name">option</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>quiet<span class="token punctuation">"</span></span> \n                            <span class="token attr-name">[disabled]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>type === <span class="token punctuation">\'</span>audio<span class="token punctuation">\'</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Quiet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-radio-button</span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>accordion-group</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>accordion</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<ux-media-player *ngIf="type === \'video\'" class="media-player" type="video" \n    [source]="videoSource" [quietMode]="mode === \'quiet\'"></ux-media-player>\n\n<ux-media-player *ngIf="type === \'audio\'" class="media-player" type="audio" \n    [source]="audioSource"></ux-media-player>\n\n<div class="row uxd-customize-example">\n    <div class="col-md-12">\n        <accordion>\n            <accordion-group heading="Customize Example...">\n\n                <div class="row uxd-customize-row">\n                    <div class="col-md-4 col-sm-12">\n                        <label for="dataSet">Format</label>\n                        <ux-radio-button [(value)]="type" option="video">Video</ux-radio-button>\n                        <ux-radio-button [(value)]="type" option="audio">Audio</ux-radio-button>\n                    </div>\n                </div>\n\n                <div class="row uxd-customize-row">\n                    <div class="col-md-4 col-sm-12">\n                        <label for="dataSet">Mode</label>\n                        \n                        <ux-radio-button [(value)]="mode" option="standard" \n                            [disabled]="type === \'audio\'">Standard</ux-radio-button>\n                        \n                        <ux-radio-button [(value)]="mode" option="quiet" \n                            [disabled]="type === \'audio\'">Quiet</ux-radio-button>\n                    </div>\n                </div>\n            </accordion-group>\n        </accordion>\n    </div>\n</div>'}},2404:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token punctuation">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token punctuation">:</span> <span class="token string">\'./src/app.component.html\'</span><span class="token punctuation">,</span>\n    styleUrls<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'./src/app.component.css\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    type<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'video\'</span><span class="token punctuation">;</span>\n    mode<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token string">\'standard\'</span><span class="token punctuation">;</span>\n\n    videoSource<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>uxdAssetsUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/media/catchingwave.mp4`</span></span><span class="token punctuation">;</span>\n    audioSource<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>uxdAssetsUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/media/Ocean-Waves.mp3`</span></span><span class="token punctuation">;</span>\n\n<span class="token punctuation">}</span>',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './src/app.component.html',\n    styleUrls: ['./src/app.component.css']\n})\nexport class AppComponent {\n\n    type: string = 'video';\n    mode: string = 'standard';\n\n    videoSource: string = `${uxdAssetsUrl}/media/catchingwave.mp4`;\n    audioSource: string = `${uxdAssetsUrl}/media/Ocean-Waves.mp3`;\n\n}"}},2405:function(n,a,s){n.exports=s.p+"assets/catchingwave.mp4"},2406:function(n,a,s){n.exports=s.p+"assets/Ocean-Waves.mp3"},2407:function(n,a){n.exports='<ux-media-player *ngIf="type === \'video\'" class="media-player" type="video" [source]="videoSource"\n    [quietMode]="mode === \'quiet\'"></ux-media-player>\n<ux-media-player *ngIf="type === \'audio\'" class="media-player" type="audio" [source]="audioSource"></ux-media-player>\n\n<div class="row uxd-customize-example">\n    <div class="col-md-12">\n        <accordion>\n            <accordion-group heading="Customize Example...">\n\n                <div class="row uxd-customize-row">\n                    <div class="col-md-4 col-sm-12">\n                        <label for="dataSet">Format</label>\n                        <ux-radio-button [(value)]="type" option="video">Video</ux-radio-button>\n                        <ux-radio-button [(value)]="type" option="audio">Audio</ux-radio-button>\n                    </div>\n                </div>\n\n                <div class="row uxd-customize-row">\n                    <div class="col-md-4 col-sm-12">\n                        <label for="dataSet">Mode</label>\n                        <ux-radio-button [(value)]="mode" option="standard" [disabled]="type === \'audio\'">Standard</ux-radio-button>\n                        <ux-radio-button [(value)]="mode" option="quiet" [disabled]="type === \'audio\'">Quiet</ux-radio-button>\n                    </div>\n                </div>\n            </accordion-group>\n        </accordion>\n    </div>\n</div>\n\n<hr>\n\n<p>\n    The media player component can be used to view video and audio files. It supports a range of the most popular video and audio\n    file formats. A comprehensive list of supported formats in each browser can be <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats">found here</a>.\n</p>\n\n<p>To add a media player to your page use the <code>ux-media-player</code> selector. The following attributes can be used to\n    configure the appearance and behavior of the media player:</p>\n\n<div class="demo-attributes table-responsive">\n    <table class="table m-t">\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n\n        <tbody>\n            <tr>\n                <td><b>@Input</b> type</td>\n                <td>string</td>\n                <td>\n                    Defines the appearance of the media player. The two possible values are <code>video</code> and <code>audio</code>.\n                    The media player will adapt it\'s appearance to best suit the type specified.\n                </td>\n            </tr>\n\n            <tr>\n                <td><b>@Input</b> source</td>\n                <td>string</td>\n                <td>The url to the media file to be loaded by the media player.</td>\n            </tr>\n\n            <tr>\n                <td><b>@Input</b> quietMode</td>\n                <td>boolean</td>\n                <td>\n                    If enabled, the controls in the media player will be hidden unless the mouse is over the player and will appear in a darker\n                    style. Dark mode is automatically enabled in full screen mode. Quiet mode is only available for videos.</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<p>The following code can be used to create the example above:</p>\n\n<tabset>\n    <tab heading="HTML">\n        <uxd-snippet [content]="snippets.compiled.appHtml"></uxd-snippet>\n    </tab>\n    <tab heading="TypeScript">\n        <uxd-snippet [content]="snippets.compiled.appTs"></uxd-snippet>\n    </tab>\n    <tab heading="CSS">\n        <uxd-snippet [content]="snippets.compiled.appCss"></uxd-snippet>\n    </tab>\n</tabset>'},2408:function(n,a,s){var t=s(2409);n.exports="string"==typeof t?t:t.toString()},2409:function(n,a,s){a=n.exports=s(12)(void 0),a.push([n.i,".media-player.standard.video {\n  height: 560px;\n}\n.media-player.standard.video.quiet {\n  height: 490px;\n}\n.media-player.standard.audio {\n  width: 450px;\n}\n",""])}});