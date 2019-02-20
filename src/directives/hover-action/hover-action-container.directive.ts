import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ManagedFocusContainerService } from '../accessibility/managed-focus-container/managed-focus-container.service';
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

    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _managedFocusContainerService: ManagedFocusContainerService,
        private _hoverActionService: HoverActionService
    ) { }

    ngOnInit(): void {

        // Watch for focus within the container element and manage tabindex of descendants
        this._managedFocusContainerService.register(this._elementRef.nativeElement, this);

        // Track focus and update state for the child directives
        this._managedFocusContainerService.hasFocus(this._elementRef.nativeElement)
            .pipe(takeUntil(this._onDestroy)).subscribe(active => {
                this.active = active;
                this._hoverActionService.setFocusState(active);
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        this._managedFocusContainerService.unregister(this._elementRef.nativeElement, this);
    }

    @HostListener('mouseenter') onHover(): void {
        this._hoverActionService.setHoverState(true);
    }

    @HostListener('mouseleave') onLeave(): void {
        this._hoverActionService.setHoverState(false);
    }
}