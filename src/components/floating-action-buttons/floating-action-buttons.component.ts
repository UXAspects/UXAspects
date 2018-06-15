import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostListener, Input, OnDestroy, QueryList } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-buttons',
    templateUrl: './floating-action-buttons.component.html',
    providers: [FloatingActionButtonsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    animations: [
        trigger('fabAnimation', [
            transition('void => true', [
                query('ux-floating-action-button', style({ opacity: 0 })),
                query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 }))))
            ]),
            transition('true => void', [
                query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 }))))
            ])
        ])
    ]
})
export class FloatingActionButtonsComponent implements AfterViewInit, OnDestroy {

    @Input() direction: FloatingActionButtonDirection = 'top';
    @ContentChildren(TooltipDirective) tooltips: QueryList<TooltipDirective>;

    private _subscription: Subscription;

    constructor(public fab: FloatingActionButtonsService, private _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this._subscription = this.fab.open$.pipe(filter(open => open === false))
            .subscribe(() => this.tooltips.forEach(tooltip => tooltip.hide()));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /*
     * Detect any clicks to trigger close of the menu
     */
    @HostListener('document:click', ['$event.target']) close(target: HTMLElement): void {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    }
}

export type FloatingActionButtonDirection = 'top' | 'right' | 'bottom' | 'left';