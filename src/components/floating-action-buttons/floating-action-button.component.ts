import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { AfterViewInit, Attribute, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, Optional, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TooltipDirective } from '../tooltip';
import { FloatingActionButtonsService } from './floating-action-buttons.service';

@Component({
    selector: 'ux-floating-action-button',
    templateUrl: './floating-action-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class FloatingActionButtonComponent implements AfterViewInit, OnDestroy {

    @Input() icon: string;
    @Input('aria-label') ariaLabel: string;
    @ViewChild('button') button: ElementRef;

    primary: boolean = false;
    tabindex$ = new BehaviorSubject<number>(-1);

    private _onDestroy = new Subject<void>();

    constructor(@Attribute('fab-primary') primary: string, public fab: FloatingActionButtonsService, @Optional() private _tooltip: TooltipDirective) {
        this.primary = primary !== null;
    }

    ngAfterViewInit(): void {
        if (this._tooltip) {
            // ensure the tooltip gets hidden when the button is hidden
            this.fab.open$.pipe(takeUntil(this._onDestroy), filter(isOpen => !isOpen && !this.primary))
                .subscribe(() => this._tooltip.hide());
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    focus(): void {
        this.button.nativeElement.focus();
    }

    onFocus(): void {
        // ensure the tooltip gets shown
        if (this._tooltip) {
            this._tooltip.show();
        }
    }

    onBlur(): void {
        // ensure the tooltip gets hidden
        if (this._tooltip) {
            this._tooltip.hide();
        }
    }

    close(): void {
        this.fab.close();
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {

        switch (event.which) {

            case UP_ARROW:
                if (this.fab.isVertical) {
                    this.fab.focusSibling(false);
                }
                break;

            case DOWN_ARROW:
                if (this.fab.isVertical) {
                    this.fab.focusSibling(true);
                }
                break;

            case LEFT_ARROW:
                if (this.fab.isHorizontal) {
                    this.fab.focusSibling(false);
                }
                break;

            case RIGHT_ARROW:
                if (this.fab.isHorizontal) {
                    this.fab.focusSibling(true);
                }
                break;

            case ENTER:
                this.fab.focusPrimaryButton();
                break;

            case ESCAPE:
                this.fab.focusPrimaryButton();
                this.fab.close();
                break;

        }

    }
}