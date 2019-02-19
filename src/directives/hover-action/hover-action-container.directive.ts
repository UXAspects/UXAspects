import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ManagedFocusContainer, ManagedFocusContainerService } from '../accessibility';
import { HoverActionService } from './hover-action.service';

@Directive({
    selector: '[uxHoverActionContainer]',
    providers: [HoverActionService]
})
export class HoverActionContainerDirective implements OnInit, OnDestroy {

    @Input()
    @HostBinding('tabindex')
    tabindex: number = 0;

    @HostBinding('class.hover-action-container-active')
    active: boolean = false;

    private _container: ManagedFocusContainer;
    private _onDestroy = new Subject<void>();

    constructor(
        elementRef: ElementRef,
        managedFocusContainerService: ManagedFocusContainerService,
        private _hoverActionService: HoverActionService
    ) {

        // Get the object used to track focus within the container
        this._container = managedFocusContainerService.createContainer(elementRef.nativeElement);

        // Track focus and update state for the child directives
        this._container.hasFocus$.pipe(takeUntil(this._onDestroy)).subscribe(active => {
            this.active = active;
            this._hoverActionService.setFocusState(active);
        });
    }

    ngOnInit(): void {
        // Watch for focus within the container element
        this._container.register();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        if (this._container) {
            this._container.unregister();
        }
    }

    @HostListener('mouseenter') onHover(): void {
        this._hoverActionService.setHoverState(true);
    }

    @HostListener('mouseleave') onLeave(): void {
        this._hoverActionService.setHoverState(false);
    }
}