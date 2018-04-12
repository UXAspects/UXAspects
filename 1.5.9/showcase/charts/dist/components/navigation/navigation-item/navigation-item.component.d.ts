import { ActivatedRoute, Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
export declare class NavigationItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _parent;
    private _router;
    private _activatedRoute;
    header: string;
    icon: string;
    link: string;
    expanded: boolean;
    readonly active: boolean;
    level: number;
    indentWithoutArrow: boolean;
    private _navigationEnd;
    private _childrenChanges;
    private _children;
    readonly children: NavigationItemComponent[];
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _parent: NavigationItemComponent, _router: Router, _activatedRoute: ActivatedRoute);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private hasActiveLink(link);
    private getLevelClass();
    private setIndentWithoutArrow();
}
