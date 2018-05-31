import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { TabsetService } from '../tabset.service';
import { TabComponent } from './tab.component';

@Directive({
    selector: '[uxTabFocus]'
})
export class TabFocusDirective implements OnInit, OnDestroy {

    @Input() uxTabFocus: TabComponent;

    private _subscription: Subscription;

    constructor(private _tabset: TabsetService, private _elementRef: ElementRef) { }

    ngOnInit(): void {
        this._subscription = this._tabset.highlighted$.pipe(
            filter(() => this._tabset.focused$.value === true),
            filter(() => this._tabset.highlighted$.value === this.uxTabFocus),
        ).subscribe(() => this._elementRef.nativeElement.focus());
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}