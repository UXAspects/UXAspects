import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnDestroy, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: '[ux-navigation-item]',
    templateUrl: './navigation-item.component.html',
})
export class NavigationItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {

    @Input()
    header: string;

    @Input()
    icon: string;

    @Input()
    set link(value: string | string[]) {
        this.routerLink = value;
    }

    @Input()
    set routerLink(value: string | string[]) {
        // Normalize routerLink
        this.routerLinkNormalized = Array.isArray(value) ? value : [value];
    }

    @Input()
    routerExtras: NavigationExtras;

    @Input()
    @HostBinding('class.selected')
    expanded: boolean = false;

    @HostBinding('class.active')
    active: boolean = false;

    get children(): NavigationItemComponent[] {
        return this._children.filter(item => item !== this);
    }

    routerLinkNormalized: string[] = null;
    indentWithoutArrow: boolean = true;

    private _level: number = 1;
    private _onDestroy = new Subject<void>();

    @ContentChildren(NavigationItemComponent, { descendants: true })
    private _children: QueryList<NavigationItemComponent>;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        @Optional() @SkipSelf() private _parent: NavigationItemComponent,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {
        this._level = _parent ? _parent._level + 1 : 1;

        _router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._onDestroy))
            .subscribe(() => {
                this.active = this.isActiveLink();
                this.expanded = this.active || this.children.some((child) => child.hasActiveLink());
            });
    }

    ngAfterViewInit(): void {
        // Add classes to parent for styling
        const parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            const levelClass: string = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    }

    ngAfterContentInit(): void {
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();

        // Update 'indentWithoutArrow' in response to changes to children
        this._children.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.setIndentWithoutArrow());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    linkClick(): void {
        if (!this.routerLinkNormalized) {
            this.expanded = !this.expanded;
        }
    }

    private isActiveLink(): boolean {

        if (!this.routerLinkNormalized) {
            return false;
        }

        const tree = this._router.createUrlTree(this.routerLinkNormalized, {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });

        return this._router.isActive(tree, true);
    }

    private hasActiveLink(): boolean {

        if (this.isActiveLink()) {
            return true;
        }

        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some((item) => item.hasActiveLink());
    }

    private getLevelClass(): string {
        switch (this._level) {
            case 2:
                return 'nav-second-level';
            case 3:
                return 'nav-third-level';
            case 4:
                return 'nav-fourth-level';
            case 5:
                return 'nav-fifth-level';
        }

        return '';
    }

    private setIndentWithoutArrow(): void {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        } else if (this._parent) {
           // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every((item) => item.children.length === 0);
        } else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    }
}
