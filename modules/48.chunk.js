(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{FciI:function(n,s){n.exports={snippet:'<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">HelpCenterItem</span> <span class="token punctuation">{</span>\n    icon<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">;</span>\n    title<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    select<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>'}},J0h8:function(n,s){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-page-header</span> <span class="token attr-name">[crumbs]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>crumbs<span class="token punctuation">"</span></span> <span class="token attr-name">header</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Repositories<span class="token punctuation">"</span></span> <span class="token attr-name">[iconMenus]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>menus<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-page-header</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>help-center-toolbar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn button-primary<span class="token punctuation">"</span></span> <span class="token attr-name">[disabled]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>loading<span class="token punctuation">"</span></span>\n            <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>loadData()<span class="token punctuation">"</span></span> <span class="token attr-name">[uxHelpCenterItem]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>refreshHelpCenterItem<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>refresh<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>p-r-xs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span> Refresh\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>table-responsive<span class="token punctuation">"</span></span> <span class="token attr-name">*ngIf</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>!loading<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>table table-hover<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>thead</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>table-header-dark<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>NAME<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>TYPE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>LOCATION<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>ITEMS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>th</span><span class="token punctuation">></span></span>SIZE (GB)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>th</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>thead</span><span class="token punctuation">></span></span>\n\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tbody</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>let repository of repositories<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text-black<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ repository.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>{{ repository.type }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>{{ repository.location }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>{{ repository.items | number }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>{{ repository.size }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tbody</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n<span class="token comment">&lt;!-- Loading Indicator --\x3e</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>help-center-loading-container<span class="token punctuation">"</span></span> <span class="token attr-name">*ngIf</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>loading<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>indicator<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<ux-page-header [crumbs]="crumbs" header="Repositories" [iconMenus]="menus"></ux-page-header>\n\n<div class="help-center-toolbar">\n    <button class="btn button-primary" [disabled]="loading"\n            (click)="loadData()" [uxHelpCenterItem]="refreshHelpCenterItem">\n        <ux-icon name="refresh" class="p-r-xs"></ux-icon> Refresh\n    </button>\n</div>\n\n<div class="table-responsive" *ngIf="!loading">\n    <table class="table table-hover">\n        <thead>\n            <tr class="table-header-dark">\n                <th>NAME</th>\n                <th>TYPE</th>\n                <th>LOCATION</th>\n                <th>ITEMS</th>\n                <th>SIZE (GB)</th>\n            </tr>\n        </thead>\n\n        <tbody>\n            <tr *ngFor="let repository of repositories">\n                <td class="text-black">{{ repository.name }}</td>\n                <td>{{ repository.type }}</td>\n                <td>{{ repository.location }}</td>\n                <td>{{ repository.items | number }}</td>\n                <td>{{ repository.size }}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n\x3c!-- Loading Indicator --\x3e\n<div class="help-center-loading-container" *ngIf="loading">\n    <div class="indicator"></div>\n</div>'}},NBzj:function(n,s,a){"use strict";a.r(s);var t,p=a("Valr"),e=a("DUip"),o=a("7Q8i"),c=a("XtaT"),l=a("T/2f"),u=a("YZ8U"),i=(a("nmfD"),a("AVdU")),r=a("yHOM"),k=a("TYT/"),d=a("COk8"),m=(t=function(n,s){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,s){n.__proto__=s}||function(n,s){for(var a in s)s.hasOwnProperty(a)&&(n[a]=s[a])})(n,s)},function(n,s){function a(){this.constructor=n}t(n,s),n.prototype=null===s?Object.create(s):(a.prototype=s.prototype,new a)});function h(n,s){if(1&n&&(k.ac(0,"tr"),k.Sc(1,"\n                "),k.ac(2,"td",15),k.Sc(3),k.Zb(),k.Sc(4,"\n                "),k.ac(5,"td"),k.Sc(6),k.Zb(),k.Sc(7,"\n                "),k.ac(8,"td"),k.Sc(9),k.Zb(),k.Sc(10,"\n                "),k.ac(11,"td"),k.Sc(12),k.nc(13,"number"),k.Zb(),k.Sc(14,"\n                "),k.ac(15,"td"),k.Sc(16),k.Zb(),k.Sc(17,"\n            "),k.Zb()),2&n){var a=s.$implicit;k.Cb(3),k.Tc(a.name),k.Cb(3),k.Tc(a.type),k.Cb(3),k.Tc(a.location),k.Cb(3),k.Tc(k.oc(13,5,a.items)),k.Cb(4),k.Tc(a.size)}}function g(n,s){if(1&n&&(k.ac(0,"div",11),k.Sc(1,"\n    "),k.ac(2,"table",12),k.Sc(3,"\n        "),k.ac(4,"thead"),k.Sc(5,"\n            "),k.ac(6,"tr",13),k.Sc(7,"\n                "),k.ac(8,"th"),k.Sc(9,"NAME"),k.Zb(),k.Sc(10,"\n                "),k.ac(11,"th"),k.Sc(12,"TYPE"),k.Zb(),k.Sc(13,"\n                "),k.ac(14,"th"),k.Sc(15,"LOCATION"),k.Zb(),k.Sc(16,"\n                "),k.ac(17,"th"),k.Sc(18,"ITEMS"),k.Zb(),k.Sc(19,"\n                "),k.ac(20,"th"),k.Sc(21,"SIZE (GB)"),k.Zb(),k.Sc(22,"\n            "),k.Zb(),k.Sc(23,"\n        "),k.Zb(),k.Sc(24,"\n\n        "),k.ac(25,"tbody"),k.Sc(26,"\n            "),k.Qc(27,h,18,7,"tr",14),k.Sc(28,"\n        "),k.Zb(),k.Sc(29,"\n    "),k.Zb(),k.Sc(30,"\n"),k.Zb()),2&n){var a=k.mc();k.Cb(27),k.tc("ngForOf",a.repositories)}}function b(n,s){1&n&&(k.ac(0,"div",16),k.Sc(1,"\n    "),k.Vb(2,"div",17),k.Sc(3,"\n"),k.Zb())}var f=function(n){function s(s){var t=n.call(this,a("zF/y"))||this;return t._helpCenterService=s,t.repositories=[],t.loading=!1,t.crumbs=[{title:"Overview"}],t.menus=[{icon:"help",label:"Help Menu",dropdown:[]}],t.refreshHelpCenterItem={icon:"refresh",title:"Refresh Repositories",select:t.loadData.bind(t)},t.playground={files:{"app.component.html":t.snippets.raw.appHtml,"app.component.ts":t.snippets.raw.appTs,"app.component.css":t.snippets.raw.appCss},modules:[{imports:["HelpCenterModule","PageHeaderModule"],library:"@ux-aspects/ux-aspects"},{imports:["RouterModule"],library:"@angular/router",providers:["RouterModule.forRoot([])"]}]},t._helpCenter$=t._helpCenterService.items.subscribe((function(n){return t.menus[0].dropdown=n})),t.loadData(),t}return m(s,n),s.prototype.loadData=function(){var n=this;this.repositories=[],this.loading=!0;var s=["File System","Exchange","Other"];setTimeout((function(){for(var a=0;a<5;a++)n.repositories.push({name:"Repository "+chance.integer({min:1,max:100}),type:s[chance.integer({min:0,max:2})],items:chance.integer({min:0,max:1e6}),location:chance.country({full:!0}),size:chance.floating({fixed:1,min:1,max:20})});n.loading=!1}),2e3)},s.prototype.ngOnDestroy=function(){this._helpCenter$.unsubscribe()},s.\u0275fac=function(n){return new(n||s)(k.Ub(o.Eb))},s.\u0275cmp=k.Ob({type:s,selectors:[["uxd-components-help-center"]],features:[k.zb],decls:102,vars:11,consts:[["header","Repositories",3,"crumbs","iconMenus"],[1,"help-center-toolbar"],[1,"btn","button-primary",3,"disabled","uxHelpCenterItem","click"],["name","refresh",1,"p-r-xs"],["class","table-responsive",4,"ngIf"],["class","help-center-loading-container",4,"ngIf"],[3,"content"],[3,"minimal"],["heading","HTML"],["heading","TypeScript"],["heading","CSS"],[1,"table-responsive"],[1,"table","table-hover"],[1,"table-header-dark"],[4,"ngFor","ngForOf"],[1,"text-black"],[1,"help-center-loading-container"],[1,"indicator"]],template:function(n,s){1&n&&(k.Vb(0,"ux-page-header",0),k.Sc(1,"\n\n"),k.ac(2,"div",1),k.Sc(3,"\n    "),k.ac(4,"button",2),k.ic("click",(function(){return s.loadData()})),k.Sc(5,"\n        "),k.Vb(6,"ux-icon",3),k.Sc(7," Refresh\n    "),k.Zb(),k.Sc(8,"\n"),k.Zb(),k.Sc(9,"\n\n"),k.Qc(10,g,31,1,"div",4),k.Sc(11,"\n\n"),k.Sc(12,"\n"),k.Qc(13,b,4,0,"div",5),k.Sc(14,"\n\n"),k.Vb(15,"hr"),k.Sc(16,"\n\n"),k.ac(17,"p"),k.Sc(18,"\n    The help center is designed to allow you to easily provide a list of actions to assist the user. This can either be help\n    with particular things specific to the current page or general help items relevant to all pages. We recommend\n    displaying help center items in a dropdown in the page header, however you are not limited to this.\n"),k.Zb(),k.Sc(19,"\n\n"),k.ac(20,"p"),k.Sc(21,"\n    We provide two ways to utilize the help center functionality. The first is the "),k.ac(22,"code"),k.Sc(23,"HelpCenterService"),k.Zb(),k.Sc(24," which can\n    be injected into any component. The service exposes two functions:\n"),k.Zb(),k.Sc(25,"\n\n"),k.ac(26,"ul"),k.Sc(27,"\n    "),k.ac(28,"li"),k.Sc(29,"\n        "),k.ac(30,"code"),k.Sc(31,"registerItem"),k.Zb(),k.Sc(32," - This allows you to add a new item to the help center. It expects one argument, an object\n        following the "),k.ac(33,"code"),k.Sc(34,"HelpCenterItem"),k.Zb(),k.Sc(35," interface.\n    "),k.Zb(),k.Sc(36,"\n\n    "),k.ac(37,"li"),k.Sc(38,"\n        "),k.ac(39,"code"),k.Sc(40,"unregisterItem"),k.Zb(),k.Sc(41," - This allows you to remove an item from the help center. It expects one argument, an\n        object following the "),k.ac(42,"code"),k.Sc(43,"HelpCenterItem"),k.Zb(),k.Sc(44," interface.\n    "),k.Zb(),k.Sc(45,"\n"),k.Zb(),k.Sc(46,"\n\n"),k.ac(47,"p"),k.Sc(48,"\n    The service exposes an "),k.ac(49,"code"),k.Sc(50,"items"),k.Zb(),k.Sc(51," property which is a "),k.ac(52,"code"),k.Sc(53,"BehaviorSubject"),k.Zb(),k.Sc(54," of "),k.ac(55,"code"),k.Sc(56,"HelpCenterItems"),k.Zb(),k.Sc(57,".\n    This can be subscribed to and can be used to show the Help Center items in your UI. It is designed to work well with\n    the "),k.ac(58,"code"),k.Sc(59,"ux-page-header"),k.Zb(),k.Sc(60," component icon menus as seen in the example above.\n"),k.Zb(),k.Sc(61,"\n\n"),k.ac(62,"p"),k.Sc(63,"\n    If you wish to associate an element on a page with a help center item you can use the "),k.ac(64,"code"),k.Sc(65,"uxHelpCenterItem"),k.Zb(),k.Sc(66," directive\n    which will show the help center item when the element is on the current page and remove it when the user navigates away\n    from the page.\n"),k.Zb(),k.Sc(67,"\n\n"),k.ac(68,"p"),k.Sc(69,"\n    The "),k.ac(70,"code"),k.Sc(71,"uxHelpCenterItem"),k.Zb(),k.Sc(72," directive expects a value containing an object that follows the "),k.ac(73,"code"),k.Sc(74,"HelpCenterItem"),k.Zb(),k.Sc(75," interface.\n"),k.Zb(),k.Sc(76,"\n\nThe "),k.ac(77,"code"),k.Sc(78,"HelpCenterItem"),k.Zb(),k.Sc(79," interface is as follows:\n\n"),k.Vb(80,"uxd-snippet",6),k.Sc(81,"\n\n"),k.ac(82,"p"),k.Sc(83,"\n    The following code can be used to create the example above:\n"),k.Zb(),k.Sc(84,"\n\n"),k.ac(85,"ux-tabset",7),k.Sc(86,"\n    "),k.ac(87,"ux-tab",8),k.Sc(88,"\n        "),k.Vb(89,"uxd-snippet",6),k.Sc(90,"\n    "),k.Zb(),k.Sc(91,"\n\n    "),k.ac(92,"ux-tab",9),k.Sc(93,"\n        "),k.Vb(94,"uxd-snippet",6),k.Sc(95,"\n    "),k.Zb(),k.Sc(96,"\n\n    "),k.ac(97,"ux-tab",10),k.Sc(98,"\n        "),k.Vb(99,"uxd-snippet",6),k.Sc(100,"\n    "),k.Zb(),k.Sc(101,"\n"),k.Zb()),2&n&&(k.tc("crumbs",s.crumbs)("iconMenus",s.menus),k.Cb(4),k.tc("disabled",s.loading)("uxHelpCenterItem",s.refreshHelpCenterItem),k.Cb(6),k.tc("ngIf",!s.loading),k.Cb(3),k.tc("ngIf",s.loading),k.Cb(67),k.tc("content",s.snippets.compiled.interfaceSnippetTs),k.Cb(5),k.tc("minimal",!1),k.Cb(4),k.tc("content",s.snippets.compiled.appHtml),k.Cb(5),k.tc("content",s.snippets.compiled.appTs),k.Cb(5),k.tc("content",s.snippets.compiled.appCss))},directives:[o.zc,o.N,o.Cb,o.Lb,p.t,d.a,o.Kd,o.Fd,p.s],pipes:[p.g],styles:[".help-center-toolbar[_ngcontent-%COMP%]{margin:10px 0}.help-center-loading-container[_ngcontent-%COMP%]{display:flex;justify-content:center}"]}),s=function(n,s,a,t){var p,e=arguments.length,o=e<3?s:null===t?t=Object.getOwnPropertyDescriptor(s,a):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,s,a,t);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(o=(e<3?p(o):e>3?p(s,a,o):p(s,a))||o);return e>3&&o&&Object.defineProperty(s,a,o),o}([Object(r.a)("ComponentsHelpCenterComponent")],s)}(i.a);a.d(s,"ComponentsHelpCenterModule",(function(){return v}));var y=[f],S=[{path:"**",component:l.a,data:{category:u.b.resolveCategoryData(u.a.Components,"Help Center")}}],v=function(){function n(n,s){s.registerResolver(n,y)}return n.\u0275mod=k.Sb({type:n}),n.\u0275inj=k.Rb({factory:function(s){return new(s||n)(k.ec(k.j),k.ec(u.b))},imports:[[p.c,c.a,o.Db,o.Mb,o.Ac,e.i.forChild(S),o.Ld]]}),n}();("undefined"==typeof ngJitMode||ngJitMode)&&k.Mc(v,{declarations:[f],imports:[p.c,c.a,o.Db,o.Mb,o.Ac,e.i,o.Ld],exports:[f]})},azer:function(n,s){n.exports={snippet:'<span class="token selector">.help-center-toolbar</span> <span class="token punctuation">{</span>\n    <span class="token property">margin</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.help-center-loading-container</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n    <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:".help-center-toolbar {\n    margin: 10px 0;\n}\n\n.help-center-loading-container {\n    display: flex;\n    justify-content: center;\n}"}},xwOu:function(n,s){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component<span class="token punctuation">,</span> OnDestroy <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Breadcrumb<span class="token punctuation">,</span> HelpCenterItem<span class="token punctuation">,</span> HelpCenterService<span class="token punctuation">,</span> PageHeaderIconMenu <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@ux-aspects/ux-aspects\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'chance\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Subscription <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'rxjs\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span><span class="token punctuation">,</span>\n    styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'./app.component.css\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnDestroy</span> <span class="token punctuation">{</span>\n\n    repositories<span class="token operator">:</span> HelpCenterTableData<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    crumbs<span class="token operator">:</span> Breadcrumb<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">\'Overview\'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    loading<span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n    menus<span class="token operator">:</span> PageHeaderIconMenu<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            icon<span class="token operator">:</span> <span class="token string">\'help\'</span><span class="token punctuation">,</span>\n            dropdown<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    refreshHelpCenterItem<span class="token operator">:</span> HelpCenterItem <span class="token operator">=</span> <span class="token punctuation">{</span>\n        icon<span class="token operator">:</span> <span class="token string">\'refresh\'</span><span class="token punctuation">,</span>\n        title<span class="token operator">:</span> <span class="token string">\'Refresh Repositories\'</span><span class="token punctuation">,</span>\n        select<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadData</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">private</span> _helpCenter$<span class="token operator">:</span> Subscription<span class="token punctuation">;</span>\n\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> _helpCenterService<span class="token operator">:</span> HelpCenterService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n        <span class="token comment">// update the menu items when new ones are added</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>_helpCenter$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_helpCenterService<span class="token punctuation">.</span>items\n            <span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">items</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>menus<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>dropdown <span class="token operator">=</span> items<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// load table data</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">loadData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n\n        <span class="token keyword">this</span><span class="token punctuation">.</span>repositories <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">let</span> types <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'File System\'</span><span class="token punctuation">,</span> <span class="token string">\'Exchange\'</span><span class="token punctuation">,</span> <span class="token string">\'Other\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// add delay to simulate loading</span>\n        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n\n            <span class="token comment">// generate some sample data</span>\n            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> idx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> idx <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> idx<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>repositories<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                    name<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Repository </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> min<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">100</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n                    type<span class="token operator">:</span> types<span class="token punctuation">[</span>chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> min<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n                    items<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> min<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">1000000</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                    location<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">country</span><span class="token punctuation">(</span><span class="token punctuation">{</span> full<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                    size<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">floating</span><span class="token punctuation">(</span><span class="token punctuation">{</span> fixed<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> min<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">ngOnDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>_helpCenter$<span class="token punctuation">.</span><span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">interface</span> <span class="token class-name">HelpCenterTableData</span> <span class="token punctuation">{</span>\n    name<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    type<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    location<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    items<span class="token operator">:</span> number<span class="token punctuation">;</span>\n    size<span class="token operator">:</span> number<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:"import { Component, OnDestroy } from '@angular/core';\nimport { Breadcrumb, HelpCenterItem, HelpCenterService, PageHeaderIconMenu } from '@ux-aspects/ux-aspects';\nimport 'chance';\nimport { Subscription } from 'rxjs';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html',\n    styleUrls: ['./app.component.css']\n})\nexport class AppComponent implements OnDestroy {\n\n    repositories: HelpCenterTableData[] = [];\n    crumbs: Breadcrumb[] = [{ title: 'Overview' }];\n    loading: boolean = false;\n\n    menus: PageHeaderIconMenu[] = [\n        {\n            icon: 'help',\n            dropdown: []\n        }\n    ];\n\n    refreshHelpCenterItem: HelpCenterItem = {\n        icon: 'refresh',\n        title: 'Refresh Repositories',\n        select: this.loadData.bind(this)\n    };\n\n    private _helpCenter$: Subscription;\n\n    constructor(private _helpCenterService: HelpCenterService) {\n\n        // update the menu items when new ones are added\n        this._helpCenter$ = this._helpCenterService.items\n            .subscribe(items => this.menus[0].dropdown = items);\n\n        // load table data\n        this.loadData();\n    }\n\n    loadData(): void {\n\n        this.repositories = [];\n        this.loading = true;\n\n        let types = ['File System', 'Exchange', 'Other'];\n\n        // add delay to simulate loading\n        setTimeout(() => {\n\n            // generate some sample data\n            for (let idx = 0; idx < 5; idx++) {\n                this.repositories.push({\n                    name: `Repository ${chance.integer({ min: 1, max: 100 })}`,\n                    type: types[chance.integer({ min: 0, max: 2 })],\n                    items: chance.integer({ min: 0, max: 1000000 }),\n                    location: chance.country({ full: true }),\n                    size: chance.floating({ fixed: 1, min: 1, max: 20 })\n                });\n            }\n\n            this.loading = false;\n        }, 2000);\n    }\n\n    ngOnDestroy(): void {\n        this._helpCenter$.unsubscribe();\n    }\n}\n\ninterface HelpCenterTableData {\n    name: string;\n    type: string;\n    location: string;\n    items: number;\n    size: number;\n}"}},"zF/y":function(n,s,a){var t={"./app.css":"azer","./app.html":"J0h8","./app.ts":"xwOu","./interface.snippet.ts":"FciI"};function p(n){var s=e(n);return a(s)}function e(n){if(!a.o(t,n)){var s=new Error("Cannot find module '"+n+"'");throw s.code="MODULE_NOT_FOUND",s}return t[n]}p.keys=function(){return Object.keys(t)},p.resolve=e,n.exports=p,p.id="zF/y"}}]);