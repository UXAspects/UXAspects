import {
    Component,
    Input,
    ContentChildren,
    QueryList,
    Renderer2,
    ElementRef,
    Optional,
    SkipSelf,
    Output,
    AfterViewInit,
    AfterContentInit,
    OnDestroy
} from '@angular/core';
import { Router, NavigationEnd, UrlTree } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: '[ux-navigation-item]',
    templateUrl: './navigation-item.component.html',
    host: {
        '[class.active]': 'active',
        '[class.selected]': 'expanded',
    }
})
export class NavigationItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    @Input() header: string;
    @Input() icon: string;
    @Input() expanded: boolean = false;
    @Input() link: string;

    get active() {
        if (this.link) {
            return this._router.isActive(this.link, true);
        }
    }

    level: number = 1;
    indentWithoutArrow: boolean = true;

    private _navigationEnd: Subscription;
    private _childrenChanges: Subscription;

    @ContentChildren(NavigationItemComponent, { descendants: true })
    private _children: QueryList<NavigationItemComponent>;

    get children(): NavigationItemComponent[] {
        return this._children.filter(item => item !== this);
    }    

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        @Optional()
        @SkipSelf()
        private _parent: NavigationItemComponent,
        @Optional() private _router: Router
    ) {
        this.level = _parent ? _parent.level + 1 : 1;

        this._navigationEnd = _router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {              
            if (this.link && this._router.isActive(this.link, true)) {
                this.select();
            }

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
        this._childrenChanges = this._children.changes.subscribe(() => this.setIndentWithoutArrow());
    }

    ngOnDestroy () {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    }

    select(): void {
        this.expanded = true;

        // Expand ancestors
        let item = this._parent;
        while (item) {
            item.expanded = true;
            item = item._parent;
        }
    }

    private hasActiveLink(link: string | UrlTree): boolean {
        if (link) {
            return this._router.isActive(link, true) || (this._parent && this._parent.hasActiveLink(link));
        }

        return false;
    }

    private getLevelClass(): string {
        switch (this.level) {
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
