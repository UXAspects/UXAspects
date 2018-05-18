import { Directive, ElementRef, EventEmitter, HostListener, Output, OnDestroy } from '@angular/core';
import { MenuNavigationService } from './menu-navigation.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[uxMenuNavigationItem]'
})
export class MenuNavigationItemDirective implements OnDestroy {

    @Output()
    activated = new EventEmitter();

    private _subscription: Subscription;

    constructor(
        private _service: MenuNavigationService,
        private _elementRef: ElementRef
    ) {
        this._subscription = _service.active$.subscribe((next) => {
            if (next === this) {
                this.setActive();
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    setActive(): void {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    }
}