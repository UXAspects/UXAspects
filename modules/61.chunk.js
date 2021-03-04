(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{LNEw:function(e,t,n){"use strict";n.r(t),n.d(t,"ShowcasePageModule",(function(){return m}));var a=n("ofXK"),i=n("3Pt+"),o=n("tyNb"),c=n("7Q8i"),s=n("KLty"),r=n("u/pq"),h=n("fXoL"),l=function(){function e(){}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Jb({type:e,selectors:[["uxd-showcase"]],decls:1,vars:0,template:function(e,t){1&e&&h.Qb(0,"router-outlet")},directives:[o.j],encapsulation:2}),e}(),p=n("XtaT"),u=n("f/B4"),b=n("kWrZ"),d=n("owxW"),g=function(){function e(){this.organizationChartImage=n("dztR"),this.partitionMapImage=n("YA3o"),this.sankeyChartImage=n("Xuou"),this.organizationChartUrl="#/showcase/visualizations/organization-chart",this.partitionMapUrl="#/showcase/visualizations/partition-map",this.sankeyChartUrl="#/showcase/visualizations/sankey-chart"}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h.Jb({type:e,selectors:[["uxd-showcase-overview"]],decls:81,vars:6,consts:[["header","Showcase","description","Sample applications made using UX Aspects"],[3,"link","image"]],template:function(e,t){1&e&&(h.Vb(0,"uxd-page-header",0),h.Nc(1,"\n"),h.Ub(),h.Nc(2,"\n\n"),h.Vb(3,"uxd-full-page-layout"),h.Nc(4,"\n\n    "),h.Vb(5,"uxd-showcase-card",1),h.Nc(6,"\n        "),h.Vb(7,"h4"),h.Nc(8,"Partition Map Example"),h.Ub(),h.Nc(9,"\n        "),h.Vb(10,"p"),h.Nc(11,"A sample application illustrating the use of the partition map to show the breakdown of a document set by various criteria. This provides the following features:"),h.Ub(),h.Nc(12,"\n        "),h.Vb(13,"ul"),h.Nc(14,"\n            "),h.Vb(15,"li"),h.Vb(16,"strong"),h.Nc(17,"Document breakdown:"),h.Ub(),h.Nc(18," See a visual representation of the document set by custodian, language and file type."),h.Ub(),h.Nc(19,"\n            "),h.Vb(20,"li"),h.Vb(21,"strong"),h.Nc(22,"Clickable Segments:"),h.Ub(),h.Nc(23," Select a segment to zoom in or out of the partition map."),h.Ub(),h.Nc(24,"\n            "),h.Vb(25,"li"),h.Vb(26,"strong"),h.Nc(27,"Editing:"),h.Ub(),h.Nc(28," Edit the data types and their row order in the partition map."),h.Ub(),h.Nc(29,"\n        "),h.Ub(),h.Nc(30,"\n    "),h.Ub(),h.Nc(31,"\n\n    "),h.Vb(32,"uxd-showcase-card",1),h.Nc(33,"\n        "),h.Vb(34,"h4"),h.Nc(35,"Organization Chart Example"),h.Ub(),h.Nc(36,"\n        "),h.Vb(37,"p"),h.Nc(38,"A sample application illustrating the use of the organization chart and hierarchy bar to show\n            a hierarchy of different individuals within an organization. This provides the following\n            features:"),h.Ub(),h.Nc(39,"\n        "),h.Vb(40,"ul"),h.Nc(41,"\n            "),h.Vb(42,"li"),h.Vb(43,"strong"),h.Nc(44,"Clickable Nodes:"),h.Ub(),h.Nc(45," Select employee nodes to navigate down through the\n                hierarchical structure"),h.Ub(),h.Nc(46,"\n            "),h.Vb(47,"li"),h.Vb(48,"strong"),h.Nc(49,"Searching:"),h.Ub(),h.Nc(50," Search through the organization for a particular employee."),h.Ub(),h.Nc(51,"\n            "),h.Vb(52,"li"),h.Vb(53,"strong"),h.Nc(54,"Employee breakdown:"),h.Ub(),h.Nc(55," See a visual representation of the employee\n                including name, job title and email address."),h.Ub(),h.Nc(56,"\n        "),h.Ub(),h.Nc(57,"\n    "),h.Ub(),h.Nc(58,"\n\n    "),h.Vb(59,"uxd-showcase-card",1),h.Nc(60,"\n        "),h.Vb(61,"h4"),h.Nc(62,"Sankey Chart Example"),h.Ub(),h.Nc(63,"\n        "),h.Vb(64,"p"),h.Nc(65,"A sample application illustrating the use of the sankey chart to show document flows within a system. This provides the following features:"),h.Ub(),h.Nc(66,"\n        "),h.Vb(67,"ul"),h.Nc(68,"\n            "),h.Vb(69,"li"),h.Vb(70,"strong"),h.Nc(71,"Sections:"),h.Ub(),h.Nc(72," View the sections of the system at each stage in the document flow."),h.Ub(),h.Nc(73,"\n            "),h.Vb(74,"li"),h.Vb(75,"strong"),h.Nc(76,"Flows:"),h.Ub(),h.Nc(77," See a visual representation of the document flow by hovering over a segment or the flow connections between adjacent segments."),h.Ub(),h.Nc(78,"\n        "),h.Ub(),h.Nc(79,"\n    "),h.Ub(),h.Nc(80,"\n\n"),h.Ub()),2&e&&(h.zb(5),h.nc("link",t.partitionMapUrl)("image",t.partitionMapImage),h.zb(27),h.nc("link",t.organizationChartUrl)("image",t.organizationChartImage),h.zb(27),h.nc("link",t.sankeyChartUrl)("image",t.sankeyChartImage))},directives:[u.a,b.a,d.a],encapsulation:2}),e}(),N=[{path:"",component:l,children:[{path:"overview",component:g},{path:"visualizations",loadChildren:function(){return n.e(71).then(n.bind(null,"QvEi")).then((function(e){return e.VisualizationsModule}))}},{path:"",pathMatch:"full",redirectTo:"overview"},{path:"**",component:g}]}],m=function(){function e(){}return e.\u0275mod=h.Nb({type:e}),e.\u0275inj=h.Mb({factory:function(t){return new(t||e)},imports:[[r.c,s.b,c.q,a.c,c.J,p.a,c.cb,c.ub,i.j,c.Ob,c.Cc,i.u,o.i.forChild(N),c.xd,c.de]]}),e}()},Xuou:function(e,t,n){e.exports=n.p+"docs/app/assets/img/showcase/sankey-chart.jpg"},YA3o:function(e,t,n){e.exports=n.p+"docs/app/assets/img/showcase/partition-map.jpg"},dztR:function(e,t,n){e.exports=n.p+"docs/app/assets/img/showcase/organization-chart.jpg"}}]);