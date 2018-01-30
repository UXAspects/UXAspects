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
  AfterContentInit,
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
    @Input() link?: string;

    @Input()
    set level(value: number) {
      this._level = value;
    }

    get level(): number {
      return this._level;
    }

    @Output()
    get active() {
      if (this.link) {
          return this._router.isActive(this.link, true);
      } else {
          return this._active;
      }
    }

    private _level: number = 2;
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
        this.level = _parent ? _parent.level + 1 : 2;

        if (this._router) {
          _router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {              
            if (this.link && this._router.isActive(this.link, true)) {
                this.select();
            }

            this.expanded = this.hasActiveLink(this.link);
          });
        }
    }

    ngAfterViewInit() {
      let ol = this._elementRef.nativeElement.querySelector('.nav');
      if (ol) {
        this._renderer.addClass(ol, this.getLevelClass());
      }
    }

    toggle() {
      this.expanded = !this.expanded;

      if (!this.link) {
        this._active = false;
      }
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
      var levelClass: string = '';
      switch (this._level) {
        case 2:
          levelClass = 'nav-second-level';
          break;
        case 3:
          levelClass = 'nav-third-level';
          break;
        case 4:
          levelClass = 'nav-fourth-level';
          break;
        case 5:
          levelClass = 'nav-fifth-level';
          break;
      }
      return levelClass;
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
