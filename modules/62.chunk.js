(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{LNEw:function(a,e,t){"use strict";t.r(e);var n=t("Valr"),i=t("QJY3"),o=t("DUip"),c=t("7Q8i"),s=t("KLty"),r=t("u/pq"),l=t("TYT/"),h=function(){function a(){}return a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=l.Ob({type:a,selectors:[["uxd-showcase"]],decls:1,vars:0,template:function(a,e){1&a&&l.Vb(0,"router-outlet")},directives:[o.j],encapsulation:2}),a}(),p=t("XtaT"),u=t("f/B4"),d=t("kWrZ"),S=t("owxW"),b=function(){function a(){this.organizationChartImage=t("dztR"),this.partitionMapImage=t("YA3o"),this.sankeyChartImage=t("Xuou"),this.organizationChartUrl="#/showcase/visualizations/organization-chart",this.partitionMapUrl="#/showcase/visualizations/partition-map",this.sankeyChartUrl="#/showcase/visualizations/sankey-chart"}return a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=l.Ob({type:a,selectors:[["uxd-showcase-overview"]],decls:81,vars:6,consts:[["header","Showcase","description","Sample applications made using UX Aspects"],[3,"link","image"]],template:function(a,e){1&a&&(l.ac(0,"uxd-page-header",0),l.Sc(1,"\n"),l.Zb(),l.Sc(2,"\n\n"),l.ac(3,"uxd-full-page-layout"),l.Sc(4,"\n\n    "),l.ac(5,"uxd-showcase-card",1),l.Sc(6,"\n        "),l.ac(7,"h4"),l.Sc(8,"Partition Map Example"),l.Zb(),l.Sc(9,"\n        "),l.ac(10,"p"),l.Sc(11,"A sample application illustrating the use of the partition map to show the breakdown of a document set by various criteria. This provides the following features:"),l.Zb(),l.Sc(12,"\n        "),l.ac(13,"ul"),l.Sc(14,"\n            "),l.ac(15,"li"),l.ac(16,"strong"),l.Sc(17,"Document breakdown:"),l.Zb(),l.Sc(18," See a visual representation of the document set by custodian, language and file type."),l.Zb(),l.Sc(19,"\n            "),l.ac(20,"li"),l.ac(21,"strong"),l.Sc(22,"Clickable Segments:"),l.Zb(),l.Sc(23," Select a segment to zoom in or out of the partition map."),l.Zb(),l.Sc(24,"\n            "),l.ac(25,"li"),l.ac(26,"strong"),l.Sc(27,"Editing:"),l.Zb(),l.Sc(28," Edit the data types and their row order in the partition map."),l.Zb(),l.Sc(29,"\n        "),l.Zb(),l.Sc(30,"\n    "),l.Zb(),l.Sc(31,"\n\n    "),l.ac(32,"uxd-showcase-card",1),l.Sc(33,"\n        "),l.ac(34,"h4"),l.Sc(35,"Organization Chart Example"),l.Zb(),l.Sc(36,"\n        "),l.ac(37,"p"),l.Sc(38,"A sample application illustrating the use of the organization chart and hierarchy bar to show\n            a hierarchy of different individuals within an organization. This provides the following\n            features:"),l.Zb(),l.Sc(39,"\n        "),l.ac(40,"ul"),l.Sc(41,"\n            "),l.ac(42,"li"),l.ac(43,"strong"),l.Sc(44,"Clickable Nodes:"),l.Zb(),l.Sc(45," Select employee nodes to navigate down through the\n                hierarchical structure"),l.Zb(),l.Sc(46,"\n            "),l.ac(47,"li"),l.ac(48,"strong"),l.Sc(49,"Searching:"),l.Zb(),l.Sc(50," Search through the organization for a particular employee."),l.Zb(),l.Sc(51,"\n            "),l.ac(52,"li"),l.ac(53,"strong"),l.Sc(54,"Employee breakdown:"),l.Zb(),l.Sc(55," See a visual representation of the employee\n                including name, job title and email address."),l.Zb(),l.Sc(56,"\n        "),l.Zb(),l.Sc(57,"\n    "),l.Zb(),l.Sc(58,"\n\n    "),l.ac(59,"uxd-showcase-card",1),l.Sc(60,"\n        "),l.ac(61,"h4"),l.Sc(62,"Sankey Chart Example"),l.Zb(),l.Sc(63,"\n        "),l.ac(64,"p"),l.Sc(65,"A sample application illustrating the use of the sankey chart to show document flows within a system. This provides the following features:"),l.Zb(),l.Sc(66,"\n        "),l.ac(67,"ul"),l.Sc(68,"\n            "),l.ac(69,"li"),l.ac(70,"strong"),l.Sc(71,"Sections:"),l.Zb(),l.Sc(72," View the sections of the system at each stage in the document flow."),l.Zb(),l.Sc(73,"\n            "),l.ac(74,"li"),l.ac(75,"strong"),l.Sc(76,"Flows:"),l.Zb(),l.Sc(77," See a visual representation of the document flow by hovering over a segment or the flow connections between adjacent segments."),l.Zb(),l.Sc(78,"\n        "),l.Zb(),l.Sc(79,"\n    "),l.Zb(),l.Sc(80,"\n\n"),l.Zb()),2&a&&(l.Cb(5),l.tc("link",e.partitionMapUrl)("image",e.partitionMapImage),l.Cb(27),l.tc("link",e.organizationChartUrl)("image",e.organizationChartImage),l.Cb(27),l.tc("link",e.sankeyChartUrl)("image",e.sankeyChartImage))},directives:[u.a,d.a,S.a],encapsulation:2}),a}();t.d(e,"ShowcasePageModule",(function(){return m}));var g=[{path:"",component:h,children:[{path:"overview",component:b},{path:"visualizations",loadChildren:function(){return t.e(71).then(t.bind(null,"QvEi")).then((function(a){return a.VisualizationsModule}))}},{path:"",pathMatch:"full",redirectTo:"overview"},{path:"**",component:b}]}],m=function(){function a(){}return a.\u0275mod=l.Sb({type:a}),a.\u0275inj=l.Rb({factory:function(e){return new(e||a)},imports:[[r.c,s.b,c.o,n.c,c.H,p.a,c.ab,c.sb,i.j,c.Mb,c.Ac,i.u,o.i.forChild(g),c.vd,c.be]]}),a}();("undefined"==typeof ngJitMode||ngJitMode)&&l.Mc(m,{declarations:[h,b],imports:[r.c,s.b,c.o,n.c,c.H,p.a,c.ab,c.sb,i.j,c.Mb,c.Ac,i.u,o.i,c.vd,c.be],exports:[h,b]})},Xuou:function(a,e,t){a.exports=t.p+"docs/app/assets/img/showcase/sankey-chart.jpg"},YA3o:function(a,e,t){a.exports=t.p+"docs/app/assets/img/showcase/partition-map.jpg"},dztR:function(a,e,t){a.exports=t.p+"docs/app/assets/img/showcase/organization-chart.jpg"}}]);