import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, OnDestroy, Optional, QueryList, Renderer2, SkipSelf } from '@angular/core';
import { NavigationEnd, Router, UrlTree } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: '[ux-navigation-item]',
    templateUrl: './navigation-item.component.html',
    host: {
        '[class.active]': 'active',
        '[class.selected]': 'expanded',
    }
})
export class NavigationItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {

    /** The text to display in the navigation menu item. */
    @Input() header: string;

    /** The name of an icon from the UX Aspects icon set, to be displayed to the left of the title. */
    @Input() icon: string;

    /** Whether the navigation item is expanded, displaying the items from the `children` array. */
    @Input() expanded: boolean = false;

    /** The link that will be navigated to if this item is selected */
    @Input() link: string;

    /** Get the active state of this item from the router */
    get active(): boolean {
        return this.link ? this._router.isActive(this.link, true) : false;
    }

    /** Indicate the depth of the item */
    _level: number = this._parent ? this._parent._level + 1 : 1;

    /** Indicate whether the indentation should include the arrow */
    _indentWithoutArrow: boolean = true;

    @ContentChildren(NavigationItemComponent, { descendants: true })
    private _children: QueryList<NavigationItemComponent>;

    get children(): NavigationItemComponent[] {
        return this._children.filter(item => item !== this);
    }

    /** Automatically unsubscribe when the component is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _router: Router,
        @Optional() @SkipSelf() private _parent: NavigationItemComponent
    ) {

        // Expand this component if it or a descendant is active.
        _router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._onDestroy)).subscribe(() => {
            this.expanded = this.hasActiveLink(this.link);
        });
    }

    ngAfterViewInit(): void {
        // Add classes to parent for styling
        const parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            let levelClass: string = this.getLevelClass();
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

    /** Check if this item or any children are active */
    private hasActiveLink(link: string | UrlTree): boolean {
        // If this component has a link, check if it is active.
        if (link && this._router.isActive(link, true)) {
            return true;
        }

        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some(item => item.hasActiveLink(item.link));
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
            this._indentWithoutArrow = false;
        } else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this._indentWithoutArrow = !this._parent.children.every((item) => item.children.length === 0);
        } else {
            // Top-level elements should be indented
            this._indentWithoutArrow = true;
        }
    }
}
