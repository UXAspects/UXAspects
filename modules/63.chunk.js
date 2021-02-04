(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{"8xlS":function(e,n){e.exports="import { CheckboxModule } from '@ux-aspects/ux-aspects';\n\n@NgModule({\n    imports: [\n        CheckboxModule,\n        // ...\n    ]\n})\nexport class AppModule() {}"},GneK:function(e,n){e.exports='"styles": [\n    "./node_modules/bootstrap/dist/css/bootstrap.css",\n    "./node_modules/@ux-aspects/ux-aspects/styles/ux-aspects.css"\n],'},nA2Y:function(e,n,t){"use strict";t.r(n),t.d(n,"GettingStartedPageModule",(function(){return u}));var c=t("ofXK"),s=t("tyNb"),o=t("7Q8i"),i=t("XtaT"),b=t("fXoL"),r=t("f/B4"),a=t("0FDo"),p=t("COk8"),d=[{path:"",component:function(){function e(){this.moduleTs=t("8xlS"),this.cliJson=t("GneK")}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=b.Jb({type:e,selectors:[["uxd-getting-started"]],decls:185,vars:2,consts:[["header","Getting Started"],["routerLink",".","fragment","pre-requisites"],["routerLink",".","fragment","seed-project"],["routerLink",".","fragment","add-to-an-existing-project"],["routerLink",".","fragment","consuming-ux-aspects-components"],["routerLink",".","fragment","contributing"],["routerLink",".","fragment","getting-help"],["id","pre-requisites"],["href","https://nodejs.org/"],["href","https://git-scm.com/"],["href","https://cli.angular.io/"],["href","https://gruntjs.com/using-the-cli"],["id","seed-project"],[1,"m-b"],["href","https://github.com/UXAspects/UXAspects-Seed"],["href","https://github.com/UXAspects/UXAspects-Seed/blob/master/README.md"],["id","add-to-an-existing-project"],["language","javascript",3,"code"],["id","consuming-ux-aspects-components"],["id","contributing"],["href","https://github.com/UXAspects/UXAspects/blob/master/CONTRIBUTING.md"],["id","getting-help"],["href","https://github.com/UXAspects/UXAspects/issues"]],template:function(e,n){1&e&&(b.Qb(0,"uxd-page-header",0),b.Nc(1,"\n\n"),b.Vb(2,"uxd-text-page-layout"),b.Nc(3,"\n    "),b.Vb(4,"p"),b.Nc(5,"\n        UX Aspects components can be used in Angular projects (Angular 9, 10, and 11 are currently supported). The\n        stylesheet can also be used in non-Angular projects to style basic controls.\n    "),b.Ub(),b.Nc(6,"\n\n    "),b.Vb(7,"ol"),b.Nc(8,"\n        "),b.Vb(9,"li"),b.Vb(10,"a",1),b.Nc(11,"Pre-Requisites"),b.Ub(),b.Ub(),b.Nc(12,"\n        "),b.Vb(13,"li"),b.Vb(14,"a",2),b.Nc(15,"Seed Project"),b.Ub(),b.Ub(),b.Nc(16,"\n        "),b.Vb(17,"li"),b.Vb(18,"a",3),b.Nc(19,"Add to an Existing Project"),b.Ub(),b.Ub(),b.Nc(20,"\n        "),b.Vb(21,"li"),b.Vb(22,"a",4),b.Nc(23,"Consuming UX Aspects Components"),b.Ub(),b.Ub(),b.Nc(24,"\n        "),b.Vb(25,"li"),b.Vb(26,"a",5),b.Nc(27,"Contributing"),b.Ub(),b.Ub(),b.Nc(28,"\n        "),b.Vb(29,"li"),b.Vb(30,"a",6),b.Nc(31,"Getting Help"),b.Ub(),b.Ub(),b.Nc(32,"\n    "),b.Ub(),b.Nc(33,"\n\n    "),b.Vb(34,"section"),b.Nc(35,"\n        "),b.Vb(36,"h2",7),b.Nc(37,"Pre-Requisites"),b.Ub(),b.Nc(38,"\n\n        "),b.Vb(39,"p"),b.Nc(40,"Instructions on this page refer to the following software:"),b.Ub(),b.Nc(41,"\n\n        "),b.Vb(42,"ul"),b.Nc(43,"\n            "),b.Vb(44,"li"),b.Nc(45,"\n                "),b.Vb(46,"a",8),b.Nc(47,"Node.js"),b.Ub(),b.Nc(48," v10 \u2014 this provides the "),b.Vb(49,"code"),b.Nc(50,"npm"),b.Ub(),b.Nc(51," command, which\n                is used to install application dependencies.\n            "),b.Ub(),b.Nc(52,"\n            "),b.Vb(53,"li"),b.Nc(54,"\n                "),b.Vb(55,"a",9),b.Nc(56,"Git"),b.Ub(),b.Nc(57," \u2014 used to download the seed project, or to build UX Aspects\n                from source.\n            "),b.Ub(),b.Nc(58,"\n            "),b.Vb(59,"li"),b.Nc(60,"\n                "),b.Vb(61,"a",10),b.Nc(62,"Angular CLI"),b.Ub(),b.Nc(63," \u2014 used to build the seed project or create a new\n                Angular application.\n            "),b.Ub(),b.Nc(64,"\n            "),b.Vb(65,"li"),b.Vb(66,"a",11),b.Nc(67,"Grunt"),b.Ub(),b.Nc(68," \u2014 used to build UX Aspects from source."),b.Ub(),b.Nc(69,"\n        "),b.Ub(),b.Nc(70,"\n    "),b.Ub(),b.Nc(71,"\n\n    "),b.Vb(72,"section"),b.Nc(73,"\n        "),b.Vb(74,"h2",12),b.Nc(75,"Seed Project"),b.Ub(),b.Nc(76,"\n\n        "),b.Vb(77,"p",13),b.Nc(78,"\n            The easiest way to get started with UX Aspects is to download our\n            "),b.Vb(79,"a",14),b.Nc(80,"Seed Project"),b.Ub(),b.Nc(81,". This is a starter project, suitable\n            for building a new Angular application using UX Aspects. Since it is built with Angular CLI, it is easy to\n            extend with new pages and components.\n        "),b.Ub(),b.Nc(82,"\n\n        "),b.Vb(83,"ol"),b.Nc(84,"\n            "),b.Vb(85,"li"),b.Nc(86,"\n                Clone the repository:\n                "),b.Vb(87,"code"),b.Nc(88,"git clone https://github.com/UXAspects/UXAspects-Seed.git "),b.Vb(89,"i"),b.Nc(90,"my-project"),b.Ub(),b.Ub(),b.Nc(91,"\n            "),b.Ub(),b.Nc(92,"\n            "),b.Vb(93,"li"),b.Nc(94,"Switch to the directory which was downloaded."),b.Ub(),b.Nc(95,"\n            "),b.Vb(96,"li"),b.Nc(97,"Install the dependencies: "),b.Vb(98,"code"),b.Nc(99,"npm install"),b.Ub(),b.Ub(),b.Nc(100,"\n            "),b.Vb(101,"li"),b.Nc(102,"Build and run the site using the Angular CLI development server: "),b.Vb(103,"code"),b.Nc(104,"ng serve"),b.Ub(),b.Ub(),b.Nc(105,"\n        "),b.Ub(),b.Nc(106,"\n\n        "),b.Vb(107,"p"),b.Nc(108,"\n            A complete guide on using the Seed Project can be\n            "),b.Vb(109,"a",15),b.Nc(110,"found here"),b.Ub(),b.Nc(111,".\n        "),b.Ub(),b.Nc(112,"\n    "),b.Ub(),b.Nc(113,"\n\n    "),b.Vb(114,"section"),b.Nc(115,"\n        "),b.Vb(116,"h2",16),b.Nc(117,"Add to an Existing Project"),b.Ub(),b.Nc(118,"\n\n        "),b.Vb(119,"p"),b.Nc(120,"If you want to consume UX Aspects in an existing application follow the steps below:"),b.Ub(),b.Nc(121,"\n\n        "),b.Vb(122,"h3"),b.Nc(123,"Install UX Aspects"),b.Ub(),b.Nc(124,"\n\n        "),b.Vb(125,"pre"),b.Nc(126,"npm install --save @ux-aspects/ux-aspects"),b.Ub(),b.Nc(127,"\n\n        "),b.Vb(128,"h3"),b.Nc(129,"Install Peer Dependencies"),b.Ub(),b.Nc(130,"\n\n        "),b.Vb(131,"p"),b.Nc(132,"\n            UX Aspects has a number of peer dependencies which should be met to ensure proper functionality across all\n            components. You can select the version of each peer dependency that suits your application, provided it\n            matches the peer version criteria.\n        "),b.Ub(),b.Nc(133,"\n\n        "),b.Vb(134,"h3"),b.Nc(135,"Stylesheets"),b.Ub(),b.Nc(136,"\n\n        "),b.Vb(137,"p"),b.Nc(138,"\n            Add the Bootstrap and UX Aspects stylesheets to the application. If using Angular CLI, add these via the\n            "),b.Vb(139,"code"),b.Nc(140,"angular.json"),b.Ub(),b.Nc(141," file; otherwise, they can be imported into the master stylesheet. Note that the\n            order of import is significant.\n        "),b.Ub(),b.Nc(142,"\n\n        "),b.Qb(143,"uxd-snippet",17),b.Nc(144,"\n    "),b.Ub(),b.Nc(145,"\n\n    "),b.Vb(146,"section"),b.Nc(147,"\n        "),b.Vb(148,"h2",18),b.Nc(149,"Consuming UX Aspects Components"),b.Ub(),b.Nc(150,"\n\n        "),b.Vb(151,"p"),b.Nc(152,"\n            Import the required component module(s) into the module that will be using them. The Usage dropdown in the\n            documentation lists the module to import, where appropriate.\n        "),b.Ub(),b.Nc(153,"\n\n        "),b.Qb(154,"uxd-snippet",17),b.Nc(155,"\n    "),b.Ub(),b.Nc(156,"\n\n    "),b.Vb(157,"section"),b.Nc(158,"\n        "),b.Vb(159,"h2",19),b.Nc(160,"Contributing"),b.Ub(),b.Nc(161,"\n\n        "),b.Vb(162,"p"),b.Nc(163,"\n            UX Aspects is an open source project, which means that everyone is welcome to participate in making\n            improvements!\n        "),b.Ub(),b.Nc(164,"\n\n        "),b.Vb(165,"p"),b.Nc(166,"\n            See\n            "),b.Vb(167,"a",20),b.Nc(168,"CONTRIBUTING.md"),b.Ub(),b.Nc(169,"\n            on GitHub for information on building, testing, and submitting pull requests for UX Aspects.\n        "),b.Ub(),b.Nc(170,"\n    "),b.Ub(),b.Nc(171,"\n\n    "),b.Vb(172,"section"),b.Nc(173,"\n        "),b.Vb(174,"h2",21),b.Nc(175,"Getting Help"),b.Ub(),b.Nc(176,"\n\n        "),b.Vb(177,"p"),b.Nc(178,"\n            To get help with anything related to UX Aspects, please\n            "),b.Vb(179,"a",22),b.Nc(180,"raise an issue"),b.Ub(),b.Nc(181," on GitHub.\n        "),b.Ub(),b.Nc(182,"\n    "),b.Ub(),b.Nc(183,"\n"),b.Ub(),b.Nc(184,"\n")),2&e&&(b.zb(143),b.nc("code",n.cliJson),b.zb(11),b.nc("code",n.moduleTs))},directives:[r.a,a.a,s.h,o.P,p.a],styles:["[_nghost-%COMP%]  .nav-tabs{margin-bottom:15px}[_nghost-%COMP%]  .tab-content pre[class*=language-]{border-top:1px solid #ddd}"]}),e}()}],u=function(){function e(){}return e.\u0275mod=b.Nb({type:e}),e.\u0275inj=b.Mb({factory:function(n){return new(n||e)},imports:[[c.c,i.a,s.i.forChild(d),o.Nd]]}),e}()}}]);