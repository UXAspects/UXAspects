import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FocusIndicator, FocusIndicatorService } from '../accessibility/index';
import { HoverActionService } from './hover-action.service';

@Directive({
    selector: '[uxHoverAction]'
})
export class HoverActionDirective implements OnDestroy {

    @Input()
    @HostBinding('tabindex')
    tabindex: number = 0;

    @HostBinding('class.hover-action-active')
    active: boolean = false;

    @HostBinding('class.hover-action-focused')
    focused: boolean = false;

    private _focusIndicator: FocusIndicator;
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _hoverActionService: HoverActionService,
        focusIndicatorService: FocusIndicatorService
    ) {

        // create the focus indicator
        this._focusIndicator = focusIndicatorService.monitor(_elementRef.nativeElement);

        // register the action
        this._hoverActionService.register(this);

        // watch for changes to the activeness of the container
        this._hoverActionService.active.pipe(takeUntil(this._onDestroy)).subscribe(active => this.active = active);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        this._hoverActionService.unregister(this);
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
}