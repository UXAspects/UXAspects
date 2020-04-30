(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{AVdU:function(n,a,t){"use strict";t.d(a,"a",(function(){return s}));var s=function(){return function(n){var a=this;this.snippets={compiled:{},raw:{}},n.keys().forEach((function(t){var s=t.replace("./","").replace(/\W+(\w)/g,(function(n){return n[1].toUpperCase()})),e=n(t);e.snippet&&(a.snippets.compiled[s]=e.snippet),e.example&&(a.snippets.raw[s]=e.example)}))}}()},NdB5:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Breadcrumb<span class="token punctuation">,</span> PageHeaderIconMenu<span class="token punctuation">,</span> PageHeaderNavigationItem <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@ux-aspects/ux-aspects\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    condensed<span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n    crumbs<span class="token operator">:</span> Breadcrumb<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            title<span class="token operator">:</span> <span class="token string">\'Archive\'</span><span class="token punctuation">,</span>\n            <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span>\n            title<span class="token operator">:</span> <span class="token string">\'2017\'</span><span class="token punctuation">,</span>\n            <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    items<span class="token operator">:</span> PageHeaderNavigationItem<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            icon<span class="token operator">:</span> <span class="token string">\'home\'</span><span class="token punctuation">,</span>\n            title<span class="token operator">:</span> <span class="token string">\'Home\'</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span>\n            icon<span class="token operator">:</span> <span class="token string">\'analytics\'</span><span class="token punctuation">,</span>\n            title<span class="token operator">:</span> <span class="token string">\'Analytics\'</span><span class="token punctuation">,</span>\n            children<span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token punctuation">{</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Bar Charts\'</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Pie Charts\'</span><span class="token punctuation">,</span>\n                    children<span class="token operator">:</span> <span class="token punctuation">[</span>\n                        <span class="token punctuation">{</span>\n                            title<span class="token operator">:</span> <span class="token string">\'Daily View\'</span>\n                        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                        <span class="token punctuation">{</span>\n                            title<span class="token operator">:</span> <span class="token string">\'Weekly View\'</span>\n                        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                        <span class="token punctuation">{</span>\n                            title<span class="token operator">:</span> <span class="token string">\'Monthly View\'</span>\n                        <span class="token punctuation">}</span>\n                    <span class="token punctuation">]</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    iconMenus<span class="token operator">:</span> PageHeaderIconMenu<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            icon<span class="token operator">:</span> <span class="token string">\'notification\'</span><span class="token punctuation">,</span>\n            label<span class="token operator">:</span> <span class="token string">\'Notifications. 3 new items.\'</span><span class="token punctuation">,</span>\n            badge<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>\n            dropdown<span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token punctuation">{</span>\n                    icon<span class="token operator">:</span> <span class="token string">\'chat\'</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'You have 16 messages\'</span><span class="token punctuation">,</span>\n                    subtitle<span class="token operator">:</span> <span class="token string">\'4 minutes ago\'</span><span class="token punctuation">,</span>\n                    divider<span class="token operator">:</span> <span class="token boolean">true</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    icon<span class="token operator">:</span> <span class="token string">\'social-twitter\'</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'3 New Followers\'</span><span class="token punctuation">,</span>\n                    subtitle<span class="token operator">:</span> <span class="token string">\'12 minutes ago\'</span><span class="token punctuation">,</span>\n                    divider<span class="token operator">:</span> <span class="token boolean">true</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    icon<span class="token operator">:</span> <span class="token string">\'cloud\'</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Server Rebooted\'</span><span class="token punctuation">,</span>\n                    subtitle<span class="token operator">:</span> <span class="token string">\'22 minutes ago\'</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">{</span>\n            icon<span class="token operator">:</span> <span class="token string">\'actions\'</span><span class="token punctuation">,</span>\n            label<span class="token operator">:</span> <span class="token string">\'Actions\'</span><span class="token punctuation">,</span>\n            dropdown<span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token punctuation">{</span>\n                    header<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'John Doe\'</span><span class="token punctuation">,</span>\n                    divider<span class="token operator">:</span> <span class="token boolean">true</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    icon<span class="token operator">:</span> <span class="token string">\'user-settings\'</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Settings\'</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    icon<span class="token operator">:</span> <span class="token string">\'logout\'</span><span class="token punctuation">,</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Log Out\'</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span>\n                <span class="token punctuation">{</span>\n                    title<span class="token operator">:</span> <span class="token string">\'Show Tips\'</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">}</span>',example:"import { Component } from '@angular/core';\nimport { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent {\n\n    condensed: boolean = false;\n\n    crumbs: Breadcrumb[] = [\n        {\n            title: 'Archive',\n            onClick: () => { }\n        },\n        {\n            title: '2017',\n            onClick: () => { }\n        }\n    ];\n\n    items: PageHeaderNavigationItem[] = [\n        {\n            icon: 'home',\n            title: 'Home'\n        },\n        {\n            icon: 'analytics',\n            title: 'Analytics',\n            children: [\n                {\n                    title: 'Bar Charts'\n                },\n                {\n                    title: 'Pie Charts',\n                    children: [\n                        {\n                            title: 'Daily View'\n                        },\n                        {\n                            title: 'Weekly View'\n                        },\n                        {\n                            title: 'Monthly View'\n                        }\n                    ]\n                }\n            ]\n        }\n    ];\n\n    iconMenus: PageHeaderIconMenu[] = [\n        {\n            icon: 'notification',\n            label: 'Notifications. 3 new items.',\n            badge: 3,\n            dropdown: [\n                {\n                    icon: 'chat',\n                    title: 'You have 16 messages',\n                    subtitle: '4 minutes ago',\n                    divider: true\n                },\n                {\n                    icon: 'social-twitter',\n                    title: '3 New Followers',\n                    subtitle: '12 minutes ago',\n                    divider: true\n                },\n                {\n                    icon: 'cloud',\n                    title: 'Server Rebooted',\n                    subtitle: '22 minutes ago'\n                }\n            ]\n        },\n        {\n            icon: 'actions',\n            label: 'Actions',\n            dropdown: [\n                {\n                    header: true,\n                    title: 'John Doe',\n                    divider: true\n                },\n                {\n                    icon: 'user-settings',\n                    title: 'Settings'\n                },\n                {\n                    icon: 'logout',\n                    title: 'Log Out'\n                },\n                {\n                    title: 'Show Tips'\n                }\n            ]\n        }\n    ];\n\n}"}},SFOz:function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-page-header</span> <span class="token attr-name">header</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>My Page<span class="token punctuation">"</span></span> <span class="token attr-name">[crumbs]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>crumbs<span class="token punctuation">"</span></span> <span class="token attr-name">[items]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>items<span class="token punctuation">"</span></span> \n                <span class="token attr-name">[condensed]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>condensed<span class="token punctuation">"</span></span> <span class="token attr-name">[iconMenus]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>iconMenus<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-page-header</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>btn button-primary<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>condensed = !condensed<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Toggle Condensed<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n',example:'<ux-page-header header="My Page" [crumbs]="crumbs" [items]="items" \n                [condensed]="condensed" [iconMenus]="iconMenus"></ux-page-header>\n\n<br>\n\n<button class="btn button-primary" (click)="condensed = !condensed">Toggle Condensed</button>\n'}},mtDe:function(n,a,t){"use strict";t.r(a);var s,e=t("DUip"),o=t("7Q8i"),p=t("XtaT"),c=t("T/2f"),i=t("YZ8U"),r=t("AVdU"),l=t("yHOM"),u=t("TYT/"),d=t("+gXg"),k=t("2RDK"),b=t("COk8"),m=(s=function(n,a){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var t in a)a.hasOwnProperty(t)&&(n[t]=a[t])})(n,a)},function(n,a){function t(){this.constructor=n}s(n,a),n.prototype=null===a?Object.create(a):(t.prototype=a.prototype,new t)}),g=function(n){function a(){var a=n.call(this,t("zIEs"))||this;return a.playground={files:{"app.component.html":a.snippets.raw.appHtml,"app.component.ts":a.snippets.raw.appTs},modules:[{imports:["PageHeaderModule"],library:"@ux-aspects/ux-aspects"},{imports:["RouterModule"],library:"@angular/router",providers:["RouterModule.forRoot([])"]},{imports:["BsDropdownModule"],library:"ngx-bootstrap/dropdown",providers:["BsDropdownModule.forRoot()"]}]},a.condensed=!1,a.crumbs=[{title:"Archive",onClick:function(){}},{title:"2017",onClick:function(){}}],a.items=[{icon:"home",title:"Home"},{icon:"analytics",title:"Analytics",children:[{title:"Bar Charts"},{title:"Pie Charts",children:[{title:"Daily View"},{title:"Weekly View"},{title:"Monthly View"}]}]}],a.iconMenus=[{icon:"notification",label:"Notifications. 3 new items.",badge:3,dropdown:[{icon:"chat",title:"You have 16 messages",subtitle:"4 minutes ago",divider:!0},{icon:"social-twitter",title:"3 New Followers",subtitle:"12 minutes ago",divider:!0},{icon:"cloud",title:"Server Rebooted",subtitle:"22 minutes ago"}]},{icon:"actions",label:"Actions",dropdown:[{header:!0,title:"John Doe",divider:!0},{icon:"user-settings",title:"Settings"},{icon:"logout",title:"Log Out"},{title:"Show Tips"}]}],a}return m(a,n),a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=u.Ob({type:a,selectors:[["uxd-components-page-header"]],features:[u.zb],decls:197,vars:7,consts:[["header","My Page",3,"crumbs","items","condensed","iconMenus"],[1,"btn","button-primary",3,"click"],["tableTitle","Inputs"],["uxd-api-property","","name","logo","type","string"],["uxd-api-property","","name","items","type","PageHeaderNavigationItem[]"],["uxd-api-property","","name","crumbs","type","Breadcrumb"],["uxd-api-property","","name","header","type","string"],["uxd-api-property","","name","alignment","type","left, center, right","defaultValue","center"],["uxd-api-property","","name","condensed","type","boolean","defaultValue","false"],["uxd-api-property","","name","iconMenus","type","PageHeaderIconMenu[]"],["uxd-api-property","","name","backVisible","type","boolean","defaultValue","false"],["tableTitle","Outputs"],["uxd-api-property","","name","backClick","type","MouseEvent"],["tableTitle","PageHeaderNavigationItem"],["uxd-api-property","","name","icon","type","string"],["routerLink","/css/icons"],["uxd-api-property","","name","title","type","string","required","true"],["uxd-api-property","","name","select","type","(item: PageHeaderNavigationItem) => void","required","true"],["uxd-api-property","","name","children","type","PageHeaderNavigationDropdownItem[]"],["uxd-api-property","","name","disabled","type","boolean"],["tableTitle","PageHeaderNavigationDropdownItem"],["uxd-api-property","","name","select","type","(item: PageHeaderNavigationDropdownItem) => void","required","true"],["tableTitle","Breadcrumb"],["uxd-api-property","","name","routerLink","type","string"],["uxd-api-property","","name","fragment","type","string"],["uxd-api-property","","name","queryParams","type","string"],["uxd-api-property","","name","onClick","type","(event: MouseEvent) => void","required","true"],["tableTitle","PageHeaderIconMenu"],["uxd-api-property","","name","icon","type","string","required","true"],["routerLink","/css/icons","fragment","ux-icons"],["uxd-api-property","","name","label","type","string"],["uxd-api-property","","name","badge","type","string | number"],["uxd-api-property","","name","select","type","(menu: PageHeaderIconMenu) => void","required","true"],["uxd-api-property","","name","dropdown","type","PageHeaderIconMenuDropdownItem[]"],["tableTitle","PageHeaderIconMenuDropdownItem"],["uxd-api-property","","name","title","type","string | number"],["uxd-api-property","","name","subtitle","type","string"],["uxd-api-property","","name","header","type","boolean"],["uxd-api-property","","name","divider","type","boolean"],["uxd-api-property","","name","select","type","() => void","required","true"],[3,"minimal"],["heading","HTML"],["language","html",3,"content"],["heading","TypeScript"],["language","javascript",3,"content"]],template:function(n,a){1&n&&(u.ac(0,"ux-page-header",0),u.Sc(1,"\n"),u.Zb(),u.Sc(2,"\n\n"),u.Vb(3,"br"),u.Sc(4,"\n\n"),u.ac(5,"button",1),u.ic("click",(function(){return a.condensed=!a.condensed})),u.Sc(6,"Toggle Condensed"),u.Zb(),u.Sc(7,"\n\n"),u.Vb(8,"hr"),u.Sc(9,"\n\n"),u.ac(10,"p"),u.Sc(11,"\n    The "),u.ac(12,"code"),u.Sc(13,"ux-page-header"),u.Zb(),u.Sc(14," component can be used to easily provide navigation for your application. It can display\n    a page title, application logo, breadcrumbs, icon menus and a navigation menu with support for dropdowns and nested dropdowns.\n    The component can be displayed in both regular and condensed forms.\n"),u.Zb(),u.Sc(15,"\n\n"),u.ac(16,"p"),u.Sc(17,"The appearance and behavior of the component can be configured using the following attributes:"),u.Zb(),u.Sc(18,"\n\n"),u.ac(19,"uxd-api-properties",2),u.Sc(20,"\n    "),u.ac(21,"tr",3),u.Sc(22,"\n        The path to an image to display within the top left part of the header.\n    "),u.Zb(),u.Sc(23,"\n    "),u.ac(24,"tr",4),u.Sc(25,"\n        The list of items to display in the navigation menu.\n    "),u.Zb(),u.Sc(26,"\n    "),u.ac(27,"tr",5),u.Sc(28,"\n        The breadcrumbs to display above the page header.\n    "),u.Zb(),u.Sc(29,"\n    "),u.ac(30,"tr",6),u.Sc(31,"\n        The title of the current page.\n    "),u.Zb(),u.Sc(32,"\n    "),u.ac(33,"tr",7),u.Sc(34,"\n        Defines how the navigation menu should be positioned horizontally.\n    "),u.Zb(),u.Sc(35,"\n    "),u.ac(36,"tr",8),u.Sc(37,"\n        Determines whether or not to display the page header in the regular or condensed form.\n    "),u.Zb(),u.Sc(38,"\n    "),u.ac(39,"tr",9),u.Sc(40,"\n        The list of icon menus to display in the top right area of the page header.\n    "),u.Zb(),u.Sc(41,"\n    "),u.ac(42,"tr",10),u.Sc(43,"\n        Determines whether or not a back button should be visible in the page header.\n    "),u.Zb(),u.Sc(44,"\n"),u.Zb(),u.Sc(45,"\n\n"),u.ac(46,"uxd-api-properties",11),u.Sc(47,"\n    "),u.ac(48,"tr",12),u.Sc(49,"\n        The event fired when the back button is clicked.\n    "),u.Zb(),u.Sc(50,"\n"),u.Zb(),u.Sc(51,"\n\n"),u.ac(52,"p"),u.Sc(53,"The following interfaces are used within the configuration of the page header:"),u.Zb(),u.Sc(54,"\n\n"),u.ac(55,"uxd-api-properties",13),u.Sc(56,"\n    "),u.ac(57,"tr",14),u.Sc(58,"\n        The icon from the "),u.ac(59,"a",15),u.Sc(60,"UX Aspects iconset"),u.Zb(),u.Sc(61," to display in the navigation item.\n    "),u.Zb(),u.Sc(62,"\n    "),u.ac(63,"tr",16),u.Sc(64,"\n        The text to be displayed in the navigation button.\n    "),u.Zb(),u.Sc(65,"\n    "),u.ac(66,"tr",17),u.Sc(67,"\n        Function that will be called when the navigation button is clicked.\n    "),u.Zb(),u.Sc(68,"\n    "),u.ac(69,"tr",18),u.Sc(70,"\n        If specified, a dropdown will be displayed containing additional items for the user to select.\n    "),u.Zb(),u.Sc(71,"\n    "),u.ac(72,"tr",19),u.Sc(73,"\n        If set to "),u.ac(74,"code"),u.Sc(75,"true"),u.Zb(),u.Sc(76,", the item will be disabled.\n    "),u.Zb(),u.Sc(77,"\n"),u.Zb(),u.Sc(78,"\n\n"),u.Vb(79,"hr"),u.Sc(80,"\n\n"),u.ac(81,"uxd-api-properties",20),u.Sc(82,"\n    "),u.ac(83,"tr",16),u.Sc(84,"\n        The text to be displayed in the dropdown item.\n    "),u.Zb(),u.Sc(85,"\n    "),u.ac(86,"tr",21),u.Sc(87,"\n        Function that will be called when the dropdown item is clicked.\n    "),u.Zb(),u.Sc(88,"\n    "),u.ac(89,"tr",18),u.Sc(90,"\n        If specified, a nested dropdown will be displayed containing additional items for the user to select (maximum of 1 nested level).\n    "),u.Zb(),u.Sc(91,"\n    "),u.ac(92,"tr",19),u.Sc(93,"\n        If set to "),u.ac(94,"code"),u.Sc(95,"true"),u.Zb(),u.Sc(96,", the dropdown item will be disabled.\n    "),u.Zb(),u.Sc(97,"\n"),u.Zb(),u.Sc(98,"\n\n"),u.Vb(99,"hr"),u.Sc(100,"\n\n"),u.ac(101,"uxd-api-properties",22),u.Sc(102,"\n    "),u.ac(103,"tr",16),u.Sc(104,"\n        The text to be displayed in the breadcrumb.\n    "),u.Zb(),u.Sc(105,"\n    "),u.ac(106,"tr",23),u.Sc(107,"\n        Performs navigation to a router link if that breadcrumb is clicked.\n    "),u.Zb(),u.Sc(108,"\n    "),u.ac(109,"tr",24),u.Sc(110,"\n        Performs navigation to a fragment if that breadcrumb is clicked.\n    "),u.Zb(),u.Sc(111,"\n    "),u.ac(112,"tr",25),u.Sc(113,"\n        Allows you to pass query parameters to a route when a breadcrumb is clicked.\n    "),u.Zb(),u.Sc(114,"\n    "),u.ac(115,"tr",26),u.Sc(116,"\n        This function will be called when a breadcrumb is clicked.\n    "),u.Zb(),u.Sc(117,"\n"),u.Zb(),u.Sc(118,"\n\n"),u.Vb(119,"hr"),u.Sc(120,"\n\n"),u.ac(121,"uxd-api-properties",27),u.Sc(122,"\n    "),u.ac(123,"tr",28),u.Sc(124,"\n        The name of an icon from "),u.ac(125,"a",29),u.Sc(126,"UX Aspects Icons"),u.Zb(),u.Sc(127,".\n    "),u.Zb(),u.Sc(128,"\n    "),u.ac(129,"tr",30),u.Sc(130,"\n        Description of the purpose of the icon menu, including its badge, for assistive technologies.\n    "),u.Zb(),u.Sc(131,"\n    "),u.ac(132,"tr",31),u.Sc(133,"\n        Content to display in a raised badge over the icon.\n    "),u.Zb(),u.Sc(134,"\n    "),u.ac(135,"tr",32),u.Sc(136,"\n        Action to execute when the icon is clicked.\n    "),u.Zb(),u.Sc(137,"\n    "),u.ac(138,"tr",33),u.Sc(139,"\n        Items to display as a dropdown menu.\n    "),u.Zb(),u.Sc(140,"\n"),u.Zb(),u.Sc(141,"\n\n"),u.Vb(142,"hr"),u.Sc(143,"\n\n"),u.ac(144,"uxd-api-properties",34),u.Sc(145,"\n    "),u.ac(146,"tr",28),u.Sc(147,"\n        The icon from the UX Aspects iconset to display in the dropdown item.\n    "),u.Zb(),u.Sc(148,"\n    "),u.ac(149,"tr",35),u.Sc(150,"\n        The text to display in the dropdown item.\n    "),u.Zb(),u.Sc(151,"\n    "),u.ac(152,"tr",36),u.Sc(153,"\n        The text to display on the right side of the dropdown item.\n    "),u.Zb(),u.Sc(154,"\n    "),u.ac(155,"tr",37),u.Sc(156,"\n        Determines if this item should be displayed as a dropdown header.\n    "),u.Zb(),u.Sc(157,"\n    "),u.ac(158,"tr",38),u.Sc(159,"\n        If "),u.ac(160,"code"),u.Sc(161,"true"),u.Zb(),u.Sc(162," a divider will be placed beneath this dropdown item.\n    "),u.Zb(),u.Sc(163,"\n    "),u.ac(164,"tr",39),u.Sc(165,"\n        This function will be called when a dropdown item is clicked.\n    "),u.Zb(),u.Sc(166,"\n"),u.Zb(),u.Sc(167,"\n\n"),u.Vb(168,"hr"),u.Sc(169,"\n\n"),u.ac(170,"p"),u.Sc(171,"\n    Additionally you can add custom menu items to the top right of the page header by using the "),u.ac(172,"code"),u.Sc(173,"uxPageHeaderCustomItem"),u.Zb(),u.Sc(174,"\n    structural directive as content of the "),u.ac(175,"code"),u.Sc(176,"ux-page-header"),u.Zb(),u.Sc(177," component. This is used to define templates for menu items and\n    you can add custom click behavior.\n"),u.Zb(),u.Sc(178,"\n\n"),u.Vb(179,"hr"),u.Sc(180,"\n\n"),u.ac(181,"p"),u.Sc(182,"The following code can be used to create the example above:"),u.Zb(),u.Sc(183,"\n\n"),u.ac(184,"ux-tabset",40),u.Sc(185,"\n\n    "),u.ac(186,"ux-tab",41),u.Sc(187,"\n        "),u.Vb(188,"uxd-snippet",42),u.Sc(189,"\n    "),u.Zb(),u.Sc(190,"\n\n    "),u.ac(191,"ux-tab",43),u.Sc(192,"\n        "),u.Vb(193,"uxd-snippet",44),u.Sc(194,"\n    "),u.Zb(),u.Sc(195,"\n\n"),u.Zb(),u.Sc(196,"\n")),2&n&&(u.tc("crumbs",a.crumbs)("items",a.items)("condensed",a.condensed)("iconMenus",a.iconMenus),u.Cb(184),u.tc("minimal",!1),u.Cb(4),u.tc("content",a.snippets.compiled.appHtml),u.Cb(5),u.tc("content",a.snippets.compiled.appTs))},directives:[o.zc,o.N,d.a,k.a,e.h,o.Kd,o.Fd,b.a],encapsulation:2}),a=function(n,a,t,s){var e,o=arguments.length,p=o<3?a:null===s?s=Object.getOwnPropertyDescriptor(a,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,a,t,s);else for(var c=n.length-1;c>=0;c--)(e=n[c])&&(p=(o<3?e(p):o>3?e(a,t,p):e(a,t))||p);return o>3&&p&&Object.defineProperty(a,t,p),p}([Object(l.a)("ComponentsPageHeaderComponent")],a)}(r.a);t.d(a,"ComponentsPageHeaderModule",(function(){return y}));var h=[g],S=[{path:"**",component:c.a,data:{category:i.b.resolveCategoryData(i.a.Components,"Page Header")}}],y=function(){function n(n,a){a.registerResolver(n,h)}return n.\u0275mod=u.Sb({type:n}),n.\u0275inj=u.Rb({factory:function(a){return new(a||n)(u.ec(u.j),u.ec(i.b))},imports:[[o.Ld,o.Ac,p.a,e.i.forChild(S)]]}),n}();("undefined"==typeof ngJitMode||ngJitMode)&&u.Mc(y,{declarations:[g],imports:[o.Ld,o.Ac,p.a,e.i],exports:[g]})},zIEs:function(n,a,t){var s={"./app.html":"SFOz","./app.ts":"NdB5"};function e(n){var a=o(n);return t(a)}function o(n){if(!t.o(s,n)){var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}return s[n]}e.keys=function(){return Object.keys(s)},e.resolve=o,n.exports=e,e.id="zIEs"}}]);