(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"5GH2":function(n,a,t){var s={"./app.html":"hIQ+","./app.ts":"LcJ0"};function e(n){var a=p(n);return t(a)}function p(n){if(!t.o(s,n)){var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}return s[n]}e.keys=function(){return Object.keys(s)},e.resolve=p,n.exports=e,e.id="5GH2"},LcJ0:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    value<span class="token operator">:</span> number <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>\n\n    <span class="token function">randomize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent {\n\n    value: number = 15;\n\n    randomize() {\n        this.value = Math.floor((Math.random() * 100) + 1);\n    }\n}\n"}},h7Qg:function(n,a,t){"use strict";t.r(a),t.d(a,"ComponentsProgressModule",(function(){return y}));var s,e=t("tyNb"),p=t("7Q8i"),o=t("XtaT"),c=t("T/2f"),r=t("YZ8U"),u=t("AVdU"),l=t("yHOM"),i=t("fXoL"),b=t("+gXg"),k=t("2RDK"),m=t("COk8"),d=(s=function(n,a){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(n[t]=a[t])})(n,a)},function(n,a){function t(){this.constructor=n}s(n,a),n.prototype=null===a?Object.create(a):(t.prototype=a.prototype,new t)}),f=function(n,a){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,a)},g=[function(n){function a(){var a=n.call(this,t("5GH2"))||this;return a.value=15,a.playground={files:{"app.component.html":a.snippets.raw.appHtml,"app.component.ts":a.snippets.raw.appTs},modules:[{imports:["ProgressBarModule"],library:"@ux-aspects/ux-aspects"}]},a}return d(a,n),a.prototype.randomize=function(){this.value=Math.floor(100*Math.random()+1)},a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=i.Jb({type:a,selectors:[["uxd-progress-bar"]],features:[i.wb],decls:68,vars:5,consts:[["max","100",1,"m-b-md",3,"value"],["aria-hidden","true"],["type","button",1,"btn","btn-primary",3,"click"],["tableTitle","Inputs"],["uxd-api-property","","name","value","type","number"],["uxd-api-property","","name","min","type","number","defaultValue","0"],["uxd-api-property","","name","max","type","number","defaultValue","100"],["uxd-api-property","","name","trackColor","type","string","defaultValue","grey7"],["uxd-api-property","","name","barColor","type","string","defaultValue","accent"],[3,"minimal"],["heading","HTML"],["language","html",3,"content"],["heading","JavaScript"],["language","javascript",3,"content"]],template:function(n,a){1&n&&(i.Vb(0,"ux-progress-bar",0),i.Nc(1,"\n    "),i.Vb(2,"span",1),i.Nc(3),i.Ub(),i.Nc(4,"\n"),i.Ub(),i.Nc(5,"\n\n"),i.Vb(6,"button",2),i.cc("click",(function(){return a.randomize()})),i.Nc(7,"Random"),i.Ub(),i.Nc(8,"\n\n"),i.Qb(9,"hr"),i.Nc(10,"\n\n"),i.Vb(11,"p"),i.Nc(12,"\n    A progress bar can be created by using the "),i.Vb(13,"code"),i.Nc(14,"ux-progress-bar"),i.Ub(),i.Nc(15," component. Custom content can be added to the\n    bar by adding HTML inside the "),i.Vb(16,"code"),i.Nc(17,"ux-progress-bar"),i.Ub(),i.Nc(18," tag.\n"),i.Ub(),i.Nc(19,"\n\n"),i.Vb(20,"p"),i.Nc(21,"\n    Additional contextual information can be provided to screen readers by adding an "),i.Vb(22,"code"),i.Nc(23,"aria-valuetext"),i.Ub(),i.Nc(24," attribute\n    to the "),i.Vb(25,"code"),i.Nc(26,"ux-progress-bar"),i.Ub(),i.Nc(27,".\n"),i.Ub(),i.Nc(28,"\n\n"),i.Vb(29,"p"),i.Nc(30,"\n    The following attributes can be used to configure the appearance and behavior of the progress bar:\n"),i.Ub(),i.Nc(31,"\n\n"),i.Vb(32,"uxd-api-properties",3),i.Nc(33,"\n    "),i.Vb(34,"tr",4),i.Nc(35,"\n        The value the bar should represent. This will be compared to the "),i.Vb(36,"code"),i.Nc(37,"max"),i.Ub(),i.Nc(38," value to determine the width of\n        the bar.\n    "),i.Ub(),i.Nc(39,"\n    "),i.Vb(40,"tr",5),i.Nc(41,"\n        The lower limit of the bar.\n    "),i.Ub(),i.Nc(42,"\n    "),i.Vb(43,"tr",6),i.Nc(44,"\n        The upper limit of the bar.\n    "),i.Ub(),i.Nc(45,"\n    "),i.Vb(46,"tr",7),i.Nc(47,"\n        The color of the track.\n    "),i.Ub(),i.Nc(48,"\n    "),i.Vb(49,"tr",8),i.Nc(50,"\n        The color of the bar.\n    "),i.Ub(),i.Nc(51,"\n"),i.Ub(),i.Nc(52,"\n\n"),i.Vb(53,"p"),i.Nc(54,"The following code can be used to create the example above:"),i.Ub(),i.Nc(55,"\n\n"),i.Vb(56,"ux-tabset",9),i.Nc(57,"\n    "),i.Vb(58,"ux-tab",10),i.Nc(59,"\n        "),i.Qb(60,"uxd-snippet",11),i.Nc(61,"\n    "),i.Ub(),i.Nc(62,"\n    "),i.Vb(63,"ux-tab",12),i.Nc(64,"\n        "),i.Qb(65,"uxd-snippet",13),i.Nc(66,"\n    "),i.Ub(),i.Nc(67,"\n"),i.Ub()),2&n&&(i.nc("value",a.value),i.zb(3),i.Pc("",a.value,"%"),i.zb(53),i.nc("minimal",!1),i.zb(4),i.nc("content",a.snippets.compiled.appHtml),i.zb(5),i.nc("content",a.snippets.compiled.appTs))},directives:[p.Mc,p.P,b.a,k.a,p.Md,p.Hd,m.a],encapsulation:2}),a=function(n,a,t,s){var e,p=arguments.length,o=p<3?a:null===s?s=Object.getOwnPropertyDescriptor(a,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,a,t,s);else for(var c=n.length-1;c>=0;c--)(e=n[c])&&(o=(p<3?e(o):p>3?e(a,t,o):e(a,t))||o);return p>3&&o&&Object.defineProperty(a,t,o),o}([Object(l.a)("ComponentsProgressBarComponent"),f("design:paramtypes",[])],a)}(u.a)],h=[{path:"**",component:c.a,data:{category:r.b.resolveCategoryData(r.a.Components,"Progress")}}],y=function(){function n(n,a){a.registerResolver(n,g)}return n.\u0275mod=i.Nb({type:n}),n.\u0275inj=i.Mb({factory:function(a){return new(a||n)(i.Zb(i.j),i.Zb(r.b))},imports:[[o.a,p.Nc,e.i.forChild(h),p.Nd]]}),n}()},"hIQ+":function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-progress-bar</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>m-b-md<span class="token punctuation">"</span></span> <span class="token attr-name">[value]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>value<span class="token punctuation">"</span></span> <span class="token attr-name">max</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{ value }}%<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-progress-bar</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn-primary<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>randomize()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Random<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>',example:'<ux-progress-bar class="m-b-md" [value]="value" max="100">\n    <span>{{ value }}%</span>\n</ux-progress-bar>\n\n<button type="button" class="btn btn-primary" (click)="randomize()">Random</button>'}}}]);