(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"4ngj":function(n,t){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>static-tooltip-demo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn button-primary<span class="token punctuation">"</span></span>\n            <span class="token attr-name">[uxPopover]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span> <span class="token attr-name">popoverClass</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ux-static-tooltip<span class="token punctuation">"</span></span>\n            <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>bottom<span class="token punctuation">"</span></span> <span class="token attr-name">[isOpen]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>open<span class="token punctuation">"</span></span> <span class="token attr-name">[showTriggers]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[]<span class="token punctuation">"</span></span>\n            <span class="token attr-name">[hideTriggers]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[]<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>open = true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        Static Tooltip Example\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ng-template</span> <span class="token attr-name">#content</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>static-tooltip-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>static-tooltip-text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                This is an example of a static tooltip. It will appear when the page is loaded until dismissed.\n                It is useful for giving the user information about a specific control.\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>static-tooltip-footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>hide-tips<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>open = false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>HIDE TIPS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ng-template</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<div class="static-tooltip-demo">\n    <button type="button" class="btn button-primary"\n            [uxPopover]="content" popoverClass="ux-static-tooltip"\n            placement="bottom" [isOpen]="open" [showTriggers]="[]"\n            [hideTriggers]="[]" (click)="open = true">\n        Static Tooltip Example\n    </button>\n\n    <ng-template #content>\n        <div class="static-tooltip-content">\n            <p class="static-tooltip-text">\n                This is an example of a static tooltip. It will appear when the page is loaded until dismissed.\n                It is useful for giving the user information about a specific control.\n            </p>\n\n            <div class="static-tooltip-footer">\n                <a class="hide-tips" (click)="open = false">HIDE TIPS</a>\n            </div>\n        </div>\n    </ng-template>\n</div>'}},"6kOg":function(n,t,a){var s={"./app.html":"dvSk","./app.ts":"pxvA"};function p(n){var t=o(n);return a(t)}function o(n){if(!a.o(s,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return s[n]}p.keys=function(){return Object.keys(s)},p.resolve=o,n.exports=p,p.id="6kOg"},GK8e:function(n,t,a){"use strict";a.r(t),a.d(t,"ComponentsTooltipsModule",(function(){return w}));var s,p=a("tyNb"),o=a("7Q8i"),e=a("XtaT"),c=a("T/2f"),l=a("YZ8U"),i=a("AVdU"),u=a("yHOM"),r=a("fXoL"),k=a("COk8"),b=(s=function(n,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])})(n,t)},function(n,t){function a(){this.constructor=n}s(n,t),n.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),d=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};function m(n,t){if(1&n){var a=r.Wb();r.Nc(0,"\n        "),r.Vb(1,"div",9),r.Nc(2,"\n            "),r.Vb(3,"p",10),r.Nc(4,"\n                This is an example of a static tooltip. It will appear when the page is loaded until dismissed.\n                It is useful for giving the user information about a specific control.\n            "),r.Ub(),r.Nc(5,"\n\n            "),r.Vb(6,"div",11),r.Nc(7,"\n                "),r.Vb(8,"a",12),r.cc("click",(function(){return r.Bc(a),r.gc().open=!1})),r.Nc(9,"HIDE TIPS"),r.Ub(),r.Nc(10,"\n            "),r.Ub(),r.Nc(11,"\n        "),r.Ub(),r.Nc(12,"\n    ")}}var g=function(){return[]},f=function(n){function t(){var t=n.call(this,a("d4Xc"))||this;return t.open=!0,t.playground={files:{"app.component.html":t.snippets.raw.appHtml,"app.component.ts":t.snippets.raw.appTs,"app.component.css":t.snippets.raw.appCss},modules:[{imports:["PopoverModule"],library:"@ux-aspects/ux-aspects"}]},t}return b(t,n),t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["uxd-components-static-tooltip"]],features:[r.wb],decls:46,vars:10,consts:[[1,"static-tooltip-demo"],["type","button","popoverClass","ux-static-tooltip","placement","bottom",1,"btn","button-primary",3,"uxPopover","isOpen","showTriggers","hideTriggers","click"],["content",""],["routerLink","/components/popover","fragment","popover"],[3,"minimal"],["heading","HTML"],[3,"content"],["heading","TypeScript"],["heading","CSS"],[1,"static-tooltip-content"],[1,"static-tooltip-text"],[1,"static-tooltip-footer"],[1,"hide-tips",3,"click"]],template:function(n,t){if(1&n&&(r.Vb(0,"div",0),r.Nc(1,"\n    "),r.Vb(2,"button",1),r.cc("click",(function(){return t.open=!0})),r.Nc(3,"\n        Static Tooltip Example\n    "),r.Ub(),r.Nc(4,"\n\n    "),r.Lc(5,m,13,0,"ng-template",null,2,r.Mc),r.Nc(7,"\n"),r.Ub(),r.Nc(8,"\n\n"),r.Qb(9,"hr"),r.Nc(10,"\n\n"),r.Vb(11,"p"),r.Nc(12,"\n    Static tooltips can be added to elements to give the user detailed instructions on the purpose of the control when they first\n    navigate to the page. They are created using a "),r.Vb(13,"a",3),r.Nc(14,"popover"),r.Ub(),r.Nc(15," and manually\n    controlling the open state by using the "),r.Vb(16,"code"),r.Nc(17,"isOpen"),r.Ub(),r.Nc(18," attribute and removing the default "),r.Vb(19,"code"),r.Nc(20,"showTriggers"),r.Ub(),r.Nc(21," and "),r.Vb(22,"code"),r.Nc(23,"hideTriggers"),r.Ub(),r.Nc(24,".\n"),r.Ub(),r.Nc(25,"\n\n"),r.Vb(26,"p"),r.Nc(27,"The following code can be used to create the example above:"),r.Ub(),r.Nc(28,"\n\n"),r.Vb(29,"ux-tabset",4),r.Nc(30,"\n    "),r.Vb(31,"ux-tab",5),r.Nc(32,"\n        "),r.Qb(33,"uxd-snippet",6),r.Nc(34,"\n    "),r.Ub(),r.Nc(35,"\n    "),r.Vb(36,"ux-tab",7),r.Nc(37,"\n        "),r.Qb(38,"uxd-snippet",6),r.Nc(39,"\n    "),r.Ub(),r.Nc(40,"\n    "),r.Vb(41,"ux-tab",8),r.Nc(42,"\n        "),r.Qb(43,"uxd-snippet",6),r.Nc(44,"\n    "),r.Ub(),r.Nc(45,"\n"),r.Ub()),2&n){var a=r.xc(6);r.zb(2),r.nc("uxPopover",a)("isOpen",t.open)("showTriggers",r.pc(8,g))("hideTriggers",r.pc(9,g)),r.zb(27),r.nc("minimal",!1),r.zb(4),r.nc("content",t.snippets.compiled.appHtml),r.zb(5),r.nc("content",t.snippets.compiled.appTs),r.zb(5),r.nc("content",t.snippets.compiled.appCss)}},directives:[o.P,o.Kc,p.h,o.Md,o.Hd,k.a],styles:[".static-tooltip-demo[_ngcontent-%COMP%]{height:220px;padding-top:30px;text-align:center}.static-tooltip-content[_ngcontent-%COMP%]:hover   .hide-tips[_ngcontent-%COMP%]{opacity:1}.static-tooltip-text[_ngcontent-%COMP%]{color:#333;font-weight:600;margin:0}.static-tooltip-footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.static-tooltip-footer[_ngcontent-%COMP%]   .hide-tips[_ngcontent-%COMP%]{color:#999;font-size:.875rem;opacity:0;transition:opacity .25s ease-in-out}"],changeDetection:0}),t=function(n,t,a,s){var p,o=arguments.length,e=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(n,t,a,s);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(e=(o<3?p(e):o>3?p(t,a,e):p(t,a))||e);return o>3&&e&&Object.defineProperty(t,a,e),e}([Object(u.a)("ComponentsStaticTooltipComponent"),d("design:paramtypes",[])],t)}(i.a),h=a("+gXg"),y=a("2RDK"),v=function(){var n=function(t,a){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])})(t,a)};return function(t,a){function s(){this.constructor=t}n(t,a),t.prototype=null===a?Object.create(a):(s.prototype=a.prototype,new s)}}(),N=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},x=[f,function(n){function t(){var t=n.call(this,a("6kOg"))||this;return t.playground={files:{"app.component.html":t.snippets.raw.appHtml,"app.component.ts":t.snippets.raw.appTs},modules:[{imports:["TooltipModule"],library:"@ux-aspects/ux-aspects"}]},t}return v(t,n),t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Jb({type:t,selectors:[["uxd-components-tooltips"]],features:[r.wb],decls:138,vars:2,consts:[[1,"container-fluid"],[1,"row"],[1,"col-md-12","text-center"],["type","button","uxTooltip","Tooltip on the left","placement","left",1,"btn","btn","button-secondary"],["type","button","uxTooltip","Tooltip on the top","placement","top",1,"btn","btn","button-secondary"],["type","button","uxTooltip","Tooltip on the bottom","placement","bottom",1,"btn","btn","button-secondary"],["type","button","uxTooltip","Tooltip on the right","placement","right",1,"btn","btn","button-secondary"],["tableTitle","Inputs"],["uxd-api-property","","name","uxTooltip","type","string | TemplateRef"],["uxd-api-property","","name","tooltipDisabled","type","boolean"],["uxd-api-property","","name","tooltipClass","type","string"],["uxd-api-property","","name","tooltipRole","defaultValue","tooltip","type","string"],["uxd-api-property","","name","tooltipContext","type","object"],["uxd-api-property","","name","tooltipDelay","type","number"],["uxd-api-property","","name","isOpen","type","boolean","defaultValue","false"],["uxd-api-property","","name","placement","type","string","defaultValue","top"],["uxd-api-property","","name","showTriggers","type","string[]","defaultValue","['mouseenter', 'focus']"],["uxd-api-property","","name","hideTriggers","type","string[]","defaultValue","['mouseleave', 'blur']"],["tableTitle","Outputs"],["uxd-api-property","","name","shown","type","void"],["uxd-api-property","","name","hidden","type","void"],["uxd-api-property","","name","isOpenChange","type","boolean"],["tableTitle","Methods"],["uxd-api-property","","name","show"],["uxd-api-property","","name","hide"],["uxd-api-property","","name","toggle"],[3,"minimal"],["heading","HTML"],[3,"content"]],template:function(n,t){1&n&&(r.Vb(0,"div",0),r.Nc(1,"\n    "),r.Vb(2,"div",1),r.Nc(3,"\n        "),r.Vb(4,"div",2),r.Nc(5,"\n\n            "),r.Vb(6,"button",3),r.Nc(7,"\n                Tooltip on left\n            "),r.Ub(),r.Nc(8,"\n\n            "),r.Vb(9,"button",4),r.Nc(10,"\n                Tooltip on top\n            "),r.Ub(),r.Nc(11,"\n\n            "),r.Vb(12,"button",5),r.Nc(13,"\n                Tooltip on bottom\n            "),r.Ub(),r.Nc(14,"\n\n            "),r.Vb(15,"button",6),r.Nc(16,"\n                Tooltip on right\n            "),r.Ub(),r.Nc(17,"\n        "),r.Ub(),r.Nc(18,"\n    "),r.Ub(),r.Nc(19,"\n"),r.Ub(),r.Nc(20,"\n\n"),r.Qb(21,"hr"),r.Nc(22,"\n\n"),r.Vb(23,"p"),r.Nc(24,"\n    To add a tooltip to an element add the "),r.Vb(25,"code"),r.Nc(26,"uxTooltip"),r.Ub(),r.Nc(27," attribute with the required text.\n    The tooltip is placed at the "),r.Vb(28,"code"),r.Nc(29,"top"),r.Ub(),r.Nc(30," by default.\n"),r.Ub(),r.Nc(31,"\n\n"),r.Vb(32,"p"),r.Nc(33,"The following attributes can be used to configure the "),r.Vb(34,"code"),r.Nc(35,"uxTooltip"),r.Ub(),r.Nc(36," directive:"),r.Ub(),r.Nc(37,"\n\n"),r.Vb(38,"uxd-api-properties",7),r.Nc(39,"\n    "),r.Vb(40,"tr",8),r.Nc(41,"\n        If a string is specified, the text will be displayed as the tooltip content.\n        If a TemplateRef is provided the content of the template will be inserted into the tooltip.\n    "),r.Ub(),r.Nc(42,"\n    "),r.Vb(43,"tr",9),r.Nc(44,"\n        If set to "),r.Vb(45,"code"),r.Nc(46,"true"),r.Ub(),r.Nc(47," the tooltip will not be shown by any of it's triggers.\n    "),r.Ub(),r.Nc(48,"\n    "),r.Vb(49,"tr",10),r.Nc(50,"\n        If set, the provided class will be added to the tooltip. This can be used to change the appearance of the tooltip.\n    "),r.Ub(),r.Nc(51,"\n    "),r.Vb(52,"tr",11),r.Nc(53,"\n        If set, this will alter the role of the tooltip.\n    "),r.Ub(),r.Nc(54,"\n    "),r.Vb(55,"tr",12),r.Nc(56,"\n        If a TemplateRef is used as the content this can be used to provide the template with data.\n    "),r.Ub(),r.Nc(57,"\n    "),r.Vb(58,"tr",13),r.Nc(59,"\n        If specified, the tooltip will wait the specified number of milliseconds before showing.\n    "),r.Ub(),r.Nc(60,"\n    "),r.Vb(61,"tr",14),r.Nc(62,"\n        If set to "),r.Vb(63,"code"),r.Nc(64,"true"),r.Ub(),r.Nc(65," this will programmatically show the tooltip.\n    "),r.Ub(),r.Nc(66,"\n    "),r.Vb(67,"tr",15),r.Nc(68,"\n        Defines which direction the tooltip should appear. The possible values are \n        "),r.Vb(69,"code"),r.Nc(70,"top"),r.Ub(),r.Nc(71,", "),r.Vb(72,"code"),r.Nc(73,"right"),r.Ub(),r.Nc(74,", "),r.Vb(75,"code"),r.Nc(76,"bottom"),r.Ub(),r.Nc(77," and "),r.Vb(78,"code"),r.Nc(79,"left"),r.Ub(),r.Nc(80,".\n    "),r.Ub(),r.Nc(81,"\n    "),r.Vb(82,"tr",16),r.Nc(83,"\n        Specifies which events will cause the tooltip to appear. \n        To manually control when the tooltip appears set this to an empty array.\n        Possible events are "),r.Vb(84,"code"),r.Nc(85,"click"),r.Ub(),r.Nc(86,", "),r.Vb(87,"code"),r.Nc(88,"mouseenter"),r.Ub(),r.Nc(89," and "),r.Vb(90,"code"),r.Nc(91,"focus"),r.Ub(),r.Nc(92,".\n    "),r.Ub(),r.Nc(93,"\n    "),r.Vb(94,"tr",17),r.Nc(95,"\n        Specifies which events will cause the tooltip to hide. \n        To manually control when the tooltip hides set this to an empty array.\n        Possible events are "),r.Vb(96,"code"),r.Nc(97,"click"),r.Ub(),r.Nc(98,", "),r.Vb(99,"code"),r.Nc(100,"mouseleave"),r.Ub(),r.Nc(101," and "),r.Vb(102,"code"),r.Nc(103,"blur"),r.Ub(),r.Nc(104,".\n    "),r.Ub(),r.Nc(105,"\n"),r.Ub(),r.Nc(106,"\n\n"),r.Vb(107,"uxd-api-properties",18),r.Nc(108,"\n    "),r.Vb(109,"tr",19),r.Nc(110,"\n        This event will be triggered when the tooltip is shown.\n    "),r.Ub(),r.Nc(111,"\n    "),r.Vb(112,"tr",20),r.Nc(113,"\n        This event will be triggered when the tooltip is hidden.\n    "),r.Ub(),r.Nc(114,"\n    "),r.Vb(115,"tr",21),r.Nc(116,"\n        This event will be triggered when the tooltip is shown or hidden and will\n        be provided will a boolean representing the visibility of the tooltip.\n    "),r.Ub(),r.Nc(117,"\n"),r.Ub(),r.Nc(118,"\n\n"),r.Vb(119,"uxd-api-properties",22),r.Nc(120,"\n    "),r.Vb(121,"tr",23),r.Nc(122,"\n        Open the tooltip.\n    "),r.Ub(),r.Nc(123,"\n    "),r.Vb(124,"tr",24),r.Nc(125,"\n        Hide the tooltip.\n    "),r.Ub(),r.Nc(126,"\n    "),r.Vb(127,"tr",25),r.Nc(128,"\n        Toggle the visibility of the tooltip.\n    "),r.Ub(),r.Nc(129,"\n"),r.Ub(),r.Nc(130,"\n\n"),r.Vb(131,"ux-tabset",26),r.Nc(132,"\n    "),r.Vb(133,"ux-tab",27),r.Nc(134,"\n        "),r.Qb(135,"uxd-snippet",28),r.Nc(136,"\n    "),r.Ub(),r.Nc(137,"\n"),r.Ub()),2&n&&(r.zb(131),r.nc("minimal",!1),r.zb(4),r.nc("content",t.snippets.compiled.appHtml))},directives:[o.P,o.ce,h.a,y.a,o.Md,o.Hd,k.a],encapsulation:2,changeDetection:0}),t=function(n,t,a,s){var p,o=arguments.length,e=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(n,t,a,s);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(e=(o<3?p(e):o>3?p(t,a,e):p(t,a))||e);return o>3&&e&&Object.defineProperty(t,a,e),e}([Object(u.a)("ComponentsTooltipsComponent"),N("design:paramtypes",[])],t)}(i.a)],T=[{path:"**",component:c.a,data:{category:l.b.resolveCategoryData(l.a.Components,"Tooltips")}}],w=function(){function n(n,t){t.registerResolver(n,x)}return n.\u0275mod=r.Nb({type:n}),n.\u0275inj=r.Mb({factory:function(t){return new(t||n)(r.Zb(r.j),r.Zb(l.b))},imports:[[e.a,o.Lc,p.i.forChild(T),o.Nd,o.de]]}),n}()},MOYg:function(n,t){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span><span class="token punctuation">,</span>\n    styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'./app.component.css\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n    open<span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html',\n    styleUrls: ['./app.component.css']\n})\nexport class AppComponent {\n    open: boolean = true;\n}"}},d4Xc:function(n,t,a){var s={"./app.css":"srwY","./app.html":"4ngj","./app.ts":"MOYg"};function p(n){var t=o(n);return a(t)}function o(n){if(!a.o(s,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return s[n]}p.keys=function(){return Object.keys(s)},p.resolve=o,n.exports=p,p.id="d4Xc"},dvSk:function(n,t){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>container-fluid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-12 p-t-md text-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn button-secondary<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">uxTooltip</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Tooltip on the left<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Tooltip on left\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn button-secondary<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">uxTooltip</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Tooltip on the top<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>top<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Tooltip on top\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn button-secondary<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">uxTooltip</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Tooltip on the bottom<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>bottom<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Tooltip on bottom\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn button-secondary<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">uxTooltip</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Tooltip on the right<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Tooltip on right\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<div class="container-fluid">\n    <div class="row">\n        <div class="col-md-12 p-t-md text-center">\n\n            <button type="button"\n                    class="btn btn button-secondary"\n                    uxTooltip="Tooltip on the left"\n                    placement="left">\n                Tooltip on left\n            </button>\n\n            <button type="button"\n                    class="btn btn button-secondary"\n                    uxTooltip="Tooltip on the top"\n                    placement="top">\n                Tooltip on top\n            </button>\n\n            <button type="button"\n                    class="btn btn button-secondary"\n                    uxTooltip="Tooltip on the bottom"\n                    placement="bottom">\n                Tooltip on bottom\n            </button>\n\n            <button type="button"\n                    class="btn btn button-secondary"\n                    uxTooltip="Tooltip on the right"\n                    placement="right">\n                Tooltip on right\n            </button>\n\n        </div>\n    </div>\n</div>'}},pxvA:function(n,t){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent { }\n"}},srwY:function(n,t){n.exports={snippet:'<span class="token selector">.static-tooltip-demo</span> <span class="token punctuation">{</span>\n    <span class="token property">height</span><span class="token punctuation">:</span> 220px<span class="token punctuation">;</span>\n    <span class="token property">padding-top</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>\n    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.static-tooltip-content:hover .hide-tips</span> <span class="token punctuation">{</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.static-tooltip-text</span> <span class="token punctuation">{</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>\n    <span class="token property">font-weight</span><span class="token punctuation">:</span> 600<span class="token punctuation">;</span>\n    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.static-tooltip-footer</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n    <span class="token property">justify-content</span><span class="token punctuation">:</span> flex-end<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.static-tooltip-footer .hide-tips</span> <span class="token punctuation">{</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> #999<span class="token punctuation">;</span>\n    <span class="token property">font-size</span><span class="token punctuation">:</span> 0.875rem<span class="token punctuation">;</span>\n    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n    <span class="token property">transition</span><span class="token punctuation">:</span> opacity 250ms ease-in-out<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>',example:".static-tooltip-demo {\n    height: 220px;\n    padding-top: 30px;\n    text-align: center;\n}\n\n.static-tooltip-content:hover .hide-tips {\n    opacity: 1;\n}\n\n.static-tooltip-text {\n    color: #333;\n    font-weight: 600;\n    margin: 0;\n}\n\n.static-tooltip-footer {\n    display: flex;\n    justify-content: flex-end;\n}\n\n.static-tooltip-footer .hide-tips {\n    color: #999;\n    font-size: 0.875rem;\n    opacity: 0;\n    transition: opacity 250ms ease-in-out;\n}"}}}]);