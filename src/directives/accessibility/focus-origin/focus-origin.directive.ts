import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

/**
 * This will apply a class based on the source of the focus event
 * which allows different styling depending on the whether the item
 * was clicked or if the item was tabbed to
 */
@Directive({
    selector: '[uxFocusOrigin]',
})
export class FocusOriginDirective implements OnInit, OnDestroy {

    /** Allow checking of child elements */
    @Input() uxFocusOriginCheckChildren: boolean = false;

    /** Stop monitoring element focus */
    private _onDestroy = new Subject<void>();

    constructor(private _focusMonitor: FocusMonitor, private _elementRef: ElementRef) { }

    /** Begin monitoring the element */
    ngOnInit(): void {
        this._focusMonitor.monitor(this._elementRef.nativeElement, this.uxFocusOriginCheckChildren)
            .pipe(takeUntil(this._onDestroy)).subscribe();
    }

    /** Stop monitoring the element focus */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}