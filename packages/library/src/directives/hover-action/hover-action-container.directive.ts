import { Component, ContentChildren, QueryList, HostListener, ElementRef, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { HoverActionDirective } from './hover-action.directive';
import { HoverActionService } from './hover-action.service';
import { Subscription } from 'rxjs/Subscription';

// Behind the scenes this is a component simply to provide the stylesheet
@Component({
    selector: '[uxHoverActionContainer]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./hover-action.directive.less'],
    encapsulation: ViewEncapsulation.None,
    providers: [HoverActionService],
    host: {
        '[class.hover-action-container-active]': 'active',
        '[tabindex]': 'tabindex'
    }
})
export class HoverActionContainerDirective implements OnDestroy {

    @Input() tabindex: number = 0;
    active: boolean = false;

    private active$: Subscription;

    constructor(private _elementRef: ElementRef, private _hoverActionService: HoverActionService) {
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }

    ngOnDestroy(): void {
        this.active$.unsubscribe();
    }

    @HostListener('click') focus(): void {
        this._elementRef.nativeElement.focus();
    }

    @HostListener('focus') onFocus(): void {
        this._hoverActionService.setFocusState(true);
    }

    @HostListener('blur') onBlur(): void {
        this._hoverActionService.setFocusState(false);
    }

    @HostListener('mouseenter') onHover(): void {
        this._hoverActionService.setHoverState(true);
    }

    @HostListener('mouseleave') onLeave(): void {
        this._hoverActionService.setHoverState(false);
    }

    @HostListener('keydown.arrowright') next(): void {
        this._hoverActionService.next();
    }
}