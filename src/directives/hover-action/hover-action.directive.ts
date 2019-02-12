import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { HoverActionService } from './hover-action.service';

@Directive({
    selector: '[uxHoverAction]',
    host: {
        '[class.hover-action-active]': 'active',
        '[class.hover-action-focused]': 'focused',
        '[tabindex]': 'tabindex'
    }
})
export class HoverActionDirective implements OnDestroy {

    @Input() tabindex: number = 1;
    active: boolean = false;
    focused: boolean = false;

    private active$: Subscription;
    private _focusIndicator: FocusIndicator;

    constructor(private _elementRef: ElementRef, private _hoverActionService: HoverActionService, focusIndicatorService: FocusIndicatorService) {

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);

        // register the action
        this._hoverActionService.register(this);

        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }

    ngOnDestroy(): void {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
        this._focusIndicator.destroy();
    }

    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    @HostListener('focus') onFocus(): void {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    }

    @HostListener('blur') onBlur(): void {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    }

    @HostListener('keydown.arrowleft', ['$event']) previous(event: MouseEvent): void {
        event.stopPropagation();
        this._hoverActionService.previous();
    }

    @HostListener('keydown.arrowright', ['$event']) next(event: MouseEvent): void {
        event.stopPropagation();
        this._hoverActionService.next();
    }
}