import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ManagedFocusContainerService } from './managed-focus-container.service';

@Directive({
    selector: '[uxManagedFocusContainer]'
})
export class ManagedFocusContainerDirective implements OnInit, OnDestroy {

    constructor(
        private _elementRef: ElementRef,
        private _managedFocusContainerService: ManagedFocusContainerService
    ) { }

    ngOnInit(): void {
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);
    }

    ngOnDestroy(): void {
        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }
}