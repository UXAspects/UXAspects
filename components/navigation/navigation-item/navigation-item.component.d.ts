import { AfterContentInit, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
export declare class NavigationItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _parent;
    private _router;
    header: string;
    icon: string;
    expanded: boolean;
    link: string;
    readonly active: boolean;
    level: number;
    indentWithoutArrow: boolean;
    private _navigationEnd;
    private _childrenChanges;
    private _children;
    readonly children: NavigationItemComponent[];
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _parent: NavigationItemComponent, _router: Router);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private hasActiveLink(link);
    private getLevelClass();
    private setIndentWithoutArrow();
}
