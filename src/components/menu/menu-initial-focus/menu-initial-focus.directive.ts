import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Directive({ selector: '[uxMenuInitialFocus]' })
export class MenuInitialFocusDirective implements OnInit {
    constructor(
        private readonly _menu: MenuComponent,
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.ensureFocusable();

        // Focus the host element when the parent menu is opened.
        this._menu.opened.pipe().subscribe(() => {
            this._elementRef.nativeElement.focus();
        });
    }

    /** Apply tabindex="0" to the element if it's not already focusable. */
    private ensureFocusable(): void {
        if (this._elementRef.nativeElement.tabIndex >= 0) {
            return;
        }

        this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
    }
}
