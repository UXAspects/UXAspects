import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

@Directive({ selector: '[uxMenuInitialFocus]' })
export class MenuInitialFocusDirective implements OnInit, OnDestroy {
    private readonly _menu = inject(MenuComponent);
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _renderer = inject(Renderer2);

    private _onDestroy = new Subject<void>();

    ngOnInit(): void {
        this.ensureFocusable();

        // Focus the host element when the parent menu is opened.
        this._menu.opened
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._elementRef.nativeElement.focus();
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Apply tabindex="0" to the element if it's not already focusable. */
    private ensureFocusable(): void {
        if (this._elementRef.nativeElement.tabIndex >= 0) {
            return;
        }

        this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
    }
}
