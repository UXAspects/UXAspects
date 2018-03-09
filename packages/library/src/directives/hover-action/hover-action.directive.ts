import { Directive, ElementRef, HostListener, OnDestroy, Input } from '@angular/core';
import { HoverActionService } from './hover-action.service';
import { Subscription } from 'rxjs/Subscription';

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

    constructor(private _elementRef: ElementRef, private _hoverActionService: HoverActionService) {

        // register the action
        this._hoverActionService.register(this);

        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }

    ngOnDestroy(): void {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
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