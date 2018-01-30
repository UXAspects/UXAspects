import {
    Component,
    Input,
    ViewEncapsulation,
    ContentChildren,
    QueryList,
    Renderer2,
    ElementRef,
    Optional,
    SkipSelf,
    ContentChild,
    Output,
    AfterViewInit,
  HostListener
} from '@angular/core';
import { Router, RouterLinkActive, NavigationEnd, RouterState, ActivatedRoute, UrlTree } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: '[ux-navigation-item]',
    templateUrl: './navigation-item.component.html',
    host: {
        '[class.active]': 'active',
        '[class.selected]': 'expanded',
    },
    encapsulation: ViewEncapsulation.None
})
export class NavigationItemComponent implements AfterViewInit {
    @Input() header: string;
    @Input() icon: string;
    @Input() expanded: boolean = false;
    @Input() link: string;

    @Output()
    get level(): number {
        return this._level;
    }

    @Output()
    get active() {
        if (this.link) {
            return this._router.isActive(this.link, true);
        }
    }

    private _level: number = 1;
    private _active: boolean = false;

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
        this._level = _parent ? _parent.level + 1 : 1;

        _router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {              
            if (this.link && this._router.isActive(this.link, true)) {
                this.select();
            }

            this.expanded = this.hasActiveLink(this.link);
        });
    }

    ngAfterViewInit(): void {
        // Add class to parent for styling
        const parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            let levelClass: string = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    }

    toggle(): void {
        this.expanded = !this.expanded;
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

    indentWithoutArrow(): boolean {
        // If this element has children it will be indented and will have an arrow
        if (this.children.length > 0) {
            return false;
        }

        // If this element has a parent, indent it if any of its siblings have children
        if (this._parent) {
            return !this._parent.children.every((item) => item.children.length === 0);
        }

        // Top-level elements should be indented
        return true;
    }
}
