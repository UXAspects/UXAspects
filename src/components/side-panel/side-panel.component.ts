import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, skip } from 'rxjs/operators';
import { FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { SidePanelAnimationState, sidePanelStateAnimation } from './side-panel-animations';
import { SidePanelService } from './side-panel.service';

@Component({
    selector: 'ux-side-panel',
    exportAs: 'ux-side-panel',
    templateUrl: 'side-panel.component.html',
    providers: [SidePanelService],
    animations: [sidePanelStateAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'ux-side-panel'
    }
})
export class SidePanelComponent implements OnInit, OnDestroy {

    @Input()
    @HostBinding('class.open')
    get open(): boolean {
        return this.service.open$.value;
    }

    set open(value: boolean) {
        this.service.open$.next(value);
    }

    @Input()
    @HostBinding('class.inline')
    inline = false;

    @Input()
    attachTo: 'window' | 'container' = 'window';

    @Input()
    width: string | number = '50%';

    @Input()
    top: string | number = '0';

    @Input()
    @HostBinding('attr.aria-modal')
    modal = false;

    @Input()
    @HostBinding('class.animate')
    animate = false;

    @Input()
    closeOnExternalClick = false;

    @Input()
    focusOnShow: boolean = false;

    @Output()
    openChange = new EventEmitter<boolean>();

    get position(): string {
        if (this.inline) {
            return 'static';
        }
        if (this.attachTo === 'container') {
            return 'absolute';
        }
        return 'fixed';
    }

    get cssWidth(): string {
        if (typeof this.width === 'number') {
            return this.width === 0 ? '0' : this.width + 'px';
        }
        return this.width;
    }

    get cssTop(): string {
        if (typeof this.top === 'number') {
            return this.top === 0 ? '0' : this.top + 'px';
        }
        return this.top;
    }

    @HostBinding('style.width')
    get componentWidth(): string {
        if (this.inline) {
            return this.open ? this.cssWidth : '0';
        }
        return null;
    }

    get hostWidth(): string {
        return this.inline ? '100%' : this.cssWidth;
    }

    animationPanelState: SidePanelAnimationState = SidePanelAnimationState.Closed;

    protected _onDestroy = new Subject<void>();

    constructor(
        protected readonly service: SidePanelService,
        private readonly _elementRef: ElementRef,
        private readonly _focusOrigin: FocusIndicatorOriginService) { }

    ngOnInit(): void {

        this.service.open$.pipe(skip(1), distinctUntilChanged(), takeUntil(this._onDestroy))
            .subscribe(isOpen => this.openChange.emit(isOpen));

        this.service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(isOpen => {
            this.animationPanelState = isOpen
                ? this.animate
                    ? SidePanelAnimationState.Open
                    : SidePanelAnimationState.OpenImmediate
                : SidePanelAnimationState.Closed;
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    openPanel(): void {
        this.service.open();
    }

    closePanel(): void {
        this.service.close();
    }

    @HostListener('document:keyup.escape')
    _onDocumentEscape(): void {
        if (this.open) {
            this._focusOrigin.setOrigin('keyboard');
            this.closePanel();
        }
    }

    @HostListener('document:click', ['$event.target'])
    _onDocumentClick(target: HTMLElement): void {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }

        if (!this._elementRef.nativeElement.contains(target) || (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    }
}
