import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ManagedFocusContainer, ManagedFocusContainerService } from './managed-focus-container.service';

@Directive({
    selector: '[uxManagedFocusContainer]'
})
export class ManagedFocusContainerDirective implements OnInit, OnDestroy {

    private _container: ManagedFocusContainer;

    constructor(
        elementRef: ElementRef,
        managedFocusContainerService: ManagedFocusContainerService
    ) {
        this._container = managedFocusContainerService.createContainer(elementRef.nativeElement);
    }

    ngOnInit(): void {
        this._container.register();
    }

    ngOnDestroy(): void {
        if (this._container) {
            this._container.unregister();
        }
    }
}