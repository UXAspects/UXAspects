import { Component, Input, ViewEncapsulation, ContentChildren, QueryList, Renderer2, ElementRef, Optional, SkipSelf } from '@angular/core';
import { SideNavigationService } from './side-navigation.service';

@Component({
  selector: 'ux-side-navigation-item',
  templateUrl: './side-navigation-item.component.html',
  host: {
    '[class.active]': 'active',
    '[class.no-children]': 'children.length === 1'
  },
  encapsulation: ViewEncapsulation.None
})
export class SideNavigationItemComponent {

  @Input() header: string;
  @Input() icon: string;
  @Input() expanded: boolean = false;

  @Input()
  set level(value: number) {
    this._level = value;
    this.setLevels();
  }

  get level(): number {
    return this._level;
  }

  set active(value: boolean) {

    if (value) {

      // select ancestors
      if (this._parent) {
        this._parent.active = true;
      }
    }

    this._active = value;
  }

  get active() {
    return this._active;
  }

  private _level: number = 1;
  private _active: boolean = false;

  @ContentChildren(SideNavigationItemComponent) children: QueryList<SideNavigationItemComponent>;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2,
              @Optional() @SkipSelf() private _parent: SideNavigationItemComponent,
              private _sideNavigationService: SideNavigationService) {
    this.level = _parent ? _parent.level + 1 : 1;

    _sideNavigationService.deselect.subscribe(() => this.active = false);
  }

  select(): void {
    
    this.deselectAll();

    if (this.children.length === 1) {
      this.active = true;
    }
    this.expanded = !this.expanded;
  }

  deselectAll(): void {
    this._sideNavigationService.deselect.next();
  }

  private setLevels(): void {

    switch (this._level) {
      case 4:
        this._renderer.addClass(this._elementRef.nativeElement, 'fourth-level');
        break;

      case 5:
        this._renderer.addClass(this._elementRef.nativeElement, 'fifth-level');
        break;
    }
  }

}
