import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({
    selector: '[uxMenuNavigationItem]'
})
export class MenuNavigationItemDirective implements OnDestroy {

    @Output() activated = new EventEmitter();

    private _subscription: Subscription;

    constructor(service: MenuNavigationService, private _elementRef: ElementRef) {
        this._subscription = service.active$.subscribe((next) => {
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