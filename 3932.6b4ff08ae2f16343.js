(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3932],{29003:u=>{u.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col-md-10<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn button-primary<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addEvent()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Add New Event<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-timeline</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-timeline-event</span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let event of events<span class="token punctuation">"</span></span> <span class="token attr-name">[badgeColor]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>event.color<span class="token punctuation">"</span></span>\n                <span class="token attr-name">[badgeTitle]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>event.date | date:<span class="token punctuation">\'</span>EEE LLL d<span class="token punctuation">\'</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>m-b-sm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>document-time<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>m-r-xs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>{{event.date | date:\'EEEE, MMMM d, y, h:mm:ss a\'}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>m-b-nil<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ticket\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">[href]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>event.url<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{event.id}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n                    was {{event.action}} by {{event.assignee}}.\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-timeline-event</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-timeline</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n',example:'<div class="row">\n    <div class="col-md-10">\n        <button class="btn button-primary" (click)="addEvent()">Add New Event</button>\n        <ux-timeline>\n            <ux-timeline-event *ngFor="let event of events" [badgeColor]="event.color"\n                [badgeTitle]="event.date | date:\'EEE LLL d\'">\n\n                <div class="m-b-sm">\n                    <span>\n                        <ux-icon name="document-time" class="m-r-xs"></ux-icon>\n                        <span>{{event.date | date:\'EEEE, MMMM d, y, h:mm:ss a\'}}</span>\n                    </span>\n                </div>\n                <p class="m-b-nil">Ticket\n                    <a [href]="event.url">{{event.id}}</a>\n                    was {{event.action}} by {{event.assignee}}.\n                </p>\n\n            </ux-timeline-event>\n        </ux-timeline>\n    </div>\n</div>\n'}},87424:u=>{u.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">\'chance\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">private</span> _now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> _dayInMilliSeconds <span class="token operator">=</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span>\n    <span class="token keyword">private</span> _daysAfterFirstEvent <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>\n    \n    events<span class="token operator">:</span> TimelineEvent<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n        color<span class="token operator">:</span> <span class="token string">\'accent\'</span><span class="token punctuation">,</span>\n        date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_now <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dayInMilliSeconds <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        url<span class="token operator">:</span> <span class="token string">\'#\'</span><span class="token punctuation">,</span>\n        id<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">9999</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        action<span class="token operator">:</span> <span class="token string">\'tested\'</span><span class="token punctuation">,</span>\n        assignee<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        color<span class="token operator">:</span> <span class="token string">\'alternate2\'</span><span class="token punctuation">,</span>\n        date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_now <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dayInMilliSeconds <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        url<span class="token operator">:</span> <span class="token string">\'#\'</span><span class="token punctuation">,</span>\n        id<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">9999</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        action<span class="token operator">:</span> <span class="token string">\'reviewed\'</span><span class="token punctuation">,</span>\n        assignee<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        color<span class="token operator">:</span> <span class="token string">\'grey4\'</span><span class="token punctuation">,</span>\n        date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_now <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dayInMilliSeconds <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        url<span class="token operator">:</span> <span class="token string">\'#\'</span><span class="token punctuation">,</span>\n        id<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">9999</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        action<span class="token operator">:</span> <span class="token string">\'developed\'</span><span class="token punctuation">,</span>\n        assignee<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        color<span class="token operator">:</span> <span class="token string">\'primary\'</span><span class="token punctuation">,</span>\n        date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_now<span class="token punctuation">)</span><span class="token punctuation">,</span>\n        url<span class="token operator">:</span> <span class="token string">\'#\'</span><span class="token punctuation">,</span>\n        id<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">9999</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        action<span class="token operator">:</span> <span class="token string">\'recorded\'</span><span class="token punctuation">,</span>\n        assignee<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n    <span class="token function">addEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>_daysAfterFirstEvent<span class="token operator">++</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>events<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            color<span class="token operator">:</span> <span class="token string">\'grey4\'</span><span class="token punctuation">,</span>\n            date<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_now <span class="token operator">+</span>\n                <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dayInMilliSeconds <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_daysAfterFirstEvent<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            url<span class="token operator">:</span> <span class="token string">\'#\'</span><span class="token punctuation">,</span>\n            id<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min<span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">,</span> max<span class="token operator">:</span> <span class="token number">9999</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            action<span class="token operator">:</span> <span class="token string">\'updated\'</span><span class="token punctuation">,</span>\n            assignee<span class="token operator">:</span> chance<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">interface</span> <span class="token class-name">TimelineEvent</span> <span class="token punctuation">{</span>\n    color<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    date<span class="token operator">:</span> Date<span class="token punctuation">;</span>\n    url<span class="token operator">:</span> string<span class="token punctuation">;</span>\n    id<span class="token operator">:</span> number<span class="token punctuation">;</span>\n    action<span class="token operator">:</span> <span class="token string">\'recorded\'</span> <span class="token operator">|</span> <span class="token string">\'developed\'</span> <span class="token operator">|</span> <span class="token string">\'updated\'</span> <span class="token operator">|</span> <span class="token string">\'reviewed\'</span> <span class="token operator">|</span> <span class="token string">\'tested\'</span> <span class="token operator">|</span> <span class="token string">\'closed\'</span><span class="token punctuation">;</span>\n    assignee<span class="token operator">:</span> string<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n',example:"import { Component } from '@angular/core';\nimport 'chance';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent {\n\n    private _now = Date.now();\n    private _dayInMilliSeconds = 24 * 60 * 60 * 1000;\n    private _daysAfterFirstEvent = 3;\n    \n    events: TimelineEvent[] = [{\n        color: 'accent',\n        date: new Date(this._now + (this._dayInMilliSeconds * 3)),\n        url: '#',\n        id: chance.integer({min: 1000, max: 9999}),\n        action: 'tested',\n        assignee: chance.name()\n    }, {\n        color: 'alternate2',\n        date: new Date(this._now + (this._dayInMilliSeconds * 2)),\n        url: '#',\n        id: chance.integer({min: 1000, max: 9999}),\n        action: 'reviewed',\n        assignee: chance.name()\n    }, {\n        color: 'grey4',\n        date: new Date(this._now + (this._dayInMilliSeconds * 1)),\n        url: '#',\n        id: chance.integer({min: 1000, max: 9999}),\n        action: 'developed',\n        assignee: chance.name()\n    }, {\n        color: 'primary',\n        date: new Date(this._now),\n        url: '#',\n        id: chance.integer({min: 1000, max: 9999}),\n        action: 'recorded',\n        assignee: chance.name()\n    }];\n\n    addEvent(): void {\n        this._daysAfterFirstEvent++;\n        this.events.unshift({\n            color: 'grey4',\n            date: new Date(this._now +\n                (this._dayInMilliSeconds * this._daysAfterFirstEvent)),\n            url: '#',\n            id: chance.integer({min: 1000, max: 9999}),\n            action: 'updated',\n            assignee: chance.name()\n        });\n    }\n}\n\ninterface TimelineEvent {\n    color: string;\n    date: Date;\n    url: string;\n    id: number;\n    action: 'recorded' | 'developed' | 'updated' | 'reviewed' | 'tested' | 'closed';\n    assignee: string;\n}\n"}},84314:(u,d,s)=>{var e={"./app.html":29003,"./app.ts":87424,"docs/app/pages/components/components-sections/timeline/timeline/snippets/app.html":29003,"docs/app/pages/components/components-sections/timeline/timeline/snippets/app.ts":87424};function c(o){var k=r(o);return s(k)}function r(o){if(!s.o(e,o)){var k=new Error("Cannot find module '"+o+"'");throw k.code="MODULE_NOT_FOUND",k}return e[o]}c.keys=function(){return Object.keys(e)},c.resolve=r,u.exports=c,c.id=84314},43932:(u,d,s)=>{"use strict";s.r(d),s.d(d,{ComponentsTimelineModule:()=>q});var e=s(86019),c=s(36593),r=s(86132),o=s(4757),k=s(1610),m=s(56618),g=s(27920),v=(s(94559),s(63756)),h=s(58785),n=s(9619),y=s(48574),f=s(77441),T=s(27757),w=s(90745),x=s(50302),b=s(66091),Z=s(37772);const E=["*"];let C=0,A=(()=>{class t{constructor(){this.id="ux-timeline-event-"+C++}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["ux-timeline-event"]],inputs:{id:"id",badgeColor:"badgeColor",badgeTitle:"badgeTitle"},ngContentSelectors:E,decls:5,vars:4,consts:[[1,"timeline-badge",3,"ngClass"],[1,"timeline-panel",3,"id"]],template:function(a,i){1&a&&(n.F$t(),n.TgZ(0,"div",0),n.TgZ(1,"span"),n._uU(2),n.qZA(),n.qZA(),n.TgZ(3,"div",1),n.Hsn(4),n.qZA()),2&a&&(n.Q6J("ngClass",i.badgeColor),n.uIk("aria-describedby",i.id),n.xp6(2),n.Oqu(i.badgeTitle),n.xp6(1),n.Q6J("id",i.id))},directives:[e.mk],encapsulation:2,changeDetection:0}),t})();var M=s(72006);function U(t,p){if(1&t&&(n.TgZ(0,"ux-timeline-event",12),n.ALo(1,"date"),n.TgZ(2,"div",13),n.TgZ(3,"span"),n._UZ(4,"ux-icon",14),n.TgZ(5,"span"),n._uU(6),n.ALo(7,"date"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(8,"p",15),n._uU(9,"Ticket "),n.TgZ(10,"a",16),n._uU(11),n.qZA(),n._uU(12),n.qZA(),n.qZA()),2&t){const a=p.$implicit;n.Q6J("badgeColor",a.color)("badgeTitle",n.xi3(1,7,a.date,"EEE LLL d")),n.xp6(6),n.Oqu(n.xi3(7,10,a.date,"EEEE, MMMM d, y, h:mm:ss a")),n.xp6(4),n.Q6J("href",a.url,n.LSH),n.xp6(1),n.Oqu(a.id),n.xp6(1),n.AsE(" was ",a.action," by ",a.assignee,". ")}}let l=class extends v.u{constructor(){super(s(84314)),this._now=Date.now(),this._dayInMilliSeconds=864e5,this._daysAfterFirstEvent=3,this.events=[{color:"accent",date:new Date(this._now+3*this._dayInMilliSeconds),url:"#",id:chance.integer({min:1e3,max:9999}),action:"tested",assignee:chance.name()},{color:"alternate2",date:new Date(this._now+2*this._dayInMilliSeconds),url:"#",id:chance.integer({min:1e3,max:9999}),action:"reviewed",assignee:chance.name()},{color:"grey4",date:new Date(this._now+1*this._dayInMilliSeconds),url:"#",id:chance.integer({min:1e3,max:9999}),action:"developed",assignee:chance.name()},{color:"primary",date:new Date(this._now),url:"#",id:chance.integer({min:1e3,max:9999}),action:"recorded",assignee:chance.name()}],this.playground={files:{"app.component.html":this.snippets.raw.appHtml,"app.component.ts":this.snippets.raw.appTs},modules:[{imports:["TimelineModule"],library:"@ux-aspects/ux-aspects"}]}}addEvent(){this._daysAfterFirstEvent++,this.events.unshift({color:"grey4",date:new Date(this._now+this._dayInMilliSeconds*this._daysAfterFirstEvent),url:"#",id:chance.integer({min:1e3,max:9999}),action:"updated",assignee:chance.name()})}};l.\u0275fac=function(p){return new(p||l)},l.\u0275cmp=n.Xpm({type:l,selectors:[["uxd-components-timeline"]],features:[n.qOj],decls:40,vars:4,consts:[[1,"row"],[1,"col-md-10"],[1,"btn","button-primary",3,"click"],[3,"badgeColor","badgeTitle",4,"ngFor","ngForOf"],["tableTitle","Inputs"],["uxd-api-property","","name","badgeColor","type","string"],["routerLink","/css/color-palette","fragment","color-palette"],["uxd-api-property","","name","badgeTitle","required","true","type","string"],[3,"minimal"],["heading","HTML"],[3,"content"],["heading","TypeScript"],[3,"badgeColor","badgeTitle"],[1,"m-b-sm"],["name","document-time",1,"m-r-xs"],[1,"m-b-nil"],[3,"href"]],template:function(p,a){1&p&&(n.TgZ(0,"div",0),n.TgZ(1,"div",1),n.TgZ(2,"button",2),n.NdJ("click",function(){return a.addEvent()}),n._uU(3,"Add New Event"),n.qZA(),n.TgZ(4,"ux-timeline"),n.YNc(5,U,13,13,"ux-timeline-event",3),n.qZA(),n.qZA(),n.qZA(),n._UZ(6,"hr"),n.TgZ(7,"p"),n._uU(8,"The "),n.TgZ(9,"code"),n._uU(10,"ux-timeline"),n.qZA(),n._uU(11," component is a responsive, data-driven vertical component to tell a story, show history or describe a sequence of events. Events are created with the "),n.TgZ(12,"code"),n._uU(13,"ux-timeline-event"),n.qZA(),n._uU(14," component, which includes a customizable badge and informational panel."),n.qZA(),n.TgZ(15,"p"),n._uU(16,"The main content of the event will be displayed in the informational panel and should be specified inside the "),n.TgZ(17,"code"),n._uU(18,"ux-timeline-event"),n.qZA(),n._uU(19," element."),n.qZA(),n.TgZ(20,"p"),n._uU(21,"The following attributes can be used to configure the "),n.TgZ(22,"code"),n._uU(23,"ux-timeline-event"),n.qZA(),n._uU(24," component:"),n.qZA(),n.TgZ(25,"uxd-api-properties",4),n.TgZ(26,"tr",5),n._uU(27," The color of the badge from the "),n.TgZ(28,"a",6),n._uU(29,"Color Palette"),n.qZA(),n._uU(30,". "),n.qZA(),n.TgZ(31,"tr",7),n._uU(32," A short piece of text to show in the badge; typically the short-form date of the event. "),n.qZA(),n.qZA(),n.TgZ(33,"p"),n._uU(34,"The following code can be used to create the example above:"),n.qZA(),n.TgZ(35,"ux-tabset",8),n.TgZ(36,"ux-tab",9),n._UZ(37,"uxd-snippet",10),n.qZA(),n.TgZ(38,"ux-tab",11),n._UZ(39,"uxd-snippet",10),n.qZA(),n.qZA()),2&p&&(n.xp6(5),n.Q6J("ngForOf",a.events),n.xp6(30),n.Q6J("minimal",!1),n.xp6(2),n.Q6J("content",a.snippets.compiled.appHtml),n.xp6(2),n.Q6J("content",a.snippets.compiled.appTs))},directives:[y.G,f.z,e.sg,T.$,w.S,c.yS,x.A,b.i,Z.j,A,M.o],pipes:[e.uU],encapsulation:2}),l=(0,g.gn)([(0,h.cG)("ComponentsTimelineComponent")],l);const D=[l],S=[{path:"**",component:k.R,data:{category:m.N.resolveCategoryData(m.I.Components,"Timeline")}}];let q=(()=>{class t{constructor(a,i){i.registerResolver(a,D)}}return t.\u0275fac=function(a){return new(a||t)(n.LFG(n._Vd),n.LFG(m.N))},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[e.ez,o.N,r.QX1,c.Bz.forChild(S),r.f_l,r.kVJ]]}),t})()}}]);