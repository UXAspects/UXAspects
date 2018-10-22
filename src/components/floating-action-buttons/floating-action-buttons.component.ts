import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonDirection, FloatingActionButtonsService } from './floating-action-buttons.service';

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

    /** Specify the direction that the FAB should display */
    @Input() set direction(direction: FloatingActionButtonDirection) { this.fab.direction$.next(direction); }

    /** Emit whenever the open state changes */
    @Output() openChange = new EventEmitter<boolean>();

    /** Get all child FAB buttons */
    @ContentChildren(FloatingActionButtonComponent) buttons: QueryList<FloatingActionButtonComponent>;

    private _subscription: Subscription = new Subscription();

    constructor(public fab: FloatingActionButtonsService, private _elementRef: ElementRef) {
        this._subscription.add(this.fab.open$.subscribe(value => this.openChange.emit(value)));
    }

    ngAfterViewInit(): void {
        this.fab.setButtons(this.buttons);
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