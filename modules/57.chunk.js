webpackJsonp([57],{1862:function(e,t,o){"use strict";var n=this&&this.__decorate||function(e,t,o,n){var a,i=arguments.length,r=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(r=(i<3?a(r):i>3?a(t,o,r):a(t,o))||r);return i>3&&r&&Object.defineProperty(t,o,r),r},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),r=o(18),c=o(260),p=o(140),l=o(261),s=o(1863),d=[s.CssPageTitleComponent],u=[{path:"**",component:l.DocumentationCategoryComponent,data:{category:p.ResolverService.resolveCategoryData(p.DocumentationPage.Css,"Page Title")}}],f=function(){function e(e,t){t.registerResolver(e)}return e}();f=n([i.NgModule({imports:[c.DocumentationComponentsModule,r.RouterModule.forChild(u)],exports:d,declarations:d,entryComponents:d}),a("design:paramtypes",[i.ComponentFactoryResolver,p.ResolverService])],f),t.CssPageTitleModule=f},1863:function(e,t,o){"use strict";var n=this&&this.__decorate||function(e,t,o,n){var a,i=arguments.length,r=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(a=e[c])&&(r=(i<3?a(r):i>3?a(t,o,r):a(t,o))||r);return i>3&&r&&Object.defineProperty(t,o,r),r};Object.defineProperty(t,"__esModule",{value:!0});var a=o(0),i=o(259),r=function(){function e(){this.jsCode=o(2806),this.htmlCode=o(2805)}return e}();r=n([a.Component({selector:"uxd-css-page-title-page-title",template:o(2189)}),i.DocumentationSectionComponent("CssPageTitleComponent")],r),t.CssPageTitleComponent=r},2189:function(e,t){e.exports='<p>When defining states for your application specify a <code>pageTitle</code> property for the <code>data</code> option when\n  defining your state.</p>\n\n<uxd-snippet language="javascript" [code]="jsCode"></uxd-snippet>\n\n<p>Specify the <code>page-title</code> attribute on the <code>title</code> element. You can specify a default page title in\n  the <code>page-title</code> attribute. Note that your app must be defined on the <code>html</code> element.</p>\n\n<uxd-snippet [code]="htmlCode"></uxd-snippet>'},2805:function(e,t){e.exports='<!DOCTYPE html>\n<html ng-app="ux-aspects">\n  <head>\n    <title page-title="UX Aspects"></title>\n  </head>\n  <body>\n  </body>\n</html>'},2806:function(e,t){e.exports="$stateProvider.state('pagetitle', {\n    url: '/pagetitle',\n    templateUrl: \"app/pageTitle/pageTitle.html\",\n    controller: \"PageTitleCtrl as pt\",\n    data: {\n        pageTitle:'Page Title'\n    }\n});"}});