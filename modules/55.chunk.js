(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{"/aJJ":function(n,a,s){"use strict";s.r(a),s.d(a,"ComponentsListModule",(function(){return w}));var t,p=s("ofXK"),o=s("3Pt+"),e=s("tyNb"),c=s("7Q8i"),l=s("XtaT"),u=s("T/2f"),i=s("YZ8U"),r=s("AVdU"),k=s("yHOM"),m=s("fXoL"),d=s("COk8"),f=(t=function(n,a){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(n[s]=a[s])})(n,a)},function(n,a){function s(){this.constructor=n}t(n,a),n.prototype=null===a?Object.create(a):(s.prototype=a.prototype,new s)}),b=function(n,a){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,a)};function v(n,a){if(1&n){var s=m.Wb();m.Vb(0,"button",15),m.cc("click",(function(){m.Bc(s);var n=m.gc().index;return m.gc().remove(n)})),m.Nc(1,"\n                    "),m.Qb(2,"ux-icon",16),m.Nc(3,"\n                "),m.Ub()}}function g(n,a){if(1&n&&(m.Vb(0,"div",11),m.Nc(1,"\n\n            "),m.Vb(2,"div",12),m.Nc(3,"\n                "),m.Qb(4,"input",13),m.Nc(5,"\n\n                "),m.Lc(6,v,4,0,"button",14),m.Nc(7,"\n            "),m.Ub(),m.Nc(8,"\n\n\n        "),m.Ub()),2&n){var s=a.index,t=m.gc();m.Hb("hoverable",t.items.length>1),m.zb(4),m.nc("focusIf",!0)("formControlName",s),m.zb(2),m.nc("ngIf",t.items.controls.length>1)}}var y=[function(n){function a(){var a=n.call(this,s("qWJz"))||this;return a.playground={files:{"app.component.html":a.snippets.raw.appHtml,"app.component.ts":a.snippets.raw.appTs},modules:[{imports:["FocusIfModule"],library:"@ux-aspects/ux-aspects"}]},a.form=new o.h({items:new o.b([new o.e(null,[o.w.required])])}),a}return f(a,n),Object.defineProperty(a.prototype,"items",{get:function(){return this.form.get("items")},enumerable:!1,configurable:!0}),a.prototype.add=function(){this.form.valid&&this.items.push(new o.e(null,[o.w.required]))},a.prototype.remove=function(n){this.items.length>1&&this.items.removeAt(n)},a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=m.Jb({type:a,selectors:[["uxd-component-list"]],features:[m.wb],decls:45,vars:8,consts:[[1,"component-list-container",3,"formGroup"],[1,"component-list"],["class","component-list-component","formArrayName","items",3,"hoverable",4,"ngFor","ngForOf"],["type","button","uxFocusIndicator","",1,"component-actions",3,"tabIndex","click"],[1,"component-add-btn"],["name","add"],[1,"component-add-text"],[3,"minimal"],["heading","HTML"],[3,"content"],["heading","TypeScript"],["formArrayName","items",1,"component-list-component"],[1,"component-content"],["placeholder","Enter text",1,"form-control",3,"focusIf","formControlName"],["class","component-remove","uxFocusIndicator","","aria-label","Remove field",3,"click",4,"ngIf"],["uxFocusIndicator","","aria-label","Remove field",1,"component-remove",3,"click"],["name","close"]],template:function(n,a){1&n&&(m.Vb(0,"form",0),m.Nc(1,"\n\n    "),m.Vb(2,"div",1),m.Nc(3,"\n\n        "),m.Lc(4,g,9,5,"div",2),m.Nc(5,"\n    "),m.Ub(),m.Nc(6,"\n\n    "),m.Vb(7,"button",3),m.cc("click",(function(){return a.add()})),m.Nc(8,"\n        "),m.Vb(9,"span",4),m.Nc(10,"\n            "),m.Qb(11,"ux-icon",5),m.Nc(12,"\n        "),m.Ub(),m.Nc(13,"\n        "),m.Vb(14,"span",6),m.Nc(15,"Add a field"),m.Ub(),m.Nc(16,"\n    "),m.Ub(),m.Nc(17,"\n\n"),m.Ub(),m.Nc(18,"\n\n"),m.Qb(19,"hr"),m.Nc(20,"\n\n"),m.Vb(21,"p"),m.Nc(22,"\n    A component list can be used to dynamically add and remove components.\n    It uses Angular's "),m.Vb(23,"code"),m.Nc(24,"FormGroup"),m.Ub(),m.Nc(25," and "),m.Vb(26,"code"),m.Nc(27,"FormArray"),m.Ub(),m.Nc(28," to store the fields\n    and apply validation rules which can be used to determine whether or not we should be\n    allowed to add additional fields.\n"),m.Ub(),m.Nc(29,"\n\n"),m.Vb(30,"p"),m.Nc(31,"\n    The following code can be used to create the example above:\n"),m.Ub(),m.Nc(32,"\n\n"),m.Vb(33,"ux-tabset",7),m.Nc(34,"\n    "),m.Vb(35,"ux-tab",8),m.Nc(36,"\n        "),m.Qb(37,"uxd-snippet",9),m.Nc(38,"\n    "),m.Ub(),m.Nc(39,"\n    "),m.Vb(40,"ux-tab",10),m.Nc(41,"\n        "),m.Qb(42,"uxd-snippet",9),m.Nc(43,"\n    "),m.Ub(),m.Nc(44,"\n"),m.Ub()),2&n&&(m.nc("formGroup",a.form),m.zb(4),m.nc("ngForOf",a.items.controls),m.zb(3),m.Hb("disabled",a.form.invalid),m.nc("tabIndex",a.form.invalid?-1:0),m.zb(26),m.nc("minimal",!1),m.zb(4),m.nc("content",a.snippets.compiled.appHtml),m.zb(5),m.nc("content",a.snippets.compiled.appTs))},directives:[o.y,o.o,o.i,p.m,c.Ab,c.Nb,c.Md,c.Hd,d.a,o.c,o.a,c.yb,o.n,o.g,p.n],encapsulation:2}),a=function(n,a,s,t){var p,o=arguments.length,e=o<3?a:null===t?t=Object.getOwnPropertyDescriptor(a,s):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(n,a,s,t);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(e=(o<3?p(e):o>3?p(a,s,e):p(a,s))||e);return o>3&&e&&Object.defineProperty(a,s,e),e}([Object(k.a)("ComponentsComponentListComponent"),b("design:paramtypes",[])],a)}(r.a)],h=[{path:"**",component:u.a,data:{category:i.b.resolveCategoryData(i.a.Components,"Component List")}}],w=function(){function n(n,a){a.registerResolver(n,y)}return n.\u0275mod=m.Nb({type:n}),n.\u0275inj=m.Mb({factory:function(a){return new(a||n)(m.Zb(m.j),m.Zb(i.b))},imports:[[c.a,p.c,l.a,c.zb,o.j,c.Ob,o.u,e.i.forChild(h),c.Nd]]}),n}()},Cgyv:function(n,a){n.exports={snippet:'<span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/core\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> FormArray<span class="token punctuation">,</span> FormControl<span class="token punctuation">,</span> FormGroup<span class="token punctuation">,</span> Validators <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@angular/forms\'</span><span class="token punctuation">;</span>\n\n@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    selector<span class="token operator">:</span> <span class="token string">\'app\'</span><span class="token punctuation">,</span>\n    templateUrl<span class="token operator">:</span> <span class="token string">\'./app.component.html\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>\n\n    form <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormGroup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        items<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">FormArray</span><span class="token punctuation">(</span><span class="token punctuation">[</span>\n            <span class="token keyword">new</span> <span class="token class-name">FormControl</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>Validators<span class="token punctuation">.</span>required<span class="token punctuation">]</span><span class="token punctuation">)</span>\n        <span class="token punctuation">]</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">get</span> <span class="token function">items</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> FormArray <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">\'items\'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> FormArray<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>form<span class="token punctuation">.</span>valid<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FormControl</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>Validators<span class="token punctuation">.</span>required<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">remove</span><span class="token punctuation">(</span>index<span class="token operator">:</span> number<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">removeAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>',example:"import { Component } from '@angular/core';\nimport { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';\n\n@Component({\n    selector: 'app',\n    templateUrl: './app.component.html'\n})\nexport class AppComponent {\n\n    form = new FormGroup({\n        items: new FormArray([\n            new FormControl(null, [Validators.required])\n        ])\n    });\n\n    get items(): FormArray {\n        return this.form.get('items') as FormArray;\n    }\n\n    add(): void {\n        if (this.form.valid) {\n            this.items.push(new FormControl(null, [Validators.required]));\n        }\n    }\n\n    remove(index: number): void {\n        if (this.items.length > 1) {\n            this.items.removeAt(index);\n        }\n    }\n}"}},"g/b6":function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-list-container<span class="token punctuation">"</span></span> <span class="token attr-name">[formGroup]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-list-component<span class="token punctuation">"</span></span>\n            <span class="token attr-name">[class.hoverable]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>items.length > 1<span class="token punctuation">"</span></span>\n            <span class="token attr-name">formArrayName</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>items<span class="token punctuation">"</span></span>\n            <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>let item of items.controls; let idx = index<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form-control<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">[focusIf]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">[formControlName]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>idx<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Enter text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-remove<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">uxFocusIndicator</span>\n                    <span class="token attr-name">*ngIf</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>items.controls.length > 1<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">aria-label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Remove field<span class="token punctuation">"</span></span>\n                    <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>remove(idx)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>close<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>button<span class="token punctuation">"</span></span>\n        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-actions<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[tabIndex]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form.invalid ? -1 : 0<span class="token punctuation">"</span></span>\n        <span class="token attr-name">[class.disabled]</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>form.invalid<span class="token punctuation">"</span></span>\n        <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>add()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-add-btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-icon</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>add<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-icon</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>component-add-text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Add a field<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>',example:'<form class="component-list-container" [formGroup]="form">\n\n    <div class="component-list">\n\n        <div class="component-list-component"\n            [class.hoverable]="items.length > 1"\n            formArrayName="items"\n            *ngFor="let item of items.controls; let idx = index">\n\n            <div class="component-content">\n                <input class="form-control"\n                    [focusIf]="true"\n                    [formControlName]="idx"\n                    placeholder="Enter text">\n\n                <button class="component-remove"\n                    uxFocusIndicator\n                    *ngIf="items.controls.length > 1"\n                    aria-label="Remove field"\n                    (click)="remove(idx)">\n                    <ux-icon name="close"></ux-icon>\n                </button>\n            </div>\n\n\n        </div>\n    </div>\n\n    <button type="button"\n        class="component-actions"\n        [tabIndex]="form.invalid ? -1 : 0"\n        [class.disabled]="form.invalid"\n        (click)="add()">\n        <span class="component-add-btn">\n            <ux-icon name="add"></ux-icon>\n        </span>\n        <span class="component-add-text">Add a field</span>\n    </button>\n\n</form>'}},qWJz:function(n,a,s){var t={"./app.html":"g/b6","./app.ts":"Cgyv"};function p(n){var a=o(n);return s(a)}function o(n){if(!s.o(t,n)){var a=new Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}return t[n]}p.keys=function(){return Object.keys(t)},p.resolve=o,n.exports=p,p.id="qWJz"}}]);