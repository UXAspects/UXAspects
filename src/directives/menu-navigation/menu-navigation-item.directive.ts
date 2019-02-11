import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { MenuNavigationService } from './menu-navigation.service';

@Directive({
    selector: '[uxMenuNavigationItem]'
})
export class MenuNavigationItemDirective implements OnDestroy {

    @Output() activated = new EventEmitter<void>();

    private _subscription: Subscription;
    private _focusIndicator: FocusIndicator;

    constructor(service: MenuNavigationService, private _elementRef: ElementRef, focusIndicatorService: FocusIndicatorService) {

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement, { programmaticFocusIndicator: true, checkChildren: false });

        this._subscription = service.active$.pipe(filter(item => item === this))
            .subscribe(() => this.setActive());
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._focusIndicator.destroy();
    }

    setActive(): void {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    }
}