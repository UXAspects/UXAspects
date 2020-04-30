(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{"67DD":function(n,a,s){"use strict";s.r(a);var t,p=s("Valr"),o=s("QJY3"),e=s("DUip"),c=s("XtaT"),i=s("T/2f"),l=s("YZ8U"),u=s("7Q8i"),r=s("AVdU"),k=s("yHOM"),f=s("vLOi"),m=s("TYT/"),d=s("+gXg"),S=s("2RDK"),g=s("COk8"),b=(t=function(n,a){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var s in a)a.hasOwnProperty(s)&&(n[s]=a[s])})(n,a)},function(n,a){function s(){this.constructor=n}t(n,a),n.prototype=null===a?Object.create(a):(s.prototype=a.prototype,new s)}),x=function(n){return[n]},h=function(n){function a(a){var t=n.call(this,s("i3pi"))||this;return t._documentationType=a,t.playground={files:{"app.component.html":t.snippets.raw.appHtml,"app.component.ts":t.snippets.raw.appTs,"app.component.less":t.snippets.raw.appCss},modules:[{imports:["IconModule"],library:"@ux-aspects/ux-aspects"}]},t.iconSetDocumentationRoute=a===f.b.MicroFocus?"/ui-components/styling":"/css/icons",t}return b(a,n),a.\u0275fac=function(n){return new(n||a)(m.Ub(f.a))},a.\u0275cmp=m.Ob({type:a,selectors:[["uxd-components-icon"]],features:[m.zb],decls:181,vars:20,consts:[[1,"icon-group"],["name","attachment","size","24px",3,"flipHorizontal","flipVertical"],["name","print","size","24px",3,"flipHorizontal","flipVertical"],["name","search","size","25px",3,"flipHorizontal","flipVertical"],["name","configuration","size","16px",3,"flipHorizontal","flipVertical"],["name","configuration","size","32px",3,"flipHorizontal","flipVertical"],["name","configuration","size","48px","rotate","90",3,"flipHorizontal","flipVertical"],["fragment","ux-icons",3,"routerLink"],["tableTitle","Inputs"],["uxd-api-property","","name","name","type","string"],["uxd-api-property","","name","size","type","string"],["uxd-api-property","","name","rotate","type","90 | 180 | 270"],["uxd-api-property","","name","flipHorizontal","type","boolean","defaultValue","false"],["uxd-api-property","","name","flipVertical","type","boolean","defaultValue","false"],[3,"minimal"],["heading","HTML"],[3,"content"],["heading","CSS"],["language","javascript",3,"content"],["tableTitle","Icon Service"],["uxd-api-property","","name","setIcon","args","IconDefinition"],["uxd-api-property","","name","setIcons","args","Array<IconDefinition>"],["uxd-api-property","","name","name","type","string","required","true"],["uxd-api-property","","name","size","type","string | string[]"],["uxd-api-property","","name","icon","type","string","required","true"],["uxd-api-property","","name","iconset","type","string","required","true"]],template:function(n,a){1&n&&(m.ac(0,"div",0),m.Sc(1,"\n    "),m.ac(2,"ux-icon",1),m.Sc(3,"\n    "),m.Zb(),m.Sc(4,"\n\n    "),m.ac(5,"ux-icon",2),m.Sc(6,"\n    "),m.Zb(),m.Sc(7,"\n\n    "),m.ac(8,"ux-icon",3),m.Sc(9,"\n    "),m.Zb(),m.Sc(10,"\n"),m.Zb(),m.Sc(11,"\n\n"),m.ac(12,"div",0),m.Sc(13,"\n    "),m.ac(14,"ux-icon",4),m.Sc(15,"\n    "),m.Zb(),m.Sc(16,"\n\n    "),m.ac(17,"ux-icon",5),m.Sc(18,"\n    "),m.Zb(),m.Sc(19,"\n\n    "),m.ac(20,"ux-icon",6),m.Sc(21,"\n    "),m.Zb(),m.Sc(22,"\n"),m.Zb(),m.Sc(23,"\n\n"),m.Vb(24,"hr"),m.Sc(25,"\n\n"),m.ac(26,"p"),m.Sc(27,"The "),m.ac(28,"code"),m.Sc(29,"ux-icon"),m.Zb(),m.Sc(30," component can be used to dynamically display icons and allows easy control of\n    their size and orientation. Icons can be selected from the UX Aspects "),m.ac(31,"a",7),m.Sc(32,"ux-icons "),m.Zb(),m.Sc(33,"set. The "),m.ac(34,"code"),m.Sc(35,"ux-icon"),m.Zb(),m.Sc(36," component also\n    allows alternative icons to be loaded from a custom icon set to override default icons. For example,\n    icons for a specific project could be implemented via a custom set, or an icon set created for a\n    particular size could be used."),m.Zb(),m.Sc(37,"\n"),m.ac(38,"p"),m.Sc(39,"\n    The following properties can be used to configure the component:\n"),m.Zb(),m.Sc(40,"\n\n"),m.ac(41,"uxd-api-properties",8),m.Sc(42,"\n    "),m.ac(43,"tr",9),m.Sc(44,"\n        The name of the icon to be displayed. By default this will be one of the UX Aspects icons, unless a\n        custom icon with this name has been defined.\n    "),m.Zb(),m.Sc(45,"\n    "),m.ac(46,"tr",10),m.Sc(47,"\n        The size of the icon to be displayed. This value is in CSS units for example "),m.ac(48,"code"),m.Sc(49,"24px"),m.Zb(),m.Sc(50," or\n        "),m.ac(51,"code"),m.Sc(52,"2rem"),m.Zb(),m.Sc(53,".\n    "),m.Zb(),m.Sc(54,"\n    "),m.ac(55,"tr",11),m.Sc(56,"\n        Rotation of the icon in degrees.\n    "),m.Zb(),m.Sc(57,"\n    "),m.ac(58,"tr",12),m.Sc(59,"\n        The icon can be horizontally flipped if set to "),m.ac(60,"code"),m.Sc(61,"true"),m.Zb(),m.Sc(62,".\n    "),m.Zb(),m.Sc(63,"\n    "),m.ac(64,"tr",13),m.Sc(65,"\n        The icon can be vertically flipped if set to "),m.ac(66,"code"),m.Sc(67,"true"),m.Zb(),m.Sc(68,".\n    "),m.Zb(),m.Sc(69,"\n"),m.Zb(),m.Sc(70,"\n\n"),m.ac(71,"p"),m.Sc(72,"The following code can be used to create the example above:"),m.Zb(),m.Sc(73,"\n\n"),m.ac(74,"ux-tabset",14),m.Sc(75,"\n    "),m.ac(76,"ux-tab",15),m.Sc(77,"\n        "),m.Vb(78,"uxd-snippet",16),m.Sc(79,"\n    "),m.Zb(),m.Sc(80,"\n    "),m.ac(81,"ux-tab",17),m.Sc(82,"\n        "),m.Vb(83,"uxd-snippet",16),m.Sc(84,"\n    "),m.Zb(),m.Sc(85,"\n"),m.Zb(),m.Sc(86,"\n\n"),m.ac(87,"h4"),m.Sc(88,"Defining Custom Icons"),m.Zb(),m.Sc(89,"\n\n"),m.ac(90,"p"),m.Sc(91,"Custom icons can be defined to override the default icons which appear within UX Aspects components, or\n    to provide an alternate icon glyph to display when an icon is rendered at a smaller or larger size."),m.Zb(),m.Sc(92,"\n\n"),m.ac(93,"p"),m.Sc(94,"Add this code snippet to your root module file to define icons within your whole application from a\n    different icon set. To customize icons on a per-module basis, the "),m.ac(95,"code"),m.Sc(96,"forRoot"),m.Zb(),m.Sc(97," should be\n    replaced with "),m.ac(98,"code"),m.Sc(99,"forChild"),m.Zb(),m.Sc(100,". See the "),m.ac(101,"code"),m.Sc(102,"IconDefinition"),m.Zb(),m.Sc(103," interface for details of\n    the properties to provide."),m.Zb(),m.Sc(104,"\n\n"),m.Vb(105,"uxd-snippet",18),m.Sc(106,"\n\n"),m.ac(107,"p"),m.Sc(108,"Within an individual component, icons can be added or customized by injecting the "),m.ac(109,"code"),m.Sc(110,"IconService"),m.Zb(),m.Sc(111,"."),m.Zb(),m.Sc(112,"\n\n"),m.ac(113,"uxd-api-properties",19),m.Sc(114,"\n    "),m.ac(115,"tr",20),m.Sc(116,"\n        Create a single icon definition. See the "),m.ac(117,"code"),m.Sc(118,"IconDefinition"),m.Zb(),m.Sc(119," interface below for\n        details.\n    "),m.Zb(),m.Sc(120,"\n    "),m.ac(121,"tr",21),m.Sc(122,"\n        Create multiple icon definitions. It should be passed an array of "),m.ac(123,"code"),m.Sc(124,"IconDefinition"),m.Zb(),m.Sc(125,"\n        objects, see below for details.\n    "),m.Zb(),m.Sc(126,"\n"),m.Zb(),m.Sc(127,"\n\n"),m.ac(128,"h4"),m.Sc(129,"IconDefinition Interface"),m.Zb(),m.Sc(130,"\n\n"),m.ac(131,"p"),m.Sc(132,"This interface defines the properties used to create a custom icon definition."),m.Zb(),m.Sc(133,"\n\n"),m.ac(134,"p"),m.Sc(135,"The custom icon definitions will take precedence over the default icon set, and can therefore be used to\n    customize the icons that appear within UX Aspects components."),m.Zb(),m.Sc(136,"\n\n"),m.ac(137,"uxd-api-properties"),m.Sc(138,"\n    "),m.ac(139,"tr",22),m.Sc(140,"\n        The name of the icon. This corresponds to the "),m.ac(141,"code"),m.Sc(142,"name"),m.Zb(),m.Sc(143," property of "),m.ac(144,"code"),m.Sc(145,"ux-icon"),m.Zb(),m.Sc(146,".\n    "),m.Zb(),m.Sc(147,"\n    "),m.ac(148,"tr",23),m.Sc(149,"\n        The size(s) at which this icon is defined, in CSS units. This corresponds to the "),m.ac(150,"code"),m.Sc(151,"size"),m.Zb(),m.Sc(152,"\n        property of "),m.ac(153,"code"),m.Sc(154,"ux-icon"),m.Zb(),m.Sc(155,". This property can be used to provide an alternate icon\n        glyph at different sizes, as an alternative to the browser scaling which would otherwise apply.\n        Note that due to technical limitations this only applies to icons explicitly sized using the\n        "),m.ac(156,"code"),m.Sc(157,"size"),m.Zb(),m.Sc(158," property, and cannot match a size defined in CSS.\n    "),m.Zb(),m.Sc(159,"\n    "),m.ac(160,"tr",24),m.Sc(161,"\n        The CSS class of the font icon which should be rendered for the above "),m.ac(162,"code"),m.Sc(163,"name"),m.Zb(),m.Sc(164,", e.g.\n        "),m.ac(165,"code"),m.Sc(166,"qtm-icon-action"),m.Zb(),m.Sc(167,".\n    "),m.Zb(),m.Sc(168,"\n    "),m.ac(169,"tr",25),m.Sc(170,"\n        The CSS class of the font icon set containing the given "),m.ac(171,"code"),m.Sc(172,"icon"),m.Zb(),m.Sc(173,", e.g.\n        "),m.ac(174,"code"),m.Sc(175,"qtm-font-icon"),m.Zb(),m.Sc(176,".\n    "),m.Zb(),m.Sc(177,"\n"),m.Zb(),m.Sc(178,"\n\n"),m.Vb(179,"uxd-snippet",18),m.Sc(180,"\n")),2&n&&(m.Cb(2),m.tc("flipHorizontal",!1)("flipVertical",!1),m.Cb(3),m.tc("flipHorizontal",!1)("flipVertical",!1),m.Cb(3),m.tc("flipHorizontal",!1)("flipVertical",!1),m.Cb(6),m.tc("flipHorizontal",!1)("flipVertical",!1),m.Cb(3),m.tc("flipHorizontal",!0)("flipVertical",!1),m.Cb(3),m.tc("flipHorizontal",!1)("flipVertical",!1),m.Cb(11),m.tc("routerLink",m.wc(18,x,a.iconSetDocumentationRoute)),m.Cb(43),m.tc("minimal",!1),m.Cb(4),m.tc("content",a.snippets.compiled.appHtml),m.Cb(5),m.tc("content",a.snippets.compiled.appCss),m.Cb(22),m.tc("content",a.snippets.compiled.appModuleTs),m.Cb(74),m.tc("content",a.snippets.compiled.serviceTs))},directives:[u.Lb,e.h,d.a,S.a,u.Kd,u.Fd,g.a],styles:[".icon-group[_ngcontent-%COMP%]{display:inline-block;margin-right:32px}.icon-group[_ngcontent-%COMP%]   ux-icon[_ngcontent-%COMP%]{padding:0 8px}"],changeDetection:0}),a=function(n,a,s,t){var p,o=arguments.length,e=o<3?a:null===t?t=Object.getOwnPropertyDescriptor(a,s):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(n,a,s,t);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(e=(o<3?p(e):o>3?p(a,s,e):p(a,s))||e);return o>3&&e&&Object.defineProperty(a,s,e),e}([Object(k.a)("ComponentsIconComponent")],a)}(r.a);s.d(a,"ComponentsIconModule",(function(){return z}));var y=[h],v=[{path:"**",component:i.a,data:{category:l.b.resolveCategoryData(l.a.Components,"Icons")}}],z=function(){function n(n,a){a.registerResolver(n,y)}return n.\u0275mod=m.Sb({type:n}),n.\u0275inj=m.Rb({factory:function(a){return new(a||n)(m.ec(m.j),m.ec(l.b))},imports:[[c.a,p.c,u.a,o.j,u.Mb,u.Ld,e.i.forChild(v)]]}),n}();("undefined"==typeof ngJitMode||ngJitMode)&&m.Mc(z,{declarations:[h],imports:[c.a,p.c,u.a,o.j,u.Mb,u.Ld,e.i],exports:[h]})},AVdU:function(n,a,s){"use strict";s.d(a,"a",(function(){return t}));var t=function(){return function(n){var a=this;this.snippets={compiled:{},raw:{}},n.keys().forEach((function(s){var t=s.replace("./","").replace(/\W+(\w)/g,(function(n){return n[1].toUpperCase()})),p=n(s);p.snippet&&(a.snippets.compiled[t]=p.snippet),p.example&&(a.snippets.raw[t]=p.example)}))}}()},EKHm:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> IconModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@ux-aspects/ux-aspects\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> NgModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    imports<span class="token operator">:</span> <span class="token punctuation">[</span>\n        IconModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            icons<span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">\'3d\'</span><span class="token punctuation">,</span> icon<span class="token operator">:</span> <span class="token string">\'qtm-icon-ci\'</span><span class="token punctuation">,</span> iconset<span class="token operator">:</span> <span class="token string">\'qtm-font-icon\'</span> <span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token string">\'14px\'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">\'alert\'</span><span class="token punctuation">,</span> icon<span class="token operator">:</span> <span class="token string">\'qtm-icon-alarm\'</span><span class="token punctuation">,</span> iconset<span class="token operator">:</span> <span class="token string">\'qtm-font-icon\'</span><span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token string">\'16px\'</span> <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n<span class="token punctuation">}</span>\n',example:"import { IconModule } from '@ux-aspects/ux-aspects';\nimport { NgModule } from '@angular/core';\n\n@NgModule({\n    imports: [\n        IconModule.forRoot({\n            icons: [\n                { name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon' , size: '14px'},\n                { name: 'alert', icon: 'qtm-icon-alarm', iconset: 'qtm-font-icon', size: '16px' }\n            ]\n        })\n    ],\n})\nexport class AppComponent {\n\n}\n"}},Gbyj:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span><span class="token punctuation">,</span>\n    styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">\'./app.component.css\'</span><span class="token punctuation">]</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n<span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html',\n    styleUrls: ['./app.component.css']\n\n})\nexport class AppComponent {\n\n}\n"}},IEYw:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> IconService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@ux-aspects/ux-aspects\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">iconService<span class="token operator">:</span> IconService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n        <span class="token comment">// replace single icon</span>\n        iconService<span class="token punctuation">.</span><span class="token function">setIcon</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">\'3d\'</span><span class="token punctuation">,</span> icon<span class="token operator">:</span> <span class="token string">\'qtm-icon-ci\'</span><span class="token punctuation">,</span> iconset<span class="token operator">:</span> <span class="token string">\'qtm-font-icon\'</span><span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token string">\'14px\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// replace array of icons</span>\n        iconService<span class="token punctuation">.</span><span class="token function">setIcons</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n            <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">\'3d\'</span><span class="token punctuation">,</span> icon<span class="token operator">:</span> <span class="token string">\'qtm-icon-ci\'</span><span class="token punctuation">,</span> iconset<span class="token operator">:</span> <span class="token string">\'qtm-font-icon\'</span><span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token string">\'14px\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">\'alert\'</span><span class="token punctuation">,</span> icon<span class="token operator">:</span> <span class="token string">\'qtm-icon-error\'</span><span class="token punctuation">,</span> iconset<span class="token operator">:</span> <span class="token string">\'qtm-font-icon\'</span><span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token string">\'14px\'</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>',example:"import { IconService } from '@ux-aspects/ux-aspects';\n\nexport class AppComponent {\n\n    constructor(iconService: IconService) {\n\n        // replace single icon\n        iconService.setIcon({ name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon', size: '14px' });\n\n        // replace array of icons\n        iconService.setIcons([\n            { name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon', size: '14px' },\n            { name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon', size: '14px' }\n        ]);\n    }\n\n}"}},"NIz/":function(n,a){n.exports={snippet:'<span class="token selector">.icon-group</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>\n    <span class="token property">margin-right</span><span class="token punctuation">:</span> 32px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token selector">.icon-group ux-icon</span> <span class="token punctuation">{</span>\n    <span class="token property">padding</span><span class="token punctuation">:</span> 0 8px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n',example:".icon-group {\n    display: inline-block;\n    margin-right: 32px;\n}\n\n.icon-group ux-icon {\n    padding: 0 8px;\n}\n"}},Wrpg:function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>icon-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>attachment<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>24px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>print<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>24px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>search<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>25px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>icon-group<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>configuration<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>16px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>configuration<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>32px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span>\n        <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>configuration<span class="token punctuation">"</span></span>\n        <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>48px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">rotate</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>90<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipHorizontal]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[flipVertical]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n',example:'<div class="icon-group">\n    <ux-icon\n        name="attachment"\n        size="24px"\n        [flipHorizontal]="false"\n        [flipVertical]="false">\n    </ux-icon>\n\n    <ux-icon\n        name="print"\n        size="24px"\n        [flipHorizontal]="false"\n        [flipVertical]="false">\n    </ux-icon>\n\n    <ux-icon\n        name="search"\n        size="25px"\n        [flipHorizontal]="false"\n        [flipVertical]="false">\n    </ux-icon>\n</div>\n\n<div class="icon-group">\n    <ux-icon\n        name="configuration"\n        size="16px"\n        [flipHorizontal]="false"\n        [flipVertical]="false">\n    </ux-icon>\n\n    <ux-icon\n        name="configuration"\n        size="32px"\n        [flipHorizontal]="true"\n        [flipVertical]="false">\n    </ux-icon>\n\n    <ux-icon\n        name="configuration"\n        size="48px"\n        rotate="90"\n        [flipHorizontal]="false"\n        [flipVertical]="false">\n    </ux-icon>\n</div>\n'}},i3pi:function(n,a,s){var t={"./app.css":"NIz/","./app.html":"Wrpg","./app.ts":"Gbyj","./appModule.ts":"EKHm","./service.ts":"IEYw"};function p(n){var a=o(n);return s(a)}function o(n){if(!s.o(t,n)){var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}return t[n]}p.keys=function(){return Object.keys(t)},p.resolve=o,n.exports=p,p.id="i3pi"}}]);