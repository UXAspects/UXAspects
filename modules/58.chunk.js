(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{BzPB:function(n,t){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent { }\n"}},FYag:function(n,t){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>container-fluid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>col-md-12 text-center<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n                <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn btn button-primary<span class="token punctuation">"</span></span>\n                <span class="token attr-name">uxPopover</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Popover content here!<span class="token punctuation">"</span></span>\n                <span class="token attr-name">placement</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>bottom<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                Launch Popover\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>',example:'<div class="container-fluid">\n    <div class="row">\n        <div class="col-md-12 text-center">\n            <button type="button"\n                class="btn btn button-primary"\n                uxPopover="Popover content here!"\n                placement="bottom">\n                Launch Popover\n            </button>\n        </div>\n    </div>\n</div>'}},MrNl:function(n,t,e){"use strict";e.r(t),e.d(t,"ComponentsPopoverModule",(function(){return N}));var a,p=e("tyNb"),s=e("7Q8i"),o=e("XtaT"),c=e("T/2f"),r=e("YZ8U"),i=e("AVdU"),l=e("yHOM"),u=e("fXoL"),b=e("+gXg"),d=e("2RDK"),h=e("COk8"),m=(a=function(n,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])})(n,t)},function(n,t){function e(){this.constructor=n}a(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),v=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},k=[function(n){function t(){var t=n.call(this,e("j+8b"))||this;return t.playground={files:{"app.component.html":t.snippets.raw.appHtml,"app.component.ts":t.snippets.raw.appTs},modules:[{imports:["PopoverModule"],library:"@ux-aspects/ux-aspects"}]},t}return m(t,n),t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=u.Jb({type:t,selectors:[["uxd-components-popover"]],features:[u.wb],decls:148,vars:2,consts:[[1,"container-fluid"],[1,"row"],[1,"col-md-12","text-center"],["type","button","uxPopover","Popover content here!","placement","bottom",1,"btn","btn","button-primary"],["tableTitle","Inputs"],["uxd-api-property","","name","uxPopover","type","string | TemplateRef"],["uxd-api-property","","name","popoverDisabled","type","boolean"],["uxd-api-property","","name","popoverTitle","type","string"],["uxd-api-property","","name","popoverClass","type","string"],["uxd-api-property","","name","popoverRole","defaultValue","popover","type","string"],["uxd-api-property","","name","popoverContext","type","object"],["uxd-api-property","","name","popoverDelay","type","number"],["uxd-api-property","","name","isOpen","type","boolean","defaultValue","false"],["uxd-api-property","","name","placement","type","'top' | 'right' | 'bottom' | 'left'","defaultValue","top"],["uxd-api-property","","name","fallbackPlacement","type","'top' | 'right' | 'bottom' | 'left'"],["uxd-api-property","","name","alignment","type","string","defaultValue","center"],["uxd-api-property","","name","showTriggers","type","string[]","defaultValue","['click']"],["uxd-api-property","","name","hideTriggers","type","string[]","defaultValue","['click', 'escape', 'clickoutside']"],["tableTitle","Outputs"],["uxd-api-property","","name","shown","type","void"],["uxd-api-property","","name","hidden","type","void"],["uxd-api-property","","name","isOpenChange","type","boolean"],["tableTitle","Methods"],["uxd-api-property","","name","show"],["uxd-api-property","","name","hide"],["uxd-api-property","","name","toggle"],[3,"minimal"],["heading","HTML"],[3,"content"]],template:function(n,t){1&n&&(u.Vb(0,"div",0),u.Nc(1,"\n    "),u.Vb(2,"div",1),u.Nc(3,"\n        "),u.Vb(4,"div",2),u.Nc(5,"\n            "),u.Vb(6,"button",3),u.Nc(7,"\n                Launch Popover\n            "),u.Ub(),u.Nc(8,"\n        "),u.Ub(),u.Nc(9,"\n    "),u.Ub(),u.Nc(10,"\n"),u.Ub(),u.Nc(11,"\n\n"),u.Qb(12,"hr"),u.Nc(13,"\n\n"),u.Vb(14,"p"),u.Nc(15,"\n    To add a popover to an element add the "),u.Vb(16,"code"),u.Nc(17,"uxPopover"),u.Ub(),u.Nc(18," attribute with the required text.\n    The popover is placed at the "),u.Vb(19,"code"),u.Nc(20,"top"),u.Ub(),u.Nc(21," by default.\n"),u.Ub(),u.Nc(22,"\n\n"),u.Vb(23,"p"),u.Nc(24,"The following attributes can be used to configure the "),u.Vb(25,"code"),u.Nc(26,"uxPopover"),u.Ub(),u.Nc(27," directive:"),u.Ub(),u.Nc(28,"\n\n"),u.Vb(29,"uxd-api-properties",4),u.Nc(30,"\n    "),u.Vb(31,"tr",5),u.Nc(32,"\n        If a string is specified, the text will be displayed as the popover content.\n        If a TemplateRef is provided the content of the template will be inserted into the popover.\n    "),u.Ub(),u.Nc(33,"\n    "),u.Vb(34,"tr",6),u.Nc(35,"\n        If set to "),u.Vb(36,"code"),u.Nc(37,"true"),u.Ub(),u.Nc(38," the popover will not be shown by any of it's triggers.\n    "),u.Ub(),u.Nc(39,"\n    "),u.Vb(40,"tr",7),u.Nc(41,"\n        If set, the popover will display a title above as the popover content.\n    "),u.Ub(),u.Nc(42,"\n    "),u.Vb(43,"tr",8),u.Nc(44,"\n        If set, the provided class will be added to the popover. This can be used to change the appearance of the popover.\n    "),u.Ub(),u.Nc(45,"\n    "),u.Vb(46,"tr",9),u.Nc(47,"\n        If set, this will alter the role of the popover.\n    "),u.Ub(),u.Nc(48,"\n    "),u.Vb(49,"tr",10),u.Nc(50,"\n        If a TemplateRef is used as the content this can be used to provide the template with data.\n    "),u.Ub(),u.Nc(51,"\n    "),u.Vb(52,"tr",11),u.Nc(53,"\n        If specified, the popover will wait the specified number of milliseconds before showing.\n    "),u.Ub(),u.Nc(54,"\n    "),u.Vb(55,"tr",12),u.Nc(56,"\n        If set to "),u.Vb(57,"code"),u.Nc(58,"true"),u.Ub(),u.Nc(59," this will programmatically show the popover.\n    "),u.Ub(),u.Nc(60,"\n    "),u.Vb(61,"tr",13),u.Nc(62,"\n        Defines which direction the popover should appear relative to the trigger element.\n    "),u.Ub(),u.Nc(63,"\n    "),u.Vb(64,"tr",14),u.Nc(65,"\n        Defines which direction the popover should appear relative to the trigger element if the value of the "),u.Vb(66,"code"),u.Nc(67,"placement"),u.Ub(),u.Nc(68," input cannot be used.\n        The fallback placement will be in the opposite direction of the "),u.Vb(69,"code"),u.Nc(70,"placement"),u.Ub(),u.Nc(71," input by default.\n    "),u.Ub(),u.Nc(72,"\n    "),u.Vb(73,"tr",15),u.Nc(74,"\n        Defines the position of the arrow relative to the popover. The possible values are\n        "),u.Vb(75,"code"),u.Nc(76,"start"),u.Ub(),u.Nc(77,", "),u.Vb(78,"code"),u.Nc(79,"center"),u.Ub(),u.Nc(80," and "),u.Vb(81,"code"),u.Nc(82,"end"),u.Ub(),u.Nc(83,".\n    "),u.Ub(),u.Nc(84,"\n    "),u.Vb(85,"tr",16),u.Nc(86,"\n        Specifies which events will cause the popover to appear.\n        To manually control when the popover appears set this to an empty array.\n        Possible events are "),u.Vb(87,"code"),u.Nc(88,"click"),u.Ub(),u.Nc(89,", "),u.Vb(90,"code"),u.Nc(91,"mouseenter"),u.Ub(),u.Nc(92," and "),u.Vb(93,"code"),u.Nc(94,"focus"),u.Ub(),u.Nc(95,".\n    "),u.Ub(),u.Nc(96,"\n    "),u.Vb(97,"tr",17),u.Nc(98,"\n        Specifies which events will cause the popover to hide.\n        To manually control when the popover hides set this to an empty array.\n        Possible events are "),u.Vb(99,"code"),u.Nc(100,"click"),u.Ub(),u.Nc(101,", "),u.Vb(102,"code"),u.Nc(103,"mouseleave"),u.Ub(),u.Nc(104,", "),u.Vb(105,"code"),u.Nc(106,"blur"),u.Ub(),u.Nc(107,", "),u.Vb(108,"code"),u.Nc(109,"escape"),u.Ub(),u.Nc(110," and "),u.Vb(111,"code"),u.Nc(112,"clickoutside"),u.Ub(),u.Nc(113,".\n    "),u.Ub(),u.Nc(114,"\n"),u.Ub(),u.Nc(115,"\n\n"),u.Vb(116,"uxd-api-properties",18),u.Nc(117,"\n    "),u.Vb(118,"tr",19),u.Nc(119,"\n        This event will be triggered when the popover is shown.\n    "),u.Ub(),u.Nc(120,"\n    "),u.Vb(121,"tr",20),u.Nc(122,"\n        This event will be triggered when the popover is hidden.\n    "),u.Ub(),u.Nc(123,"\n    "),u.Vb(124,"tr",21),u.Nc(125,"\n        This event will be triggered when the popover is shown or hidden and will\n        be provided will a boolean representing the visibility of the popover.\n    "),u.Ub(),u.Nc(126,"\n"),u.Ub(),u.Nc(127,"\n\n"),u.Vb(128,"uxd-api-properties",22),u.Nc(129,"\n    "),u.Vb(130,"tr",23),u.Nc(131,"\n        Open the popover.\n    "),u.Ub(),u.Nc(132,"\n    "),u.Vb(133,"tr",24),u.Nc(134,"\n        Hide the popover.\n    "),u.Ub(),u.Nc(135,"\n    "),u.Vb(136,"tr",25),u.Nc(137,"\n        Toggle the visibility of the popover.\n    "),u.Ub(),u.Nc(138,"\n"),u.Ub(),u.Nc(139,"\n\n"),u.Vb(140,"ux-tabset",26),u.Nc(141,"\n    "),u.Vb(142,"ux-tab",27),u.Nc(143,"\n        "),u.Qb(144,"uxd-snippet",28),u.Nc(145,"\n    "),u.Ub(),u.Nc(146,"\n"),u.Ub(),u.Nc(147,"\n")),2&n&&(u.zb(140),u.nc("minimal",!1),u.zb(4),u.nc("content",t.snippets.compiled.appHtml))},directives:[s.P,s.Kc,b.a,d.a,s.Md,s.Hd,h.a],encapsulation:2,changeDetection:0}),t=function(n,t,e,a){var p,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,a);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(o=(s<3?p(o):s>3?p(t,e,o):p(t,e))||o);return s>3&&o&&Object.defineProperty(t,e,o),o}([Object(l.a)("ComponentsPopoverComponent"),v("design:paramtypes",[])],t)}(i.a)],f=[{path:"**",component:c.a,data:{category:r.b.resolveCategoryData(r.a.Components,"Popover")}}],N=function(){function n(n,t){t.registerResolver(n,k)}return n.\u0275mod=u.Nb({type:n}),n.\u0275inj=u.Mb({factory:function(t){return new(t||n)(u.Zb(u.j),u.Zb(r.b))},imports:[[o.a,s.Lc,p.i.forChild(f),s.Nd]]}),n}()},"j+8b":function(n,t,e){var a={"./app.html":"FYag","./app.ts":"BzPB"};function p(n){var t=s(n);return e(t)}function s(n){if(!e.o(a,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return a[n]}p.keys=function(){return Object.keys(a)},p.resolve=s,n.exports=p,p.id="j+8b"}}]);