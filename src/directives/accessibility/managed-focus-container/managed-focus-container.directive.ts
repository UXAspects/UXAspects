import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ManagedFocusContainerService } from './managed-focus-container.service';

@Directive({
    selector: '[uxManagedFocusContainer]',
    standalone: false
})
export class ManagedFocusContainerDirective implements OnInit, OnDestroy {
    private readonly _elementRef = inject(ElementRef);

    private readonly _managedFocusContainerService = inject(ManagedFocusContainerService);

    ngOnInit(): void {
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);
    }

    ngOnDestroy(): void {
        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }
}