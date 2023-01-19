"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[8463],{18463:(T,i,s)=>{s.r(i),s.d(i,{GettingStartedPageModule:()=>U});var r=s(36895),a=s(40239),c=s(96215),p=s(3745),e=s(55062),l=s(23560),h=s(39327),m=s(78647),Z=s(75079);const A=[{path:"",component:(()=>{class t{constructor(){this.moduleTs="import { CheckboxModule } from '@ux-aspects/ux-aspects';\n\n@NgModule({\n    imports: [\n        CheckboxModule,\n        // ...\n    ]\n})\nexport class AppModule() {}",this.cliJson='"styles": [\n    "./node_modules/bootstrap/dist/css/bootstrap.css",\n    "./node_modules/@ux-aspects/ux-aspects/styles/ux-aspects.css"\n],'}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["uxd-getting-started"]],decls:119,vars:2,consts:[["header","Getting Started"],["routerLink",".","fragment","pre-requisites"],["routerLink",".","fragment","seed-project"],["routerLink",".","fragment","add-to-an-existing-project"],["routerLink",".","fragment","consuming-ux-aspects-components"],["routerLink",".","fragment","contributing"],["routerLink",".","fragment","getting-help"],["id","pre-requisites"],["href","https://nodejs.org/"],["href","https://git-scm.com/"],["href","https://cli.angular.io/"],["id","seed-project"],[1,"m-b"],["href","https://github.com/UXAspects/UXAspects-Seed"],["href","https://github.com/UXAspects/UXAspects-Seed/blob/master/README.md"],["id","add-to-an-existing-project"],["language","javascript",3,"code"],["id","consuming-ux-aspects-components"],["id","contributing"],["href","https://github.com/UXAspects/UXAspects/blob/master/CONTRIBUTING.md"],["id","getting-help"],["href","https://github.com/UXAspects/UXAspects/issues"]],template:function(o,u){1&o&&(e._UZ(0,"uxd-page-header",0),e.TgZ(1,"uxd-text-page-layout")(2,"p"),e._uU(3," UX Aspects components can be used in Angular projects (Angular 14 and 15 are currently supported). The stylesheet can also be used in non-Angular projects to style basic controls. "),e.qZA(),e.TgZ(4,"ol")(5,"li")(6,"a",1),e._uU(7,"Pre-Requisites"),e.qZA()(),e.TgZ(8,"li")(9,"a",2),e._uU(10,"Seed Project"),e.qZA()(),e.TgZ(11,"li")(12,"a",3),e._uU(13,"Add to an Existing Project"),e.qZA()(),e.TgZ(14,"li")(15,"a",4),e._uU(16,"Consuming UX Aspects Components"),e.qZA()(),e.TgZ(17,"li")(18,"a",5),e._uU(19,"Contributing"),e.qZA()(),e.TgZ(20,"li")(21,"a",6),e._uU(22,"Getting Help"),e.qZA()()(),e.TgZ(23,"section")(24,"h2",7),e._uU(25,"Pre-Requisites"),e.qZA(),e.TgZ(26,"p"),e._uU(27,"Instructions on this page refer to the following software:"),e.qZA(),e.TgZ(28,"ul")(29,"li")(30,"a",8),e._uU(31,"Node.js"),e.qZA(),e._uU(32," \u2014 this provides the "),e.TgZ(33,"code"),e._uU(34,"npm"),e.qZA(),e._uU(35," command, which is used to install application dependencies. "),e.qZA(),e.TgZ(36,"li")(37,"a",9),e._uU(38,"Git"),e.qZA(),e._uU(39," \u2014 used to download the seed project, or to build UX Aspects from source. "),e.qZA(),e.TgZ(40,"li")(41,"a",10),e._uU(42,"Angular CLI"),e.qZA(),e._uU(43," \u2014 used to build the seed project or create a new Angular application. "),e.qZA()()(),e.TgZ(44,"section")(45,"h2",11),e._uU(46,"Seed Project"),e.qZA(),e.TgZ(47,"p",12),e._uU(48," The easiest way to get started with UX Aspects is to download our "),e.TgZ(49,"a",13),e._uU(50,"Seed Project"),e.qZA(),e._uU(51,". This is a starter project, suitable for building a new Angular application using UX Aspects. Since it is built with Angular CLI, it is easy to extend with new pages and components. "),e.qZA(),e.TgZ(52,"ol")(53,"li"),e._uU(54," Clone the repository: "),e.TgZ(55,"code"),e._uU(56,"git clone https://github.com/UXAspects/UXAspects-Seed.git "),e.TgZ(57,"i"),e._uU(58,"my-project"),e.qZA()()(),e.TgZ(59,"li"),e._uU(60,"Switch to the directory which was downloaded."),e.qZA(),e.TgZ(61,"li"),e._uU(62,"Install the dependencies: "),e.TgZ(63,"code"),e._uU(64,"npm install"),e.qZA()(),e.TgZ(65,"li"),e._uU(66,"Build and run the site using the Angular CLI development server: "),e.TgZ(67,"code"),e._uU(68,"ng serve"),e.qZA()()(),e.TgZ(69,"p"),e._uU(70," A complete guide on using the Seed Project can be "),e.TgZ(71,"a",14),e._uU(72,"found here"),e.qZA(),e._uU(73,". "),e.qZA()(),e.TgZ(74,"section")(75,"h2",15),e._uU(76,"Add to an Existing Project"),e.qZA(),e.TgZ(77,"p"),e._uU(78,"If you want to consume UX Aspects in an existing application follow the steps below:"),e.qZA(),e.TgZ(79,"h3"),e._uU(80,"Install UX Aspects"),e.qZA(),e.TgZ(81,"pre"),e._uU(82,"npm install --save @ux-aspects/ux-aspects"),e.qZA(),e.TgZ(83,"h3"),e._uU(84,"Install Peer Dependencies"),e.qZA(),e.TgZ(85,"p"),e._uU(86," UX Aspects has a number of peer dependencies which should be met to ensure proper functionality across all components. You can select the version of each peer dependency that suits your application, provided it matches the peer version criteria. "),e.qZA(),e.TgZ(87,"h3"),e._uU(88,"Stylesheets"),e.qZA(),e.TgZ(89,"p"),e._uU(90," Add the Bootstrap and UX Aspects stylesheets to the application. If using Angular CLI, add these via the "),e.TgZ(91,"code"),e._uU(92,"angular.json"),e.qZA(),e._uU(93," file; otherwise, they can be imported into the master stylesheet. Note that the order of import is significant. "),e.qZA(),e._UZ(94,"uxd-snippet",16),e.qZA(),e.TgZ(95,"section")(96,"h2",17),e._uU(97,"Consuming UX Aspects Components"),e.qZA(),e.TgZ(98,"p"),e._uU(99," Import the required component module(s) into the module that will be using them. The Usage dropdown in the documentation lists the module to import, where appropriate. "),e.qZA(),e._UZ(100,"uxd-snippet",16),e.qZA(),e.TgZ(101,"section")(102,"h2",18),e._uU(103,"Contributing"),e.qZA(),e.TgZ(104,"p"),e._uU(105," UX Aspects is an open source project, which means that everyone is welcome to participate in making improvements! "),e.qZA(),e.TgZ(106,"p"),e._uU(107," See "),e.TgZ(108,"a",19),e._uU(109,"CONTRIBUTING.md"),e.qZA(),e._uU(110," on GitHub for information on building, testing, and submitting pull requests for UX Aspects. "),e.qZA()(),e.TgZ(111,"section")(112,"h2",20),e._uU(113,"Getting Help"),e.qZA(),e.TgZ(114,"p"),e._uU(115," To get help with anything related to UX Aspects, please "),e.TgZ(116,"a",21),e._uU(117,"raise an issue"),e.qZA(),e._uU(118," on GitHub. "),e.qZA()()()),2&o&&(e.xp6(94),e.Q6J("code",u.cliJson),e.xp6(6),e.Q6J("code",u.moduleTs))},dependencies:[l.q,h.j,m.O,Z.G,a.rH],styles:["[_nghost-%COMP%]  .nav-tabs{margin-bottom:15px}[_nghost-%COMP%]  .tab-content pre[class*=language-]{border-top:1px solid #ddd}"]}),t})()}];let U=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[r.ez,p.N,a.Bz.forChild(A),c.f_l]}),t})()}}]);